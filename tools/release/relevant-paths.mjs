// Veröffentlichungsrelevante Pfade (ADR-0010, ADR-0012, CONTEXT.md#veröffentlichungsrelevanter-pfad):
// ausgelieferter Inhalt aller drei Pakete plus dessen Build-Eingaben. Genau EINE Stelle, von
// zwei Seiten gemeinsam genutzt: dem semantic-release-Plugin (tools/release/semantic-release-plugin.mjs,
// entscheidet über Version/Notes) und dem commitlint-Filter (tools/release/check-relevant-commits.mjs,
// entscheidet, welche Commits hart geprüft werden). Beide Seiten driften nicht auseinander,
// weil beide von hier importieren statt eine eigene Liste zu pflegen.
//
// Regel: relevant ist alles unter packages/<paket>/ außer test/, test-support/, eval/,
// Prüfskripten und Lint-/Entwicklungsdateien, dazu apps/storybook/src/ und das Stempel-Skript.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Ordnernamen, die unter einem Paket nie ausgeliefert werden und keine
// Build-Eingabe sind (Tests, Evaluierung, Prüfskripte).
const PACKAGE_EXCLUDED_DIRS = ['test/', 'test-support/', 'eval/'];
// Einzeldateien unter packages/<paket>/, die weder ausgeliefert werden noch den Build speisen.
const PACKAGE_EXCLUDED_FILES = [
  // CI-Prüfskripte (laufen gegen das gepackte Artefakt, ändern es nicht)
  'scripts/smoke-test.mjs',
  'scripts/pack-tarball.mjs',
  // Lint-Konfiguration und Entwicklungsnotizen
  'eslint.config.js',
  'ENTWICKLUNG.md',
];
// Außerhalb von packages/: Stories und MDX gehen unverändert in den MCP-Snapshot ein, das
// Stempel-Skript schreibt Version und Peer-Pin in die Manifeste. Die Storybook-KONFIGURATION
// (.storybook/, vitest.config.mts) bleibt bewusst unsichtbar: Sie kann den Snapshot zwar
// beeinflussen, würde aber jede Tooling-Änderung zum Release machen (Über-Trigger-Problem aus
// ADR-0010); das Restrisiko trägt der Tarball-Smoke-Test aus ADR-0012 vor jedem Publish.
const OTHER_RELEVANT_PREFIXES = ['apps/storybook/src/', 'tools/release/stamp-version.mjs'];

function isPackageRelevant(filePath) {
  const match = /^packages\/[^/]+\/(.+)$/.exec(filePath);
  if (!match) return false;
  const inner = match[1];
  if (PACKAGE_EXCLUDED_DIRS.some((dir) => inner.startsWith(dir))) return false;
  return !PACKAGE_EXCLUDED_FILES.includes(inner);
}

function isOtherRelevant(filePath) {
  return OTHER_RELEVANT_PREFIXES.some((prefix) =>
    prefix.endsWith('/') ? filePath.startsWith(prefix) : filePath === prefix,
  );
}

function isPathRelevant(filePath) {
  return isPackageRelevant(filePath) || isOtherRelevant(filePath);
}

/** Ist mindestens einer der übergebenen Pfade veröffentlichungsrelevant? */
export function isRelevant(filePaths) {
  return filePaths.some(isPathRelevant);
}

// Ein files-Eintrag eines Pakets ist abgedeckt, wenn er selbst UND ein Pfad darunter relevant
// sind. Der Probe-Pfad darunter lässt einen ausgeschlossenen Ordner („test“) auffallen, obwohl
// der Eintrag selbst, ohne „/“, nicht auf das Ausschluss-Präfix passt; der Eintrag selbst
// erfasst eine ausgeschlossene Einzeldatei.
function isEntryCovered(packageDir, entry) {
  const base = `packages/${packageDir}/${entry.replace(/\/$/, '')}`;
  return isPathRelevant(base) && isPathRelevant(`${base}/probe`);
}

export const PACKAGE_DIRS = ['css', 'angular', 'mcp'];

// Fest verdrahtete Build-Eingaben außerhalb des `files`-Felds, die abgedeckt sein müssen
// (ADR-0010 Regel 3, erweitert um deren Build-Eingaben aus demselben Grund).
const REQUIRED_PATHS = [
  'packages/angular/src/public-api.ts',
  'packages/angular/angular.json',
  'packages/angular/package.json',
  'packages/angular/tsconfig.json',
  'packages/mcp/scripts/build-snapshot.mjs',
  'packages/css/scripts/build-tokens.mjs',
  'apps/storybook/src/probe',
  'tools/release/stamp-version.mjs',
];

/**
 * Deckungs-Check (ADR-0010 Regel 3): jeder Eintrag im `files`-Feld der drei Paket-package.json
 * unter packages/ UND die fest verdrahteten Build-Eingaben müssen als veröffentlichungsrelevant
 * gelten. Gibt die fehlenden Einträge zurück (leeres Array = ok), statt selbst zu werfen,
 * damit Aufrufer (CLI wie Test) frei entscheiden, wie sie das melden. Ein fehlendes
 * Paket-Manifest wird gemeldet: ein stilles Überspringen ließe den Check leerlaufen.
 */
export function checkCoverage(root = ROOT, { extraRequired = [] } = {}) {
  const missing = [];
  for (const dir of PACKAGE_DIRS) {
    const manifestPath = join(root, 'packages', dir, 'package.json');
    if (!existsSync(manifestPath)) {
      missing.push(`packages/${dir}/package.json`);
      continue;
    }
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    for (const entry of manifest.files ?? []) {
      if (!isEntryCovered(dir, entry)) missing.push(`packages/${dir}/${entry}`);
    }
  }
  for (const entry of [...REQUIRED_PATHS, ...extraRequired]) {
    if (!isPathRelevant(entry)) missing.push(entry);
  }
  return missing;
}

// Als Skript aufrufbar: `node tools/release/relevant-paths.mjs` prüft die Deckung und
// bricht mit Fehlermeldung ab, wenn ein files-Eintrag nicht abgedeckt ist (ADR-0010 Regel 3,
// Akzeptanzkriterium „Coverage-Check fällt, wenn ein neuer Eintrag … fehlt“).
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const missing = checkCoverage();
  if (missing.length > 0) {
    console.error(
      `Deckungs-Check fehlgeschlagen: folgende Einträge sind nicht als veröffentlichungsrelevant abgedeckt:\n` +
        missing.map((entry) => `  - ${entry}`).join('\n'),
    );
    process.exit(1);
  }
  console.log('Deckungs-Check ok: alle files-Einträge sind veröffentlichungsrelevant abgedeckt.');
}
