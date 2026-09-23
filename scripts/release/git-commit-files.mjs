// Ergänzt einen Commit-Hash um die Angaben, die filterRelevantCommits() braucht: ob es ein
// Merge-Commit ist (mehr als ein Parent) und, falls nicht, welche Dateien er berührt.
// ADR-0008 Regel 1: Merge-Commits berühren nichts selbst (`git diff-tree` ohne `-m`) — hier
// über die Parent-Anzahl erkannt, robuster als sich auf ein leeres diff-tree-Ergebnis zu
// verlassen. Gemeinsam genutzt vom semantic-release-Plugin und dem commitlint-Check, damit
// beide dieselbe Definition von „berührte Dateien“ verwenden.
import { execFileSync } from 'node:child_process';

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

/**
 * @param {string} hash
 * @param {string} [cwd]
 * @returns {{ isMerge: boolean, files: string[] }}
 */
export function enrichCommit(hash, cwd = process.cwd()) {
  const parents = git(['rev-parse', `${hash}^@`], cwd)
    .split('\n')
    .filter(Boolean);
  const isMerge = parents.length > 1;
  const files = isMerge
    ? []
    : // --root: ohne liefert diff-tree für den allerersten Commit (keine Eltern) nichts.
      git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', hash], cwd)
        .split('\n')
        .filter(Boolean);
  return { isMerge, files };
}
