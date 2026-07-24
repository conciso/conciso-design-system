# 06 — Bulk-Batch B: Layout & Navigation

**What to build:** Die Layout-, Navigations- und Marken-Komponenten ziehen nach dem
Pilot-Muster in die [Angular-Lib](../../../CONTEXT.md#angular-lib) um und werden von
Storybook aus der Lib gerendert. Betrifft: footer, footer-main, footer-bottom,
area-tab, area-tabs, logo, logo-carousel, carousel sowie die restlichen theme-switch
Varianten (segment-tri, select). (Topnav und theme-switch cycle-button liegen bereits
seit Ticket 02 in der Lib.)

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Alle genannten Komponenten leben in der Lib und werden über `public-api.ts` exportiert, inkl. ihrer öffentlichen Typen (z.B. `ThemeMode` für die theme-switch Varianten).
- [ ] Icon-nutzende Komponenten beziehen ihre Icons über die zentrale Icon-Registry.
- [ ] Die zugehörigen Stories importieren aus der Lib; ihr Inhalt bleibt inhaltlich unverändert.
- [ ] Storybook-Test-Runner und Visual-Snapshots dieser Komponenten sind grün.
