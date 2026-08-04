# ADR-0005: Storybook-Test-Runner + Consumer-Smoke-Test als alleinige Testebene der Angular-Lib

- Status: akzeptiert
- Datum: 2026-07-30

## Kontext

Die Angular-Lib (`angular-lib/projects/design-system-angular/`) enthält keine
`.spec.ts`-Unit-Tests. Das war während der Extraktion (Tickets 01–08) noch keine
scharfe Entscheidung, weil `storybook-angular` bis Ticket 09 Re-Export-Shims auf die
Lib hielt und beide Testebenen ([ADR-0003](0003-pilot-scheibe-und-validierung.md))
nebeneinander existierten. Mit Ticket 09 sind diese Shims entfernt: Storybook
konsumiert die Lib jetzt ausschließlich über das tsconfig-Pfad-Mapping auf
`public-api.ts` ([ADR-0002](0002-topologie-und-quelle-der-wahrheit.md)) — direkt auf
die Lib-Quelle, nicht auf ein Zwischen-Artefakt. Damit ist der Storybook-Test-Runner
faktisch zur einzigen Testebene der Bibliothek geworden, ohne dass das je explizit
entschieden wurde.

## Entscheidung

Die Angular-Lib bekommt **keine eigenen `.spec.ts`-Unit-Tests**. Ihr Verhalten wird
stattdessen über zwei bestehende Seams abgesichert:

- **Storybook-Test-Runner** (a11y/Interaktion) + **Visual-Snapshots** — läuft gegen
  die Lib-Quelle via tsconfig-Pfad-Mapping, deckt das Verhalten und Aussehen jeder
  Komponente ab (siehe [ADR-0003](0003-pilot-scheibe-und-validierung.md)).
- **Consumer-Smoke-Test** ([CONTEXT.md](../../CONTEXT.md#consumer-smoke-test)) —
  deckt den Build-/Auslieferungs-Vertrag ab: APF-Gültigkeit, Vollständigkeit der
  `public-api.ts`-Re-Exports, peer-Dep-Auflösung, AOT-Template-Typfehler,
  Icon-Registrierung (siehe [ADR-0004](0004-verteilung-und-versionierung.md)).

## Begründung

- Beide Seams testen zusammen sowohl das Verhalten (Storybook) als auch den
  Auslieferungs-Vertrag (Consumer-Smoke-Test) — die zwei Dinge, die an einer
  Wrapper-Bibliothek ohne eigenes CSS und ohne eigene Geschäftslogik überhaupt
  brechen können.
- Zusätzliche `.spec.ts`-Unit-Tests würden bei reinen CSS-Klassen-Wrappern
  ([ADR-0001](0001-angular-lib-als-css-wrapper.md)) im Wesentlichen dasselbe erneut
  prüfen, was die Storybook-Interaktionstests bereits abdecken.

## Konsequenzen

- Ein neuer Component-Test gehört als Story (mit Interaktionstest) in
  `storybook-angular`, nicht als `.spec.ts` in der Lib.
- Bricht eine Komponente auf eine Art, die weder Storybook noch der
  Consumer-Smoke-Test abdecken (z.B. reine Internal-Logik ohne Template-Bezug), ist
  das ein Signal, diese ADR zu überdenken statt sie stillschweigend zu unterlaufen.
