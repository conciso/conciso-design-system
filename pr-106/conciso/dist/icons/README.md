# Conciso Design System — Icons

Maschinenlesbare Icon-Bibliothek. **Generiert** von `packages/css/scripts/build-icons.mjs` aus
`icons/source/*.svg` (kanonische Quelle) + `icons/manifest.json`. Nicht manuell editieren —
neue/geänderte Icons in `icons/source/` ablegen und `npm run build:icons` ausführen.

## Inhalt

- `dist/icons/icons.json` — Map `key → { name, area, style, viewBox, strokeWidth?, body, svg, usage? }`
- `dist/icons/icons.js` — derselbe Datensatz als ESM: **ein benannter Export pro Icon** (camelCase,
  z. B. `kiBot`) **plus** das aggregierte `icons`-Objekt (Key → Eintrag)
- `dist/icons/icons.d.ts` — Typdeklaration zu `dist/icons/icons.js` (benannte Exporte + `icons`, je `CdsIconEntry`)
- `icons/source/*.svg` — die einzelnen normalisierten Quell-SVGs (Dateiname = Key)

## Konventionen

- **Stil:** `solid` (gefüllte Glyphen, `fill="currentColor"`) oder `outline` (Linien,
  `stroke="currentColor"` + inline `stroke-width`); `mixed` = beides. Das Feld `style` sagt pro
  Icon, was erwartet wird — kein Raten mehr. Die **Bereichs-Glyphen** (`co-building`, `co-mark`, `ki-bot`,
  `es-window-check`, `wo-network`) sind **solid**. Generische UI-Icons liefert das Paket nicht mit
  (siehe ADR-0016, Lucide).
- **Farbe:** alle Icons nutzen ausschließlich `currentColor` → Einfärbung beim Consumer über CSS
  `color` (z. B. `color: var(--ki-800)` bzw. im Dark `--ki-200`). Keine hartkodierten Hex-Werte.
- **Self-contained:** Outline-Icons tragen ihre `stroke-width` inline → `set:html` funktioniert ohne
  Wrapper-Annahmen über den Stil. Größe via `width`/`height` oder CSS (viewBox bleibt erhalten).
- **Keys:** `{area}-{name}` für die Bereichs-Glyphen (`co|ki|es|wo`), `ui-{name}` für bereichsneutrale
  Icons. Jeder Key hat einen benannten Export in camelCase (Bindestrich-Segment groß:
  `ki-bot` → `kiBot`, `co-building` → `coBuilding`); der Generator bricht bei einer
  Kollision oder einem ungültigen JS-Bezeichner ab.

## Verwendung

**Empfohlen: benannter Import.** Nur benannte Imports sind tree-shakable — jeder Export ist ein
eigenes `const` auf Modulebene ohne Property-Zugriff oder Funktionsaufruf, Bundler (Webpack,
Rollup, esbuild, Angular/Vite) lassen dadurch jedes nicht importierte Icon aus dem Bundle.

```js
import { kiBot } from '@conciso/design-system/icons';

kiBot.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
kiBot.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
kiBot.style  // "solid"
```

**Aggregat `icons` / `icons.json`: nur für Kataloge und Doku.** `import { icons } from
'@conciso/design-system/icons'` oder der Import von `icons.json` liefert alle 5 Icons in einem
Objekt — praktisch für eine Icon-Galerie oder einen dynamischen Lookup per String-Key, zieht dabei
aber immer die komplette Bibliothek ins Bundle, auch wenn nur ein Icon benutzt wird. In Apps daher
immer den benannten Import verwenden; `icons`/`icons.json` bleiben Kataloge/Doku (z. B. die
Storybook-Icon-Galerie) vorbehalten.

```js
import { icons } from '@conciso/design-system/icons';
// oder: import iconsJson from '@conciso/design-system/icons.json' assert { type: 'json' };

const bot = icons['ki-bot']; // äquivalent zu kiBot oben, aber nicht tree-shakable
bot.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
bot.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
bot.style  // "solid"
```

**Astro (set:html):**

```astro
---
import { kiBot } from '@conciso/design-system/icons';
const { svg } = kiBot;
---
<span class="icon" set:html={svg} />
<style>.icon { color: var(--ki-800); display: inline-flex; }
.icon :global(svg) { width: 24px; height: 24px; }</style>
```

**Jede Karte, die auf eine Bereichs-Übersicht verlinkt**, trägt das Glyph dieses Bereichs:
`ki-bot` / `es-window-check` / `wo-network` (jeweils **solid**), eingefärbt über die Bereichsfarbe
(`--XX-800` Light / `--XX-200` Dark) — exakt wie `.ep-card-icon.t-XX` im DS.

Die Regel hängt am **Anlass, nicht an der Seite**: Sie gilt auf `/leistungen` und der Landingpage
genauso wie in „Weiter im Thema“-Blöcken tiefer liegender Detailseiten. Zuvor war sie nur für die
ersten beiden Orte notiert, woraufhin fünf Verweiskarten auf Angebots-Detailseiten mit einem
generischen Heroicon liefen.

Abgrenzung: `.ep-card-icon` **ohne** `.t-XX` trägt bewusst ein thematisches Outline-Icon (Kalender,
Team, Suche) in der Bereichsfarbe. Das ist kein Fehler, sondern der Normalfall für inhaltliche
Karten. Das Marken-Glyph ist dem Verweis auf den Bereich selbst vorbehalten.

## Icon-Verzeichnis

### Corporate

| Key | Export | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|---|
| `co-building` | `coBuilding` | Corporate / Unternehmen – Bereichs-Glyphe (Gebäude) | solid | icon-size-swatch @co |
| `co-mark` | `coMark` | Corporate – Logo-Zeichen „C.“ (nur mit Logo verwenden) | solid | icon-size-swatch @co |

### Angewandte KI

| Key | Export | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|---|
| `ki-bot` | `kiBot` | Angewandte KI – Bereichs-Glyphe (Tablet/Bot) | solid | icon-size-swatch @ki, ep-card-icon t-ki @ki |

### Effektive Software

| Key | Export | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|---|
| `es-window-check` | `esWindowCheck` | Effektive Software – Bereichs-Glyphe (Fenster + Check) | solid | icon-size-swatch @es, ep-card-icon t-es @es |

### Wirksame Organisationen

| Key | Export | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|---|
| `wo-network` | `woNetwork` | Wirksame Organisationen – Bereichs-Glyphe (Netzwerk) | solid | icon-size-swatch @wo, ep-card-icon t-wo @wo |
