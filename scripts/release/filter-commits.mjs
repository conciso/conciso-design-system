// Commit-Filter (ADR-0010 Regel 1): aus Commits mit ihren berührten Dateien die
// veröffentlichungsrelevante Teilmenge bilden. Merge-Commits zählen nie — sie berühren laut
// `git diff-tree` (ohne `-m`) nichts selbst, deshalb steht `isMerge` als eigenes Flag zusätzlich
// zu den `files`, statt sich allein darauf zu verlassen, dass ein Aufrufer ihnen leere files
// mitgibt.
import { isRelevant } from './relevant-paths.mjs';

/**
 * @param {{ files: string[], isMerge?: boolean }[]} commits
 * @returns Teilmenge der Commits, die einen veröffentlichungsrelevanten Pfad berühren.
 */
export function filterRelevantCommits(commits) {
  return commits.filter((commit) => !commit.isMerge && isRelevant(commit.files ?? []));
}
