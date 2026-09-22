# ADR-0005: Testebene der Angular-Lib

- Status: akzeptiert (ergänzt 2026-08-21, siehe „Ergänzung: zweiter Story-Runner“; ergänzt
  2026-09-17, siehe „Ergänzung: zweiter Story-Runner entfällt“)
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

## Ergänzung: zweiter Story-Runner (2026-08-21)

Mit der Migration des Storybooks auf Vite (`@storybook/angular-vite`) führt
`@storybook/addon-vitest` **dieselben Stories** zusätzlich als Vitest-Tests aus
(`storybook-angular/vitest.config.ts`, `npm run test:vitest`; Browser-Mode via
Playwright/Chromium, ohne laufenden Storybook-Server).

Das ändert die Entscheidung dieser ADR nicht: Stories bleiben die einzige
Testebene der Lib, es kommen keine `.spec.ts`-Unit-Tests hinzu. Es ändert nur den
Ausführungsweg — Arbeitsteilung der beiden Runner:

- **Vitest (addon-vitest)** — schneller Lauf für Interaktion (Play-Functions) und
  a11y, direkt aus den Story-Quellen, geeignet für die lokale Feedback-Schleife.
- **Storybook-Test-Runner** — bleibt für die Visual-Snapshots (jest-image-snapshot,
  gepinntes Playwright-Docker-Image, siehe [ADR-0003](0003-pilot-scheibe-und-validierung.md))
  und läuft in der CI weiterhin gegen den gebauten Storybook.

Fällt einer der beiden Wege künftig weg (z.B. wenn Visual-Snapshots ebenfalls über
Vitest laufen), ist das eine erneute Ergänzung hier — nicht ein stiller Umbau.

## Ergänzung: eine Grenze dieser Testebene (2026-09-17)

Beim Schließen der Testlücken aus dem Komponenten-Review trat ein Fall auf, den Stories
grundsätzlich nicht abdecken können: die Tastatursteuerung von `cds-slider` und `cds-scale`.

Beide beziehen sie vom nativen `<input type="range">`, im Browser funktioniert sie. Prüfen lässt
sie sich hier trotzdem nicht. `userEvent.keyboard()` bildet Tastenverhalten in JavaScript nach und
führt dafür eine Tabelle (`@testing-library/user-event`, `event/behavior/keydown.js`): Für die
Pfeiltasten kennt sie nur `input[type="radio"]`, für Pos1 und Ende nur Textauswahl. Für
`type="range"` gibt es keinen Eintrag, und die synthetischen Ereignisse lösen das native Stepping
der Rendering-Engine nicht aus. Gegenprobe mit einem echten Tastendruck über Playwright auf ein
rohes Range-Element: dort ändert sich der Wert korrekt.

Ein Test dafür wäre also dauerhaft rot, ohne dass an der Komponente etwas fehlt. Er steht deshalb
bewusst nicht im Repo; die Begründung liegt als Kommentar in beiden Story-Dateien, damit sie beim
nächsten Durchgang nicht erneut erarbeitet werden muss.

Das ist kein Grund, die Entscheidung dieser ADR zu ändern. Es ist die eine bekannte Lücke: Wer sie
schließen will, braucht eine dritte Testebene (echte Playwright-Tests außerhalb von Storybook) —
und damit einen Nachtrag hier, der deren Pflege rechtfertigt.

## Ergänzung: zweiter Story-Runner entfällt (2026-09-17)

Die Arbeitsteilung aus der Ergänzung vom 2026-08-21 — Vitest für Interaktion/a11y, der
Storybook-Test-Runner (Jest) für Visual-Snapshots — endet hier. Auslöser war nicht die
Arbeitsteilung selbst, sondern ein Blocker: `test-runner.ts` registriert beim Laden über Jests
`serverRequire` einen ESM-Loader-Hook; unter Angular 21 gibt das nur eine Deprecation-Warnung,
unter Angular 22 bricht Jest damit in allen Stories ab (siehe `spike-angular-22.md`).

Die Visual-Regression (`jest-image-snapshot`, `postVisit` je Story, `VISUAL=1`-Gating, Baselines
unter `visual-snapshots/<story-id>.png`, `parameters.snapshot.skip` als Opt-out) ist nach
`.storybook/vitest.setup.ts` portiert: ein `afterEach`-Hook, der nur mit `VISUAL=1` läuft und
`@vitest/browser`s eigene `expect(document.body).toMatchScreenshot(...)`-Matcher-API nutzt (Vitest
4, `@vitest/browser-playwright`). Layout/Fonts abwarten und Animationen/Transitions vor dem
Screenshot einzufrieren bleibt erhalten, nur der Mechanismus dahinter (Playwright-Page-API vs.
DOM-Zugriff im Browser-Test selbst) ist anders. `@storybook/test-runner`, `jest-image-snapshot`,
`http-server`, `wait-on`, `concurrently` sowie `test-storybook`/`test-storybook:ci`/
`test-storybook:visual` sind entfernt.

Das ist kein Rückschritt bei der Trennung von Verhalten und Auslieferungs-Vertrag (siehe
„Entscheidung“ oben) — nur eine einzige Ausführungsschiene statt zwei für denselben Story-Bestand.
`npm run test:vitest` deckt jetzt Smoke, Interaktion, a11y und (mit `VISUAL=1`) Visual-Regression
ab; `.github/workflows/storybook-angular.yml` fährt den regulären Lauf, das gepinnte
Playwright-Docker-Image in `.github/workflows/visual.yml` den scharfen Bildvergleich — wie zuvor,
nur über einen Runner statt zwei.
