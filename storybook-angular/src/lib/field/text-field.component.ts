import { Component, Input } from '@angular/core';
import { FieldBase } from './field-base.directive';
import { FieldShellComponent } from './field-shell.component';

/**
 * Textfeld — einzeiliges `<input>` im `.field`-Gerüst (E-Mail, Text, Tel, … über
 * `type`). Pflichtfelder tragen aria-required; im Fehlerzustand wird die Meldung
 * über aria-describedby/aria-invalid verknüpft — wie docs/index.html.
 */
@Component({
  selector: 'cds-text-field',
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
      <input
        [id]="fieldId"
        [type]="type"
        [placeholder]="placeholder"
        [attr.aria-required]="required ? 'true' : null"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="error ? errorId : null"
      />
    </cds-field-shell>
  `,
})
export class TextFieldComponent extends FieldBase {
  /** input[type] (text, email, tel, …). */
  @Input() type = 'text';
  @Input() placeholder = '';
}
