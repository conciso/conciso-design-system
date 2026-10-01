// Tests für tools/release/tag-has-mcp.mjs: der Fakt `tagHasMcp` für decide.mjs wird aus dem
// Baum des getaggten Commits gelesen. Der MCP-Server liegt je nach Alter des Tags unter
// mcp-server/ (vor dem Umzug) oder packages/mcp/ (danach); beide Baumformen müssen gelten.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { tagHasMcp, MCP_MANIFEST_PATHS } from './tag-has-mcp.mjs';

function git(cwd, ...args) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 't',
      GIT_AUTHOR_EMAIL: 't@example.com',
      GIT_COMMITTER_NAME: 't',
      GIT_COMMITTER_EMAIL: 't@example.com',
    },
  });
}

// Legt ein Repo mit einem Commit an, der genau `dateien` enthält, und taggt ihn.
function repoMitTag(dateien, { annotiert }) {
  const dir = mkdtempSync(join(tmpdir(), 'tag-has-mcp-'));
  git(dir, 'init', '-q', '-b', 'main');
  for (const pfad of dateien) {
    mkdirSync(join(dir, pfad, '..'), { recursive: true });
    writeFileSync(join(dir, pfad), '{}\n');
  }
  git(dir, 'add', '-A');
  git(dir, 'commit', '-q', '-m', 'init');
  if (annotiert) git(dir, 'tag', '-a', 'v1.0.0', '-m', 'v1.0.0');
  else git(dir, 'tag', 'v1.0.0');
  return dir;
}

test('Baum vor dem Umzug (mcp-server/package.json) hat den MCP-Server', () => {
  const dir = repoMitTag(['mcp-server/package.json', 'package.json'], { annotiert: true });
  try {
    assert.equal(tagHasMcp('v1.0.0', { cwd: dir }), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Baum nach dem Umzug (packages/mcp/package.json) hat den MCP-Server', () => {
  const dir = repoMitTag(['packages/mcp/package.json', 'package.json'], { annotiert: true });
  try {
    assert.equal(tagHasMcp('v1.0.0', { cwd: dir }), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Baum ohne MCP-Server (vor ADR-0012) hat ihn nicht', () => {
  const dir = repoMitTag(['package.json', 'angular-lib/package.json'], { annotiert: true });
  try {
    assert.equal(tagHasMcp('v1.0.0', { cwd: dir }), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('leichtgewichtiger Alt-Tag wird genauso aufgelöst wie ein annotierter', () => {
  const alt = repoMitTag(['mcp-server/package.json'], { annotiert: false });
  const neu = repoMitTag(['packages/mcp/package.json'], { annotiert: false });
  try {
    assert.equal(tagHasMcp('v1.0.0', { cwd: alt }), true);
    assert.equal(tagHasMcp('v1.0.0', { cwd: neu }), true);
  } finally {
    rmSync(alt, { recursive: true, force: true });
    rmSync(neu, { recursive: true, force: true });
  }
});

test('ein unbekannter Tag zählt als „ohne MCP“ statt zu werfen (sicherer Rückfall)', () => {
  const dir = repoMitTag(['package.json'], { annotiert: true });
  try {
    assert.equal(tagHasMcp('v9.9.9', { cwd: dir }), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('beide Manifest-Pfade sind eingetragen', () => {
  assert.deepEqual([...MCP_MANIFEST_PATHS].sort(), ['mcp-server/package.json', 'packages/mcp/package.json']);
});

test('CLI gibt true bzw. false aus und endet immer mit Exit-Code 0', () => {
  const dir = repoMitTag(['mcp-server/package.json'], { annotiert: true });
  try {
    const skript = join(import.meta.dirname, 'tag-has-mcp.mjs');
    assert.equal(execFileSync('node', [skript, 'v1.0.0'], { cwd: dir, encoding: 'utf8' }).trim(), 'true');
    assert.equal(execFileSync('node', [skript, 'v9.9.9'], { cwd: dir, encoding: 'utf8' }).trim(), 'false');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
