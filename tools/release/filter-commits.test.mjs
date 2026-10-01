// Tests für tools/release/filter-commits.mjs (Seam: Commits mit berührten Dateien → relevante
// Teilmenge, Merge-Commits ausgeschlossen — ADR-0010 Regel 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterRelevantCommits } from './filter-commits.mjs';

test('behält Commits, die einen veröffentlichungsrelevanten Pfad berühren', () => {
  const commits = [
    { hash: 'a', isMerge: false, files: ['packages/css/css/components.css'] },
    // Storybook-KONFIGURATION (außerhalb src/) bleibt unsichtbar (siehe Kommentar in
    // relevant-paths.mjs) — anders als apps/storybook/src/** selbst, das seit ADR-0012
    // relevant ist (Stories/MDX gehen in den MCP-Snapshot ein).
    { hash: 'b', isMerge: false, files: ['apps/storybook/.storybook/main.ts'] },
  ];
  assert.deepEqual(
    filterRelevantCommits(commits).map((c) => c.hash),
    ['a'],
  );
});

test('schließt Merge-Commits aus, auch wenn sie relevante Dateien auflisten', () => {
  // Merge-Commits berühren laut ADR-0010 nichts selbst (git diff-tree ohne -m); ein
  // Analyzer könnte ihnen trotzdem Dateien zuordnen, deshalb prüft der Filter isMerge
  // zusätzlich zu den files.
  const commits = [{ hash: 'm', isMerge: true, files: ['packages/css/css/components.css'] }];
  assert.deepEqual(filterRelevantCommits(commits), []);
});

test('leere Commit-Liste ergibt leere relevante Teilmenge', () => {
  assert.deepEqual(filterRelevantCommits([]), []);
});
