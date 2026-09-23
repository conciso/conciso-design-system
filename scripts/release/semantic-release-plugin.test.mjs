// Regressionstest für einen von der Standards-/Spec-Review gefundenen echten Bug: der
// Standard-Preset „angular“ von @semantic-release/commit-analyzer /
// -release-notes-generator kennt kein „!“ im Header — nur ein BREAKING-CHANGE:-Footer galt
// dort als breaking. Ein Commit wie „feat(lib)!: …“ OHNE Footer hätte damit unbemerkt GAR
// KEIN Release ausgelöst statt major (ADR-0008 Regel 4), obwohl compute-bump.mjs (für die
// PR-Job-Summary) „!“ korrekt erkennt — zwei Stellen, die auseinanderlaufen konnten.
// Getestet wird hier bewusst DIREKT gegen @semantic-release/commit-analyzer mit den
// exportierten Optionen aus semantic-release-plugin.mjs (statt über dessen `analyzeCommits`,
// das zusätzlich echte Git-Aufrufe braucht) — so bleibt der Test schnell und
// deterministisch, prüft aber den tatsächlichen Mechanismus (breakingHeaderPattern), der den
// Bug behebt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { BUMP_RULES } from './compute-bump.mjs';
import { BREAKING_HEADER_PARSER_OPTS } from './semantic-release-plugin.mjs';

const logger = { log: () => {}, error: () => {} };

function analyze(commits) {
  return analyzeCommits(
    { releaseRules: BUMP_RULES, ...BREAKING_HEADER_PARSER_OPTS },
    { commits, logger, cwd: process.cwd(), env: process.env },
  );
}

test('ein "!" am Header OHNE BREAKING CHANGE-Footer löst trotzdem major aus', async () => {
  const commits = [{ hash: 'abc1234', message: 'feat(lib)!: nur Header-Bang, kein Footer' }];
  assert.equal(await analyze(commits), 'major');
});

test('ohne breakingHeaderPattern würde derselbe Commit KEIN Release auslösen (Beleg für den Bug)', async () => {
  // Dokumentiert den Ist-Zustand vor dem Fix: der Standard-Preset „angular“ ignoriert „!“
  // vollständig, wenn kein Footer da ist. Schlägt dieser Test irgendwann fehl, hat sich das
  // Verhalten von @semantic-release/commit-analyzer geändert und BREAKING_HEADER_PARSER_OPTS
  // ist ggf. nicht mehr nötig — dann bewusst prüfen, nicht nur die Assertion drehen.
  const commits = [{ hash: 'abc1234', message: 'feat(lib)!: nur Header-Bang, kein Footer' }];
  const result = await analyzeCommits(
    { releaseRules: BUMP_RULES },
    { commits, logger, cwd: process.cwd(), env: process.env },
  );
  assert.equal(result, null);
});

test('ein regulärer BREAKING CHANGE-Footer funktioniert weiterhin (Regressionsschutz)', async () => {
  const commits = [
    {
      hash: 'def5678',
      message: 'fix(lib): Verhalten korrigieren\n\nBREAKING CHANGE: altes Signal entfernt',
    },
  ];
  assert.equal(await analyze(commits), 'major');
});

test('feat ohne "!" und ohne Footer bleibt minor (kein falsch-positives major)', async () => {
  const commits = [{ hash: 'ghi9012', message: 'feat(lib): neue Variante ergänzen' }];
  assert.equal(await analyze(commits), 'minor');
});
