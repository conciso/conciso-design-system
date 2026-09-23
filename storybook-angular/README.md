# Conciso Design System — Angular & Storybook

Der **Angular-Teil** des Conciso Design Systems, bewusst getrennt vom portablen
CSS-Kern. Dieser Ordner enthält dünne Angular-Komponenten-Wrapper und ihre
Storybook-Stories. Sie **konsumieren und dokumentieren** ausschließlich die
bestehenden CSS-Klassen und Tokens — es werden keine eigenen Styles definiert.

## Schichtentrennung

| Schicht | Ort | Eigenschaft |
| --- | --- | --- |
| **CSS & Tokens** (Quelle der Wahrheit) | Repo-Root: `../css`, `../tokens`, `../dist`, `../fonts`, `../icons` | Framework-unabhängig, ohne Build nutzbar. Wächst unabhängig von diesem Ordner. |
| **Angular & Storybook** | dieser Ordner `storybook-angular/` | Eigenes `package.json`/`node_modules`. Hängt nur lesend an der CSS-Schicht. |

Die CSS-Dateien werden **unverändert** über Storybooks `staticDirs` aus dem
Repo-Root serviert (`/conciso/css/…`) und per `<link>` in
`.storybook/preview-head.html` in der dokumentierten Reihenfolge eingebunden
(fonts → tokens → dark-mode → base → components). So bleibt die CSS-Ebene
weiterhin ohne Angular nutzbar.

## Komponenten

Jede Komponente ist ein schmaler Wrapper, der nur die passende Klassen­kombination
der CSS-Schicht erzeugt:

| Angular-Selector | CSS-Basis (in `../css/components.css`) |
| --- | --- |
| `<cds-button>` | `.btn` + Varianten/Bereiche |
| `<cds-badge>` | `.badge` (Status-Ton oder `[data-area]`) |
| `<cds-chip>` | `.chip` (aria-pressed Toggle **oder** statischer `t-*`-Tag) |
| `<cds-card>` | `.card` / `.card-elevated` (Bereichs-Glyphe aus `../icons`) |
| `<cds-stat-card>` | `.card-stat` |
| `<cds-stat-strip>` | `.card-stat-strip` + `.card-stat-flat` |
| `<cds-testimonial>` | `.testimonial` |
| `<cds-team-voice>` | `.team-voice` (editoriale Zitat-Reihe mit Foto) |
| `<cds-field>` | `.field` (input/select/textarea, A11y-verdrahtet) |
| `<cds-blockquote>` | `.bq` (bereichsgefärbtes Zitat) |
| `<cds-area-tabs>` | `.area-tabs` / `.atab` (interaktive Tab-Leiste) |
| `<cds-faq>` | `.ep-faq` (natives `details`/`summary`) |
| `<cds-snackbar>` | `.snack` (Statusmeldung, Töne def/ok/err) |
| `<cds-slider>` | `.field-slider` / `.slider` (Range mit Live-Ausgabe) |
| `<cds-download-cta>` | `.cta-dl` (Download-Block) |
| `<cds-code-block>` | `.cb-wrap` (Code/Terminal, Kopier-Button) |
| `<cds-footer>` | `.footer` (Zwei-Band-Footer) |
| `<cds-carousel>` | `.img-slider` (Bild-Crossfade, Prev/Next/Dots, Hero) |
| `<cds-logo-carousel>` | `.logo-carousel` (Autoplay-Crossfade, pausierbar) |
| `<cds-topnav>` | `.ep-topnav` (Nav + Submenüs + Suche + Theme-Toggle) |
| `<cds-brand-wheel>` | `.bw-wrap` / `.bw-svg` (Marken-Illustration) |

Die **Foundations**-Stories rendern Farben und Typografie live aus den
`--*`-Tokens (`../css/tokens.css`). Der **Theme**-Schalter in der Toolbar setzt
`data-theme="dark"` am `<html>` und aktiviert damit `../css/dark-mode.css`.

## Tests

Primärer lokaler Weg ist **`npm run test:vitest`** (`@storybook/addon-vitest`,
Browser-Mode via Playwright/Chromium): führt jede Story als Vitest-Test aus
(Smoke-Render + `play`-Funktionen), inklusive derselben a11y-Prüfung wie im
Storybook-UI (`vitest.setup.ts` wendet die Preview-Annotationen aus
`preview.ts` an, siehe Kommentar dort). Kein laufender Dev-Server nötig.

```bash
npm run test:vitest
```

Jede Story ist damit ein Smoke-Test (rendert fehlerfrei); die interaktiven
Komponenten (Chip, AreaTabs, FAQ, Slider, Carousel, LogoCarousel, Topnav)
tragen `play`-Funktionen (`storybook/test`), die das Verhalten prüfen
(Klick/Tastatur + Assertions). Das a11y-Addon läuft dabei automatisch mit;
axe-Verstöße lassen den Lauf fehlschlagen (siehe „a11y ist global scharf
geschaltet“ weiter unten). `npm run test:vitest` ist außerdem die einzige
Testschiene — ein früherer, redundanter zweiter Lauf über den Storybook
Test-Runner (Jest) ist entfallen (siehe
[ADR-0005](../docs/adr/0005-testebene-der-angular-lib.md)).

**Visual-Regression** läuft in derselben Schiene, aber nur mit `VISUAL=1`
(siehe `.storybook/vitest.setup.ts`): dann macht ein `afterEach`-Hook je Story
einen Screenshot (`expect(document.body).toMatchScreenshot(...)`) und
vergleicht ihn gegen `visual-snapshots/<story-id>.png`. Lokal ist das
Rendering nicht pixelgleich zum gepinnten CI-Image — der scharfe Vergleich
läuft in `.github/workflows/visual.yml`. Einzelne Stories mit nicht
einfrierbaren, zeitgesteuerten Zuständen (z. B. Autoplay-Carousels) nehmen
sich mit `parameters: { snapshot: { skip: true } }` heraus.

```bash
VISUAL=1 npm run test:vitest
```

### Playwright im Monoceros-Container dauerhaft einrichten

Das npm-Paket `playwright` persistiert bereits über `package.json` + den
Workspace. Dauerhaft eingerichtet werden müssen nur zwei Teile:

**1. System-Libs als feste Image-Bausteine** — auf dem **Host**, einmalig:

```
monoceros add-apt-packages conciso-ds -- libnspr4 libnss3 libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 libcups2 libdbus-1-3 libdrm2 libegl1 libgbm1 libglib2.0-0 libgtk-3-0 libpango-1.0-0 libcairo2 libcairo-gobject2 libasound2 libfontconfig1 libfreetype6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libxshmfence1 fonts-liberation fonts-noto-color-emoji fonts-ipafont-gothic fonts-wqy-zenhei fonts-tlwg-loma-otf xvfb
monoceros apply conciso-ds
```

**2. Browser-Binaries in den Workspace** — einmalig **im Container**:

```bash
npm run playwright:install
```

`playwright:install` und `test:vitest` setzen `PLAYWRIGHT_BROWSERS_PATH=0` (über
`cross-env`, damit das auch unter Windows funktioniert), d. h.
Chromium landet in `node_modules/` (Workspace) statt im Home-Cache — und überlebt
damit `monoceros apply`. Nach Schritt 1 + 2 ist Testing nach jedem Rebuild sofort
lauffähig, ohne weitere manuelle Schritte.

a11y ist **global scharf** geschaltet (`parameters.a11y = { test: 'error' }` in
`.storybook/preview.ts`) — axe-Verstöße lassen den Lauf fehlschlagen.
Einzelne Stories mit bekannten, im **CSS-Kern** liegenden Befunden setzen lokal
`a11y: { test: 'todo' }`: im Panel weiter sichtbar, aber nicht blockierend.

### Frühere a11y-Befunde im CSS-Kern (behoben)

Diese drei `color-contrast`-Verstöße lagen in `css/components.css` und sind dort
inzwischen behoben. Wer eine Story noch auf `a11y: { test: 'todo' }` findet, kann
sie wieder scharf schalten:

| Story | Element | Vorher | Jetzt |
|---|---|---|---|
| DownloadCta | `.cta-dl-eyebrow` (Bereich `co`) | 3,28:1 mit `--co-600` | `--co-700`, 5,52:1 auf Weiß, damit konsistent zu ki-800/es-700/wo-700 |
| CodeBlock | `.cb-copy` | 3,31:1 mit `--n-400` | `--n-500`, gegen den tatsächlichen Grund gemessen 5,32:1 im Light (auf `--n-100`) und 8,01:1 im Dark |
| Slider | `.field-slider-output.slider-{co,ki,wo}` | ~2 bis 3:1, weil Thumb-Farbe und Textfarbe dasselbe Token waren | eigenes `--sl-text` für die Wert-Anzeige (co-700 5,5:1 · ki-800 8,0:1 · es-700 9,6:1 · wo-700 7,8:1); `--sl-color` färbt nur noch den Thumb, der als grafisches Element 3:1 braucht |

Maßgeblich für den Kern ist `npm run check:contrast` im Repo-Root: es rendert die
Doku-Site in beiden Modi und meldet aktuell 0 Verstöße. Der Anspruch dahinter
steht in `CONTRIBUTING.md` §1.

Rein in den Angular-Wrappern behobene a11y-Punkte (kein CSS-Kern nötig): `role`-
Input → `roleLabel` umbenannt (kein ungültiges ARIA-`role` mehr auf Blockquote/
Testimonial/TeamVoice), LogoCarousel-Dots als `tablist`/`tab` (gültiges
`aria-selected`), AreaTabs-Aktivfarbe für `ki` auf `--ki-800` (AA).

## MCP-Anbindung für Agenten

Storybook läuft mit `@storybook/addon-mcp`. Bei laufendem `npm run storybook`
antwortet der Dev-Server unter `http://localhost:6006/mcp` auf JSON-RPC. Anbinden
z. B. mit der Claude-Code-CLI:

```bash
claude mcp add --transport http conciso-ds-storybook http://localhost:6006/mcp
```

Verfügbare Tools: `stories-preview`, `stories-changed`, `stories-find-by-component`,
`test-run`, `docs-list`, `docs-show`, `docs-show-story`, `review-create`,
`get-storybook-story-instructions`.

`npm run build-storybook` schreibt zusätzlich
`storybook-static/manifests/components.json` — Quelle ist derselbe TS-Docgen
(`meta.docgen: "angular-component-meta"`), der auch Controls und Docs-Seiten
speist. CI prüft nach dem Build, dass dieses Manifest existiert und die
erwartete `meta.docgen`-Kennung trägt (Schritt „Komponenten-Manifest vorhanden“
in `.github/workflows/storybook-angular.yml`).

### Props-Tabellen = Inputs + Outputs

Der Docgen-Server dokumentiert grundsätzlich jedes öffentliche Member einer
Komponentenklasse. Template-Getter, ControlValueAccessor-Methoden und
Event-Handler in der Angular-Lib tragen deshalb JSDoc `@internal` und bleiben
so aus Props-Tabelle **und** MCP-Manifest heraus. Regel für neue Komponenten:
alles, was nicht Input oder Output ist, bekommt `@internal`. Beschreibungen in
der Props-Tabelle kommen aus dem JSDoc der Lib; Story-`argTypes` überschreiben
nur, wo sie bewusst gesetzt sind. Details und die verworfenen Alternativen
(`propsTable: 'inputs'`, ein globaler `argTypesEnhancer`) stehen in
[`docs/adr/0006-storybook-10-6-docgen-server-mcp-und-theming.md`](../docs/adr/0006-storybook-10-6-docgen-server-mcp-und-theming.md).

## Storybook-Oberfläche im Conciso-Look

Sidebar, Toolbar und Addon-Panels (der „Manager“) sowie die Docs-Seiten-Chrome
tragen das Conciso-Farbschema statt des Storybook-Defaults:

- `.storybook/theme.ts` definiert zwei `create()`-Themes (Light/Dark) mit
  Werten aus `css/tokens.css` bzw. `css/dark-mode.css` (Token-Name im
  Kommentar je Zeile).
- `.storybook/manager.ts` wählt beim Laden nach `prefers-color-scheme`
  zwischen beiden — **nicht** nach dem Toolbar-Theme-Schalter der Preview.
  Der Toolbar-Schalter (Hell/Dunkel/System) steuert ausschließlich die
  Preview (`data-theme` am `<html>` des Story-Frames) und bleibt damit
  bidirektional synchron mit den Theme-Switcher-Komponenten der Lib; das
  Manager-Chrome ist kein Teil des Design Systems und folgt daher nur dem
  Betriebssystem.
- `.storybook/manager-head.html` bindet Montserrat (`fonts.css`,
  self-hosted) ins Manager-Bundle ein — der Manager läuft als eigenes
  React-Bundle und sieht `preview-head.html` nicht.
- `parameters.docs.theme` in `.storybook/preview.ts` setzt das Light-Theme
  fest für die Docs-Seiten-Chrome (Überschriften, Tabellen, Code-Blöcke).

## Versionen

Angular 22 · TypeScript 6.0 · Storybook 10.6 (`@storybook/angular-vite`, Vite-Builder,
In-Process-Docgen ohne Compodoc).
