# 06 — Bulk-Batch B: Layout & Navigation

**What to build:** Die Layout-, Navigations- und Marken-Komponenten ziehen nach dem
Pilot-Muster in die [Angular-Lib](../../../CONTEXT.md#angular-lib) um und werden von
Storybook aus der Lib gerendert. Betrifft: footer, footer-main, footer-bottom,
area-tab, area-tabs, logo, logo-carousel, carousel sowie die restlichen theme-switch
Varianten (segment-tri, select). (Topnav und theme-switch cycle-button liegen bereits
seit Ticket 02 in der Lib.)

**Blocked by:** 02

**Status:** done

- [x] Alle genannten Komponenten leben in der Lib und werden über `public-api.ts` exportiert, inkl. ihrer öffentlichen Typen (z.B. `ThemeMode` für die theme-switch Varianten).
- [x] Icon-nutzende Komponenten beziehen ihre Icons über die zentrale Icon-Registry.
- [x] Die zugehörigen Stories importieren aus der Lib; ihr Inhalt bleibt inhaltlich unverändert.
- [x] Storybook-Test-Runner und Visual-Snapshots dieser Komponenten sind grün.

**Umsetzungsnotiz:** `theme-switch/select.component.ts` (ThemeSelectComponent) hat eine
Hard-Dependency auf die generische `select.component.ts` (formal Ticket 05,
Bulk-Batch A). Da sie noch nicht migriert war, wurde sie hier vorgezogen
mitverschoben (`lib/select/select.component.ts`, zusätzlich in `public-api.ts`
exportiert) und an der alten Stelle als Re-Export-Shim belassen (analog zum
Ticket-02-Muster), damit die noch nicht migrierte `combobox.component.ts`
unverändert relativ importieren kann. Ticket 05 sollte dies vorfinden und nur noch
den Shim entfernen + `combobox.component.ts` direkt umstellen. Details im
Shim-Kommentar (`storybook-angular/src/lib/select/select.component.ts`) und in
`public-api.ts`.

Zusätzlich musste ein latenter AOT-Template-Typfehler in
`theme-switch/select.component.ts` behoben werden (`onChange` akzeptierte nur
`string`, `valueChange` von `cds-select` liefert aber `string | undefined`) —
sichtbar erst durch `ng build` (strictTemplates), nicht durch den bisherigen
Storybook-Seam.
