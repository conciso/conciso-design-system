#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { renderReport } from './run-eval.mjs';
import { reevaluateSavedRun } from './saved-run.mjs';

function main() {
  const savedRunArg = process.argv[2];
  if (!savedRunArg) {
    throw new Error('Pfad zu einem gespeicherten Eval-Lauf fehlt.');
  }
  const savedRunPath = resolve(savedRunArg);
  if (!existsSync(savedRunPath)) {
    throw new Error(`Gespeicherter Eval-Lauf nicht gefunden: „${savedRunPath}“.`);
  }

  const savedRun = JSON.parse(readFileSync(savedRunPath, 'utf8'));
  const currentQuestions = JSON.parse(
    readFileSync(new URL('./fragen.json', import.meta.url), 'utf8'),
  ).questions;
  const results = reevaluateSavedRun(savedRun, currentQuestions);
  const report = renderReport(results, {
    tarballPath: savedRun.source?.tarballPath ?? '(unbekannt)',
    onlyId: savedRun.source?.onlyId ?? null,
    onlyVariant: savedRun.source?.onlyVariant ?? null,
    sourceRunPath: savedRunPath,
  });
  const reportDir = process.env.CDS_MCP_EVAL_REPORT_DIR ?? tmpdir();
  const reportPath = join(reportDir, `cds-mcp-eval-recheck-report-${Date.now()}.md`);
  writeFileSync(reportPath, report, 'utf8');
  console.log(report);
  console.error(`\n→ Bericht geschrieben: ${reportPath}`);
}

try {
  main();
} catch (err) {
  console.error(`Neubewertung fehlgeschlagen: ${err.stack ?? err.message}`);
  process.exit(1);
}
