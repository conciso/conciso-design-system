# Getting Started

So bindest du das Conciso Design System in ein Projekt ein. Es ist **CSS-first und framework-agnostisch** — keine Build-Pflicht, kein Framework nötig. Komponenten sind CSS-Klassen auf semantischem HTML; JS ist optional.

## Inhalt
- [1. Einbinden](#1-einbinden)
- [2. Fonts](#2-fonts)
- [3. Dark Mode](#3-dark-mode)
- [4. JavaScript (optional)](#4-javascript-optional)
- [5. Erste Beispiele](#5-erste-beispiele)
- [6. Tokens nutzen](#6-tokens-nutzen)
- [7. Icons nutzen](#7-icons-nutzen)
- [8. Frameworks](#8-frameworks)

---

## 1. Einbinden

Die vier CSS-Dateien **müssen in dieser Reihenfolge** geladen werden — sie bauen aufeinander auf (Tokens definieren Variablen, Dark-Mode überschreibt sie, Base setzt Grundlagen, Components nutzt alles):

```
tokens.css  →  dark-mode.css  →  base.css  →  components.css
```

**Variante A — Dateien direkt einbinden** (funktioniert heute, kein Build):

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/dark-mode.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
```

**Variante B — als gepinnte Git-Abhängigkeit** (intern, kein Registry):

```bash
npm install github:conciso/conciso-design-system#v0.1.0
```
```js
// gebündelt, korrekte Reihenfolge bereits enthalten:
import '@conciso/design-system/dist/conciso-ds.css';
```

> Das Paket ist intern/proprietär (`UNLICENSED`, `private`) und wird nicht in ein npm-Registry veröffentlicht. Für reine CSS-Nutzung ist das Vendoren von `dist/conciso-ds.css` + `fonts/` (Variante A) am schlanksten.

> Die Ladereihenfolge ist die häufigste Fehlerquelle. Wird `components.css` vor `tokens.css` geladen, fehlen die Variablen und nichts wird korrekt gestylt.

## 2. Fonts

Das System nutzt **Montserrat** (Sans) und **Libre Baskerville** (Display/Serif). Beide sind **self-hosted** mit dabei (DSGVO-konform, keine Google-CDN-Anfrage): woff2-Dateien unter `fonts/` (Subsets latin + latin-ext, `font-display:swap`), `@font-face` in `css/fonts.css`.

```html
<link rel="stylesheet" href="css/fonts.css">
```

Wer das gebündelte `dist/conciso-ds.css` einbindet, braucht das nicht separat — die `@font-face`-Regeln sind dort enthalten (die `url('../fonts/...')` lösen relativ zum CSS auf, daher muss der `fonts/`-Ordner neben `dist/`/`css/` liegen; im npm-Paket ist er das automatisch).

Die Token `--font` / `--font-display` haben System-Fallbacks (`Segoe UI` / `Georgia`), das System bleibt also auch ohne geladene Fonts benutzbar. Lizenz: SIL OFL 1.1 (`fonts/*-OFL.txt`).

## 3. Dark Mode

Gesteuert über das Attribut `data-theme="dark"` am `<html>`-Element. Setzen/Entfernen schaltet das gesamte System um (alle Tokens flippen).

```js
document.documentElement.setAttribute('data-theme', 'dark'); // dunkel
document.documentElement.removeAttribute('data-theme');      // hell (Default)
```

**Anti-Flash-Snippet** — als **erstes** Skript im `<head>` (vor dem CSS-Paint), damit beim Reload nicht kurz Light aufblitzt. Liest die gespeicherte Präferenz aus `localStorage`:

```html
<script>
  (function(){
    try {
      var t = localStorage.getItem('ds-theme');
      if (t && t !== 'light') document.documentElement.setAttribute('data-theme', t);
    } catch(e) {}
  })();
</script>
```

Persistenz beim Umschalten: `localStorage.setItem('ds-theme', 'dark' | 'light')`.

## 4. JavaScript (optional)

Reine Darstellung (Buttons, Cards, Typo, Farben, Dark Mode per Attribut) funktioniert **komplett ohne JS**. JS wird nur für interaktive Muster gebraucht:

- **Theme-Toggle** (Umschalt-Button + Persistenz)
- **Topnav-Dropdowns** (klick-basiertes Disclosure-Menü: `aria-expanded`, Escape, Pfeiltasten, Außenklick)
- **Back-to-Top-Button**

Diese Verhalten stehen in `docs/main.js`. Die übrigen Teile dort (Sektions-Tabs, Sidebar, Beispielseiten-Tabs) sind doku-spezifisch und für eigene Projekte nicht nötig. Ein schlankes, wiederverwendbares `behaviors.js` für das npm-Paket ist als Folgeschritt vorgesehen.

> Topnav-Dropdowns sind bewusst **klick-only** (kein Hover-Öffnen) — barrierefrei und ohne „zwei Menüs gleichzeitig offen".

## 5. Erste Beispiele

```html
<!-- Button: Variante (filled) + Brand-Area (co = Corporate) -->
<button class="btn btn-filled btn-co">Kontakt</button>
<button class="btn btn-outlined btn-co">Mehr erfahren</button>

<!-- Fließtext über Token -->
<p style="font:var(--ty-body-md);color:var(--tx-primary)">
  Standard-Fließtext (16 px).
</p>

<!-- Bereichs-Akzentlabel -->
<div class="t-ki" style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em">
  Angewandte KI
</div>
```

Vollständige Komponenten mit Code-Snippets und Do/Don'ts: die **Doku-Site** (`index.html`) im Browser öffnen.

## 6. Tokens nutzen

Im CSS direkt über `var(--token)`:

```css
.meine-card {
  background: var(--bg-surface);
  border: var(--bd);
  border-radius: var(--r-lg);
  padding: var(--s6);
  font: var(--ty-body-md);
  color: var(--tx-primary);
}
```

Wichtigste Gruppen: Farbskalen `--co/ki/es/wo/n-*` · Flächen `--bg-*` · Text `--tx-*` · Typo `--ty-*` · Spacing `--s1…--s16` · Radius `--r-*` · Elevation `--e0…--e5` · Border `--bd`. Die vollständige Liste steht in [`css/tokens.css`](../css/tokens.css) und in der Doku-Sektion „Tokens".

Für JS/Framework-Projekte gibt es (mit dem npm-Paket) zusätzlich einen **Token-Export** als `tokens.json`, `tokens.scss` und `tokens.js`.

## 7. Einheiten &amp; medienübergreifende Nutzung (Web / Print / PowerPoint)

Das Design System beschreibt **Rollen und Verhältnisse** (Body, Title, Headline, Display), nicht feste Zahlen. Was über Medien hinweg trägt, ist die **Hierarchie**, die **Größenverhältnisse**, **Schriftfamilie**, **Schriftschnitt** und **Farbe**. Die konkrete **Einheit** wählt das jeweilige Medium:

- **Web:** Schriftgrößen sind `rem`-basiert (`1rem = 16px` bei Standard-Root). `rem` respektiert die vom Nutzer im Browser eingestellte Schriftgröße (WCAG 1.4.4 „Resize Text"). Spacing/Radius bleiben in `px`.
- **PowerPoint / Print:** Dort gilt `pt` (feste physische Größe, kein Browser-Resize). `rem` ist hier bedeutungslos, die Web-Umstellung betrifft PowerPoint also nicht.

**Umrechnung** (96 dpi): `pt = px × 0,75`, d. h. `16px = 1rem = 12pt`.

| Rolle | Web (px @ Default) | rem | pt (1:1) | Folie (Empfehlung) |
|---|---|---|---|---|
| Body Sm (Meta) | 14 | 0.875 | 10,5 | 16 bis 18 |
| Body Md (Fließtext) | 16 | 1 | 12 | 18 |
| Title Sm | 20 | 1.25 | 15 | 20 bis 24 |
| Headline Md (Max) | 28 | 1.75 | 21 | 28 bis 32 |
| Display Lg (Max) | 46 | 2.875 | 34,5 | 40+ |

**Wichtig für Folien:** Die 1:1-Umrechnung px→pt ergibt für Folien zu kleine Schrift, weil Folien aus Distanz oder projiziert gelesen werden. Für PowerPoint deshalb die **Verhältnisse** übernehmen und absolut hochskalieren (Spalte „Folie"), nicht die Web-Zahlen 1:1. Schriften: **Montserrat** (Sans, Body/Label) und **Libre Baskerville** (Display/Serif); Schnitte 400 / 500 / 600.

## 8. Icons nutzen

Die DS-Icons liegen als maschinenlesbare Bibliothek vor (mit dem npm-Paket): `icons/icons.json` und `icons/icons.js` enthalten pro Icon den **kompletten `<svg>`-Body**, eine **Stil-Markierung** (`solid`/`outline`) und den `viewBox`. Alle Icons nutzen `currentColor` — die Farbe kommt also aus dem CSS-`color` des Containers (z. B. Bereichsfarbe `var(--ki-800)`, im Dark `--ki-200`).

```js
import { icons } from '@conciso/design-system/icons';
const { svg } = icons['ki-bot'];   // komplettes <svg>…</svg>
```

```html
<!-- direkt einhängen und einfärben -->
<span style="color:var(--ki-800);display:inline-flex" data-icon></span>
<script>document.querySelector('[data-icon]').innerHTML = icons['ki-bot'].svg;</script>
```

Die vier **Bereichs-Glyphen** (`ki-bot`, `es-window-check`, `wo-network`, `co-building`) sind `solid`, die generischen UI-Icons `outline` (mit inline `stroke-width`). Vollständiges Key-Mapping inkl. Verwendungskontext: [`icons/README.md`](../icons/README.md). Neue Icons werden in `icons/source/*.svg` ergänzt und mit `npm run build:icons` exportiert (siehe `CONTRIBUTING.md`).

## 9. Frameworks

Das System ist global einzubinden (das CSS einmal importieren, dann die Klassen in JSX/Templates verwenden):

```jsx
// z. B. einmal im App-Entry:
import '@conciso/design-system/dist/conciso-ds.css';

function CTA() {
  return <button className="btn btn-filled btn-co">Kontakt</button>;
}
```

Tokens lassen sich in JS/Styled-Components/Theme-Objekte über den Token-Export ziehen. Für eine echte Framework-**Komponentenbibliothek** (React/Vue-Wrapper) ist Storybook als Heimat vorgesehen — das kommt erst, wenn solche Wrapper gebaut werden (siehe `CONTRIBUTING.md`).
