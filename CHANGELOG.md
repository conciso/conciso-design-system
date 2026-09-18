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

### Breaking
- **Inhalts-Inputs von 16 Komponenten sind jetzt `input.required()`.** Betroffen:
  `BlockquoteComponent` (`quote`, `name`), `TestimonialComponent` (`quote`, `name`),
  `TeamVoiceComponent` (`quote`, `name`), `StatCardComponent` (`value`, `label`),
  `StatStripComponent` (`stats`), `DownloadCtaComponent` (`title`, `primaryLabel`),
  `FaqComponent` (`items`), `CarouselComponent` (`slides`), `LogoCarouselComponent`
  (`sets`), `CardComponent` (`title`, `text`), `AreaBadgeComponent` (`label`),
  `StatusBadgeComponent` (`label`), `ChipComponent` (`label`), `PillComponent`
  (`label`), `CodeBlockComponent` (`code`) und `SnackbarComponent` (`message`). Diese
  Inputs trugen bisher erfundenen Conciso-Beispieltext als Default (Namen, Zitate,
  Kennzahlen, FAQ-Einträge, Slide-Inhalte …) — ein vergessenes Binding lieferte damit
  unbemerkt Marketingtext statt eines auffälligen Fehlers aus. Fehlt der Wert jetzt,
  wirft Angular zur Laufzeit `NG0950`; ein vergessenes Binding fällt damit sofort auf,
  statt still Demo-Inhalt auszuliefern. Reines Beiwerk (`roleLabel`, `trendText`,
  `eyebrow`/`desc`/`meta`/`secondaryLabel` bei DownloadCta, `actionLabel` bei Card und
  Snackbar) bleibt optional, defaultet aber jetzt auf `''` statt auf erfundenen Text.
  Die bisherigen Default-Texte sind nicht verloren — sie stehen jetzt als explizite
  `args` in den jeweiligen Stories (`storybook-angular/src/lib/**/*.stories.ts`) und
  rendern dort weiterhin unverändert.
- **`FieldShellComponent` ist kein Export der öffentlichen API mehr.** Die Komponente war nie als
  öffentliche API gedacht — ihre Klassendoku bezeichnet sie seit jeher als intern
  („Präsentations-Hülle für alle Field-Komponenten“), es gab weder eine eigene Story noch JSDoc
  dafür. Textfeld, Textbereich und Auswahlfeld beziehen sie weiterhin über den relativen Import
  (`./field-shell.component`), nur der Re-Export aus `public-api.ts` entfällt. Wer eigene Feldtypen
  baut, setzt die Klassen der CSS-Schicht (`.field`, `.helper`, `.error-msg`, …) direkt zusammen,
  statt sich an eine interne Hilfskomponente zu binden.

### Added
- **`SectionComponent` (`cds-section`), erste Angular-Wrapper-Komponente für die
  Seitenbausteine der Beispielseiten.** Wrapper um `.ep-section` samt dem optionalen
  Kopf-Trio `.ep-section-label`/`-h2`/`-sub` (`label`, `heading`, `sub`, alle
  Beiwerk), dazu `area` (`.t-{area}` auf dem Label) und `labelledBy`. Die Komponente
  rendert `<section aria-labelledby="…">` nur, wenn ein zugänglicher Name verfügbar
  ist (eigene Überschrift oder per `labelledBy` übergeben), sonst ein namenloses
  `<div>` — eine `<section>` ohne Namen wäre für Screenreader ohnehin keine Landmark.
  Bewusst **kein** `background`-Input: Die Sektionsfläche ist Teil des
  Flächen-Rhythmus einer Seite (siehe „Verwendung“ in `docs/index.html#sec-section`)
  und damit eine Entscheidung der Seite, nicht des Bauteils. Neue Doku-Sektion
  „Sektion“ in der Gruppe Komponenten
  (vor Navigation) sowie Storybook-Stories unter `Komponenten/Sektion/Sektion`
  (`Interaktiv`, `Ohne Kopf`, `Nur Überschrift`, `Bereichsgefärbtes Label`), Icon
  `ui-viewfinder-circle` in `SECTION_ICON_KEYS`. Erstes Ticket der
  Seitenbausteine-Serie (`.scratch/angular-seitenbausteine/spec.md`); die
  Kopf-Trio-Struktur trägt 133 der Beispielseiten-Sektionen, 85 davon mit Kopfzeile.
- **`HeroImageComponent` (`cds-hero-image`), zweites Ticket der Seitenbausteine-Serie.**
  Wrapper um `.hero-image` (`css/components.css:851–878`) samt optionaler Caption als
  Gradient-Overlay (`-caption`, `-caption-eyebrow`, `-caption-title`, `-caption-text`):
  vollbreites, randloses `<figure>` im 21:9-Format, Standard-Hero auf allen
  Customer-Pages (17 Vorkommen in den Beispielseiten). `src`/`alt` sind
  `input.required()`, `eyebrow`/`heading`/`text` Beiwerk. Bleiben alle drei Textteile
  leer, entfällt das `<figcaption>` vollständig statt leer zu rendern. Neuer Input
  `headingLevel` (`1` Default, `2`) macht die Heading-Ebene des Caption-Titels
  explizit, für Beitrags-Heros, die unter einem eigenen `<h1>` (Article-Header)
  sitzen und sonst eine zweite Top-Überschrift bekämen. `objectPosition` als
  Style-Binding direkt am `<img>` (nicht als Klasse, die CSS-Schicht hat dafür keinen
  Modifier) — die eine bewusste Ausnahme von der Regel, dass Inline-Styles aus dem
  Mockup nicht in die Komponente wandern, weil der Bildausschnitt eine Eigenschaft
  des konkreten Bildes ist, nicht der Seite. `eager` (Default `true`) steuert
  `loading="eager"`/`"lazy"`. Bewusst **kein** `tabindex`/`id`-Handling: Das
  Sprungziel des Skip-Links ist eine Entscheidung der Seite, der Konsument setzt
  beides am `<cds-hero-image>`-Host. Neue Bauteil-Ebene `Komponenten/Hero/Hero-Bild`
  unter der bestehenden Doku-Sektion „Hero“ (bisher nur MDX-Übersicht) mit vier
  Stories (`Interaktiv`, `Ohne Caption`, `Beitrags-Hero (h2)`, `Bildausschnitt`);
  Icon `ui-computer-desktop` in `SECTION_ICON_KEYS` von der bisher verschmolzenen
  Ein-Kind-ID (`komponenten-hero--übersicht`) auf die jetzt eigenständige
  Sektions-ID (`komponenten-hero`) umgehängt.
- **`StoererComponent` (`cds-stoerer`) und `StoererSetComponent` (`cds-stoerer-set`),
  drittes Ticket der Seitenbausteine-Serie.** Wrapper um `.stoerer`/`-set`/`-list`
  (`css/components.css:926–974`): das Verweiskachel-Set, das ausschließlich auf der
  Startseite oben rechts über dem Hero-Bild liegt. `cds-stoerer` ist eine vollständig
  klickbare `<a class="stoerer">` mit Pflicht-Inputs `topic`/`title`/`href` und
  Beiwerk `meta`/`date` (ISO, formatiert als deutsches Langdatum); bleiben `meta` und
  `date` beide leer, entfällt die Meta-Zeile vollständig statt leer zu rendern. Der
  `sr-only`-Trenner zwischen Datum und Ort/Lesezeit bleibt erhalten, wenn beide
  gesetzt sind. Das Icon ist wie bei `cds-icon-card` (Ticket 05) projizierter Inhalt
  (`<ng-content select="[cdsIcon]">`, nicht ein `icon`-Input), weil die
  Störer-Icons wechselnde Heroicons sind, keine DS-Bereichsglyphen; abweichend von
  Ticket 05 trägt das projizierte `<svg>` die Klasse `stoerer-icon` selbst, weil
  `.stoerer-icon` (anders als `.ep-card-icon`) direkt auf dem SVG sitzt, ohne
  Container, der die Größe per Nachfahren-Selektor durchreichen könnte. **Die
  `<li>`-Frage:** `.stoerer-list` ist ein `<ul>`, seine Kacheln müssen echte `<li>`
  sein, sonst bekommen sie laut HTML-AAM keine `listitem`-Rolle. Ein `display:
  contents`-Wrapper hätte neues CSS gebraucht (ADR-0001 verbietet das); gelöst über
  dasselbe `TemplateRef`/`ngTemplateOutlet`-Muster, das `cds-area-tabs`/`cds-area-tab`
  bereits etabliert: `cds-stoerer` rendert in ein internes `<ng-template>`,
  `cds-stoerer-set` liest die projizierten Kacheln per `contentChildren()` und setzt
  ihr Markup direkt in ein selbst gerendertes `<li>` — im laufenden Storybook geprüft,
  `<cds-stoerer>` taucht im gerenderten DOM nirgends auf, `<ul class="stoerer-list">`
  hat ausschließlich `<li>` als direkte Kinder. Der Positionsrahmen `.stoerer-hero`
  (umschließt Hero-Bild UND Set) bleibt bewusst beim Konsumenten. Neue Bauteil-Ebene
  `Komponenten/Hero/Störer` (Stories `Interaktiv`, `Zwei Kacheln über dem Hero`,
  `Ohne Meta`), `storySort.order` der Sektion „Hero“ um `Störer` ergänzt.
- **Interaktions- und Tastaturtests für die bisher ungeprüften Komponenten.** Der Button, die drei
  Theme-Umschalter, die Footer-Aktion der Card, der Aktionsknopf der Snackbar und der Kopier-Button
  des CodeBlocks hatten keinen einzigen Interaktionstest, obwohl Stories laut
  [ADR-0005](docs/adr/0005-testebene-der-angular-lib.md) die einzige Testebene der Lib sind.
  Ebenso ungeprüft waren die Tastaturpfade von AreaTabs, Carousel und Select sowie der
  deaktivierte Zustand aller sieben Formularkomponenten. 110 Tests statt 89.
- **`--font-mono` als dritte Schriftrolle des Systems.** Das System hatte Tokens für Grotesk
  (`--font`) und Serife (`--font-display`), aber keines für die dicktengleiche Schrift — die stand
  stattdessen zehnmal hart in `css/base.css` und `css/components.css` und weitere zehnmal in
  Inline-Styles von `docs/index.html`. Der Wert bleibt unverändert `'Courier New',monospace`, es
  ändert sich kein gerendertes Pixel; der Schritt ist rein strukturell. Sein Zweck: die Frage, ob
  Courier New die richtige Bildschirmschrift für Code ist, fällt ab jetzt an einer Stelle statt an
  zwanzig. Storybooks Doku- und Manager-Chrome (`fontCode` in `.storybook/theme.ts`) zeigt auf
  denselben Stack, damit Doku-Site und Storybook denselben Code-Satz rendern.

### Changed
- **Visual-Regression von Storybook-Test-Runner (Jest) nach Vitest verschoben, eine Testschiene
  statt zwei.** `npm run test:vitest` deckte bereits Smoke-Rendering, `play`-Funktionen und die
  a11y-Prüfung ab; der zweite Lauf über `@storybook/test-runner` (`test-storybook:ci`) fuhr
  dieselben 110 Tests redundant noch einmal und trug nur die Visual-Regression bei
  (`jest-image-snapshot` in `.storybook/test-runner.ts`). Diese Logik steckt jetzt in einem
  `afterEach`-Hook in `.storybook/vitest.setup.ts` (`expect(document.body).toMatchScreenshot(...)`,
  nur mit `VISUAL=1`, Baselines weiterhin unter `visual-snapshots/<story-id>.png`,
  `parameters.snapshot.skip` als Opt-out). `test-storybook`, `test-storybook:ci`,
  `test-storybook:visual` sowie die Root-Skripte `test:storybook`, `test:storybook:ci`,
  `test:visual` und die Pakete `@storybook/test-runner`, `jest-image-snapshot`,
  `@types/jest-image-snapshot`, `http-server`, `wait-on`, `concurrently` sind entfernt. Grund: der
  ESM-Loader-Hook, den Jest beim Laden von `test-runner.ts` registriert, bricht unter Angular 22 in
  allen Stories ab (unter Angular 21 nur eine Deprecation-Warnung) — Vitest ist der von Angular
  vorgesehene Testrunner, die zweite Schiene abzulösen entfernt den Blocker, statt ihn zu reparieren.
  `.github/workflows/visual.yml` (kein `http-server`/`wait-on` mehr, Vitest startet seinen Server
  selbst) und `.github/workflows/storybook-angular.yml` (Schritt „Storybook-Tests“ läuft jetzt über
  `test:vitest`) sind entsprechend angepasst. Details und die Arbeitsteilung, die damit endet, in
  [ADR-0005](docs/adr/0005-testebene-der-angular-lib.md).
- **Storybook auf 10.6.0, Docgen-Server statt Compodoc.** Alle Storybook-Familienpakete
  in `storybook-angular/` sind auf `^10.6.0`, `@storybook/test-runner` auf `^0.24.5`.
  Der seit 10.6 in `@storybook/angular-vite` default gesetzte In-Process-Docgen-Server
  liest Inputs, Outputs und JSDoc direkt aus der TypeScript-Quelle der Angular-Lib und
  speist damit Controls, Docs-Seiten und das Komponenten-Manifest (siehe nächster
  Punkt). Die nie produktiv genutzte Compodoc-Pipeline ist entfernt (`compodoc`/
  `compodocArgs` raus aus `main.ts` und den `angular.json`-Builder-Optionen). Details
  und verworfene Alternativen in
  [ADR-0006](docs/adr/0006-storybook-10-6-docgen-server-mcp-und-theming.md).
- **`@storybook/addon-mcp` aktiv: Komponenten-Manifest und CI-Gate dafür.**
  `npm run build-storybook` schreibt jetzt `storybook-static/manifests/components.json`
  (`meta.docgen: "angular-component-meta"`), der Dev-Server beantwortet unter `/mcp`
  JSON-RPC für Agenten (u. a. `stories-preview`, `docs-show`, `test-run`). Die CI prüft
  nach dem Build, dass dieses Manifest existiert und die erwartete Kennung trägt — ein
  künftiges Update kann das Manifest damit nicht mehr stillschweigend abschalten.
- **JSDoc `@internal` in der Angular-Lib gegen Interna in Props-Tabellen und Manifest.**
  Der Docgen-Server dokumentiert grundsätzlich jedes öffentliche Member einer
  Komponentenklasse; ohne Filter erschienen Template-Getter,
  ControlValueAccessor-Methoden und Event-Handler in Docs-Props-Tabelle und Manifest.
  Alle Nicht-API-Member der Lib tragen jetzt `@internal` und bleiben damit aus beiden
  heraus — Agenten sehen über den MCP-Endpunkt dieselbe bereinigte API wie
  Entwickler:innen im Docs-Panel.
- **Storybook-Manager und Docs-Chrome im Conciso-Look.** Sidebar, Toolbar und
  Docs-Seiten tragen jetzt Montserrat, die Conciso-Wortmarke und Corporate-Teal als
  Akzent (`.storybook/theme.ts`, `manager.ts`, `manager-head.html`). Der Manager folgt
  `prefers-color-scheme`, die Docs-Chrome bleibt fest im Light-Theme — beide sind
  bewusst vom Toolbar-Theme-Schalter der Preview entkoppelt, der weiterhin nur die
  Story-Vorschau steuert.
- **Alle Komponenten laufen mit `OnPush` und leiten Werte über `computed()` ab.** Abgeleitete
  Werte steckten bisher in Gettern, die bei jedem Change-Detection-Lauf neu rechneten; das
  explizite `standalone: true` war seit Angular 19 Rauschen. Template-Handler und interne
  Zustandssignale sind jetzt `protected`, Legacy-Decorators sind den heutigen APIs gewichen. Die
  Regeln dahinter stehen in [ADR-0007](docs/adr/0007-api-konventionen-der-angular-komponenten.md).
  Für Konsumenten ändert sich am Verhalten nichts.
- **Barrierefreiheits- und Verhaltenskorrekturen.** Die Dots des LogoCarousel waren als Tab-Leiste
  ausgezeichnet, ohne auf Pfeiltasten zu reagieren. Die Topnav gab beim Schließen per Escape den
  Fokus nicht an den öffnenden Knopf zurück, obwohl das CSS das Menü ausblendet — der Fokus fiel
  ins Nichts. Die Combobox öffnete nicht auf Pfeil nach oben, kannte kein Pos1 und Ende und ließ im
  Mehrfachmodus losen Filtertext stehen. Der DownloadCta hatte überhaupt keinen Output, ein Klick
  auf seine Hauptaktion verpuffte.
- **Doku-Darstellung in Sidebar und Doku-Seiten aufgeräumt, vier kleine Korrekturen.** Das
  Inhaltsverzeichnis der Doku-Seiten (`docs.toc` in `preview.ts`) erfasste per Default nur
  `h3`, die 34 MDX-Seiten gliedern aber mit `##` (h2) — ganze Seiten ohne h3 hatten dadurch
  gar kein Inhaltsverzeichnis; jetzt `h2, h3`. Der Autodocs-Eintrag jeder Komponente hieß
  „Docs“, die einzige englische Zeile in einer durchgehend deutschen Navigation — jetzt
  „Übersicht“ (`docs.defaultName` in `main.ts`), das Wort, das die eigenständigen MDX-Seiten
  schon tragen. „Beispielseiten“ stand als einziges Wurzel-Blatt ohne Ordner ganz oben in der
  Sidebar vor „Marke“, weil Storybook Blätter vor Ordnern sortiert — jetzt ein Ordner mit dem
  Kind „Übersicht“ (`beispielseiten.mdx`), analog zu „Referenzen/Quellen“. Und die drei am
  wenigsten befüllten Wurzeln (Seitenmuster, Beispielseiten, Referenzen) starten zugeklappt
  (`collapsedRoots` in `manager.tsx`) — 149 der 181 Sidebar-Einträge hängen unter
  „Komponenten“, das bleibt wie Marke und Grundlagen offen.
- **Doku-Seiten von Storybook an die Typografie der Doku-Site angeglichen.** Die Doku-Chrome
  brachte ihre eigene Emotion-Typografie mit: Überschriften in Montserrat 700 (32/24/20 px),
  Fließtext 14 px — also weder die Display-Schrift der Marke noch die eigene Body-Größe. Maßstab
  ist jetzt `docs/index.html`, die gebaute Referenz, die ihr Aussehen aus denselben CSS-Dateien
  zieht: h1 wie `.sec-title` (Libre Baskerville 400, 2rem/2.5rem), h2 wie `.group-title`
  (1.5rem/2rem plus Haarlinie, 40 px darüber, 24 px Polster, 16 px darunter), ab h3 bewusst
  Grotesk (`--ty-title-sm`), Fließtext und Tabellenzellen 16 px mit `line-height:1.7` wie am
  `body` in `base.css`, Tabellenköpfe und die kräftige Kopf-Trennlinie wie `.doc-table`
  (`preview-head.html`). Feste Größen statt der fluiden `--ty-display-*`/`--ty-headline-*`-Tokens:
  die sind für Seiten gedacht, deren Breite mit dem Viewport wächst, eine Doku-Spalte ist
  breitenbegrenzt. Die Haarlinie über h2 ist dabei der eigentliche Abstandsgeber — die Doku-Site
  gliedert nicht mit Luft allein. Die Regeln sparen `.docs-story` und `.sbdocs-preview` aus: dort
  stehen gerenderte Komponenten, deren Darstellung ausschließlich aus der CSS-Schicht kommen darf.
  Storybooks eigene Sektionsüberschrift „Stories“ bleibt ebenfalls unangetastet.
- **`<Unstyled>` schaltet die Doku-Typografie jetzt tatsächlich ab.** Die Typografie-Regeln der
  Doku-Seiten sparten bisher nur die Story-Vorschauen aus. Rohes Demo-Markup, das MDX-Seiten
  direkt einbetten, fiel weiter darunter: gemessen rendert ein
  `<h1 class="hero-image-caption-title">` als Doku-Überschrift (Libre Baskerville 32 px, dunkel)
  statt als Bauteil (`--ty-serif-md`, weiß, `line-height:1.25`) — die Doku-Regel gewinnt mit
  Spezifität (0,3,1) gegen die Bauteil-Klasse mit (0,1,0). Storybooks eigener Block `<Unstyled>`
  half nicht, weil er nur `<div class="sb-unstyled">` rendert und kein CSS mitbringt. Alle sieben
  Regeln sparen `.sb-unstyled` jetzt aus — dieselbe Konvention, die Storybooks eigenes Stylesheet
  dafür benutzt. Damit können Doku-Seiten echte Live-Beispiele einbetten, die aussehen wie auf
  der Site, statt sie in Code-Blöcken zu beschreiben.
- **Theme-Umschalter wirkt jetzt auch auf Doku-Seiten ohne eingebettete Story.**
  `themeStore.setSilent()` stand ausschließlich im Story-Decorator, der pro Story-Render läuft.
  Auf den 34 eigenständigen MDX-Seiten (Icons, Hero, Tabelle, Buchungsformular, alle
  Seitenmuster, alle „Verwendung“-Seiten) rendert keine Story — dort schrieb niemand
  `data-theme` ans `<html>` des Preview-Frames, gemessen blieb es `null`, der Umschalter war
  wirkungslos. Ein Listener auf Modulebene hört jetzt zusätzlich auf `setGlobals` (Erst-Load)
  und `globalsUpdated` (jede Änderung) und setzt den Store direkt; beide Ereignisnamen und ihre
  Nutzlast wurden gegen den installierten Dist geprüft. `setSilent` benachrichtigt keine
  Abonnenten, deshalb entsteht keine Rückkopplung mit der Gegenrichtung Store→Toolbar — je
  Umschaltvorgang gezählt: genau ein `updateGlobals`, ein `globalsUpdated`. Der Decorator bleibt
  daneben stehen. Damit rendern Live-Beispiele auf Doku-Seiten im Dark Mode korrekt; die
  Doku-Chrome selbst bleibt weiterhin hell (bekannter Follow-up aus ADR-0006).
- **Seitenleiste entrümpelt.** Storybooks Typ-Icons und das rote „A“-Badge sind weg: das Badge
  hängte an einem Tag, das 158 von 181 Einträgen tragen, und markierte damit nichts. Die Zeilen
  stehen auf 32 px statt 28, zwischen den Wurzelgruppen liegt Luft, und Ordner wie Blätter
  derselben Ebene beginnen auf derselben Textkante — vorher standen Blätter 14 px weiter rechts,
  was vom Icon verdeckt war und sie fälschlich als Kinder des Ordners darüber lesen ließ. Der
  Aufklapp-Chevron bleibt erhalten: er sitzt im selben Wrapper wie das Typ-Icon, weshalb die
  Regel das Icon selbst trifft und nicht den Wrapper. Mit dem Badge entfallen auch die
  Umbenennung von `manager.ts` zu `.tsx` und die `jsx`-Option in der `tsconfig.json`, die es
  allein nötig gemacht hatte. Wirkt erst nach einem Neustart — der Manager liest
  `manager-head.html` und `manager.ts` nur beim Prozessstart.
- **Icons-Seite zeigt jetzt Icons.** Die Seite erklärte Icons auf 105 Zeilen, ohne ein einziges zu
  zeigen. Alle 74 Glyphen aus `icons/icons.json` rendern jetzt live, getrennt nach den fünf
  Bereichs-Glyphen in ihrer Bereichsfarbe und den 69 bereichsneutralen UI-Icons, jeweils mit dem
  Schlüssel, den ein Entwickler importiert. Dabei fielen drei Aussagen der Seite als falsch auf
  und wurden korrigiert: die Registry hält je Schlüssel genau eine Variante, nicht fünf Größen;
  die Größe wird über `width`/`height` oder CSS gesetzt, nicht durch Wahl einer Variante; und die
  Farbe ist nicht eingebrannt, sondern kommt über `currentColor` vom Consumer. Die fünf
  handoptimierten Größenvarianten existieren nur als Inline-SVG in `docs/index.html`, nicht im
  veröffentlichten Paket.
- Git LFS für `docs/assets/images/` + History-Bereinigung (entfernt die ~159 MB
  Bilder aus dem Git-Verlauf). Erfordert `git lfs` (noch nicht installiert) und
  `git lfs migrate` bzw. `git filter-repo` — schreibt die History um (Force-Push,
  Team-Koordination), daher bewusst als separater Schritt.
- Optionales schlankes `behaviors.js` (Theme/Nav/Back-to-Top) fürs Paket.

## [1.0.0] - 2026-08-21

### Fixed
- **Das Card-Layout stand im `style`-Attribut, nicht in der Klasse.** `.card-body` dokumentiert
  `.card-cta-link--pinned`, und dessen `margin-top:auto` funktioniert ausschließlich im
  Flex-Container. Die Klasse war aber nur `padding:var(--s5)`. Ergebnis: in den Doku-Mockups stand
  die Flex-Spalte 43-mal im `style`-Attribut des Bodys, 41-mal zusätzlich an `.card` selbst (ohne
  Flex-Spalte an der Karte greift `flex:1` am Body ins Leere), dazu 41-mal `flex:1` und 39-mal ein
  `margin-bottom:0` an der Pill. Wer das dokumentierte Rezept ohne diese Inline-Styles übernahm,
  bekam ein anderes Layout als die Doku zeigt: keine Abstände zwischen den Body-Kindern und einen
  CTA, der nicht an der Unterkante sitzt.
  Jetzt tragen die Klassen das Layout: `.card` ist `display:flex;flex-direction:column`,
  `.card-body` eine Flex-Spalte mit `gap:var(--s3)` und `flex:1`. Der `gap` ist damit der einzige
  vertikale Rhythmus der Karte, und die Kinder geben ihre Außenmargen ab (`.card-eyebrow`,
  `.card-cta-link`; `.card-body > .pill` nimmt die Eigenmarge der Pill zurück wie im
  Featured-Body). Das ist der Punkt: eine Außenmarge am Kind addiert sich im Flex-Layout zum
  `gap`, statt zu kollabieren, und muss dann in jedem Kontext einzeln zurückgenommen werden.
  `.card-featured` bleibt `display:block`, dort liegt der Body absolut.
  **Sichtbar ändert sich zweierlei, im Browser nachgemessen.** In der Featured-Card rückt der CTA
  von 24 px auf 16 px an die Zeile darüber und liegt damit im selben Rhythmus wie der übrige Body
  (`gap:var(--s4)`); vorher kamen 8 px Marge dazu. Und in den sieben Anatomie-Demo-Karten, die
  ihren Body nie inline geflext hatten, stehen Eyebrow, Titel und Text jetzt mit 12/12 px statt
  8/0 px, die Karte wächst dadurch von 404 px auf 420 px. Alles andere bleibt gleich: die
  Listing-Cards, deren Body vorher inline geflext war, rendern unverändert (12 px zwischen den
  Kindern, gepinnte CTAs mit 20 px Padding-Luft an der Unterkante), das Bildverhältnis der
  Featured-Card bleibt 1,778, kein horizontaler Overflow.
  **Eine Ausnahme gehört zur Regel:** `.ep-feature-body` hat mit Absicht nur `gap:var(--s1)`, damit
  Titel und Text als Einheit gelesen werden. Für den CTA ist das zu eng, deshalb trägt der
  Container die Ausnahme (`.ep-feature-body > .card-cta-link{margin-top:var(--s2)}`) und die 13
  Feature-CTAs stehen unverändert bei 12 px. Genau so gehört es: nicht das Kind bringt die Marge
  überall mit, sondern der Container, der sie braucht, gibt sie seinem Kind.
  In den Mockups sind alle 43 + 41 + 41 + 39 Inline-Deklarationen entfernt; geblieben sind vier
  reine `gap`-Overrides (`--s4`, `--s6`), also Abstands-Entscheidungen, kein neu deklariertes
  Layout.
  `CONTRIBUTING.md` § 7 hält beide Regeln fest, an denen das hing: der Abstand gehört dem
  Container, nicht dem Kind, und eine Klasse trägt das Layout, das ihr eigenes Rezept voraussetzt.
  Prüfstein für künftige Bauteile: das Rezept aus der Doku muss allein mit seinen Klassen so
  aussehen, wie die Doku es zeigt.
- **Die Pill wurde in Flex-Spalten zum Balken.** `.pill` ist `inline-block`, wird als Flex-Item
  aber zu `block` blockifiziert, und ein Item mit auto-Cross-Size zieht `align-items:stretch` auf
  die volle Spaltenbreite. Im `.card-featured-body` (Flex-Spalte, `gap:var(--s4)`) heißt das:
  gemessen bei 1280 px Kartenbreite 448 px Pill-Breite statt 146 px, also exakt die Inhaltsbreite
  des Bodys (40 % von 1280 px minus zweimal `--s8`). Dazu addierte sich die Eigenmarge der Pill
  (`margin-bottom:var(--s5)`, gedacht für den normalen Fluss über einer Überschrift) zum `gap` des
  Bodys, statt zu kollabieren: 36 px unter der Pill statt 16 px, wodurch sich der Meta-Block vom
  Bereichs-Signal löste, mit dem er als Meta-Header zusammengehört.
  Die Doku-Mockups zeigten den Fehler nicht, weil an jeder der 46 Pill-Instanzen
  `style="width:fit-content;margin-bottom:0"` stand. Im Copy-Paste-Rezept der Featured-Card fehlte
  dieser Override. Wer das Rezept übernahm, bekam den Balken.
  Jetzt bringt `.pill` selbst `width:fit-content` mit (im normalen Fluss ein No-Op, ein
  `inline-block` schrumpft dort ohnehin auf seinen Inhalt; deckt Flex und Grid in einem ab, weil
  eine definierte Cross-Size `stretch` in beiden schlägt), und `.card-featured-body > .pill` nimmt
  die Eigenmarge dort zurück, wo der Body den Abstand als `gap` selbst trägt. In den Mockups sind
  alle 46 `width:fit-content` entfernt, die 7 Featured-Pills brauchen gar kein `style`-Attribut
  mehr. Auch die 39 Pills in einem `.card-body` sind ihren Override los, seit `.card-body` seine
  Flex-Spalte selbst trägt (siehe den Eintrag darüber). Doku: die Pill-Sektion, das
  Featured-Rezept und die technischen Regeln der Veranstaltungs-Card nennen jetzt, was die Klasse
  leistet und was im Markup nichts zu suchen hat.
- **Kartenraender waren im Light praktisch unsichtbar und untereinander uneinheitlich.** Die
  generische `.card` trug `--bd` (n-100), Testimonial- und Stat-Karte `--bd-strong` (n-200) plus
  einen 4-px-Bereichsakzent. Gemessen im Light: 1,18:1 gegen Weiss und 1,10:1 gegen eine
  `n-50`-Sektion, gegenueber 1,53:1 bei den anderen. Alle Karten haben 1 px, der Unterschied kam
  also aus Farbe und Akzent, nicht aus der Strichstaerke. Im Dark war beides nie ein Problem
  (2,99:1 und 4,21:1). Zwei Ursachen: es gab keine Regel, wann welches Token gilt (§4 nannte
  beide ohne Kriterium), und `.ep-card`, die Karte der Beispielseiten, nutzte laengst
  `--bd-strong`, waehrend die dokumentierte `.card` bei `--bd` blieb.
  Jetzt sind es **zwei Rollen statt zwei Staerken**: `--bd` ist die Trennlinie **innerhalb** eines
  Bauteils (Card-Footer, Caption-Kante, Tabellenzeile), `--bd-strong` die **Aussenkante** einer
  Flaeche. 18 Aussenkanten in `components.css`/`base.css` und 61 Demo-Kaesten in der Doku sind
  umgestellt; Beispielcode blieb unberuehrt. Ausgenommen bleiben Bedienelemente: Formularfelder
  und Buttons haben `--field-border` (4,13:1, WCAG 1.4.11), Pills und Chips ihren eigenen Rand,
  deshalb behalten `.a11y-mode` und `.logo-carousel-pause` ihr `--bd`.
  Dazu traegt `--bd-strong-c` im Light jetzt `n-300` statt `n-200`: **2,25:1** gegen Weiss und
  **2,09:1** gegen eine `n-50`-Sektion. Der Dark-Wert bleibt unangetastet. Damit stimmt auch eine
  Begruendung wieder, die das System schon fuehrte: §5 leitet den Sektions-Rhythmus daraus ab,
  dass die weisse Karte auf weisser Sektion "ueber ihren Rand" liest, nannte im selben Satz aber
  1,10:1 fuer Light. Die drei Kommentare in `dark-mode.css`, die 1,10:1 als ausreichend
  bezeichneten, und der Wert in der Stoerer-Tabelle sind mitgezogen. Der 4-px-Bereichsakzent
  bleibt Unterschied: die generische Karte zeigt ihren Bereich ueber die getoente Medienflaeche,
  Testimonial und Stat-Karte haben keine, dort traegt die Oberkante die Bereichsfarbe.

- **Zwei tote Nav-Links in der Barrierefreiheits-Sektion.** „Tastaturnavigation“
  (`#gt-a11y-keyboard`) und „Touch Targets“ (`#gt-a11y-touch`) standen in der Sub-Navigation,
  ohne dass es die Ziele gab, während die Einleitung derselben Sektion beide Themen ankündigt.
  Beide Blöcke sind jetzt geschrieben, siehe „Added“.
- **Fünf Überschriften waren über die Sidebar nicht erreichbar.** „Editoriale Kennzahl-Zeile“,
  „Kontrastverhältnisse · Dark Mode“ und die beiden Verwendungs-Blöcke in Slider & Carousel
  hatten keinen Nav-Eintrag. Weil diese Sektion zwei Bauteile dokumentiert, heißen ihre
  Verwendungs-Blöcke jetzt „Bild-Carousel · Verwendung“ und „Kundenlogo-Karussell · Verwendung“,
  nach dem schon beim Störer verwendeten Muster. `gt-colors-semantik` war dagegen kein
  Gruppen-Titel, sondern das Label einer Spalte im Verwendungs-Block, angesprungen von einem
  Querverweis; es heißt jetzt `colors-semantik`, damit `gt-` genau die Überschriften mit
  Nav-Eintrag bezeichnet.
- **Übersprungene Heading-Ebene in der Token-Sektion (WCAG 1.3.1).** `sec-tokens` ging von
  `h1.sec-title` direkt auf nackte `h3` und war deshalb die einzige Grundlagen-Sektion ohne
  Sub-Navigation, zwei Symptome derselben Ursache. Die fünf Token-Blöcke tragen ihre Überschrift
  jetzt als `h2.group-title` und erscheinen in der Sidebar; `.token-section h3` entfällt.
- **Fünf Anker trugen das Präfix einer fremden Sektion.** Reste früherer Umzüge:
  `gt-nav-hero-image`, `gt-nav-hero-substrip` und `gt-carousel-hero` lagen in `sec-hero`,
  `gt-logo-carousel*` in `sec-slider`. Alle sieben IDs der beiden Sektionen folgen jetzt ihrer
  eigenen Sektion, samt der Querverweise im Fließtext.
- **Inhaltsverzeichnis von `docs/GETTING-STARTED.md` unvollständig.** Es listete 8 Kapitel bei 9
  vorhandenen: „Einheiten & medienübergreifende Nutzung“ war als §7 eingeschoben worden, ohne das
  Verzeichnis nachzuziehen, wodurch die letzten zwei Einträge auf `#7-icons-nutzen` und
  `#8-frameworks` zeigten statt auf `#8-…` und `#9-…`. Alle 9 Anker lösen wieder auf.
- **`README.md` beschrieb eine Gliederung, die es nicht mehr gibt.** Statt „32 Sektionen:
  Foundations (…)“ jetzt 35 Sektionen in den sechs aktuellen Gruppen.
- **Störer bei 200 % Textgröße: Maße von px auf rem (WCAG 1.4.4).** Die Container-Query-Schwelle
  stand als `1025px` da und skalierte damit nicht mit der Browser-Standardschriftgröße. Bei
  verdoppelter Wurzel-Schrift wuchs die Kachel von 126 auf 290 px, das Overlay blieb aber an und
  ragte gemessen 96 px in die Sub-Sektion. Jetzt `64.0625rem`: bei 150 % und 200 % verlangt die
  Schwelle mehr Hero-Breite als vorhanden, das Set fällt also in den Block-Zweig unter dem Hero,
  statt zu überlappen. Ebenso Kachelbreite (`22.5rem`) und Grid-Minimum (`16.25rem`).
  Nebenbefund, der **nicht** vom Störer kommt: bei 200 % läuft die Doku-Seite horizontal über
  (1498 statt 1440 px). Mit und ohne Störer identisch gemessen, kein Element der Beispielseite ragt
  über den Viewport; das ist die Doku-Shell (252-px-Sidebar plus Content).
- **Reflow bei 320 px strukturell abgesichert (WCAG 1.4.10).** Das Auto-Fit-Grid hatte einen
  starren Boden von `16.25rem`; bei 320 px Viewport ist der Grund nur 256 px breit, die Spalte ragte
  also 4 px in die Polsterung. Es entstand kein horizontaler Überlauf, weil das Padding es auffing —
  das hielt aber nur zufällig. Jetzt `minmax(min(16.25rem,100%),1fr)`, die Spalte weicht auf 100 %
  aus statt den Grund zu sprengen. Dazu mobil (≤ 768 px) derselbe Innenabstand wie `.ep-section`
  (`--s6` statt `--s8`): im Block-Zweig steht das Set in der Sektionslogik der Seite und folgt deren
  Rhythmus. Gemessen bei 320/360/400/768 px: kein Überlauf, ein bzw. zwei Spalten.
- **`.stoerer` in die `forced-colors`-Rahmenliste aufgenommen.** Im Windows-Kontrastmodus entfernt
  das OS `box-shadow`; `base.css` stellt für `.card` und `.card-elevated` deshalb `2px solid
  CanvasText` her. Der Störer fehlte in der Liste und behielt nur seinen 1-px-Rand — genau im
  schwierigsten Fall, nämlich über einem Foto und ohne den `--e1`, auf den er sich sonst stützt.
  Der Fokus-Ring war nicht betroffen, die globale `:focus-visible`-Regel ersetzt ihn dort schon
  durch `outline: 3px solid Highlight` (in beiden Modi nachgemessen).

### Added
- **Die Brand-Logos werden jetzt ausgeliefert: `assets/brand/`.** Wer das Paket eingebunden hat,
  bekam kein Logo. Die drei Wortmarken lagen unter `docs/assets/images/`, und `docs/` steht nicht in
  `package.json` → `files`; einen `exports`-Eintrag für Assets gab es ebenfalls nicht. Dokumentiert
  war das Logo dagegen vollständig (Doku-Sektion **Marke → Logo**), es fehlte allein der Weg zum
  Developer. Zwei Nebenfolgen derselben Ablage: die Doku nannte in der Prosa den Pfad
  `images/logo-conciso{,-light,-dark}.svg`, real war es `assets/images/…`, und Storybook mountete
  für **9,7 KB** Logo den kompletten **164 MB** großen Demo-Bilderordner nach `/conciso/images`.
  Die drei SVGs liegen jetzt unter `assets/brand/` und sind über `files` und
  `exports["./assets/brand/*"]` Teil des Pakets, ansprechbar als
  `@conciso/design-system/assets/brand/logo-conciso.svg`. Umgestellt sind 59 `src`-Attribute in
  `docs/index.html` (Sektionen Logo, Navigation, Beispielseiten) auf `../assets/brand/`, die falsche
  Prosa-Angabe, der Storybook-Mount (jetzt `assets/brand` → `/conciso/brand`, 164 MB auf 9,7 KB) samt
  acht Story-Referenzen und das Vorschau-Skript, das die Root-Assets mitkopiert und `../assets/` wie
  bisher `../css/` auf Geschwister-Ebene umschreibt. `assets/brand/README.md` beschreibt den Einbau,
  verbindlich für Größen, Schutzraum und Verwendung bleibt die Doku-Sektion.
  `logo-conciso.svg` trug noch XML-Prolog, `DOCTYPE` und drei ungenutzte Namespaces des Export-Tools,
  die beiden anderen Varianten nicht. Sie sind entfernt, die Pfaddaten sind byte-identisch geblieben
  (3609 auf 3355 Byte). Zwei der Dateien hatten fälschlich das Executable-Bit, jetzt `644`.
  `width` und `height` bleiben an allen drei SVGs, anders als es CONTRIBUTING § 10 für
  `icons/source/` vorschreibt: Icons werden inline eingebettet, Logos per `<img>`, und dort liefern
  genau diese Attribute das intrinsische Seitenverhältnis und verhindern Layout-Shift. Die Begründung
  steht in `assets/brand/README.md`, damit sie niemand gegen die Icon-Regel wegräumt.
  Bewusst **nicht** Teil davon: ein Favicon- oder App-Icon-Set (die Wortmarke ist bei 7,6 zu 1 als
  Favicon unbrauchbar, Quelle wäre `icons/source/co-mark.svg`), eine `currentColor`-Variante (der
  CSS-Swap über `.logo-themed-default`/`-light` bleibt der Weg) und die Auslagerung der Demo-Fotos,
  die weiter unter **Geplant** steht. Die Fremdmarken `logo-youtube-light.svg` und
  `logo-linkedin-light.png` bleiben bei den Demo-Bildern, sie sind keine Conciso-Assets.
- **`.card-featured`: Featured-Card mit dem Bildverhältnis der Listing-Cards.** Die Featured-Card
  hatte kein definiertes Bildverhältnis. Die Bildspalte war ein `<div>` mit `min-height` und einem
  CSS-`background-image`, ihre Höhe ergab sich aus dem Text daneben. Gemessen bei 1440 px Viewport:
  **1,62**, während `.card-media` im Listing-Grid **1,778** (16/9) liefert. Redaktion musste damit
  pro Beitrag zwei Zuschnitte pflegen, einen fürs Featured und einen fürs Grid.
  Die Bildspalte trägt jetzt `.card-media` und damit dasselbe `aspect-ratio`, der Bildausschnitt
  sitzt als `object-position` am `<img>` statt als `background-position` am Container. Ein Bild in
  einem Zuschnitt passt damit in beide Slots.
  Damit das Verhältnis unabhängig von der Textlänge hält, bestimmt das **Bild** die Kartenhöhe:
  `.card-featured-body` liegt absolut und trägt nichts zur Zeilenhöhe bei. Als normale Spalte zieht
  seine Inhaltshöhe die Zeile auf und streckt das Bild mit. Ein `aspect-ratio` auf der Karte genügt
  dafür nicht, es ist eine Wunschgröße und verliert gegen die Inhaltshöhe (gemessen 1,50).
  Spaltenteilung 60/40 statt 50/50, weil ein 16/9-Bild auf halber Kartenbreite zu flach für den
  Content-Block ist: bei 50 % schrumpfte der Lead auf null Zeilen.
- **Drei Stufen der Featured-Card, an der Kartenbreite statt am Viewport.** Alle Stufen hängen per
  `@container` an der Karte (CONTRIBUTING § 7). Im Doku-Mockup ist die Karte bei 1180 px Viewport nur
  814 px breit, bei 1024 px dagegen 958 px, weil die Doku-Sidebar unterschiedlich greift. Eine
  Viewport-Regel träfe dort das Falsche.
  Über **1000 px** Kartenbreite: Bild 60 %, Padding `s6 s8`, Lead drei Zeilen.
  **900 bis 1000 px** (Tablet-Landscape): nebeneinander bleiben, aber verdichtet. Bild 65 %, Padding
  `s4 s6`, Lead zwei Zeilen. Bei 16/9 heißt breiteres Bild auch höheres Bild, und diese Höhe
  braucht der Content-Block. Vorher wurde hier gestapelt: das Bild wurde full width und 539 px hoch,
  die Karte 807 px, auf einem 1024×768-iPad also höher als der Bildschirm. Jetzt 350 px.
  Unter **900 px**: gestapelt wie die Grid-Cards, und das Lead-Kürzen wird zurückgenommen, weil
  ohne feste Höhe kein Grund besteht, eine Zeile zu opfern. Tiefer nebeneinander zu bleiben lohnt
  nicht, die Textspalte fiele unter 250 px, rund 30 Zeichen pro Zeile.
- **Kürzen statt Verhältnis brechen: der Vorrang steht fest.** `.card-text` bringt sein `line-clamp`
  mit und gibt als schrumpfendes Flex-Item zuerst nach, bevor Pill, Meta-Strip, Titel oder CTA
  wegfallen. Dazu kappt `.card-title-hero` **innerhalb** der Featured-Card auf drei Zeilen: ohne
  diesen Riegel frisst ein langer Titel die Höhe, die der Lead braucht, und schiebt danach Pill und
  CTA aus der Karte (gemessen mit einem 18-Wort-Titel). Global bleibt `.card-title-hero`
  unbeschnitten. Rest-Fall, bewusst so gelassen: schöpft ein Titel den Riegel voll aus, wird die
  letzte Lead-Zeile angeschnitten statt mit Auslassungspunkten zu enden. Dann muss etwas nachgeben,
  und eine halbe Lead-Zeile ist der geringste Schaden; die Karte bleibt in jedem Fall geschlossen.
  Ein kleinerer `gap` verschiebt den Fall nur (1,98 statt 1,76 Zeilen) und löst ihn nicht.
- **Tastaturnavigation und Touch Targets dokumentiert.** Beide Blöcke fehlten in einem System mit
  AA-Ziel. Tastaturnavigation behandelt Fokusreihenfolge aus dem Markup (keine positiven
  `tabindex`), Sprungziele mit `tabindex="-1"`, den Skip-Link, die Tastaturfalle, verdeckten Fokus
  und ein gemeinsames Tastenset für neue Bauteile (2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11), dazu eine
  Tabelle mit der tatsächlichen Belegung aller Bauteile aus `main.js`. Bei den Zielgrößen sind die
  zwei Kriterien getrennt benannt, weil sie nicht dasselbe verlangen: 2.5.8 fordert auf AA 24 px,
  2.5.5 auf AAA 44 px, und das System zielt auf 44 px. Die zwei Bauteile darunter (Segmented
  Control, Area Tabs, je 40 px) stehen als bewusste Abweichung dabei, statt unerwähnt zu bleiben.
  2.4.11 und 2.5.8 sind als Kriterien aus WCAG 2.2 gekennzeichnet, da die Sektion 2.1 nennt und es
  dort auf AA keine Zielgrößen-Anforderung gibt.
- **Sub-Navigation für Design Tokens und Beispielseiten.** Beide Sektionen waren in der Sidebar
  ohne Tiefe. Die Beispielseiten sind der größte Teil der Doku, ihre Gliederung lag allein in der
  Tab-Leiste. Die sechs Gruppen stehen jetzt in der Sidebar und ein Eintrag **öffnet** die erste
  Beispielseite seiner Gruppe: gemessen bei 1440 px liegen fünf der sechs Gruppen-Labels in
  derselben Grid-Zeile von `.ep-tabs` und die Leiste ist 328 px hoch, ein reiner Anker führte also
  fünfmal an dieselbe Stelle. Umgesetzt über das vorhandene `activateExamplePage`; der `href` zeigt
  auf den ersten Tab der Gruppe und bleibt ohne JS ein gültiges Sprungziel.
- **`CONTRIBUTING.md` §11 „Doku-Struktur“.** Für die Gliederung der Doku-Site gab es keine
  geschriebene Regel, nur einen Halbsatz in §10 Schritt 4, der drei Inhaltsblöcke nennt. Der neue
  Abschnitt hält fest: die sechs Gruppen und was hineingehört, Nav-Eintrag als Pflicht, das
  Anker-Schema `gt-<sektion>-<thema>` und wofür das Präfix reserviert ist, „Aufbau“ zuerst und
  „Verwendung“ zuletzt samt der Form `<Bauteil> · Verwendung`, die Bereichsreihenfolge, Nav-Label
  gleich Überschrift oder deren Anfang, ein Trennzeichen pro Aufgabe, die Sprachregel und die
  Heading-Ebenen samt der einen dokumentierten Ausnahme. Dazu zwei Einzeiler zum Selbstprüfen und
  eine Zeile in der PR-Checkliste.

### Changed
- **Alle sieben Featured-Cards auf `.card-featured` umgestellt.** Wissen-Übersicht (drei
  bereichsspezifische Varianten), Veranstaltungs-Übersicht (drei) und das Featured auf der Landing.
  Damit liegt Layout, Spaltenteilung und das Kürzen in der Klasse statt im `style`-Attribut, und
  die alte `min-height`-Konstruktion mit `background-image` ist restlos aus dem Repo. Geprüft über
  alle drei Beispielseiten bei zehn Kartenbreiten von 1200 bis 375 px, Light und Dark: 16/9 hält
  durchgängig, Pill und CTA bleiben sichtbar, der Lead endet auf Zeilenkante.
- **Doku der Featured-Card beschrieb das Bild als 1:1 und die Geometrie als `min-height`-Spalte.**
  Beides traf schon vor dieser Änderung nicht zu, gemessen waren es 1,62 und eine Spalte ohne
  definiertes Verhältnis. Prosa, Vergleichstabelle und Code-Block sind auf 16:9, `.card-media` und
  die drei Container-Stufen gezogen. In der Vergleichstabelle stand für den Lead außerdem noch
  14 px, `.card-text` trägt Body-md mit 16 px.
- **Reihenfolge und Benennung der Doku-Navigation.** „Verwendung“ schließt eine Sektion ab, bei
  Elevation und Tabelle stand danach noch ein Block. Icons listete die Bereiche als co/ki/wo/es,
  kanonisch und wie bei Buttons ist co/ki/es/wo. Der Eintrag Design Tokens sitzt jetzt hinter
  Elevation statt zwischen Icons und Barrierefreiheit, also hinter den vier Themen, deren Werte er
  festhält. Bei diesen Umzügen ist die Zeilenmenge der Datei unverändert, nur die Reihenfolge.
  Benennung: Gruppen- und Konzeptnamen deutsch (Foundations → Grundlagen, Components →
  Komponenten, Page-Patterns → Seitenmuster, Colors → Farben, Typography → Typografie, CSS Design
  Tokens → Design Tokens, WCAG 2.1 AA & Accessibility → Barrierefreiheit, Hero-Patterns → Hero),
  etablierte Bauteil- und Token-Namen unverändert. „Brand Areas“ bleibt: der Begriff steht 34 Mal
  in der Doku-Prosa und je zwei Mal in CONTRIBUTING und CHANGELOG, nur die Sektion umzubenennen
  hieße ein Ding, zwei Wörter. Nav-Label ist jetzt überall die Überschrift oder ihr Anfang
  (vorher wichen 10 von 165 ab, am weitesten „Verschachtelung“ für „Optional: Sub-Hierarchie per
  `.footer-subtitle`“, ohne ein gemeinsames Wort). Für „Name plus Zusatz“ gilt ein Trennzeichen:
  `·` bestimmt näher, `:` steht vor einem Satz, Klammern tragen einen kurzen Einschub.
- **Domänenwort für Veranstaltungen systemweit vereinheitlicht.** Das Sektions-Label „Treffen“ auf
  der Startseite und der Topnav-Eintrag „Events“ heißen jetzt beide „Veranstaltungen“. Für dieselbe Domäne
  standen auf einer Seite drei Wörter: „Events“ (Topnav), „Treffen“ (Sektions-Label) und „Alle
  Veranstaltungen ansehen“ (Link am Sektionsende); dazu kommt die Übersichtsseite, die von
  Veranstaltungen spricht. Mit dem Störer verlinken zwei Elemente derselben Seite auf dasselbe Ziel,
  und dann sind zwei verschiedene Namen nicht mehr nur uneinheitlich: für Screenreader liest sich das
  wie zwei verschiedene Inhalte. „Veranstaltungen“ ist das Wort, das Übersichtsseite, Detailseite und
  der Link am Sektionsende schon tragen. Angeglichen sind 27 Topnav-Einträge über alle
  Beispielseiten, das Sektions-Label, die Karte und der CTA auf der Unternehmens-Übersicht, die
  Anmeldungs-Einwilligung, der Hero-Eyebrow „Fokusevent“ (jetzt „Fokusveranstaltung“) sowie die
  Doku-Prosa inklusive des Komponenten-Namens „Event-Card“ (jetzt „Veranstaltungs-Card“). Im Wort
  „Event“ verbleiben nur technische Bezeichner (`gt-event-*`, `sec-events`, `pointer-events`,
  `data-event-meta`, Bild-Dateinamen) und die internen Team-Aktivitäten auf der Arbeitgeber-Seite
  („Teamevents“, „Kochevents“): das sind andere Dinge, und zwei Dinge dürfen zwei Wörter haben.
  Kontrolliert: 0 Textüberläufe in vier Breiten, das Wort ist mehr als doppelt so lang wie „Events“
  und passt in das 240 px breite Dropdown-Panel.
  CONTRIBUTING § 6 hält die Regel fest: ein Domänenwort pro Domäne über Nav, Sektions-Label und
  Verweis-Komponenten. Dazu die Notiz, dass die Eyebrow-Form (`--ty-label-xs` + uppercase +
  `--co-ink`) mit vier Rollen voll belegt ist und keine fünfte Bedeutung mehr tragen soll.
- **Paletten-Beschriftung auf einen neutralen Streifen unter dem Farbfeld.** Sie saß auf der Farbe,
  und dort ist der Kontrast nicht garantierbar: bei **7 von 100** Stufen liegt die Leuchtdichte so
  in der Mitte, dass weder weiße noch dunkle Schrift 4,5:1 erreicht (auf `ki-700` schafft selbst
  reines Schwarz nur 4,82:1). Die Zwischenlösung war eine Plakette auf genau diesen sieben, was als
  Ungleichheit auffiel und wie ein Fehler las. Jetzt tragen alle Beschriftungen `--tx-secondary` auf
  `--bg-surface`: **6,28:1 in beiden Modi**, das Farbfeld bleibt unverdeckt, und die 100 inline
  gesetzten Label-Farben im Markup sind überflüssig geworden und entfernt. Der abzulesende Hexwert
  ist Information, nicht Dekoration, und hat jetzt einen Grund, auf dem er trägt.
  Layout dazu: die Rundung sitzt an den Farbfeldern statt an der Reihe (die Reihe klippte sonst den
  Streifen an den Außenkanten ab), der Streifen hat Luft nach oben statt am Farbfeld zu kleben, die
  Beschriftung bricht nicht mehr um (ein Umbruch bei „800 T“ schob das Farbfeld dieser Spalte nach
  oben und ergab eine Stufe in der Reihe), und das Farbfeld behält seine 60 px Höhe. Unter 1024 px
  entfällt der Hexwert, dort ist eine Spalte zu schmal; er bleibt im `title` und per Klick kopierbar.
  Und die Reihe ist jetzt eine Karte mit Haarlinie: ohne Rahmen verlor sie im Light ihre Kante, weil
  die hellen Stufen und der weiße Beschriftungs-Streifen beide fast die Farbe der Seite haben
  (`#E0F7F7` gegen Weiß sind 1,12:1). Dazu eine Linie zwischen Farbfeld und Beschriftung, aus
  demselben Grund. Im Dark trennte sich der Streifen schon vorher von der Seite, dort ist beides
  nur konsequent.
- **Pill und Bereichs-Badge folgen im Light dem Kachel-Rezept.** Zarter `--XX-50`-Tint mit
  kräftiger dunkler Schrift (7,5 bis 12,3:1) statt kräftiger Füllung. Begründung wie bei den
  Kacheln: WCAG verlangt für diese Fläche nichts, die Aussage steht im Label, und darüber
  entscheidet das Markenrad. Auf dem zarten Grund wirkt die Schrift kräftiger, weil sie nicht mit
  der Fläche konkurriert. **Im Dark bleibt die gehobene Füllung**, weil sich dort das Verhältnis
  umdreht: helle Schrift auf dunklem Tint, und bei fast gleicher Helligkeit wie die Karte hält
  nichts mehr die Fläche zusammen (1,54 bis 1,55:1 zur Karte, 12,5 bis 12,7 L*). Gleiche Rolle,
  zwei Werte, wie bei `--XX-band`.
  Das Gate prüft die 1,3:1-und-10-L*-Regel damit nur noch für **Status**-Füllungen, bei denen die
  Farbfläche in dichten Kontexten der schnelle Hinweis ist, bevor das Label gelesen wird. Für
  Label- und Dekor-Flächen bleibt es beim Text, und der wird ohnehin geprüft.
- **Dekorative Flächen dürfen ruhig bleiben: Icon-Kacheln zurück auf den zarten Tint.** Beim
  Anheben der Füllungen waren die 48-px-Kacheln mitgelaufen, obwohl für sie nichts davon gilt: WCAG
  verlangt für eine dekorative Fläche keinen Kontrast (kein Bedienelement, kein bedeutungstragendes
  Grafikobjekt, das Glyph ist `aria-hidden` und wiederholt das Eyebrow daneben), und großflächig
  gesättigte Farbe widerspricht dem Markenwert „Ruhig“. Kacheln und Timeline-Marker tragen jetzt
  wieder `--XX-50`, ohne Rand; die Erkennbarkeit trägt das Glyph mit 7,5 bis 11,4:1 im Light und
  6,9 bis 8,6:1 im Dark, also mehr als auf der kräftigen Füllung (dort 4,7 bis 7,5:1).
  Dazu die Rollen sauber getrennt, damit die Entscheidung am Token-Namen hängt: **`--XX-50`** ruhige
  dekorative Fläche (in beiden Modi dasselbe Versprechen; im Dark stehen dort wieder die ruhigen
  Werte) · **`--XX-fill`** textführendes Bauteil, muss lesen (im Dark eigene, gehobene Werte statt
  einer Referenz auf `-50`) · **`--XX-band`** Sektionsfläche · **`--XX-ink`** farbiger Text.
  Das Gate prüft die Hausregel entsprechend nur für textführende Füllungen; warum die Kacheln nicht
  drin sind, steht im Skript.
  CONTRIBUTING § 3 führt die Entscheidung jetzt zweistufig: WCAG ist Pflicht und gilt für den
  Inhalt, darüber hinaus entscheidet das Markenrad und nicht der Kontrastrechner.
- **Getönte Füllungen im Dark um 4 L\*-Punkte gehoben, und das Gate prüft jetzt zwei Werte.** Die
  vier Bereichs-Füllungen erfüllten mit 1,33:1 den 1,3:1-Faustwert, hatten aber nur **8,3 L\***
  Helligkeitsabstand zur Karte: der Unterschied lag fast vollständig in Farbton und Sättigung, und
  eine satte Fläche auf gleicher Helligkeit liest als dunkler Fleck statt als hellere Stufe. Am
  deutlichsten bei ES, weil Blau bei gleichem L\* am dunkelsten wirkt; genau dort ist es aufgefallen
  (Pill der Veranstaltungskarte). Neu in Lab gerechnet, nur L angehoben, Farbton und Sättigung
  unverändert: `--co-50` `#1F5651`, `--ki-50` `#43531C`, `--wo-50` `#205828`, `--es-50` `#34469D`.
  Fläche jetzt 1,54 bis 1,55:1 zur Karte und 2,07 bis 2,09:1 zur Seite, ΔL\* 12,5 bis 12,7.
  Dasselbe für die Status-Füllungen, die das neue Kriterium mit aufdeckte (ΔL\* 8,2 bis 8,4):
  `--c-success-bg` `#1F573B`, `--c-warning-bg` `#5F4B1E`, `--c-error-bg` `#882725`,
  `--badge-neu-bg` `#404F5D`. Beim Fehlerton bewusst bei ΔL\* 11 gestoppt, weil der Text darauf
  sonst unter AA fällt (jetzt 4,74:1).
  **Das Gate prüft Füllungen ab jetzt gegen 1,3:1 UND 10 L\***, sonst wäre genau dieser Fall wieder
  durchgerutscht. Es hat dabei drei Folgefehler gefunden: Inline-Code (`.token`) trug im Dark
  `co-300` und fiel auf der helleren Füllung auf 4,48:1, ebenso die Grid-Spalten-Labels; beide
  laufen jetzt über `--co-ink`. Vier Code-Chips trugen zusätzlich eine semantische Inline-Farbe
  (`--c-error` und Verwandte) und lagen bei 4,46:1; die Farbe ist raus, den Zweck erklärt die Zeile
  daneben. Und ein CSS-Kommentar mit `a*/b*` hat beim Schreiben den Kommentar vorzeitig beendet und
  den halben Dark-Token-Block gekippt: 1.705 gemeldete Verstöße, in einem Lauf gefunden.
- **Alle Kontrast-Verstöße der Doku behoben: 183 auf 0, in beiden Modi.** Ausgangsstand nach dem
  Bau des Gates: Light 49 Text / 101 Füllungen / 6 Rahmen, Dark 20 / 0 / 0. Neun Gruppen, jede mit
  einer Ursache:
  - **Farbiger Text ohne Theme-Wechsel (17 Stellen).** `co-600` als Textfarbe trug auf Weiß nur
    3,29:1. Dabei fiel auf, dass das System `--XX-ink` (Light `-700`/`-800`, Dark `-200`/`-100`)
    nur für KI hatte. Die Familie ist jetzt vollständig: **`--co-ink`, `--es-ink`, `--wo-ink`**.
    Ohne sie erzeugt jede Light-Korrektur einen Dark-Verstoß, was beim ersten Anlauf genau so
    passiert ist (16 neue Dark-Befunde durch ein fest gesetztes `co-700`).
  - **Getönte Füllungen (101).** 76 Icon-Kacheln, 13 Status- und neutrale Badges, 8 Timeline-Icons,
    4 Trend-Chips lagen zwischen 1,02 und 1,16:1 gegen ihren Grund. Kacheln und Timeline-Icons
    nutzen jetzt `--XX-fill`, die Status-Tints sind auf Flächenwirkung angehoben
    (`--c-success-bg` `#A9E5C8`, `--c-warning-bg` `#F5D08C`, `--c-error-bg` `#F5BFBF`, Fläche 1,43
    bis 1,60:1), der neutrale Badge auf `n-200`. Die Tint-Texte wandern mit: `--c-warning` auf
    `#785008` und `--c-error` auf `#9B2020`, damit sie auf der kräftigeren Füllung 4,84 bzw. 4,99:1
    tragen; `--badge-*-text` verweist jetzt auf dieselben Token statt eigene Werte zu führen.
  - **60 inline gesetzte Kachel-Tints** sind aus dem Markup in die Komponente gewandert
    (`.ep-card-icon[data-area]`).
  - **`--tx-muted` auf `#5A7171`** (vorher `#5E7676`): auf Weiß 4,85:1 ✓, aber auf `n-50` und
    getönten Gründen nur 4,35 bis 4,51:1, also genau dort unter AA, wo leiser Text meist sitzt.
    Jetzt 4,66 bis 5,20:1 und weiter klar heller als `--tx-secondary`.
  - **Paletten-Beschriftungen (11).** Die Labels trugen `opacity:.75` auf der Swatch-Farbe, 2,53
    bis 4,36:1, und genau dort steht der Hexwert zum Ablesen. Deckkraft raus; für die
    Mittelton-Stufen, auf denen weder weißer noch dunkler Text 4,5:1 erreicht (auf `ki-700`
    schafft selbst Schwarz nur 4,82:1), gibt es `.swatch.is-midtone` mit einer Plakette.
  - **Halbtransparentes Weiß auf Bereichsbändern (4).** `.7` bis `.85` trugen 3,54 bis 4,46:1.
    Jetzt deckend; die dokumentierte Konvention nannte `.85` und ist mit korrigiert.
  - **Bedienelement-Rahmen (6).** Segmented Control und vier inline gestylte Suchfelder nutzten
    `n-200` (1,53:1) statt `--field-border` (3,92:1), also unter der 3:1-Schwelle aus WCAG 1.4.11.
  - **Terminal-Variante des Code-Blocks (3).** Kopier-Button und Ausgabe-Zeilen trugen 3,09 bzw.
    4,20:1 auf dem dunklen Grund.
  - **Slider ohne Bereichsklasse (1).** Fiel im Dark auf den `co-700`-Fallback und stand mit
    2,36:1 dunkel auf dunkel; die vier Bereichsvarianten waren gesetzt, der Grundfall nicht.
- **Kontrast-Gate `npm run check:contrast`.** Rendert `docs/index.html` in beiden Modi in Chromium,
  löst für jeden Textknoten den effektiven Grund über die Elternkette auf (halbtransparente
  Schichten werden aufeinander komponiert) und prüft Text (4,5:1 bzw. 3:1), getönte
  Bauteil-Füllungen (Hausregel 1,3:1) und Bedienelement-Rahmen (3:1). Es misst die **fertige Kette**
  statt des CSS und findet damit auch inline gesetzte Farben, die kein Token-Check sieht. Läuft in
  `storybook-angular.yml`, weil es einen Browser braucht; das Wurzelprojekt bleibt ohne
  Dependencies. Genau **eine** dokumentierte Ausnahme: Swatches, die ein Farbpaar als Inhalt zeigen.
  Text über Fotos und Verläufen wird gezählt, nicht gewertet (braucht Pixelmessung).
  Absicherung als **Ratsche**: eine Zahl pro Kategorie im Skript, Fehlschlag wenn sie steigt und
  ebenso wenn sie sinkt, ohne nachgezogen zu werden. Erster Stand, Light/Dark:
  **56/20** Text, **101/0** Füllungen, **6/0** Rahmen. Ziel überall 0.
  Nebenbefund beim Bau: die ersten Messläufe lasen Zwischenwerte der Theme-Animation, die Zahlen
  wanderten je nach Wartezeit. Das Gate schaltet Übergänge vor der Messung ab, zwei Läufe
  hintereinander liefern jetzt identische Zahlen.
- **Pill- und Badge-Füllungen lesen im Light wieder als Fläche.** Beide füllten mit `--XX-50`, das
  im Light gleichzeitig der zarte Sektions-Tint ist. Als Bauteil-Füllung trug es gegen seinen Grund
  nur **1,06:1** (ki) bis **1,14:1** (es), ein Fall auf einer `wo-50`-Sektion sogar 1,00:1: das
  Element las nur noch als farbiger Text und verfehlte den Faustwert von 1,3:1 aus CONTRIBUTING § 5.
  Gemessen über alle 64 Pills und 39 Bereichs-Badges der Doku, in beiden Modi.
  Neu dafür **`--co-fill` / `--ki-fill` / `--es-fill` / `--wo-fill`** (Light `-200`, ki `-400`, weil
  der Ton so hell ist, dass `-200` nur 1,27:1 trägt; im Dark identisch mit `--XX-50`, das dort schon
  auf genau diese Aufgabe kalibriert ist). Nachgemessen: Light 1,42 bis 2,03:1 gegen beide Gründe,
  Dark unverändert 1,32 bis 1,79:1, Text überall über 5,6:1. Die ES-Pill nimmt dabei `--es-800`
  statt `--es-700`, wie das ES-Badge, weil `-700` auf der kräftigeren Füllung nur 4,74:1 trüge.
  WCAG war in beiden Modi schon vorher erfüllt, der Text trug 4,7 bis 11,4:1; verfehlt war die
  Flächenwirkung. Kein `--ro-fill`: Rosé ist Akzent- und Statusfarbe ohne Pill und Badge.
- **Bereichs-Rahmen der Team-Stimme erfüllt die 3:1-Schwelle.** `.team-voice[data-area]` tönt seinen
  Rahmen in der Bereichsfarbe, und der Rahmen ist dort das tragende Farbsignal, weil das Quote-Icon
  daneben dekorativ ist (`opacity` .25 im Light, .6 im Dark). Er trug im Light auf `-200` nur
  **1,27:1** (ki) bis **2,03:1** (es) und im Dark auf `-800` nur **1,07:1** (wo) bis **1,63:1** (ki),
  war also in beiden Modi als Signal nicht wahrnehmbar. Jetzt dieselben Stufen wie beim
  Bereichs-Chip, die dort schon auf die 3:1-Schwelle für grafische Objekte ausgelegt sind: Light
  `-600`/`-700`/`-500`/`-500` (3,29 bis 5,66:1), Dark `-300` (4,25 bis 9,48:1).
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
  Nach der Konvention „Elevation = Interaktivität“ ist so eine Karte statisch: die Buttons sind die
  Interaktion, die Fläche führt nirgendwohin, und ein Ruhe-Schatten verspricht Klickbarkeit, die es
  nicht gibt. Der Hover-Lift war bereits auf `a.card-elevated` begrenzt, der Ruhe-Schatten nicht.
  Die Variante hängt jetzt komplett an `a.card-elevated`; eine statische Karte fällt damit auf
  `.card` zurück (flach, `--bd`-Rahmen) und kann den Schatten auch mit gesetzter Klasse nicht
  bekommen. Betroffen waren 9 statische `.card-elevated`-Karten (generische Karten, Referenz- und
  Themen-Karten der Beispielseiten), 6 Blöcke mit Inline-`box-shadow` (AI.Box-Preiskarten,
  Agenda-Karten, zwei Newsletter-Widgets) sowie `.cta-dl` und `.cta-visual`, die den Schatten aus
  dem CSS trugen. Alle behalten ihren Rahmen, die Kartenform bleibt. Die 44 Link-Karten
  (`<a class="card card-elevated">`) sind unverändert. In der Doku ersetzt die Zeile „Link-Karte“
  die bisherige Zeile „Elevation-Opt-in“, die genau diesen Fall legitimiert hatte.
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
- **Karten-Varianten „Filled“ und „Outlined“ aus der Doku entfernt.** `.card-filled` und
  `.card-outlined` existierten nie, weder im CSS noch im Markup noch in der Angular-Lib. Die
  Varianten-Tabelle führt jetzt die zwei Zustände, die es gibt: statisch (`.card`) und Link-Karte
  (`a.card.card-elevated`). Die Do/Don't-Liste und der Abschnitts-Untertitel sind nachgezogen,
  ebenso zwei Aussagen zu einem „Tonal Overlay“, das Karten nie gesetzt haben.
- **Drei rohe Bereichston-Rahmen ersetzt.** Die Pro-Preiskarte trug `1px solid var(--ki-200)`
  (im Light 1,27:1 gegen Weiß, im Dark eine leuchtende Haarlinie mit 10,25:1), jetzt `--bd`; die
  4-px-Oberkante und die „Empfohlen“-Pill tragen die Hervorhebung weiter. Die zwei
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

### Documentation
- **Die Rollen-Token sind jetzt dort dokumentiert, wo man sie sucht.** `--co-ink`, `--es-ink` und
  `--wo-ink` standen in keiner Doku, die Token-Tabelle der Doku-Seite führte nur `--ki-ink` (die
  anderen drei gab es bis vor Kurzem nicht), und `--XX-fill` stand nur in Prosa und in
  CSS-Kommentaren. Auch die Consumer-Tabelle in `docs/GETTING-STARTED.md`, also die Tabelle, die
  eine Anwendung liest, kannte beide Rollen nicht. Ergänzt: Familien-Zeilen in der Doku-Tabelle mit
  Messwerten, dieselben zwei Rollen in der Consumer-Tabelle samt Leitsatz („nach der Rolle greifen,
  nicht nach der Stufe“), die Rollen-Zuordnung als ersten Schritt in CONTRIBUTING § 10, beide
  Prüfbefehle im Schritt „Prüfen“ und in der PR-Checkliste, und ein Abschnitt „Prüfungen“ im README:
  dass es ein Kontrast-Gate gibt und was es garantiert, stand dort gar nicht.
- **In die PR-Checkliste aufgenommen, was in dieser Runde zweimal gefehlt hat:** nach
  Layout-Änderungen den geänderten Bereich in beiden Modi **und zwei Breiten** ansehen, also Kanten
  und Umbrüche, nicht nur Farbwerte.

### Added
- **Angular-Komponenten-Bibliothek `@conciso/design-system-angular`.** Die 37 Angular-Wrapper
  sind aus dem Storybook in eine eigene, publizierbare Lib extrahiert (Angular Package Format
  via ng-packagr, ein einziger Einstiegspunkt `public-api.ts`, Angular 21). Die Wrapper sind
  dünne Hüllen über der CSS-Schicht und liefern **kein eigenes CSS**: Konsumenten binden
  `@conciso/design-system` (peerDependency, Lockstep-Version) samt Fonts global ein — der
  copy-paste-fertige `angular.json`-Schnipsel steht im README der Lib. `storybook-angular`
  enthält nur noch Stories und konsumiert die Lib. Architektur-Entscheidungen in
  `docs/adr/0001`–`0005`, `CONTEXT.md` führt das Glossar.
- **Distribution über GitHub Packages** (privat, org-scoped) für beide Pakete — kehrt die
  0.1.0-Entscheidung „intern/proprietär statt Registry-Publish“ um, weil eine Angular-Lib als
  gebautes Artefakt ausgeliefert werden muss und ein Git-Tarball dafür nicht genügt.
  `publishConfig` auf beiden `package.json`, dazu ein Publish-Workflow, der auf eine
  Versionsänderung auf `main` reagiert: Er prüft pro Paket, ob die Lockstep-Version schon in der
  Registry liegt, veröffentlicht nur was fehlt, und legt Tag plus GitHub-Release selbst an
  (Release-Text ist der CHANGELOG-Abschnitt der Version). Version anheben und mergen ist damit
  das Release.
- **Consumer-Smoke-Test als CI-Gate.** Eine committete Minimal-Konsumenten-App
  (`examples/consumer-fixture`) installiert die per `npm pack` gebauten Tarballs beider Pakete
  und fährt einen produktiven AOT-Build — außerhalb des Repos, damit die Modul-Auflösung nicht
  über das Wurzel-`node_modules` leckt. Fängt, was Lint und Storybook strukturell nicht sehen:
  unvollständige APF-Metadaten, fehlende Re-Exports, nicht deklarierte Abhängigkeiten,
  AOT-Template-Typfehler. Ist harte Vorbedingung des Publish-Jobs.
- **Störer (`.stoerer`), Verweiskacheln über dem Hero, nur auf der Startseite.** Ein bis drei
  Kacheln als Set oben rechts über dem Hero-Bild, je auf einen aktuellen Inhalt: nächste
  Veranstaltung, neuer Wissensbeitrag, Pressemitteilung, Info. Default sind zwei, drei sind das
  Maximum. Aufbau je Kachel: Typ-Glyph und Thema-Label in einer Zeile (Eyebrow, `--co-ink`), Titel
  über zwei Zeilen, Meta-Zeile. Die ganze Kachel ist der Link, ein Tab-Stop, mit Hover und
  Fokus. Klassen `.stoerer-hero` (Wrapper um Hero und Set) · `.stoerer-set` · `.stoerer-list` ·
  `.stoerer` · `.stoerer-topic` · `.stoerer-title` · `.stoerer-meta` ·
  `.stoerer-icon`. `.hero-image` bleibt unverändert und funktioniert weiter ohne Störer.
  Die Entscheidungen, die das Bauteil tragen:
  - **Typ-Glyph als Leading-Element im Thema-Label**, nicht rechts hinter einem Trenner. Material
    trennt die Slots einer Listenzeile nach Aufgabe: das Leading-Element „represents the item's
    subject or category“, das Trailing-Element trägt „secondary information, actions, or status
    indicators“. Das Glyph ist ein reiner Typ-Marker, also eine Kategorie. Rechts stand es im Slot
    für Aktionen und Status und konnte auf einer vollständig klickbaren Kachel als Button lesen.
    NN/g ergänzt die andere Richtung („a text label must be present alongside an icon to clarify
    its meaning“): die Bedeutung trägt das Label, das Glyph ist Wiedererkennungshilfe und wirkt
    direkt neben dem Wort, das es doppelt. Gemessener Nebengewinn: ohne Icon-Spalte (57 px aus
    Glyph, Polsterung, Trenner und Spaltenabstand) wächst die Textspalte von 269 auf 326 px, also
    um 21 %, und die realistischen Titel der Startseite klammern nicht mehr. Kachelhöhe unverändert
    126 px, weil das 16-px-Glyph in die 16 px hohe Label-Zeile passt. Preis ist die Salienz: 16 px
    mit `--icon-stroke-micro` statt 24 px mit `-sm`, vertretbar weil das Glyph `aria-hidden` ist.
    Damit entfällt `.stoerer-body`, dessen einziger Zweck der durchgehende Trenner war.
  - **Eine Farbgebung für alle vier Typen**, der Inhaltstyp steht in Label und Icon. Vier
    Bereichsfarben nebeneinander arbeiten gegeneinander und gegen die Hero-Headline, und das Set
    liest dann als vier lose Kacheln statt als eines. Akzent ist durchgehend Corporate
    (`--co-ink`), aus demselben Grund wie bei der Topnav: der Störer ist Chrome über dem Bild, kein
    Bereichsinhalt. Kein `data-area`.
  - **Deckende Fläche, kein Glas.** Über einem Foto ist der Grund unbekannt, eine halbtransparente
    Kachel trägt je nach Bildstelle 2:1 oder 12:1, und `check:contrast` kann das nicht werten, weil
    der Grund nicht in der Elternkette steht. Auf `--bg-surface` ist der Text messbar: Light 5,52
    bis 10,92:1, Dark 8,32 bis 10,48:1. Das Bild bleibt sichtbar, weil die Kacheln klein sind, nicht
    weil sie durchscheinen. Dazu ein `--bd-strong`-Rahmen schon im Light, abweichend von den
    übrigen Karten: auf einer ausgebrannt hellen Bildstelle leistet der schwarze `--e1`-Schatten
    keine Kante mehr.
  - **Gleiche Höhe unabhängig von der Titellänge.** `min-height:2lh` außen reserviert zwei Zeilen,
    das innere Element kappt per `line-clamp` mit Auslassungszeichen. Ein einzeiliger Titel lässt
    dadurch sichtbar Luft zur Meta-Zeile, und das ist der gewollte Tausch: sonst springen die
    Kacheln, sobald das CMS einen längeren Titel liefert. Der vollständige Titel bleibt im
    zugänglichen Namen des Links, das Kappen ist rein visuell.
  - **Overlay nach Hero-Breite, nicht nach Fensterbreite.** Bei 21:9 ist die Hero-Höhe die Breite ×
    9/21; drei Kacheln brauchen 426 px Höhe und damit 994 px Hero-Breite. Eine Media Query auf
    1025 px ließ ein Dreier-Set in der Doku-Vorschau (Hero 898 px im 1200-px-Fenster) 41 px in die
    Sub-Sektion ragen. Die Entscheidung hängt deshalb an einer **Container-Query** auf
    `.stoerer-hero` (Schwelle 1025 px, das Desktop-Tier der Responsive-Strategie), der ersten im
    System. Ist der Hero schmaler, steht das Set als Block darunter; dasselbe passiert ohne
    Container-Query-Support, dort greift die Regel nie und der funktionierende Fall bleibt stehen.
  Barrierefreiheit: `<aside aria-label="Aktuelles">` als benannte Landmark, `<ul>`/`<li>` damit
  Screenreader die Anzahl melden, Icon `aria-hidden` (es wiederholt das Label). Der Trennpunkt der
  Meta-Zeile ist `aria-hidden` mit einem `.sr-only`-Komma daneben, sonst wird er verschluckt oder
  als „Punkt“ gelesen und Datum und Ort verschmelzen; im AX-Tree geprüft. Der Hover unterstreicht
  zusätzlich den Titel (WCAG 1.4.1): über einem Foto ist ein Schatten- oder Flächen-Zuwachs je nach
  Bildstelle kaum sichtbar, die Unterstreichung immer.
  Ziel jeder Kachel ist die **eigene Seite des Inhalts** (Veranstaltungs-Detailseite,
  Wissensbeitrag, Pressemeldung, Seminar-Landingpage), nie ein Anker der Startseite und kein
  `target="_blank"`. Ein Anker wäre ein Versprechen, das die Kachel nicht hält: ihr zugänglicher
  Name kündigt einen konkreten Inhalt an, geliefert würde eine Scroll-Position (WCAG 2.4.4).
  Existiert für einen Anlass keine eigene Seite, ist er kein Störer-Kandidat.
  Rolle gegenüber den Vorschau-Sektionen: der Störer ist eine **Abkürzung zum Inhalt**, dasselbe
  Ziel wie eine Sektion weiter unten ist erlaubt und beabsichtigt. Die Sektion bleibt der kanonische Ort mit Bild
  und Anreißer. Bedingung ist ein **Domänenwort pro Domäne**: sonst steht derselbe Inhalt zweimal
  als Link mit verschiedenen Namen auf der Seite, und für Screenreader sind das zwei verschiedene
  Dinge. Der Titel muss dafür im zugänglichen Namen der Kachel stehen, was der Aufbau von selbst
  leistet.
- **Icon `ui-megaphone`** (outline, `--icon-stroke-sm`) für den Störer-Typ Pressemitteilung.
  `ui-newspaper` heißt im DS „Zeitung / Artikel“ und bleibt das Artikel-Glyph für den
  Wissensbeitrag; eine Verlautbarung braucht ein eigenes Zeichen, sonst ist das Icon zwischen den
  beiden Typen kein Unterscheidungsmerkmal mehr. Veranstaltung nutzt `ui-calendar-days`, Info
  `ui-information-circle`, beide bereits vorhanden.
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
  Tokens aus dem Dark-Block galten als „theme-aware und damit unkritisch“, aber die Neutrals kippen
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
- **Komponente „Buchungsformular“** (`#sec-booking`, Klassen `.bk-*`): verbindliche Terminbuchung als
  Komposition aus `.field`-Feldern, am Beispiel eines Seminars. Erste Formular-Komponente mit
  **bedingten Feldblöcken** (Firma vs. Privatperson, abweichende Rechnungsadresse: `hidden` statt
  `disabled`, `required` wird über `data-required` mitgeschaltet) und einem **Teilnehmenden-Repeater**
  (Anzahl als führendes Feld, Namensblöcke folgen, Schutz vor stillem Datenverlust beim Verringern,
  „Ich nehme selbst teil“ belegt Block 1 vor). Live-Preiszeile und Anzahl als `role="status"`, Fehlerübersicht `.bk-errors` mit Sprunglisten,
  `autocomplete`-Sections je Block, feldspezifische Fehlermeldungen über `data-err`.
  Informationshierarchie in drei Stufen: Gruppe `--ty-title-sm` (20 px) mit Haarlinie, Untergruppe
  (`.bk-subgroup`/`.bk-sublegend`) `--ty-name` (14 px), Feldlabel 12 px Versalien. Eine Gruppe ist
  eine Entscheidung samt ihrer Folgen, bedingte Blöcke liegen als Untergruppe **in** der Gruppe
  ihres Auslösers statt daneben. Preiszeile zweimal (bei der Anzahl mit `role="status"`, stumm über
  dem Submit); nur Pflichtsternchen ohne zusätzliche „(optional)“-Marker; freiwilliges
  Contentletter-Häkchen von den Pflicht-Bestätigungen abgesetzt.
  **Bestellübersicht** (`.bk-order`) unmittelbar vor dem zahlungspflichtigen Button: Leistung,
  Termin, Auftraggeber, Plätze und Gesamtbetrag, live aus dem Formular. Noch leere Zeilen bleiben
  stehen und tragen `data-empty`, damit sichtbar ist, was fehlt, statt dass die Übersicht springt.
  Dazu der Abschnitt **„Für die Umsetzung“**: Anforderungen an die Produktivfassung, allen voran
  ein Zwischenspeicher gegen Datenverlust (Schlüssel, Speicherort, Wiederherstellungsreihenfolge,
  `beforeunload`-Regel), sowie serverseitige Validierung, Platzkontingent, Doppel-Submit und Spam.
  Dazu ein Entscheidungs-Abschnitt „Anfrage oder Direktbuchung“, der das Formular gegen die adaptive
  Kontaktseite abgrenzt; die Beispielseite Seminar bleibt bewusst beim Anfrage-Flow.

- **Bereichs-Varianten für das Segmented Control** (`.seg-ki`, `.seg-es`, `.seg-wo`): Die Füllung des
  gewählten Segments läuft jetzt über `--seg-fill`/`--seg-on` statt fest über `--co-700`, analog zum
  `--c500`-Muster der Buttons. Default bleibt Corporate, bestehende Verwendungen ändern sich nicht.
  Im Dark Mode kippt jede Variante auf ihren `-300`-Ton mit `-900`-Text.

- **Doku · Abschnitt „Responsive“** (`#sec-responsive`): Übergabe-Spezifikation der Responsive-Strategie
  als eigener Foundations-Abschnitt (bisher nur implizit im CSS + verstreut). Verbindliche 3-Stufen-Breakpoints
  (Phone ≤ 520 · Mobile ≤ 768 · Tablet 769 bis 1024 · Desktop > 1024), Begründungen der nicht offensichtlichen
  Bruchpunkte (520 vs. 768 bei Hero-CTAs, auto-fit vs. fix-spaltig, Hamburger ≤ 760, Doku-Sidebar ≤ 1024),
  fluide Typo-Tokens (clamp, min ≥ 20 px, unitless Ratio) und vollständiges Komponenten-Inventar mit CSS-Quelle.
  Plus Hinweise, was auf der echten Site übernommen werden muss vs. was mockup-gebunden ist.
- **Angebots-Detailseiten (Beispielseiten)**: Fünf neue Landingpages für einzelne Angebote unterhalb der
  Bereiche, jeweils an den Bereich gebunden. Wirksame Organisationen: „Erste Hilfe bei Meetingflut“
  (Festpreis 3.600 €), „Scrum Trainings“ (Preiskarten Scrum.org/TÜV SÜD), „Lean Portfolio Management“
  (Beratung ohne Festpreis). Effektive Software: „Identity mit Keycloak“ (mit YouTube-Embeds) und
  „Keycloak-Erweiterungen“ (Festpreis 9.900 €). Die Bereichs-Tabs (ES, WO) sind dafür zu aufklappbaren
  Baum-Tabs geworden; die „Konkrete Themen“-Einträge der Bereichsübersichten verlinken jetzt auf die Seiten.
- **Video-Embed (Beispielseite Identity mit Keycloak)**: Zwei responsive YouTube-Embeds
  (`youtube-nocookie.com`, 16:9 via `aspect-ratio`, `title`, kein Autoplay, `loading="lazy"`). Referenzen
  (Social Proof) direkt nach der Lösung plus Mid-Page-CTA; Abschnitts-Hintergründe neu alterniert.
- **Doku · Page-Pattern „Angebots-Detailseite“** (`#sec-leistung-detail`): Aufbau (Sektionsreihenfolge nach
  Funnel-Logik), Angebots-Box (Festpreis-Box + „Für wen“), Preismodelle (Festpreis / mehrere Pakete /
  Beratung ohne Festpreis), Cross-Links und Verwendung (Do/Don't).
- **Doku · Barrierefreiheit „Video-Embed“** (`#gt-a11y-video`): `title`, Untertitel (WCAG 1.2.2),
  Transkript/Audiodeskription, kein Autoplay, responsiv, Datenschutz, Sprach-Kennzeichnung, Tastatur;
  inklusive Abgrenzung, was das DS liefert vs. was die Videoquelle liefern muss.
- **KI-Wissensbeitrag (Beispielseite): Contentletter- + LinkedIn-CTA**: Nach „Weiterlesen“ und vor dem
  finalen CTA-Band ein „Dranbleiben“-Block als offene Feature-Liste (`.ep-feature`, zwei `col-6`): „Food
  for your brain!“ (Contentletter-Anmeldung) und „Stay connected!“ (LinkedIn-Folgen, externer Link mit
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
  (nicht vom `overflow:hidden` der `.pal-row` abgeschnitten), `aria-live`-Bestätigung + „✓“-Overlay.
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

- **Editoriale „Im Detail“-Sektion** auf der Beispielseite Wirksame Organisationen: offene
  Feature-Liste (`.ep-feature`, Alternative zu Karten) mit bis zu 8 Themen-Landingpages, Status
  über die Aktionszeile (Link „Zur Landingpage“ bei verfügbaren, „Landingpage folgt“ bei in-Aufbau,
  ohne toten Link), plus content-breites Akzentbild als Sektions-Auftakt.
- **Bereichsvariante `.card-cta-link[data-area="co|ki|es|wo"]`**: färbt den Text-CTA-Link in der
  Akzentfarbe statt Corporate-Teal (Shades wie `.ep-card-cta`), inkl. Dark-Overrides (`-200/-100`).

### Changed
- **Preis und Rahmendaten stehen jetzt direkt nach dem Hero** (Beispielseite Seminar): Die
  Lernziele-Sektion ist zweispaltig geworden, links die Bullet-Liste (`.col-8`), rechts der
  Angebots-Kasten (`.col-4`, sticky). Gemessen rückt der Preis von **45 % auf 10 %** der Seitenhöhe.
  Bewusst kein neuer Streifen unter dem Header, sondern der vorhandene Kasten neben dem ersten Inhalt.
  Das Kontaktformular bleibt, wo es war, bei „Inhalte & Voraussetzungen“; beide Kästen tragen dadurch
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
  verzögertes Schließen + unsichtbare Brücke über den Gap → WCAG 1.4.13 „hoverable/dismissible/persistent“).
  Klick/Tap, Tastatur und Touch bleiben unverändert; der Label-Klick navigiert weiterhin direkt zur
  Übersicht (kein erzwungener 2-Klick). Der Reveal hängt weiter an `.is-open` (kein reines CSS-`:hover`),
  `aria-expanded` läuft mit, `closeAllNavItems` verhindert zwei gleichzeitig offene Menüs. Escape schließt
  jetzt auch ein rein per Hover geöffnetes Menü.
- **Topnav: Top-Level-Parents als Link zur Übersicht (Split „Link + Caret-Disclosure“)**: „Angewandte KI“,
  „Leistungen“ und „Unternehmen“ sind jetzt echte `<a>`-Links auf ihre Übersichtsseite (`data-ep` = erstes
  Submenü-Ziel), statt reiner Aufklapp-Buttons. Ein **separater Caret-`<button>`** (`.ep-nav-item-toggle`,
  `aria-expanded`/`aria-controls`) öffnet das Submenü per Klick/Tastatur. UX: 1 Klick zur Übersicht statt
  Umweg über den „Übersicht“-Dropdown-Eintrag; A11y: eigene Caret-Hit-Area ≥ 24 px (WCAG 2.5.8) + Fokus-Ring,
  mobil Link + Caret in einer Zeile mit ≥ 44 px Tap-Fläche. Der nicht-farbige Aktiv-Unterstrich (WCAG 1.4.1)
  sitzt jetzt am Parent-Link. Über alle Beispielseiten + Doku (`#gt-nav-topnav`) konsistent umgesetzt.
- **KI-Wissensbeitrag „Weiterlesen“: aktuelle Artikel-Cards** statt der alten `.ep-card`-Textkarten:
  jetzt `.card.card-elevated` mit 16:9-Bild, `.pill`-Bereichslabel, `.card-title` und gepinntem
  `.card-cta-link`, im `.layout-grid` (col-4) — identisch zur Beitragsübersicht (`ep-wb-uebersicht`).
- Topnav-Icon-Buttons und Hamburger auf 48 × 48 px (Touch-Target AAA, WCAG 2.5.5).
- Icon-Doku (`#sec-icons`): Solid-Bereichs-Glyphen vs. Outline-UI-Icons klargestellt
  (vorherige „nur Outline“-Aussage war unzutreffend); Verweis auf die Icon-Bibliothek.
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
- **Typografie durchgängig rem-basiert (WCAG 1.4.4 „Resize Text“)**: Alle `--ty-*`-Tokens, die
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
  `-100`/`-200` als Border“.
- **Falsches Bereichs-Icon auf fünf Verweiskarten**: Karten, die auf eine Bereichs-Übersicht
  verlinken, tragen das Marken-Glyph des Bereichs (`ki-bot`, `es-window-check`, `wo-network`,
  solid, eingefärbt über `.ep-card-icon.t-XX`). Zehn Karten hielten sich daran, fünf nicht: die
  „Weiter im Thema“-Blöcke der Angebots-Detailseiten (Meetingflut, Scrum, LPM, Keycloak,
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
  „ein Formular gehört zu genau einer Brand Area“.
- **Links im Buchungsformular blieben Corporate**: Die Inhouse-Anfrage im Helper und die beiden
  Consent-Links standen auf `--co-700`, obwohl der Abschnitt genau zwei bewusste Corporate-Reste
  ausweist (Fokusring, Feldrahmen im Fokus). Ursache war der fehlende Akzent-Scope: die Demo hängt
  in einer Doku-Karte, nicht in einer `.ep-page`. Der Wrapper trägt jetzt `data-accent="ki"`.
- **Consent-Links waren `<span>` statt Anker**: Die verlinkten Datenschutz- und Bedingungs-Hinweise in
  den Einwilligungs-Checkboxen waren nicht per Tab erreichbar und wurden von Screenreadern nicht als
  Link angesagt, obwohl genau dieser Text die Grundlage der Einwilligung ist. Jetzt durchgehend echte
  `<a class="body-link">`: Buchungsformular (2×), beide Newsletter-Varianten und die Event-Anmeldung,
  die als dritte Variante ein `<span class="t-es">` mit `text-decoration:underline` trug. Als
  **systemweite Regel** dokumentiert (Inputs & Forms, Zeile „Link im Label“, plus Do/Don't-Paar und
  CONTRIBUTING § 8); die A11y-Zeile des Buchungsformulars verweist darauf. Die Übergabe-Tabelle
  „Für die Umsetzung“ fordert zusätzlich echte Ziele für die Rechtstexte (die Demos tragen `href="#"`)
  und ein Öffnen ohne Formularverlust.
- **Bereichsformulare tönten ihren Consent-Link nicht**: Neben dem Buchungsformular betraf das die
  Event-Anmeldung (Sektion `#ev-anmeldung` trägt jetzt `data-accent="es"`) und die adaptive
  Kontaktseite, wo `applyKontaktContext()` Header, Button und Häkchen umtönte, den Datenschutz-Link
  im Consent-Label aber corporate ließ. Das Attribut sitzt dort am `<form>`, nicht an der Karte:
  Telefon, E-Mail und Maps-Link daneben sind Unternehmens-Kontaktdaten und bleiben Corporate.
  Bei `co` wird es entfernt, Corporate ist der Default.
- **Bereichs-CTAs aus der Doku verloren ihren Kontext**: Der globale Anker-Handler rief
  `activateExamplePage(epKey)` ohne Kontext-Objekt, anders als der `ep-page`-Handler. Ein Link mit
  `data-k-bereich`/`data-k-anliegen` außerhalb einer Beispielseite (etwa „Inhouse-Termin anfragen“
  im Buchungsformular) landete deshalb auf der neutralen Kontaktseite: keine Tönung, kein
  vorbelegtes Thema, kein Anliegen. Beide Pfade geben den Kontext jetzt gleich weiter.
- **`.helper` verfehlte AA im Dark Mode**: Hilfetexte unter Feldern nutzten `--tx-muted`, das auf
  `--bg-surface` nur 4,1:1 erreicht (die Kontrast-Tabelle dokumentiert das dort ausdrücklich als
  „Large Text / Non-Text“). Umgestellt auf `--tx-secondary`: 6,3:1 Light, 4,9:1 Dark. Betrifft alle
  Formulare mit Hilfetext.
- **Fehlerrahmen an Select und Textarea**: `.field.has-error` färbte nur `input` rot, ein fehlerhaftes
  Pflicht-Select blieb optisch unmarkiert. Regel um `select` und `textarea` erweitert.
- **`--c-error` verfehlte AA im Dark Mode auf `bg-surface`**: `#FF8E8E` war nur gegen `--bg-page`
  geprüft (4,9:1). Inline-Fehlertext sitzt aber fast immer in einer Formularkarte auf `--bg-surface`,
  dort waren es 4,0:1 bei 12 px. Angehoben auf `#FFA5A5`: 5,9:1 auf bg-page, 4,75:1 auf bg-surface.
  Betrifft alle Fehlermeldungen, Required-Sternchen und ✕-Marker im Dark Mode.

  der „Pro“-Header (`thead .ep-compare-pro`) nutzten rohes `co`/`ki`-`800` (`--ki-800` #475705), das im
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
  `aria-labelledby` auf das Gruppen-Heading (Ansage „Gruppe, Liste, N Einträge“). Reine Semantik-/
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
  synchronisiert), damit Screenreader „50.000 €“ / „60 %“ statt der Rohzahl ansagen.
- **Beispielseiten-Chips (`.ep-tab`) barrierefrei**: (1) aktiver Chip von `co-500` auf `co-700`
  umgestellt, weißer Text erreicht damit AA (2,3:1 → 5,5:1); (2) Touch-Target auf `min-height:44px`
  bzw. 44 × 44 px beim Aufklapp-Toggle (WCAG 2.5.5, analog `.btn`); (3) Rahmen von `--n-200` auf
  das modusabhängige `--field-border` (WCAG 1.4.11: Light-Mode 1,5:1 → 3,9:1, Dark unverändert 5,8:1).

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
