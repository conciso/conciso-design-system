# Spec: Angular-Komponenten in eine eigene Bibliothek extrahieren

Status: ready-for-agent

Domänen-Referenz: [CONTEXT.md](../../CONTEXT.md) · ADRs:
[0001](../../docs/adr/0001-angular-lib-als-css-wrapper.md),
[0002](../../docs/adr/0002-topologie-und-quelle-der-wahrheit.md),
[0003](../../docs/adr/0003-pilot-scheibe-und-validierung.md),
[0004](../../docs/adr/0004-verteilung-und-versionierung.md)

## Problem Statement

Die Angular-Komponenten des Design Systems leben heute nur innerhalb von
`storybook-angular/` — einem Angular-Projekt vom Typ `application`, das im Grunde nur
existiert, um Storybook zu betreiben. Andere Conciso-Projekte können diese
Komponenten nicht konsumieren: Es gibt kein installierbares, gebautes Paket. Wer die
`cds-`-Komponenten nutzen will, müsste den Quell-Code kopieren — es gibt keine
versionierte, wiederverwendbare Bezugsquelle.

## Solution

Die ~40 [Wrapper-Komponenten](../../CONTEXT.md#wrapper-komponente) werden in eine
eigene, publizierbare [Angular-Lib](../../CONTEXT.md#angular-lib)
(`@conciso/design-system-angular`) extrahiert. Der Komponenten-Code wird zur
alleinigen [Quelle der Wahrheit](../../CONTEXT.md#quelle-der-wahrheit-komponenten-code)
in der Lib; `storybook-angular` behält nur die Stories und konsumiert die Lib. Die
Lib wird per ng-packagr im Angular Package Format gebaut und — gemeinsam mit der
[CSS-Schicht](../../CONTEXT.md#css-schicht) — nach GitHub Packages (privat,
org-scoped) publiziert, sodass beliebige interne Angular-Projekte sie per npm
installieren können. Ein [Consumer-Smoke-Test](../../CONTEXT.md#consumer-smoke-test)
im CI stellt sicher, dass nie ein Paket veröffentlicht wird, gegen das ein Konsument
nicht bauen kann.

Ausgeliefert wird inkrementell: zuerst eine [Pilot-Scheibe](../../CONTEXT.md#pilot-scheibe)
(Button + Topnav), die die gesamte Kette beweist, danach der Bulk-Umzug der übrigen
Komponenten.

## User Stories

1. Als Entwickler eines anderen Conciso-Angular-Projekts möchte ich
   `@conciso/design-system-angular` per npm installieren, damit ich die
   Design-System-Komponenten nutzen kann, ohne Quell-Code zu kopieren.
2. Als Konsument möchte ich die Komponenten aus einem einzigen Einstiegspunkt
   (`@conciso/design-system-angular`) importieren, damit ich keine internen Pfade
   kennen muss.
3. Als Konsument möchte ich neben den Komponenten auch deren öffentliche Typen
   (`CdsArea`, `CdsButtonVariant`, `CdsButtonSize`, `ThemeMode`, …) importieren
   können, damit ich meine Aufrufe typsicher schreibe.
4. Als Konsument möchte ich per copy-paste-fertigem `angular.json`-Schnipsel aus dem
   README wissen, wie ich die CSS-Schicht + Fonts global einbinde, damit die
   Komponenten korrekt gestylt rendern.
5. Als Konsument möchte ich beide Pakete (Angular-Lib + CSS-Schicht) aus derselben
   Registry über einen einzigen `.npmrc`-Mechanismus beziehen, damit mein
   Installations-Weg einheitlich ist.
6. Als Konsument möchte ich mich darauf verlassen, dass Angular-Lib vX und CSS vX
   zusammenpassen (Lockstep), damit ich nicht Versionen gegeneinander abgleichen muss.
7. Als Konsument mit Angular 21 möchte ich, dass die peer-Range (`^21.2.0`) meine
   Version akzeptiert, damit die Installation ohne Peer-Konflikte durchläuft.
8. Als Konsument möchte ich die Icons transparent mitgeliefert bekommen (`@ng-icons`
   als dependency), damit ich mich nicht um eine zusätzliche Icon-Installation kümmern
   muss.
9. Als Konsument möchte ich, dass die Lib zur Laufzeit nichts ins globale DOM
   injiziert, damit SSR/Angular-Universal ohne FOUC und ohne Hydration-Mismatch
   funktioniert.
10. Als Konsument möchte ich die Ladereihenfolge und Dark-Mode-Strategie der CSS-
    Schicht selbst kontrollieren, damit ich Overrides und Themes wie gewohnt steuere.
11. Als Design-System-Entwickler möchte ich, dass der Komponenten-Code an genau einem
    Ort (der Lib) lebt, damit es keine doppelte Quelle der Wahrheit gibt.
12. Als Design-System-Entwickler möchte ich Storybook weiterhin mit HMR gegen die
    TS-Quelle entwickeln (Pfad-Mapping auf `public-api.ts`), damit mein Loop schnell
    bleibt und ich keine Lib-Rebuilds brauche.
13. Als Design-System-Entwickler möchte ich, dass die bestehenden Storybook-Stories
    weiterhin alle Komponenten dokumentieren, damit die Doku durch die Extraktion
    nicht verloren geht.
14. Als Design-System-Entwickler möchte ich die Komponenten-Icons weiterhin
    ausschließlich über die zentrale Icon-Registry beziehen (DS-Glyphen aus
    `@conciso/design-system/icons`), damit die Icon-Quelle einheitlich bleibt.
15. Als Design-System-Entwickler möchte ich zuerst eine Pilot-Scheibe (Button +
    Topnav) end-to-end umziehen, damit sich CSS-, Font-, Icon- und
    Kompositions-Kopplung an wenigen Komponenten statt an vierzig zeigt.
16. Als Design-System-Entwickler möchte ich, dass die Pilot-Scheibe die Muster
    (Icon-Import aus dem Paket, öffentliche Typen im `public-api.ts`) definiert, denen
    der Bulk-Umzug folgt.
17. Als Design-System-Entwickler möchte ich nach erfolgreicher Pilot-Scheibe die
    restlichen ~38 Komponenten im Bulk umziehen, damit die Extraktion vollständig wird.
18. Als Maintainer möchte ich einen Release-/tag-getriggerten GitHub-Actions-Workflow,
    der beide Pakete nach GitHub Packages publiziert, damit Releases reproduzierbar sind.
19. Als Maintainer möchte ich, dass der Consumer-Smoke-Test bei PR/Push läuft, damit
    Regressionen im Konsum-Vertrag früh auffallen.
20. Als Maintainer möchte ich, dass der Publish-Job den Consumer-Smoke-Test als harte
    Vorbedingung (`needs:`) hat, damit nie ein Tarball veröffentlicht wird, gegen den
    ein Konsument nicht bauen kann.
21. Als Maintainer möchte ich eine committete Consumer-Fixture im Repo, die zugleich
    als lebendes Konsum-Beispiel dient, damit neue Konsumenten ein funktionierendes
    Vorbild haben.
22. Als neuer Konsument möchte ich, dass unstyled gerenderte Komponenten ein lautes,
    offensichtliches Signal sind (fehlender CSS-Einbindungs-Schritt), damit ich den
    Fehler sofort erkenne.

## Implementation Decisions

**Topologie & Quelle der Wahrheit** (ADR-0002)
- Neues Angular-CLI-Workspace-Projekt neben `storybook-angular/` (nicht: `storybook-angular`
  umbauen, nicht: eigenes Repo).
- Der Komponenten-Code (heute `storybook-angular/src/lib/*`) zieht in die Lib um.
  `storybook-angular` behält nur die `*.stories.ts` und importiert die Komponenten aus
  der Lib.
- Storybook bindet die Lib über tsconfig-Pfad-Mapping auf `public-api.ts` ein (TS-Quelle,
  nicht das gebaute Artefakt).
- `foundations`-Stories (Farben/Typografie) bleiben in `storybook-angular`.

**Bibliothek & Build** (ADR-0004)
- Paketname: `@conciso/design-system-angular`.
- Build via Angular-CLI-Workspace + ng-packagr (Angular Package Format).
- Genau **ein** Einstiegspunkt (`public-api.ts`), der Komponenten **und** öffentliche
  Typen (`CdsArea`, `CdsButtonVariant`, `CdsButtonSize`, `ThemeMode`, …) exportiert.
  Keine sekundären Entry-Points.

**Abhängigkeiten** (ADR-0001, ADR-0004)
- `@conciso/design-system` (CSS-Schicht) als **peerDependency**, eng gepinnt auf die
  gemeinsame Version (Lockstep, z.B. `0.1.x`).
- `@angular/*` als peerDependency mit Range `^21.2.0`.
- `@ng-icons/core` + `@ng-icons/heroicons` als normale **dependency** (vollständig
  gekapselt via `provideIcons`/`viewProviders`).
- Der Icon-Registry-Import wechselt vom relativen `../../../../icons/icons.js` auf das
  Paket `@conciso/design-system/icons`.

**CSS-Kopplung** (ADR-0001)
- Die Lib liefert **kein CSS** mit und injiziert zur Laufzeit **nichts** ins DOM.
- Der Konsument bindet CSS + Fonts global über `angular.json` (`styles`/`assets`) ein;
  ein copy-paste-fertiger Schnipsel steht im README.

**Verteilung & Versionierung** (ADR-0004)
- Beide Pakete (`@conciso/design-system-angular` **und** `@conciso/design-system`) nach
  GitHub Packages (privat, org-scoped); beide `package.json` erhalten `publishConfig`.
- Lockstep-Versionierung: beide Pakete tragen immer dieselbe Versionsnummer.
- Release-/tag-getriggerter GitHub-Actions-Workflow (deutscher Name im Stil der
  bestehenden Workflows, Node 22) publiziert beide Pakete.

**Vorgehen** (ADR-0003)
- Pilot-Scheibe zuerst: Button + Topnav (Topnav zieht theme-switch `cycle-button` +
  Icons mit). Danach Bulk-Umzug der übrigen ~38 Komponenten.

## Testing Decisions

**Was einen guten Test ausmacht:** Getestet wird ausschließlich **externes Verhalten**
— das, was Konsument bzw. Storybook-Nutzer beobachten — nicht Implementierungsdetails
der Wrapper (z.B. nicht die interne `classes`-getter-Ausgabe).

**Seam 1 — Bestehend: Storybook-Test-Runner + Visual-Snapshots** (`test-storybook`,
`test-storybook:visual`, `test-storybook:ci`)
- Deckt Verhalten und Aussehen der Komponenten ab. Nach der Extraktion importiert
  Storybook dieselben Komponenten aus der Lib (via Pfad-Mapping); die Suite muss
  **ohne inhaltliche Änderung der Stories grün bleiben**. Das ist der Härtetest der
  Extraktion für die Komponenten-Ebene.
- Prior Art: die bestehenden `*.stories.ts` inkl. a11y-Addon und der
  Visual-Snapshot-Lauf (`visual-snapshots/`, `jest-image-snapshot`).

**Seam 2 — Neu: Consumer-Smoke-Test** (einziger neuer Seam)
- Die committete [Consumer-Fixture](../../CONTEXT.md#consumer-fixture) installiert den
  per `npm pack` gebauten Tarball und fährt einen produktiven **AOT-`ng build`**.
- Deckt den Konsum-Vertrag ab, den kein bestehender Test sieht: APF-Metadaten,
  Vollständigkeit der Re-Exports in `public-api.ts`, peer-Dep-Auflösung,
  AOT-Template-Typfehler, Icon-Registrierung. Der Build subsumiert die APF-Gültigkeit
  — kein separater „baut die Lib“-Test nötig.
- Läuft bei PR/Push **und** als harte Vorbedingung (`needs:`) des Publish-Jobs.
- Prior Art: die bestehenden CI-Workflows (`storybook-angular.yml`, `css-core.yml`,
  `visual.yml`) — Node 22, Trigger auf `push` (main/`feat/**`) + `pull_request`.

**Bewusst kein Seam:** Unit-Tests der Wrapper-Interna. Das wäre Testen von
Implementierungsdetails; das relevante externe Verhalten hängt am Storybook-Seam.

## Out of Scope

- **Laufzeit-Komfort-Provider** (`provideConcisoDesignSystem()`), der CSS injiziert —
  in ADR-0001 verworfen, später optional nachrüstbar.
- **Sekundäre Entry-Points** pro Komponente — in ADR-0004 verworfen.
- **Unabhängiges Semver** statt Lockstep — in ADR-0004 verworfen.
- **Render-/Playwright-Check im Consumer-Smoke-Test** — vorerst nur das AOT-Build-Gate;
  Render-Absicherung bleibt bei den bestehenden Visual-Tests.
- **Öffentliche npm-Registry** — bleibt privat (`UNLICENSED`).
- **Fonts ins CSS einbetten**, um relative Pfade loszuwerden — eigenes, separates
  Vorhaben.
- **Migration bestehender Konsumenten** — es gibt noch keine.

## Further Notes

- Der springende Punkt der Wrapper-Architektur: Die Lib liefert kein CSS. Jeder
  Konsument **muss** die CSS-Schicht global einbinden; vergisst er es, rendern
  Komponenten unstyled (lautes, offensichtliches Signal).
- Die relativen Font-Pfade (`fonts.css` → `../fonts/*`) sind der Grund, warum die
  CSS-Einbindung beim Konsumenten über Angulars `assets`-Pipeline läuft statt über
  Laufzeit-Injektion (siehe ADR-0001).
- Storybook mappt bereits `../../css → /conciso/css` — das Muster der globalen
  CSS-Einbindung existiert also schon und wird für den Konsumenten nur dokumentiert.
- Der Bulk-Umzug sollte den in der Pilot-Scheibe etablierten Mustern folgen; die
  Icon-Registry (`icons/cds-icons.ts`) bleibt die einzige Import-Fläche für
  Komponenten-Icons.
