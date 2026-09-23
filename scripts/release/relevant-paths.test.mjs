// Tests für scripts/release/relevant-paths.mjs (Seam aus .scratch/automatische-releases/spec.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { isRelevant, checkCoverage, RELEVANT_PATH_PREFIXES } from './relevant-paths.mjs';

test('css/-Änderung ist veröffentlichungsrelevant', () => {
  assert.equal(isRelevant(['css/components.css']), true);
});

test('storybook-angular/-Änderung ist nicht veröffentlichungsrelevant', () => {
  assert.equal(isRelevant(['storybook-angular/src/lib/button/button.stories.ts']), false);
});

test('Änderung an der Angular-Lib (public-api.ts) ist relevant', () => {
  assert.equal(
    isRelevant(['angular-lib/projects/design-system-angular/src/public-api.ts']),
    true,
  );
});

test('Build-Eingaben des Angular-Workspace sind relevant (package.json, tsconfig.json)', () => {
  // angular-lib/package.json legt Angular-/ng-packagr-Version für den Build fest,
  // angular-lib/tsconfig.json wird von tsconfig.lib.json der Lib per extends eingebunden —
  // beide können das gebaute Artefakt verändern, ohne die Lib selbst anzufassen.
  assert.equal(isRelevant(['angular-lib/package.json']), true);
  assert.equal(isRelevant(['angular-lib/tsconfig.json']), true);
});

test('package-lock.json ist bewusst NICHT relevant (gemeinsames Lockfile aller Workspaces)', () => {
  // Sonst würde jede Dependency-Änderung releasen, auch eine reine
  // Storybook-Dev-Abhängigkeit (siehe Kommentar in relevant-paths.mjs).
  assert.equal(isRelevant(['package-lock.json']), false);
});

test('README.md an der Wurzel ist relevant, ein anderes README.md nicht', () => {
  assert.equal(isRelevant(['README.md']), true);
  assert.equal(isRelevant(['examples/consumer-fixture/README.md']), false);
});

test('mehrere Pfade: relevant, sobald einer davon relevant ist', () => {
  assert.equal(isRelevant(['storybook-angular/vite.config.ts', 'tokens/tokens.json']), true);
});

test('keine Pfade ist nicht relevant', () => {
  assert.equal(isRelevant([]), false);
});

test('Deckungs-Check: jeder Eintrag im root files-Feld ist abgedeckt', () => {
  assert.deepEqual(checkCoverage(), []);
});

test('Deckungs-Check verlangt auch die fest verdrahteten Angular-Build-Eingaben', () => {
  assert.ok(RELEVANT_PATH_PREFIXES.includes('angular-lib/package.json'));
  assert.ok(RELEVANT_PATH_PREFIXES.includes('angular-lib/tsconfig.json'));
});

test('Deckungs-Check schlägt fehl, wenn ein neuer files-Eintrag nicht abgedeckt ist', () => {
  // Regressionsschutz für das Akzeptanzkriterium „Coverage-Check fällt, wenn ein neuer
  // Eintrag zu files hinzukommt, ohne einen passenden veröffentlichungsrelevanten Pfad“ —
  // gegen eine fiktive package.json mit einem unbekannten files-Eintrag.
  const dir = mkdtempSync(join(tmpdir(), 'relevant-paths-coverage-'));
  try {
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({ files: ['css', 'neu-erfundener-output'] }),
    );
    assert.deepEqual(checkCoverage(dir), ['neu-erfundener-output']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('Deckungs-Check nutzt dieselbe Präfix-Logik wie isRelevant (Dateien und Unterordner)', () => {
  // Ein files-Eintrag unterhalb eines gepflegten Ordners ist durch diesen abgedeckt —
  // genauso wie isRelevant eine Änderung daran als relevant wertet. Ein Name, der nur mit
  // demselben Text beginnt („cssx“), ist dagegen kein Unterpfad von „css/“.
  const dir = mkdtempSync(join(tmpdir(), 'relevant-paths-coverage-'));
  try {
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({ files: ['css/components.css', 'tokens/sub', 'icons/', 'README.md', 'cssx'] }),
    );
    assert.deepEqual(checkCoverage(dir), ['cssx']);
    assert.equal(isRelevant(['css/components.css']), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
