# @conciso/design-system-angular

Angular-Wrapper-Komponenten für das [Conciso Design System](https://github.com/conciso/conciso-design-system).
Die Komponenten sind **dünne Hüllen** über der framework-agnostischen
[CSS-Schicht](../../../CONTEXT.md#css-schicht) (`@conciso/design-system`): Sie setzen
nur deren CSS-Klassen zusammen und liefern **kein eigenes CSS**.

> **Vollständig umgezogen.** Alle 37 Komponenten leben in dieser Lib und werden über
> `public-api.ts` exportiert — samt ihrer öffentlichen Typen (`CdsArea`,
> `CdsButtonVariant`, `CdsThemeMode`, …). `storybook-angular` enthält nur noch Stories
> und importiert ausschließlich von hier
> ([ADR-0002](../../../docs/adr/0002-topologie-und-quelle-der-wahrheit.md)).

## Komponenten (Auswahl)

Jede Komponente ist ein schmaler Wrapper, der nur die passende Klassen­kombination
der CSS-Schicht erzeugt. Die Tabelle zeigt eine Auswahl; vollständig sind die Exporte
in `src/public-api.ts` bzw. in der Storybook-Sidebar.

Die meisten Komponenten haben einen Element-Selektor (`cds-*`). Einige tragen
stattdessen einen Attributselektor (z. B. `cdsIconCard`, `cdsSection`, `cdsFeature`,
`cdsCtaBand`, `cdsAvatar`, `cdsAuthorCard`), weil das Host-Element sonst Layout oder
Tag der CSS-Basis bricht — begründet je Komponente per JSDoc, siehe
[ADR-0008](../../../docs/adr/0008-selektortyp-der-wrapper-komponenten.md).

| Angular-Selector | CSS-Basis (in `../../../css/components.css`) |
| --- | --- |
| `<cds-button>` | `.btn` + Varianten/Bereiche |
| `<cds-status-badge>` | `.badge` + `.badge-{ok\|warn\|err\|neu}` (Status-Ton) |
| `<cds-area-badge>` | `.badge` + `[data-area]` (Bereichs-Zuordnung) |
| `<cds-chip>` | `.chip` (aria-pressed Toggle **oder** statischer `t-*`-Tag) |
| `<cds-card>` | `.card` (Bereichs-Glyphe aus `../../../icons`) |
| `<cds-stat-card>` | `.card-stat` |
| `<cds-stat-strip>` | `.card-stat-strip` + `.card-stat-flat` |
| `<cds-testimonial>` | `.testimonial` |
| `<cds-team-voice>` | `.team-voice` (editoriale Zitat-Reihe mit Foto) |
| `<cds-text-field>` / `<cds-textarea-field>` / `<cds-select-field>` | `.field` (input/select/textarea, A11y-verdrahtet) |
| `<cds-blockquote>` | `.bq` (bereichsgefärbtes Zitat) |
| `<cds-area-tabs>` | `.area-tabs` / `.atab` (interaktive Tab-Leiste) |
| `<cds-faq>` | `.ep-faq` (natives `details`/`summary`) |
| `<cds-snackbar>` | `.snack` (Statusmeldung, Töne def/ok/err) |
| `<cds-slider>` | `.field-slider` / `.slider` (Range mit Live-Ausgabe) |
| `<cds-download-cta>` | `.cta-dl` (Download-Block) |
| `<cds-code-block>` | `.cb-wrap` (Code/Terminal, Kopier-Button) |
| `<cds-footer>` | `.footer` (Zwei-Band-Footer) |
| `<cds-carousel>` | `.img-slider` (Bild-Crossfade, Prev/Next/Dots, Hero) |
| `<cds-logo-carousel>` | `.logo-carousel` (Autoplay-Crossfade, pausierbar) |
| `<cds-topnav>` | `.ep-topnav` (Nav + Submenüs + Suche + Theme-Toggle) |
| `a[cdsIconCard]` / `div[cdsIconCard]` | `.ep-card` (Attributselektor, ADR-0008 Fall 1: Grid-Kind) |
| `section[cdsSection]` / `div[cdsSection]` | `.ep-section` (Attributselektor, ADR-0008 Fall 2: Fläche am Host) |

## Installation von npmjs.org

Der empfohlene Weg: Beide Pakete (`@conciso/design-system-angular` **und**
`@conciso/design-system`, [Lockstep](../../../CONTEXT.md#lockstep-versionierung))
liegen auf der öffentlichen npm-Registry (seit
[ADR-0011](../../../docs/adr/0011-veroeffentlichung-auf-npmjs.md)). Keine `.npmrc`,
kein Token nötig:

```bash
npm install @conciso/design-system-angular @conciso/design-system
```

Gilt ab dem ersten echten Release nach dem Merge dieser Änderung; bis dahin liegt auf
npmjs nur eine Bootstrap-Platzhalterversion (siehe ADR-0011).

## Installation aus GitHub Packages (Alternative)

Beide Pakete liegen **zusätzlich** weiterhin privat, org-scoped in
[GitHub Packages](https://npm.pkg.github.com) (siehe
[ADR-0004](../../../docs/adr/0004-verteilung-und-versionierung.md)) — z. B. für
Consumer innerhalb der GitHub-Organisation `conciso`, die ohnehin schon so
eingerichtet sind. Ein einziger `.npmrc`-Mechanismus deckt beide ab, weil
beide unter dem `@conciso`-Scope veröffentlicht werden.

**1. `.npmrc`** im Konsumenten-Projekt (oder `~/.npmrc` für den eigenen Rechner)
anlegen — der `@conciso`-Scope wird auf GitHub Packages umgeleitet, alles andere
bleibt bei der öffentlichen npm-Registry:

```ini
@conciso:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**2. Token bereitstellen.** GitHub Packages verlangt Auth auch für **lesenden**
Zugriff auf private Pakete. `${GITHUB_TOKEN}` in der `.npmrc` liest npm zur
Laufzeit aus der Umgebungsvariable — dafür, in dieser Reihenfolge:

- **CI in derselben Organisation → kein Token nötig.** Das von GitHub automatisch
  bereitgestellte `secrets.GITHUB_TOKEN` genügt für den **Lese**-Zugriff, sofern
  das Workflow-`permissions`-Feld `packages: read` erlaubt (Beispiel im
  Publish-Workflow, [`.github/workflows/publish.yml`](../../../.github/workflows/publish.yml)).
  Voraussetzung ist einmalig, dass das Paket dem konsumierenden Repo freigegeben
  ist: auf der Paket-Seite unter *Manage Actions access* → **Add Repository**
  (Personen und Teams bekommen dort ebenso eine Rolle). Das Token ist kurzlebig und
  an den Lauf gebunden — nichts zu verwalten, nichts zu rotieren.
- **Lokale Rechner und CI außerhalb der Organisation → Token eines technischen
  Users.** Nimm dafür **nicht** einen persönlichen Account: sonst hängt der Zugriff
  aller Konsumenten daran, dass diese Person im Unternehmen bleibt und ihre Rechte
  behält. Also einen Maschinen-Account anlegen (E-Mail-Verteiler statt
  Personenpostfach, sonst verlagert sich das Problem nur), in die Organisation
  einladen, Lesezugriff geben — und mit **diesem** Account das Token erzeugen:
  *Settings → Developer settings → Personal access tokens → Tokens (classic)*,
  Scope `read:packages` (nur `write:packages`, wenn von Hand publiziert werden
  soll). In GitHub Actions als **Organisations-Secret** ablegen, dann teilen alle
  konsumierenden Repos dasselbe Token und es wird an einer Stelle rotiert.

> **Es muss ein *classic* Token sein.** GitHub Packages unterstützt laut
> [Doku](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages)
> ausschließlich Personal Access Tokens (classic); fine-grained PATs und
> GitHub-App-Installation-Tokens sind dort nicht vorgesehen
> ([Roadmap-Issue #558](https://github.com/github/roadmap/issues/558)). Wer mit
> einem fine-grained Token startet, verliert Zeit an einem 401/404, der wie ein
> Rechteproblem aussieht.

> Drei Fallstricke beim technischen User: (1) Ein Maschinen-Account belegt einen
> **Lizenzplatz** — das ist der Preis für die Entkopplung von Personen. (2) Nutzt die
> Organisation **SAML SSO**, muss das Token nach dem Anlegen ausdrücklich für die
> Organisation autorisiert werden, sonst schlägt der Zugriff mit einem irreführenden
> 401/404 fehl. (3) Setz ein **Ablaufdatum** und notiere die Rotation — ein Token
> ohne Ablauf ist bequem, und sein Ausfall trifft später alle Konsumenten
> gleichzeitig ohne Vorwarnung.

**3. Installieren:**

```bash
npm install @conciso/design-system-angular @conciso/design-system
```

Committe niemals ein Token in die `.npmrc` selbst — nur die
`${GITHUB_TOKEN}`-Variablenreferenz landet im Repo, der tatsächliche Wert bleibt
in der Umgebung.

## Wichtig: CSS wird nicht mitgeliefert

Die Lib injiziert zur Laufzeit **nichts** ins DOM. Der Konsument installiert **beide**
Pakete (`@conciso/design-system-angular` **und** `@conciso/design-system` im
[Lockstep](../../../CONTEXT.md#lockstep-versionierung), gleiche Version) und bindet die
CSS-Schicht + Fonts selbst global über die `angular.json` (`styles`/`assets`) ein.
Fehlt dieser Schritt, rendern die Komponenten unstyled — ein lautes, offensichtliches
Signal. Siehe [ADR-0001](../../../docs/adr/0001-angular-lib-als-css-wrapper.md).

## CSS + Fonts einbinden

Copy-paste-fertiger Einbindungs-Schnipsel — lebendes Vorbild ist die committete
[Consumer-Fixture](../../../CONTEXT.md#consumer-fixture) unter
[`examples/consumer-fixture`](../../../examples/consumer-fixture), die genau damit
im [Consumer-Smoke-Test](../../../CONTEXT.md#consumer-smoke-test) baut.

`css` und `fonts` liegen unverändert (kein CSS-Bundling durch den Angular-Build) unter
`node_modules/@conciso/design-system/{css,fonts}` — deshalb die `assets`-Einträge statt
`styles`. `fonts.css` referenziert die Font-Dateien relativ als `../fonts/*`; die
Zielordner `conciso/css` und `conciso/fonts` müssen daher **Geschwister** sein.

**1. `angular.json` → `architect.build.options` (Standard-Konfiguration ergänzen):**

```jsonc
{
  "assets": [
    // … bestehende Einträge (z. B. "public") …
    {
      "glob": "**/*",
      "input": "node_modules/@conciso/design-system/css",
      "output": "conciso/css"
    },
    {
      "glob": "**/*",
      "input": "node_modules/@conciso/design-system/fonts",
      "output": "conciso/fonts"
    }
  ]
}
```

**2. `src/index.html` → CSS in exakt dieser Reihenfolge laden** (fonts → tokens →
dark-mode → base → components; gleiches Muster wie Storybooks
[`preview-head.html`](../../../storybook-angular/.storybook/preview-head.html)):

```html
<link rel="stylesheet" href="conciso/css/fonts.css" />
<link rel="stylesheet" href="conciso/css/tokens.css" />
<link rel="stylesheet" href="conciso/css/dark-mode.css" />
<link rel="stylesheet" href="conciso/css/base.css" />
<link rel="stylesheet" href="conciso/css/components.css" />
```

**3. Kritische-CSS-Inlining deaktivieren:** Die `production`-Konfiguration des
`@angular/build:application`-Builders versucht standardmäßig, referenzierte
Stylesheets als kritisches CSS zu inlinen — das externe, hier über `assets` (nicht
`styles`) eingebundene CSS liegt zum Zeitpunkt dieses Optimierungsschritts noch nicht
im Ausgabe-Verzeichnis, was zu (harmlosen, aber vermeidbaren) Build-Warnungen führt.
In `architect.build.configurations.production` ergänzen:

```jsonc
{
  "optimization": {
    "scripts": true,
    "fonts": true,
    "styles": { "minify": true, "inlineCritical": false }
  }
}
```

## Bauen

Aus dem Workspace-Root (`angular-lib/`):

```bash
ng build design-system-angular
```

Das Artefakt (Angular Package Format, via ng-packagr) landet unter
`dist/design-system-angular/`. Einziger Einstiegspunkt ist `src/public-api.ts`.

## Lizenz

MIT, siehe [LICENSE](../../../LICENSE) im Repository-Root (im gebauten Paket unter
`dist/design-system-angular/LICENSE`). Ausnahmen (Brand-Assets, Schriften, Icons)
siehe [NOTICE](../../../NOTICE). Das betrifft nur die Lizenz — an den beiden
Bezugswegen (npmjs.org als Standard, GitHub Packages als Alternative, siehe oben)
ändert sich dadurch nichts.
