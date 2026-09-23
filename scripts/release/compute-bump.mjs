// Bump-Berechnung (ADR-0010 Regel 4): aus den bereits gefilterten, veröffentlichungsrelevanten
// Commits die SemVer-Stufe ermitteln. feat → minor; fix, perf, build(deps) → patch; „!“ am Typ
// oder ein Footer „BREAKING CHANGE:“ / „BREAKING-CHANGE:“ → major (unabhängig vom Typ); alles
// andere → kein Release. Scopes außer `deps` bei `build` wirken sich nicht aus.
//
// EINE Implementierung für Engine und PR-Übersicht: computeBump() ruft denselben
// @semantic-release/commit-analyzer mit denselben Regeln und Parser-Optionen auf wie die Engine
// (semantic-release-plugin.mjs). Eine eigene Nachbildung der Regeln lief bei Sonderfällen
// auseinander — Revert-Paare (der Analyzer streicht einen Commit samt seinem Revert) und die
// Bindestrich-Schreibweise des Footers —, sodass die PR-Übersicht ein anderes Release anzeigte,
// als die Engine dann erzeugte.
import { analyzeCommits } from '@semantic-release/commit-analyzer';

// EINE Tabelle für die Bump-Regeln aus ADR-0010 Regel 4 — exportiert, damit
// semantic-release-plugin.mjs sie 1:1 als `releaseRules` für
// @semantic-release/commit-analyzer übernimmt, statt sie ein zweites Mal von Hand
// nachzubilden (sonst könnten beide Stellen bei einer künftigen Regeländerung
// auseinanderlaufen). `breaking: true` matcht unabhängig vom Typ; alles ohne passende Regel
// löst kein Release aus (siehe die Revert-Regel für den einen Rückfall des Analyzers).
export const BUMP_RULES = [
  { breaking: true, release: 'major' },
  { type: 'feat', release: 'minor' },
  { type: 'fix', release: 'patch' },
  { type: 'perf', release: 'patch' },
  { type: 'build', scope: 'deps', release: 'patch' },
  // Ausdrücklich KEIN Release für Git-Reverts. Nötig, weil @semantic-release/commit-analyzer
  // bei einem Commit ohne passende eigene Regel auf seine Standardregeln zurückfällt — und
  // die machen aus einem Revert ein patch. `release: false` zählt dort als Treffer und
  // verhindert den Rückfall. Wer einen Revert ausliefern will, schreibt einen `fix:`.
  { revert: true, release: false },
];

// Parser-Optionen, die Engine (Analyzer UND Notes) und PR-Übersicht gemeinsam nutzen.
//
// breakingHeaderPattern: Der Preset „angular“ kennt in seinem headerPattern KEIN „!“ — ein
// `feat(lib)!: …` ohne Footer löste damit gar kein Release aus statt major. Mit dem Muster
// erzeugt conventional-commits-parser für einen „!“-Header eine synthetische Breaking-Note,
// genau das, was der Analyzer für `{ breaking: true }` prüft. (Der Preset
// „conventionalcommits“ kennt „!“ nativ, verlangt aber einen neueren
// conventional-changelog-writer, als @semantic-release/release-notes-generator mitbringt.)
//
// noteKeywords: Der Preset kennt nur „BREAKING CHANGE“. Die Conventional-Commits-Spezifikation
// erlaubt ausdrücklich auch „BREAKING-CHANGE“ — ohne diese Ergänzung wäre so ein Footer für die
// Engine kein Bruch.
export const PARSER_OPTS = {
  parserOpts: {
    breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
    noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
  },
};

const STILL = { log: () => {}, error: () => {}, warn: () => {}, success: () => {} };

/**
 * @param {{ hash?: string, message?: string, subject?: string, body?: string }[]} commits
 *   Bereits gefilterte, relevante Commits in CHRONOLOGISCHER Reihenfolge (älteste zuerst).
 *   Ohne `hash` wird ein Platzhalter vergeben (nur für Tests); Revert-Paare erkennt der
 *   Analyzer über echte Hashes.
 * @returns {Promise<'major'|'minor'|'patch'|null>} Höchste ausgelöste Stufe, null = kein Release.
 */
export async function computeBump(commits) {
  if (commits.length === 0) return null;
  // Der Analyzer erwartet die Reihenfolge von `git log` (neueste zuerst), so wie semantic-release
  // sie liefert: nur dann findet sein Revert-Filter zu einem Revert den früheren Commit und
  // streicht beide. Chronologisch übergeben, bliebe das Paar stehen — und die PR-Übersicht
  // meldete ein Release, das die Engine nicht erzeugt.
  const eingabe = [...commits].reverse().map((commit, i) => ({
    hash: commit.hash ?? String(i + 1).padStart(40, '0'),
    message: commit.message ?? [commit.subject, commit.body].filter(Boolean).join('\n\n'),
  }));
  const stufe = await analyzeCommits(
    { releaseRules: BUMP_RULES, ...PARSER_OPTS },
    { commits: eingabe, logger: STILL, cwd: process.cwd(), env: process.env },
  );
  return stufe ?? null;
}

/**
 * Nächste Version nach SemVer aus der letzten Version und der Bump-Stufe. `null`, wenn kein
 * Release ausgelöst wird (Aufrufer soll das nicht mit einer echten Version verwechseln können).
 * @param {string} current z. B. "1.0.0"
 * @param {'major'|'minor'|'patch'|null} bump
 */
export function nextVersion(current, bump) {
  if (!bump) return null;
  const [major, minor, patch] = current.split('.').map(Number);
  if (bump === 'major') return `${major + 1}.0.0`;
  if (bump === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}
