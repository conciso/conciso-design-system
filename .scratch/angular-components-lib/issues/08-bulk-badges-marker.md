# 08 — Bulk-Batch D: Badges & Marker

**What to build:** Die kleinen Marker- und Badge-Komponenten ziehen nach dem
Pilot-Muster in die [Angular-Lib](../../../CONTEXT.md#angular-lib) um und werden von
Storybook aus der Lib gerendert. Betrifft: area-badge, status-badge, chip, pill.

**Blocked by:** 02

**Status:** done

- [x] Alle genannten Komponenten leben in der Lib und werden über `public-api.ts` exportiert, inkl. ihrer öffentlichen Typen (z.B. `CdsArea`-abhängige Varianten).
- [x] Die zugehörigen Stories importieren aus der Lib; ihr Inhalt bleibt inhaltlich unverändert.
- [x] Storybook-Test-Runner und Visual-Snapshots dieser Komponenten sind grün.
