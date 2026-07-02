import { Component, Input } from '@angular/core';
import { FieldBase } from './field-base.directive';
import { FieldShellComponent } from './field-shell.component';

/**
 * Auswahlfeld — `<select>` im `.field`-Gerüst. Die Optionen kommen über `options`;
 * a11y-Verdrahtung wie beim Textfeld (aria-required/-invalid/-describedby).
 */
@Component({
  selector: 'cds-select-field',
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
      <select
        [id]="fieldId"
        [attr.aria-required]="required ? 'true' : null"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="error ? errorId : null"
      >
        @for (opt of options; track opt) {
          <option>{{ opt }}</option>
        }
      </select>
    </cds-field-shell>
  `,
})
export class SelectFieldComponent extends FieldBase {
  /** Auswahloptionen (erste dient üblicherweise als Platzhalter, z. B. „Bitte wählen"). */
  @Input() options: string[] = [];
}
