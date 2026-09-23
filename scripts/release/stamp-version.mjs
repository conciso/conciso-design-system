#!/usr/bin/env node
// Stempelt die von der Engine (semantic-release --dry-run, siehe semantic-release-plugin.mjs)
// berechnete Version in beide package.json UND die Peer-Pin der Angular-Lib — Spec Regel 7
// „Versionsfreies Repo“: im Repo stehen dauerhaft nur Platzhalter (0.0.0 / 0.0.x), die echte
// Version wird erst im Publish-Job VOR dem Build in die Artefakte geschrieben und NIE
// committet. Idempotent: erneutes Stempeln derselben Version schreibt dasselbe Ergebnis.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
// Strikt nach SemVer: keine führenden Nullen je Komponente (0|[1-9]\d*), sonst nähme z. B.
// „01.2.3“ das Skript ohne Beanstandung an.
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const LIB_PKG_PATH = 'angular-lib/projects/design-system-angular/package.json';

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

/**
 * @param {string} version z. B. "2.0.0" (kein Prä-Release-Suffix, siehe Spec Regel 7)
 * @param {string} root Repo-Wurzel (Default: das echte Repo), parametrisiert für Tests
 * @returns {{ version: string, peerRange: string }}
 */
export function stampVersion(version, root = ROOT) {
  if (!SEMVER.test(version)) {
    throw new Error(`Ungültige Version zum Stempeln: „${version}“ (erwartet X.Y.Z).`);
  }
  const [major, minor] = version.split('.');
  const peerRange = `${major}.${minor}.x`;

  // Erst beide Manifeste lesen und prüfen, dann beide schreiben: scheitert die Prüfung,
  // bleibt der Checkout unangetastet statt halb gestempelt.
  const rootPkgPath = join(root, 'package.json');
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
  const libPkgPath = join(root, LIB_PKG_PATH);
  const libPkg = JSON.parse(readFileSync(libPkgPath, 'utf8'));
  if (!libPkg.peerDependencies?.['@conciso/design-system']) {
    // Kein stilles Weiterlaufen: fehlt die Peer-Pin, würde die Lib mit einer offenen
    // (oder falschen) Range gegen die CSS-Schicht veröffentlicht — der Lockstep-Vertrag aus
    // ADR-0004 wäre gebrochen, ohne dass irgendwas das meldet.
    throw new Error(
      `${LIB_PKG_PATH} hat keine peerDependency „@conciso/design-system“ — Lockstep-Pin kann nicht gesetzt werden.`,
    );
  }
  rootPkg.version = version;
  libPkg.version = version;
  libPkg.peerDependencies['@conciso/design-system'] = peerRange;
  writeJson(rootPkgPath, rootPkg);
  writeJson(libPkgPath, libPkg);

  return { version, peerRange };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const version = process.argv[2];
  if (!version) {
    console.error('Aufruf: node scripts/release/stamp-version.mjs <version>');
    process.exit(1);
  }
  const { peerRange } = stampVersion(version);
  console.log(`Version ${version} gestempelt (Peer-Pin @conciso/design-system: ${peerRange}).`);
}
