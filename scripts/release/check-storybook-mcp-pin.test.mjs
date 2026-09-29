// Tests für scripts/release/check-storybook-mcp-pin.mjs: beide Fälle gegen ein Fixture-
// Verzeichnis, nicht gegen den echten Checkout (das prüft der CI-Schritt „npm run
// check:storybook-mcp-pin“ separat, gegen node_modules nach einem echten „npm ci“).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { checkStorybookMcpPin } from './check-storybook-mcp-pin.mjs';

function makeFixture({ pinned, installed }) {
  const root = mkdtempSync(join(tmpdir(), 'storybook-mcp-pin-'));
  mkdirSync(join(root, 'mcp-server'), { recursive: true });
  writeFileSync(
    join(root, 'mcp-server', 'package.json'),
    JSON.stringify({ dependencies: { '@storybook/mcp': pinned } }),
  );
  mkdirSync(join(root, 'node_modules', 'storybook'), { recursive: true });
  writeFileSync(join(root, 'node_modules', 'storybook', 'package.json'), JSON.stringify({ version: installed }));
  return root;
}

test('Pin und installierte Version gleich → kein Fehler', () => {
  const root = makeFixture({ pinned: '10.6.0', installed: '10.6.0' });
  try {
    assert.deepEqual(checkStorybookMcpPin(root), { pinnedVersion: '10.6.0', installedVersion: '10.6.0' });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('Pin und installierte Version weichen ab → klare deutsche Fehlermeldung', () => {
  const root = makeFixture({ pinned: '10.6.0', installed: '10.7.0' });
  try {
    assert.throws(() => checkStorybookMcpPin(root), /Versions-Drift.*10\.6\.0.*10\.7\.0/s);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('kein installiertes „storybook“ gefunden → Fehler statt stiller Erfolg', () => {
  const root = mkdtempSync(join(tmpdir(), 'storybook-mcp-pin-'));
  mkdirSync(join(root, 'mcp-server'), { recursive: true });
  writeFileSync(
    join(root, 'mcp-server', 'package.json'),
    JSON.stringify({ dependencies: { '@storybook/mcp': '10.6.0' } }),
  );
  try {
    assert.throws(() => checkStorybookMcpPin(root), /nicht in node_modules gefunden/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
