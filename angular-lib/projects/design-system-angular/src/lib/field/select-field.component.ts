import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldBase } from './field-base.directive';
import { FieldShellComponent } from './field-shell.component';

/**
 * Auswahlfeld — `<select>` im `.field`-Gerüst. Die Optionen kommen über `options`;
 * a11y-Verdrahtung wie beim Textfeld (aria-required/-invalid/-describedby).
 *
 * Als `ControlValueAccessor` (siehe FieldBase) direkt an Angular-Formulare
 * anbindbar (`[(ngModel)]`, `formControlName`) bzw. ohne Formular per `[(value)]`.
 */
@Component({
  selector: 'cds-select-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FieldShellComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
  template: `
    <cds-field-shell
      [label]="label()"
      [required]="required()"
      [helper]="helper()"
      [error]="error()"
      [fieldId]="fieldId()"
      [errorId]="errorId()"
    >
      <!-- required nativ zusätzlich zu aria-required: natives HTML5-required für die
           Formular-Validierung im Browser, aria-required für den Screenreader-Zustand. -->
      <select
        [id]="fieldId()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId() : null"
        (change)="handleInput($event)"
        (blur)="handleBlur()"
      >
        @for (opt of options(); track opt) {
          <option>{{ opt }}</option>
        }
      </select>
    </cds-field-shell>
  `,
})
export class SelectFieldComponent extends FieldBase {
  /** Auswahloptionen (erste dient üblicherweise als Platzhalter, z. B. „Bitte wählen“). */
  readonly options = input<string[]>([]);
}
