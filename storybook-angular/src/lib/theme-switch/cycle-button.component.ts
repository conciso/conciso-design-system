import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroComputerDesktop, heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { CDS_THEME_ICON, CDS_THEME_LABEL, cdsThemeModes, ThemeModeService } from './theme-mode';

/**
 * Theme-Cycle-Button — ein einzelner Icon-Button (Stil `.ep-nav-icon-btn` aus der
 * Topnav), der bei Klick durch die Modi zyklt. Das Icon zeigt den aktuellen Modus.
 * Vorgesehener Einsatz: im Header. Icons aus @ng-icons/heroicons.
 *
 * `triState` schaltet zwischen tri (Hell→Dunkel→System) und binär (Hell→Dunkel).
 */
@Component({
  selector: 'cds-theme-cycle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroSun, heroMoon, heroComputerDesktop })],
  template: `
    <button
      class="ep-nav-icon-btn"
      type="button"
      [attr.aria-label]="'Farbthema: ' + label() + ' — klicken zum Wechseln'"
      (click)="next()"
    >
      <ng-icon [name]="icon()" size="22px" aria-hidden="true" />
    </button>
  `,
})
export class ThemeCycleComponent {
  /** true → Hell/Dunkel/System, false → nur Hell/Dunkel. */
  readonly triState = input(true);

  protected readonly svc = inject(ThemeModeService);
  protected readonly icon = computed(() => CDS_THEME_ICON[this.svc.mode()]);
  protected readonly label = computed(() => CDS_THEME_LABEL[this.svc.mode()]);

  next(): void {
    const order = cdsThemeModes(this.triState());
    const i = order.indexOf(this.svc.mode());
    this.svc.set(order[(i + 1) % order.length]);
  }
}
