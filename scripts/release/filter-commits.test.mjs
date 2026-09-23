// Tests für scripts/release/filter-commits.mjs (Seam: Commits mit berührten Dateien → relevante
// Teilmenge, Merge-Commits ausgeschlossen — .scratch/automatische-releases/spec.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterRelevantCommits } from './filter-commits.mjs';

test('behält Commits, die einen veröffentlichungsrelevanten Pfad berühren', () => {
  const commits = [
    { hash: 'a', isMerge: false, files: ['css/components.css'] },
    { hash: 'b', isMerge: false, files: ['storybook-angular/src/lib/button.stories.ts'] },
  ];
  assert.deepEqual(
    filterRelevantCommits(commits).map((c) => c.hash),
    ['a'],
  );
});

test('schließt Merge-Commits aus, auch wenn sie relevante Dateien auflisten', () => {
  // Merge-Commits berühren laut ADR-0008 nichts selbst (git diff-tree ohne -m); ein
  // Analyzer könnte ihnen trotzdem Dateien zuordnen, deshalb prüft der Filter isMerge
  // zusätzlich zu den files.
  const commits = [{ hash: 'm', isMerge: true, files: ['css/components.css'] }];
  assert.deepEqual(filterRelevantCommits(commits), []);
});

test('leere Commit-Liste ergibt leere relevante Teilmenge', () => {
  assert.deepEqual(filterRelevantCommits([]), []);
});
