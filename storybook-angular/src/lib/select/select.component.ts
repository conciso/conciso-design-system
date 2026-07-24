/**
 * Re-Export-Shim (Ticket 05, "expand"-Schritt): SelectComponent lebt jetzt in der Lib
 * (angular-lib/projects/design-system-angular/src/lib/select/select.component.ts) —
 * der Quell-Code existiert nur noch dort (siehe
 * docs/adr/0002-topologie-und-quelle-der-wahrheit.md). Dieser Shim bleibt an der
 * alten Stelle stehen, damit die noch nicht migrierte theme-switch/select.component.ts
 * unverändert relativ auf '../select/select.component' importieren kann. Wird im
 * "contract"-Abschlussticket (09) entfernt.
 */
export * from '../../../../angular-lib/projects/design-system-angular/src/lib/select/select.component';
