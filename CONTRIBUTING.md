# Mitwirken am Conciso Design System

Dieses Dokument hält die **Konventionen** fest, nach denen das System gebaut ist. Wer Tokens oder Komponenten ergänzt, folgt ihnen — so bleibt das System konsistent, barrierefrei und wartbar. Viele Regeln haben eine bewusste Begründung (oft Light/Dark-Verhalten oder WCAG); die steht jeweils dabei, damit niemand sie versehentlich „wegoptimiert".

Leitbild (Markenrad): **Gelassenheit** durch *Ruhig · Klar · Energiegeladen*. Farbe und Elevation sind **Akzent und Bedeutung**, nicht Dekor.

---

## 1. Grundprinzipien

- **Tokens statt Hardcodes.** Nie rohe Hex-/px-Werte, wo ein Token existiert. Farben, Abstände, Radien, Typo, Elevation kommen aus `css/tokens.css`.
- **Beide Modi mitdenken.** Jede Änderung in Light **und** Dark prüfen. Leitfrage bei fast jedem Bug dieser Codebasis: *„Flippt der Hintergrund mit dem Theme — und hat das Element eine andere Flächen-Stufe als sein Grund?"*
- **AA ist Pflicht.** Normaltext ≥ 4,5:1, Großtext/UI ≥ 3:1. Disabled & rein dekorative (`aria-hidden`) Elemente ausgenommen.
- **Elevation = Interaktivität.** Schatten ist ein Affordanz-Signal, kein Schmuck (siehe §4).

---

## 2. Namens-Konventionen

**CSS-Klassen**
- Komponenten: `.btn-*`, `.badge-*`, `.card-*`, `.chip*`, `.field`, `.seg*` (Segmented Control), `.bk-*` (Buchungsformular)
- Bereichs-Varianten: `-co` (Corporate) · `-ki` (AI.Applied) · `-es` (Effektive Software) · `-wo` (Wirksame Organisationen).
  Trägt eine Komponente eine Bereichsfläche, braucht sie **alle vier** Varianten, nicht nur die gerade
  benötigte. Sonst fällt ein Bereichsformular still auf den Corporate-Default zurück und trägt zwei
  Brand Areas gleichzeitig. Umsetzung über lokale Variablen wie bei `.btn` (`--c500`) und `.seg`
  (`--seg-fill`/`--seg-on`), nicht über feste Farben in der Basisregel.
- Beispielseiten-Muster: `.ep-*` (z. B. `.ep-card`, `.ep-nav-*`, `.ep-section`)
- Text-/Akzent-Utilities: `.t-co` / `.t-ki` / `.t-es` / `.t-wo`
- Doku-/Site-Meta: `.ds-*`

**Token-Präfixe** (`css/tokens.css`)
- Farbe: `--co-* --ki-* --es-* --wo-* --ro-* --n-*` (Skala `-50 … -900`), semantisch `--c-success/-warning/-error`
- Flächen/Text: `--bg-* --tx-*`
- Typo: `--ty-*` · `--font` / `--font-display`
- Maß: `--s1…--s16` (Spacing) · `--r-*` (Radius) · `--e0…--e5` (Elevation) · `--tonal-*`
- Sonstiges: `--m-*` (Motion) · `--bd` / `--bd-strong` (Border) · `--focus-*` · `--icon-stroke-*`

Neue Tokens folgen demselben Präfix-Schema und gehören in `tokens.css` (Light = Source of Truth), Dark-Abweichungen in `dark-mode.css`.

---

## 3. Farbe & Kontrast

- **Farbiger Text auf Weiß:** Bereichsfarbe `-700` (Co · ES · WO erfüllen AA). **Ausnahme KI:** `-700` reißt AA (4,05:1) → `--ki-800` bzw. `--ki-ink` für Text/Filled-Buttons.
- **Nie `-500` als Textfarbe** auf Weiß (zu hell; nur ES-500/Rosé-500 bestehen AA).
- **Gedämpfter Text:** `--tx-secondary`, **nicht** `--tx-muted` auf farbgetönten oder dunklen Card-Flächen (muted reißt dort AA).
- **`--XX-ink` nur für farbigen Akzenttext** (Eyebrows, Preise, Häkchen, Labels), die im Dark lesbar bleiben müssen (flippt Light `-800` / Dark `-200`). **Nicht** für Elemente, die neutral schwarz/weiß sein sollen → dort `--tx-primary`.
- **Farbiger Text/Icon auf heller `-100`-Kachel** (Chip, Häkchen-Kreis): fest auf `--XX-800`, **nicht** `.t-*`/`ink` — die `-100`-Kachel flippt im Dark nicht, `.t-*`/`ink` kippt auf hell `-200` → hell-auf-hell, unsichtbar.

---

## 4. Elevation = Interaktivität

- **Statische** Cards/Flächen ruhen **flach** mit Rahmen (`--e0` + `--bd`/`--bd-strong`).
- **Interaktive** Elemente (Links, klickbare Cards `.ep-card-link`) tragen Schatten (`--e1`) und heben auf Hover (`--e3`).
- Begründung: Schatten signalisiert „anfassbar". Statische Info-Cards mit Schatten täuschen Interaktivität vor.

---

## 5. Dark Mode

- **Nur zwei Flächen-Stufen:** `--bg-page` (Basis) < `--bg-surface` (gehoben). **Keine dritte Stufe.** Ein Element hebt sich nur ab, wenn sein Grund eine *andere* Stufe hat.
- **Section-Rhythmus:** `.ep-section` ist im Dark pauschal `bg-page`; `n-50`-Sektionen werden auf `bg-surface` gehoben; getönte Hero/CTA-Sektionen behalten ihren Bereichs-`-50`-Tint (co/ki/es/wo).
- **Kartentragende `n-50`-Sektion** → Klasse **`.ep-section-cards`** vergeben: bleibt im Dark auf `bg-page`, damit die `bg-surface`-Cards die hellere Stufe bilden (sonst kollidieren Section & Cards auf demselben Ton).
- **Getönte `-50`-Flächen im Dark** sind gedämpfte, *getönte* Dunkeltöne (nicht near-black), bleiben aber dunkler als `bg-surface`.
- **Trennlinien & Rahmen:** **nie** rohes `var(--XX-100)` oder `var(--n-100)` als Border — immer **`var(--bd)`** (theme-aware: Light `n-100`, Dark `#818C99`). Rohes `-100` ist im Dark entweder eine grelle helle Linie (getönt) oder unsichtbar (neutral).
- **`data-accent` tönt nur den Seiteninhalt**, nicht die Chrome: Footer- und Topnav-`.t-co` werden auf `co` zurückgesetzt (`.ep-page[data-accent] .ep-topnav .t-co` etc.). Die Nav bleibt überall Corporate.
- Dark-Overrides in `dark-mode.css` mit dem Format kommentieren: `/* Dark-only: … ❌ → … ✓. (Light: …) */`. In Kontrast-Tabellen `.a11y-mode`-Pill (`Light`/`Dark`/`Beide Modi`).
- **Kein `*/` im Kommentar-Text** (z. B. `t-*/Badges`) — das schließt CSS-Kommentare vorzeitig und killt die Folgeregel.

---

## 6. Typografie

- **Skala: 16 / 14 / 12 px** für Body/Label (`--ty-body-md/-sm/-xs`, `--ty-label-*`), Title-Sm 20 px, darüber die Serif-Display-Stufen.
- **Minimum 12 px** systemweit. **Keine Freihand-Größen** (kein `font:… 13px`, kein `font-size:13px`) — immer ein `--ty-*`-Token. Ausnahmen nur: Monospace-Code-Blöcke und in die Geometrie eingepasste SVG-Diagramm-Labels (dokumentiert).
- **Deutsche Typografie:** Anführungszeichen „… " (99 unten öffnend, 66 oben schließend; U+201E / U+201C), **nicht** gerade ASCII-Quotes.
- **Keine Gedankenstriche** (— / –) in Copy-Texten → Komma, Doppelpunkt, Punkt oder Klammern. (Begründung: Markenwert „Ruhig" + gerade/strichlose Interpunktion liest sich menschlicher.)
- Hierarchie über **Weight/Case/Color**, nicht über Mini-Schriftgrößen.

---

## 7. Spacing & Layout

- Alle `padding`/`margin`/`gap` aus der Skala `--s1 … --s16`. Ausnahmen nur für Touch-Targets, Hairlines, Icon-Maße, Container-Breiten oder optische Korrekturen — und dann **mit Kommentar**.
- Akzentbilder auf Content-Breite via `.ep-media-band` (nicht full-bleed), nur der Hero ist randlos.

---

## 8. Komponenten-Verhalten

- **Topnav-Dropdowns sind ein Disclosure-Pattern** (in `docs/main.js`: `aria-expanded`, Escape, Pfeiltasten, Außenklick, `closeAllNavItems`). Öffnen per Klick/Tap, Tastatur oder — nur auf `pointer:fine` — per Hover (JS-gesteuert, Intent-Delay + unsichtbare Brücke, WCAG 1.4.13). Der Label-Link navigiert dabei weiterhin direkt zur Übersicht; nur der Caret-Button klappt auf. Regeln, die bleiben: **kein reines CSS-`:hover`-Öffnen** (der Reveal muss an `.is-open` hängen, damit `aria-expanded` mitläuft) und **nie zwei Menüs gleichzeitig offen** (immer `closeAllNavItems` vor dem Öffnen).
- Icon-only Buttons brauchen `aria-label`. Tab-/Panel-Muster mit korrektem ARIA (`role`, `aria-selected`, `aria-controls`).

---

## 9. Do / Don't darstellen

In „Verwendung"-Sektionen die **positive Variante zuerst** (✓ links/oben), die negative danach (✕ rechts/unten) — einheitlich in allen Paaren.

---

## 10. Eine Komponente / ein Token hinzufügen

1. **Token** (falls nötig) in `css/tokens.css` ergänzen (Präfix-Schema, Light-Wert), Dark-Abweichung in `css/dark-mode.css`.
2. **Komponente** als CSS-Klasse in `css/components.css` (Namens-Konvention §2, Tokens statt Hardcodes).
3. **Icon** (falls nötig): normalisiertes SVG als `icons/source/{area|ui}-{name}.svg` ablegen — Farben als `currentColor`, Outline-Icons mit inline `stroke-width`, `width`/`height` weglassen (Größe beim Consumer). Key-Präfix `co|ki|es|wo` für Bereichs-Glyphen, sonst `ui`. Dann `npm run build:icons` → generiert `icons/{icons.json,icons.js,README.md}`. Label/Verwendung optional in `icons/manifest.json` pflegen. Quelle = `icons/source/`, **nicht** die generierten Dateien editieren. Siehe `icons/README.md`.
4. **Dokumentieren:** neue Sektion/Beispiel in `index.html` (Code-Snippet, „Verwendung", Do/Don't).
5. **Prüfen:** Kontrast (AA) in Light **und** Dark; Tastatur-/Screenreader-Pfad bei interaktiven Komponenten.
6. **CHANGELOG.md** ergänzen.

**Verifikation:** Für reine Markup-/CSS-Änderungen genügt visuelle Prüfung in Light+Dark. Bei JS-/Interaktions-/Responsive-Änderungen im Browser testen (z. B. headless via puppeteer-core: Theme setzen, Komponente öffnen, computed styles / Screenshot prüfen). Kontrastwerte mit der WCAG-Formel gegen die konkreten Token-Werte rechnen.

---

## PR-Checkliste

- [ ] Nur Tokens verwendet (keine rohen Hex-/px-Werte ohne Begründung)
- [ ] Border/Trennlinien über `var(--bd)`, nicht rohes `-100`
- [ ] Typo aus der 16/14/12-Skala, keine Freihand-Größen
- [ ] In **Light und Dark** geprüft (Flächen-Stufen, Kontrast)
- [ ] AA erfüllt (Text 4,5:1 / UI 3:1), interaktive Elemente tastaturbedienbar
- [ ] Deutsche Anführungszeichen, keine Gedankenstriche in Copy
- [ ] Doku in `index.html` ergänzt, `CHANGELOG.md` aktualisiert
