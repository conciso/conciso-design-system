import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CdsArea } from '../area';

/**
 * Checkbox — Einwilligungs-/Consent-Feld nach docs/index.html („Forms“).
 *
 * Bewusst KEIN nachgebautes Kästchen: ein natives `<input type="checkbox">` mit
 * `accent-color` in der Bereichsfarbe (genau wie die Doku), umschlossen von einem
 * `<label>` mit dem Einwilligungstext und optional verlinktem Datenschutzhinweis.
 * Dokumentierte Verwendung: Newsletter-/DSGVO-Einwilligung, i. d. R. `required`.
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); ohne Formular geht `[(checked)]` (checkedChange via model()).
 */
@Component({
  selector: 'cds-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true },
  ],
  template: `
    <label style="display:flex;align-items:flex-start;gap:var(--s3);cursor:pointer">
      <input
        type="checkbox"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [style.accent-color]="'var(--' + area() + '-500)'"
        style="width:18px;height:18px;margin-top:2px;flex-shrink:0;cursor:pointer"
        (change)="onCheckboxChange($event)"
        (blur)="markTouched()"
      />
      <span style="font:var(--ty-body-md);color:var(--tx-secondary)"
        >{{ label() }}@if (linkLabel()) {&nbsp;<a class="body-link" [href]="linkHref()">{{ linkLabel() }}</a>}@if (required()) {&nbsp;<span class="req" aria-hidden="true">*</span>}</span
      >
    </label>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  /** Einwilligungstext neben der Checkbox. */
  readonly label = input('Ich bin einverstanden.');
  /** Optionaler verlinkter Hinweis am Ende des Labels (z. B. „Datenschutzhinweise“). */
  readonly linkLabel = input('');
  /** Ziel des verlinkten Hinweises. */
  readonly linkHref = input('#');
  /** Pflicht-Einwilligung → required + aria-required + .req-Sternchen am Label-Ende. */
  readonly required = input(false);
  /** Gesetzt/aktiv → checked. Two-Way (`[(checked)]`) UND Angular-Forms. */
  readonly checked = model(false);
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);
  /** Brand Area → accent-color der Checkbox. */
  readonly area = input<CdsArea>('co');

  private onChange: (value: boolean) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  private onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  /** @internal */
  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }
  /** @internal */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  /** @internal */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** @internal */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /** @internal */
  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked.set(checked);
    this.onChange(checked);
  }
  /** @internal */
  protected markTouched(): void {
    this.onTouched();
  }
}
