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
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { analyzeCommits as baseAnalyzeCommits } from '@semantic-release/commit-analyzer';
import { generateNotes as baseGenerateNotes } from '@semantic-release/release-notes-generator';
import { filterRelevantCommits } from './filter-commits.mjs';
import { enrichCommit } from './git-commit-files.mjs';
import { BUMP_RULES, PARSER_OPTS } from './compute-bump.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const NOTES_OUTPUT_PATH = join(ROOT, 'release-notes-generated.md');

// Parser-Optionen (breakingHeaderPattern für „!“, noteKeywords für BREAKING-CHANGE) stehen in
// compute-bump.mjs — dieselben für Analyzer, Notes und die PR-Übersicht, Begründung dort.

// Release-Notes: jeder relevante Commit erscheint (ADR-0008). Der Preset „angular“ verwirft im
// Writer alle nicht-breaking Commits außerhalb von feat/fix/perf/revert — ein build(deps), das
// einen Patch auslöst, fehlte damit in den Notes des eigenen Releases, ebenso docs/chore an
// ausgeliefertem Inhalt. Dieser Transform behält sie: Er ruft den Preset-Transform auf und,
// wenn der verwirft, ein zweites Mal mit einer Markierungs-Note — die hebt das Verwerfen auf
// und wird danach wieder entfernt. So bleiben Gruppierung, Links und Formatierung des Presets
// erhalten. Typen, die der Preset nicht benennt (chore, ohne Typ), landen unter „Sonstiges“.
//
// Geladen wird der Preset aus Sicht des Notes-Generators: dieselbe Version, die er selbst nutzt
// (er bringt eine eigene mit, die von der im Root-node_modules abweicht).
const ausSichtDesGenerators = createRequire(
  createRequire(import.meta.url).resolve('@semantic-release/release-notes-generator'),
);
const { default: angularPreset } = await import(
  pathToFileURL(ausSichtDesGenerators.resolve('conventional-changelog-angular')).href
);
const presetTransform = angularPreset().writer.transform;
const BEHALTEN = '\u0000behalten';

export function transformAlleBehalten(commit, context) {
  const regulaer = presetTransform(commit, context);
  if (regulaer) return regulaer;
  const erzwungen = presetTransform(
    { ...commit, notes: [...(commit.notes ?? []), { title: 'BREAKING CHANGE', text: BEHALTEN }] },
    context,
  );
  if (!erzwungen) return erzwungen;
  return {
    ...erzwungen,
    notes: erzwungen.notes.filter((note) => note.text !== BEHALTEN),
    type: erzwungen.type && erzwungen.type !== commit.type ? erzwungen.type : 'Sonstiges',
  };
}

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
    { ...pluginConfig, ...PARSER_OPTS, releaseRules: BUMP_RULES },
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
    { ...pluginConfig, ...PARSER_OPTS, writerOpts: { transform: transformAlleBehalten } },
    { ...context, commits: relevant },
  );
  const notes = `${FROZEN_CHANGELOG_LINK}\n\n${generated}`;
  writeFileSync(NOTES_OUTPUT_PATH, `${notes}\n`);
  return notes;
}
