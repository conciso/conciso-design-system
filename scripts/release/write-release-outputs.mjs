#!/usr/bin/env node
// Wird von semantic-release als `verifyReleaseCmd` (Plugin @semantic-release/exec) aufgerufen,
// sobald ein Release feststeht — schreibt die Version nach $GITHUB_OUTPUT (Spec Regel 6/9:
// `pruefen`-Job liest sie als `steps.<id>.outputs.version`). Läuft NUR, wenn ein Release
// ansteht; bleibt $GITHUB_OUTPUT deshalb ohne `version=…`-Zeile, endet der Job wie
// vorgesehen still (Akzeptanzkriterium „leer → kein Release“).
import { appendFileSync, writeFileSync } from 'node:fs';

const [, , version] = process.argv;
if (!version) {
  console.error('Aufruf: node scripts/release/write-release-outputs.mjs <version>');
  process.exit(1);
}

const target = process.env.GITHUB_OUTPUT;
if (target) {
  appendFileSync(target, `version=${version}\n`);
  console.log(`Version ${version} → $GITHUB_OUTPUT geschrieben.`);
} else {
  // Lokaler Dry-Run ohne GitHub-Actions-Umgebung (siehe Verifikation der Spec).
  writeFileSync('release-version.txt', `${version}\n`);
  console.log(`Version ${version} → release-version.txt (kein $GITHUB_OUTPUT gesetzt).`);
}
