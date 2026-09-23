// Veröffentlichungsrelevante Pfade (ADR-0008, CONTEXT.md#veröffentlichungsrelevanter-pfad):
// ausgelieferter Inhalt beider Pakete plus dessen Build-Eingaben. Genau EINE Stelle, von
// zwei Seiten gemeinsam genutzt: dem semantic-release-Plugin (scripts/release/semantic-release-plugin.mjs,
// entscheidet über Version/Notes) und dem commitlint-Filter (scripts/release/check-relevant-commits.mjs,
// entscheidet, welche Commits hart geprüft werden). Beide Seiten driften nicht auseinander,
// weil beide von hier importieren statt eine eigene Liste zu pflegen.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Präfixe enden auf „/“ für Verzeichnisse (jeder Pfad darunter zählt) oder sind exakte
// Dateipfade. Quelle: .scratch/automatische-releases/spec.md Regel 2, verifiziert gegen
// die tatsächlichen „build“-Skripte in package.json.
export const RELEVANT_PATH_PREFIXES = [
  // CSS-Schicht: root `files`-Feld (package.json)
  'css/',
  'dist/',
  'tokens/',
  'icons/',
  'fonts/',
  'assets/',
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  // Angular-Lib: ausgelieferter Inhalt (src, package.json, ng-package.json, tsconfig.lib*.json, README)
  'angular-lib/projects/design-system-angular/',
  // Build-Konfiguration, die den Lib-Build steuert
  'angular-lib/angular.json',
  // root package.json selbst (Version, exports, files-Feld)
  'package.json',
  // Build-Skripte, die die ausgelieferten Artefakte erzeugen (siehe „build“-Script oben)
  'scripts/build-tokens.mjs',
  'scripts/build-icons.mjs',
  'scripts/bundle-css.mjs',
];

function isPathRelevant(filePath) {
  return RELEVANT_PATH_PREFIXES.some((prefix) =>
    prefix.endsWith('/') ? filePath.startsWith(prefix) : filePath === prefix,
  );
}

/** Ist mindestens einer der übergebenen Pfade veröffentlichungsrelevant? */
export function isRelevant(filePaths) {
  return filePaths.some(isPathRelevant);
}

// Verzeichnis-Eintrag (kein „/“-Suffix in package.json#files) auf einen Präfix mit Suffix
// normalisieren, damit z. B. „css“ mit dem gepflegten „css/“ matcht.
function asDirPrefix(entry) {
  return entry.endsWith('/') ? entry : `${entry}/`;
}

function isEntryCovered(entry) {
  const dirPrefix = asDirPrefix(entry);
  return RELEVANT_PATH_PREFIXES.some((prefix) => prefix === entry || prefix === dirPrefix);
}

/**
 * Deckungs-Check (Spec Regel 3): jeder Eintrag im root `files`-Feld UND der ausgelieferte
 * Inhalt der Lib muss durch RELEVANT_PATH_PREFIXES abgedeckt sein. Gibt die fehlenden
 * Einträge zurück (leeres Array = ok), statt selbst zu werfen, damit Aufrufer (CLI wie Test)
 * frei entscheiden, wie sie das melden.
 */
export function checkCoverage(root = ROOT) {
  const missing = [];
  const rootPkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  for (const entry of rootPkg.files ?? []) {
    if (!isEntryCovered(entry)) missing.push(entry);
  }

  const libPrefix = 'angular-lib/projects/design-system-angular/';
  if (!RELEVANT_PATH_PREFIXES.includes(libPrefix)) missing.push(libPrefix);

  return missing;
}

// Als Skript aufrufbar: `node scripts/release/relevant-paths.mjs` prüft die Deckung und
// bricht mit Fehlermeldung ab, wenn ein files-Eintrag nicht abgedeckt ist (Spec Regel 3,
// Akzeptanzkriterium „Coverage-Check fällt, wenn ein neuer Eintrag … fehlt“).
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const missing = checkCoverage();
  if (missing.length > 0) {
    console.error(
      `Deckungs-Check fehlgeschlagen: folgende Einträge sind nicht in RELEVANT_PATH_PREFIXES abgedeckt:\n` +
        missing.map((entry) => `  - ${entry}`).join('\n'),
    );
    process.exit(1);
  }
  console.log('Deckungs-Check ok: alle files-Einträge sind veröffentlichungsrelevant abgedeckt.');
}
