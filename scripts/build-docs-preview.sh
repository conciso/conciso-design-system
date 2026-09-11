#!/usr/bin/env bash
#
# Baut eine in sich geschlossene, offline lauffähige Vorschau der Design-System-
# Doku (docs/index.html) in ein Ausgabeverzeichnis. Zweck: PR-Vorschau, die als
# Artefakt heruntergeladen (entpacken → index.html öffnen) und/oder auf GitHub
# Pages serviert werden kann.
#
# Legt index.html an die WURZEL des Ausgabeverzeichnisses (statt unter docs/) und
# schreibt die ../css/- und ../assets/-Referenzen auf css/ bzw. assets/ um, damit
# ein Doppelklick auf die oberste index.html direkt funktioniert. css/, fonts/,
# assets/ und main.js liegen als Geschwister daneben (fonts.css referenziert
# ../fonts → löst korrekt auf).
#
# Unter assets/ verschmelzen zwei Quellen zu Geschwistern: die Demo-Fotos aus
# docs/assets/images und die ausgelieferten Brand-Logos aus dem Repo-Root
# (assets/brand). Deshalb wird beides in dasselbe Zielverzeichnis kopiert.
#
# Die Fotos unter assets/images (~155 MB Originale) werden auf max. 1400 px
# herunterskaliert und rekomprimiert, damit die Vorschau wenige MB statt >150 MB
# groß ist. SVGs bleiben unangetastet.
#
# Aufruf: scripts/build-docs-preview.sh [AUSGABEVERZEICHNIS]   (Default: _preview)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$ROOT/_preview}"

rm -rf "$OUT"
mkdir -p "$OUT"

cp -r "$ROOT/css" "$OUT/css"
cp -r "$ROOT/fonts" "$OUT/fonts"
cp -r "$ROOT/docs/assets" "$OUT/assets"
# Nach docs/assets, damit $OUT/assets schon existiert.
cp -r "$ROOT/assets/brand" "$OUT/assets/brand"
cp "$ROOT/docs/main.js" "$OUT/main.js"

# index.html an die Wurzel; ../css/ → css/ und ../assets/ → assets/
# (fonts über css unverändert korrekt).
sed -e 's#\.\./css/#css/#g' -e 's#\.\./assets/#assets/#g' "$ROOT/docs/index.html" > "$OUT/index.html"

# Fotos herunterskalieren (jpg/png); SVG bleibt.
find "$OUT/assets" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 \
  | xargs -0 -r mogrify -resize '1400x1400>' -quality 82 -strip

echo "Vorschau gebaut in: $OUT"
du -sh "$OUT"
