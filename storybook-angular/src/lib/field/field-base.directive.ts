/**
 * Re-Export-Shim (Ticket 02, "expand"-Schritt): FieldBase lebt jetzt in der Lib
 * (angular-lib/projects/design-system-angular/src/lib/field/field-base.directive.ts)
 * — der Quell-Code existiert nur noch dort (siehe
 * docs/adr/0002-topologie-und-quelle-der-wahrheit.md). Dieser Shim bleibt an der
 * alten Stelle stehen, damit die noch nicht migrierten Field-Komponenten
 * unverändert relativ auf './field-base.directive' importieren können. Wird im
 * "contract"-Abschlussticket (09) entfernt.
 */
export * from '../../../../angular-lib/projects/design-system-angular/src/lib/field/field-base.directive';
