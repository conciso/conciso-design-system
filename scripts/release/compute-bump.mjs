// Bump-Berechnung (ADR-0008 Regel 4): aus den bereits gefilterten, veröffentlichungsrelevanten
// Commits die SemVer-Stufe ermitteln. feat → minor; fix, perf, build(deps) → patch; „!“ am Typ
// oder ein „BREAKING CHANGE:“-Footer → major (unabhängig vom Typ); alles andere → kein Release.
// Scopes außer `deps` bei `build` wirken sich nicht aus.

// Conventional-Commit-Kopfzeile: `typ(scope)!: betreff` oder `typ: betreff`.
const HEADER = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*.+$/;
const BREAKING_FOOTER = /BREAKING CHANGE:/;

const RANK = { patch: 1, minor: 2, major: 3 };

function bumpForCommit(commit) {
  const match = HEADER.exec((commit.subject ?? '').trim());
  if (!match) return null;

  const [, type, scope, bang] = match;
  const breaking = Boolean(bang) || BREAKING_FOOTER.test(commit.body ?? '');
  if (breaking) return 'major';

  if (type === 'feat') return 'minor';
  if (type === 'fix' || type === 'perf') return 'patch';
  if (type === 'build' && scope === 'deps') return 'patch';
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
