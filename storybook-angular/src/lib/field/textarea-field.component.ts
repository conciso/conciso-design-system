import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldBase } from './field-base.directive';
import { FieldShellComponent } from './field-shell.component';

/**
 * Textbereich — mehrzeiliges `<textarea>` im `.field`-Gerüst. Gleiche a11y-
 * Verdrahtung wie das Textfeld (aria-required/-invalid/-describedby).
 *
 * Als `ControlValueAccessor` (siehe FieldBase) direkt an Angular-Formulare
 * anbindbar (`[(ngModel)]`, `formControlName`) bzw. ohne Formular per `[(value)]`.
 */
@Component({
  selector: 'cds-textarea-field',
  standalone: true,
  imports: [FieldShellComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaFieldComponent), multi: true },
  ],
  template: `
    <cds-field-shell
      [label]="label()"
      [required]="required()"
      [helper]="helper()"
      [error]="error()"
      [fieldId]="fieldId()"
      [errorId]="errorId"
    >
      <textarea
        [id]="fieldId()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      ></textarea>
    </cds-field-shell>
  `,
})
export class TextareaFieldComponent extends FieldBase {
  readonly placeholder = input('');
}
