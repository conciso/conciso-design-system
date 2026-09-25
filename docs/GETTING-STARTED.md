# Getting Started

So bindest du das Conciso Design System in ein Projekt ein. Es ist **CSS-first und framework-agnostisch** — keine Build-Pflicht, kein Framework nötig. Komponenten sind CSS-Klassen auf semantischem HTML; JS ist optional.

## Inhalt
- [1. Einbinden](#1-einbinden)
- [2. Fonts](#2-fonts)
- [3. Dark Mode](#3-dark-mode)
- [4. JavaScript (optional)](#4-javascript-optional)
- [5. Erste Beispiele](#5-erste-beispiele)
- [6. Tokens nutzen](#6-tokens-nutzen)
- [7. Einheiten & medienübergreifende Nutzung (Web / Print / PowerPoint)](#7-einheiten--medienübergreifende-nutzung-web--print--powerpoint)
- [8. Icons nutzen](#8-icons-nutzen)
- [9. Frameworks](#9-frameworks)

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

**Variante B — als npm-Paket von npmjs.org** (der empfohlene Weg):

```bash
npm install @conciso/design-system
```
```js
// gebündelt, korrekte Reihenfolge bereits enthalten:
import '@conciso/design-system/dist/conciso-ds.css';
```

Keine `.npmrc` nötig — das Paket liegt auf der öffentlichen npm-Registry
([ADR-0011](adr/0011-veroeffentlichung-auf-npmjs.md)). Gilt ab dem ersten echten
Release nach dem Merge dieser Änderung; bis dahin liegt auf npmjs nur eine
Bootstrap-Platzhalterversion (siehe ADR-0011).

> **Alternative — GitHub Packages** (weiterhin verfügbar, unverändert, z. B. für
> Consumer innerhalb der GitHub-Organisation `conciso`): eine `.npmrc`, die den
> `@conciso`-Scope umleitet:
> ```ini
> @conciso:registry=https://npm.pkg.github.com
> //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
> ```
> GitHub Packages verlangt Auth auch für **lesenden** Zugriff: lokal ein Personal
> Access Token mit Scope `read:packages` als `GITHUB_TOKEN` exportieren, in GitHub
> Actions genügt `secrets.GITHUB_TOKEN` mit `permissions: packages: read`. Committe
> niemals den Token selbst — nur die `${GITHUB_TOKEN}`-Referenz gehört ins Repo. Die
> ausführliche Anleitung steht im
> [README der Angular-Lib](../angular-lib/projects/design-system-angular/README.md#installation-aus-github-packages),
> die Entscheidung dahinter in
> [ADR-0004](adr/0004-verteilung-und-versionierung.md).

> Für reine CSS-Nutzung ohne npm ist das Vendoren von `dist/conciso-ds.css` + `fonts/`
> (Variante A) weiterhin der schlankeste Weg.

> **Lizenz:** MIT, siehe [LICENSE](../LICENSE). Ausnahmen (Brand-Assets unter
> `assets/brand/`, Schriften, Icons) siehe [NOTICE](../NOTICE). Das gilt unabhängig von
> der Registry-Wahl oben — GitHub Packages verlangt trotzdem Auth zum Lesen (Begründung
> in [ADR-0004](adr/0004-verteilung-und-versionierung.md)).

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

**Genau zwei Modi.** Das System kennt Light und Dark, keinen dritten Modus, der der Betriebssystem-Präferenz folgt. `prefers-color-scheme` wird im ausgelieferten CSS nicht ausgewertet, Default ist Light. Wer die Systemvorgabe übernehmen will, wertet sie im eigenen Produkt aus und setzt das Attribut selbst:

```js
if (matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', 'dark');
```

**Druck.** `dark-mode.css` steht komplett in `@media screen`, Token-Block und Komponenten-Regeln. Eine Seite mit gesetztem `data-theme="dark"` druckt deshalb die Light-Werte statt der vollen dunklen Fläche. Wer eigene Dark-Overrides ergänzt, legt sie innerhalb dieses Blocks ab, sonst drucken sie dunkel mit.

**Token, die sich anders verhalten als der Rest.** Wer eine Anwendung auf dem System baut, greift für Farbe nach der **Rolle**, nicht nach der Stufe. Die Stufe (`-700`, `-200`) gilt immer nur in einem Modus, die Rolle in beiden:

| Token | Light | Dark | Zweck |
|---|---|---|---|
| `--bg-surface-hover` | `= --bg-surface` | `#2E3B46` | Interaktive Flächen im Hover. Im Dark tragen die Schatten auf der tiefen Basis weniger, die Tiefe kommt dort aus der Fläche. Ein **Zustand**, keine dritte statische Flächen-Stufe. Light bleibt bewusst gleich, dort trägt `--e3`. |
| `--bg-plate` | `#FFFFFF` | `#E8EDED` | Helle Platte unter Fremd-Assets, die nur in dunkler Fassung vorliegen (z. B. Kundenlogos). Bleibt in beiden Modi hell, im Dark aber gedämpft, weil eine reinweiße Fläche dieser Größe auf dunklem Grund blendet. |
| `--co-band` u. a. | `= --XX-50` | eigener, dunklerer Ton | Fläche großer getönter Sektionen (Hero, CTA-Band). Im Dark muss ein Band **dunkler** bleiben als die Karten darauf, eine Badge- oder Kachel-Füllung dagegen **heller** als ihr Grund. Ein Wert kann beides nicht leisten, deshalb zwei Token: kleine Füllungen nutzen weiter `--XX-50`. |
| `--co-ink` u. a. | `-700` (ki `-800`) | `-200` (es `-100`) | **Farbiger Text und farbige Icons.** Das einzige Token, mit dem farbiger Text in beiden Modi trägt. Ein fest gesetztes `-700` hat auf Weiß 5,52:1 und im Dark 3,17:1, ein fest gesetztes `-200` umgekehrt. Es gibt `--co-ink`, `--ki-ink`, `--es-ink`, `--wo-ink`. |
| `--co-fill` u. a. | `= --XX-50` | eigener, gehobener Ton | **Füllung von Pill und Bereichs-Badge.** Light zarter Tint mit kräftiger dunkler Schrift, Dark ein gehobener Ton, weil dort helle Schrift auf dunklem Tint liegt. Für dekorative Flächen (Icon-Kachel) direkt `--XX-50` nehmen, die müssen sich nicht abheben. |
| `--bd-c` / `--bd-strong-c` | `n-100` / `n-300` | `#6F7A89` / `#8694A5` | Zwei **Rollen**, nicht zwei Stärken (beide 1 px): `--bd` ist die Trennlinie **innerhalb** eines Bauteils, `--bd-strong` die **Außenkante** einer Fläche. Eine neue Karte oder ein neuer Kasten nimmt `--bd-strong`. Die `-c`-Varianten halten die reine Farbe, weil `--bd` / `--bd-strong` Shorthands (`1px solid …`) sind und in `border-color` nicht funktionieren. |

## 4. JavaScript (optional)

Reine Darstellung (Buttons, Cards, Typo, Farben, Dark Mode per Attribut) funktioniert **komplett ohne JS**. JS wird nur für interaktive Muster gebraucht:

- **Theme-Toggle** (Umschalt-Button + Persistenz)
- **Topnav-Dropdowns** (Disclosure-Menü: Öffnen per Klick/Tap, Tastatur oder Hover; `aria-expanded`, Escape, Pfeiltasten, Außenklick)
- **Back-to-Top-Button**

Diese Verhalten stehen in `docs/main.js`. Die übrigen Teile dort (Sektions-Tabs, Sidebar, Beispielseiten-Tabs) sind doku-spezifisch und für eigene Projekte nicht nötig. Ein schlankes, wiederverwendbares `behaviors.js` für das npm-Paket ist als Folgeschritt vorgesehen.

> Topnav-Dropdowns öffnen per Klick/Tap, Tastatur und (auf `pointer:fine`) per Hover. Der Reveal hängt immer an `.is-open` (nie an reinem CSS-`:hover`), `aria-expanded` läuft mit, und es ist nie mehr als ein Menü gleichzeitig offen. Der Label-Klick navigiert weiterhin direkt zur Übersicht.

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

Wichtigste Gruppen: Farbskalen `--co/ki/es/wo/n-*` · Flächen `--bg-*` · Text `--tx-*` · Typo `--ty-*` · Spacing `--s1…--s16` · Radius `--r-*` · Elevation `--e0…--e5` · Border `--bd`. Die vollständige Liste steht in [`css/tokens.css`](../css/tokens.css) und in der Doku-Sektion „Design Tokens“.

Für JS/Framework-Projekte gibt es (mit dem npm-Paket) zusätzlich einen **Token-Export** als `tokens.json`, `tokens.scss` und `tokens.js`.

## 7. Einheiten &amp; medienübergreifende Nutzung (Web / Print / PowerPoint)

Das Design System beschreibt **Rollen und Verhältnisse** (Body, Title, Headline, Display), nicht feste Zahlen. Was über Medien hinweg trägt, ist die **Hierarchie**, die **Größenverhältnisse**, **Schriftfamilie**, **Schriftschnitt** und **Farbe**. Die konkrete **Einheit** wählt das jeweilige Medium:

- **Web:** Schriftgrößen sind `rem`-basiert (`1rem = 16px` bei Standard-Root). `rem` respektiert die vom Nutzer im Browser eingestellte Schriftgröße (WCAG 1.4.4 „Resize Text“). Spacing/Radius bleiben in `px`.
- **PowerPoint / Print:** Dort gilt `pt` (feste physische Größe, kein Browser-Resize). `rem` ist hier bedeutungslos, die Web-Umstellung betrifft PowerPoint also nicht.

**Umrechnung** (96 dpi): `pt = px × 0,75`, d. h. `16px = 1rem = 12pt`.

| Rolle | Web (px @ Default) | rem | pt (1:1) | Folie (Empfehlung) |
|---|---|---|---|---|
| Body Sm (Meta) | 14 | 0.875 | 10,5 | 16 bis 18 |
| Body Md (Fließtext) | 16 | 1 | 12 | 18 |
| Title Sm | 20 | 1.25 | 15 | 20 bis 24 |
| Headline Md (Max) | 28 | 1.75 | 21 | 28 bis 32 |
| Display Lg (Max) | 46 | 2.875 | 34,5 | 40+ |

**Wichtig für Folien:** Die 1:1-Umrechnung px→pt ergibt für Folien zu kleine Schrift, weil Folien aus Distanz oder projiziert gelesen werden. Für PowerPoint deshalb die **Verhältnisse** übernehmen und absolut hochskalieren (Spalte „Folie“), nicht die Web-Zahlen 1:1. Schriften: **Montserrat** (Sans, Body/Label) und **Libre Baskerville** (Display/Serif); Schnitte 400 / 500 / 600.

## 8. Icons nutzen

Die DS-Icons liegen als maschinenlesbare Bibliothek vor (mit dem npm-Paket): `icons/icons.json` und `icons/icons.js` enthalten pro Icon den **kompletten `<svg>`-Body**, eine **Stil-Markierung** (`solid`/`outline`) und den `viewBox`. Alle Icons nutzen `currentColor` — die Farbe kommt also aus dem CSS-`color` des Containers (z. B. Bereichsfarbe `var(--ki-800)`, im Dark `--ki-200`).

**Empfohlen: benannter Import.** `icons/icons.js` exportiert jedes Icon zusätzlich einzeln in camelCase (`ki-bot` → `kiBot`). Nur benannte Imports sind tree-shakable — ein Bundler lässt jedes nicht importierte Icon aus dem Bundle, das aggregierte `icons`-Objekt (oder `icons.json`) zieht dagegen immer alle Icons mit rein.

```js
import { kiBot } from '@conciso/design-system/icons';
const { svg } = kiBot;   // komplettes <svg>…</svg>
```

```html
<!-- direkt einhängen und einfärben -->
<span style="color:var(--ki-800);display:inline-flex" data-icon></span>
<script>document.querySelector('[data-icon]').innerHTML = svg;</script>
```

Für Kataloge, Doku-Seiten oder einen dynamischen Lookup per String-Key bleibt das Aggregat praktisch: `import { icons } from '@conciso/design-system/icons'; icons['ki-bot'].svg`.

Die vier **Bereichs-Glyphen** (`ki-bot`, `es-window-check`, `wo-network`, `co-building`) sind `solid`, die generischen UI-Icons `outline` (mit inline `stroke-width`). Vollständiges Key-Mapping inkl. Export-Namen und Verwendungskontext: [`icons/README.md`](../icons/README.md). Neue Icons werden in `icons/source/*.svg` ergänzt und mit `npm run build:icons` exportiert (siehe `CONTRIBUTING.md`).

## 9. Frameworks

Das System ist global einzubinden (das CSS einmal importieren, dann die Klassen in JSX/Templates verwenden):

```jsx
// z. B. einmal im App-Entry:
import '@conciso/design-system/dist/conciso-ds.css';

function CTA() {
  return <button className="btn btn-filled btn-co">Kontakt</button>;
}
```

Tokens lassen sich in JS/Styled-Components/Theme-Objekte über den Token-Export ziehen.

### Angular

Für Angular gibt es eine echte Komponentenbibliothek: **`@conciso/design-system-angular`**,
aus derselben Registry wie oben (gleiche `.npmrc`, beide Pakete im
[Lockstep](../CONTEXT.md#lockstep-versionierung) auf derselben Version):

```bash
npm install @conciso/design-system-angular @conciso/design-system
```
```ts
import { ButtonComponent } from '@conciso/design-system-angular';
```
```html
<cds-button area="co" variant="filled" label="Kontakt" />
```

Die Komponenten sind dünne Hüllen über den CSS-Klassen und liefern **kein eigenes CSS** —
die CSS-Schicht und die Fonts bindet das konsumierende Projekt weiterhin selbst global ein
(bei Angular über `styles`/`assets` in der `angular.json`). Den copy-paste-fertigen
Schnipsel dafür, die vollständige Komponentenliste und die Installationsdetails enthält das
[README der Lib](../angular-lib/projects/design-system-angular/README.md); ein lauffähiges
Konsum-Beispiel liegt unter [`examples/consumer-fixture`](../examples/consumer-fixture).

Für React/Vue existieren bislang keine Wrapper — dort gilt der globale CSS-Weg oben.
