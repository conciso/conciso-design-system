/**
 * Re-Export-Shim (Ticket 02, "expand"-Schritt): theme-mode lebt jetzt in der Lib
 * (angular-lib/projects/design-system-angular/src/lib/theme-switch/theme-mode.ts) —
 * der Quell-Code existiert nur noch dort (siehe
 * docs/adr/0002-topologie-und-quelle-der-wahrheit.md). Dieser Shim bleibt an der
 * alten Stelle stehen, damit die noch nicht migrierten Komponenten (und die
 * Storybook-Glue in .storybook/preview.ts) unverändert relativ importieren können.
 * Wird im "contract"-Abschlussticket (09) entfernt.
 */
export * from '../../../../angular-lib/projects/design-system-angular/src/lib/theme-switch/theme-mode';
