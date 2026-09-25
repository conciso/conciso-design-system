#!/usr/bin/env node
// Tarball-Smoke-Test über stdio (Issue 04, ADR-0012). Installiert den per `npm pack` gebauten
// Tarball von @conciso/design-system-mcp in ein frisches, leeres Verzeichnis — genau wie ein
// Consumer es täte — und spricht dort rohes JSON-RPC mit dem `cds-mcp`-Kindprozess. Fängt die
// Fehlerklasse ab, die Unit-Tests aus dem Repo (test/server.test.mjs) nicht sehen können, weil
// sie gegen den Quellbaum laufen: Paketierungsfehler wie ein fehlendes `bin`, ein `files`-Feld,
// das den Snapshot nicht mitnimmt, oder stdout-Verschmutzung durch eine Dependency.
//
// WARUM AUSSERHALB DES REPOS INSTALLIERT WIRD: dieselbe Begründung wie in
// scripts/consumer-smoke-test.sh — im Repo-Root liegt bereits ein node_modules mit
// @conciso/design-system-mcp als Workspace-Symlink. Ein Install DORT würde nie ein Paketierungs-
// problem sehen, weil Node ohnehin den Quellbaum aufläst. Deshalb: os.tmpdir(), kein Ordner
// unterhalb des Repos.
//
// Prüft (siehe .scratch/mcp-server/issues/04-tarball-smoke-test-ueber-stdio.md):
//   - initialize erfolgreich
//   - tools/list enthält genau docs-list, docs-show, docs-show-story
//   - docs-show(komponenten-buttons-button) enthält Input „variant“ und Output „clicked“
//   - docs-list enthält die Seite „Einrichtung“ (grundlagen-einrichtung--übersicht)
//   - docs-show für JEDE Komponenten- und Doku-id aus dem installierten Snapshot liefert kein
//     Fehlerergebnis (weder JSON-RPC-error noch isError noch leerer Text) — Regressionsschutz für
//     den @storybook/mcp-Encoding-Bug vom 2026-09-25: @storybook/mcp löst Manifest-`$ref`s
//     URL-artig auf und ruft den manifestProvider mit prozentkodierten Pfaden auf
//     (grundlagen-einrichtung--%C3%BCbersicht.json statt …--übersicht.json auf der Platte); ENOENT
//     traf jede id mit Nicht-ASCII-Zeichen, nicht nur die Einrichtung-Seite. Der einzelne
//     Button-Check oben (rein ASCII) hätte das nicht gefangen.
//   - docs-show(grundlagen-einrichtung--übersicht) enthält explizit die Überschriften
//     „Einrichtung“ und „KI-Assistenten anbinden“ — genau die Seite, auf die die Server-
//     instructions verweisen
//   - @internal-Gate: KEINE Komponente im ausgelieferten Snapshot hat argTypes der Kategorie
//     „properties“/„methods“ (ADR-0006 — vergessenes @internal), geprüft direkt in den
//     services/core/docgen/*.json-Dateien des installierten Pakets
//   - jede Zeile auf stdout ist gültiges JSON-RPC 2.0
//
// Bewusst NICHT geprüft: der Inhalt von `instructions` und der Versionsabgleich mit der
// Angular-Lib — das ist Issue 02 (server.mjs/test/*.test.mjs), an denen dieses Skript nichts
// ändert.
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const REQUEST_TIMEOUT_MS = 10_000;
const HARD_KILL_GRACE_MS = 2_000;
const EXPECTED_TOOL_NAMES = ['docs-list', 'docs-show', 'docs-show-story'];
const EINRICHTUNG_DOC_ID = 'grundlagen-einrichtung--übersicht';
// Siehe docs/adr/0006: der Docgen-Server legt Interna (Template-Getter, CVA-Plumbing,
// Event-Handler, injizierte Services) standardmäßig in diese beiden Kategorien. `@internal`
// im JSDoc der Lib nimmt sie aus dem Docgen-Modus `propsTable: 'api'` heraus; taucht eine
// dieser Kategorien im ausgelieferten Manifest trotzdem auf, wurde ein `@internal` vergessen.
const INTERNAL_LEAK_CATEGORIES = new Set(['properties', 'methods']);

function log(msg) {
  console.log(msg);
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
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

function installTarball(tmpDir, tarballPath) {
  log('→ npm init -y (frisches Consumer-Verzeichnis)');
  runNpm(['init', '-y'], tmpDir);
  log(`→ npm i ${tarballPath}`);
  runNpm(['i', tarballPath, '--no-audit', '--no-fund', '--loglevel=error'], tmpDir);
}

function resolveServerBin(tmpDir) {
  const binPath = join(tmpDir, 'node_modules', '.bin', 'cds-mcp');
  if (!existsSync(binPath)) {
    throw new Error(
      `bin „cds-mcp“ fehlt nach der Installation: „${binPath}“ existiert nicht. ` +
        'Paketierungsfehler — passt das „bin“-Feld in mcp-server/package.json?',
    );
  }
  return binPath;
}

/** Direkter Node-Aufruf statt `npx cds-mcp`: keine zusätzliche npx-Registry-/Cache-Auflösung,
 * der aufgelöste Pfad ist ein normales ESM-Modul und läuft mit demselben Node-Interpreter,
 * der auch dieses Skript ausführt. */
function spawnServer(binPath, cwd) {
  return spawn(process.execPath, [binPath], { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
}

/** Roher JSON-RPC-über-stdio-Client. Jede stdout-Zeile, die kein valides JSON-RPC-2.0-Objekt
 * ist, landet sofort (nicht erst am Ende) in `errors` — Akzeptanzkriterium „jede Zeile auf
 * stdout ist gültiges JSON-RPC“. */
function createJsonRpcClient(child, errors) {
  let buffer = '';
  const pending = new Map();
  let nextId = 1;
  const stderrChunks = [];

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.trim()) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        errors.push(`stdout-Zeile ist kein valides JSON: „${line.slice(0, 200)}“`);
        continue;
      }
      if (!msg || typeof msg !== 'object' || msg.jsonrpc !== '2.0') {
        errors.push(`stdout-Zeile ist kein JSON-RPC-2.0-Objekt: „${line.slice(0, 200)}“`);
        continue;
      }
      const waiter = pending.get(msg.id);
      if (waiter) {
        pending.delete(msg.id);
        waiter(msg);
      }
    }
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => stderrChunks.push(chunk));

  // Stirbt der Kindprozess, bevor eine Antwort ankam (Absturz, falscher bin-Pfad, fehlende
  // Dependency), sonst hängen offene requests() bis zum vollen Timeout statt sofort einen
  // klaren Grund zu melden.
  child.once('exit', (code, signal) => {
    if (pending.size === 0) return;
    const reason = `Serverprozess vorzeitig beendet (Exit-Code ${code}, Signal ${signal}) vor einer Antwort.`;
    for (const waiter of pending.values()) waiter({ error: { message: reason } });
    pending.clear();
  });

  // Ohne diesen Handler wirft Node ein unbehandeltes 'error'-Event als Exception und der
  // Smoke-Test stirbt mit einem rohen Stacktrace statt einer klaren deutschen Meldung — in der
  // Praxis kaum erreichbar (process.execPath existiert immer), aber billig genug, es sauber
  // abzufangen statt sich darauf zu verlassen.
  child.on('error', (err) => {
    errors.push(`Kindprozess-Fehler: ${err.message}`);
    if (pending.size === 0) return;
    for (const waiter of pending.values()) waiter({ error: { message: `Kindprozess-Fehler: ${err.message}` } });
    pending.clear();
  });

  function send(msg) {
    child.stdin.write(`${JSON.stringify(msg)}\n`);
  }

  function request(method, params, { timeoutMs = REQUEST_TIMEOUT_MS } = {}) {
    const id = nextId++;
    return new Promise((resolvePromise) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        resolvePromise({ error: { message: `Zeitüberschreitung bei „${method}“ (id=${id}, ${timeoutMs} ms).` } });
      }, timeoutMs);
      pending.set(id, (msg) => {
        clearTimeout(timer);
        resolvePromise(msg);
      });
      send({ jsonrpc: '2.0', id, method, params });
    });
  }

  function notify(method, params) {
    send({ jsonrpc: '2.0', method, params });
  }

  return { request, notify, stderrText: () => stderrChunks.join('') };
}

async function closeClient(child) {
  try {
    child.stdin.end();
  } catch {
    // Kindprozess ist ggf. schon beendet — egal, es folgt ohnehin ein harter Kill.
  }
  try {
    child.kill('SIGTERM');
  } catch {
    // s.o.
  }
  await new Promise((resolvePromise) => {
    const hardTimer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {
        // Prozess ist zwischen SIGTERM und hier schon weg.
      }
      resolvePromise();
    }, HARD_KILL_GRACE_MS);
    child.once('exit', () => {
      clearTimeout(hardTimer);
      resolvePromise();
    });
  });
}

async function runProtocolChecks(client, errors) {
  const init = await client.request('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'cds-mcp-smoke-test', version: '0.0.0' },
  });
  if (init.error) {
    errors.push(`initialize fehlgeschlagen: ${JSON.stringify(init.error)}`);
    return; // Ohne initialize sind alle Folgeanfragen witzlos.
  }
  if (!init.result) {
    errors.push('initialize lieferte kein result.');
    return;
  }
  client.notify('notifications/initialized', {});

  const list = await client.request('tools/list', {});
  if (list.error) {
    errors.push(`tools/list fehlgeschlagen: ${JSON.stringify(list.error)}`);
  } else {
    const names = (list.result?.tools ?? []).map((tool) => tool.name).sort();
    if (JSON.stringify(names) !== JSON.stringify(EXPECTED_TOOL_NAMES)) {
      errors.push(
        `tools/list soll genau ${JSON.stringify(EXPECTED_TOOL_NAMES)} enthalten, war ${JSON.stringify(names)}.`,
      );
    }
  }

  const docsShow = await client.request('tools/call', {
    name: 'docs-show',
    arguments: { id: 'komponenten-buttons-button' },
  });
  if (docsShow.error) {
    errors.push(`docs-show fehlgeschlagen: ${JSON.stringify(docsShow.error)}`);
  } else {
    const text = docsShow.result?.content?.[0]?.text ?? '';
    if (!/variant/.test(text)) {
      errors.push('docs-show(komponenten-buttons-button) enthält nicht den dokumentierten Input „variant“.');
    }
    if (!/clicked/.test(text)) {
      errors.push('docs-show(komponenten-buttons-button) enthält nicht den dokumentierten Output „clicked“.');
    }
  }

  const docsList = await client.request('tools/call', { name: 'docs-list', arguments: {} });
  if (docsList.error) {
    errors.push(`docs-list fehlgeschlagen: ${JSON.stringify(docsList.error)}`);
  } else {
    const text = docsList.result?.content?.[0]?.text ?? '';
    if (!text.includes(EINRICHTUNG_DOC_ID)) {
      errors.push(`docs-list enthält nicht die Seite „Einrichtung“ (${EINRICHTUNG_DOC_ID}).`);
    }
  }

  const einrichtung = await client.request('tools/call', {
    name: 'docs-show',
    arguments: { id: EINRICHTUNG_DOC_ID },
  });
  if (einrichtung.error) {
    errors.push(`docs-show(${EINRICHTUNG_DOC_ID}) fehlgeschlagen: ${JSON.stringify(einrichtung.error)}`);
  } else {
    const text = einrichtung.result?.content?.[0]?.text ?? '';
    if (!/#\s*Einrichtung\b/.test(text)) {
      errors.push(`docs-show(${EINRICHTUNG_DOC_ID}) enthält nicht die Überschrift „Einrichtung“.`);
    }
    if (!text.includes('KI-Assistenten anbinden')) {
      errors.push(`docs-show(${EINRICHTUNG_DOC_ID}) enthält nicht die Überschrift „KI-Assistenten anbinden“.`);
    }
  }
}

/** Liest alle Komponenten- und Doku-ids direkt aus den Manifesten des INSTALLIERTEN Pakets (nicht
 * aus dem docs-list-Text geparst — robuster, und dieselbe Form, die der manifestProvider
 * tatsächlich ausliefert). Deckt beide Kategorien ab: components.json (z. B.
 * „komponenten-buttons-button“) und docs.json (die „…--übersicht“-MDX-Seiten, überwiegend mit
 * Nicht-ASCII-Zeichen in der id — genau die Klasse, die der @storybook/mcp-Encoding-Bug traf). */
function readAllDocsShowIds(tmpDir, errors) {
  const manifestsDir = join(
    tmpDir,
    'node_modules',
    '@conciso',
    'design-system-mcp',
    'snapshot',
    'manifests',
  );
  const componentsPath = join(manifestsDir, 'components.json');
  const docsPath = join(manifestsDir, 'docs.json');
  for (const path of [componentsPath, docsPath]) {
    if (!existsSync(path)) {
      errors.push(`Manifest fehlt im installierten Paket: „${path}“.`);
      return [];
    }
  }

  let components;
  let docs;
  try {
    components = JSON.parse(readFileSync(componentsPath, 'utf8'));
  } catch (err) {
    errors.push(`„${componentsPath}“ ist kein valides JSON: ${err.message}`);
    return [];
  }
  try {
    docs = JSON.parse(readFileSync(docsPath, 'utf8'));
  } catch (err) {
    errors.push(`„${docsPath}“ ist kein valides JSON: ${err.message}`);
    return [];
  }

  return [...Object.keys(components.components ?? {}), ...Object.keys(docs.docs ?? {})];
}

/** Ruft docs-show für JEDE id aus readAllDocsShowIds auf (Komponenten + Doku-Seiten) und schlägt
 * fehl, sobald irgendein Ergebnis ein Fehler ist — JSON-RPC-error, `isError`, oder leerer Text.
 * Regressionsschutz für den @storybook/mcp-Encoding-Bug vom 2026-09-25 (ENOENT traf jede id mit
 * Nicht-ASCII-Zeichen): der Button-Check oben allein hätte das nicht gefangen, weil
 * „komponenten-buttons-button“ rein ASCII ist. ~90 ids bei aktuellem Snapshot-Umfang, mit
 * Einzel-Timeout pro Anfrage (REQUEST_TIMEOUT_MS) — unproblematisch für einen CI-Smoke-Test.
 * @returns {Promise<number>} Anzahl erfolgreich aufgelöster ids.
 */
async function checkEveryDocsShowId(client, tmpDir, errors) {
  const ids = readAllDocsShowIds(tmpDir, errors);
  if (ids.length === 0) {
    if (errors.length === 0) {
      errors.push('Keine ids aus components.json/docs.json des installierten Pakets gefunden.');
    }
    return 0;
  }

  let okCount = 0;
  const failed = [];
  for (const id of ids) {
    const response = await client.request('tools/call', { name: 'docs-show', arguments: { id } });
    if (response.error) {
      failed.push(`${id}: JSON-RPC-Fehler ${JSON.stringify(response.error)}`);
      continue;
    }
    if (response.result?.isError) {
      const text = response.result?.content?.[0]?.text ?? '(kein Text)';
      failed.push(`${id}: isError=true, „${text.slice(0, 200)}“`);
      continue;
    }
    const text = response.result?.content?.[0]?.text ?? '';
    if (!text.trim()) {
      failed.push(`${id}: leerer Text im Ergebnis`);
      continue;
    }
    okCount++;
  }

  if (failed.length > 0) {
    errors.push(`docs-show fehlgeschlagen für ${failed.length} von ${ids.length} ids:`);
    for (const line of failed) errors.push(`  - ${line}`);
  } else {
    log(`→ docs-show ok für alle ${okCount} ids (Komponenten + Doku-Seiten, inkl. Nicht-ASCII).`);
  }
  return okCount;
}

/** @internal-Gate über ALLE Komponenten (Issue 04, schließt die in ADR-0006 offen gelassene
 * Lücke). Liest die Docgen-Dateien direkt vom Dateisystem statt über docs-show pro Komponente
 * zu gehen: ein JSON-RPC-Aufruf pro Komponente wäre bei ~50+ Komponenten unnötig langsam, und
 * die Form von `argTypes[*].table.category` ist dieselbe, die der manifestProvider ausliefert
 * (per Stichprobe an komponenten-buttons-button.json verifiziert). */
function checkInternalLeak(tmpDir, errors) {
  const docgenDir = join(
    tmpDir,
    'node_modules',
    '@conciso',
    'design-system-mcp',
    'snapshot',
    'services',
    'core',
    'docgen',
  );
  if (!existsSync(docgenDir)) {
    errors.push(
      `Docgen-Verzeichnis fehlt im installierten Paket: „${docgenDir}“. Snapshot unvollständig ` +
        '(fehlt „services/“ im Tarball?).',
    );
    return;
  }

  const files = readdirSync(docgenDir).filter((name) => name.endsWith('.json'));
  if (files.length === 0) {
    errors.push(`Docgen-Verzeichnis „${docgenDir}“ enthält keine JSON-Dateien.`);
    return;
  }

  const leaksPerComponent = new Map();
  let componentCount = 0;

  for (const file of files) {
    const path = join(docgenDir, file);
    let data;
    try {
      data = JSON.parse(readFileSync(path, 'utf8'));
    } catch (err) {
      errors.push(`Docgen-Datei „${file}“ ist kein valides JSON: ${err.message}`);
      continue;
    }
    for (const [componentId, component] of Object.entries(data.components ?? {})) {
      componentCount++;
      const argTypes = component?.argTypes ?? {};
      const leaked = Object.entries(argTypes)
        .filter(([, argType]) => INTERNAL_LEAK_CATEGORIES.has(argType?.table?.category))
        .map(([name, argType]) => `${name} (${argType.table.category})`);
      if (leaked.length > 0) {
        leaksPerComponent.set(componentId, leaked);
      }
    }
  }

  if (leaksPerComponent.size > 0) {
    errors.push(
      `${leaksPerComponent.size} von ${componentCount} Komponenten haben argTypes der Kategorie ` +
        '„properties“/„methods“ im ausgelieferten Manifest — vergessenes @internal (siehe docs/adr/0006):',
    );
    for (const [componentId, leaked] of leaksPerComponent) {
      errors.push(`  - ${componentId}: ${leaked.join(', ')}`);
    }
    return;
  }
  log(`→ @internal-Gate ok: ${componentCount} Komponenten im Snapshot geprüft, keine properties-/methods-Leaks.`);
}

async function main() {
  const tarballArg = process.argv[2];
  if (!tarballArg) {
    fail('Aufruf: node mcp-server/scripts/smoke-test.mjs <pfad-zum-tarball>');
  }
  const tarballPath = resolve(tarballArg);
  if (!existsSync(tarballPath)) {
    fail(`Tarball nicht gefunden: „${tarballPath}“.`);
  }

  const tmpDir = mkdtempSync(join(tmpdir(), 'cds-mcp-smoke-'));
  log(`→ Temp-Verzeichnis (außerhalb des Repos): ${tmpDir}`);

  const errors = [];
  let child;
  try {
    installTarball(tmpDir, tarballPath);
    const binPath = resolveServerBin(tmpDir);

    log('→ cds-mcp starten und JSON-RPC über stdio sprechen');
    child = spawnServer(binPath, tmpDir);
    const client = createJsonRpcClient(child, errors);

    await runProtocolChecks(client, errors);
    const resolvedCount = await checkEveryDocsShowId(client, tmpDir, errors);
    log(`→ docs-show über stdio aufgelöst: ${resolvedCount} ids.`);
    checkInternalLeak(tmpDir, errors);
  } catch (err) {
    errors.push(err.stack ?? err.message ?? String(err));
  } finally {
    if (child) {
      await closeClient(child);
    }
    rmSync(tmpDir, { recursive: true, force: true });
  }

  if (errors.length > 0) {
    console.error('\nTarball-Smoke-Test fehlgeschlagen:\n');
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  log('\nTarball-Smoke-Test grün: docs-list/docs-show/docs-show-story antworten korrekt über stdio, kein @internal-Leak.');
}

main().catch((err) => {
  console.error('Unerwarteter Fehler im Smoke-Test:', err);
  process.exit(1);
});
