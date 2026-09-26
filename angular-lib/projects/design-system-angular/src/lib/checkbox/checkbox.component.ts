import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CdsArea } from '../area';
import { CvaBase } from '../shared/cva-base.directive';

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
 *
 * Verwendungsguidance dieser Gruppe: siehe Textfeld (`komponenten-inputs-forms-textfeld--verwendung`).
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
      <!-- prettier-ignore -->
      <span style="font:var(--ty-body-md);color:var(--tx-secondary)"
        >{{ label() }}@if (linkLabel()) {&nbsp;<a class="body-link" [href]="linkHref()">{{ linkLabel() }}</a>}@if (required()) {&nbsp;<span class="req" aria-hidden="true">*</span>}</span
      >
    </label>
  `,
})
export class CheckboxComponent extends CvaBase<boolean> {
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

  /** @internal */
  protected override normalizeValue(value: boolean): boolean {
    return !!value;
  }
  /** @internal */
  protected override applyValue(value: boolean): void {
    this.checked.set(value);
  }
  /** @internal */
  protected override applyDisabled(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /** @internal */
  protected onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked.set(checked);
    this.onChange(checked);
  }
  /** @internal */
  protected markTouched(): void {
    this.onTouched();
  }
}
