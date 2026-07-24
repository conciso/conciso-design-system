# 01 — Lib-Workspace scaffolden (Prefactor)

**What to build:** Ein neues, publizierbares Angular-Lib-Projekt
(`@conciso/design-system-angular`) existiert als eigener Angular-CLI-Workspace neben
`storybook-angular/` und lässt sich mit ng-packagr zu einem gültigen Angular Package
Format bauen — noch ohne Komponenten. Storybook läuft unverändert weiter und ist so
verdrahtet, dass es die Lib künftig über die TS-Quelle (`public-api.ts`) konsumiert.
Dies ist das Fundament, auf dem alle folgenden Tickets aufsetzen.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] Neues Angular-CLI-Workspace-Projekt für die Angular-Lib liegt neben `storybook-angular/` und ist in `cds.code-workspace` als ein Ordner-Eintrag registriert.
- [x] Der Build läuft über ng-packagr (Angular Package Format); `ng build` der Lib erzeugt ein gültiges Paket mit `public-api.ts` als einzigem Einstiegspunkt.
- [x] Das `package.json` der Lib deklariert `@angular/*` als peerDependency (`^21.2.0`), `@conciso/design-system` als peerDependency (Lockstep, eng gepinnt) und `@ng-icons/core` + `@ng-icons/heroicons` als normale dependency.
- [x] Storybook ist per tsconfig-Pfad-Mapping auf `public-api.ts` der Lib verdrahtet; `storybook-angular` startet weiterhin fehlerfrei.
- [x] Paketname ist `@conciso/design-system-angular`; Version im Lockstep mit dem CSS-Paket.
