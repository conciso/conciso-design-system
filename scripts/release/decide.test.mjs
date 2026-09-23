// Tests der Release-Entscheidung (decide.mjs). Die Fälle sind genau die Abbruchstellen
// eines Laufs: zwischen den beiden Publishes, zwischen Publishes und Tag, zwischen Tag
// und GitHub-Release — jeweils auch dann, wenn inzwischen neue Commits gelandet sind.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide, versionsliste } from './decide.mjs';

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

test('Tag und Release da, aber ein Paket fehlt in der Tag-Version → nachziehen aus dem Tag', () => {
  assert.deepEqual(decide({ ...sauber, libVersions: ['1.0.0'], engineVersion: '2.0.1' }), {
    mode: 'nachziehen',
    version: '2.0.0',
    publishCss: false,
    publishLib: true,
    source: 'tag',
    notes: 'keine',
  });
});

test('fehlendes Paket UND fehlendes Release → nachziehen, Notes aus dem Tag', () => {
  const d = decide({ ...sauber, tagHasRelease: false, cssVersions: ['1.0.0'] });
  assert.equal(d.mode, 'nachziehen');
  assert.equal(d.publishCss, true);
  assert.equal(d.notes, 'tag');
});

test('unfertiger letzter Tag hat Vorrang vor einem halben Stand darüber (ältere Lücke zuerst)', () => {
  // Sonst würde erst 2.0.1 nachgezogen und getaggt — danach wäre v2.0.0 nicht mehr der
  // letzte Tag und bliebe dauerhaft unfertig.
  const ohneRelease = decide({
    ...sauber,
    tagHasRelease: false,
    cssVersions: [...sauber.cssVersions, '2.0.1'],
  });
  assert.equal(ohneRelease.mode, 'finalisieren');
  assert.equal(ohneRelease.version, '2.0.0');

  const ohnePaket = decide({ ...sauber, libVersions: ['1.0.0'], cssVersions: [...sauber.cssVersions, '2.0.1'] });
  assert.equal(ohnePaket.mode, 'nachziehen');
  assert.equal(ohnePaket.version, '2.0.0');
  assert.equal(ohnePaket.source, 'tag');
});

test('Alt-Tag (leichtgewichtig, vor ADR-0009) mit fehlendem Paket → nur Hinweis, kein Blockieren', () => {
  // Aus solchen Checkouts lässt sich nicht bauen (kein stamp-version.mjs); ein Nachzieh-
  // Versuch würde jeden weiteren Release blockieren. Deshalb: sagen, aber weitermachen.
  const d = decide({ ...sauber, tagIsAnnotated: false, libVersions: ['1.0.0'], engineVersion: '2.0.1' });
  assert.equal(d.mode, 'neu');
  assert.match(d.hinweis, /2\.0\.0/);
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

test('versionsliste: Array, einzelner String und leere Eingabe', () => {
  assert.deepEqual(versionsliste('["1.0.0","2.0.0"]'), ['1.0.0', '2.0.0']);
  assert.deepEqual(versionsliste('"1.0.0"'), ['1.0.0']);
  assert.deepEqual(versionsliste(''), []);
  assert.deepEqual(versionsliste('[]'), []);
});

test('versionsliste: kaputte Registry-Antwort wirft statt als leer durchzugehen', () => {
  assert.throws(() => versionsliste('["1.0.0","2.0'));
  assert.throws(() => versionsliste('{"error":{"code":"E500"}}'));
});
