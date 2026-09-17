# ADR-0002: Topologie der Angular-Lib und Quelle der Wahrheit

- Status: akzeptiert
- Datum: 2026-07-24

## Kontext

Die Angular-Komponenten leben heute in `storybook-angular/` — einem Angular-Projekt
vom Typ `application`, das im Grunde nur existiert, um Storybook zu betreiben. Die
~40 Komponenten liegen unter `src/lib/*`, die Stories daneben unter `src/lib/*/*.stories.ts`.

Zum Extrahieren in eine eigene Bibliothek ist zu klären: Wo lebt die Lib, und wo ist
nach der Extraktion die einzige Quelle der Wahrheit für den Komponenten-Code?

## Entscheidung

- **Neues Angular-Lib-Projekt neben `storybook-angular/`** als eigener Angular-CLI-
  Workspace (nicht: `storybook-angular` umbauen, nicht: eigenes Repo).
- **Der Komponenten-Code zieht in die Lib um.** `storybook-angular` behält nur die
  `*.stories.ts` und importiert die Komponenten aus der Lib. Der Komponenten-Code
  existiert danach an **genau einem** Ort.
- **Storybook bindet die Lib über TS-Quelle via tsconfig-Pfad-Mapping** ein (auf
  `public-api.ts`), nicht über das gebaute Artefakt.

## Begründung

- Ein separates Lib-Projekt hält die Bibliothek von der Storybook-Infrastruktur
  entkoppelt, bleibt aber im selben Repo — die enge Kopplung an die CSS-Quelle (siehe
  [ADR-0001](0001-angular-lib-als-css-wrapper.md)) bleibt lokal und atomar
  versionierbar.
- Code-Umzug (statt Re-Export aus dem Storybook) verhindert eine verschwimmende
  Quelle der Wahrheit.
- Pfad-Mapping auf die TS-Quelle gibt den schnellsten Entwickel-Loop (HMR, keine
  Lib-Rebuilds). Dass damit nicht das veröffentlichte Artefakt getestet wird, deckt
  der [Consumer-Smoke-Test](0004-verteilung-und-versionierung.md) ab.

## Verworfene Alternativen

- **`storybook-angular` von `application` zu Workspace mit Lib-Projekt umbauen:**
  ein Ort, ein CI-Lauf — aber vermischt Storybook-Runner und Bibliothek stärker als
  gewünscht.
- **Eigenes Git-Repo:** löst das Monorepo, bricht aber die enge Kopplung an die
  CSS-Quelle im selben Repo (Lockstep-Releases würden repo-übergreifend).
- **Code bleibt in `storybook-angular`, Lib re-exportiert:** zwei Orte, Quelle der
  Wahrheit verschwimmt.

## Konsequenzen

- Die Story-Imports in `storybook-angular` ändern sich von `../lib/*` auf den
  Paketnamen bzw. den gemappten Pfad. „Unangetastet“ gilt für das Storybook-Setup,
  nicht für die Story-Imports.
- `foundations`-Stories (Farben/Typografie) bleiben in `storybook-angular` (keine
  Komponenten).
- Das Vorgehen ist inkrementell: erst die [Pilot-Scheibe](0003-pilot-scheibe-und-validierung.md),
  dann Bulk.
