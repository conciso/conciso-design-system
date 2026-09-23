#!/usr/bin/env bash
#
# Consumer-Smoke-Test (siehe CONTEXT.md#consumer-smoke-test, docs/adr/0003 + 0004).
#
# Baut die Angular-Lib (@conciso/design-system-angular) und die CSS-Schicht
# (@conciso/design-system), tarballt beide per `npm pack` und installiert die
# Tarballs — statt Quell-Code oder Workspace-Pfad-Mapping — in eine Kopie der
# committeten Consumer-Fixture (examples/consumer-fixture). Danach ein produktiver
# AOT-`ng build` dort. Testet exakt das gebaute Artefakt, das ein Konsument
# tatsächlich bekommt: APF-Metadaten, Vollständigkeit der Re-Exports in
# public-api.ts, peer-Dep-Auflösung, AOT-Template-Typfehler, Icon-Registrierung.
#
# WARUM AUSSERHALB DES REPOS GEBAUT WIRD: Node löst Module über die
# Elternverzeichnisse auf. Solange die Fixture unter examples/ im Repo gebaut wird,
# findet sie JEDES Angular-Paket im Wurzel-node_modules (dort installiert für
# storybook-angular) — auch eines, das die Lib benutzt, aber nicht deklariert. Der
# Test konnte eine fehlende Abhängigkeit deshalb NIE melden: `@angular/forms` und
# `@angular/platform-browser` fehlten als peerDependency und fielen erst im Review
# auf. Die Fixture wird darum nach $TMPDIR gespiegelt und dort gebaut, wo über der
# Fixture kein node_modules mehr liegt. Fehlt eine Deklaration, bricht der Build.
#
# Voraussetzung: `npm install` im Repo-Root (installiert die Workspaces
# storybook-angular + angular-lib). Führt selbst KEIN Root-Install aus.
#
# Testet standardmäßig den versionsfreien Platzhalter 0.0.0 (siehe
# docs/adr/0010-release-ausloesung-und-versionsquelle.md). Mit einem Versions-Argument
# stempelt der Test zuerst über scripts/release/stamp-version.mjs — genau das Artefakt,
# das der Publish-Workflow tatsächlich veröffentlicht (Spec Regel 8 „Smoke-Test testet das
# gestempelte Artefakt“). Nach dem Lauf werden beide Manifeste wieder auf ihren Stand
# davor zurückgesetzt; gestempelt wird also nie etwas, das man committen könnte.
#
# Aufruf: scripts/consumer-smoke-test.sh [version]
set -euo pipefail

VERSION="${1:-}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIXTURE_SRC="$ROOT/examples/consumer-fixture"
WORK="$(mktemp -d)"
LIB_PKG="$ROOT/angular-lib/projects/design-system-angular/package.json"

# Das Stempeln schreibt in die committeten Manifeste. Beim Aufräumen werden beide wieder auf
# den Stand vor dem Lauf gesetzt — sonst bliebe ein lokaler Lauf mit Version gestempelt,
# und ein späterer Lauf ohne Version prüfte nicht mehr den Platzhalter 0.0.0.
aufraeumen() {
  if [ -f "$WORK/root-package.json" ]; then
    cp "$WORK/root-package.json" "$ROOT/package.json"
    cp "$WORK/lib-package.json" "$LIB_PKG"
  fi
  rm -rf "$WORK"
}
trap aufraeumen EXIT

PACK_DIR="$WORK/pack"
FIXTURE="$WORK/consumer-fixture"
mkdir -p "$PACK_DIR"

if [ -n "$VERSION" ]; then
  cp "$ROOT/package.json" "$WORK/root-package.json"
  cp "$LIB_PKG" "$WORK/lib-package.json"
  echo "→ Version $VERSION vor dem Build stempeln (package.json + Peer-Pin der Lib)"
  (cd "$ROOT" && node scripts/release/stamp-version.mjs "$VERSION")
fi

echo "→ CSS-Schicht bauen (@conciso/design-system)"
(cd "$ROOT" && npm run build)

echo "→ Angular-Lib bauen (@conciso/design-system-angular)"
(cd "$ROOT" && npm run build --workspace=angular-lib)

echo "→ Beide Pakete tarballen"
CSS_TARBALL="$(cd "$ROOT" && npm pack --silent --pack-destination "$PACK_DIR")"
LIB_TARBALL="$(cd "$ROOT/angular-lib/dist/design-system-angular" && npm pack --silent --pack-destination "$PACK_DIR")"

echo "→ Fixture nach $FIXTURE spiegeln (außerhalb des Repos, siehe Kopfkommentar)"
mkdir -p "$FIXTURE"
tar -c -C "$FIXTURE_SRC" \
  --exclude=node_modules --exclude=dist --exclude=package-lock.json --exclude=.angular \
  . | tar -x -C "$FIXTURE"

echo "→ Tarballs in die gespiegelte Fixture installieren"
(cd "$FIXTURE" && npm install --no-save "$PACK_DIR/$LIB_TARBALL" "$PACK_DIR/$CSS_TARBALL")

echo "→ Produktiven AOT-Build der Fixture fahren"
(cd "$FIXTURE" && npx ng build)

OUT="$FIXTURE/dist/consumer-fixture/browser/index.html"
test -f "$OUT"
echo "→ Consumer-Smoke-Test grün: $OUT"
