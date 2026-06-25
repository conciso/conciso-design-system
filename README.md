# Conciso Design System

Das Design System von Conciso: **Design Tokens + CSS-Komponenten + Light/Dark-Mode**, framework-agnostisch und auf **WCAG 2.1 AA** ausgelegt. Keine Build-Pflicht für die Nutzung — die Komponenten sind CSS-Klassen, die auf semantisches HTML angewendet werden, plus optionales Vanilla-JS für interaktive Muster (Theme-Toggle, Topnav-Dropdowns).

> **Status:** Inhaltlich stabil. Distribution (npm-Paket), Token-Export und Repo-Hygiene werden gerade ergänzt — siehe [CHANGELOG](CHANGELOG.md).

## Für wen?

- **Entwickler:innen**, die Conciso-Oberflächen bauen (Website, CMS-Templates, künftig Framework-Apps).
- **Designer:innen**, die Komponenten, Tokens und Konventionen nachschlagen.

## Dokumentation ansehen

Die vollständige, navigierbare Doku-Site liegt im Repo:

```bash
# Repo klonen, dann index.html im Browser öffnen
open index.html        # macOS
# oder einen kleinen Static-Server nutzen:
npx serve .
```

Sie enthält 32 Sektionen: Foundations (Marke, Farben, Typografie, Spacing, Elevation, Tokens), alle Komponenten mit Code-Snippets und Do/Don'ts, eine Barrierefreiheits-/Kontrast-Sektion sowie komplette Beispielseiten.

## Nutzung im eigenen Projekt

Ausführlich in [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md). Kurzfassung:

**Variante A — CSS direkt einbinden** (funktioniert heute, kein Build):

```html
<!-- Fonts (online) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">

<!-- Design System: REIHENFOLGE EINHALTEN -->
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/dark-mode.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
```

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
| `css/` | `tokens.css` · `dark-mode.css` · `base.css` · `components.css` (Ladereihenfolge!) |
| `js/main.js` | Interaktion (Theme, Nav, Tabs) — für die Doku-Site; wiederverwendbare Teile siehe Getting Started |
| `index.html` | Die Doku-/Showcase-Site |
| `images/` | Demo-Assets der Beispielseiten |

## Mitwirken / Erweitern

Konventionen und der Workflow zum Hinzufügen von Tokens/Komponenten stehen in **[CONTRIBUTING.md](CONTRIBUTING.md)** — bitte vor Änderungen lesen. Das ist der Kern für eine konsistente, nachhaltige Pflege.

## Versionierung

[SemVer](https://semver.org/lang/de/). Änderungen im [CHANGELOG](CHANGELOG.md). Releases werden als Git-Tags `vX.Y.Z` markiert.

## Lizenz & Kontakt

Siehe [LICENSE](LICENSE) (intern/proprietär — Conciso). Fragen und Beiträge über GitHub Issues im Repo. Maintainer: _Design-System-Team (bitte eintragen)_.
