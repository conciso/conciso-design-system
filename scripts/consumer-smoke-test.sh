#!/usr/bin/env bash
#
# Consumer-Smoke-Test (siehe CONTEXT.md#consumer-smoke-test, docs/adr/0003 + 0004).
#
# Baut die Angular-Lib (@conciso/design-system-angular) und die CSS-Schicht
# (@conciso/design-system), tarballt beide per `npm pack` und installiert die
# Tarballs — statt Quell-Code oder Workspace-Pfad-Mapping — in die committete
# Consumer-Fixture (examples/consumer-fixture). Danach ein produktiver
# AOT-`ng build` dort. Testet exakt das gebaute Artefakt, das ein Konsument
# tatsächlich bekommt: APF-Metadaten, Vollständigkeit der Re-Exports in
# public-api.ts, peer-Dep-Auflösung, AOT-Template-Typfehler, Icon-Registrierung.
#
# Voraussetzung: `npm install` im Repo-Root (installiert die Workspaces
# storybook-angular + angular-lib). Führt selbst KEIN Root-Install aus.
#
# Aufruf: scripts/consumer-smoke-test.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIXTURE="$ROOT/examples/consumer-fixture"
PACK_DIR="$(mktemp -d)"
trap 'rm -rf "$PACK_DIR"' EXIT

echo "→ CSS-Schicht bauen (@conciso/design-system)"
(cd "$ROOT" && npm run build)

echo "→ Angular-Lib bauen (@conciso/design-system-angular)"
(cd "$ROOT" && npm run build --workspace=angular-lib)

echo "→ Beide Pakete tarballen"
CSS_TARBALL="$(cd "$ROOT" && npm pack --silent --pack-destination "$PACK_DIR")"
LIB_TARBALL="$(cd "$ROOT/angular-lib/dist/design-system-angular" && npm pack --silent --pack-destination "$PACK_DIR")"

echo "→ Tarballs in die Consumer-Fixture installieren (sauberer node_modules-Zustand)"
rm -rf "$FIXTURE/node_modules" "$FIXTURE/package-lock.json"
(cd "$FIXTURE" && npm install --no-save "$PACK_DIR/$LIB_TARBALL" "$PACK_DIR/$CSS_TARBALL")

echo "→ Produktiven AOT-Build der Fixture fahren"
(cd "$FIXTURE" && npx ng build)

OUT="$FIXTURE/dist/consumer-fixture/browser/index.html"
test -f "$OUT"
echo "→ Consumer-Smoke-Test grün: $OUT"
