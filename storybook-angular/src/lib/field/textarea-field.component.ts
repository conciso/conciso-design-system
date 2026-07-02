import { Component, Input } from '@angular/core';
import { FieldBase } from './field-base.directive';
import { FieldShellComponent } from './field-shell.component';

/**
 * Textbereich — mehrzeiliges `<textarea>` im `.field`-Gerüst. Gleiche a11y-
 * Verdrahtung wie das Textfeld (aria-required/-invalid/-describedby).
 */
@Component({
  selector: 'cds-textarea-field',
  standalone: true,
  imports: [FieldShellComponent],
  template: `
    <cds-field-shell
      [label]="label"
      [required]="required"
      [helper]="helper"
      [error]="error"
      [fieldId]="fieldId"
      [errorId]="errorId"
    >
      <textarea
        [id]="fieldId"
        [placeholder]="placeholder"
        [attr.aria-required]="required ? 'true' : null"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="error ? errorId : null"
      ></textarea>
    </cds-field-shell>
  `,
})
export class TextareaFieldComponent extends FieldBase {
  @Input() placeholder = '';
}
