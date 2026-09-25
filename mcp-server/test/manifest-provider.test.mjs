// Pinnt die Verteidigung-in-der-Tiefe aus src/server.mjs: der manifestProvider liest nur
// innerhalb von SNAPSHOT_ROOT, selbst wenn ein Pfad per `..` versucht, ihn zu verlassen. Kein
// Kindprozess nötig — die Funktion ist direkt importierbar und exportiert.
//
// Reproduziert-Bug (siehe Kommentar in src/server.mjs): @storybook/mcp löst Manifest-`$ref`s
// URL-artig auf (`new URL(filePath, base).pathname`) und ruft den manifestProvider deshalb mit
// einem prozentkodierten Pfad auf, z. B. „…/grundlagen-einrichtung--%C3%BCbersicht.json“ für die
// Datei „…/grundlagen-einrichtung--übersicht.json“ auf der Platte. Über HTTP dekodiert ein Server
// das automatisch; unser Dateisystem-Provider tat es nicht — jede docs-id mit Nicht-ASCII-Zeichen
// (alle „…--übersicht“-MDX-Seiten, inkl. der Einrichtung-Seite) endete in ENOENT.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

import { manifestProvider, SNAPSHOT_ROOT } from '../src/server.mjs';

const EINRICHTUNG_MDX_RELATIVE = 'services/addon-docs/mdx/grundlagen-einrichtung--übersicht.json';
const EINRICHTUNG_MDX_ENCODED_REF =
  './services/addon-docs/mdx/grundlagen-einrichtung--%C3%BCbersicht.json';

test('manifestProvider: lehnt Pfade außerhalb des Snapshots ab', async () => {
  await assert.rejects(
    () => manifestProvider(undefined, '../../package.json'),
    /außerhalb des Snapshots/,
  );
});

test('manifestProvider: lehnt eine kodierte Traversal ab (Dekodierung VOR der Guard-Prüfung)', async () => {
  // '..%2F..%2Fpackage.json' dekodiert zu '../../package.json'. Würde die Guard-Prüfung vor dem
  // Dekodieren laufen, sähe sie nur harmlose Punkte/Prozentzeichen und ließe den Pfad durch.
  await assert.rejects(
    () => manifestProvider(undefined, '..%2F..%2Fpackage.json'),
    /außerhalb des Snapshots/,
  );
});

test('manifestProvider: dekodiert einen prozentkodierten Pfad und liefert die reale Snapshot-Datei', async () => {
  const realPath = join(SNAPSHOT_ROOT, EINRICHTUNG_MDX_RELATIVE);
  // Hart fehlschlagen statt überspringen — dieselbe Konvention wie in test/server.test.mjs: ein
  // fehlender Snapshot in CI soll auffallen, nicht stillschweigend grün durchlaufen.
  assert.ok(
    existsSync(realPath),
    `Snapshot fehlt (${realPath}) — vorher „npm run build:storybook“ im Repo-Root und ` +
      '„npm run build:snapshot“ in mcp-server/ ausführen.',
  );

  const content = await manifestProvider(undefined, EINRICHTUNG_MDX_ENCODED_REF);
  assert.match(content, /grundlagen-einrichtung--übersicht/);
});

test('manifestProvider: eine kaputte Prozentkodierung liefert eine klare deutsche Fehlermeldung', async () => {
  // '%' ohne zwei folgende Hex-Ziffern lässt decodeURIComponent mit URIError scheitern.
  await assert.rejects(
    () => manifestProvider(undefined, './services/broken-%-encoding.json'),
    /ungültig kodiert|kodierung/i,
  );
});
