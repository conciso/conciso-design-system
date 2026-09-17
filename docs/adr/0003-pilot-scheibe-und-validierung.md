# ADR-0003: Pilot-Scheibe zuerst, Validierung per npm pack

- Status: akzeptiert
- Datum: 2026-07-24

## Kontext

Die Extraktion berührt drei riskante Kopplungen gleichzeitig: die CSS-Schicht
(globaler Cascade), die relativen Font-Pfade und die Icons (`@ng-icons` +
DS-Glyphen aus `@conciso/design-system/icons`). Zieht man alle ~40 Komponenten in
einem Rutsch um und hakt eine dieser Kopplungen, debuggt man an 40 Komponenten
gleichzeitig.

Außerdem ist der Storybook-Entwickel-Loop bewusst auf die TS-Quelle gemappt (siehe
[ADR-0002](0002-topologie-und-quelle-der-wahrheit.md)) — er testet also **nicht** das
gebaute Angular-Package-Format-Artefakt, das der Konsument tatsächlich bekommt.

## Entscheidung

- **Pilot-Scheibe zuerst:** Button + Topnav (Topnav zieht theme-switch `cycle-button`
  und Icons mit) Ende-zu-Ende durch die Kette treiben. Deckt reinen CSS-Klassen-Pfad,
  Font-Laden, Icon-Registrierung und Komponenten-Komposition ab.
- **Validierung per `npm pack`:** Lib mit ng-packagr bauen → `npm pack` → in eine
  Wegwerf-Angular-App (im scratchpad) installieren, CSS + Fonts einbinden, bauen und
  rendern. Testet das **echte gebaute Artefakt** ohne Registry-Rechte.
- Danach **Bulk-Umzug** der restlichen ~38 Komponenten.

## Begründung

- Eine dünne vertikale Scheibe beweist die gesamte Pipeline mit minimalem
  Blast-Radius; Kopplungsfehler zeigen sich an zwei statt vierzig Komponenten.
- `npm pack` + lokale Installation entspricht exakt dem, was ein Konsument erlebt,
  braucht aber keinen Registry-Zugang und hinterlässt keine Test-Version in der
  Registry.
- Die Pilot-Validierung wird anschließend als CI-Gate verstetigt (siehe
  [ADR-0004](0004-verteilung-und-versionierung.md), Consumer-Smoke-Test).

## Verworfene Alternativen

- **Alle ~40 Komponenten auf einmal:** schneller „fertig“, aber Debugging aller
  Kopplungen gleichzeitig.
- **Validierung per `npm link` / Pfad-Mapping:** schnell, testet aber nicht das
  gebaute APF-Artefakt — genau die Kopplung, die abgesichert werden soll, bliebe
  ungetestet.

## Konsequenzen

- Die Pilot-Komponenten definieren früh die Muster (Icon-Registry-Import aus dem
  Paket statt relativ, öffentliche Typen im `public-api.ts`), denen der Bulk-Umzug folgt.
