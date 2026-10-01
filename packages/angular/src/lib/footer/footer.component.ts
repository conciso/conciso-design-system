import { ChangeDetectionStrategy, Component } from '@angular/core';

// Re-Export für Konsumenten, die die Typen weiter aus footer.component beziehen.
export type { CdsFooterLink, CdsSocialLink, CdsSocialPlatform } from './footer-bottom.component';

/**
 * Footer — `<footer>`-Landmark (`.footer`, Zwei-Band-Stack) als schlanke Hülle. Die
 * beiden Bänder werden als `<cds-footer-main>` und `<cds-footer-bottom>` projiziert:
 *
 * ```html
 * <cds-footer>
 *   <cds-footer-main ...></cds-footer-main>
 *   <cds-footer-bottom ...></cds-footer-bottom>
 * </cds-footer>
 * ```
 *
 * So lassen sich oberer und unterer Teil einzeln betrachten und unabhängig
 * konfigurieren; `.footer` stapelt sie (flex column) im Seitenfuß-Landmark.
 */
@Component({
  selector: 'cds-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer" aria-label="Seitenfuß">
      <ng-content></ng-content>
    </footer>
  `,
})
export class FooterComponent {}
