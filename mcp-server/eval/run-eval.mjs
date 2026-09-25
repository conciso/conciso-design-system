#!/usr/bin/env node
// Eval-Set „KI mit und ohne MCP-Server“ (Issue 06, ADR-0012). Beantwortet jede Frage aus
// eval/fragen.json zweimal per `claude -p` headless gegen einen frisch installierten Tarball
// von @conciso/design-system-mcp — genau wie scripts/smoke-test.mjs es für seine
// Protokoll-Checks tut, siehe dort für die Begründung, warum das Consumer-Verzeichnis
// außerhalb des Repos liegt: einmal mit dem MCP-Server (nur dessen drei Werkzeuge erlaubt),
// einmal ganz ohne MCP. Prüft deterministisch, ohne LLM-Richter (siehe eval/checker.mjs),
// und schreibt einen Markdown-Bericht.
//
// Bewusst KEIN CI-Gate: jeder Lauf kostet API-Guthaben, das Ergebnis ist nicht deterministisch
// genug für ein hartes Gate (Modellantworten variieren). Exit-Code ≠ 0 nur bei
// Werkzeugfehlern (`isError` in einem tool_result) oder Infrastruktur-Fehlern
// (Pack/Install/Start/Timeout des claude-Prozesses) — nie bei schlechter Antwortqualität,
// die steht ausschließlich im Bericht.
//
// Aufruf: `npm run eval -w mcp-server [-- <pfad-zu-einem-vorgebauten-tarball>]`
// Voraussetzung: `npm run build:storybook` im Repo-Root muss bereits gelaufen sein (liefert
// storybook-angular/storybook-static, aus dem `npm pack`s prepack-Hook den Snapshot baut —
// siehe scripts/build-snapshot.mjs/prepack.mjs). Ohne Tarball-Argument packt sich das Paket
// selbst, mit derselben Vorgehensweise wie der mcp-smoke-test-Job in
// .github/workflows/storybook-angular.yml.
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildTruthMap, checkAnswer, mentionsGlobalCssInclusion } from './checker.mjs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = join(PKG_ROOT, '..');
const FRAGEN_PATH = join(PKG_ROOT, 'eval', 'fragen.json');

const RUN_TIMEOUT_MS = 240_000;
const MCP_SERVER_NAME = 'conciso-ds';
const MCP_TOOL_NAMES = ['docs-list', 'docs-show', 'docs-show-story'].map(
  (tool) => `mcp__${MCP_SERVER_NAME}__${tool}`,
);
// Datei-/Web-Werkzeuge in BEIDEN Varianten gesperrt (Vorgabe des Tickets): die KI soll aus
// ihrem Wissen bzw. ausschließlich über die erlaubten MCP-Werkzeuge antworten, nicht den
// Consumer-Ordner oder das Web nach der echten API absuchen — sonst prüft der Lauf nicht
// mehr das, was er soll (siehe .scratch/mcp-server/issues/06-eval-set-mit-und-ohne-server.md).
const DISALLOWED_TOOLS = ['Bash', 'Read', 'Edit', 'Write', 'Glob', 'Grep', 'WebFetch', 'WebSearch', 'NotebookEdit', 'Task'];

function log(msg) {
  console.error(msg);
}

function claudeBin() {
  return process.env.CDS_MCP_EVAL_CLAUDE_BIN || 'claude';
}

function npmBin() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function runNpm(args, cwd) {
  const result = spawnSync(npmBin(), args, { cwd, encoding: 'utf8' });
  if (result.error) {
    throw new Error(`npm ${args.join(' ')} ließ sich nicht starten: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(
      `npm ${args.join(' ')} fehlgeschlagen (Exit-Code ${result.status}) in „${cwd}“.\n` +
        `--- stdout ---\n${result.stdout}\n--- stderr ---\n${result.stderr}`,
    );
  }
  return result;
}

/** Packt das Paket selbst — dieselbe Vorgehensweise wie der mcp-smoke-test-Job in
 * .github/workflows/storybook-angular.yml: `npm pack -w mcp-server` in ein eigenes
 * Zielverzeichnis, Tarball-Name über die tatsächlich erzeugte Datei ermitteln statt über
 * stdout-Capture (der prepack-Hook aus scripts/prepack.mjs schreibt auf denselben stdout wie
 * `npm pack` selbst — siehe dessen Kommentar und den Fix in Commit 5d361b6). */
function packTarball() {
  const packDir = mkdtempSync(join(tmpdir(), 'cds-mcp-eval-pack-'));
  log(`→ npm pack -w mcp-server --pack-destination ${packDir}`);
  runNpm(['pack', '-w', 'mcp-server', '--silent', '--pack-destination', packDir], REPO_ROOT);
  const tarballs = readdirSync(packDir).filter((name) => name.endsWith('.tgz'));
  if (tarballs.length !== 1) {
    throw new Error(
      `Erwartete genau eine .tgz-Datei in „${packDir}“, gefunden: ${tarballs.join(', ') || '(keine)'}.`,
    );
  }
  return join(packDir, tarballs[0]);
}

function installTarball(tmpDir, tarballPath) {
  log('→ npm init -y (frisches Consumer-Verzeichnis)');
  runNpm(['init', '-y'], tmpDir);
  log(`→ npm i ${tarballPath}`);
  runNpm(['i', tarballPath, '--no-audit', '--no-fund', '--loglevel=error'], tmpDir);
}

/** Schreibt die zwei `.mcp.json`-Varianten aus dem verifizierten Handlauf vom 2026-09-25
 * (siehe Issue 06): einmal mit dem echten Server über `npx cds-mcp` (der lokal installierte
 * Tarball-`bin`, kein Registry-Zugriff nötig, da bereits per `npm i` installiert), einmal mit
 * einer leeren `mcpServers`-Liste für die „ohne Server“-Variante. */
function writeMcpConfigs(tmpDir) {
  const withServerPath = join(tmpDir, '.mcp.json');
  writeFileSync(
    withServerPath,
    JSON.stringify({ mcpServers: { [MCP_SERVER_NAME]: { command: 'npx', args: ['cds-mcp'] } } }, null, 2),
  );
  const withoutServerPath = join(tmpDir, '.mcp.empty.json');
  writeFileSync(withoutServerPath, JSON.stringify({ mcpServers: {} }, null, 2));
  return { withServerPath, withoutServerPath };
}

/**
 * Startet `claude -p` headless mit Stream-JSON-Ausgabe, sammelt stdout/stderr und tötet den
 * Prozess hart bei Zeitüberschreitung (Vorgabe des Tickets: „immer mit Timeout wrappen … und
 * bei Timeout killen“).
 * @returns {Promise<{ ok: true, lines: object[], stderr: string } | { ok: false, error: string, lines: [], stderr: string }>}
 */
function runClaudeHeadless({ cwd, prompt, mcpConfigPath, allowedTools }) {
  return new Promise((resolvePromise) => {
    const args = [
      '-p',
      prompt,
      '--mcp-config',
      mcpConfigPath,
      '--strict-mcp-config',
      '--permission-prompts',
      'none',
      '--disallowedTools',
      DISALLOWED_TOOLS.join(','),
      '--output-format',
      'stream-json',
      '--verbose',
    ];
    if (allowedTools?.length) {
      args.push('--allowedTools', allowedTools.join(','));
    }

    let child;
    try {
      child = spawn(claudeBin(), args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (err) {
      resolvePromise({ ok: false, error: `„claude“ ließ sich nicht starten: ${err.message}`, lines: [], stderr: '' });
      return;
    }

    let stdout = '';
    let stderr = '';
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill('SIGKILL');
      resolvePromise({
        ok: false,
        error: `Zeitüberschreitung nach ${RUN_TIMEOUT_MS} ms — Prozess mit SIGKILL beendet.`,
        lines: [],
        stderr,
      });
    }, RUN_TIMEOUT_MS);

    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise({ ok: false, error: `Kindprozess-Fehler: ${err.message}`, lines: [], stderr });
    });
    child.on('exit', () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const lines = stdout
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      resolvePromise({ ok: true, lines, stderr });
    });
  });
}

/** Liest die stream-json-Zeilen einer claude-Session aus: Werkzeugaufrufe (assistant/
 * tool_use), Werkzeugfehler (user/tool_result mit is_error), Server-Status aus system/init,
 * und den finalen Antworttext aus der result-Zeile. Format siehe Handlauf vom 2026-09-25
 * (Issue 06). */
function analyzeRun(lines) {
  const toolCalls = [];
  const toolErrors = [];
  let resultText = null;
  let mcpServerStatuses = [];
  let costUsd = null;

  for (const line of lines) {
    if (line.type === 'system' && line.subtype === 'init') {
      mcpServerStatuses = line.mcp_servers ?? [];
    }
    if (line.type === 'assistant') {
      for (const block of line.message?.content ?? []) {
        if (block.type === 'tool_use') {
          toolCalls.push({ name: block.name, input: block.input });
        }
      }
    }
    if (line.type === 'user') {
      for (const block of line.message?.content ?? []) {
        if (block.type === 'tool_result' && block.is_error) {
          const text = Array.isArray(block.content)
            ? block.content.map((c) => c?.text ?? '').join(' ')
            : String(block.content ?? '');
          toolErrors.push({ tool_use_id: block.tool_use_id, text });
        }
      }
    }
    if (line.type === 'result') {
      resultText = line.result ?? null;
      costUsd = typeof line.total_cost_usd === 'number' ? line.total_cost_usd : null;
    }
  }
  return { toolCalls, toolErrors, resultText, mcpServerStatuses, costUsd };
}

function evaluateRun(run, frage, truthMap) {
  if (!run.ok) {
    return {
      infra: true,
      error: run.error,
      toolCalls: [],
      toolErrorCount: 0,
      toolErrors: [],
      findings: [],
      checkedElementCount: 0,
      setupOk: null,
      resultText: null,
      costUsd: null,
    };
  }
  const { toolCalls, toolErrors, resultText, mcpServerStatuses, costUsd } = analyzeRun(run.lines);
  const answerText = resultText ?? '';
  const { findings, checkedComponents, checkedElementCount, unknownSelectors } = checkAnswer(answerText, truthMap);
  const setupOk = frage.checks?.includes('setup-mentions-global-css')
    ? mentionsGlobalCssInclusion(answerText)
    : null;
  return {
    infra: false,
    toolCalls,
    toolErrorCount: toolErrors.length,
    toolErrors,
    findings,
    checkedComponents,
    checkedElementCount,
    unknownSelectors,
    setupOk,
    resultText: answerText,
    mcpServerStatuses,
    costUsd,
  };
}

function truncate(text, max = 600) {
  if (!text) return '(leer)';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function verdictCell(evalResult) {
  if (evalResult.infra) {
    return `**INFRASTRUKTUR-FEHLER**<br>${evalResult.error}`;
  }
  const parts = [];
  parts.push(
    evalResult.toolErrorCount > 0
      ? `Werkzeugfehler: **${evalResult.toolErrorCount} ROT**`
      : 'Werkzeugfehler: keine',
  );
  parts.push(
    evalResult.findings.length > 0
      ? `Erfundene API: **${evalResult.findings.length}** (${evalResult.findings
          .map((f) => f.attribute ?? `<${f.selector}>`)
          .join(', ')})`
      : `Erfundene API: keine (${evalResult.checkedElementCount ?? 0} \`cds-*\`-Elemente geprüft)`,
  );
  if (evalResult.setupOk !== null) {
    parts.push(evalResult.setupOk ? 'CSS-Hinweis: ja' : 'CSS-Hinweis: **fehlt**');
  }
  parts.push(`Werkzeugaufrufe: ${evalResult.toolCalls.length}`);
  return parts.join('<br>');
}

function renderDetail(frage, label, evalResult) {
  const lines = [`### ${frage.id} — ${label}`, ''];
  if (evalResult.infra) {
    lines.push(`Infrastruktur-Fehler: ${evalResult.error}`, '');
    return lines;
  }
  if (evalResult.toolCalls.length > 0) {
    lines.push(
      '- Werkzeugaufrufe: ' +
        evalResult.toolCalls.map((c) => `\`${c.name}\`(${JSON.stringify(c.input)})`).join(', '),
    );
  } else {
    lines.push('- Werkzeugaufrufe: keine');
  }
  if (typeof evalResult.costUsd === 'number') {
    lines.push(`- Kosten laut Claude-API: $${evalResult.costUsd.toFixed(4)}`);
  }
  if (evalResult.toolErrorCount > 0) {
    lines.push(`- **Werkzeugfehler (${evalResult.toolErrorCount}):**`);
    for (const err of evalResult.toolErrors) {
      lines.push(`  - ${truncate(err.text, 300)}`);
    }
  }
  if (evalResult.findings.length > 0) {
    lines.push('- **Erfundene Attribute/Bindungen:**');
    for (const finding of evalResult.findings) {
      lines.push(`  - ${finding.detail}`);
    }
  }
  if (evalResult.setupOk !== null) {
    lines.push(`- CSS-Schicht-Hinweis erwähnt: ${evalResult.setupOk ? 'ja' : 'nein'}`);
  }
  lines.push('- Antwort (gekürzt):', '', '  > ' + truncate(evalResult.resultText).replace(/\n/g, '\n  > '), '');
  return lines;
}

/** Summiert `total_cost_usd` über alle Läufe, die eines gemeldet haben. `null` bedeutet
 * „unbekannt“ (z. B. Infrastruktur-Fehler vor der `result`-Zeile), nicht „0 $“ — deshalb
 * eine separate Zählung, wie viele Läufe zur Summe beigetragen haben. */
function sumCostUsd(results) {
  let total = 0;
  let counted = 0;
  for (const r of results) {
    for (const run of [r.withServer, r.withoutServer]) {
      if (typeof run.costUsd === 'number') {
        total += run.costUsd;
        counted++;
      }
    }
  }
  return { total, counted, of: results.length * 2 };
}

function renderReport(results, { tarballPath }) {
  const rows = results.map(
    (r) => `| ${r.frage.id} | ${verdictCell(r.withServer)} | ${verdictCell(r.withoutServer)} |`,
  );
  const cost = sumCostUsd(results);
  return [
    '# Eval-Bericht — KI mit und ohne MCP-Server',
    '',
    `Datum: ${new Date().toISOString()}`,
    `Tarball: \`${tarballPath}\``,
    `Fragen: ${results.length}`,
    `Gesamtkosten laut Claude-API (${cost.counted}/${cost.of} Läufe gemeldet): $${cost.total.toFixed(4)}`,
    '',
    'Kein LLM-Richter: „Erfundene API“ zählt Attribute/Bindungen auf `cds-*`-Elementen in ' +
      'Code-Blöcken der Antwort, die kein dokumentierter Input/Output der jeweiligen ' +
      'Komponente im installierten Snapshot sind. „Werkzeugfehler“ zählt `tool_result`s mit ' +
      '`isError`; sobald einer auftritt, ist der Lauf unabhängig vom Antworttext rot.',
    '',
    '| Frage | mit Server | ohne Server |',
    '|---|---|---|',
    ...rows,
    '',
    '## Details',
    '',
    ...results.flatMap((r) => [
      ...renderDetail(r.frage, 'mit Server', r.withServer),
      ...renderDetail(r.frage, 'ohne Server', r.withoutServer),
    ]),
  ].join('\n');
}

async function main() {
  const tarballArg = process.argv[2];
  const tarballPath = tarballArg ? resolve(tarballArg) : packTarball();
  if (!existsSync(tarballPath)) {
    throw new Error(`Tarball nicht gefunden: „${tarballPath}“.`);
  }

  const fragen = JSON.parse(readFileSync(FRAGEN_PATH, 'utf8')).questions;
  if (!Array.isArray(fragen) || fragen.length === 0) {
    throw new Error(`Keine Fragen in „${FRAGEN_PATH}“ gefunden.`);
  }

  const tmpDir = mkdtempSync(join(tmpdir(), 'cds-mcp-eval-'));
  log(`→ Consumer-Verzeichnis (außerhalb des Repos): ${tmpDir}`);

  const results = [];
  let infrastructureError = null;

  try {
    installTarball(tmpDir, tarballPath);
    const { withServerPath, withoutServerPath } = writeMcpConfigs(tmpDir);
    const snapshotDir = join(tmpDir, 'node_modules', '@conciso', 'design-system-mcp', 'snapshot');
    if (!existsSync(snapshotDir)) {
      throw new Error(`Snapshot fehlt im installierten Paket: „${snapshotDir}“.`);
    }
    const truthMap = buildTruthMap(snapshotDir);
    log(
      `→ Wahrheit aus dem installierten Snapshot geladen: ${truthMap.elementSelectors.size} Element-Selektoren, ` +
        `${truthMap.attributeSelectors.size} Attribut-Selektoren.`,
    );

    for (const frage of fragen) {
      log(`\n=== ${frage.id} ===`);
      log('  → mit Server …');
      const withServerRun = await runClaudeHeadless({
        cwd: tmpDir,
        prompt: frage.prompt,
        mcpConfigPath: withServerPath,
        allowedTools: MCP_TOOL_NAMES,
      });
      log('  → ohne Server …');
      const withoutServerRun = await runClaudeHeadless({
        cwd: tmpDir,
        prompt: frage.prompt,
        mcpConfigPath: withoutServerPath,
        allowedTools: [],
      });

      results.push({
        frage,
        withServer: evaluateRun(withServerRun, frage, truthMap),
        withoutServer: evaluateRun(withoutServerRun, frage, truthMap),
      });
    }
  } catch (err) {
    infrastructureError = err;
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }

  if (infrastructureError) {
    console.error(`\nEval-Lauf abgebrochen (Infrastruktur-Fehler): ${infrastructureError.stack ?? infrastructureError.message}`);
    process.exit(1);
  }

  const report = renderReport(results, { tarballPath });
  const reportDir = process.env.CDS_MCP_EVAL_REPORT_DIR ?? tmpdir();
  const reportPath = join(reportDir, `cds-mcp-eval-report-${Date.now()}.md`);
  writeFileSync(reportPath, report, 'utf8');
  console.log(report);
  log(`\n→ Bericht geschrieben: ${reportPath}`);

  const anyToolError = results.some((r) => r.withServer.toolErrorCount > 0 || r.withoutServer.toolErrorCount > 0);
  const anyInfra = results.some((r) => r.withServer.infra || r.withoutServer.infra);
  if (anyToolError || anyInfra) {
    log('\nExit-Code 1: Werkzeugfehler oder Infrastruktur-Fehler in mindestens einem Lauf (nicht: schlechte Antwortqualität).');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unerwarteter Fehler im Eval-Lauf:', err);
  process.exit(1);
});
