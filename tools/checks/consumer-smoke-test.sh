#!/usr/bin/env bash
#
# Consumer-Smoke-Test (siehe CONTEXT.md#consumer-smoke-test, docs/adr/0003 + 0004).
#
# Baut die Angular-Lib (@conciso/design-system-angular) und die CSS-Schicht
# (@conciso/design-system), tarballt beide per `npm pack` und installiert die
# Tarballs — statt Quell-Code oder Workspace-Pfad-Mapping — in eine Kopie der
# committeten Consumer-Fixture (tools/consumer-fixture). Danach ein produktiver
# AOT-`ng build` dort. Testet exakt das gebaute Artefakt, das ein Konsument
# tatsächlich bekommt: APF-Metadaten, Vollständigkeit der Re-Exports in
# public-api.ts, peer-Dep-Auflösung, AOT-Template-Typfehler, Icon-Registrierung
# UND Tree-Shaking der DS-Icons (src/lib/icons/cds-icons.ts importiert nur benannte Exporte,
# nie das aggregierte `icons`-Objekt — ein Fund von „co-building“, einem Bereichs-
# Glyph, den die Fixture nirgends nutzt, im gebauten main.js beweist eine Regression).
#
# WARUM AUSSERHALB DES REPOS GEBAUT WIRD: Node löst Module über die
# Elternverzeichnisse auf. Solange die Fixture unter tools/ im Repo gebaut wird,
# findet sie JEDES Angular-Paket im Wurzel-node_modules (dort installiert für
# apps/storybook) — auch eines, das die Lib benutzt, aber nicht deklariert. Der
# Test konnte eine fehlende Abhängigkeit deshalb NIE melden: `@angular/forms` und
# `@angular/platform-browser` fehlten als peerDependency und fielen erst im Review
# auf. Die Fixture wird darum nach $TMPDIR gespiegelt und dort gebaut, wo über der
# Fixture kein node_modules mehr liegt. Fehlt eine Deklaration, bricht der Build.
#
# Voraussetzung: `npm install` im Repo-Root (installiert die Workspaces
# apps/storybook, packages/*). Führt selbst KEIN Root-Install aus.
#
# Testet standardmäßig den versionsfreien Platzhalter 0.0.0 (siehe
# docs/adr/0010-release-ausloesung-und-versionsquelle.md). Mit einem Versions-Argument
# stempelt der Test zuerst über tools/release/stamp-version.mjs — genau das Artefakt,
# das der Publish-Workflow tatsächlich veröffentlicht (Spec Regel 8 „Smoke-Test testet das
# gestempelte Artefakt“). Nach dem Lauf werden alle drei Manifeste wieder auf ihren Stand
# davor zurückgesetzt; gestempelt wird also nie etwas, das man committen könnte.
#
# Aufruf: tools/checks/consumer-smoke-test.sh [version]
set -euo pipefail

VERSION="${1:-}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FIXTURE_SRC="$ROOT/tools/consumer-fixture"
WORK="$(mktemp -d)"
CSS_PKG="$ROOT/packages/css/package.json"
LIB_PKG="$ROOT/packages/angular/package.json"
MCP_PKG="$ROOT/packages/mcp/package.json"

# Das Stempeln schreibt in die committeten Manifeste. Beim Aufräumen werden alle drei wieder auf
# den Stand vor dem Lauf gesetzt — sonst bliebe ein lokaler Lauf mit Version gestempelt,
# und ein späterer Lauf ohne Version prüfte nicht mehr den Platzhalter 0.0.0.
aufraeumen() {
  if [ -f "$WORK/css-package.json" ]; then
    cp "$WORK/css-package.json" "$CSS_PKG"
    cp "$WORK/lib-package.json" "$LIB_PKG"
    cp "$WORK/mcp-package.json" "$MCP_PKG"
  fi
  rm -rf "$WORK"
}
trap aufraeumen EXIT

PACK_DIR="$WORK/pack"
FIXTURE="$WORK/consumer-fixture"
mkdir -p "$PACK_DIR"

if [ -n "$VERSION" ]; then
  cp "$CSS_PKG" "$WORK/css-package.json"
  cp "$LIB_PKG" "$WORK/lib-package.json"
  cp "$MCP_PKG" "$WORK/mcp-package.json"
  echo "→ Version $VERSION vor dem Build stempeln (package.json + Peer-Pin der Lib)"
  (cd "$ROOT" && node tools/release/stamp-version.mjs "$VERSION")
fi

echo "→ CSS-Schicht bauen (@conciso/design-system)"
(cd "$ROOT" && npm run build --workspace=packages/css)

echo "→ Angular-Lib bauen (@conciso/design-system-angular)"
(cd "$ROOT" && npm run build --workspace=packages/angular)

# Jedes Paket packt in ein eigenes Verzeichnis, und der Tarball wird dort gesucht statt aus der
# Ausgabe von `npm pack` gelesen: das Root-Paket baut dabei über seinen `prepare`-Hook neu und
# schreibt auf denselben stdout, `$(npm pack …)` lieferte also Build-Meldungen statt des Dateinamens.
echo "→ Beide Pakete tarballen"
mkdir -p "$PACK_DIR/css" "$PACK_DIR/lib"
(cd "$ROOT/packages/css" && npm pack --pack-destination "$PACK_DIR/css" > /dev/null)
(cd "$ROOT/packages/angular/dist" && npm pack --pack-destination "$PACK_DIR/lib" > /dev/null)
CSS_TARBALL="$(ls "$PACK_DIR"/css/*.tgz)"
LIB_TARBALL="$(ls "$PACK_DIR"/lib/*.tgz)"

echo "→ Fixture nach $FIXTURE spiegeln (außerhalb des Repos, siehe Kopfkommentar)"
mkdir -p "$FIXTURE"
tar -c -C "$FIXTURE_SRC" \
  --exclude=node_modules --exclude=dist --exclude=package-lock.json --exclude=.angular \
  . | tar -x -C "$FIXTURE"

echo "→ Tarballs in die gespiegelte Fixture installieren"
(cd "$FIXTURE" && npm install --no-save "$LIB_TARBALL" "$CSS_TARBALL")

# Löst jeden öffentlichen Importpfad der `exports`-Map gegen den installierten Tarball auf und
# prüft, dass die Datei dahinter existiert. Der Schlüssel „.“ (das CSS-Bundle) lässt sich nicht
# aus TypeScript importieren, der AOT-Build unten deckt ihn deshalb nicht ab; die übrigen
# Schlüssel (`./icons` samt Typen, `./tokens.json`) importiert die Fixture zusätzlich selbst.
echo "→ Öffentliche Importpfade des CSS-Pakets auflösen"
(cd "$FIXTURE" && node --input-type=module -e '
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const specs = [
  "", "/tokens", "/tokens.json", "/tokens.scss", "/icons", "/icons.json",
  "/dist/conciso-ds.css", "/css/fonts.css", "/css/tokens.css", "/css/dark-mode.css",
  "/css/base.css", "/css/components.css", "/assets/brand/logo-conciso.svg",
];
let failed = false;
for (const suffix of specs) {
  const spec = "@conciso/design-system" + suffix;
  try {
    const file = fileURLToPath(import.meta.resolve(spec));
    if (!existsSync(file)) throw new Error("Datei fehlt: " + file);
    console.log("  " + spec + " -> " + file.slice(file.indexOf("node_modules")));
  } catch (error) {
    failed = true;
    console.error("  " + spec + ": " + error.message);
  }
}
if (failed) process.exit(1);
')

echo "→ Produktiven AOT-Build der Fixture fahren"
(cd "$FIXTURE" && npx ng build)

OUT="$FIXTURE/dist/consumer-fixture/browser/index.html"
test -f "$OUT"

echo "→ Tree-Shaking der DS-Icons prüfen (main.js darf „co-building“ nicht enthalten)"
MAIN_JS="$(find "$FIXTURE/dist/consumer-fixture/browser" -maxdepth 1 -name 'main-*.js' | head -n1)"
if [ -z "$MAIN_JS" ]; then
  echo "DS-Icons nicht tree-shakable: main-*.js im Build-Output nicht gefunden, Prüfung kann nicht laufen." >&2
  exit 1
fi
if grep -q 'co-building' "$MAIN_JS"; then
  echo "DS-Icons nicht tree-shakable: das Bereichs-Glyph co-building (von der Fixture nirgends genutzt) steckt in $MAIN_JS. packages/angular/src/lib/icons/cds-icons.ts importiert vermutlich wieder das aggregierte icons-Objekt statt der benannten Exporte (siehe packages/css/icons/README.md, Abschnitt Verwendung)." >&2
  exit 1
fi
echo "  main.js: $(basename "$MAIN_JS"), $(wc -c < "$MAIN_JS" | tr -d ' ') Bytes (raw)"

echo "→ Consumer-Smoke-Test grün: $OUT"
