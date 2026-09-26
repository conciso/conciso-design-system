#!/usr/bin/env node
// npm ruft `prepack` vor `npm pack`/`npm publish` auf. Stellt sicher, dass beide Dinge, die
// `files` referenziert, aber die dieses Repo bewusst nicht committet, vor dem Schnüren
// existieren:
//   - die LICENSE-Kopie (npm kann `files` nicht auf ../LICENSE zeigen lassen, ng-packagr hat
//     dasselbe Problem — siehe angular-lib/package.json#build für dasselbe Muster),
//   - der Snapshot aus dem Storybook-Build (siehe build-snapshot.mjs).
// Beides ist gitignored (siehe .gitignore) und wird hier bei jedem Pack-Lauf frisch erzeugt.
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildSnapshot } from './build-snapshot.mjs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = join(PKG_ROOT, '..');

function copyLicense() {
  const src = join(REPO_ROOT, 'LICENSE');
  if (!existsSync(src)) {
    throw new Error(`Root-LICENSE fehlt: „${src}“.`);
  }
  copyFileSync(src, join(PKG_ROOT, 'LICENSE'));
}

try {
  copyLicense();
  buildSnapshot();
  // console.error, nicht console.log: `npm pack`/`npm publish` läuft dieses Skript als
  // Lifecycle-Hook VOR dem eigentlichen Packen, und beides schreibt auf denselben stdout wie
  // der Tarball-Name, den `npm pack` danach ausgibt. Ein `TARBALL="$(npm pack …)"` in einer CI-
  // Pipeline (siehe .github/workflows/storybook-angular.yml) captured sonst zwei Zeilen statt
  // einer und bricht — genau das ist einmal passiert. Diagnose gehört auf stderr, stdout bleibt
  // maschinenlesbar dem eigentlichen Zweck des jeweiligen Befehls vorbehalten.
  console.error('prepack ok: LICENSE kopiert, Snapshot vorhanden.');
} catch (err) {
  console.error(`prepack fehlgeschlagen: ${err.message}`);
  process.exit(1);
}
