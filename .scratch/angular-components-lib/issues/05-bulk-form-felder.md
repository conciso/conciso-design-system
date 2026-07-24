# 05 — Bulk-Batch A: Form-Felder & Eingaben

**What to build:** Die Eingabe- und Formular-Komponenten ziehen nach dem in der
Pilot-Scheibe etablierten Muster in die [Angular-Lib](../../../CONTEXT.md#angular-lib)
um und werden von Storybook aus der Lib gerendert. Betrifft: field-shell,
text-field, textarea-field, select-field, checkbox, radio-group, select, combobox,
slider. (Der Kern `field-base` liegt bereits seit Ticket 02 in der Lib.)

**Blocked by:** 02

**Status:** ready-for-agent

- [x] Alle genannten Komponenten leben in der Lib und werden über `public-api.ts` exportiert, inkl. ihrer öffentlichen Typen.
- [x] Icon-nutzende Komponenten (select, combobox) beziehen ihre Icons über die zentrale Icon-Registry, nie direkt aus `@ng-icons/heroicons`.
- [x] Die zugehörigen Stories importieren aus der Lib; ihr Inhalt bleibt inhaltlich unverändert.
- [x] Storybook-Test-Runner und Visual-Snapshots dieser Komponenten sind grün.
