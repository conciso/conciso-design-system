// Tests für tools/release/stamp-version.mjs (Seam: Version + Peer-Pin korrekt und idempotent
// geschrieben — ADR-0010, „versionsfreies Repo“).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stampVersion } from './stamp-version.mjs';

function makeFixtureRoot() {
  const root = mkdtempSync(join(tmpdir(), 'stamp-version-'));
  // Die Workspace-Wurzel ist privat und trägt keine Version; das Stempeln fasst sie nicht an.
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({ name: 'conciso-design-system-repo', version: '0.0.0', private: true }),
  );
  const cssDir = join(root, 'packages/css');
  mkdirSync(cssDir, { recursive: true });
  writeFileSync(
    join(cssDir, 'package.json'),
    JSON.stringify({ name: '@conciso/design-system', version: '0.0.0' }),
  );
  const libDir = join(root, 'packages/angular');
  mkdirSync(libDir, { recursive: true });
  writeFileSync(
    join(libDir, 'package.json'),
    JSON.stringify({
      name: 'lib',
      version: '0.0.0',
      peerDependencies: { '@angular/core': '^21.2.0', '@conciso/design-system': '0.0.x' },
    }),
  );
  // Drittes Lockstep-Paket (ADR-0012): keine Peer-Pin, nur eine Version.
  const mcpDir = join(root, 'packages/mcp');
  mkdirSync(mcpDir, { recursive: true });
  writeFileSync(
    join(mcpDir, 'package.json'),
    JSON.stringify({ name: '@conciso/design-system-mcp', version: '0.0.0' }),
  );
  return root;
}

function readPkg(...segments) {
  return JSON.parse(readFileSync(join(...segments), 'utf8'));
}

test('schreibt die Version in die drei Paket-package.json und die Peer-Pin der Lib', () => {
  const root = makeFixtureRoot();
  try {
    stampVersion('2.0.0', root);

    const cssPkg = readPkg(root, 'packages/css/package.json');
    assert.equal(cssPkg.version, '2.0.0');

    // Die private Workspace-Wurzel wird nicht gestempelt: sie wird nie veröffentlicht.
    assert.equal(readPkg(root, 'package.json').version, '0.0.0');

    const libPkg = readPkg(root, 'packages/angular/package.json');
    assert.equal(libPkg.version, '2.0.0');
    assert.equal(libPkg.peerDependencies['@conciso/design-system'], '2.0.x');
    // andere Peers bleiben unangetastet
    assert.equal(libPkg.peerDependencies['@angular/core'], '^21.2.0');

    // Drittes Lockstep-Paket (ADR-0012): reiner Versionsstempel, keine Peer-Pin — der
    // MCP-Server prüft die installierte Angular-Lib zur Laufzeit statt sie zu pinnen
    // (siehe packages/mcp/src/version-check.mjs).
    const mcpPkg = readPkg(root, 'packages/mcp/package.json');
    assert.equal(mcpPkg.version, '2.0.0');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('ist idempotent: zweimaliges Stempeln derselben Version liefert dasselbe Ergebnis', () => {
  const root = makeFixtureRoot();
  try {
    stampVersion('2.0.0', root);
    stampVersion('2.0.0', root);

    const cssPkg = readPkg(root, 'packages/css/package.json');
    const libPkg = readPkg(root, 'packages/angular/package.json');
    const mcpPkg = readPkg(root, 'packages/mcp/package.json');
    assert.equal(cssPkg.version, '2.0.0');
    assert.equal(libPkg.version, '2.0.0');
    assert.equal(libPkg.peerDependencies['@conciso/design-system'], '2.0.x');
    assert.equal(mcpPkg.version, '2.0.0');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('bricht ab, wenn die Peer-Pin auf @conciso/design-system in der Lib fehlt', () => {
  // Sonst würde die Lib mit einer falschen/offenen Range gegen die CSS-Schicht
  // veröffentlicht, ohne dass irgendwas den gebrochenen Lockstep meldet (ADR-0004).
  // Bewusst OHNE MCP-Fixture: die Peer-Pin-Prüfung wirft, bevor packages/mcp/package.json
  // überhaupt gelesen wird — belegt zugleich, dass kein drittes Manifest angefasst wird.
  const root = mkdtempSync(join(tmpdir(), 'stamp-version-'));
  try {
    const cssDir = join(root, 'packages/css');
    mkdirSync(cssDir, { recursive: true });
    writeFileSync(join(cssDir, 'package.json'), JSON.stringify({ name: 'css', version: '0.0.0' }));
    const libDir = join(root, 'packages/angular');
    mkdirSync(libDir, { recursive: true });
    writeFileSync(
      join(libDir, 'package.json'),
      JSON.stringify({ name: 'lib', version: '0.0.0', peerDependencies: { '@angular/core': '^21.2.0' } }),
    );
    assert.throws(() => stampVersion('2.0.0', root), /peerDependency/);
    // Kein halb gestempelter Checkout: der Abbruch darf auch die CSS-package.json nicht
    // angefasst haben, sonst wäre ein erneuter Versuch nicht mehr sauber.
    assert.equal(JSON.parse(readFileSync(join(cssDir, 'package.json'), 'utf8')).version, '0.0.0');
    assert.equal(JSON.parse(readFileSync(join(libDir, 'package.json'), 'utf8')).version, '0.0.0');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('lehnt eine ungültige Version ab', () => {
  const root = makeFixtureRoot();
  try {
    assert.throws(() => stampVersion('nicht-semver', root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('lehnt führende Nullen in einer SemVer-Komponente ab', () => {
  const root = makeFixtureRoot();
  try {
    assert.throws(() => stampVersion('01.2.3', root));
    assert.throws(() => stampVersion('1.02.3', root));
    assert.throws(() => stampVersion('1.2.03', root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('akzeptiert eine Prerelease-Bootstrap-Version (npmjs-Erst-Publish, CONTRIBUTING § 15)', () => {
  const root = makeFixtureRoot();
  try {
    const { peerRange } = stampVersion('0.0.0-bootstrap.0', root);
    assert.equal(peerRange, '0.0.x');

    const cssPkg = readPkg(root, 'packages/css/package.json');
    assert.equal(cssPkg.version, '0.0.0-bootstrap.0');
    const libPkg = readPkg(root, 'packages/angular/package.json');
    assert.equal(libPkg.version, '0.0.0-bootstrap.0');
    assert.equal(libPkg.peerDependencies['@conciso/design-system'], '0.0.x');
    // Auch der MCP-Server bekommt den Bootstrap-Platzhalter gestempelt — derselbe
    // Erst-Publish-Schritt gilt seit ADR-0012 für alle drei Pakete (CONTRIBUTING § 15).
    const mcpPkg = readPkg(root, 'packages/mcp/package.json');
    assert.equal(mcpPkg.version, '0.0.0-bootstrap.0');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
