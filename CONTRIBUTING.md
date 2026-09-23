# Mitwirken am Conciso Design System

Dieses Dokument hält die **Konventionen** fest, nach denen das System gebaut ist. Wer Tokens oder Komponenten ergänzt, folgt ihnen — so bleibt das System konsistent, barrierefrei und wartbar. Viele Regeln haben eine bewusste Begründung (oft Light/Dark-Verhalten oder WCAG); die steht jeweils dabei, damit niemand sie versehentlich „wegoptimiert“.

Leitbild (Markenrad): **Gelassenheit** durch *Ruhig · Klar · Energiegeladen*. Farbe und Elevation sind **Akzent und Bedeutung**, nicht Dekor.

---

## 1. Grundprinzipien

- **Tokens statt Hardcodes.** Nie rohe Hex-/px-Werte, wo ein Token existiert. Farben, Abstände, Radien, Typo, Elevation kommen aus `css/tokens.css`.
- **Beide Modi mitdenken.** Jede Änderung in Light **und** Dark prüfen. Leitfrage bei fast jedem Bug dieser Codebasis: *„Flippt der Hintergrund mit dem Theme — und hat das Element eine andere Flächen-Stufe als sein Grund?“*
- **Konformitätsstufe AA ist Pflicht, AAA ist Zugabe.** Stufe AA schließt Stufe A ein: gefordert sind **alle** Erfolgskriterien beider Stufen, und zwar für jedes Thema, nicht nur für Kontrast (also auch Tastaturbedienung, Fokus, Struktur, Beschriftung, Bewegung, Zielgrößen). Für Kontrast konkret: Normaltext ≥ 4,5:1, Großtext/UI ≥ 3:1; disabled & rein dekorative (`aria-hidden`) Elemente ausgenommen. **AAA** nehmen wir mit, wo es ohne Nachteil für Gestaltung oder Verständlichkeit erreichbar ist (die meisten Textfarben liegen darüber, Touch-Targets bei 44 px statt der geforderten 24 px), aber es ist **kein Abnahmekriterium**: an einem AAA-Kriterium scheitert kein PR. Wer AAA an einer Stelle bewusst nicht erfüllt, schreibt es dazu, statt es offen zu lassen (Beispiel: der 2-px-Hover-Lift auf klickbaren Karten gegen 2.3.3).
- **Elevation = Interaktivität.** Schatten ist ein Affordanz-Signal, kein Schmuck (siehe §4).

---

## 2. Namens-Konventionen

**CSS-Klassen**
- Komponenten: `.btn-*`, `.badge-*`, `.card-*`, `.chip*`, `.field`, `.seg*` (Segmented Control), `.bk-*` (Buchungsformular), `.stoerer*` (Störer über dem Hero)
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

**Zwei Ebenen, und sie werden oft verwechselt.**

1. **WCAG ist Pflicht und gilt für den Inhalt.** Text 4,5:1 (Großtext 3:1). Grenzen von Bedienelementen und Grafik, die Bedeutung trägt, 3:1. Das war es. Für die *Fläche* einer Pill, eines Badges oder einer Icon-Kachel verlangt WCAG **nichts**: sie ist kein Bedienelement, und ein Glyph, der `aria-hidden` ist und nur das Label daneben wiederholt, trägt keine Bedeutung.
2. **Darüber hinaus entscheidet das Markenrad**, nicht der Kontrastrechner. „Ruhig“ heißt: eine dekorative Fläche darf zart bleiben. Deshalb tragen Icon-Kacheln und Timeline-Marker den ruhigen `--XX-50`-Tint ohne Rand, und das Glyph darauf trägt die Erkennbarkeit (7,5 bis 11,4:1 im Light, 6,9 bis 8,6:1 im Dark). 48 px gesättigte Farbe wären das Gegenteil davon.

Wo die Fläche dagegen **selbst** die Aussage ist, gilt die Hausregel: Pill und Bereichs-Badge stehen für eine Kategorie, sie müssen als Bauteil lesen. Für sie, und nur für sie, gilt 1,3:1 **und** 10 L\*, und `npm run check:contrast` prüft das mit. Die Rollen haben eigene Token, damit die Entscheidung am Namen hängt und nicht am Gefühl: **`--XX-50`** ruhige dekorative Fläche · **`--XX-fill`** textführendes Bauteil · **`--XX-band`** große Sektionsfläche · **`--XX-ink`** farbiger Text.

- **Farbiger Text: immer `--XX-ink`.** Das Token flippt mit dem Theme (Light `-700`, KI `-800`, weil `ki-700` nur 4,05:1 trägt · Dark `-200`, ES `-100`) und ist damit der einzige Weg, farbigen Text zu setzen, ohne einen der beiden Modi zu verlieren. Ein fest gesetztes `-700` trägt auf Weiß 5,52:1 und im Dark nur 3,17:1; ein fest gesetztes `-200` umgekehrt. Es gibt `--co-ink`, `--ki-ink`, `--es-ink`, `--wo-ink`.
- **Nie `-500`/`-600` als Textfarbe** auf Weiß: `co-600` trägt 3,29:1, `co-500` 2,31:1. `-600` ist auch für Großtext knapp; nur als Fläche oder Rahmen einsetzen.
- **Getönte Fläche unter Text macht die Farbe nicht schwächer, sondern den Grund heller.** Ein Link mit `--co-ink` auf einem Status-Tint reißt AA (auf dem Erfolgs-Tint 3,87:1). Auf getönten Callout-Flächen erbt Text die Textfarbe des Callouts (`color:inherit`), die Unterstreichung trägt die Link-Affordanz.
- **Gedämpfter Text:** `--tx-muted` ist auf 5,20:1 gegen Weiß ausgelegt und trägt auch auf `n-50` (4,84:1) und getönten Hellflächen (4,66:1). Auf **dunklen** Card-Flächen bleibt `--tx-secondary` die Wahl.
- **`--XX-ink` ist für farbigen Akzenttext** (Eyebrows, Preise, Häkchen, Labels), **nicht** für Elemente, die neutral schwarz/weiß sein sollen → dort `--tx-primary`.
- **Farbiger Text/Icon auf heller `-100`-Kachel** (Chip, Häkchen-Kreis): fest auf `--XX-800`, **nicht** `.t-*`/`ink` — die `-100`-Kachel flippt im Dark nicht, `.t-*`/`ink` kippt auf hell `-200` → hell-auf-hell, unsichtbar.
- **Der Stand ist 0 Verstöße** in beiden Modi, gemessen über 11.585 Textknoten der Doku, alle getönten Bauteil-Füllungen und alle Bedienelement-Rahmen. Das ist kein Zielwert, sondern der Ist-Stand, den das Gate festhält.
- **`npm run check:contrast` ist das Gate.** Es rendert `docs/index.html` in **beiden** Modi in Chromium, löst für jeden Textknoten den effektiven Grund über die Elternkette auf (halbtransparente Schichten werden aufeinander komponiert) und prüft drei Dinge: Text gegen 4,5:1 bzw. 3:1 bei Großtext, getönte Bauteil-Füllungen gegen den 1,3:1-Faustwert, Bedienelement-Rahmen gegen 3:1. Weil es die **fertige Kette** misst und nicht das CSS, findet es auch inline gesetzte Farben, die kein Token-Check sieht. Läuft in `storybook-angular.yml`, weil es einen Browser braucht; lokal reicht ein installiertes Chrome.
  - **Genau eine Ausnahme:** Swatches in den Kontrast-Tabellen (`.cswatch`, `.cbadge`), die ein Farbpaar als *Inhalt* zeigen und das gemessene Verhältnis daneben ausschreiben. Alles andere zählt, auch Paletten-Beschriftungen, Code-Blöcke und Specimen. Wer eine zweite Ausnahme braucht, hat sehr wahrscheinlich einen Befund vor sich.
  - **Text über Fotos und Verläufen** wird nur gezählt, nicht gewertet: sein Grund steht nicht in der Elternkette, das braucht eine Pixelmessung (Vorgehen siehe Hero-Scrim im CHANGELOG).
  - **Restliste statt Ausnahmeliste:** Das Gate vergleicht gegen eine Zahl pro Kategorie im Skript und schlägt fehl, wenn sie **steigt** (Regression) und ebenso, wenn sie **sinkt**, ohne nachgezogen zu werden. Der Stand bleibt so ehrlich im Repo sichtbar und kann sich nur nach unten bewegen. Ziel ist überall 0.

---

## 4. Elevation = Interaktivität

- **Statische** Cards/Flächen ruhen **flach** mit Rahmen (`--e0` + `--bd-strong`).
- **`--bd` und `--bd-strong` sind zwei Rollen, nicht zwei Stärken.** Beide sind 1 px. `--bd-strong` ist die **Außenkante einer Fläche** (Karte, Kasten, schwebendes Panel), `--bd` die **Trennlinie innerhalb** eines Bauteils (Card-Footer, Testimonial-Footer, Caption-Kante, Tabellenzeile). Die Kante muss mehr tragen, weil sie eine Fläche gegen ihren Grund abgrenzt; die Trennlinie liegt innerhalb einer schon abgegrenzten Fläche. Wer eine neue Fläche baut, nimmt `--bd-strong`, ohne zu überlegen. Ausgenommen sind **Bedienelemente**: Formularfelder und Buttons haben mit `--field-border` (4,13:1) ihr eigenes Token, weil für sie WCAG 1.4.11 mit 3:1 gilt, und Pills/Chips tragen ihren eigenen, kräftigeren Rand.
- **Interaktive** Elemente (Links, klickbare Cards `.ep-card-link`) tragen Schatten (`--e1`) und heben auf Hover (`--e3`).
- Begründung: Schatten signalisiert „anfassbar“. Statische Info-Cards mit Schatten täuschen Interaktivität vor.
- **Entscheidend ist die Fläche, nicht der Inhalt.** Eine Karte mit Buttons oder Text-Links im Footer ist **statisch**: die Buttons sind die Interaktion, die Fläche führt nirgendwohin. Sie ruht flach. Schatten bekommt sie erst, wenn sie selbst der klickbare Bereich ist, also `<a class="card card-elevated">` oder `<a class="ep-card ep-card-link">`.
- **Der Riegel steht im CSS:** `.card-elevated` ist auf `a.card-elevated` gescoped, eine `<article>`/`<div>`-Karte kann den Schatten also auch mit gesetzter Klasse nicht bekommen. Wer eine statische Fläche erhöhen will, findet keinen Weg dorthin, und das ist beabsichtigt. Gleiches gilt für Inline-`box-shadow` auf statischen Blöcken: nicht setzen, auch nicht mit Token.

---

## 5. Dark Mode

- **Nur zwei Flächen-Stufen:** `--bg-page` (Basis) < `--bg-surface` (gehoben). **Keine dritte Stufe.** Ein Element hebt sich nur ab, wenn sein Grund eine *andere* Stufe hat.
- **Section-Rhythmus:** `.ep-section` ist im Dark pauschal `bg-page`; `n-50`-Sektionen werden auf `bg-surface` gehoben; getönte Hero/CTA-Sektionen behalten ihren Bereichs-`-50`-Tint (co/ki/es/wo).
- **Der Sektions-Rhythmus läuft im Dark wie im Light, ohne Ausnahme für Karten.** `n-50`-Sektionen werden im Dark auf `bg-surface` gehoben, alle, auch kartentragende. Eine gehobene Sektion hat damit denselben Ton wie ihre Karten, und das ist in Ordnung: im Light steht die weiße Karte auf der weißen Sektion genauso, sie liest über ihren **Rand**. Damit das trägt, ist die Außenkante `--bd-strong`: im Light 2,25:1 gegen Weiß und 2,09:1 gegen eine `n-50`-Sektion, im Dark 4,21:1 gegen die Kartenfläche. Vorher stand dort `--bd` mit 1,10:1, die Begründung stützte sich also auf eine Linie, die man nicht sah. Deshalb braucht jede Kartenfläche im Dark einen Rand: `.card`, `.ep-card` und `.ep-card-link` bekommen ihn in `dark-mode.css`, auch die Link-Karten, die im Light `border:none` tragen und sich auf `--e1` verlassen. **Neue Kartenkomponente → Rand im Dark mitgeben.** Die Sektion zu senken (früher `.ep-section-cards`) ist kein Weg: gemessen über die 24 Beispielseiten kostet das 63 statt 20 verschmolzene Sektionsübergänge, bei 17 im Light.
- **Getönte Flächen im Dark: zwei Token, zwei Aufgaben.** `--XX-50` ist die **kleine Füllung** (Badge, Pill, Icon-Kachel) und liegt bei 9,8:1, also 1,78:1 über der Seite und 1,32:1 über Karten. `--XX-band` ist die **große Sektionsfläche** (Hero, CTA-Band) und liegt bei 16,5:1, knapp über der Seite (1,06:1, dort trennt der Farbton) und weiterhin dunkler als die Karten darauf (1,27:1). Im Light sind beide identisch. Grund für die Trennung: ein Band muss *dunkler* als seine Karten bleiben, eine Füllung *heller* als ihr Grund, und bei `bg-page` auf 17,5:1 reicht der Spielraum nicht für beides. Neue getönte Flächen also nach Größe entscheiden, nicht nach Bereich. Sättigung **unter 0,70** halten (aktuell 0,60), sonst „vibriert“ die Fläche auf dunklem Grund.
- **Bereichsfarbe über die Klasse setzen, nie inline.** `.btn-filled` ohne `.btn-co`/`-ki`/`-es`/`-wo`, dafür mit einem inline gesetzten `--c500`, sieht im Light korrekt aus und bricht im Dark: die Dark-Regel für die **Fläche** hängt an der Bereichsklasse, die für die **Textfarbe** an `.btn-filled`. Ohne Klasse greift nur die zweite, und dunkler Text landet auf dunkler Fläche (gemessen 3,51:1). `npm run check:dark-states` kann das nicht sehen, weil der Bruch nicht in einer Regel steht, sondern im Markup entsteht.
- **Eine textführende Füllung, die keine Fläche mehr bildet, ist ein Fehler.** Badge, Pill und Chip werden als Bauteil erkannt, weil ihre Fläche sich vom Grund abhebt (dekorative Flächen siehe oben, die dürfen zart bleiben). Faustwert: mindestens **1,3:1** gegen jeden Grund, auf dem sie vorkommen können (Seite *und* Karte). Darunter liest das Element nur noch als farbiger Text. Gegenprobe immer auf beiden Gründen rechnen, nicht nur auf einem. Dafür gibt es **`--XX-fill`**: Pill und Bereichs-Badge füllen damit, nicht mit `--XX-50` (das ist im Light der Sektions-Tint und trug als Füllung nur 1,06 bis 1,14:1). Neue getönte Bauteil-Füllung → `--XX-fill`.
- **Eine textführende Füllung braucht ZWEI Werte: 1,3:1 UND 10 L\*-Punkte Helligkeitsabstand.** Der Kontrastquotient allein unterschätzt satte Farben. Die Dark-Füllungen lagen bei 1,32 bis 1,33:1, erfüllten den Faustwert also, hatten aber nur **ΔL\* ≈ 8**: der Unterschied lag fast vollständig in Farbton und Sättigung, und eine satte Fläche auf gleicher Helligkeit liest als dunkler Fleck statt als hellere Stufe (am deutlichsten bei ES, weil Blau bei gleichem L\* am dunkelsten wirkt). Sie sind deshalb um gut 4 L\*-Punkte gehoben, Farbton und Sättigung unverändert: jetzt 1,54 bis 1,56:1 und ΔL\* 11 bis 12,7. **Beide Kriterien prüft `npm run check:contrast` mit.** Zum Anheben in Lab rechnen und nur L verändern, dann bleibt der Markenton erhalten.
- **Die Basisfläche ist auf mindestens 15,8:1 gegen Weiß auszulegen.** Das ist die Material-Schwelle und zugleich der Puffer, der Fließtext auch auf der höchsten Elevationsstufe noch 4,5:1 sichert. Wer `--bg-page` im Dark anfasst, rechnet diesen Wert nach. **Nie eine Textfarbe als Fläche einsetzen:** Textfarben sind auf Lesbarkeit gegen Weiß optimiert und liegen dafür systematisch zu hoch.
- **Schwebende Panels (Menüs, Popover) tragen im Dark einen `--bd-strong-c`-Rand.** Im Light grenzt `--e3` sie vom Inhalt darunter ab; auf der tiefen Basisfläche leistet ein schwarzer Schatten das nicht mehr. Gemessen stand ein Topnav-Menü über einem Hero-Foto nur 1,34:1 gegen die hellste Stelle daneben. Der Rand ist unabhängig davon lesbar, was zufällig hinter dem Panel liegt. Für reine Farbwerte gibt es `--bd-c` / `--bd-strong-c`; `--bd` und `--bd-strong` sind Shorthands und funktionieren in `border-color` nicht.
- **Tiefe kommt im Dark primär aus der Fläche, nicht aus dem Schatten.** Auf 17,5:1 tragen die schwarzen `--e*`-Schatten wenig. Interaktive Flächen heben deshalb zusätzlich auf `--bg-surface-hover`. Das ist ein **Zustand**, keine dritte statische Stufe.
- **`dark-mode.css` steht komplett in `@media screen`**, Token-Block und Komponenten-Regeln. Im Druck greifen dadurch die Light-Werte aus `tokens.css`, ohne dass sie ein zweites Mal gepflegt werden müssen. Die Komponenten-Regeln müssen mit hinein: 183 von ihnen setzen eine helle Tint- oder Festfarbe (`co-200`, `ki-200`, `es-100`, heller `tx-primary`), die auf dem hellen Druckgrund 1,2 bis 1,9:1 trägt. Neue Dark-Regeln und neue Dark-Tokens gehören **innerhalb** des Blocks, sonst drucken sie dunkel mit.
- **Trennlinien & Rahmen:** **nie** rohes `var(--XX-100)` oder `var(--n-100)` als Border — immer **`var(--bd)`** für Trennlinien und **`var(--bd-strong)`** für Außenkanten (Rollen-Regel in §4) (theme-aware: Light `n-100`, Dark `#6F7A89`). Rohes `-100` ist im Dark entweder eine grelle helle Linie (getönt) oder unsichtbar (neutral, gemessen 1,18:1 gegen eine Karte statt 2,99:1). Der neutrale Fall ist der tückischere: im Light löst `--bd` genau auf `--n-100` auf, der Rahmen sieht dort also korrekt aus und die Abweichung fällt erst im Dark auf. Wer nur die Farbe braucht, nimmt `--bd-c` / `--bd-strong-c`.
- **`data-accent` tönt nur den Inhalt**, nicht die Chrome: Footer- und Topnav-`.t-co` werden auf `co` zurückgesetzt (`[data-accent] .ep-topnav .t-co` etc.). Die Nav bleibt überall Corporate.
- **`data-accent` sitzt an jedem Container**, der einen Bereichsblock aufspannt (Seiten-Root `.ep-page`, aber auch nur der Wrapper um einen Block wie das Buchungsformular, eine Anmeldesektion oder ein Bereichsformular). Für einzelne Links im Block **keine** Inline-Bereichsfarbe schreiben, die bricht im Dark-Mode.
- **Zustände (`:hover`, `:focus`, `:active`) brauchen im Dark einen eigenen Override.** `dark-mode.css` wird **vor** `components.css` geladen (Reihenfolge ist Teil der API). Eine Zustands-Regel in `components.css` gewinnt dadurch bei gleicher Spezifität gegen die Dark-Grundregel — setzt sie einen nicht mitflippenden Ton, läuft der Zustand im Dark dunkel-auf-dunkel. Faustregel: Der Zustand macht heller, nicht dunkler. Den Override mit `[data-theme="dark"]` davor schreiben, dadurch liegt er automatisch eine Spezifitätsstufe höher und die Ladereihenfolge spielt keine Rolle mehr. `npm run check:dark-states` prüft das und läuft in der Pipeline; bewusste Ausnahmen stehen mit Begründung im Skript.
- **Die Neutrals kippen im Dark, die Bereichstöne nicht.** `--n-50` und `--n-100` werden im Dark-Block neu belegt und werden dort **dunkel** (`--n-100` = `#1E262E` statt `#E8EDED`); alle anderen Stufen behalten ihren Wert. Wer im Dark ein helles Neutral braucht, nimmt `--n-200` (`#C9D3D3`, wird nicht umbelegt) oder `--tx-primary`. Ein Icon-Hover auf `var(--n-100)` sah in der Quelle nach „heller“ aus und ergab 1,60:1. Entscheidend ist nie der Name eines Tokens, sondern sein Wert im jeweiligen Theme.
- **Gewählte Zustände invertieren im Dark**, statt nur nachzudunkeln: Light füllt mit `-700`/`-800` und schreibt weiß, Dark füllt mit `-300` und schreibt `-900`. So machen es das Segmented Control (`--seg-fill`/`--seg-on`) und die gedrückten Chips. Grund: Eine dunkle Füllung auf dunklem Grund grenzt den Zustand nicht mehr ab (gemessen 1,13 bis 1,60:1), er wäre nur noch am Text erkennbar. Wird die Füllung eines solchen Paars von einer anderen Regel überschrieben, muss die Textfarbe mitgehen — sonst steht heller Grund unter weißem Text (1,53:1). `npm run check:dark-states` prüft genau das.
- Dark-Overrides in `dark-mode.css` mit dem Format kommentieren: `/* Dark-only: … ❌ → … ✓. (Light: …) */`. In Kontrast-Tabellen `.a11y-mode`-Pill (`Light`/`Dark`/`Beide Modi`).
- **Kein `*/` im Kommentar-Text** (z. B. `t-*/Badges`) — das schließt CSS-Kommentare vorzeitig und killt die Folgeregel.

---

## 6. Typografie

- **Skala: 16 / 14 / 12 px** für Body/Label (`--ty-body-md/-sm/-xs`, `--ty-label-*`), Title-Sm 20 px, darüber die Serif-Display-Stufen.
- **Minimum 12 px** systemweit. **Keine Freihand-Größen** (kein `font:… 13px`, kein `font-size:13px`) — immer ein `--ty-*`-Token. Ausnahmen nur: Monospace-Code-Blöcke und in die Geometrie eingepasste SVG-Diagramm-Labels (dokumentiert).
- **Deutsche Typografie:** Anführungszeichen „… “ (99 unten öffnend, 66 oben schließend; U+201E / U+201C), **nicht** gerade ASCII-Quotes.
- **Keine Gedankenstriche** (— / –) in Copy-Texten → Komma, Doppelpunkt, Punkt oder Klammern. (Begründung: Markenwert „Ruhig“ + gerade/strichlose Interpunktion liest sich menschlicher.)
- Hierarchie über **Weight/Case/Color**, nicht über Mini-Schriftgrößen.
- **Die Eyebrow-Form ist voll belegt: keine fünfte Bedeutung darauf.** `--ty-label-xs` + `uppercase` + `letter-spacing:.09em` + `--co-ink` ist pixelgleich in vier Rollen im Einsatz: `.ep-hero-eyebrow` (Haltung, „Verbunden gedacht“) · `.ep-section-label` (Sektions-Thema, „Was wir tun“) · `.ep-card-eyebrow` (Brand Area, in Bereichsfarbe) · `.stoerer-topic` (Inhaltstyp, „Nächste Veranstaltung“). Aufgelöst wird das nur durch die Position (in einer Kachel, über einer Sektion), nicht durch die Form. Das trägt, ist aber die Grenze: eine neue Komponente, die noch eine Bedeutung auf dieselbe Form legt, macht die kleinste Label-Ebene beliebig. Wer eine fünfte Rolle braucht, gibt ihr ein eigenes Unterscheidungsmerkmal (Glyph vor dem Label, neutrale statt farbiger Schrift) oder benutzt eine vorhandene Rolle.
- **Ein Domänenwort pro Domäne.** Nav, Sektions-Label und Verweis-Komponenten benennen dieselbe Sache mit demselben Wort. Auf der Startseite standen für Veranstaltungen zeitgleich „Events“ (Nav), „Treffen“ (Sektion) und „Alle Veranstaltungen ansehen“ (Link). Das ist nicht nur unsauber: sobald zwei Elemente auf **dasselbe Ziel** verlinken, stehen dort zwei Links mit verschiedenen Namen, und für Screenreader sind das zwei verschiedene Dinge. Gegenprobe: das Wort auf der Seite suchen und die Varianten zählen. **Die Regel gilt pro Domäne, nicht pro Vokabel:** „Teamevents“ und „Kochevents“ auf der Arbeitgeber-Seite bleiben stehen, weil sie interne Team-Aktivitäten bezeichnen und nicht die Veranstaltungen mit Übersichtsseite, Anmeldung und Nav-Eintrag. Zwei Dinge, zwei Wörter ist richtig; ein Ding, zwei Wörter ist der Fehler.

---

## 7. Spacing & Layout

- Alle `padding`/`margin`/`gap` aus der Skala `--s1 … --s16`. Ausnahmen nur für Touch-Targets, Hairlines, Icon-Maße, Container-Breiten oder optische Korrekturen — und dann **mit Kommentar**.
- Akzentbilder auf Content-Breite via `.ep-media-band` (nicht full-bleed), nur der Hero ist randlos.
- **Der Abstand gehört dem Container, nicht dem Kind.** Ein Bauteil kennt seinen Kontext nicht und kann darum nicht wissen, wie viel Luft darunter richtig ist: Abstände zwischen Geschwistern kommen aus dem `gap` des anordnenden Containers, nicht aus einer Außenmarge am Kind. Wer die Regel bricht, zahlt sie zweimal, denn im Flex- und Grid-Layout kollabieren Margen nicht, sie addieren sich zum `gap`. So wurde `.pill` mit ihrer `margin-bottom:var(--s5)` in jeder Karten-Spalte zum Sonderfall (36 px statt 16 px unter der Pill), und jeder Kontext musste die Marge einzeln zurücknehmen. `.card-eyebrow` und `.card-cta-link` haben ihre Margen deshalb abgegeben, den Rhythmus der Karte trägt allein `.card-body { gap:var(--s3) }`. Braucht eine Instanz mehr Luft, wird der `gap` überschrieben, nicht eine Marge nachgeschoben.
- **Eine Klasse trägt das Layout, das ihr eigenes Rezept voraussetzt.** Sonst ist sie kein Bauteil, sondern ein Fragment mit Montageanleitung: `.card-body` dokumentierte `.card-cta-link--pinned` (`margin-top:auto`), war selbst aber nur `padding`, also stand die Flex-Spalte 43-mal im `style`-Attribut der Doku-Mockups, und wer das Rezept ohne diese Inline-Styles übernahm, bekam ein anderes Layout als dokumentiert. Prüfstein: das Rezept aus der Doku muss allein mit seinen Klassen so aussehen, wie es die Doku zeigt.
- **Bildslots in Karten sind 16/9 und kommen aus `.card-media`.** Listing-Grid und Featured-Card teilen sich das Verhältnis, damit Redaktion pro Beitrag **ein** Bild in **einem** Zuschnitt pflegt statt einen je Slot. Den Bildausschnitt setzt `object-position` am `<img>`, nicht `background-position` an einem Container, sonst gilt der Zuschnitt nur in einem Slot. Eigene Verhältnisse haben nur Hero und Slider (21/9) sowie Avatare (1/1). Steht ein Bild neben Text, bestimmt das **Bild** die Höhe: die Featured-Card erreicht das über einen absolut positionierten Content-Block, weil eine normale Spalte mit ihrer Inhaltshöhe die Zeile aufzieht und das Bild mitstreckt (so driftete das Verhältnis auf 1,62). Ein `aspect-ratio` auf der Karte genügt nicht, es ist eine Wunschgröße und verliert gegen die Inhaltshöhe (1,50 gemessen). Reicht die Höhe nicht, wird **Text gekappt, nicht das Verhältnis gedehnt**.
- **Hängt ein Layout am Platz *in* einem Bauteil, entscheidet die Container-Breite, nicht die Fensterbreite.** Eine Media Query fragt das Fenster; ob ein Overlay in sein Bezugselement passt, sagt aber dessen eigene Breite. Der Störer hing zuerst an `@media (min-width:1025px)` und ragte in der Doku-Vorschau 41 px in die nächste Sektion, weil der Hero dort 898 px breit war statt 1200. Jetzt trägt `.stoerer-hero` ein `container-type:inline-size` und die Regel steht in `@container`. Faustregel: Breakpoints auf **Viewport** für Seiten-Rhythmus (Sektionsabstände, Spaltenzahl), auf **Container** für alles, was in ein Elternelement passen muss. Ohne `@container`-Support greift die Regel nicht — der Default-Zweig muss deshalb der funktionierende Fall sein (beim Störer: Set als Block unter dem Hero).

---

## 8. Komponenten-Verhalten

- **Topnav-Dropdowns sind ein Disclosure-Pattern** (in `docs/main.js`: `aria-expanded`, Escape, Pfeiltasten, Außenklick, `closeAllNavItems`). Öffnen per Klick/Tap, Tastatur oder — nur auf `pointer:fine` — per Hover (JS-gesteuert, Intent-Delay + unsichtbare Brücke, WCAG 1.4.13). Der Label-Link navigiert dabei weiterhin direkt zur Übersicht; nur der Caret-Button klappt auf. Regeln, die bleiben: **kein reines CSS-`:hover`-Öffnen** (der Reveal muss an `.is-open` hängen, damit `aria-expanded` mitläuft) und **nie zwei Menüs gleichzeitig offen** (immer `closeAllNavItems` vor dem Öffnen).
- **Verlinkte Rechtstexte in Einwilligungen sind echte `<a class="body-link">`**, nie ein `<span>` mit `cursor:pointer`. Ein Span ist nicht per Tab erreichbar und für Screenreader kein Link, obwohl genau dieser Text die Grundlage der Einwilligung ist. Im `<label for>` ist der Anker unkritisch: die Label-Aktivierung läuft bei interaktiven Nachfahren nicht, der Klick auf den Link setzt kein Häkchen.
- Icon-only Buttons brauchen `aria-label`. Tab-/Panel-Muster mit korrektem ARIA (`role`, `aria-selected`, `aria-controls`).

---

## 9. Do / Don't darstellen

In „Verwendung“-Sektionen die **positive Variante zuerst** (✓ links/oben), die negative danach (✕ rechts/unten) — einheitlich in allen Paaren.

---

## 10. Eine Komponente / ein Token hinzufügen

1. **Token** (falls nötig) in `css/tokens.css` ergänzen (Präfix-Schema, Light-Wert), Dark-Abweichung in `css/dark-mode.css`. Vorher prüfen, ob die Rolle schon ein Token hat: farbiger Text → `--XX-ink`, Füllung eines textführenden Bauteils → `--XX-fill`, dekorative Fläche → `--XX-50`, Sektionsfläche → `--XX-band`, Rahmenfarbe → `--bd-c` / `--bd-strong-c`. Eine neue Rolle braucht einen neuen Namen, eine bekannte Rolle nicht.
2. **Komponente** als CSS-Klasse in `css/components.css` (Namens-Konvention §2, Tokens statt Hardcodes).
3. **Icon** (falls nötig): normalisiertes SVG als `icons/source/{area|ui}-{name}.svg` ablegen — Farben als `currentColor`, Outline-Icons mit inline `stroke-width`, `width`/`height` weglassen (Größe beim Consumer). Key-Präfix `co|ki|es|wo` für Bereichs-Glyphen, sonst `ui`. Dann `npm run build:icons` → generiert `icons/{icons.json,icons.js,README.md}`. Label/Verwendung optional in `icons/manifest.json` pflegen. Quelle = `icons/source/`, **nicht** die generierten Dateien editieren. Siehe `icons/README.md`.
4. **Dokumentieren:** neue Sektion/Beispiel in `index.html` (Code-Snippet, „Verwendung“, Do/Don't). Wohin sie gehört, wie sie aufgebaut ist und wie der Nav-Eintrag heißt: §11.
5. **Prüfen:** `npm run check:contrast` (misst die gerenderte Doku in beiden Modi, muss 0 melden) und `npm run check:dark-states`. Dazu Tastatur- und Screenreader-Pfad bei interaktiven Komponenten. Eine neue getönte Füllung, die als Fläche lesen muss, gehört in die `FILL_SELECTOR`-Liste des Gates; eine dekorative nicht (die Begründung steht im Skript).
6. **CHANGELOG.md** ergänzen.

**Verifikation:** Für reine Markup-/CSS-Änderungen genügt visuelle Prüfung in Light+Dark. Bei JS-/Interaktions-/Responsive-Änderungen im Browser testen (z. B. headless via puppeteer-core: Theme setzen, Komponente öffnen, computed styles / Screenshot prüfen). Kontrastwerte mit der WCAG-Formel gegen die konkreten Token-Werte rechnen.

---

## 11. Doku-Struktur (`docs/index.html`)

Die Doku-Site ist eine Datei mit 35 Sektionen und einer Sidebar, die als einziger Index dient. Wer eine Sektion nicht in die Navigation einträgt, versteckt sie.

**Die sechs Gruppen.** Reihenfolge und Inhalt:

| Gruppe | Was hineingehört |
|---|---|
| Marke | Markenrad, Brand Areas, Logo, Bildsprache |
| Grundlagen | Farben, Typografie, Spacing, Responsive, Elevation, Design Tokens, Icons, Barrierefreiheit. Design Tokens stehen hinter den Themen, deren Werte sie festhalten; Barrierefreiheit als querschnittliches Thema zuletzt |
| Komponenten | einzelne Bauteile, in der Folge Aktion, Kennzeichnung, Eingabe, Feedback, Container, Daten, Editorial, Medien, Seiten-Chrome (Navigation, Hero, Footer in Lesereihenfolge) |
| Seitenmuster | ganze Seitentypen samt ihrer Übersichten |
| Beispielseiten | fertige Seiten als Tab-Leiste |
| Referenzen | Quellen |

**Nav-Eintrag ist Pflicht.** Jede `.ds-section` braucht ein `.nav-item`, jede `h2.group-title` einen `.nav-sub-item`. Keine Überschrift ohne Eintrag, kein Eintrag ohne Ziel.

**Anker-Schema** `gt-<sektion>-<thema>`. Das Präfix ist die eigene Sektion, auch wenn der Inhalt von woanders kam. `gt-` ist reserviert für Überschriften mit Nav-Eintrag. Ein Anker, der nur Sprungziel eines Querverweises ist und keine Gruppe eröffnet, bekommt einen Namen ohne dieses Präfix (`colors-semantik`, `seminar-termine`).

**Reihenfolge innerhalb der Sektion.** Bei Seitenmustern eröffnet „Aufbau“, danach die Bausteine in der Lesereihenfolge der fertigen Seite. „Verwendung“ schließt ab, immer zuletzt. Dokumentiert eine Sektion mehrere Bauteile, heißt der Block `<Bauteil> · Verwendung` (z. B. „Bild-Carousel · Verwendung“, „Störer · Verwendung“), damit beide Einträge unterscheidbar bleiben.

**Bereichsreihenfolge** überall co · ki · es · wo, wie in §2.

**Nav-Label** ist die Überschrift oder ihr Anfang. Kürzen ist erlaubt, umformulieren nicht: wer in der Sidebar ein anderes Wort liest als über dem Absatz, sucht zweimal. Das gilt auch für Querverweise im Fließtext, die eine Sektion beim Namen nennen.

**Ein Trennzeichen pro Aufgabe.** `·` bestimmt einen Namen näher („Bandstreifen · flache Variante“). `:` steht nur, wenn ein Satz folgt („Tonalität: Du statt Sie“). Klammern nur für einen kurzen Einschub („Shape (5 Stufen)“). Nicht mischen, sonst tragen drei Formen dieselbe Bedeutung.

**Sprache.** Gruppen- und Konzeptnamen deutsch (Grundlagen, Komponenten, Farben, Typografie, Barrierefreiheit). Etablierte Bauteil- und Token-Namen bleiben in der Form, die im CSS und im Storybook steht (Buttons, Cards & Teaser, Dropdowns, Spacing, Elevation, Brand Areas). Maßstab ist nicht die Sprache, sondern ob der Begriff im System schon einen Namen hat: dann diesen, sonst deutsch.

**Heading-Ebenen** `h1.sec-title` → `h2.group-title` → `h3`, ohne Stufe zu überspringen. Anker sitzen auf Überschriften. Einzige Ausnahme ist die Tab-Leiste der Beispielseiten: sie ist ein Bedienelement, keine Gliederung, ihre Einträge sind deshalb Buttons und die Sidebar verlinkt den ersten Tab der Gruppe.

**So prüfst du es** (vor dem Commit, ersetzt kein Gate):

```bash
# Nav-Links ohne Ziel
rg -o 'nav-sub-item"[^>]*href="#([^"]+)"' -r '$1' docs/index.html | sort -u > /tmp/nav
rg -o '\sid="([^"]+)"' -r '$1' docs/index.html | sort -u > /tmp/ids
comm -23 /tmp/nav /tmp/ids

# gt-Überschriften ohne Nav-Eintrag
rg -o '\sid="(gt-[^"]+)"' -r '$1' docs/index.html | sort -u | comm -23 - /tmp/nav
```

---

## 12. Storybook-Sidebar (`storybook-angular/src`)

Die Sidebar ist ein eigener Index neben `docs/index.html` (§11) und folgt einer eigenen Taxonomie.

**Die Regel.** Ebene 1 ist die Gruppe (dieselben sechs wie in §11). Ebene 2 ist die Sektion, benannt wie der Nav-Eintrag der Doku-Site. Ebene 3 sind ausschließlich echte Angular-Bauteile, Ebene 4 deren Stories. Abschnitte einer Seite gehören nicht in die Seitenleiste, sie stehen im Inhaltsverzeichnis rechts.

**Die Doku-Seite ist immer das erste Kind der Sektion.** Wer Stories direkt an die Sektion hängt, bekommt sie von Storybook vor die Unterordner sortiert und schiebt die Doku-Seite ans Ende; deshalb bekommt auch eine Sektion mit nur einem Bauteil eine Bauteil-Ebene (Beispiele: `Komponenten/Buttons/Button`, `Marke/Logo/Logo`).

**Vier Eigenheiten der Seitenleiste**, die jede Umstellung trifft (alle in Storybook 10.6 im Browser gemessen, nicht aus der Doku übernommen):

- Blätter stehen immer vor Ordnern desselben Knotens, `storySort.order` sortiert nur innerhalb dieser beiden Klassen.
- Eine eigenständige MDX-Seite ohne `name` heißt in der Seitenleiste wörtlich „Docs“; `title` ist der Ordnerpfad, `name` der Blattname.
- Ein Schrägstrich im Sektionsnamen ist ein Pfadtrenner. Für ein näher bestimmendes Trennzeichen den Mittelpunkt `·` nehmen, wie in §11.
- Ein Titel aus nur einem Segment wird zur Wurzel und rutscht über alle benannten Gruppen, unabhängig von `storySort.order`. Deshalb behalten auch Gruppen mit nur einer Seite (Beispielseiten, Referenzen) ihren zweistufigen Pfad.

**Sektions-Icons.** Die Seitenleiste zeigt vor jeder Sektion dasselbe Icon wie die Doku-Site, gerendert über `sidebar.renderLabel` im Manager aus `icons/icons.json`. Wer eine Sektion ergänzt, ergänzt dort das Icon mit.

---

## 13. Visual-Regression (`storybook-angular/visual-snapshots`)

Jede Story wird zusätzlich als Bild gegen eine eingecheckte Baseline geprüft (Gate `VISUAL=1`, Vitests `toMatchScreenshot`, Opt-out je Story über `parameters.snapshot.skip`). Die Bilder liegen unter `storybook-angular/visual-snapshots/<story-id>.png`.

**Baselines entstehen ausschließlich in der CI.** Sie sind pixelgenau an die Umgebung gebunden, in der sie aufgenommen wurden. Zwischen einer Entwicklermaschine und dem in `.github/workflows/visual.yml` gepinnten Playwright-Image unterscheiden sich Schriftrasterung *und* Glyphenbreiten — Beschriftungen wandern horizontal, die Bauteile mit ihnen. Lokal erzeugte Bilder sind deshalb lokal grün und in der CI rot, und zwar nicht an einzelnen Stories, sondern an fast allen.

**Der Ablauf**, wenn sich Snapshots berechtigt ändern:

```bash
gh workflow run visual.yml --ref <branch>
gh run download <run-id> -n visual-baselines -D storybook-angular/visual-snapshots
git add storybook-angular/visual-snapshots && git commit
```

**Lokal prüfen, ohne bestehende Baselines anzufassen:** `VISUAL=1 npm run test:vitest`, ohne `--update`, vergleicht gegen die eingecheckten Bilder und legt jede Abweichung als Ist- und Diff-Bild unter `visual-snapshots/__diff_output__/` ab. Das ist der Weg, um zu sehen, was sich geändert hat.

**Die Ausnahme: eine Story ohne Baseline.** Fehlt das Bild ganz, legt Vitest es auch ohne `--update` an, und zwar auf der lokalen Maschine. Es sieht nach einer regulär entstandenen Baseline aus, ist aber keine. Wer eine Story hinzufügt, holt deren Baseline wie jede andere aus dem CI-Artefakt und nimmt das lokal entstandene Bild vorher wieder aus dem Arbeitsverzeichnis. Der Guard greift hier nicht, der Visual-Job in der CI meldet es.

**`--update` verweigert lokal den Dienst.** `storybook-angular/visual-baseline-guard.mts` bricht ab, sobald `VISUAL=1` und `--update` zusammentreffen, ohne dass der Lauf sich als gepinnt ausweist (`VISUAL_BASELINES=pinned-ci`, gesetzt vom Erzeugungsschritt in `visual.yml`). Wer bewusst lokal erzeugen will, setzt `VISUAL_BASELINES=local-throwaway`; so entstandene Bilder gehören nicht in einen Commit.

**Toleranz:** höchstens 1 % der Bildpunkte *und* höchstens 150 Bildpunkte absolut, der strengere Wert gewinnt. Die Ratio allein ist zu locker, weil der Screenshot `document.body` ist und bei zentrierten Stories größtenteils leere Fläche zeigt; Begründung im Kommentar in `vitest.config.mts`.

**Die Fehldeutung, die diesen Abschnitt veranlasst hat:** Wenn ein *lokaler* Lauf flächendeckend Abweichungen meldet, hat sich nicht die Render-Umgebung geändert — der Vergleich findet nur am falschen Ort statt. Bevor jemand Baselines neu setzt oder Schwellwerte anhebt, ist die Gegenprobe billig: ein Ist-Bild aus dem `visual-diffs`-Artefakt des fehlgeschlagenen CI-Laufs gegen die eingecheckte Baseline halten (`cmp`). Sind die beiden bytegleich, rendert die CI unverändert und die Ursache liegt woanders.

---

## PR-Checkliste

- [ ] Nur Tokens verwendet (keine rohen Hex-/px-Werte ohne Begründung)
- [ ] Border/Trennlinien über `var(--bd)`, nicht rohes `-100`
- [ ] Typo aus der 16/14/12-Skala, keine Freihand-Größen
- [ ] In **Light und Dark** geprüft (Flächen-Stufen, Kontrast)
- [ ] Stufe A und AA erfüllt (Text 4,5:1 / UI 3:1), interaktive Elemente tastaturbedienbar; AAA optional und, wenn bewusst verfehlt, notiert
- [ ] `npm run check:contrast` und `npm run check:dark-states` grün; nach Layout-Änderungen den geänderten Bereich in **beiden Modi und zwei Breiten** ansehen (Kanten, Umbrüche, nicht nur Farbwerte)
- [ ] Deutsche Anführungszeichen, keine Gedankenstriche in Copy
- [ ] Doku in `index.html` ergänzt, `CHANGELOG.md` aktualisiert
- [ ] Nav-Eintrag gesetzt, kein Link ohne Ziel, keine Überschrift ohne Eintrag (§11)
- [ ] Geänderte Visual-Baselines stammen aus einem `visual-baselines`-Artefakt der CI, nicht aus einem lokalen `--update` (§13)
