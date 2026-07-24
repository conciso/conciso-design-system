# 07 — Bulk-Batch C: Content & Daten-Anzeige

**What to build:** Die Content- und Daten-Anzeige-Komponenten ziehen nach dem
Pilot-Muster in die [Angular-Lib](../../../CONTEXT.md#angular-lib) um und werden von
Storybook aus der Lib gerendert. Betrifft: card, stat-card, stat-strip, blockquote,
code-block, faq, scale, snackbar, testimonial, team-voice, download-cta.

**Blocked by:** 02

**Status:** ready-for-agent

- [x] Alle genannten Komponenten leben in der Lib und werden über `public-api.ts` exportiert, inkl. ihrer öffentlichen Typen.
- [x] Icon-nutzende Komponenten beziehen ihre Icons über die zentrale Icon-Registry.
- [x] Die zugehörigen Stories importieren aus der Lib; ihr Inhalt bleibt inhaltlich unverändert.
- [x] Storybook-Test-Runner und Visual-Snapshots dieser Komponenten sind grün.
