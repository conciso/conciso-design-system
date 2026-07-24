# 09 — Kern-Shims entfernen & Abschluss (contract)

**What to build:** Die Extraktion ist vollständig: Nach dem Umzug aller Komponenten
enthält `storybook-angular` keinen Komponenten-Code und keine Kern-Logik mehr,
sondern nur noch die `*.stories.ts` (plus die `foundations`-Stories) und importiert
ausschließlich aus der [Angular-Lib](../../../CONTEXT.md#angular-lib). Die in Ticket 02
angelegten Re-Export-Shims des gemeinsamen Kerns werden entfernt (**contract**), da
kein Konsument der alten Pfade mehr existiert.

**Blocked by:** 05, 06, 07, 08

**Status:** ready-for-agent

- [ ] Die Kern-Re-Export-Shims (area, theme-mode, Icon-Registry, field-base) in `storybook-angular` sind entfernt; nichts importiert mehr aus den alten Pfaden.
- [ ] `storybook-angular` enthält keinen Komponenten-Code mehr — nur `*.stories.ts` und die `foundations`-Stories; alle Imports zeigen auf die Lib.
- [ ] `public-api.ts` exportiert alle ~40 Komponenten und ihre öffentlichen Typen.
- [ ] Vollständiger Storybook-Test-Runner- und Visual-Snapshot-Lauf ist grün.
- [ ] Der Consumer-Smoke-Test (optional auf einen breiteren Komponenten-Ausschnitt erweitert) bleibt grün.
