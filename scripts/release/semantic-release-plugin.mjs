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
    // Bump-Tabelle mit eigener Bedeutung.
    { ...pluginConfig, releaseRules: BUMP_RULES },
    { ...context, commits: relevant },
  );
}

// Verlinkt den eingefrorenen CHANGELOG-Stand (Spec Regel 11): der handgeschriebene
// CHANGELOG endet mit 2.0.0, alles danach steht nur noch in den generierten Notes.
const FROZEN_CHANGELOG_LINK =
  'Änderungen bis Version 2.0.0 stehen im eingefrorenen [CHANGELOG](../CHANGELOG.md). Ab hier liefert jedes GitHub-Release seine eigenen Notes.';

export async function generateNotes(pluginConfig, context) {
  const relevant = filterCommits(context.commits, context.cwd);
  const generated = await baseGenerateNotes(pluginConfig, { ...context, commits: relevant });
  const notes = `${FROZEN_CHANGELOG_LINK}\n\n${generated}`;
  writeFileSync(NOTES_OUTPUT_PATH, `${notes}\n`);
  return notes;
}
