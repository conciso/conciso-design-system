# Getting Started

So bindest du das Conciso Design System in ein Projekt ein. Es ist **CSS-first und framework-agnostisch** — keine Build-Pflicht, kein Framework nötig. Komponenten sind CSS-Klassen auf semantischem HTML; JS ist optional.

## Inhalt
- [1. Einbinden](#1-einbinden)
- [2. Fonts](#2-fonts)
- [3. Dark Mode](#3-dark-mode)
- [4. JavaScript (optional)](#4-javascript-optional)
- [5. Erste Beispiele](#5-erste-beispiele)
- [6. Tokens nutzen](#6-tokens-nutzen)
- [7. Frameworks](#7-frameworks)

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

**Variante B — als npm-Paket** (sobald veröffentlicht):

```bash
npm install @conciso/design-system
```
```js
// gebündelt, korrekte Reihenfolge bereits enthalten:
import '@conciso/design-system/dist/conciso-ds.css';
```

> Die Ladereihenfolge ist die häufigste Fehlerquelle. Wird `components.css` vor `tokens.css` geladen, fehlen die Variablen und nichts wird korrekt gestylt.

## 2. Fonts

Das System nutzt **Montserrat** (Sans) und **Libre Baskerville** (Display/Serif). Zwei Wege:

**Online (Google Fonts):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

**Self-Host (empfohlen für DSGVO/Offline):** die beiden Familien lokal ablegen und per `@font-face` einbinden; die Token `--font` / `--font-display` haben System-Fallbacks (`Segoe UI`/`Georgia`), das System bleibt also auch ohne Fonts benutzbar.

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

Diese Verhalten stehen in `js/main.js`. Die übrigen Teile dort (Sektions-Tabs, Sidebar, Beispielseiten-Tabs) sind doku-spezifisch und für eigene Projekte nicht nötig. Ein schlankes, wiederverwendbares `behaviors.js` ist Teil der npm-Paketierung.

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

## 7. Frameworks

Das System ist global einzubinden (das CSS einmal importieren, dann die Klassen in JSX/Templates verwenden):

```jsx
// z. B. einmal im App-Entry:
import '@conciso/design-system/dist/conciso-ds.css';

function CTA() {
  return <button className="btn btn-filled btn-co">Kontakt</button>;
}
```

Tokens lassen sich in JS/Styled-Components/Theme-Objekte über den Token-Export ziehen. Für eine echte Framework-**Komponentenbibliothek** (React/Vue-Wrapper) ist Storybook als Heimat vorgesehen — das kommt erst, wenn solche Wrapper gebaut werden (siehe `CONTRIBUTING.md`).
