// Bump-Berechnung (ADR-0008 Regel 4): aus den bereits gefilterten, veröffentlichungsrelevanten
// Commits die SemVer-Stufe ermitteln. feat → minor; fix, perf, build(deps) → patch; „!“ am Typ
// oder ein „BREAKING CHANGE:“-Footer → major (unabhängig vom Typ); alles andere → kein Release.
// Scopes außer `deps` bei `build` wirken sich nicht aus.

// Conventional-Commit-Kopfzeile: `typ(scope)!: betreff` oder `typ: betreff`.
const HEADER = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*.+$/;
// Footer-Token nach Conventional-Commits-Konvention: eigene Zeile, „BREAKING CHANGE:“ ODER
// „BREAKING-CHANGE:“ (beide Schreibweisen sind laut Spec gültig), nicht irgendwo im
// Fließtext des Bodys erwähnt.
const BREAKING_FOOTER = /^BREAKING[ -]CHANGE:/m;

const RANK = { patch: 1, minor: 2, major: 3 };

// EINE Tabelle für die Bump-Regeln aus ADR-0008 Regel 4 — exportiert, damit
// semantic-release-plugin.mjs sie 1:1 als `releaseRules` für
// @semantic-release/commit-analyzer übernimmt, statt sie ein zweites Mal von Hand
// nachzubilden (sonst könnten beide Stellen bei einer künftigen Regeländerung
// auseinanderlaufen). `breaking: true` matcht unabhängig vom Typ (siehe matchesRule unten);
// alles ohne passende Regel löst kein Release aus.
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

function matchesRule(rule, { type, scope, breaking }) {
  // Reverts haben keinen Conventional-Commit-Header (`Revert "feat: …"`) und kommen hier
  // gar nicht erst an; die Regel oben existiert nur für den commit-analyzer.
  if (rule.revert) return false;
  if (rule.breaking) return breaking;
  if (rule.type !== type) return false;
  if (rule.scope !== undefined && rule.scope !== scope) return false;
  return true;
}

function bumpForCommit(commit) {
  const match = HEADER.exec((commit.subject ?? '').trim());
  if (!match) return null;

  const [, type, scope, bang] = match;
  const breaking = Boolean(bang) || BREAKING_FOOTER.test(commit.body ?? '');

  for (const rule of BUMP_RULES) {
    if (matchesRule(rule, { type, scope, breaking })) return rule.release;
  }
  return null;
}

/**
 * @param {{ subject: string, body?: string }[]} commits Bereits gefilterte, relevante Commits.
 * @returns {'major'|'minor'|'patch'|null} Höchste ausgelöste Stufe, null = kein Release.
 */
export function computeBump(commits) {
  let bump = null;
  for (const commit of commits) {
    const candidate = bumpForCommit(commit);
    if (candidate && (!bump || RANK[candidate] > RANK[bump])) bump = candidate;
  }
  return bump;
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
