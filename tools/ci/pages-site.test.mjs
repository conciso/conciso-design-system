// Tests für tools/ci/pages-site.mjs: Ablage der Builds im Speicher (main/, pr-<N>/) und das
// Zusammensetzen der Pages-Site (main an der Wurzel, offene PR-Vorschauen unter pr-preview/).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  slotFuerPr,
  speicherAktualisieren,
  speicherBereinigen,
  siteZusammensetzen,
} from './pages-site.mjs';

function tempDir() {
  return mkdtempSync(join(tmpdir(), 'pages-site-'));
}

// Legt unter `dir` die Dateien aus `dateien` ({ 'a/b.html': 'inhalt' }) an.
function schreibe(dir, dateien) {
  for (const [pfad, inhalt] of Object.entries(dateien)) {
    mkdirSync(join(dir, pfad, '..'), { recursive: true });
    writeFileSync(join(dir, pfad), inhalt);
  }
  return dir;
}

const lies = (...teile) => readFileSync(join(...teile), 'utf8');

test('slotFuerPr: positive Ganzzahl ergibt pr-<N>', () => {
  assert.equal(slotFuerPr(42), 'pr-42');
  assert.equal(slotFuerPr('7'), 'pr-7');
});

test('slotFuerPr: alles andere wird abgelehnt (kein Pfad aus Fremddaten)', () => {
  for (const wert of [0, -1, 1.5, '', '../main', '4/2', 'abc', undefined, null]) {
    assert.throws(() => slotFuerPr(wert), /PR-Nummer/, String(wert));
  }
});

test('speicherAktualisieren: legt den Build unter dem Slot ab', () => {
  const speicher = tempDir();
  const build = schreibe(tempDir(), { 'index.html': 'neu', 'assets/a.js': 'js' });
  speicherAktualisieren(speicher, 'pr-3', build);
  assert.equal(lies(speicher, 'pr-3', 'index.html'), 'neu');
  assert.equal(lies(speicher, 'pr-3', 'assets', 'a.js'), 'js');
});

test('speicherAktualisieren: ersetzt den Slot vollständig, andere Slots bleiben', () => {
  const speicher = schreibe(tempDir(), {
    'main/index.html': 'main',
    'pr-3/index.html': 'alt',
    'pr-3/veraltet.js': 'weg',
  });
  const build = schreibe(tempDir(), { 'index.html': 'neu' });
  speicherAktualisieren(speicher, 'pr-3', build);
  assert.equal(lies(speicher, 'pr-3', 'index.html'), 'neu');
  assert.equal(existsSync(join(speicher, 'pr-3', 'veraltet.js')), false);
  assert.equal(lies(speicher, 'main', 'index.html'), 'main');
});

test('speicherAktualisieren: nur main oder pr-<N> als Slot', () => {
  const speicher = tempDir();
  const build = schreibe(tempDir(), { 'index.html': 'x' });
  for (const slot of ['', '..', 'pr-', 'pr-x', 'main/sub', 'gh-pages']) {
    assert.throws(() => speicherAktualisieren(speicher, slot, build), /Slot/, slot);
  }
});

test('speicherAktualisieren: ein leerer oder fehlender Build bricht ab', () => {
  const speicher = schreibe(tempDir(), { 'main/index.html': 'main' });
  assert.throws(() => speicherAktualisieren(speicher, 'main', join(tempDir(), 'fehlt')), /index\.html/);
  assert.throws(() => speicherAktualisieren(speicher, 'main', tempDir()), /index\.html/);
  assert.equal(lies(speicher, 'main', 'index.html'), 'main');
});

test('speicherBereinigen: entfernt Vorschauen geschlossener PRs, behält main und offene', () => {
  const speicher = schreibe(tempDir(), {
    'main/index.html': 'main',
    'pr-1/index.html': 'offen',
    'pr-2/index.html': 'geschlossen',
    'pr-30/index.html': 'geschlossen',
  });
  const entfernt = speicherBereinigen(speicher, [1]);
  assert.deepEqual(entfernt.sort(), ['pr-2', 'pr-30']);
  assert.deepEqual(readdirSync(speicher).sort(), ['main', 'pr-1']);
});

test('speicherBereinigen: fremde Einträge bleiben unangetastet', () => {
  const speicher = schreibe(tempDir(), { 'README.md': 'x', 'pr-x/a': 'y' });
  assert.deepEqual(speicherBereinigen(speicher, []), []);
  assert.deepEqual(readdirSync(speicher).sort(), ['README.md', 'pr-x']);
});

test('siteZusammensetzen: main an die Wurzel, offene Vorschauen unter pr-preview/', () => {
  const speicher = schreibe(tempDir(), {
    'main/index.html': 'main',
    'main/iframe.html': 'main-iframe',
    'pr-4/index.html': 'pr4',
    'pr-9/index.html': 'pr9',
  });
  const site = join(tempDir(), 'site');
  const ergebnis = siteZusammensetzen(speicher, site, [4, 9]);
  assert.deepEqual(ergebnis.vorschauen, [4, 9]);
  assert.equal(lies(site, 'index.html'), 'main');
  assert.equal(lies(site, 'iframe.html'), 'main-iframe');
  assert.equal(lies(site, 'pr-preview', 'pr-4', 'index.html'), 'pr4');
  assert.equal(lies(site, 'pr-preview', 'pr-9', 'index.html'), 'pr9');
});

test('siteZusammensetzen: nur offene PRs, und nur solche mit abgelegtem Build', () => {
  const speicher = schreibe(tempDir(), {
    'main/index.html': 'main',
    'pr-4/index.html': 'pr4',
    'pr-5/index.html': 'geschlossen',
  });
  const site = join(tempDir(), 'site');
  const ergebnis = siteZusammensetzen(speicher, site, [4, 6]);
  assert.deepEqual(ergebnis.vorschauen, [4]);
  assert.deepEqual(readdirSync(join(site, 'pr-preview')), ['pr-4']);
});

test('siteZusammensetzen: ohne offene Vorschau kein pr-preview/', () => {
  const speicher = schreibe(tempDir(), { 'main/index.html': 'main' });
  const site = join(tempDir(), 'site');
  siteZusammensetzen(speicher, site, []);
  assert.equal(existsSync(join(site, 'pr-preview')), false);
});

test('siteZusammensetzen: ohne main-Build kein Deploy (die Wurzel wäre leer)', () => {
  const speicher = schreibe(tempDir(), { 'pr-4/index.html': 'pr4' });
  assert.throws(() => siteZusammensetzen(speicher, join(tempDir(), 'site'), [4]), /main/);
});

test('siteZusammensetzen: ein main-Build mit eigenem pr-preview/ bricht ab', () => {
  const speicher = schreibe(tempDir(), {
    'main/index.html': 'main',
    'main/pr-preview/x.html': 'kollision',
  });
  assert.throws(() => siteZusammensetzen(speicher, join(tempDir(), 'site'), []), /pr-preview/);
});
