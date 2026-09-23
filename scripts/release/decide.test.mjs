// Tests der Release-Entscheidung (decide.mjs). Die Fälle sind genau die Abbruchstellen
// eines Laufs: zwischen den beiden Publishes, zwischen Publishes und Tag, zwischen Tag
// und GitHub-Release — jeweils auch dann, wenn inzwischen neue Commits gelandet sind.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide } from './decide.mjs';

const sauber = {
  latestTag: 'v2.0.0',
  tagHasRelease: true,
  tagIsAnnotated: true,
  cssVersions: ['1.0.0', '2.0.0'],
  libVersions: ['1.0.0', '2.0.0'],
  engineVersion: '',
  dry: false,
};

test('nichts Neues, alles abgeschlossen → kein Release', () => {
  assert.equal(decide(sauber).mode, 'nichts');
});

test('neue Version aus der Engine → beide Pakete aus dem ausgelösten Commit', () => {
  assert.deepEqual(decide({ ...sauber, engineVersion: '2.1.0' }), {
    mode: 'neu',
    version: '2.1.0',
    publishCss: true,
    publishLib: true,
    source: 'head',
    notes: 'engine',
  });
});

test('nur ein Paket veröffentlicht → das fehlende nachziehen, aus dem Quellstand des vorhandenen', () => {
  assert.deepEqual(decide({ ...sauber, cssVersions: [...sauber.cssVersions, '2.0.1'] }), {
    mode: 'nachziehen',
    version: '2.0.1',
    publishCss: false,
    publishLib: true,
    source: 'registry',
    notes: 'range',
  });
});

test('halbes Release hat Vorrang vor einer höheren Engine-Version (neuer feat danach)', () => {
  const d = decide({ ...sauber, libVersions: [...sauber.libVersions, '2.0.1'], engineVersion: '2.1.0' });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '2.0.1');
  assert.equal(d.publishCss, true);
  assert.equal(d.publishLib, false);
});

test('beide veröffentlicht, Tag fehlt → nur finalisieren, Quellstand aus der Registry', () => {
  assert.deepEqual(
    decide({
      ...sauber,
      cssVersions: [...sauber.cssVersions, '2.0.1'],
      libVersions: [...sauber.libVersions, '2.0.1'],
      engineVersion: '2.0.2',
    }),
    {
      mode: 'nachziehen',
      version: '2.0.1',
      publishCss: false,
      publishLib: false,
      source: 'registry',
      notes: 'range',
    },
  );
});

test('Tag da, GitHub-Release fehlt → nachholen, auch wenn die Engine schon Neues meldet', () => {
  assert.deepEqual(decide({ ...sauber, tagHasRelease: false, engineVersion: '2.0.1' }), {
    mode: 'finalisieren',
    version: '2.0.0',
    publishCss: false,
    publishLib: false,
    source: 'tag',
    notes: 'tag',
  });
});

test('leichtgewichtiger Alt-Tag ohne Release → Notes von GitHub als Rückfall', () => {
  const d = decide({ ...sauber, tagHasRelease: false, tagIsAnnotated: false });
  assert.equal(d.mode, 'finalisieren');
  assert.equal(d.notes, 'github');
});

test('Dry-Run spielt beide Pakete durch', () => {
  const d = decide({ ...sauber, engineVersion: '2.1.0', dry: true });
  assert.equal(d.publishCss, true);
  assert.equal(d.publishLib, true);
});

test('vor dem allerersten Tag zählt jede veröffentlichte Version als unfertig', () => {
  const d = decide({ ...sauber, latestTag: '', cssVersions: ['0.1.0'], libVersions: [] });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '0.1.0');
});

test('Versionen werden numerisch verglichen, nicht als Text (2.0.10 > 2.0.9)', () => {
  const d = decide({
    ...sauber,
    latestTag: 'v2.0.9',
    cssVersions: ['2.0.9', '2.0.10'],
    libVersions: ['2.0.9', '2.0.10'],
  });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.version, '2.0.10');
});

test('ungültige Einträge in der Versionsliste werden ignoriert', () => {
  assert.equal(decide({ ...sauber, cssVersions: [...sauber.cssVersions, 'kaputt'] }).mode, 'nichts');
});
