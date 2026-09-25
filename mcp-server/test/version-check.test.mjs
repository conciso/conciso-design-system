// Pinnt das Verhalten aus Issue 02 (ADR-0012): vier Fälle der Versionsprüfung, alle ohne
// Dateisystem-Fixtures, weil `checkVersion` eine reine Funktion ist. Der Resolver
// (`resolveInstalledVersion`) braucht dagegen echte Modulauflösung und wird separat gegen ein
// `cwd` ohne installierte Angular-Lib geprüft (negativer Fall reicht: ein positiver Fall würde
// eine installierte `@conciso/design-system-angular` im Testverzeichnis voraussetzen).
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { checkVersion, resolveInstalledVersion, PLACEHOLDER_VERSION } from '../src/version-check.mjs';

test('checkVersion: gleiche Version → kein Hinweis', () => {
  const result = checkVersion('1.2.3', '1.2.3');
  assert.deepEqual(result, { instructionsNote: null, stderrNote: null });
});

test('checkVersion: abweichende Version → Warnung mit beiden Versionsnummern in instructions und stderr', () => {
  const result = checkVersion('1.2.3', '1.0.0');
  assert.match(result.instructionsNote, /1\.2\.3/);
  assert.match(result.instructionsNote, /1\.0\.0/);
  assert.match(result.instructionsNote, /Warnung/);
  assert.ok(result.stderrNote, 'stderrNote fehlt bei abweichender Version');
  assert.match(result.stderrNote, /1\.2\.3/);
  assert.match(result.stderrNote, /1\.0\.0/);
});

test('checkVersion: Lib nicht installiert → Hinweis „Snapshot gilt für Version X“, kein stderr', () => {
  const result = checkVersion('1.2.3', null);
  assert.match(result.instructionsNote, /Snapshot gilt für Version 1\.2\.3/);
  assert.equal(result.stderrNote, null);
});

test('checkVersion: eigene Version ist Platzhalter „0.0.0“ → kein Hinweis, nur stderr-Notiz (Entwicklungsbetrieb)', () => {
  const result = checkVersion(PLACEHOLDER_VERSION, '1.0.0');
  assert.equal(result.instructionsNote, null, 'Platzhalter darf keine Warnung in instructions auslösen');
  assert.ok(result.stderrNote, 'stderr-Notiz für den Entwicklungsbetrieb fehlt');
  assert.match(result.stderrNote, /Entwicklungsmodus/);
});

test('checkVersion: eigene Version ist Platzhalter „0.0.0“, Lib auch nicht installiert → weiterhin kein Hinweis', () => {
  const result = checkVersion(PLACEHOLDER_VERSION, null);
  assert.equal(result.instructionsNote, null);
  assert.ok(result.stderrNote);
});

test('resolveInstalledVersion: Angular-Lib nicht auflösbar vom übergebenen Arbeitsverzeichnis → null', () => {
  // mcp-server/test hat keine installierte @conciso/design-system-angular in seinem eigenen
  // Auflösungspfad-Kontext (kein consumer-artiges node_modules daneben).
  const result = resolveInstalledVersion(import.meta.dirname);
  assert.equal(result, null);
});
