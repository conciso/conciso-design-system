# Conciso Design System — Icons

Maschinenlesbare Icon-Bibliothek. **Generiert** von `scripts/build-icons.mjs` aus
`icons/source/*.svg` (kanonische Quelle) + `icons/manifest.json`. Nicht manuell editieren —
neue/geänderte Icons in `icons/source/` ablegen und `npm run build:icons` ausführen.

## Inhalt

- `icons/icons.json` — Map `key → { name, area, style, viewBox, strokeWidth?, body, svg, usage? }`
- `icons/icons.js` — derselbe Datensatz als ESM (`import { icons } from '@conciso/design-system/icons'`)
- `icons/source/*.svg` — die einzelnen normalisierten Quell-SVGs (Dateiname = Key)

## Konventionen

- **Stil:** `solid` (gefüllte Glyphen, `fill="currentColor"`) oder `outline` (Linien,
  `stroke="currentColor"` + inline `stroke-width`); `mixed` = beides. Das Feld `style` sagt pro
  Icon, was erwartet wird — kein Raten mehr. Die vier **Bereichs-Glyphen** (`ki-bot`, `es-window-check`,
  `wo-network`, `co-building`) sind **solid**; die meisten generischen UI-Icons sind **outline**.
- **Farbe:** alle Icons nutzen ausschließlich `currentColor` → Einfärbung beim Consumer über CSS
  `color` (z. B. `color: var(--ki-800)` bzw. im Dark `--ki-200`). Keine hartkodierten Hex-Werte.
- **Self-contained:** Outline-Icons tragen ihre `stroke-width` inline → `set:html` funktioniert ohne
  Wrapper-Annahmen über den Stil. Größe via `width`/`height` oder CSS (viewBox bleibt erhalten).
- **Keys:** `{area}-{name}` für die Bereichs-Glyphen (`co|ki|es|wo`), `ui-{name}` für bereichsneutrale Icons.

## Verwendung

```js
import { icons } from '@conciso/design-system/icons';
// oder: import iconsJson from '@conciso/design-system/icons.json' assert { type: 'json' };

const shield = icons['ui-shield-check'];
shield.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
shield.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
shield.style  // "outline"
```

**Astro (set:html):**

```astro
---
import { icons } from '@conciso/design-system/icons';
const { svg } = icons['ki-bot'];
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

| Key | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|
| `co-building` | Corporate / Unternehmen – Bereichs-Glyphe (Gebäude) | solid | icon-size-swatch @co |
| `co-mark` | Corporate – Logo-Zeichen „C.“ (nur mit Logo verwenden) | solid | icon-size-swatch @co |

### Angewandte KI

| Key | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|
| `ki-bot` | Angewandte KI – Bereichs-Glyphe (Tablet/Bot) | solid | icon-size-swatch @ki, ep-card-icon t-ki @ki |

### Effektive Software

| Key | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|
| `es-window-check` | Effektive Software – Bereichs-Glyphe (Fenster + Check) | solid | icon-size-swatch @es, ep-card-icon t-es @es |

### Wirksame Organisationen

| Key | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|
| `wo-network` | Wirksame Organisationen – Bereichs-Glyphe (Netzwerk) | solid | icon-size-swatch @wo, ep-card-icon t-wo @wo |

### Bereichsneutral (UI)

| Key | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|
| `ui-academic-cap` | Doktorhut / Lernen | outline | ep-feature-icon @co |
| `ui-adjustments-horizontal` | Regler / Einstellungen | outline (1.25) | ep-card-icon @ki |
| `ui-arrow-down-tray-2` | Download (Outline-Variante) | outline (1.5) | docs-nav (cta) |
| `ui-arrow-down-tray` | Download | solid | cta-dl-icon @ki |
| `ui-arrow-path` | Aktualisieren / Kreislauf | outline (1.25) | ep-card-icon @wo |
| `ui-arrow-trending-up` | Trend aufwärts | outline (1.25) | ep-card-icon @ki |
| `ui-banknotes` | Geldscheine | outline | ep-feature-icon @co |
| `ui-bars-3-center-left` | Balken, mittlere Zeile kurz und linksbündig (Footer) | outline (1.5) | docs-nav (footer) |
| `ui-bars-3` | Balken (Hamburger-Navigation) | outline (1.5) | docs-nav (navigation) |
| `ui-bolt-2` | Blitz (Variante) | outline (1.25) | card-media @es |
| `ui-bolt` | Blitz | outline (1.25) | ep-card-icon @co, ep-card-icon @ki |
| `ui-book-open` | Aufgeschlagenes Buch / Quellen | outline (1.5) | docs-nav (sources) |
| `ui-briefcase-2` | Aktenkoffer (Variante) | outline | ep-section |
| `ui-briefcase` | Aktenkoffer | outline (1.25) | ep-card-icon @co |
| `ui-building-office` | Bürogebäude | outline (1.5) | ep-tl-icon |
| `ui-calendar-days` | Kalender (Tage) | outline (1.25) | ep-card-icon @co, col-3, stoerer-icon (Veranstaltung) |
| `ui-calendar` | Kalender | outline (1) | card-meta |
| `ui-caret-down` | Caret nach unten (Nav-Toggle) | outline | ep-tab-toggle, ep-nav-btn ep-nav-item-toggle, ep-nav-btn ep-nav-item-toggle t-co |
| `ui-chart-bar` | Balkendiagramm | outline | ep-feature-icon @co |
| `ui-chat-bubble-left-right` | Chat-Blasen (Dialog) | outline (1.5) | ep-feature-icon, ep-feature-icon @ki |
| `ui-chat-bubble-oval-left-ellipsis` | Chat-Blase oval mit Auslassungspunkten | outline (1.5) | docs-nav (feedback) |
| `ui-chat-bubble-oval` | Chat-Blase (oval) | outline (1.25) | ep-card-icon @ki |
| `ui-check-badge` | Verifiziert-Abzeichen | solid | — |
| `ui-check-circle-2` | Häkchen im Kreis (Variante) | outline (1.5) | — |
| `ui-check-circle` | Häkchen im Kreis | outline | — |
| `ui-check` | Häkchen (klein) | outline | — |
| `ui-chevron-down` | Chevron nach unten (FAQ/Akkordeon) | outline (1.25) | ep-faq, ep-faq-a, ep-compare-summary, article-toc-summary |
| `ui-chevron-up-down` | Chevron auf/ab (Dropdown-Toggle) | outline (1.5) | docs-nav (dropdowns) |
| `ui-circle-stack` | Datenbank / Stapel | outline (1.25) | card-media @es |
| `ui-clock` | Uhr | outline | ep-feature-icon @co |
| `ui-code-bracket-2` | Code-Klammern (Variante) | outline (1.25) | ep-card-icon @es |
| `ui-code-bracket-square` | Code-Klammern im Quadrat | outline (1.5) | docs-nav (code) |
| `ui-code-bracket` | Code-Klammern | outline | — |
| `ui-cog-6tooth` | Zahnrad (6 Zähne) | outline (1.5) | ep-feature-icon @ki |
| `ui-cog` | Zahnrad | outline (1.25) | ep-card-icon @ki |
| `ui-computer-desktop` | Desktop-Rechner / Hero | outline (1.5) | docs-nav (hero) |
| `ui-cpu-chip-2` | CPU / Chip (Variante) | outline (1.5) | ep-feature-icon |
| `ui-cpu-chip` | CPU / Chip | outline (1.25) | ep-card-icon @ki |
| `ui-cube-2` | Würfel (Variante) | outline (1.5) | ep-feature-icon @ki |
| `ui-cube-transparent` | Würfel transparent / Design Tokens | outline (1.5) | docs-nav (tokens) |
| `ui-cube` | Würfel / Box | outline (1.25) | ep-card-icon @ki |
| `ui-currency-euro` | Euro | outline (1.25) | col-3 |
| `ui-cursor-arrow-rays` | Cursor mit Strahlen / Interaktion | outline (1.5) | docs-nav (buttons) |
| `ui-device-phone-mobile` | Mobilgerät / Responsive | outline (1.5) | docs-nav (responsive) |
| `ui-document-text` | Dokument mit Text / Wissensbeitrag | outline (1.5) | docs-nav (article) |
| `ui-face-smile` | Smiley / Icons | outline (1.5) | docs-nav (icons) |
| `ui-flag` | Fahne / Markenrad | outline (1.5) | docs-nav (brand) |
| `ui-folder` | Ordner | outline (1.25) | ep-card-icon @co |
| `ui-hand-raised` | Erhobene Hand | outline (1.25) | ep-card-icon @co |
| `ui-heart` | Herz | outline | ep-feature-icon @co |
| `ui-information-circle` | Info im Kreis | outline (1.25) | stoerer-icon (Info) |
| `ui-language` | Sprache / Typografie | outline (1.5) | docs-nav (typography) |
| `ui-link` | Kettenglied / Link | outline (1.5) | ep-feature-icon @ki |
| `ui-list-bullet` | Aufzählungsliste | outline | — |
| `ui-lock-closed-2` | Schloss (Variante) | outline (1.25) | ep-card-icon @ki |
| `ui-lock-closed` | Schloss geschlossen | outline (1.5) | ep-feature-icon |
| `ui-magnifying-glass` | Lupe | outline (1.25) | ep-card-icon @ki |
| `ui-map-pin-2` | Standort-Pin (Variante) | outline (1.25) | col-3 |
| `ui-map-pin` | Standort-Pin | outline (1) | — |
| `ui-megaphone` | Megafon / Verlautbarung | outline (1.25) | stoerer-icon (Pressemitteilung) |
| `ui-newspaper-2` | Zeitung / Artikel (Variante) | outline (1.5) | docs-nav (listing), docs-nav (events) |
| `ui-newspaper` | Zeitung / Artikel | outline (1.25) | ep-card-icon @co, ep-card-icon @ki, stoerer-icon (Wissensbeitrag) |
| `ui-pause` | Pause | solid | logo-carousel-pause |
| `ui-pencil-square` | Stift im Quadrat / Bearbeiten | outline (1.5) | docs-nav (inputs) |
| `ui-photo` | Foto / Bildsprache | outline (1.5) | docs-nav (imagery) |
| `ui-play` | Play | solid | icon-pause |
| `ui-puzzle-piece` | Puzzleteil | outline (1.5) | ep-tl-icon |
| `ui-quote` | Zitatzeichen (Team-Stimme) | solid | team-voice-body @co |
| `ui-rectangle-stack` | Rechteck-Stapel / Cards | outline (1.5) | docs-nav (cards) |
| `ui-rocket-launch` | Rakete | outline (1.5) | ep-tl-icon |
| `ui-shield-check-2` | Schild mit Häkchen (Variante) | outline | ep-feature-icon @co |
| `ui-shield-check` | Schild mit Häkchen | outline (1.25) | ep-card-icon @co, ep-card-icon @ki, ep-card-icon @es |
| `ui-sparkles-2` | Funkeln (Variante) | outline (1.5) | ep-feature-icon @ki |
| `ui-sparkles-3` | Funkeln (Variante) | outline (1.25) | card-media @es |
| `ui-sparkles-4` | Funkeln (Variante, drei Strahlen) | outline (1.5) | docs-nav (brand) |
| `ui-sparkles` | Funkeln / Sparkles | outline (1.25) | ep-card-icon @ki |
| `ui-square-2-stack` | Quadrate gestapelt / Slider | outline (1.5) | docs-nav (slider) |
| `ui-squares-2x2` | Raster 2×2 | outline (1.25) | ep-card-icon @ki, ep-card-icon @es |
| `ui-squares-plus` | Module / Raster+ | outline (1.25) | ep-card-icon @wo |
| `ui-star-2` | Stern (Variante) | outline | — |
| `ui-star` | Stern | outline (1.5) | ep-tl-icon |
| `ui-sun` | Sonne / Theme-Umschalter | outline (1.5) | docs-nav (theme) |
| `ui-swatch` | Farbfeld / Swatch | outline (1.5) | ep-tl-icon |
| `ui-table-cells` | Tabellenzellen | outline (1.5) | docs-nav (table) |
| `ui-tag` | Preisschild / Tag | outline (1.5) | docs-nav (chips), docs-nav (leistung-detail) |
| `ui-trophy-2` | Pokal (Variante) | outline | — |
| `ui-trophy` | Pokal | outline (1.5) | ep-tl-icon |
| `ui-user-group-2` | Personengruppe (Variante) | outline | ep-feature-icon @co |
| `ui-user-group` | Personengruppe (3) | outline (1.25) | ep-card-icon @co, ep-card-icon @wo, col-3 |
| `ui-users-2` | Personen (Variante) | outline | — |
| `ui-users` | Personen (2) | outline (1) | — |
| `ui-viewfinder-circle` | Sucher / Fokus | outline (1.25) | ep-card-icon @co |
| `ui-window` | Browserfenster / Beispielseiten | outline (1.5) | docs-nav (examples) |
| `ui-wrench-screwdriver` | Werkzeug (Schlüssel + Schraubendreher) | outline (1.25) | ep-card-icon @co |
