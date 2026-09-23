// Ergänzt einen Commit-Hash um die Angaben, die filterRelevantCommits() braucht: ob es ein
// Merge-Commit ist (mehr als ein Parent) und, falls nicht, welche Dateien er berührt.
// ADR-0009 Regel 1: Merge-Commits berühren nichts selbst (`git diff-tree` ohne `-m`) — hier
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
  // `rev-list --parents -n 1` liefert „<hash> <parent>…“ und ist auch für den Root-Commit
  // (keine Eltern) eindeutig definiert — unabhängig davon, wie eine Git-Version `<root>^@`
  // behandelt.
  const parents = git(['rev-list', '--parents', '-n', '1', hash], cwd)
    .split(/\s+/)
    .filter(Boolean)
    .slice(1);
  const isMerge = parents.length > 1;
  const files = isMerge
    ? []
    : // --root: ohne liefert diff-tree für den allerersten Commit (keine Eltern) nichts.
      git(['diff-tree', '--root', '--no-commit-id', '--name-only', '-r', hash], cwd)
        .split('\n')
        .filter(Boolean);
  return { isMerge, files };
}
