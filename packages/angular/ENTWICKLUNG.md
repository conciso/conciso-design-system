# angular-lib — Workspace der Angular-Lib

Angular-CLI-Workspace, der **ein einziges Projekt** enthält: die Bibliothek
[`@conciso/design-system-angular`](projects/design-system-angular/README.md).

Wer die Lib **benutzen** will (Installation, `.npmrc`, CSS + Fonts einbinden), findet
alles im [README der Lib](projects/design-system-angular/README.md). Dieses Dokument
beschreibt nur, wie man in diesem Workspace **arbeitet**.

## Nur ein Library-Projekt, keine App

Der Workspace wurde mit `--no-create-application` angelegt: es gibt kein
`serve`-, `test`- oder `e2e`-Target, weil hier nichts läuft, was man im Browser
öffnen könnte — gebaut wird ein Paket im
[Angular Package Format](https://angular.dev/tools/libraries/angular-package-format)
via ng-packagr ([ADR-0004](../docs/adr/0004-verteilung-und-versionierung.md)).

`angular.json` führt entsprechend genau ein Projekt mit genau einem Target:
`design-system-angular` → `build`.

## Bauen

```bash
npm run build
```

Erzeugt das APF-Paket unter `dist/design-system-angular/` — das ist das Artefakt,
das veröffentlicht wird. Für einen Rebuild bei jeder Änderung:

```bash
npm run watch
```

Beim Entwickeln braucht man das meist **nicht**: Storybook konsumiert die
TS-Quelle direkt über ein tsconfig-Pfad-Mapping auf `public-api.ts`, nicht das
gebaute Artefakt ([ADR-0002](../docs/adr/0002-topologie-und-quelle-der-wahrheit.md)).
Änderungen an einer Komponente sind dort also sofort sichtbar.

## npm-Workspaces: vom Repo-Wurzelverzeichnis installieren

Dieser Workspace und `storybook-angular` sind npm-Workspaces des Wurzelprojekts und
teilen sich **ein** `node_modules` und **ein** Lockfile. Das ist Absicht: sonst lädt
jedes Projekt sein eigenes physisches `@angular/core`, und sobald dekorierte
Komponenten die Projektgrenze überqueren, fallen die Typen nominell auseinander und
im Browser laufen zwei Angular-Instanzen nebeneinander.

Deshalb immer im Repo-Wurzelverzeichnis installieren, nie hier:

```bash
npm ci
```

## Tests

Die Lib hat bewusst **keine** eigenen `.spec.ts`-Unit-Tests. Abgesichert wird sie
über zwei Ebenen ([ADR-0005](../docs/adr/0005-testebene-der-angular-lib.md)):

- **Storybook-Test-Runner + Visual-Snapshots** in `storybook-angular` — Verhalten
  und Aussehen jeder Komponente, gegen die TS-Quelle dieser Lib.
- **Consumer-Smoke-Test** (`scripts/consumer-smoke-test.sh` im Wurzelverzeichnis) —
  baut und tarballt beide Pakete, installiert sie in eine echte Konsumenten-App und
  fährt einen produktiven AOT-Build. Fängt genau das, was die andere Ebene nicht
  sieht: APF-Metadaten, fehlende Re-Exports, peer-Dep-Auflösung, AOT-Template-Typen.

Ein neuer Komponenten-Test gehört also als Story nach `storybook-angular`.
