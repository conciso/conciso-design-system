# 02 — Pilot-Scheibe: Button + Topnav aus der Lib

**What to build:** Die erste vertikale Scheibe der Extraktion ist demoable: Button und
Topnav (samt der von Topnav mitgezogenen theme-switch `cycle-button` und der Icons)
leben in der [Angular-Lib](../../../CONTEXT.md#angular-lib), und Storybook rendert sie
aus der Lib — mit unverändertem Story-Inhalt und grüner Test-Suite. Damit sind alle
drei riskanten Kopplungen (CSS-Klassen, Fonts, Icons + Komponenten-Komposition) an
wenigen Komponenten bewiesen.

Der gemeinsame Kern (`CdsArea`/`area`, `theme-mode`, die Icon-Registry `cds-icons`,
`field-base`) zieht in die Lib um; in `storybook-angular` bleiben dünne
Re-Export-Shims an den alten Stellen stehen (**expand**), damit die noch nicht
migrierten Komponenten unverändert weiterkompilieren. Die Shims werden in Ticket 09
entfernt (**contract**).

**Blocked by:** 01

**Status:** done

- [x] Button lebt in der Lib und wird über `public-api.ts` exportiert, inkl. seiner öffentlichen Typen (`CdsButtonVariant`, `CdsButtonSize`, `CdsArea`).
- [x] Topnav und die von ihm genutzte theme-switch `cycle-button` leben in der Lib und werden über `public-api.ts` exportiert.
- [x] Der gemeinsame Kern (area/`CdsArea`, theme-mode, Icon-Registry, field-base) liegt in der Lib; `storybook-angular` behält Re-Export-Shims, sodass alle übrigen Komponenten unverändert kompilieren.
- [x] Die [DS-Glyphen](../../../CONTEXT.md#ds-glyphen) werden in der Icon-Registry aus `@conciso/design-system/icons` bezogen (ersetzt den relativen `../../../../icons/icons.js`-Pfad); `@ng-icons`-Heroicons bleiben die zweite Quelle.
- [x] Die Stories von Button, Topnav und cycle-button importieren die Komponenten aus der Lib; ihr Inhalt bleibt inhaltlich unverändert.
- [x] Storybook-Test-Runner (a11y/Interaktion) und Visual-Snapshots für die Pilot-Komponenten sind grün.
- [x] `ng build` der Lib erzeugt weiterhin ein gültiges APF-Paket, das die Pilot-Komponenten enthält.

## Umsetzungsnotiz

Beim Verdrahten der Pilot-Scheibe zeigte sich eine Lücke aus Ticket 01: `storybook-angular`
und `angular-lib` waren zwei unabhängige npm-Installationen. Das tsconfig-Pfad-Mapping auf
`public-api.ts` (ADR-0002) kompiliert Lib-Quellcode als Teil des Storybook-TS-Programms —
sobald echte, dekorierte Komponenten (statt der leeren Ticket-01-Platzhalter) die Grenze
überqueren, lädt jedes Projekt sein EIGENES physisches `@angular/core` (unterschiedliche
node_modules), wodurch `InputSignal`-Typen nominell auseinanderfallen (Storybook-Args-Typing
schlägt fehl) und im Browser-Bundle zwei Angular-Core-Instanzen nebeneinander liefen. Behoben
durch npm-Workspaces (`storybook-angular` + `angular-lib` als Workspaces im Root-`package.json`)
— dedupliziert `@angular/*`/`@ng-icons/*` in ein gemeinsames Root-`node_modules`. Root-Lockfile
ersetzt die beiden Projekt-Lockfiles; `.github/workflows/storybook-angular.yml` und `visual.yml`
installieren jetzt vom Repo-Root aus. Genau die Art Kopplungsfehler, die die Pilot-Scheibe laut
ADR-0003 an zwei statt vierzig Komponenten aufdecken soll.

Icon-Registry-Import: `@conciso/design-system/icons` löst zur Build-Zeit über eine neue
`devDependency` (`file:..`) in `angular-lib/package.json` auf (nur lokal für Typecheck/Build
der Lib und für Storybook — die publizierte `design-system-angular/package.json` behält
`@conciso/design-system` korrekt als `peerDependency`, siehe ADR-0001). ngtsc (anders als
plain `tsc`) greift die Ambient-Deklaration in `ds-icons-export.d.ts` nicht, wenn das Modul
real (aber ungetypt) auflöst → `// @ts-expect-error` am Import in `cds-icons.ts` dokumentiert
und unterdrückt das.
