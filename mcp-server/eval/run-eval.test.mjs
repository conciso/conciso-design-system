// Unit-Tests für die reine Bericht-/Filter-Logik aus run-eval.mjs — keine echten claude-/
// MCP-Aufrufe (import.meta-Guard in run-eval.mjs verhindert, dass main() beim Import hier
// mitläuft). Bewusst NICHT unter mcp-server/test/, aus demselben Grund wie checker.test.mjs:
// `npm test -w mcp-server` (`node --test test/*.test.mjs`) soll den Eval-Teil nicht einschließen.
// Laufen lassen mit `npm run test:eval-checker -w mcp-server`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { readEvalFilter, renderReport } from './run-eval.mjs';

const EVAL_DIR = dirname(fileURLToPath(import.meta.url));

/** Minimaler Fragen-/Ergebnis-Fixture, genug für renderReport (keine echten Läufe nötig). */
function makeResults() {
  const evalResult = {
    infra: false,
    toolCalls: [],
    toolErrorCount: 0,
    toolErrors: [],
    findings: [],
    checkedElementCount: 0,
    setupOk: null,
    coreClaim: null,
    resultText: 'Antwort',
    costUsd: 0.01,
  };
  return [{ frage: { id: 'beispiel-frage' }, withServer: evalResult, withoutServer: evalResult }];
}

function withEnv(vars, fn) {
  const previous = {};
  for (const key of Object.keys(vars)) {
    previous[key] = process.env[key];
    if (vars[key] === undefined) delete process.env[key];
    else process.env[key] = vars[key];
  }
  try {
    return fn();
  } finally {
    for (const key of Object.keys(previous)) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
}

test('renderReport: nur Variante gesetzt markiert den Lauf als gefiltert und nennt die Variante', () => {
  const report = renderReport(makeResults(), {
    tarballPath: '/pfad/tarball.tgz',
    onlyId: null,
    onlyVariant: 'mit-server',
  });
  assert.match(report, /Gezielter Lauf/, 'Bericht muss den Lauf als gefiltert kennzeichnen');
  assert.match(report, /CDS_MCP_EVAL_ONLY_VARIANT=mit-server/);
  assert.doesNotMatch(report, /CDS_MCP_EVAL_ONLY_ID=/, 'onlyId ist null, darf nicht auftauchen');
});

test('renderReport: nur id gesetzt markiert den Lauf als gefiltert und nennt die id', () => {
  const report = renderReport(makeResults(), {
    tarballPath: '/pfad/tarball.tgz',
    onlyId: 'beispiel-frage',
    onlyVariant: null,
  });
  assert.match(report, /Gezielter Lauf/);
  assert.match(report, /CDS_MCP_EVAL_ONLY_ID=beispiel-frage/);
  assert.doesNotMatch(report, /CDS_MCP_EVAL_ONLY_VARIANT=/, 'onlyVariant ist null, darf nicht auftauchen');
});

test('renderReport: id UND Variante gesetzt nennt beide', () => {
  const report = renderReport(makeResults(), {
    tarballPath: '/pfad/tarball.tgz',
    onlyId: 'beispiel-frage',
    onlyVariant: 'ohne-server',
  });
  assert.match(report, /Gezielter Lauf/);
  assert.match(report, /CDS_MCP_EVAL_ONLY_ID=beispiel-frage/);
  assert.match(report, /CDS_MCP_EVAL_ONLY_VARIANT=ohne-server/);
});

test('renderReport: kein Filter gesetzt bleibt ohne Markierung', () => {
  const report = renderReport(makeResults(), {
    tarballPath: '/pfad/tarball.tgz',
    onlyId: null,
    onlyVariant: null,
  });
  assert.doesNotMatch(report, /Gezielter Lauf/, 'ein vollständiger Lauf braucht keine Kennzeichnung');
});

test('readEvalFilter: ungültige Variante wirft einen Fehler', () => {
  withEnv({ CDS_MCP_EVAL_ONLY_ID: undefined, CDS_MCP_EVAL_ONLY_VARIANT: 'mit-und-ohne' }, () => {
    assert.throws(() => readEvalFilter(), /CDS_MCP_EVAL_ONLY_VARIANT/);
  });
});

test('readEvalFilter: gültige Variante ohne id liefert onlyId null', () => {
  withEnv({ CDS_MCP_EVAL_ONLY_ID: undefined, CDS_MCP_EVAL_ONLY_VARIANT: 'ohne-server' }, () => {
    assert.deepEqual(readEvalFilter(), { onlyId: null, onlyVariant: 'ohne-server' });
  });
});

test('gespeicherter Fixture-Lauf lässt sich über die CLI mit aktuellen Checks neu bewerten', () => {
  const reportDir = mkdtempSync(join(tmpdir(), 'cds-mcp-eval-recheck-test-'));
  try {
    const result = spawnSync(
      process.execPath,
      [join(EVAL_DIR, 'recheck-eval.mjs'), join(EVAL_DIR, 'fixtures', 'saved-run.json')],
      {
        encoding: 'utf8',
        env: {
          ...process.env,
          CDS_MCP_EVAL_REPORT_DIR: reportDir,
          CDS_MCP_EVAL_CLAUDE_BIN: 'darf-bei-neubewertung-nicht-gestartet-werden',
        },
      },
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Erfundene API: \*\*1\*\* \(\[icon\]\)/);
    assert.match(result.stdout, /CSS-Hinweis: ja/);
    assert.match(result.stdout, /Kernaussage: \*\*getroffen\*\*/);

    const reportPath = result.stderr.match(/Bericht geschrieben: (.+\.md)/)?.[1];
    assert.ok(reportPath, `Berichtspfad fehlt in stderr:\n${result.stderr}`);
    const report = readFileSync(reportPath, 'utf8');
    assert.match(report, /Neu bewertet aus: .*saved-run\.json/);
    assert.match(report, /Antwort \(gekürzt\)/);
  } finally {
    rmSync(reportDir, { recursive: true, force: true });
  }
});
