// Dünne Hülle um @semantic-release/commit-analyzer + @semantic-release/release-notes-generator
// (ADR-0008 Regel 6): filtert Commits zuerst über den gemeinsamen Pfad-Filter
// (relevant-paths.mjs / filter-commits.mjs) und wendet dann die Bump-Regeln aus
// compute-bump.mjs als `releaseRules` auf den Analyzer an. So bleibt die Bump-Logik an
// EINER Stelle definiert (Regel 4) statt zusätzlich in einer semantic-release-eigenen
// Konfiguration dupliziert zu werden.
//
// Notes bekommen zusätzlich einen statischen Verweis auf den eingefrorenen
// CHANGELOG-Abschnitt vorangestellt (Spec Regel 11) und werden als Datei abgelegt
// (release-notes-generated.md, siehe .gitignore), weil der Publish-Workflow sie in einem
// eigenen Job (Consumer-Smoke-Test dazwischen) braucht — Job-Outputs sind für mehrzeiligen
// Text unhandlich, eine Datei via actions/upload-artifact ist die robustere Übergabe
// (Spec Regel 6: „… oder gleichwertig in Dateien/$GITHUB_OUTPUT“).
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { analyzeCommits as baseAnalyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes as baseGenerateNotes } from '@semantic-release/release-notes-generator';
import { filterRelevantCommits } from './filter-commits.mjs';
import { enrichCommit } from './git-commit-files.mjs';
import { BUMP_RULES } from './compute-bump.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const NOTES_OUTPUT_PATH = join(ROOT, 'release-notes-generated.md');

// WICHTIG: Der Standard-Preset "angular" von @semantic-release/commit-analyzer /
// -release-notes-generator kennt in seinem headerPattern KEIN „!“ (nur ein
// BREAKING-CHANGE-Footer gilt dort als breaking, siehe conventional-changelog-angular/src/parser.js).
// Ein Commit wie „feat(lib)!: …“ OHNE zusätzlichen Footer würde damit unbemerkt GAR KEIN
// Release auslösen statt major — ein eigenständiger Bruch von ADR-0008 Regel 4 („! ODER
// BREAKING CHANGE:“), unabhängig davon, dass compute-bump.mjs „!“ für die PR-Job-Summary
// korrekt erkennt. Verifiziert: ohne diesen Override liefert analyzeCommits für
// „feat(lib)!: …“ ohne Footer `null` statt `major`.
//
// Der naheliegende Fix (preset: 'conventionalcommits', das „!“ nativ kennt) bricht: dessen
// installierte Version verlangt einen neueren conventional-changelog-writer, als
// @semantic-release/release-notes-generator@14 mitbringt („Missing helper“-Fehler beim
// Rendern). Stattdessen bleibt der Preset „angular“ (kompatibel, unverändert), und nur der
// Parser bekommt zusätzlich `breakingHeaderPattern` — ein offizieller Mechanismus von
// conventional-commits-parser (siehe CommitParser.js#parseBreakingHeader): matcht das Muster
// auf den Header, ohne dass bereits ein Footer-Note existiert, wird eine synthetische
// „BREAKING CHANGE“-Note aus der dritten Gruppe (dem Subject) erzeugt — genau das, was
// commit-analyzer für `{ breaking: true }`-Regeln prüft (`commit.notes.length > 0`).
export const BREAKING_HEADER_PARSER_OPTS = {
  parserOpts: { breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/ },
};

// semantic-release liefert pro Commit nur hash/message/gitTags/committerDate — welche
// Dateien er berührt und ob es ein Merge-Commit ist, liefert es NICHT mit (siehe
// semantic-release/lib/git.js#getCommits). Das holen wir hier pro Commit über
// git-commit-files.mjs nach, bevor der gemeinsame Pfad-Filter läuft.
function filterCommits(commits, cwd) {
  const enriched = commits.map((commit) => ({ ...commit, ...enrichCommit(commit.hash, cwd) }));
  return filterRelevantCommits(enriched);
}

export async function analyzeCommits(pluginConfig, context) {
  const relevant = filterCommits(context.commits, context.cwd);
  return baseAnalyzeCommits(
    // BUMP_RULES ist dasselbe Format, das @semantic-release/commit-analyzer als
    // `releaseRules` erwartet — direkt aus compute-bump.mjs übernommen, keine zweite
    // Bump-Tabelle mit eigener Bedeutung. breakingHeaderPattern s.o.
    { ...pluginConfig, ...BREAKING_HEADER_PARSER_OPTS, releaseRules: BUMP_RULES },
    { ...context, commits: relevant },
  );
}

// Verlinkt den eingefrorenen CHANGELOG-Stand (Spec Regel 11): der handgeschriebene
// CHANGELOG endet mit 2.0.0, alles danach steht nur noch in den generierten Notes.
// Absolute URL statt relativem Pfad: Die Notes werden auf der Release-Seite
// (…/releases/tag/vX.Y.Z) gerendert, dort löst ein relativer Link unterhalb von
// /releases/ auf und zeigt ins Leere. Fest auf `main`, weil der eingefrorene Stand
// dort dauerhaft liegt.
const FROZEN_CHANGELOG_LINK =
  'Änderungen bis Version 2.0.0 stehen im eingefrorenen [CHANGELOG](https://github.com/conciso/conciso-design-system/blob/main/CHANGELOG.md#200---2026-09-23). Ab hier liefert jedes GitHub-Release seine eigenen Notes.';

export async function generateNotes(pluginConfig, context) {
  const relevant = filterCommits(context.commits, context.cwd);
  const generated = await baseGenerateNotes(
    { ...pluginConfig, ...BREAKING_HEADER_PARSER_OPTS },
    { ...context, commits: relevant },
  );
  const notes = `${FROZEN_CHANGELOG_LINK}\n\n${generated}`;
  writeFileSync(NOTES_OUTPUT_PATH, `${notes}\n`);
  return notes;
}
