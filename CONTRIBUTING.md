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
- **Entscheidend ist die Fläche, nicht der Inhalt.** Eine Karte mit Buttons oder Text-Links im Footer ist **statisch**: die Buttons sind die Interaktion, die Fläche führt nirgendwohin. Sie ruht flach. Schatten bekommt sie erst, wenn sie selbst der klickbare Bereich ist, also `<a class="card card-elevated">` oder `<a class="ep-card ep-card-link">`.
- **Der Riegel steht im CSS:** `.card-elevated` ist auf `a.card-elevated` gescoped, eine `<article>`/`<div>`-Karte kann den Schatten also auch mit gesetzter Klasse nicht bekommen. Wer eine statische Fläche erhöhen will, findet keinen Weg dorthin, und das ist beabsichtigt. Gleiches gilt für Inline-`box-shadow` auf statischen Blöcken: nicht setzen, auch nicht mit Token.

---

## 5. Dark Mode

- **Nur zwei Flächen-Stufen:** `--bg-page` (Basis) < `--bg-surface` (gehoben). **Keine dritte Stufe.** Ein Element hebt sich nur ab, wenn sein Grund eine *andere* Stufe hat.
- **Section-Rhythmus:** `.ep-section` ist im Dark pauschal `bg-page`; `n-50`-Sektionen werden auf `bg-surface` gehoben; getönte Hero/CTA-Sektionen behalten ihren Bereichs-`-50`-Tint (co/ki/es/wo).
- **Kartentragende `n-50`-Sektion** → Klasse **`.ep-section-cards`** vergeben: bleibt im Dark auf `bg-page`, damit die `bg-surface`-Cards die hellere Stufe bilden (sonst kollidieren Section & Cards auf demselben Ton).
- **Getönte Flächen im Dark: zwei Token, zwei Aufgaben.** `--XX-50` ist die **kleine Füllung** (Badge, Pill, Icon-Kachel) und liegt bei 9,8:1, also 1,78:1 über der Seite und 1,32:1 über Karten. `--XX-band` ist die **große Sektionsfläche** (Hero, CTA-Band) und liegt bei 16,5:1, knapp über der Seite (1,06:1, dort trennt der Farbton) und weiterhin dunkler als die Karten darauf (1,27:1). Im Light sind beide identisch. Grund für die Trennung: ein Band muss *dunkler* als seine Karten bleiben, eine Füllung *heller* als ihr Grund, und bei `bg-page` auf 17,5:1 reicht der Spielraum nicht für beides. Neue getönte Flächen also nach Größe entscheiden, nicht nach Bereich. Sättigung **unter 0,70** halten (aktuell 0,60), sonst „vibriert" die Fläche auf dunklem Grund.
- **Bereichsfarbe über die Klasse setzen, nie inline.** `.btn-filled` ohne `.btn-co`/`-ki`/`-es`/`-wo`, dafür mit einem inline gesetzten `--c500`, sieht im Light korrekt aus und bricht im Dark: die Dark-Regel für die **Fläche** hängt an der Bereichsklasse, die für die **Textfarbe** an `.btn-filled`. Ohne Klasse greift nur die zweite, und dunkler Text landet auf dunkler Fläche (gemessen 3,51:1). `npm run check:dark-states` kann das nicht sehen, weil der Bruch nicht in einer Regel steht, sondern im Markup entsteht.
- **Eine Füllung, die keine Fläche mehr bildet, ist ein Fehler.** Badge, Pill und Chip werden als Bauteil erkannt, weil ihre Fläche sich vom Grund abhebt. Faustwert: mindestens **1,3:1** gegen jeden Grund, auf dem sie vorkommen können (Seite *und* Karte). Darunter liest das Element nur noch als farbiger Text. Gegenprobe immer auf beiden Gründen rechnen, nicht nur auf einem.
- **Die Basisfläche ist auf mindestens 15,8:1 gegen Weiß auszulegen.** Das ist die Material-Schwelle und zugleich der Puffer, der Fließtext auch auf der höchsten Elevationsstufe noch 4,5:1 sichert. Wer `--bg-page` im Dark anfasst, rechnet diesen Wert nach. **Nie eine Textfarbe als Fläche einsetzen:** Textfarben sind auf Lesbarkeit gegen Weiß optimiert und liegen dafür systematisch zu hoch.
- **Schwebende Panels (Menüs, Popover) tragen im Dark einen `--bd-strong-c`-Rand.** Im Light grenzt `--e3` sie vom Inhalt darunter ab; auf der tiefen Basisfläche leistet ein schwarzer Schatten das nicht mehr. Gemessen stand ein Topnav-Menü über einem Hero-Foto nur 1,34:1 gegen die hellste Stelle daneben. Der Rand ist unabhängig davon lesbar, was zufällig hinter dem Panel liegt. Für reine Farbwerte gibt es `--bd-c` / `--bd-strong-c`; `--bd` und `--bd-strong` sind Shorthands und funktionieren in `border-color` nicht.
- **Tiefe kommt im Dark primär aus der Fläche, nicht aus dem Schatten.** Auf 17,5:1 tragen die schwarzen `--e*`-Schatten wenig. Interaktive Flächen heben deshalb zusätzlich auf `--bg-surface-hover`. Das ist ein **Zustand**, keine dritte statische Stufe.
- **`dark-mode.css` steht komplett in `@media screen`**, Token-Block und Komponenten-Regeln. Im Druck greifen dadurch die Light-Werte aus `tokens.css`, ohne dass sie ein zweites Mal gepflegt werden müssen. Die Komponenten-Regeln müssen mit hinein: 183 von ihnen setzen eine helle Tint- oder Festfarbe (`co-200`, `ki-200`, `es-100`, heller `tx-primary`), die auf dem hellen Druckgrund 1,2 bis 1,9:1 trägt. Neue Dark-Regeln und neue Dark-Tokens gehören **innerhalb** des Blocks, sonst drucken sie dunkel mit.
- **Trennlinien & Rahmen:** **nie** rohes `var(--XX-100)` oder `var(--n-100)` als Border — immer **`var(--bd)`** (theme-aware: Light `n-100`, Dark `#6F7A89`). Rohes `-100` ist im Dark entweder eine grelle helle Linie (getönt) oder unsichtbar (neutral, gemessen 1,18:1 gegen eine Karte statt 2,99:1). Der neutrale Fall ist der tückischere: im Light löst `--bd` genau auf `--n-100` auf, der Rahmen sieht dort also korrekt aus und die Abweichung fällt erst im Dark auf. Wer nur die Farbe braucht, nimmt `--bd-c` / `--bd-strong-c`.
- **`data-accent` tönt nur den Inhalt**, nicht die Chrome: Footer- und Topnav-`.t-co` werden auf `co` zurückgesetzt (`[data-accent] .ep-topnav .t-co` etc.). Die Nav bleibt überall Corporate.
- **`data-accent` sitzt an jedem Container**, der einen Bereichsblock aufspannt (Seiten-Root `.ep-page`, aber auch nur der Wrapper um einen Block wie das Buchungsformular, eine Anmeldesektion oder ein Bereichsformular). Für einzelne Links im Block **keine** Inline-Bereichsfarbe schreiben, die bricht im Dark-Mode.
- **Zustände (`:hover`, `:focus`, `:active`) brauchen im Dark einen eigenen Override.** `dark-mode.css` wird **vor** `components.css` geladen (Reihenfolge ist Teil der API). Eine Zustands-Regel in `components.css` gewinnt dadurch bei gleicher Spezifität gegen die Dark-Grundregel — setzt sie einen nicht mitflippenden Ton, läuft der Zustand im Dark dunkel-auf-dunkel. Faustregel: Der Zustand macht heller, nicht dunkler. Den Override mit `[data-theme="dark"]` davor schreiben, dadurch liegt er automatisch eine Spezifitätsstufe höher und die Ladereihenfolge spielt keine Rolle mehr. `npm run check:dark-states` prüft das und läuft in der Pipeline; bewusste Ausnahmen stehen mit Begründung im Skript.
- **Die Neutrals kippen im Dark, die Bereichstöne nicht.** `--n-50` und `--n-100` werden im Dark-Block neu belegt und werden dort **dunkel** (`--n-100` = `#1E262E` statt `#E8EDED`); alle anderen Stufen behalten ihren Wert. Wer im Dark ein helles Neutral braucht, nimmt `--n-200` (`#C9D3D3`, wird nicht umbelegt) oder `--tx-primary`. Ein Icon-Hover auf `var(--n-100)` sah in der Quelle nach „heller" aus und ergab 1,60:1. Entscheidend ist nie der Name eines Tokens, sondern sein Wert im jeweiligen Theme.
- **Gewählte Zustände invertieren im Dark**, statt nur nachzudunkeln: Light füllt mit `-700`/`-800` und schreibt weiß, Dark füllt mit `-300` und schreibt `-900`. So machen es das Segmented Control (`--seg-fill`/`--seg-on`) und die gedrückten Chips. Grund: Eine dunkle Füllung auf dunklem Grund grenzt den Zustand nicht mehr ab (gemessen 1,13 bis 1,60:1), er wäre nur noch am Text erkennbar. Wird die Füllung eines solchen Paars von einer anderen Regel überschrieben, muss die Textfarbe mitgehen — sonst steht heller Grund unter weißem Text (1,53:1). `npm run check:dark-states` prüft genau das.
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
- **Verlinkte Rechtstexte in Einwilligungen sind echte `<a class="body-link">`**, nie ein `<span>` mit `cursor:pointer`. Ein Span ist nicht per Tab erreichbar und für Screenreader kein Link, obwohl genau dieser Text die Grundlage der Einwilligung ist. Im `<label for>` ist der Anker unkritisch: die Label-Aktivierung läuft bei interaktiven Nachfahren nicht, der Klick auf den Link setzt kein Häkchen.
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
