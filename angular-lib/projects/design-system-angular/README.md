# @conciso/design-system-angular

Angular-Wrapper-Komponenten für das [Conciso Design System](https://github.com/conciso/conciso-design-system).
Die Komponenten sind **dünne Hüllen** über der framework-agnostischen
[CSS-Schicht](../../../CONTEXT.md#css-schicht) (`@conciso/design-system`): Sie setzen
nur deren CSS-Klassen zusammen und liefern **kein eigenes CSS**.

> **Noch leer.** Dieses Paket ist das Scaffold aus
> [Ticket 01](../../../.scratch/angular-components-lib/issues/01-lib-workspace-scaffold.md).
> Die ~40 Komponenten ziehen ab der Pilot-Scheibe (Button + Topnav) hierher um.

## Wichtig: CSS wird nicht mitgeliefert

Die Lib injiziert zur Laufzeit **nichts** ins DOM. Der Konsument installiert **beide**
Pakete (`@conciso/design-system-angular` **und** `@conciso/design-system` im
[Lockstep](../../../CONTEXT.md#lockstep-versionierung), gleiche Version) und bindet die
CSS-Schicht + Fonts selbst global über die `angular.json` (`styles`/`assets`) ein.
Fehlt dieser Schritt, rendern die Komponenten unstyled — ein lautes, offensichtliches
Signal. Siehe [ADR-0001](../../../docs/adr/0001-angular-lib-als-css-wrapper.md).

Der copy-paste-fertige `angular.json`-Schnipsel folgt mit der Verteilungs-Scheibe.

## Bauen

Aus dem Workspace-Root (`angular-lib/`):

```bash
ng build design-system-angular
```

Das Artefakt (Angular Package Format, via ng-packagr) landet unter
`dist/design-system-angular/`. Einziger Einstiegspunkt ist `src/public-api.ts`.
