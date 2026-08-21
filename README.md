# Conciso Design System

Das Design System von Conciso: **Design Tokens + CSS-Komponenten + Light/Dark-Mode**, framework-agnostisch und auf **WCAG 2.1 AA** ausgelegt. Keine Build-Pflicht für die Nutzung — die Komponenten sind CSS-Klassen, die auf semantisches HTML angewendet werden, plus optionales Vanilla-JS für interaktive Muster (Theme-Toggle, Topnav-Dropdowns).

> **Status:** Inhaltlich stabil. Distribution (npm-Paket), Token-Export und Repo-Hygiene werden gerade ergänzt — siehe [CHANGELOG](CHANGELOG.md).

## Für wen?

- **Entwickler:innen**, die Conciso-Oberflächen bauen (Website, CMS-Templates, künftig Framework-Apps).
- **Designer:innen**, die Komponenten, Tokens und Konventionen nachschlagen.

## Dokumentation ansehen

Die vollständige, navigierbare Doku-Site liegt im Repo:

```bash
# Repo klonen, dann die Doku-Site im Browser öffnen
open docs/index.html        # macOS
# oder einen kleinen Static-Server im Repo-Root starten und /docs/ öffnen:
npx serve .
```

Sie enthält 35 Sektionen in sechs Gruppen: **Marke** (Markenrad, Brand Areas, Logo, Bildsprache), **Grundlagen** (Farben, Typografie, Spacing, Responsive, Elevation, Design Tokens, Icons, Barrierefreiheit), **Komponenten** mit Code-Snippets und Do/Don'ts, **Seitenmuster** (Wissensbeitrag, Veranstaltung, Seminar und die zugehörigen Übersichten), **Beispielseiten** als komplette Seiten und **Referenzen**.

## Nutzung im eigenen Projekt

Ausführlich in [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md). Kurzfassung:

**Variante A — CSS direkt einbinden** (funktioniert heute, kein Build):

```html
<!-- Self-Host-Fonts (DSGVO: keine Google-CDN-Anfrage) -->
<link rel="stylesheet" href="css/fonts.css">

<!-- Design System: REIHENFOLGE EINHALTEN -->
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/dark-mode.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
```

Die Schriften (Montserrat + Libre Baskerville) liegen self-hosted unter `fonts/` und werden über `css/fonts.css` eingebunden — keine externe CDN-Anfrage. Das gebündelte `dist/conciso-ds.css` enthält die `@font-face`-Regeln bereits.

**Variante B — als Git-Abhängigkeit pinnen** (intern, kein Registry):

```bash
# auf einen Release-Tag pinnen:
npm install github:conciso/conciso-design-system#v0.1.0
```
```js
import '@conciso/design-system/dist/conciso-ds.css';
// Tokens (optional, für JS/Framework):
import { tokens } from '@conciso/design-system/tokens';
// Icons (optional, maschinenlesbar — komplette <svg>-Bodies, currentColor):
import { icons } from '@conciso/design-system/icons';
```

> Das Paket ist **intern/proprietär** (`UNLICENSED`, `private`) und wird **nicht** in ein npm-Registry veröffentlicht. Nutzung also entweder über das eingebundene/kopierte CSS (Variante A) oder als gepinnte Git-Abhängigkeit (Variante B). Hinweis: Ein Git-Install zieht das ganze Repo inkl. der Demo-Bilder — bis die ausgelagert sind, ist für reine CSS-Nutzung das Vendoren von `dist/conciso-ds.css` + `fonts/` am schlanksten.

**Dark Mode:** `data-theme="dark"` am `<html>` setzen. Siehe [Getting Started](docs/GETTING-STARTED.md#3-dark-mode) für das Anti-Flash-Snippet.

**Erstes Element:**

```html
<button class="btn btn-filled btn-co">Kontakt</button>
<p style="font:var(--ty-body-md);color:var(--tx-primary)">Fließtext.</p>
```

## Verzeichnisse

| Pfad | Inhalt |
|---|---|
| `css/` | `tokens.css` · `dark-mode.css` · `base.css` · `components.css` (Ladereihenfolge!) — der konsumierbare Kern |
| `dist/` | `conciso-ds.css` (gebündelt, generiert) |
| `tokens/` | `tokens.json` · `tokens.scss` · `tokens.js` (Token-Export, generiert) |
| `icons/` | `icons.json` · `icons.js` · `README.md` (Icon-Export, generiert) + `source/*.svg` (Quelle) |
| `fonts/` | Self-Host-Fonts (woff2) + OFL-Lizenztexte; eingebunden über `css/fonts.css` |
| `scripts/` | `build-tokens.mjs` · `build-icons.mjs` · `bundle-css.mjs` (`npm run build`) · `check-dark-states.mjs` · `check-contrast.mjs` |
| `docs/` | Doku-/Showcase-Site: `index.html` · `main.js` · `assets/images/` · `GETTING-STARTED.md` |

> Der konsumierbare Teil (`css/`, `dist/`, `tokens/`, `icons/`) liegt im Root, die Doku-Site in `docs/`. Das npm-Paket enthält nur den Kern (kein `docs/`, keine Bilder). Icon-Details und Mapping: [`icons/README.md`](icons/README.md).

## Mitwirken / Erweitern

Konventionen und der Workflow zum Hinzufügen von Tokens/Komponenten stehen in **[CONTRIBUTING.md](CONTRIBUTING.md)** — bitte vor Änderungen lesen. Das ist der Kern für eine konsistente, nachhaltige Pflege.

### Prüfungen

```bash
npm run build             # Tokens, Icons, gebündeltes CSS (dist/ ist eingecheckt)
npm run check:dark-states # Zustands-Regeln, die im Dark dunkel-auf-dunkel laufen
npm run check:contrast    # Kontrast der gerenderten Doku in Light UND Dark
```

`check:contrast` rendert `docs/index.html` in beiden Modi in Chromium und prüft Text (4,5:1 bzw. 3:1 bei Großtext), getönte Bauteil-Füllungen und Bedienelement-Grenzen (3:1). Es misst die **fertige Kette** und findet damit auch inline gesetzte Farben, die kein Token-Check sieht. Der Stand ist **0 Verstöße**; jede Abweichung meldet das Skript mit Pfad, Farbe und Sollwert (`--list` zeigt jeden Fund einzeln). Es braucht einen Browser und liegt deshalb am `storybook-angular`-Workspace (`cd storybook-angular && npm ci`); lokal genügt ein installiertes Chrome. In der Pipeline läuft es in `storybook-angular.yml`.

## Versionierung

[SemVer](https://semver.org/lang/de/). Änderungen im [CHANGELOG](CHANGELOG.md). Releases werden als Git-Tags `vX.Y.Z` markiert — Konsument:innen pinnen auf einen Tag (kein Registry-Publish, das Paket ist intern/proprietär).

## Lizenz & Kontakt

Siehe [LICENSE](LICENSE) (intern/proprietär — Conciso). Fragen und Beiträge über GitHub Issues im Repo. Maintainer: _Design-System-Team (bitte eintragen)_.
