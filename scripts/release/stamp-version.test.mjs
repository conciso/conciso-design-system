// Tests für scripts/release/stamp-version.mjs (Seam: Version + Peer-Pin korrekt und idempotent
// geschrieben — .scratch/automatische-releases/spec.md Regel 7).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stampVersion } from './stamp-version.mjs';

function makeFixtureRoot() {
  const root = mkdtempSync(join(tmpdir(), 'stamp-version-'));
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'root', version: '0.0.0' }));
  const libDir = join(root, 'angular-lib/projects/design-system-angular');
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
  const mcpDir = join(root, 'mcp-server');
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

test('schreibt die Version in alle drei package.json und die Peer-Pin der Lib', () => {
  const root = makeFixtureRoot();
  try {
    stampVersion('2.0.0', root);

    const rootPkg = readPkg(root, 'package.json');
    assert.equal(rootPkg.version, '2.0.0');

    const libPkg = readPkg(root, 'angular-lib/projects/design-system-angular/package.json');
    assert.equal(libPkg.version, '2.0.0');
    assert.equal(libPkg.peerDependencies['@conciso/design-system'], '2.0.x');
    // andere Peers bleiben unangetastet
    assert.equal(libPkg.peerDependencies['@angular/core'], '^21.2.0');

    // Drittes Lockstep-Paket (ADR-0012): reiner Versionsstempel, keine Peer-Pin — der
    // MCP-Server prüft die installierte Angular-Lib zur Laufzeit statt sie zu pinnen
    // (siehe mcp-server/src/version-check.mjs).
    const mcpPkg = readPkg(root, 'mcp-server/package.json');
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

    const rootPkg = readPkg(root, 'package.json');
    const libPkg = readPkg(root, 'angular-lib/projects/design-system-angular/package.json');
    const mcpPkg = readPkg(root, 'mcp-server/package.json');
    assert.equal(rootPkg.version, '2.0.0');
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
  // Bewusst OHNE mcp-server/-Fixture: die Peer-Pin-Prüfung wirft, bevor mcp-server/package.json
  // überhaupt gelesen wird — belegt zugleich, dass kein drittes Manifest angefasst wird.
  const root = mkdtempSync(join(tmpdir(), 'stamp-version-'));
  try {
    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'root', version: '0.0.0' }));
    const libDir = join(root, 'angular-lib/projects/design-system-angular');
    mkdirSync(libDir, { recursive: true });
    writeFileSync(
      join(libDir, 'package.json'),
      JSON.stringify({ name: 'lib', version: '0.0.0', peerDependencies: { '@angular/core': '^21.2.0' } }),
    );
    assert.throws(() => stampVersion('2.0.0', root), /peerDependency/);
    // Kein halb gestempelter Checkout: der Abbruch darf auch die Root-package.json nicht
    // angefasst haben, sonst wäre ein erneuter Versuch nicht mehr sauber.
    assert.equal(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version, '0.0.0');
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

    const rootPkg = readPkg(root, 'package.json');
    assert.equal(rootPkg.version, '0.0.0-bootstrap.0');
    const libPkg = readPkg(root, 'angular-lib/projects/design-system-angular/package.json');
    assert.equal(libPkg.version, '0.0.0-bootstrap.0');
    assert.equal(libPkg.peerDependencies['@conciso/design-system'], '0.0.x');
    // Auch der MCP-Server bekommt den Bootstrap-Platzhalter gestempelt — derselbe
    // Erst-Publish-Schritt gilt seit ADR-0012 für alle drei Pakete (CONTRIBUTING § 15).
    const mcpPkg = readPkg(root, 'mcp-server/package.json');
    assert.equal(mcpPkg.version, '0.0.0-bootstrap.0');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
