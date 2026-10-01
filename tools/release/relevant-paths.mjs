// Veröffentlichungsrelevante Pfade (ADR-0010, ADR-0012, CONTEXT.md#veröffentlichungsrelevanter-pfad):
// ausgelieferter Inhalt aller drei Pakete plus dessen Build-Eingaben. Genau EINE Stelle, von
// zwei Seiten gemeinsam genutzt: dem semantic-release-Plugin (tools/release/semantic-release-plugin.mjs,
// entscheidet über Version/Notes) und dem commitlint-Filter (tools/release/check-relevant-commits.mjs,
// entscheidet, welche Commits hart geprüft werden). Beide Seiten driften nicht auseinander,
// weil beide von hier importieren statt eine eigene Liste zu pflegen.
//
// Zwei Regelsätze gelten nebeneinander:
// 1. Neues Layout: relevant ist alles unter packages/<paket>/ außer test/, test-support/, eval/,
//    Prüfskripten und Lint-/Entwicklungsdateien, dazu apps/storybook/src/ und das Stempel-Skript.
// 2. Altes Layout (LEGACY_PATH_PREFIXES): Der erste Release nach dem Umzug wertet auch Commits
//    aus, die noch angular-lib/, mcp-server/, css/ usw. berühren. Ohne diese Präfixe gälten sie
//    als nicht relevant und das Release würde verschluckt. Die Liste kann entfallen, sobald der
//    erste Release nach dem Umzug veröffentlicht ist.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Präfixe des Layouts vor dem Umzug. Enden auf „/“ für Verzeichnisse (jeder Pfad darunter
// zählt) oder sind exakte Dateipfade. Quelle: ADR-0010 Regel 2, verifiziert gegen die
// damaligen „build“-Skripte in package.json.
export const LEGACY_PATH_PREFIXES = [
  // CSS-Schicht: root `files`-Feld (package.json)
  'css/',
  // Gitignored; wird beim Installieren und Packen frisch aus den unten aufgeführten
  // Quellen und Build-Skripten erzeugt. Der Präfix deckt weiterhin package.json#files ab.
  'dist/',
  'icons/',
  'fonts/',
  'assets/',
  'README.md',
  'LICENSE',
  'NOTICE',
  // CHANGELOG.md war hier gelistet, solange es unter package.json#files stand. Beim
  // Repo-Aufräumen nach docs/CHANGELOG-legacy.md verschoben und aus `files` entfernt
  // (eingefroren, nicht mehr gepflegt) — kein ausgelieferter Inhalt mehr, daher kein
  // relevanter Pfad mehr.
  // Angular-Lib: ausgelieferter Inhalt (src, package.json, ng-package.json, tsconfig.lib*.json, README)
  'angular-lib/projects/design-system-angular/',
  // Build-Konfiguration, die den Lib-Build steuert
  'angular-lib/angular.json',
  // Workspace-package.json des Angular-Build-Containers: legt Angular-/ng-packagr-Version
  // und die @conciso/design-system-Quelle für den Build fest (devDependencies) — eine
  // Änderung hier kann das gebaute Artefakt verändern, auch ohne die Lib selbst anzufassen.
  'angular-lib/package.json',
  // Basis-tsconfig, von tsconfig.lib.json der Lib per `extends` eingebunden.
  'angular-lib/tsconfig.json',
  // MCP-Server (ADR-0012): ausgelieferter Inhalt aus mcp-server/package.json#files — EIN
  // Präfix pro Eintrag, genau wie beim root-Paket ganz oben. Bewusst NICHT ein einzelner
  // Verzeichnis-Präfix „mcp-server/“ für den ganzen Workspace: das würde auch
  // mcp-server/test/ (Unit-Tests, kein ausgelieferter Inhalt) und
  // mcp-server/scripts/smoke-test.mjs (CI-Prüfskript, kein Build-Eingang) miterfassen —
  // und den Coverage-Check unten sinnlos machen, weil dann JEDER denkbare Eintrag trivial
  // abgedeckt wäre, auch ein versehentlich vergessener.
  'mcp-server/bin/',
  'mcp-server/src/',
  // `snapshot/` ist gitignored und entsteht erst beim Pack aus dem Storybook-Build (siehe
  // mcp-server/scripts/build-snapshot.mjs) — die eigentliche Quelle ist bereits über
  // „storybook-angular/src/“ unten relevant. Der Eintrag hier deckt trotzdem
  // mcp-server/package.json#files ab (Coverage-Check unten).
  'mcp-server/snapshot/',
  'mcp-server/README.md',
  // Ebenfalls gitignored, entsteht erst beim Pack als Kopie der Root-LICENSE (bereits über
  // den „LICENSE“-Eintrag oben relevant) — hier aus demselben Grund wie „snapshot/“.
  'mcp-server/LICENSE',
  // mcp-server/package.json selbst (Version, `files`-Feld) — wie „package.json“ und
  // „angular-lib/package.json“ oben nicht Teil des eigenen `files`-Felds, aber die
  // Versions-/Manifest-Quelle des Pakets.
  'mcp-server/package.json',
  // Build-Skripte, die den Snapshot bzw. die LICENSE-Kopie erzeugen (Lifecycle-Hooks
  // „build:snapshot“/„prepack“ in mcp-server/package.json#scripts) — wie
  // scripts/release/stamp-version.mjs oben: keine `files`-Einträge, aber Build-Eingaben.
  'mcp-server/scripts/build-snapshot.mjs',
  'mcp-server/scripts/prepack.mjs',
  // Storybook-Quellen (ADR-0012): Stories und MDX gehen unverändert in den Manifest-Snapshot
  // des MCP-Servers ein (mcp-server/scripts/build-snapshot.mjs kopiert manifests/+services/
  // 1:1 aus dem Storybook-Build). NUR src/ — die Storybook-KONFIGURATION außerhalb davon
  // (`.storybook/main.ts`, `.storybook/preview.ts`: Addons, Docgen-Optionen, storySort)
  // bleibt bewusst unsichtbar. Das ist keine neue Entscheidung, sondern deckt sich mit dem
  // seit jeher dokumentierten Beispiel „Storybook-Konfiguration“ in
  // CONTEXT.md#veröffentlichungsrelevanter-pfad. Zwar KANN `.storybook/main.ts` den
  // Manifest-Inhalt beeinflussen (es konfiguriert Addons/Docgen, aus denen der
  // Storybook-Build components.json/docs.json erzeugt) — würde das Verzeichnis trotzdem
  // zählen, löste jede Storybook-Tooling-Änderung (Addon-Update, Viewport-Presets,
  // Sortierung) ein Release aus: genau das Über-Trigger-Problem, das der Pfadfilter laut
  // ADR-0010 anstelle eines Scope-Vokabulars vermeiden soll. Das Restrisiko (eine
  // Konfigurationsänderung verändert den Snapshot tatsächlich, ohne dass es ein Release
  // auslöst) trägt der Tarball-Smoke-Test aus ADR-0012: er läuft vor JEDEM Publish gegen
  // das TATSÄCHLICH gepackte Artefakt und prüft konkrete IDs/Inhalte des Snapshots — eine
  // dadurch kaputte Struktur lässt den Publish scheitern, bevor sie veröffentlicht wird.
  'storybook-angular/src/',
  // root package.json selbst (Version, exports, files-Feld)
  'package.json',
  // Build-Skripte, die die ausgelieferten Artefakte erzeugen (siehe „build“-Script oben)
  'scripts/build-tokens.mjs',
  'scripts/build-icons.mjs',
  'scripts/bundle-css.mjs',
  // Stempelt im Publish-Job vor beiden Builds Version und Peer-Pin in die Manifeste — ein
  // Fix daran ändert den ausgelieferten Inhalt.
  'scripts/release/stamp-version.mjs',
  // ABSICHTLICH NICHT dabei: package-lock.json. Es ist EIN gemeinsames Lockfile für alle
  // vier npm-Workspaces (Root, angular-lib, storybook-angular UND seit ADR-0012 mcp-server).
  // Würde es pauschal als relevant gelten, würde jede Dependency-Änderung releasen, auch eine
  // reine Storybook-Dev-Abhängigkeit — genau das Über-Trigger-Problem, das der Pfadfilter laut
  // ADR-0010 anstelle eines Scope-Vokabulars lösen soll. Ein `build(deps)`-Commit, der
  // eine ECHTE Build-Eingabe hebt, ändert dabei ohnehin auch `package.json`,
  // `angular-lib/package.json` oder `mcp-server/package.json` im selben Commit — das reicht
  // als Signal.
];

// Neues Layout. Ordnernamen, die unter einem Paket nie ausgeliefert werden und keine
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

function isLegacyRelevant(filePath) {
  return LEGACY_PATH_PREFIXES.some((prefix) =>
    prefix.endsWith('/') ? filePath.startsWith(prefix) : filePath === prefix,
  );
}

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
  return isPackageRelevant(filePath) || isOtherRelevant(filePath) || isLegacyRelevant(filePath);
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
