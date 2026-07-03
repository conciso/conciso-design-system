import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroComputerDesktop, heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import {
  CDS_THEME_ICON,
  CDS_THEME_LABEL,
  cdsThemeModes,
  type CdsThemeMode,
  ThemeModeService,
} from './theme-mode';

/**
 * Theme-Dropdown — natives `<select>` in `.field`-Optik. Ein Icon (Heroicons) am
 * Label spiegelt den aktuellen Modus. Platzsparend, voll tastaturbedienbar über das
 * native Select. Vorgesehener Einsatz: nur in den Einstellungen (Settings), NICHT
 * als persistentes Element auf allen Seiten.
 *
 * `triState` schaltet zwischen tri (Hell/Dunkel/System) und binär (Hell/Dunkel).
 */
@Component({
  selector: 'cds-theme-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroSun, heroMoon, heroComputerDesktop })],
  template: `
    <div class="field" style="margin-bottom:0">
      <label for="cds-theme-select">
        <ng-icon [name]="icon()" size="14px" aria-hidden="true" /> Farbthema
      </label>
      <select id="cds-theme-select" [value]="svc.mode()" (change)="onChange($event)">
        @for (m of order(); track m) {
          <option [value]="m">{{ label[m] }}</option>
        }
      </select>
    </div>
  `,
})
export class ThemeSelectComponent {
  /** true → Hell/Dunkel/System, false → nur Hell/Dunkel. */
  readonly triState = input(true);

  protected readonly svc = inject(ThemeModeService);
  protected readonly label = CDS_THEME_LABEL;
  protected readonly icon = computed(() => CDS_THEME_ICON[this.svc.mode()]);
  protected readonly order = computed(() => cdsThemeModes(this.triState()));

  onChange(event: Event): void {
    this.svc.set((event.target as HTMLSelectElement).value as CdsThemeMode);
  }
}
