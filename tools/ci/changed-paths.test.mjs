// Tests für tools/ci/changed-paths.mjs (Fast Exit der Pflicht-Checks bei PRs ohne relevante Änderung).
// Stil wie tools/ci/story-links.test.mjs: node:test + node:assert/strict, keine Dependencies.
//
// Seam ist decide(): Event und Diff werden hineingereicht, Git und $GITHUB_OUTPUT bleiben in der
// CLI-Hülle.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, isRelevant, matchesPattern } from './changed-paths.mjs';

const PATTERNS = ['apps/storybook/**', 'packages/css/**', 'package.json', '.github/workflows/visual.yml'];
const pr = (files) => decide(PATTERNS, { event: 'pull_request', changedFiles: () => files });

test('Ordnermuster trifft Dateien darunter, auch tief verschachtelt', () => {
  assert.equal(matchesPattern('apps/storybook/src/a/b.ts', 'apps/storybook/**'), true);
});

test('Ordnermuster trifft keinen Ordner mit gleichem Präfix', () => {
  assert.equal(matchesPattern('apps/storybook-old/a.ts', 'apps/storybook/**'), false);
});

test('exaktes Muster trifft nur genau diese Datei', () => {
  assert.equal(matchesPattern('package.json', 'package.json'), true);
  assert.equal(matchesPattern('packages/css/package.json', 'package.json'), false);
});

test('isRelevant: ein Treffer unter mehreren Dateien genügt', () => {
  assert.equal(isRelevant(['README.md', 'packages/css/css/a.css'], PATTERNS), true);
});

test('PR nur mit Doku und Tools → nicht relevant (Fast Exit)', () => {
  assert.equal(pr(['README.md', 'docs/adr/0013.md', 'tools/ci/story-links.mjs']), false);
});

test('PR mit Änderung am Workflow selbst → relevant', () => {
  assert.equal(pr(['.github/workflows/visual.yml']), true);
});

test('PR mit Änderung unter einem Ordnermuster → relevant', () => {
  assert.equal(pr(['docs/x.md', 'apps/storybook/.storybook/preview.ts']), true);
});

test('anderes Event als pull_request läuft immer (push, dispatch, workflow_call)', () => {
  for (const event of ['push', 'workflow_dispatch', 'schedule', null]) {
    assert.equal(decide(PATTERNS, { event, changedFiles: () => ['README.md'] }), true, String(event));
  }
});

test('Diff nicht ermittelbar → relevant (fail-safe)', () => {
  const kaputt = () => {
    throw new Error('git: bad revision HEAD^1');
  };
  assert.equal(decide(PATTERNS, { event: 'pull_request', changedFiles: kaputt }), true);
});

test('leerer Diff → relevant (fail-safe)', () => {
  assert.equal(pr([]), true);
});

test('ohne Muster → relevant (fail-safe)', () => {
  assert.equal(decide([], { event: 'pull_request', changedFiles: () => ['README.md'] }), true);
});
