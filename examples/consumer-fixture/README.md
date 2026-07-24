# Consumer-Fixture

Committete Minimal-Angular-App — der [Consumer-Fixture](../../CONTEXT.md#consumer-fixture)
aus [Ticket 03](../../.scratch/angular-components-lib/issues/03-consumer-smoke-test.md) der
Angular-Lib-Extraktion (siehe [Spec](../../.scratch/angular-components-lib/spec.md),
[ADR-0003](../../docs/adr/0003-pilot-scheibe-und-validierung.md),
[ADR-0004](../../docs/adr/0004-verteilung-und-versionierung.md)).

Zwei Rollen in einer App:

1. **Ziel des [Consumer-Smoke-Tests](../../CONTEXT.md#consumer-smoke-test)**
   ([`scripts/consumer-smoke-test.sh`](../../scripts/consumer-smoke-test.sh)): baut
   `@conciso/design-system-angular` + `@conciso/design-system`, tarballt beide per
   `npm pack`, installiert die Tarballs hier (nicht die Quelle, kein
   Workspace-Pfad-Mapping) und fährt einen produktiven AOT-`ng build`. Deckt genau die
   Fehlerklassen ab, die kein anderer Test sieht: unvollständige APF-Metadaten,
   fehlende Re-Exports in `public-api.ts`, nicht auflösbare peer-Deps,
   AOT-Template-Typfehler, fehlende Icon-Registrierung.
2. **Lebendes Konsum-Beispiel** — zeigt, wie ein echtes Angular-Projekt Button + Topnav
   importiert und die CSS-Schicht + Fonts einbindet. Der `angular.json`-Schnipsel ist im
   [README der Lib](../../angular-lib/projects/design-system-angular/README.md#css--fonts-einbinden)
   dokumentiert.

## Wichtig: absichtlich KEIN npm-Workspace-Mitglied

Diese App ist **nicht** in den `workspaces` der Root-`package.json` gelistet und hat
**eigene** `node_modules`. Ein `npm install` im Repo-Root würde sonst
`@conciso/design-system-angular` per Workspace-Symlink auf die TS-Quelle auflösen —
genau das gebaute APF-Artefakt, das ein echter Konsument bekommt, bliebe ungetestet
(siehe [ADR-0003](../../docs/adr/0003-pilot-scheibe-und-validierung.md)).

## Lokal bauen

Ein blankes `npm install` hier schlägt fehl — `@conciso/design-system` und
`@conciso/design-system-angular` sind nicht auf der Registry (privat, noch nicht
publiziert). Über das Skript aus dem Repo-Root laufen lassen, das die Tarballs
baut und installiert:

```bash
scripts/consumer-smoke-test.sh
```

Das Ergebnis liegt anschließend unter `dist/consumer-fixture/browser/`.
