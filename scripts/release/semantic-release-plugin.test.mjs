// Regressionstest für einen von der Standards-/Spec-Review gefundenen echten Bug: der
// Standard-Preset „angular“ von @semantic-release/commit-analyzer /
// -release-notes-generator kennt kein „!“ im Header — nur ein BREAKING-CHANGE:-Footer galt
// dort als breaking. Ein Commit wie „feat(lib)!: …“ OHNE Footer hätte damit unbemerkt GAR
// KEIN Release ausgelöst statt major (ADR-0009 Regel 4), obwohl compute-bump.mjs (für die
// PR-Job-Summary) „!“ korrekt erkennt — zwei Stellen, die auseinanderlaufen konnten.
// Getestet wird hier bewusst DIREKT gegen @semantic-release/commit-analyzer mit den
// exportierten Optionen aus semantic-release-plugin.mjs (statt über dessen `analyzeCommits`,
// das zusätzlich echte Git-Aufrufe braucht) — so bleibt der Test schnell und
// deterministisch, prüft aber den tatsächlichen Mechanismus (breakingHeaderPattern), der den
// Bug behebt.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes as baseGenerateNotes } from '@semantic-release/release-notes-generator';
import { BUMP_RULES, PARSER_OPTS } from './compute-bump.mjs';
import { transformAlleBehalten } from './semantic-release-plugin.mjs';

const logger = { log: () => {}, error: () => {} };

function analyze(commits) {
  return analyzeCommits(
    { releaseRules: BUMP_RULES, ...PARSER_OPTS },
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
  // Verhalten von @semantic-release/commit-analyzer geändert und PARSER_OPTS
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

test('ein Git-Revert löst KEIN Release aus (kein Rückfall auf die Standardregeln)', async () => {
  // Ohne die explizite Revert-Regel in BUMP_RULES fiele der commit-analyzer auf seine
  // Standardregeln zurück, die einen Revert als patch werten — die PR-Summary
  // (computeBump) sagte dann „Kein Release“, veröffentlicht würde trotzdem.
  const commits = [
    {
      hash: 'jkl3456',
      message:
        'Revert "feat(lib): neue Variante ergänzen"\n\nThis reverts commit ghi9012ghi9012ghi9012ghi9012ghi9012ghi90.',
    },
  ];
  assert.equal(await analyze(commits), null);
});

test('feat ohne "!" und ohne Footer bleibt minor (kein falsch-positives major)', async () => {
  const commits = [{ hash: 'ghi9012', message: 'feat(lib): neue Variante ergänzen' }];
  assert.equal(await analyze(commits), 'minor');
});

test('BREAKING-CHANGE: (Bindestrich) im Footer löst auch in der Engine major aus', async () => {
  // Der Preset kennt nur „BREAKING CHANGE“; ohne noteKeywords in PARSER_OPTS lief die
  // Engine hier auf patch, während die PR-Übersicht major zeigte.
  const commits = [{ hash: 'mno7890', message: 'fix(lib): Signal umbenennen\n\nBREAKING-CHANGE: altes Signal entfernt' }];
  assert.equal(await analyze(commits), 'major');
});

// Notes so erzeugen wie generateNotes() im Plugin, aber ohne Git-Aufrufe für den Pfadfilter
// (die Commits hier gelten als bereits gefiltert).
function notes(commits, writerOpts) {
  return baseGenerateNotes(
    { ...PARSER_OPTS, ...(writerOpts ? { writerOpts } : {}) },
    {
      commits,
      logger,
      cwd: process.cwd(),
      env: process.env,
      options: { repositoryUrl: 'https://github.com/conciso/conciso-design-system' },
      lastRelease: { gitTag: 'v2.0.0' },
      nextRelease: { version: '2.0.1', gitTag: 'v2.0.1' },
    },
  );
}

const nichtVomPresetBenannt = [
  { hash: 'a'.repeat(40), message: 'build(deps): ng-icons auf 36 heben' },
  { hash: 'b'.repeat(40), message: 'docs(readme): Installationsschritt ergänzen' },
  { hash: 'c'.repeat(40), message: 'chore: Paket-Metadaten aufräumen' },
];

test('Notes: build(deps), docs und chore an ausgeliefertem Inhalt erscheinen', async () => {
  const text = await notes(
    [{ hash: 'd'.repeat(40), message: 'fix(css): Fokusring nachziehen' }, ...nichtVomPresetBenannt],
    { transform: transformAlleBehalten },
  );
  assert.match(text, /ng-icons auf 36 heben/);
  assert.match(text, /Installationsschritt ergänzen/);
  assert.match(text, /Paket-Metadaten aufräumen/);
  assert.match(text, /Fokusring nachziehen/);
  assert.doesNotMatch(text, /behalten/, 'die Markierungs-Note darf nicht in den Notes stehen');
  assert.doesNotMatch(text, /BREAKING/, 'kein Commit hier ist breaking');
});

test('Notes: ohne den Transform fehlen genau diese Commits (Beleg für den Bug)', async () => {
  const text = await notes(nichtVomPresetBenannt);
  assert.doesNotMatch(text, /ng-icons auf 36 heben/);
});
