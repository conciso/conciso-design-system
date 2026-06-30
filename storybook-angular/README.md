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

## Versionen

Angular 20 · Storybook 10 (`@storybook/angular`, Webpack-5-Builder).
