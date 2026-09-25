// Pinnt die Verteidigung-in-der-Tiefe aus src/server.mjs: der manifestProvider liest nur
// innerhalb von SNAPSHOT_ROOT, selbst wenn ein Pfad per `..` versucht, ihn zu verlassen. Kein
// Kindprozess nötig — die Funktion ist direkt importierbar und exportiert.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { manifestProvider } from '../src/server.mjs';

test('manifestProvider: lehnt Pfade außerhalb des Snapshots ab', async () => {
  await assert.rejects(
    () => manifestProvider(undefined, '../../package.json'),
    /außerhalb des Snapshots/,
  );
});
