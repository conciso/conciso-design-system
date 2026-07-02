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

### Added
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
