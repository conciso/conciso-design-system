import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldBase } from './field-base.directive';
import { FieldShellComponent } from './field-shell.component';

/**
 * Textfeld — einzeiliges `<input>` im `.field`-Gerüst (E-Mail, Text, Tel, … über
 * `type`). Pflichtfelder tragen aria-required; im Fehlerzustand wird die Meldung
 * über aria-describedby/aria-invalid verknüpft — wie docs/index.html.
 *
 * Als `ControlValueAccessor` (siehe FieldBase) direkt an Angular-Formulare
 * anbindbar (`[(ngModel)]`, `formControlName`) bzw. ohne Formular per `[(value)]`.
 */
@Component({
  selector: 'cds-text-field',
  standalone: true,
  imports: [FieldShellComponent],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextFieldComponent), multi: true },
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
      <!-- required nativ zusätzlich zu aria-required: natives HTML5-required für die
           Formular-Validierung im Browser, aria-required für den Screenreader-Zustand. -->
      <input
        [id]="fieldId()"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      />
    </cds-field-shell>
  `,
})
export class TextFieldComponent extends FieldBase {
  /** input[type] (text, email, tel, …). */
  readonly type = input('text');
  readonly placeholder = input('');
}
