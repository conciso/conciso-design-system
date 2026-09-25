# Conciso Design System — Icons

Maschinenlesbare Icon-Bibliothek. **Generiert** von `scripts/build-icons.mjs` aus
`icons/source/*.svg` (kanonische Quelle) + `icons/manifest.json`. Nicht manuell editieren —
neue/geänderte Icons in `icons/source/` ablegen und `npm run build:icons` ausführen.

## Inhalt

- `icons/icons.json` — Map `key → { name, area, style, viewBox, strokeWidth?, body, svg, usage? }`
- `icons/icons.js` — derselbe Datensatz als ESM: **ein benannter Export pro Icon** (camelCase,
  z. B. `uiShieldCheck`) **plus** das aggregierte `icons`-Objekt (Key → Eintrag)
- `icons/icons.d.ts` — Typdeklaration zu `icons/icons.js` (benannte Exporte + `icons`, je `CdsIconEntry`)
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
- **Keys:** `{area}-{name}` für die Bereichs-Glyphen (`co|ki|es|wo`), `ui-{name}` für bereichsneutrale
  Icons. Jeder Key hat einen benannten Export in camelCase (Bindestrich-Segment groß:
  `ui-caret-down` → `uiCaretDown`, `co-building` → `coBuilding`); der Generator bricht bei einer
  Kollision oder einem ungültigen JS-Bezeichner ab.

## Verwendung

**Empfohlen: benannter Import.** Nur benannte Imports sind tree-shakable — jeder Export ist ein
eigenes `const` auf Modulebene ohne Property-Zugriff oder Funktionsaufruf, Bundler (Webpack,
Rollup, esbuild, Angular/Vite) lassen dadurch jedes nicht importierte Icon aus dem Bundle.

```js
import { uiShieldCheck } from '@conciso/design-system/icons';

uiShieldCheck.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
uiShieldCheck.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
uiShieldCheck.style  // "outline"
```

**Aggregat `icons` / `icons.json`: nur für Kataloge und Doku.** `import { icons } from
'@conciso/design-system/icons'` oder der Import von `icons.json` liefert alle 99 Icons in einem
Objekt — praktisch für eine Icon-Galerie oder einen dynamischen Lookup per String-Key, zieht dabei
aber immer die komplette Bibliothek ins Bundle, auch wenn nur ein Icon benutzt wird. In Apps daher
immer den benannten Import verwenden; `icons`/`icons.json` bleiben Kataloge/Doku (z. B. die
Storybook-Icon-Galerie) vorbehalten.

```js
import { icons } from '@conciso/design-system/icons';
// oder: import iconsJson from '@conciso/design-system/icons.json' assert { type: 'json' };

const shield = icons['ui-shield-check']; // äquivalent zu uiShieldCheck oben, aber nicht tree-shakable
shield.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
shield.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
shield.style  // "outline"
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

### Bereichsneutral (UI)

| Key | Export | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |
|---|---|---|---|---|
| `ui-academic-cap` | `uiAcademicCap` | Doktorhut / Lernen | outline | ep-feature-icon @co |
| `ui-adjustments-horizontal` | `uiAdjustmentsHorizontal` | Regler / Einstellungen | outline (1.25) | ep-card-icon @ki |
| `ui-arrow-down-tray-2` | `uiArrowDownTray2` | Download (Outline-Variante) | outline (1.5) | docs-nav (cta) |
| `ui-arrow-down-tray` | `uiArrowDownTray` | Download | solid | cta-dl-icon @ki |
| `ui-arrow-path` | `uiArrowPath` | Aktualisieren / Kreislauf | outline (1.25) | ep-card-icon @wo |
| `ui-arrow-trending-up` | `uiArrowTrendingUp` | Trend aufwärts | outline (1.25) | ep-card-icon @ki |
| `ui-banknotes` | `uiBanknotes` | Geldscheine | outline | ep-feature-icon @co |
| `ui-bars-3-center-left` | `uiBars3CenterLeft` | Balken, mittlere Zeile kurz und linksbündig (Footer) | outline (1.5) | docs-nav (footer) |
| `ui-bars-3` | `uiBars3` | Balken (Hamburger-Navigation) | outline (1.5) | docs-nav (navigation) |
| `ui-bolt-2` | `uiBolt2` | Blitz (Variante) | outline (1.25) | card-media @es |
| `ui-bolt` | `uiBolt` | Blitz | outline (1.25) | ep-card-icon @co, ep-card-icon @ki |
| `ui-book-open` | `uiBookOpen` | Aufgeschlagenes Buch / Quellen | outline (1.5) | docs-nav (sources) |
| `ui-briefcase-2` | `uiBriefcase2` | Aktenkoffer (Variante) | outline | ep-section |
| `ui-briefcase` | `uiBriefcase` | Aktenkoffer | outline (1.25) | ep-card-icon @co |
| `ui-building-office` | `uiBuildingOffice` | Bürogebäude | outline (1.5) | ep-tl-icon |
| `ui-calendar-days` | `uiCalendarDays` | Kalender (Tage) | outline (1.25) | ep-card-icon @co, col-3, stoerer-icon (Veranstaltung) |
| `ui-calendar` | `uiCalendar` | Kalender | outline (1) | card-meta |
| `ui-caret-down` | `uiCaretDown` | Caret nach unten (Nav-Toggle) | outline | ep-tab-toggle, ep-nav-btn ep-nav-item-toggle, ep-nav-btn ep-nav-item-toggle t-co |
| `ui-chart-bar` | `uiChartBar` | Balkendiagramm | outline | ep-feature-icon @co |
| `ui-chat-bubble-left-right` | `uiChatBubbleLeftRight` | Chat-Blasen (Dialog) | outline (1.5) | ep-feature-icon, ep-feature-icon @ki |
| `ui-chat-bubble-oval-left-ellipsis` | `uiChatBubbleOvalLeftEllipsis` | Chat-Blase oval mit Auslassungspunkten | outline (1.5) | docs-nav (feedback) |
| `ui-chat-bubble-oval` | `uiChatBubbleOval` | Chat-Blase (oval) | outline (1.25) | ep-card-icon @ki |
| `ui-check-badge` | `uiCheckBadge` | Verifiziert-Abzeichen | solid | — |
| `ui-check-circle-2` | `uiCheckCircle2` | Häkchen im Kreis (Variante) | outline (1.5) | — |
| `ui-check-circle` | `uiCheckCircle` | Häkchen im Kreis | outline | — |
| `ui-check` | `uiCheck` | Häkchen (klein) | outline | — |
| `ui-chevron-down` | `uiChevronDown` | Chevron nach unten (FAQ/Akkordeon) | outline (1.25) | ep-faq, ep-faq-a, ep-compare-summary, article-toc-summary |
| `ui-chevron-up-down` | `uiChevronUpDown` | Chevron auf/ab (Dropdown-Toggle) | outline (1.5) | docs-nav (dropdowns) |
| `ui-circle-stack` | `uiCircleStack` | Datenbank / Stapel | outline (1.25) | card-media @es |
| `ui-clock` | `uiClock` | Uhr | outline | ep-feature-icon @co |
| `ui-code-bracket-2` | `uiCodeBracket2` | Code-Klammern (Variante) | outline (1.25) | ep-card-icon @es |
| `ui-code-bracket-square` | `uiCodeBracketSquare` | Code-Klammern im Quadrat | outline (1.5) | docs-nav (code) |
| `ui-code-bracket` | `uiCodeBracket` | Code-Klammern | outline | — |
| `ui-cog-6tooth` | `uiCog6tooth` | Zahnrad (6 Zähne) | outline (1.5) | ep-feature-icon @ki |
| `ui-cog` | `uiCog` | Zahnrad | outline (1.25) | ep-card-icon @ki |
| `ui-computer-desktop` | `uiComputerDesktop` | Desktop-Rechner / Hero | outline (1.5) | docs-nav (hero) |
| `ui-cpu-chip-2` | `uiCpuChip2` | CPU / Chip (Variante) | outline (1.5) | ep-feature-icon |
| `ui-cpu-chip` | `uiCpuChip` | CPU / Chip | outline (1.25) | ep-card-icon @ki |
| `ui-cube-2` | `uiCube2` | Würfel (Variante) | outline (1.5) | ep-feature-icon @ki |
| `ui-cube-transparent` | `uiCubeTransparent` | Würfel transparent / Design Tokens | outline (1.5) | docs-nav (tokens) |
| `ui-cube` | `uiCube` | Würfel / Box | outline (1.25) | ep-card-icon @ki |
| `ui-currency-euro` | `uiCurrencyEuro` | Euro | outline (1.25) | col-3 |
| `ui-cursor-arrow-rays` | `uiCursorArrowRays` | Cursor mit Strahlen / Interaktion | outline (1.5) | docs-nav (buttons) |
| `ui-device-phone-mobile` | `uiDevicePhoneMobile` | Mobilgerät / Responsive | outline (1.5) | docs-nav (responsive) |
| `ui-document-text` | `uiDocumentText` | Dokument mit Text / Wissensbeitrag | outline (1.5) | docs-nav (article) |
| `ui-face-smile` | `uiFaceSmile` | Smiley / Icons | outline (1.5) | docs-nav (icons) |
| `ui-flag` | `uiFlag` | Fahne / Markenrad | outline (1.5) | docs-nav (brand) |
| `ui-folder` | `uiFolder` | Ordner | outline (1.25) | ep-card-icon @co |
| `ui-hand-raised` | `uiHandRaised` | Erhobene Hand | outline (1.25) | ep-card-icon @co |
| `ui-heart` | `uiHeart` | Herz | outline | ep-feature-icon @co |
| `ui-information-circle` | `uiInformationCircle` | Info im Kreis | outline (1.25) | stoerer-icon (Info) |
| `ui-language` | `uiLanguage` | Sprache / Typografie | outline (1.5) | docs-nav (typography) |
| `ui-link` | `uiLink` | Kettenglied / Link | outline (1.5) | ep-feature-icon @ki |
| `ui-list-bullet` | `uiListBullet` | Aufzählungsliste | outline | — |
| `ui-lock-closed-2` | `uiLockClosed2` | Schloss (Variante) | outline (1.25) | ep-card-icon @ki |
| `ui-lock-closed` | `uiLockClosed` | Schloss geschlossen | outline (1.5) | ep-feature-icon |
| `ui-magnifying-glass` | `uiMagnifyingGlass` | Lupe | outline (1.25) | ep-card-icon @ki |
| `ui-map-pin-2` | `uiMapPin2` | Standort-Pin (Variante) | outline (1.25) | col-3 |
| `ui-map-pin` | `uiMapPin` | Standort-Pin | outline (1) | — |
| `ui-megaphone` | `uiMegaphone` | Megafon / Verlautbarung | outline (1.25) | stoerer-icon (Pressemitteilung) |
| `ui-newspaper-2` | `uiNewspaper2` | Zeitung / Artikel (Variante) | outline (1.5) | docs-nav (listing), docs-nav (events) |
| `ui-newspaper` | `uiNewspaper` | Zeitung / Artikel | outline (1.25) | ep-card-icon @co, ep-card-icon @ki, stoerer-icon (Wissensbeitrag) |
| `ui-pause` | `uiPause` | Pause | solid | logo-carousel-pause |
| `ui-pencil-square` | `uiPencilSquare` | Stift im Quadrat / Bearbeiten | outline (1.5) | docs-nav (inputs) |
| `ui-photo` | `uiPhoto` | Foto / Bildsprache | outline (1.5) | docs-nav (imagery) |
| `ui-play` | `uiPlay` | Play | solid | icon-pause |
| `ui-puzzle-piece` | `uiPuzzlePiece` | Puzzleteil | outline (1.5) | ep-tl-icon |
| `ui-quote` | `uiQuote` | Zitatzeichen (Team-Stimme) | solid | team-voice-body @co |
| `ui-rectangle-stack` | `uiRectangleStack` | Rechteck-Stapel / Cards | outline (1.5) | docs-nav (cards) |
| `ui-rocket-launch` | `uiRocketLaunch` | Rakete | outline (1.5) | ep-tl-icon |
| `ui-shield-check-2` | `uiShieldCheck2` | Schild mit Häkchen (Variante) | outline | ep-feature-icon @co |
| `ui-shield-check` | `uiShieldCheck` | Schild mit Häkchen | outline (1.25) | ep-card-icon @co, ep-card-icon @ki, ep-card-icon @es |
| `ui-sparkles-2` | `uiSparkles2` | Funkeln (Variante) | outline (1.5) | ep-feature-icon @ki |
| `ui-sparkles-3` | `uiSparkles3` | Funkeln (Variante) | outline (1.25) | card-media @es |
| `ui-sparkles-4` | `uiSparkles4` | Funkeln (Variante, drei Strahlen) | outline (1.5) | docs-nav (brand) |
| `ui-sparkles` | `uiSparkles` | Funkeln / Sparkles | outline (1.25) | ep-card-icon @ki |
| `ui-square-2-stack` | `uiSquare2Stack` | Quadrate gestapelt / Slider | outline (1.5) | docs-nav (slider) |
| `ui-squares-2x2` | `uiSquares2x2` | Raster 2×2 | outline (1.25) | ep-card-icon @ki, ep-card-icon @es |
| `ui-squares-plus` | `uiSquaresPlus` | Module / Raster+ | outline (1.25) | ep-card-icon @wo |
| `ui-star-2` | `uiStar2` | Stern (Variante) | outline | — |
| `ui-star` | `uiStar` | Stern | outline (1.5) | ep-tl-icon |
| `ui-sun` | `uiSun` | Sonne / Theme-Umschalter | outline (1.5) | docs-nav (theme) |
| `ui-swatch` | `uiSwatch` | Farbfeld / Swatch | outline (1.5) | ep-tl-icon |
| `ui-table-cells` | `uiTableCells` | Tabellenzellen | outline (1.5) | docs-nav (table) |
| `ui-tag` | `uiTag` | Preisschild / Tag | outline (1.5) | docs-nav (chips), docs-nav (leistung-detail) |
| `ui-trophy-2` | `uiTrophy2` | Pokal (Variante) | outline | — |
| `ui-trophy` | `uiTrophy` | Pokal | outline (1.5) | ep-tl-icon |
| `ui-user-group-2` | `uiUserGroup2` | Personengruppe (Variante) | outline | ep-feature-icon @co |
| `ui-user-group` | `uiUserGroup` | Personengruppe (3) | outline (1.25) | ep-card-icon @co, ep-card-icon @wo, col-3 |
| `ui-users-2` | `uiUsers2` | Personen (Variante) | outline | — |
| `ui-users` | `uiUsers` | Personen (2) | outline (1) | — |
| `ui-viewfinder-circle` | `uiViewfinderCircle` | Sucher / Fokus | outline (1.25) | ep-card-icon @co |
| `ui-window` | `uiWindow` | Browserfenster / Beispielseiten | outline (1.5) | docs-nav (examples) |
| `ui-wrench-screwdriver` | `uiWrenchScrewdriver` | Werkzeug (Schlüssel + Schraubendreher) | outline (1.25) | ep-card-icon @co |
