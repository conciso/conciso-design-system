# @conciso/design-system-angular

Angular-Wrapper-Komponenten für das [Conciso Design System](https://github.com/conciso/conciso-design-system).
Die Komponenten sind **dünne Hüllen** über der framework-agnostischen
[CSS-Schicht](../../../CONTEXT.md#css-schicht) (`@conciso/design-system`): Sie setzen
nur deren CSS-Klassen zusammen und liefern **kein eigenes CSS**.

> **Pilot-Scheibe.** Button + Topnav (inkl. der von Topnav genutzten theme-switch
> `cycle-button`) sind aus [Ticket 02](../../../.scratch/angular-components-lib/issues/02-pilot-button-topnav.md)
> umgezogen. Die restlichen ~38 Komponenten folgen im Bulk-Umzug.

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
