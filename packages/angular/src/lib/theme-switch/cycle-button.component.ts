import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CDS_ICON_STROKE, LucideDynamicIcon } from '../icons/cds-icons';
import { CDS_THEME_ICON, CDS_THEME_LABEL, cdsThemeModes, ThemeModeService } from './theme-mode';

/**
 * Theme-Cycle-Button — ein einzelner Icon-Button (Stil `.ep-nav-icon-btn` aus der
 * Topnav), der bei Klick durch die Modi zyklt. Das Icon zeigt den aktuellen Modus.
 * Vorgesehener Einsatz: im Header. Icons über die zentrale Registry (lib/icons/cds-icons).
 *
 * `showSystem` schaltet zwischen tri (Hell→Dunkel→System) und binär (Hell→Dunkel).
 */
@Component({
  selector: 'cds-theme-cycle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideDynamicIcon],
  template: `
    <button
      class="ep-nav-icon-btn"
      type="button"
      [attr.aria-label]="'Farbthema: ' + label() + ', klicken zum Wechseln'"
      (click)="next()"
    >
      <svg [lucideIcon]="icon()" size="22" [strokeWidth]="iconStroke"></svg>
    </button>
  `,
})
export class ThemeCycleComponent {
  /** @internal */
  protected readonly iconStroke = CDS_ICON_STROKE;
  /** true → Hell/Dunkel/System, false → nur Hell/Dunkel. */
  readonly showSystem = input(true);

  /** @internal */
  protected readonly svc = inject(ThemeModeService);
  /** @internal */
  protected readonly icon = computed(() => CDS_THEME_ICON[this.svc.mode()]);
  /** @internal */
  protected readonly label = computed(() => CDS_THEME_LABEL[this.svc.mode()]);

  /** @internal */
  protected next(): void {
    const order = cdsThemeModes(this.showSystem());
    const i = order.indexOf(this.svc.mode());
    this.svc.set(order[(i + 1) % order.length]);
  }
}
