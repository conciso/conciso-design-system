// Veröffentlichungsrelevante Pfade (ADR-0010, ADR-0012, CONTEXT.md#veröffentlichungsrelevanter-pfad):
// ausgelieferter Inhalt aller drei Pakete plus dessen Build-Eingaben. Genau EINE Stelle, von
// zwei Seiten gemeinsam genutzt: dem semantic-release-Plugin (scripts/release/semantic-release-plugin.mjs,
// entscheidet über Version/Notes) und dem commitlint-Filter (scripts/release/check-relevant-commits.mjs,
// entscheidet, welche Commits hart geprüft werden). Beide Seiten driften nicht auseinander,
// weil beide von hier importieren statt eine eigene Liste zu pflegen.
import { readFileSync, existsSync } from 'node:fs';
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

// Dieselbe Präfix-Logik wie isPathRelevant: Ein files-Eintrag ist abgedeckt, wenn er selbst
// als Datei relevant ist (z. B. „css/components.css“ unter „css/“, „README.md“ exakt) oder
// als Verzeichnis unter einem gepflegten Ordner liegt bzw. ihm entspricht („css“, „tokens/sub“).
function isEntryCovered(entry) {
  const dirPrefix = asDirPrefix(entry);
  return (
    isPathRelevant(entry) ||
    RELEVANT_PATH_PREFIXES.some((prefix) => prefix.endsWith('/') && dirPrefix.startsWith(prefix))
  );
}

/**
 * Deckungs-Check (Spec Regel 3): jeder Eintrag im root `files`-Feld, in
 * mcp-server/package.json#files (ADR-0012, drittes Paket) UND der ausgelieferte Inhalt der
 * Lib muss durch RELEVANT_PATH_PREFIXES abgedeckt sein. Gibt die fehlenden Einträge zurück
 * (leeres Array = ok), statt selbst zu werfen, damit Aufrufer (CLI wie Test) frei
 * entscheiden, wie sie das melden.
 */
export function checkCoverage(root = ROOT) {
  const missing = [];
  const rootPkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  for (const entry of rootPkg.files ?? []) {
    if (!isEntryCovered(entry)) missing.push(entry);
  }

  // Drittes Paket (ADR-0012): mcp-server/package.json#files wird genauso geprüft wie das
  // root-Paket oben. Die Einträge dort sind relativ zu mcp-server/ (z. B. „bin“, „src“) —
  // vor dem Covered-Check deshalb mit diesem Präfix versehen, damit sie gegen dieselben
  // RELEVANT_PATH_PREFIXES wie ein echter Repo-Pfad geprüft werden. `existsSync`, weil
  // Test-Fixtures (relevant-paths.test.mjs) bewusst nur ein root-package.json anlegen —
  // dort wird stillschweigend nichts geprüft, statt mit ENOENT abzubrechen.
  const mcpPkgPath = join(root, 'mcp-server', 'package.json');
  if (existsSync(mcpPkgPath)) {
    const mcpPkg = JSON.parse(readFileSync(mcpPkgPath, 'utf8'));
    for (const entry of mcpPkg.files ?? []) {
      const namespaced = `mcp-server/${entry}`;
      if (!isEntryCovered(namespaced)) missing.push(namespaced);
    }
  }

  // Fest verdrahtete Build-Eingaben außerhalb des `files`-Felds, die trotzdem abgedeckt
  // sein müssen (Spec Regel 3 „... UND der ausgelieferte Inhalt der Lib“, erweitert um
  // deren Build-Eingaben aus demselben Grund).
  const requiredPrefixes = [
    'angular-lib/projects/design-system-angular/',
    'angular-lib/angular.json',
    'angular-lib/package.json',
    'angular-lib/tsconfig.json',
    'scripts/release/stamp-version.mjs',
  ];
  for (const entry of requiredPrefixes) {
    if (!RELEVANT_PATH_PREFIXES.includes(entry)) missing.push(entry);
  }

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
