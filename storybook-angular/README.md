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

Getestet wird über den **Storybook Test-Runner** (`@storybook/test-runner`,
Jest + Playwright). Jede Story ist ein Smoke-Test (rendert fehlerfrei); die
interaktiven Komponenten (Chip, AreaTabs, FAQ, Slider, Carousel, LogoCarousel,
Topnav) tragen `play`-Funktionen (`storybook/test`), die das Verhalten prüfen
(Klick/Tastatur + Assertions). Das a11y-Addon läuft dabei automatisch mit und
meldet axe-Verstöße (aktuell nicht-blockierend).

```bash
# Storybook muss laufen …
npm run storybook
# … dann in einem zweiten Terminal:
npm run test-storybook
```

### Playwright im Monoceros-Container dauerhaft einrichten

Die npm-Pakete (`@storybook/test-runner`, `playwright`) persistieren bereits über
`package.json` + den Workspace. Dauerhaft eingerichtet werden müssen nur zwei Teile:

**1. System-Libs als feste Image-Bausteine** — auf dem **Host**, einmalig:

```
monoceros add-apt-packages conciso-ds -- libnspr4 libnss3 libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 libcups2 libdbus-1-3 libdrm2 libegl1 libgbm1 libglib2.0-0 libgtk-3-0 libpango-1.0-0 libcairo2 libcairo-gobject2 libasound2 libfontconfig1 libfreetype6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libxshmfence1 fonts-liberation fonts-noto-color-emoji fonts-ipafont-gothic fonts-wqy-zenhei fonts-tlwg-loma-otf xvfb
monoceros apply conciso-ds
```

**2. Browser-Binaries in den Workspace** — einmalig **im Container**:

```bash
npm run playwright:install
```

`playwright:install` und `test-storybook` setzen `PLAYWRIGHT_BROWSERS_PATH=0`, d. h.
Chromium landet in `node_modules/` (Workspace) statt im Home-Cache — und überlebt
damit `monoceros apply`. Nach Schritt 1 + 2 ist Testing nach jedem Rebuild sofort
lauffähig, ohne weitere manuelle Schritte.

a11y-Verstöße zu harten Fehlern machen: pro Story bzw. global
`parameters.a11y = { test: 'error' }` setzen.

## Versionen

Angular 20 · Storybook 10 (`@storybook/angular`, Webpack-5-Builder).
