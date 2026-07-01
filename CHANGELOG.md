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
