// Tests für tools/release/relevant-paths.mjs (Seam aus ADR-0010 Regel 2/3).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { isRelevant, checkCoverage } from './relevant-paths.mjs';

// Fixture-Wurzel mit den drei Paket-package.json an den neuen Orten.
function makeRoot(filesByPackage) {
  const dir = mkdtempSync(join(tmpdir(), 'relevant-paths-coverage-'));
  for (const [name, files] of Object.entries(filesByPackage)) {
    mkdirSync(join(dir, 'packages', name), { recursive: true });
    writeFileSync(join(dir, 'packages', name, 'package.json'), JSON.stringify({ files }));
  }
  return dir;
}

const GUELTIGE_FILES = {
  css: ['css', 'dist', 'fonts', 'assets', 'icons', 'README.md', 'LICENSE', 'NOTICE'],
  angular: ['dist'],
  mcp: ['bin', 'src', 'snapshot', 'README.md', 'LICENSE'],
};

// --- Pfade ---------------------------------------------------------------------------------

test('Inhalt und Build-Eingaben des CSS-Pakets sind relevant', () => {
  assert.equal(isRelevant(['packages/css/css/components.css']), true);
  assert.equal(isRelevant(['packages/css/fonts/inter.woff2']), true);
  assert.equal(isRelevant(['packages/css/icons/source/heroicons/x.svg']), true);
  assert.equal(isRelevant(['packages/css/scripts/build-tokens.mjs']), true);
  assert.equal(isRelevant(['packages/css/package.json']), true);
});

test('Änderung an der Angular-Lib (public-api.ts) und deren Build-Eingaben ist relevant', () => {
  assert.equal(isRelevant(['packages/angular/src/public-api.ts']), true);
  assert.equal(isRelevant(['packages/angular/package.json']), true);
  assert.equal(isRelevant(['packages/angular/angular.json']), true);
  assert.equal(isRelevant(['packages/angular/tsconfig.json']), true);
  assert.equal(isRelevant(['packages/angular/ng-package.json']), true);
});

test('ausgelieferter Inhalt und Build-Skripte des MCP-Pakets sind relevant', () => {
  assert.equal(isRelevant(['packages/mcp/src/server.mjs']), true);
  assert.equal(isRelevant(['packages/mcp/bin/cds-mcp.mjs']), true);
  assert.equal(isRelevant(['packages/mcp/package.json']), true);
  assert.equal(isRelevant(['packages/mcp/scripts/build-snapshot.mjs']), true);
  assert.equal(isRelevant(['packages/mcp/scripts/prepack.mjs']), true);
});

test('test/, test-support/, eval/ und Prüfskripte der Pakete sind nicht relevant', () => {
  assert.equal(isRelevant(['packages/mcp/test/server.test.mjs']), false);
  assert.equal(isRelevant(['packages/mcp/test-support/tarball.mjs']), false);
  assert.equal(isRelevant(['packages/mcp/eval/run-eval.mjs']), false);
  assert.equal(isRelevant(['packages/mcp/scripts/smoke-test.mjs']), false);
  assert.equal(isRelevant(['packages/mcp/scripts/pack-tarball.mjs']), false);
});

test('Lint-Konfiguration und Entwicklungsnotizen der Pakete sind nicht relevant', () => {
  assert.equal(isRelevant(['packages/mcp/eslint.config.js']), false);
  assert.equal(isRelevant(['packages/angular/eslint.config.js']), false);
  assert.equal(isRelevant(['packages/angular/ENTWICKLUNG.md']), false);
});

test('apps/storybook/src/ ist relevant (MCP-Snapshot), die Storybook-Konfiguration nicht', () => {
  assert.equal(isRelevant(['apps/storybook/src/lib/button/button.stories.ts']), true);
  assert.equal(isRelevant(['apps/storybook/.storybook/main.ts']), false);
  assert.equal(isRelevant(['apps/storybook/.storybook/preview.ts']), false);
  assert.equal(isRelevant(['apps/storybook/vitest.config.mts']), false);
});

test('das Stempel-Skript unter tools/release ist eine Build-Eingabe', () => {
  assert.equal(isRelevant(['tools/release/stamp-version.mjs']), true);
  assert.equal(isRelevant(['tools/release/decide.mjs']), false);
});

test('Repo-Werkzeug, Doku, Vorlagen und Lockfile bleiben unsichtbar', () => {
  assert.equal(isRelevant(['package-lock.json']), false);
  assert.equal(isRelevant(['tools/checks/check-quotes.mjs']), false);
  assert.equal(isRelevant(['tools/consumer-fixture/package.json']), false);
  assert.equal(isRelevant(['templates/prototype-angular/package.json']), false);
  assert.equal(isRelevant(['docs/adr/0010-release.md']), false);
  assert.equal(isRelevant(['.github/workflows/publish.yml']), false);
});

test('ein Paket-Unterordner, der nur so heißt wie ein Ausschluss, bleibt relevant', () => {
  // „test“ ist ein Ordnername, kein Präfix: „testimonials/“ ist weiterhin Paketinhalt.
  assert.equal(isRelevant(['packages/css/testimonials/x.css']), true);
});

test('keine Pfade ist nicht relevant', () => {
  assert.equal(isRelevant([]), false);
});

// --- Deckungs-Check ------------------------------------------------------------------------

test('Deckungs-Check: jeder files-Eintrag der echten drei Pakete ist abgedeckt', () => {
  assert.deepEqual(checkCoverage(), []);
});

test('Deckungs-Check liest die files-Felder aller drei Pakete (kein Leerlauf)', () => {
  const dir = makeRoot(GUELTIGE_FILES);
  try {
    assert.deepEqual(checkCoverage(dir), []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check meldet einen neuen files-Eintrag im CSS-Paket, der ausgeschlossen ist', () => {
  const dir = makeRoot({ ...GUELTIGE_FILES, css: [...GUELTIGE_FILES.css, 'test'] });
  try {
    assert.deepEqual(checkCoverage(dir), ['packages/css/test']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check meldet einen ausgeschlossenen files-Eintrag im MCP-Paket (eval)', () => {
  const dir = makeRoot({ ...GUELTIGE_FILES, mcp: [...GUELTIGE_FILES.mcp, 'eval'] });
  try {
    assert.deepEqual(checkCoverage(dir), ['packages/mcp/eval']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check meldet einen ausgeschlossenen files-Eintrag im Angular-Paket (test-support)', () => {
  const dir = makeRoot({ ...GUELTIGE_FILES, angular: ['dist', 'test-support'] });
  try {
    assert.deepEqual(checkCoverage(dir), ['packages/angular/test-support']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check: ein fehlendes Paket-Manifest wird gemeldet statt übersprungen', () => {
  // Der Umzug ist durch; ein fehlendes Manifest wäre ein Leerlauf, der alles grün ließe.
  const { mcp, ...ohneMcp } = GUELTIGE_FILES;
  void mcp;
  const dir = makeRoot(ohneMcp);
  try {
    assert.deepEqual(checkCoverage(dir), ['packages/mcp/package.json']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check meldet eine fehlende feste Build-Eingabe (Stempel-Skript)', () => {
  // Der Check verlangt die neuen festen Eingaben; hier gegen eine fiktive Regel ohne sie.
  const dir = makeRoot(GUELTIGE_FILES);
  try {
    assert.deepEqual(checkCoverage(dir, { extraRequired: ['tools/gibt-es-nicht.mjs'] }), [
      'tools/gibt-es-nicht.mjs',
    ]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check nutzt dieselbe Logik wie isRelevant (Dateien und Unterordner)', () => {
  // Ein files-Eintrag unterhalb eines Paketordners ist abgedeckt, ein ausgeschlossener
  // Unterordner nicht. „cssx“ ist ein eigener, relevanter Name unter packages/css/.
  const dir = makeRoot({
    ...GUELTIGE_FILES,
    css: ['css/components.css', 'dist/tokens', 'icons/', 'README.md', 'cssx', 'test/fixtures'],
  });
  try {
    assert.deepEqual(checkCoverage(dir), ['packages/css/test/fixtures']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
