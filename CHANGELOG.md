# Changelog

Alle nennenswerten Änderungen am Conciso Design System. Format nach
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[SemVer](https://semver.org/lang/de/).

Versionspolitik:
- **MAJOR** — Breaking Changes an der öffentlichen API (umbenannte/entfernte
  Klassen oder Tokens, geänderte Ladereihenfolge).
- **MINOR** — neue Komponenten/Tokens, abwärtskompatibel.
- **PATCH** — Bugfixes, Kontrast-/Dark-Mode-Korrekturen, Doku.

Releases werden als Git-Tags `vX.Y.Z` markiert.

## [Unreleased]

### Changed
- **Sektions-Rhythmus im Dark auf Light-Parität, Karten grenzen sich per Rand ab.** Im Dark werden
  `n-50`-Sektionen auf `bg-surface` gehoben, damit die Tonfolge dieselbe ist wie im Light. Für
  kartentragende Sektionen gab es dafür eine Ausnahme (`.ep-section-cards`), die die Hebung
  zurücknahm, damit die Karten die hellere Stufe bilden. Die Ausnahme kostet aber genau den
  Rhythmus: die Sektion sitzt dann auf dem Ton ihrer Nachbarn. Im Browser über die 24 Beispielseiten
  gemessen (133 Abschnitte, Chrome, `data-theme="dark"`): **63** verschmolzene Sektionsübergänge mit
  Rücknahme, **20** ohne, **17** im Light. Auf der Beispiel-Startseite: 1 gegen 0.
  Die Ausnahme entfällt daher komplett, samt Klasse und ihren 9 Vorkommen im Markup. Stattdessen
  tragen Karten im Dark einen Rand aus `--bd-strong-c` (**4,21:1** gegen die Kartenfläche):
  `.card`, `.ep-card` und `.ep-card-link`, letztere auch dann, wenn sie im Light `border:none`
  setzen und sich auf `--e1` verlassen. Das ist kein Notbehelf, sondern dasselbe Mittel, mit dem im
  Light die weiße Karte auf der weißen Sektion liest, dort mit 1,10:1. Auf `bg-page`-Sektionen
  kommt die Tonstufe dazu. Gegenprobe im Browser: keine Kartenfläche ohne Rand.
- **Schatten nur noch auf Karten, deren Fläche selbst klickbar ist.** `.card-elevated` setzte den
  Ruhe-Schatten `--e1` auf jeder Karte, auch auf `<article>`/`<div>`-Karten mit Buttons im Footer.
  Nach der Konvention „Elevation = Interaktivität" ist so eine Karte statisch: die Buttons sind die
  Interaktion, die Fläche führt nirgendwohin, und ein Ruhe-Schatten verspricht Klickbarkeit, die es
  nicht gibt. Der Hover-Lift war bereits auf `a.card-elevated` begrenzt, der Ruhe-Schatten nicht.
  Die Variante hängt jetzt komplett an `a.card-elevated`; eine statische Karte fällt damit auf
  `.card` zurück (flach, `--bd`-Rahmen) und kann den Schatten auch mit gesetzter Klasse nicht
  bekommen. Betroffen waren 9 statische `.card-elevated`-Karten (generische Karten, Referenz- und
  Themen-Karten der Beispielseiten), 6 Blöcke mit Inline-`box-shadow` (AI.Box-Preiskarten,
  Agenda-Karten, zwei Newsletter-Widgets) sowie `.cta-dl` und `.cta-visual`, die den Schatten aus
  dem CSS trugen. Alle behalten ihren Rahmen, die Kartenform bleibt. Die 44 Link-Karten
  (`<a class="card card-elevated">`) sind unverändert. In der Doku ersetzt die Zeile „Link-Karte"
  die bisherige Zeile „Elevation-Opt-in", die genau diesen Fall legitimiert hatte.
- **Angular-Card rendert flach.** `CardComponent` gab per Default `card card-elevated` auf einem
  `<article>` mit Footer-Button aus, also genau dieses Muster. Der `elevated`-Input entfällt (er
  wäre nach der CSS-Änderung wirkungslos), die Komponente rendert `<article class="card">`. Eine
  Link-Karten-Variante (`<a>` mit Ziel statt `<article>` mit Button) bleibt offen.
- **Bereichs-Chips waren im Dark dunkel-auf-dunkel.** `.chip[data-area]` setzte Rahmen und Text auf
  die dunklen Stufen (`-500`/`-600`/`-700` Rahmen, `-700`/`-800` Text), die im Dark nicht flippen:
  der Text stand zwischen **1,35:1** (es) und **2,36:1** (co) auf einer Karte, der es-Rahmen mit
  2,30:1 unter der 3:1-Schwelle für die Bedienelement-Grenze. Nur der *gedrückte* Zustand hatte
  Dark-Regeln. Jetzt wie überall im Dark die hellen Pendants: Text `-200` (es `-100`) mit 7,66 bis
  10,25:1, Rahmen `-300` mit 4,25 bis 9,48:1, Hover eine Stufe kräftiger. Betrifft 35 Chips in der
  Doku. `check:dark-states` sah das nicht, weil es Zustands-Regeln prüft, nicht Ruhezustände.
- **Karten-Varianten „Filled" und „Outlined" aus der Doku entfernt.** `.card-filled` und
  `.card-outlined` existierten nie, weder im CSS noch im Markup noch in der Angular-Lib. Die
  Varianten-Tabelle führt jetzt die zwei Zustände, die es gibt: statisch (`.card`) und Link-Karte
  (`a.card.card-elevated`). Die Do/Don't-Liste und der Abschnitts-Untertitel sind nachgezogen,
  ebenso zwei Aussagen zu einem „Tonal Overlay", das Karten nie gesetzt haben.
- **Drei rohe Bereichston-Rahmen ersetzt.** Die Pro-Preiskarte trug `1px solid var(--ki-200)`
  (im Light 1,27:1 gegen Weiß, im Dark eine leuchtende Haarlinie mit 10,25:1), jetzt `--bd`; die
  4-px-Oberkante und die „Empfohlen"-Pill tragen die Hervorhebung weiter. Die zwei
  Font-Specimen-Links nutzen jetzt die vorhandene `.chip`-Komponente mit `data-area` statt
  Inline-Rahmen, Inline-Radius und zwei `onmouseover`/`onmouseout`-Handlern für den Hover.
  `.chip` bekommt dafür `text-decoration:none`, damit es auch als `<a>` trägt.
- **Dark-Mode-Flächen neu aufgesetzt.** `--bg-page` trug mit `#333E48` nur **10,92:1** gegen Weiß.
  Die Material-Dark-Theme-Guidance fordert für die Basisfläche mindestens **15,8:1**; der Wert ist
  kein Stilmittel, sondern der Puffer, der Fließtext auch auf der höchsten Elevationsstufe noch
  4,5:1 sichert. Ursache war strukturell: `#333E48` ist `--tx-brand` aus dem Light Mode, also eine
  gegen Weiß optimierte **Textfarbe als Fläche**. Neu `#151A1F` (17,51:1), Farbwinkel 209 wie bisher,
  der Marken-Slate bleibt erhalten. `--bg-surface` `#3F4B56` → `#28323D`; die Stufe zwischen Seite
  und Karte wächst dabei von 1,223:1 auf **1,346:1**, weil mehr Kopfraum nach unten mehr Spielraum
  nach oben schafft. Gemessen über alle 24 Beispielseiten im Dark: **117 → 24 Kontrast-Verstöße**,
  die verbleibenden 24 sind ein vorbestehender, themeunabhängiger Befund am `.skip-link`
  (weiß auf `--co-500` = 2,31:1, in Light identisch, separat zu beheben). Der größte Block waren
  `--tx-muted` und Bereichstexte auf Karten, die mit 4,08:1 knapp unter AA lagen und jetzt bei
  5,95:1 liegen.
- **Getönte Flächen im Dark: `--XX-50` zerfällt in zwei Token.** Ein Wert kann zwei gegensätzliche
  Aufgaben nicht mehr tragen. Ein **großes Band** muss dunkler bleiben als die Karten darauf, eine
  **kleine Füllung** (Badge, Pill, Icon-Kachel) muss heller sein als ihr Grund, sonst liest sie
  nicht mehr als Fläche. Bei `bg-page` auf 17,5:1 und Schwarz bei 21:1 reicht der Spielraum für
  beides zusammen nicht. `--XX-50` ist jetzt die kleine Füllung (9,8:1, also 1,78:1 gegen die Seite
  und 1,32:1 gegen Karten), das neue `--XX-band` die Sektionsfläche (16,5:1, 1,06:1 gegen die Seite
  mit der Trennung über den Farbton, Karten darauf 1,27:1). Im Light sind beide identisch.
  Gemessen über 199 Badge- und Pill-Instanzen: die Fläche gegen ihren Grund stand nach der ersten
  Fassung bei **1,06:1** und damit praktisch nicht mehr da, jetzt bei 1,32 bis 1,79:1. Zum Vergleich
  der Stand vor dem gesamten Umbau: 1,29:1 im schlechtesten Fall. Sättigung auf 0,60 begrenzt, weil
  kräftig gesättigte Farbe großflächig auf dunklem Grund optisch vibriert.
- **Acht Inline-Rahmen nutzten rohes `--n-100` statt `--bd`.** Das verstößt gegen die eigene Regel in
  `CONTRIBUTING.md` § 5. Im Light sind beide Werte identisch, im Dark wird `--n-100` dunkel und der
  Rahmen stand mit **1,18:1** gegen die Kartenfläche, war also praktisch unsichtbar. Jetzt `var(--bd)`
  (2,99:1). Betraf `.card`-Elemente in der Doku, Light bleibt unverändert.
- **Snackbar-Flächen im Dark waren hartkodierte Kopien.** `.snack-ok` und `.snack-err` trugen
  `#052415` und `#220808`, also die alten Werte von `--c-success-bg` und `--c-error-bg`. Als die
  Status-Tints angehoben wurden, blieben die Kopien zurück und standen nur noch **1,06:1** bzw.
  **1,08:1** gegen die Seite, die Snackbar war als Fläche praktisch weg. Jetzt über die Token
  (1,78 und 1,79:1). Zusätzlich zählt die Snackbar zu den schwebenden Panels und bekommt im Dark
  denselben `--bd-strong-c`-Rand wie Menüs (5,66:1 gegen den Grund); das deckt auch die
  Default-Variante ab, die mit `--n-700` nicht mitflippt und bei 1,23:1 lag.
- **Schwebende Panels bekommen im Dark einen stärkeren Rand.** Menüs und Popover grenzen sich im
  Light über `--e3` ab. Auf der tiefen Basisfläche trägt ein schwarzer Schatten das nicht mehr: ein
  geöffnetes Topnav-Menü stand über dem Hero-Foto nur noch **1,34:1** gegen die hellste Stelle
  daneben (vorher 1,92:1), weil die Panel-Fläche mitgesunken ist, das Foto darunter aber nicht.
  Eine dritte statische Flächen-Stufe wäre der Material-Weg, würde aber die Zwei-Stufen-Konvention
  brechen und einem Menü über einer Karte nur 1,13:1 bringen. Stattdessen übernimmt der Rand:
  `--bd-strong-c` statt `--bd-c` für `.ep-nav-sub`, `.ep-select-menu`, `.ep-combobox-menu` und das
  Suchpanel. Panel-Rand gegen den Untergrund 3,51 auf **4,95:1**, damit über dem Ausgangsstand
  (4,15:1). Neu dafür `--bd-c` / `--bd-strong-c`, die reinen Rahmenfarben: `--bd` und `--bd-strong`
  sind Shorthands und funktionieren in `border-color` nicht.
- **Platzhalter in Formularfeldern erfüllen AA.** `.field` hatte keine `::placeholder`-Regel, es griff
  Chromes Default `rgb(117,117,117)`: im Dark **2,82:1** und damit ein Verstoß, im Light 4,61:1 und
  damit knapp bestanden, aber ohne Reserve und vom Browser abhängig. Jetzt `--tx-secondary` wie bei
  Suchfeld, Footer-Newsletter, Combobox und Nav-Suche, die das längst taten; die Standard-Felder
  waren der Ausreißer. Gemessen über 22 Felder: Dark 7,13:1, Light 6,29:1.
- **Zwei Download-Buttons trugen im Dark dunklen Text auf dunkler Fläche** (3,51:1). Sie setzten die
  Bereichsfarbe inline (`--c500:var(--co-700)`) statt über `.btn-co`. Die Dark-Regel für die Fläche
  hängt an der Bereichsklasse, die für die Textfarbe an `.btn-filled`; ohne Klasse greift nur die
  zweite. Jetzt `class="btn btn-filled btn-co"`, die inline gesetzten `--c600`/`--c700`/`--c900`
  waren ohnehin tot (nirgends in `css/` referenziert). Vorbestehend, Light war nicht betroffen.
- **Fehler-Badge-Text im Dark auf `#FFA5A5`.** `#F08080` trug auf der aufgehellten Fehler-Füllung
  nur 3,78:1. Damit nutzen `--badge-err-text`, `--cbadge-fail-text` und `--c-error` denselben Ton,
  eine Fehlerfarbe weniger im System.
- **`--c-warning-bg` war im Dark unsichtbar.** `#231800` stand mit 1,00:1 gegen die neue Seite. Alle
  drei Status-Tints und die drei Kontrast-Badge-Flächen auf die Tint-Stufe gehoben.
- **Ränder im Dark nachgezogen.** Auf der tieferen Seite sprang `--bd` von 3,19:1 auf 5,12:1 und
  wirkte drahtig, jetzt `#6F7A89`. `--field-border` von `--n-200` (11,46:1) auf `#869C9C`; als
  einzige Grenze, die WCAG 1.4.11 zwingend braucht, liegt es mit 4,49:1 auf der Karte sicher über 3:1.
- **Logo-Platte im Dark gedämpft.** Eine reinweiße Fläche dieser Größe stand mit 17,51:1 gegen die
  Seite. Über das neue `--bg-plate` im Dark auf `#E8EDED`; dunkle Kundenlogos darauf 14,73:1.
- **Fotos im Dark leicht gedämpft** (`filter: brightness(.92)` auf `.hero-image-media`,
  `.ep-media-band`, `.article-figure`). Nicht zu verwechseln mit dem verworfenen
  `brightness(.75)` auf Icon-Glyphen: das betraf Strichgrafik auf getönten Kacheln.
- **Fokusringe folgen jetzt `var(--bg-page)`** statt einem hartkodierten `#333E48` und laufen bei
  künftigen Flächen-Änderungen automatisch mit.
- **Drei hartkodierte Kopien im Dark auf ihre Token gezogen.** Sie hielten Werte, die die
  Flächen-Umstellung ersetzt hat, und liefen dadurch aus der Familie:
  `.a11y-rule-icon` trug die Kreisflächen als `#052415` / `#220808` und stand damit bei 1,06:1 bzw.
  1,08:1 gegen die Seite, der Kreis war keine Fläche mehr (jetzt `--c-success-bg` / `--c-error-bg`,
  1,78 und 1,79:1; der Fehler-Glyph geht mit auf `--c-error`, 5,21:1 statt 3,78:1).
  Der Chip-Rahmen hielt den alten `--bd`-Wert `#818C99` (jetzt `--bd-strong-c`, 4,21:1 gegen die
  Chip-Fläche; `--bd-c` wäre mit 2,99:1 unter der 3:1-Schwelle, die die Bedienelement-Grenze nach
  WCAG 1.4.11 braucht). Der Tonal-Button-Rahmen hielt den alten `--bd-strong`-Wert `#9DA8B6`
  (jetzt `--bd-strong-c`, 3,64:1 bis 4,87:1 auf den vier Tonal-Füllungen).

- **Skip-Link erfüllt AA.** Weiß auf `--co-500` `#00BEBE` trug **2,31:1**. In Ruhe ist der Link
  geclippt, beim Fokus springt er sichtbar herein, also genau dann kaputt, wenn Tastaturnutzende ihn
  brauchen. Jetzt `--co-700` (5,52:1), dieselbe Füllfarbe, die `.btn-filled.btn-co` verwendet.
  Betraf beide Modi, `--co-*` flippt nicht.
- **Hero-Scrim verdichtet.** Der Text liegt zwischen 23 % und 77 % der Caption-Höhe, der Eyebrow als
  erstes Kind damit im obersten, schwächsten Abschnitt des Verlaufs. Dort stand er auf Alpha 0,30,
  über einem ausgebrannt hellen Foto sind das 1,90:1; gemessen lagen bis zu **63 % der
  Eyebrow-Fläche** unter 4,5:1. Der `text-shadow` hilft optisch, zählt für WCAG nicht. Die
  Unterkante bleibt unverändert bei `.85`, verdichtet wird nur der obere Teil
  (`.72` bei 60 %, `.66` bei 80 %). Bei 77 % jetzt Alpha 0,67 = 6,0:1 gegen ein weißes Foto.
  Pixelgemessen über 51 Textblöcke auf 17 Seiten: Blöcke mit über 10 % Fläche unter 4,5:1 gehen von
  **17 auf 0** (Light) und von 13 auf 0 (Dark).
  Der erste Anlauf dafür erfüllte zwar alle Kontrastwerte, zeichnete aber eine sichtbare Linie quer
  durchs Bild: er baute die Deckkraft auf zu kurzer Strecke auf. Gemessen an der zweiten Ableitung
  der Zeilenhelligkeit lag er bei 21 bis 25 gegenüber 7,9 beim vorherigen Verlauf. **Mehr
  Stützstellen halfen nicht** (eine weiche Kurve mit neun Stops maß 22,4). Gelöst über eine längere
  Auslaufstrecke: die Caption bekommt oben eine fluide Polsterung bis 96 px, der Verlauf läuft mit
  0,0066 Deckkraft pro Pixel aus und misst 9,2. Der Faustwert dazu steht jetzt in der Bildsprache.
- **Code-Kommentare erfüllen AA.** `.cb-body .c` stand mit `--n-400` auf dem `--n-50`-Grund bei
  3,65:1, jetzt `--tx-muted` (Light 4,51:1, Dark 8,9:1). Die Terminal-Variante hat einen fest
  dunklen Grund in beiden Modi und behält deshalb `--n-400` (4,87:1) über eine eigene Regel.
- **Scrim-Empfehlung in der Bildsprache korrigiert.** Die Doku nannte `rgba(0,0,0,.45)` und
  widersprach damit ihrer eigenen Regel darüber: über einer ausgebrannten Bildstelle trägt das nur
  rund 3:1. Neu mindestens `.60` für weiße Schrift, gerechnet gegen die **hellste** Stelle unter dem
  Text statt gegen den Bilddurchschnitt, und bei Verläufen an der Position des Textes statt am
  dichten Ende. Genau diese Lücke hatte den Hero-Befund erzeugt.

### Added
- **`--bg-surface-hover`** (Light `var(--bg-surface)`, Dark `#2E3B46`): Auf der tieferen Basisfläche
  tragen die schwarzen `--e*`-Schatten weniger, deshalb hebt der Hover interaktiver Karten
  zusätzlich die Fläche. Ein Zustand, keine dritte statische Flächen-Stufe.
- **`--bg-plate`** (Light `#FFFFFF`, Dark `#E8EDED`): helle Platte unter Fremd-Assets, die nur in
  einer dunklen Fassung vorliegen (Kundenlogos).
- **Druckausgabe:** `dark-mode.css` steht jetzt komplett in `@media screen`, Token-Block und
  Komponenten-Regeln. Eine Seite mit `data-theme="dark"` druckte bisher die volle dunkle Fläche;
  jetzt greifen die Light-Werte aus `tokens.css`, ohne dass sie ein zweites Mal gepflegt werden.
  Die Komponenten-Regeln müssen mit hinein: 183 von ihnen setzen eine helle Tint- oder Festfarbe
  (`co-200`, `ki-200`, `es-100`, heller `tx-primary`), die auf dem hellen Druckgrund 1,2 bis 1,9:1
  trägt; ein geschützter Token-Block allein hätte den Text genau dort verloren, wo eine eigene
  Dark-Regel greift. Neue Dark-Regeln gehören innerhalb des Blocks, sonst drucken sie dunkel mit.
- **CI-Gate gegen dunkel-auf-dunkel-Zustände** (`npm run check:dark-states`, in `css-core.yml`):
  Prüft jede `:hover`/`:focus`/`:active`-Regel in `components.css` darauf, ob sie einen nicht
  theme-awaren Ton setzt, dessen Kontrast gegen die dunklen Grundflächen unter der WCAG-Schwelle
  liegt (4,5:1 für Text, 3:1 für Ränder), ohne dass `dark-mode.css` nachzieht. Gerechnet wird echter
  Kontrast, nicht die Stufennummer: `--co-500` ist `#00BEBE` und trägt im Dark, `--wo-800` ist
  `#183A0E` und nicht. Auf dem Stand vor diesem Commit hätte der Check **acht** Verstöße gemeldet.
  Bewusste Ausnahmen stehen mit Begründung im Skript, aktuell keine.
  Dazu ein zweiter Check gegen **zerrissene Füllung/Text-Paare**: Eine Regel, die Hintergrund und
  Textfarbe gemeinsam setzt, trägt ihren Kontrast selbst, aber nur solange das Paar zusammenbleibt.
  Überschreibt eine andere Regel nur eine Hälfte, entsteht genau der Fehler, den der erste Check nicht
  sieht. Der zweite bildet dafür die Kaskade je (Element, Theme, Zustand) nach und prüft die
  tatsächlich gewinnende Kombination — paarweises Vergleichen reichte nicht, weil im Dark oft eine
  spezifischere Regel den Text längst überschrieben hat.
  Er hat sofort zwei Fehler gefunden, die von Hand durchgerutscht waren: die zu breite Chip-Inversion
  und einen Icon-Hover auf `var(--n-100)`. Letzterer entlarvte eine falsche Annahme im ersten Check:
  Tokens aus dem Dark-Block galten als „theme-aware und damit unkritisch", aber die Neutrals kippen
  dort auf **dunkle** Werte (`--n-100` = `#1C2E2E`). Der Check wertet Tokens jetzt mit dem Wert aus,
  den sie im Dark tatsächlich annehmen.
- **Personengruppe mit Bio** (`.author-card-group.is-grid`): Zweispaltige Variante der bestehenden
  Author-Card-Gruppe für zwei bis vier Personen mit Kurz-Bio, gedacht für die Trainer:innen einer
  Seminar- oder Training-Landing. Die Karten selbst bleiben unverändert; die Variante setzt nur das
  Raster (960 px Container, `minmax(0,1fr)` gegen Grid-Blowout, mobil einspaltig ab 768 px) und zieht
  die gemeinsame `.author-card-group-eyebrow` per `:has()` auf dieselbe Breite. Dokumentiert mit einer
  Regel an der Personenzahl: 1 Person groß mit 4:3-Bild, 2 bis 4 im Raster, darüber das
  Team-Tile-Grid ohne Bio. Dokumentiert unter *Seminar & Training · Trainer:innen*, nicht bei der
  Author Card: Trainer:innen kommen nur auf Seminar- und Training-Landings vor. Live auf der Beispielseite *Scrum Trainings*, deren Trainer:innen-Sektion
  bisher nur einen Platzhaltertext ohne Personen trug.
- **Komponente „Buchungsformular"** (`#sec-booking`, Klassen `.bk-*`): verbindliche Terminbuchung als
  Komposition aus `.field`-Feldern, am Beispiel eines Seminars. Erste Formular-Komponente mit
  **bedingten Feldblöcken** (Firma vs. Privatperson, abweichende Rechnungsadresse: `hidden` statt
  `disabled`, `required` wird über `data-required` mitgeschaltet) und einem **Teilnehmenden-Repeater**
  (Anzahl als führendes Feld, Namensblöcke folgen, Schutz vor stillem Datenverlust beim Verringern,
  „Ich nehme selbst teil" belegt Block 1 vor). Live-Preiszeile und Anzahl als `role="status"`, Fehlerübersicht `.bk-errors` mit Sprunglisten,
  `autocomplete`-Sections je Block, feldspezifische Fehlermeldungen über `data-err`.
  Informationshierarchie in drei Stufen: Gruppe `--ty-title-sm` (20 px) mit Haarlinie, Untergruppe
  (`.bk-subgroup`/`.bk-sublegend`) `--ty-name` (14 px), Feldlabel 12 px Versalien. Eine Gruppe ist
  eine Entscheidung samt ihrer Folgen, bedingte Blöcke liegen als Untergruppe **in** der Gruppe
  ihres Auslösers statt daneben. Preiszeile zweimal (bei der Anzahl mit `role="status"`, stumm über
  dem Submit); nur Pflichtsternchen ohne zusätzliche „(optional)"-Marker; freiwilliges
  Contentletter-Häkchen von den Pflicht-Bestätigungen abgesetzt.
  **Bestellübersicht** (`.bk-order`) unmittelbar vor dem zahlungspflichtigen Button: Leistung,
  Termin, Auftraggeber, Plätze und Gesamtbetrag, live aus dem Formular. Noch leere Zeilen bleiben
  stehen und tragen `data-empty`, damit sichtbar ist, was fehlt, statt dass die Übersicht springt.
  Dazu der Abschnitt **„Für die Umsetzung"**: Anforderungen an die Produktivfassung, allen voran
  ein Zwischenspeicher gegen Datenverlust (Schlüssel, Speicherort, Wiederherstellungsreihenfolge,
  `beforeunload`-Regel), sowie serverseitige Validierung, Platzkontingent, Doppel-Submit und Spam.
  Dazu ein Entscheidungs-Abschnitt „Anfrage oder Direktbuchung", der das Formular gegen die adaptive
  Kontaktseite abgrenzt; die Beispielseite Seminar bleibt bewusst beim Anfrage-Flow.

- **Bereichs-Varianten für das Segmented Control** (`.seg-ki`, `.seg-es`, `.seg-wo`): Die Füllung des
  gewählten Segments läuft jetzt über `--seg-fill`/`--seg-on` statt fest über `--co-700`, analog zum
  `--c500`-Muster der Buttons. Default bleibt Corporate, bestehende Verwendungen ändern sich nicht.
  Im Dark Mode kippt jede Variante auf ihren `-300`-Ton mit `-900`-Text.

- **Doku · Abschnitt „Responsive"** (`#sec-responsive`): Übergabe-Spezifikation der Responsive-Strategie
  als eigener Foundations-Abschnitt (bisher nur implizit im CSS + verstreut). Verbindliche 3-Stufen-Breakpoints
  (Phone ≤ 520 · Mobile ≤ 768 · Tablet 769 bis 1024 · Desktop > 1024), Begründungen der nicht offensichtlichen
  Bruchpunkte (520 vs. 768 bei Hero-CTAs, auto-fit vs. fix-spaltig, Hamburger ≤ 760, Doku-Sidebar ≤ 1024),
  fluide Typo-Tokens (clamp, min ≥ 20 px, unitless Ratio) und vollständiges Komponenten-Inventar mit CSS-Quelle.
  Plus Hinweise, was auf der echten Site übernommen werden muss vs. was mockup-gebunden ist.
- **Angebots-Detailseiten (Beispielseiten)**: Fünf neue Landingpages für einzelne Angebote unterhalb der
  Bereiche, jeweils an den Bereich gebunden. Wirksame Organisationen: „Erste Hilfe bei Meetingflut"
  (Festpreis 3.600 €), „Scrum Trainings" (Preiskarten Scrum.org/TÜV SÜD), „Lean Portfolio Management"
  (Beratung ohne Festpreis). Effektive Software: „Identity mit Keycloak" (mit YouTube-Embeds) und
  „Keycloak-Erweiterungen" (Festpreis 9.900 €). Die Bereichs-Tabs (ES, WO) sind dafür zu aufklappbaren
  Baum-Tabs geworden; die „Konkrete Themen"-Einträge der Bereichsübersichten verlinken jetzt auf die Seiten.
- **Video-Embed (Beispielseite Identity mit Keycloak)**: Zwei responsive YouTube-Embeds
  (`youtube-nocookie.com`, 16:9 via `aspect-ratio`, `title`, kein Autoplay, `loading="lazy"`). Referenzen
  (Social Proof) direkt nach der Lösung plus Mid-Page-CTA; Abschnitts-Hintergründe neu alterniert.
- **Doku · Page-Pattern „Angebots-Detailseite"** (`#sec-leistung-detail`): Aufbau (Sektionsreihenfolge nach
  Funnel-Logik), Angebots-Box (Festpreis-Box + „Für wen"), Preismodelle (Festpreis / mehrere Pakete /
  Beratung ohne Festpreis), Cross-Links und Verwendung (Do/Don't).
- **Doku · Barrierefreiheit „Video-Embed"** (`#gt-a11y-video`): `title`, Untertitel (WCAG 1.2.2),
  Transkript/Audiodeskription, kein Autoplay, responsiv, Datenschutz, Sprach-Kennzeichnung, Tastatur;
  inklusive Abgrenzung, was das DS liefert vs. was die Videoquelle liefern muss.
- **KI-Wissensbeitrag (Beispielseite): Contentletter- + LinkedIn-CTA**: Nach „Weiterlesen" und vor dem
  finalen CTA-Band ein „Dranbleiben"-Block als offene Feature-Liste (`.ep-feature`, zwei `col-6`): „Food
  for your brain!" (Contentletter-Anmeldung) und „Stay connected!" (LinkedIn-Folgen, externer Link mit
  `target="_blank"`/`aria-label`). Bewusst als flache Feature-Liste statt Karte/Band, um sich vom Download-
  `.cta-dl` darüber abzuheben, ohne die Seite weiter zu verkasten. Corporate-Akzent (unternehmensweit).
- **`.card-cta-link` als echter Link nutzbar**: `a.card-cta-link` ohne Default-Underline (Underline erst
  bei Hover), sichtbarer Fokus-Ring; gescoped auf `a[…]`, damit die `<span>`-Nutzung in klickbaren
  `.ep-card-link`-Karten unberührt bleibt.
- **Farb-Swatches: Hex-Anzeige + Klick-zum-Kopieren** (Doku): In der Tonal-Palette (`#sec-colors`)
  zeigt jeder Swatch zusätzlich zum Stufen-Label seinen Hex-Code (kontrastgleich zur Stufen-Schrift,
  für die Nutzung in anderen Gestaltungsmitteln). Jeder Swatch und jede Farb-Clip-Card kopiert per
  Klick oder Tastatur (Enter/Space) den Hex in die Zwischenablage (`navigator.clipboard`, Fallback
  `execCommand`). Barrierefrei: `role="button"`, `tabindex`, `aria-label`, sichtbarer Inset-Fokus-Ring
  (nicht vom `overflow:hidden` der `.pal-row` abgeschnitten), `aria-live`-Bestätigung + „✓"-Overlay.
  In den schmalen Bereichs-Übersichtskarten (`#sec-areas`) bleibt der Hex aus Platzgründen im
  title-Tooltip, Kopieren funktioniert dort ebenso.
- **Icon-Bibliothek** als maschinenlesbarer Export: `icons/icons.json` · `icons.js`
  (kompletter `<svg>`-Body pro Key, `currentColor`, Stil-Markierung `solid`/`outline`,
  `viewBox`, Verwendungskontext) + kuratierte Quelle `icons/source/*.svg`, generiert via
  `scripts/build-icons.mjs` (`npm run build:icons`, jetzt Teil von `npm run build`).
  Neue Exports `@conciso/design-system/icons` · `/icons.json`; Mapping/Consumption in
  `icons/README.md`. Vier Solid-Bereichs-Glyphen (`ki-bot`, `es-window-check`,
  `wo-network`, `co-building`) + generische Outline-UI-Icons.
- **Dropdown-Komponenten**: `.ep-select` (Custom Select mit Listbox-A11y, Bereichs-Akzent)
  und `.ep-combobox` (Tipp-Filter über langen Listen; `.is-multi` für Multi-Select mit
  entfernbaren Chips), inkl. Lösch-Button und Filter-Reset beim Schließen.
- **Topnav-Aktionen**: Such-Popover (Disclosure, A11y) + Light/Dark-Umschalter
  (`aria-pressed`, synchron mit dem Sidebar-Switch), per JS in jede `.ep-topnav` injiziert.
- **Responsive Grid-Marker** für gezielt mehrspaltige Mobile/Tablet-Layouts (statt der
  einspaltigen Default-Kollabierung): `data-team-tiles` (2×2), `data-team-roster` (2 Spalten
  ≤ 520 px / 3 Spalten 521–768 px), `data-benefits` und `data-event-meta` (2×2 auf Tablet /
  1-spaltig ≤ 520 px). Alle auf `.layout-grid` gesetzt.

- **Editoriale „Im Detail"-Sektion** auf der Beispielseite Wirksame Organisationen: offene
  Feature-Liste (`.ep-feature`, Alternative zu Karten) mit bis zu 8 Themen-Landingpages, Status
  über die Aktionszeile (Link „Zur Landingpage" bei verfügbaren, „Landingpage folgt" bei in-Aufbau,
  ohne toten Link), plus content-breites Akzentbild als Sektions-Auftakt.
- **Bereichsvariante `.card-cta-link[data-area="co|ki|es|wo"]`**: färbt den Text-CTA-Link in der
  Akzentfarbe statt Corporate-Teal (Shades wie `.ep-card-cta`), inkl. Dark-Overrides (`-200/-100`).

### Changed
- **Preis und Rahmendaten stehen jetzt direkt nach dem Hero** (Beispielseite Seminar): Die
  Lernziele-Sektion ist zweispaltig geworden, links die Bullet-Liste (`.col-8`), rechts der
  Angebots-Kasten (`.col-4`, sticky). Gemessen rückt der Preis von **45 % auf 10 %** der Seitenhöhe.
  Bewusst kein neuer Streifen unter dem Header, sondern der vorhandene Kasten neben dem ersten Inhalt.
  Das Kontaktformular bleibt, wo es war, bei „Inhalte & Voraussetzungen"; beide Kästen tragen dadurch
  je eine Aufgabe. Dazu eine Zwei-Spalten-Variante der Rahmendaten (`.ep-facts.is-grid`): Einspaltig
  war der Kasten 470 px hoch gegen 256 px Inhalt daneben, also 214 px Leerraum. Zweispaltig sind es
  299 px und 43 px Leerraum. Die Variante verzichtet auf die Haarlinien und wird über `auto-fit` in
  schmalen Kästen von selbst wieder einspaltig.
- **Fakten-Streifen aufgelöst, Angaben ziehen in den vorhandenen Kasten** (`.ep-facts`): Der flache
  Key-Facts-Streifen unter dem Hero entfällt auf allen vier Angebots-/Seminar-Landings. Die Angaben
  bleiben vollständig erhalten und stehen jetzt dort, wo über das Angebot entschieden wird, statt an
  zwei Stellen. Neu ist dafür `.ep-facts`, eine einspaltige `<dl>` aus Label/Wert-Paaren
  mit Haarlinie dazwischen, **ohne eigenen Rahmen**: sie zieht in einen Container ein, den die Seite
  schon hat (Angebots-Box, Sticky-Sidebar), sonst entstünde Kasten im Kasten. Damit verschwinden auch
  die viermal kopierten Inline-Styles des alten Streifens.
  Pro Seite: *Seminar* → Dauer, Format, Gruppe und Sprache in die Sticky-Sidebar (der dortige separate
  Sprache-Block entfällt, die Dublette zum Streifen ist damit weg). *Meetingflut* und
  *Keycloak-Erweiterungen* → **keine** Liste, ihre Angebots-Box nannte Laufzeit, Leistung, Ergebnis und
  Preis bereits vollständig, der Streifen war dort reine Dopplung. *Scrum Trainings* → eigener Kasten
  einmal über den vier Preiskarten, weil die Angaben für alle vier gelten und die Seite keine
  Angebots-Box hat.
- **`data-accent` ist nicht mehr an `.ep-page` gebunden**: Die Akzent-Regeln für `.t-co` und
  `.body-link` sowie die Chrome-Resets für Footer und Topnav laufen jetzt über `[data-accent="…"]`
  statt `.ep-page[data-accent="…"]` (Light und Dark). Damit kann auch ein einzelner Block einen
  Bereichs-Scope aufspannen, etwa ein Buchungsformular, eine Anmeldesektion oder ein
  Bereichsformular in einer sonst corporate Seite, ohne Inline-Bereichsfarben an den Links (die im
  Dark-Mode brechen würden). Abwärtskompatibel: die bestehenden `.ep-page[data-accent]`-Seiten
  treffen den neuen Selektor unverändert.
- **Topnav: Submenüs öffnen zusätzlich per Hover**: Auf Geräten mit echtem Hover (`pointer:fine`) klappt
  das Submenü jetzt auch beim Überfahren des Top-Items auf (JS-gesteuert, kurzer Intent-Delay beim Öffnen,
  verzögertes Schließen + unsichtbare Brücke über den Gap → WCAG 1.4.13 „hoverable/dismissible/persistent").
  Klick/Tap, Tastatur und Touch bleiben unverändert; der Label-Klick navigiert weiterhin direkt zur
  Übersicht (kein erzwungener 2-Klick). Der Reveal hängt weiter an `.is-open` (kein reines CSS-`:hover`),
  `aria-expanded` läuft mit, `closeAllNavItems` verhindert zwei gleichzeitig offene Menüs. Escape schließt
  jetzt auch ein rein per Hover geöffnetes Menü.
- **Topnav: Top-Level-Parents als Link zur Übersicht (Split „Link + Caret-Disclosure")**: „Angewandte KI",
  „Leistungen" und „Unternehmen" sind jetzt echte `<a>`-Links auf ihre Übersichtsseite (`data-ep` = erstes
  Submenü-Ziel), statt reiner Aufklapp-Buttons. Ein **separater Caret-`<button>`** (`.ep-nav-item-toggle`,
  `aria-expanded`/`aria-controls`) öffnet das Submenü per Klick/Tastatur. UX: 1 Klick zur Übersicht statt
  Umweg über den „Übersicht"-Dropdown-Eintrag; A11y: eigene Caret-Hit-Area ≥ 24 px (WCAG 2.5.8) + Fokus-Ring,
  mobil Link + Caret in einer Zeile mit ≥ 44 px Tap-Fläche. Der nicht-farbige Aktiv-Unterstrich (WCAG 1.4.1)
  sitzt jetzt am Parent-Link. Über alle Beispielseiten + Doku (`#gt-nav-topnav`) konsistent umgesetzt.
- **KI-Wissensbeitrag „Weiterlesen": aktuelle Artikel-Cards** statt der alten `.ep-card`-Textkarten:
  jetzt `.card.card-elevated` mit 16:9-Bild, `.pill`-Bereichslabel, `.card-title` und gepinntem
  `.card-cta-link`, im `.layout-grid` (col-4) — identisch zur Beitragsübersicht (`ep-wb-uebersicht`).
- Topnav-Icon-Buttons und Hamburger auf 48 × 48 px (Touch-Target AAA, WCAG 2.5.5).
- Icon-Doku (`#sec-icons`): Solid-Bereichs-Glyphen vs. Outline-UI-Icons klargestellt
  (vorherige „nur Outline"-Aussage war unzutreffend); Verweis auf die Icon-Bibliothek.
- **Headline/Display-Tokens fluid**: `--ty-headline-xs/sm/md` und `--ty-display-sm/md` nutzen
  jetzt `clamp()` mit unitless Ratio-Zeilenhöhe (Mirror von `--ty-display-lg`). Desktop-Maxima
  unverändert, Minima ≥ 20 px greifen am Phone. Typografie-Doku entsprechend aktualisiert.
- **Responsive-Überarbeitung der Beispielseiten** (3 Stufen: ≤ 520 px Phone · 521–768 px Tablet ·
  > 768 px Desktop):
  - Section-Innenabstand mobil 32 → 24 px (`--s6`); Hero-CTAs stapeln full-width erst ≤ 520 px
    (vorher 768 px, lief auf Phablet zu breit).
  - `.layout-grid` setzt beim Kollabieren die `col-N`-Spannweiten zurück, sodass ungleiche Splits
    (z. B. `col-7`/`col-5`) gleich breit stapeln (vorher wurde das Bild schmaler).
  - Mobile-Topnav: Burger als äußerstes rechtes Element (kein Positionssprung beim Öffnen).
  - `.team-voice` mobil als Pull-Quote (Quote-Icon im linken Gutter statt eigener Zeile);
    `.card`-`min-height` (2lh/3lh, nur für Grid-Gleichhöhe) entfällt einspaltig; `.ep-award-list`
    als 2×2 statt versetztem Flex-Wrap; `.article-avatar-xl` mobil spaltenrelativ (max. 112 px).
- **Doku-Shell**: `.ds-sidebar` wird ≤ 1024 px ausgeblendet (Content full-width), damit die
  Beispielseiten die echte Fensterbreite einnehmen und ihre viewport-`@media`-Queries korrekt
  greifen — Voraussetzung für faithful Mobile/Tablet-Vorschau.
- **Effektive-Software-Hero**: neues, thematisch passenderes Motiv (Entwickler, Laptop-Sticker
  Clean Code / Keycloak / Jakarta EE / Docker); web-optimiert (5000 px/5,1 MB → 2000 px/411 KB).
- **Typografie durchgängig rem-basiert (WCAG 1.4.4 „Resize Text")**: Alle `--ty-*`-Tokens, die
  15 `.type-*`-Utilities und die hartcodierten Schriftgrößen in `base.css`/`components.css` von
  `px` auf `rem` umgestellt (Basis `1rem = 16px`). Die fluiden `clamp()`-Tokens nutzen jetzt
  `rem`-Min/Max und einen `rem + vw`-Mittel-Term (Zwei-Anker-Fluid-Kurve), sodass Schrift auch
  auf die Browser-Standardschriftgröße reagiert, nicht nur auf Seiten-Zoom. `body` von `16px`
  auf `1rem`. Desktop-Rendering pixelidentisch (Maxima unverändert). Ausnahme: SVG-Text
  (`.bw-label-*`) bleibt px (skaliert übers `viewBox`). Token-Exporte via `npm run build:tokens`
  regeneriert. Neuer Doku-Abschnitt zur medienübergreifenden Nutzung (Web/Print/PowerPoint, px↔pt).

### Fixed
- **Seminar-Sidebar in zwei Kästen geteilt**: Seit dem Umzug der Rahmendaten trug der eine Kasten zwei
  Aufgaben, Nachschlage-Information und Kontaktformular, und die Formular-Überschrift saß als gefüllter
  Bereichsbalken mitten im Element. Das las sich wie zwei zusammengeklebte Karten. Jetzt zwei Kästen mit
  Abstand: oben Angebot und Rahmendaten, darunter das Formular mit seinem Balken dort, wo eine
  Kartenüberschrift hingehört. Sticky-Verhalten und Formular unverändert.
- **Rohe `var(--n-200)`-Rahmen auf `var(--bd-strong)` umgestellt** (Seminar-Sidebar, adaptive
  Kontaktseite, vier Stellen): `--n-200` flippt im Dark nicht und ergab dort einen grellen `#C9D3D3`-Rahmen.
  `--bd-strong` ist im Light derselbe Ton, im Dark `#9DA8B6`. Entspricht der Konvention „nie rohes
  `-100`/`-200` als Border".
- **Falsches Bereichs-Icon auf fünf Verweiskarten**: Karten, die auf eine Bereichs-Übersicht
  verlinken, tragen das Marken-Glyph des Bereichs (`ki-bot`, `es-window-check`, `wo-network`,
  solid, eingefärbt über `.ep-card-icon.t-XX`). Zehn Karten hielten sich daran, fünf nicht: die
  „Weiter im Thema"-Blöcke der Angebots-Detailseiten (Meetingflut, Scrum, LPM, Keycloak,
  Keycloak-Erweiterungen) zeigten ein generisches Heroicon mit inline gesetztem
  `stroke="var(--XX-700)"` statt des Glyphs. `icons/README.md` hatte die Regel nur für
  `/leistungen` und die Landingpage notiert; sie hängt jetzt am Anlass statt an einzelnen Seiten,
  mit ausdrücklicher Abgrenzung zu den thematischen Outline-Icons inhaltlicher Karten.
- **Hover bereichsgetönter Body-Links war im Dark Mode unlesbar**: In einem `data-accent`-Container
  sprang `.body-link:hover` auch im Dark auf den `-800`-Ton, also dunkel auf dunkel. Gemessen:
  `wo-800` auf `bg-page` = **1,17:1**, `es-800` = 1,29:1, weit unter der AA-Schwelle von 4,5:1. Der
  Link verschwand beim Überfahren praktisch. Ursache: Die Light-Regel `[data-accent="wo"]
  .body-link:hover` hat dieselbe Spezifität wie die Dark-Grundregel, und `components.css` wird nach
  `dark-mode.css` geladen. Für den generischen `.body-link:hover` gab es den Dark-Override bereits,
  für die drei Bereichsvarianten fehlte er. Jetzt ergänzt (`-100`, also heller statt dunkler, analog
  zur bestehenden Regel): `wo-100` = 8,4:1, `es-100` = 7,6:1, `ki-100` entsprechend.
  Ein systematischer Durchgang durch **alle** `:hover`-Regeln mit dunklen Tokens fand denselben Fehler
  ein zweites Mal: der Chrome-Reset `[data-accent] .footer .body-link:hover` sprang im Dark auf
  `co-800`, **1,97:1** → jetzt `co-100` = 14,3:1.
- **Chip-Hover lief im Dark Mode rückwärts**: Der Rand nutzt beim Überfahren die kräftigeren
  `-500`/`-600`/`-700`-Töne. Im Dark sind das die dunkleren, der Rand wurde also schwächer statt
  kräftiger und die Affordanz kehrte sich um (`ki` ruhend `-400` #BEE82D → hover `-700` #6B8208).
  Kein AA-Verstoß (alle Werte blieben über der 3:1-Schwelle für Nicht-Text), aber falsch herum.
  Dark-Overrides ergänzt, jeweils eine Stufe heller als der Ruhezustand: co `-200`, ki `-300`,
  es `-200`, wo `-200`.
- **Gedrückter Chip war im Dark Mode kaum vom Grund zu unterscheiden**: Die Füllung `n-700` ergab
  gegen `bg-page` nur **1,60:1**, der ausgewählte Zustand war praktisch nur am weißen Text erkennbar.
  Er invertiert jetzt wie das Segmented Control, das dieses Muster im System bereits vorgibt
  (`--seg-fill` `-300` mit `--seg-on` `-900`): helle Füllung `n-300` mit dunklem Text `n-900`,
  Hover eine Stufe heller statt dunkler. Gemessen: Text auf Füllung 8,62:1, Füllung gegen Seite
  4,85:1. Light bleibt unverändert bei `n-700` mit weißem Text.
- **Drei weitere dunkel-auf-dunkel-Zustände**, gefunden durch den neuen Check statt durch Zufall:
  der Hover-Rand des neutralen Chips (`n-400`, 2,79:1 und dunkler als der Ruhe-Rand → `n-200`) und
  der Pause-Knopf im Logo-Karussell (`n-700`, **1,60:1** → `n-100`). Offen bleibt der gedrückte Chip:
  seine Füllung ist im Dark eine sehr dunkle Fläche auf dunklem Grund. Der Zustand ist über den
  weißen Text erkennbar, die sauberere Lösung wäre eine helle Füllung im Dark — das ist aber eine
  Gestaltungsentscheidung und steht als dokumentierte Ausnahme im Check.
- **Vergleichstabelle (`.ep-compare-*`) Dark-Mode-Kontrast**: Summary, ✓-Glyph (`.ep-compare-yes`) und
- **Segmented Control trug in Bereichsformularen Corporate**: `.seg-option input:checked + label` war
  fest auf `--co-700` verdrahtet. Ein KI-, ES- oder WO-Formular bekam dadurch mitten zwischen seinen
  Feldern einen Corporate-Akzent und trug zwei Brand Areas gleichzeitig, entgegen der eigenen Regel
  „ein Formular gehört zu genau einer Brand Area".
- **Links im Buchungsformular blieben Corporate**: Die Inhouse-Anfrage im Helper und die beiden
  Consent-Links standen auf `--co-700`, obwohl der Abschnitt genau zwei bewusste Corporate-Reste
  ausweist (Fokusring, Feldrahmen im Fokus). Ursache war der fehlende Akzent-Scope: die Demo hängt
  in einer Doku-Karte, nicht in einer `.ep-page`. Der Wrapper trägt jetzt `data-accent="ki"`.
- **Consent-Links waren `<span>` statt Anker**: Die verlinkten Datenschutz- und Bedingungs-Hinweise in
  den Einwilligungs-Checkboxen waren nicht per Tab erreichbar und wurden von Screenreadern nicht als
  Link angesagt, obwohl genau dieser Text die Grundlage der Einwilligung ist. Jetzt durchgehend echte
  `<a class="body-link">`: Buchungsformular (2×), beide Newsletter-Varianten und die Event-Anmeldung,
  die als dritte Variante ein `<span class="t-es">` mit `text-decoration:underline` trug. Als
  **systemweite Regel** dokumentiert (Inputs & Forms, Zeile „Link im Label", plus Do/Don't-Paar und
  CONTRIBUTING § 8); die A11y-Zeile des Buchungsformulars verweist darauf. Die Übergabe-Tabelle
  „Für die Umsetzung" fordert zusätzlich echte Ziele für die Rechtstexte (die Demos tragen `href="#"`)
  und ein Öffnen ohne Formularverlust.
- **Bereichsformulare tönten ihren Consent-Link nicht**: Neben dem Buchungsformular betraf das die
  Event-Anmeldung (Sektion `#ev-anmeldung` trägt jetzt `data-accent="es"`) und die adaptive
  Kontaktseite, wo `applyKontaktContext()` Header, Button und Häkchen umtönte, den Datenschutz-Link
  im Consent-Label aber corporate ließ. Das Attribut sitzt dort am `<form>`, nicht an der Karte:
  Telefon, E-Mail und Maps-Link daneben sind Unternehmens-Kontaktdaten und bleiben Corporate.
  Bei `co` wird es entfernt, Corporate ist der Default.
- **Bereichs-CTAs aus der Doku verloren ihren Kontext**: Der globale Anker-Handler rief
  `activateExamplePage(epKey)` ohne Kontext-Objekt, anders als der `ep-page`-Handler. Ein Link mit
  `data-k-bereich`/`data-k-anliegen` außerhalb einer Beispielseite (etwa „Inhouse-Termin anfragen"
  im Buchungsformular) landete deshalb auf der neutralen Kontaktseite: keine Tönung, kein
  vorbelegtes Thema, kein Anliegen. Beide Pfade geben den Kontext jetzt gleich weiter.
- **`.helper` verfehlte AA im Dark Mode**: Hilfetexte unter Feldern nutzten `--tx-muted`, das auf
  `--bg-surface` nur 4,1:1 erreicht (die Kontrast-Tabelle dokumentiert das dort ausdrücklich als
  „Large Text / Non-Text"). Umgestellt auf `--tx-secondary`: 6,3:1 Light, 4,9:1 Dark. Betrifft alle
  Formulare mit Hilfetext.
- **Fehlerrahmen an Select und Textarea**: `.field.has-error` färbte nur `input` rot, ein fehlerhaftes
  Pflicht-Select blieb optisch unmarkiert. Regel um `select` und `textarea` erweitert.
- **`--c-error` verfehlte AA im Dark Mode auf `bg-surface`**: `#FF8E8E` war nur gegen `--bg-page`
  geprüft (4,9:1). Inline-Fehlertext sitzt aber fast immer in einer Formularkarte auf `--bg-surface`,
  dort waren es 4,0:1 bei 12 px. Angehoben auf `#FFA5A5`: 5,9:1 auf bg-page, 4,75:1 auf bg-surface.
  Betrifft alle Fehlermeldungen, Required-Sternchen und ✕-Marker im Dark Mode.

  der „Pro"-Header (`thead .ep-compare-pro`) nutzten rohes `co`/`ki`-`800` (`--ki-800` #475705), das im
  Dark nicht mitflippt → dunkel-auf-dunkel (Core-Spalte auf `bg-page`, Pro-Spalte auf `--ki-50` #2A3411,
  Häkchen faktisch unsichtbar). Dark-Override ergänzt: ✓ und Pro-Header auf `--ki-100`, Summary auf
  `--ki-200` (Hover `--ki-100`), analog zum bestehenden `.ep-feature-icon`/`.ep-tier-label`-Muster.
  Light-Mode unverändert.
- **Hover-Farben auf `--tx-primary`-Text im Dark (`.footer-link`, `.article-toc`)**: Der Hover sprang auf
  `--co-700`, das im Dark nicht flippt → der Link wurde beim Hovern dunkler statt heller (dunkel-auf-dunkel).
  Dark-Override auf `--co-200` ergänzt (`.footer-link:hover`, `.article-toc-summary:hover`,
  `.article-toc-list a:hover`), konsistent mit `.body-link:hover`. Light-Mode unverändert.
- **`.cta-dl[data-area="co"]` Eyebrow-Kontrast (Light)**: `co-600` (#009E9E, 3,28:1, Uppercase-Label < AA)
  auf `co-700` (5,5:1) → jetzt konsistent mit ki-800/es-700/wo-700. Dark-Override (`co-200`) unverändert.
- **Fokus-Ring global kontraststark (`--focus-ring` / `--focus-aa`)**: sichtbarer Ring im Light-Mode
  von `co-500` (#00BEBE, nur 2,3:1 auf Weiß) auf `co-700` (#007575, 5,5:1) → erfüllt die 3:1-Schwelle
  für Fokus-Indikatoren (WCAG 2.4.11). Gilt systemweit, da alle `:focus-visible`-Ringe diese zwei Tokens
  nutzen. Dark-Mode unverändert `co-500` (dort 4,7:1 auf dunklem Grund; `co-700` wäre dunkel-auf-dunkel).
- **Doku-Sidebar Struktur-Semantik**: Gruppen-Labels (`.nav-section`) sind jetzt `<h2>` (Screenreader-
  Outline der Navigation), und die Einträge jeder Gruppe liegen in `<ul class="nav-list">` mit
  `aria-labelledby` auf das Gruppen-Heading (Ansage „Gruppe, Liste, N Einträge"). Reine Semantik-/
  Markup-Änderung, Optik und JS unverändert.
- **Doku-Sidebar (`.nav-item`) barrierefrei**: (1) aktiver Eintrag-Text von `co-500` (#00BEBE auf
  `co-50` nur 2,07:1) auf `co-700` (4,95:1) → WCAG 1.4.3; Akzentbalken auf `co-600` (3,28:1, WCAG 1.4.11).
  (2) `aria-current="page"` am aktiven Eintrag (statisches Markup + synchron in `activateSection`),
  sodass der aktive Bereich nicht mehr nur farblich, sondern programmatisch erkennbar ist (4.1.2).
  Zustand zusätzlich über `font-weight` (nicht nur Farbe, WCAG 1.4.1). Dark-Mode: aktiver Text/Balken
  auf `co-200`/`co-300` (auf dem dort fast schwarzen `co-50`).
- **Bereichs-Chips (`.chip[data-area="co"]`) Rahmenkontrast**: Corporate-Rahmen von `co-500`
  (#00BEBE, nur 2,3:1 auf Weiß) auf `co-600` (#009E9E = 3,28:1) angehoben → erfüllt die
  Nicht-Text-Schwelle WCAG 1.4.11 (Default + Hover). Bleibt heller als der `co-700`-Text, das
  Zwei-Ton-Prinzip (Rahmen 3:1 / Text 4,5:1) bleibt erhalten. ki/es/wo lagen bereits ≥ 3:1;
  Dark-Mode (`co-300`, 4,8:1) unverändert.
- **Light/Dark-Umschalter (`.theme-bar`) barrierefrei & konsistent**: (1) aktive Fläche von
  `co-500` auf `co-700` umgestellt, weißer Text erreicht AA (2,3:1 → 5,5:1); (2) Unicode-Glyphen
  (☀ / ◑) durch dieselben Heroicons-SVGs (Sonne / Sichelmond) wie der Topnav-Umschalter ersetzt,
  je `aria-hidden="true"`; (3) `aria-pressed` ins statische Markup (vorher nur per JS).
- **Slider-Wertanzeige (`.field-slider-output`) barrierefrei**: (1) Textfarbe von der hellen
  Thumb-Farbe (`--sl-color`) entkoppelt (neues `--sl-text`), Wert nutzt jetzt dunklere Töne
  `co-700`/`ki-800`/`es-700`/`wo-700` → AA im Light-Mode (co 2,3:1, wo 3,3:1, ki 4,35:1 → 5,5–9,6:1),
  Thumb bleibt in Markenfarbe; (2) `aria-valuetext` an allen Slidern (initial + im `oninput`
  synchronisiert), damit Screenreader „50.000 €" / „60 %" statt der Rohzahl ansagen.
- **Beispielseiten-Chips (`.ep-tab`) barrierefrei**: (1) aktiver Chip von `co-500` auf `co-700`
  umgestellt, weißer Text erreicht damit AA (2,3:1 → 5,5:1); (2) Touch-Target auf `min-height:44px`
  bzw. 44 × 44 px beim Aufklapp-Toggle (WCAG 2.5.5, analog `.btn`); (3) Rahmen von `--n-200` auf
  das modusabhängige `--field-border` (WCAG 1.4.11: Light-Mode 1,5:1 → 3,9:1, Dark unverändert 5,8:1).

### Geplant
- Git LFS für `docs/assets/images/` + History-Bereinigung (entfernt die ~159 MB
  Bilder aus dem Git-Verlauf). Erfordert `git lfs` (noch nicht installiert) und
  `git lfs migrate` bzw. `git filter-repo` — schreibt die History um (Force-Push,
  Team-Koordination), daher bewusst als separater Schritt.
- Optionales schlankes `behaviors.js` (Theme/Nav/Back-to-Top) fürs Paket.

## [0.1.0] - 2026-06-25

### Added
- Onboarding-/Governance-Doku: `README.md`, `CONTRIBUTING.md` (Konventionen),
  `LICENSE`, dieses `CHANGELOG.md`, `docs/GETTING-STARTED.md`.
- npm-Paketierung (`@conciso/design-system`, `package.json` mit `exports`/`files`).
- Token-Export `tokens/tokens.json` · `.scss` · `.js` (generiert aus `tokens.css`
  + Dark-Overrides, `var(...)` aufgelöst) via `scripts/build-tokens.mjs`.
- Gebündeltes `dist/conciso-ds.css` (korrekte Ladereihenfolge) via
  `scripts/bundle-css.mjs`. `npm run build` erzeugt beides.
- **Self-Host-Fonts** (DSGVO): `fonts/` (Montserrat + Libre Baskerville, woff2,
  Subsets latin + latin-ext) + `css/fonts.css` (`@font-face`, `font-display:swap`),
  inkl. OFL-Lizenztexte. Doku-Site und Bundle nutzen jetzt lokale Fonts statt
  Google-CDN — verifiziert: 0 Anfragen an googleapis/gstatic.

### Changed
- Repo-Hygiene: Doku-Site vom konsumierbaren Kern getrennt. `index.html`,
  `main.js` und Bilder liegen jetzt unter `docs/` (Bilder in `docs/assets/images/`);
  Pfade in `docs/index.html` entsprechend angepasst. Der Kern (`css/`, `dist/`,
  `tokens/`) bleibt im Root.
- Distribution: **intern/proprietär** statt Registry-Publish. `package.json`
  `license: "UNLICENSED"` + `private: true`; `publishConfig` und der
  Release-Workflow (`.github/workflows/release.yml`) entfernt. Nutzung über
  eingebundenes/kopiertes `dist/conciso-ds.css` oder gepinnte Git-Tags
  (`npm install github:conciso/conciso-design-system#vX.Y.Z`). `LICENSE` auf
  einen kurzen internen Hinweis eingedampft (Font-OFL-Verweise bleiben).

---

Frühere Arbeit (vor formaler Versionierung) ist in der Git-Historie
dokumentiert: Aufbau der Foundations (Tokens, Typografie 16/14/12, Spacing,
Elevation), Komponentenbibliothek, vollständiger Light/Dark-Mode mit
WCAG-AA-Kontrasten, Beispielseiten und die navigierbare Doku-Site.
Die erste getaggte Version markiert den Start der paketierten Distribution.
