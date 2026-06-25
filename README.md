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

Sie enthält 32 Sektionen: Foundations (Marke, Farben, Typografie, Spacing, Elevation, Tokens), alle Komponenten mit Code-Snippets und Do/Don'ts, eine Barrierefreiheits-/Kontrast-Sektion sowie komplette Beispielseiten.

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

**Variante B — als Paket** (sobald veröffentlicht):

```bash
npm install @conciso/design-system
```
```js
import '@conciso/design-system/dist/conciso-ds.css';
// Tokens (optional, für JS/Framework):
import { tokens } from '@conciso/design-system/tokens';
```

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
| `fonts/` | Self-Host-Fonts (woff2) + OFL-Lizenztexte; eingebunden über `css/fonts.css` |
| `scripts/` | `build-tokens.mjs` · `bundle-css.mjs` (`npm run build`) |
| `docs/` | Doku-/Showcase-Site: `index.html` · `main.js` · `assets/images/` · `GETTING-STARTED.md` |

> Der konsumierbare Teil (`css/`, `dist/`, `tokens/`) liegt im Root, die Doku-Site in `docs/`. Das npm-Paket enthält nur den Kern (kein `docs/`, keine Bilder).

## Mitwirken / Erweitern

Konventionen und der Workflow zum Hinzufügen von Tokens/Komponenten stehen in **[CONTRIBUTING.md](CONTRIBUTING.md)** — bitte vor Änderungen lesen. Das ist der Kern für eine konsistente, nachhaltige Pflege.

## Versionierung

[SemVer](https://semver.org/lang/de/). Änderungen im [CHANGELOG](CHANGELOG.md). Releases werden als Git-Tags `vX.Y.Z` markiert.

## Lizenz & Kontakt

Siehe [LICENSE](LICENSE) (intern/proprietär — Conciso). Fragen und Beiträge über GitHub Issues im Repo. Maintainer: _Design-System-Team (bitte eintragen)_.
