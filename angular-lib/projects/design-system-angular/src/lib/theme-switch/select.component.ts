import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { type CdsSelectOption, SelectComponent } from '../select/select.component';
import { CDS_THEME_LABEL, cdsThemeModes, type CdsThemeMode, ThemeModeService } from './theme-mode';

/**
 * Theme-Dropdown — Theme-Umschalter auf Basis unseres Custom Select (cds-select):
 * gestylte Einzelauswahl mit Listbox-Popup und Häkchen. Vorgesehener Einsatz: nur in
 * den Einstellungen (Settings), NICHT als persistentes Element auf allen Seiten.
 *
 * `showSystem` schaltet zwischen Hell/Dunkel/System und binär Hell/Dunkel.
 */
@Component({
  selector: 'cds-theme-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent],
  template: `
    <cds-select
      label="Farbthema"
      [options]="options()"
      [value]="svc.mode()"
      (valueChange)="onChange($event)"
    />
  `,
})
export class ThemeSelectComponent {
  /** true → Hell/Dunkel/System, false → nur Hell/Dunkel. */
  readonly showSystem = input(true);

  /** @internal */
  protected readonly svc = inject(ThemeModeService);
  /** @internal */
  protected readonly options = computed<CdsSelectOption[]>(() =>
    cdsThemeModes(this.showSystem()).map((m) => ({ value: m, label: CDS_THEME_LABEL[m] })),
  );

  /** @internal */
  protected onChange(value: string | undefined): void {
    if (value) this.svc.set(value as CdsThemeMode);
  }
}
