import { Component, Input } from '@angular/core';

/**
 * Field — Wrapper um `.field` aus css/components.css → „Forms".
 *
 * Label (mit optionalem .req-Asterisk), Steuerelement (input | textarea | select),
 * optionaler .helper-Text und .error-msg im Fehlerzustand (.field.has-error).
 * A11y-Verdrahtung wie docs/index.html: Pflichtfelder tragen aria-required, der
 * Fehler ist eine role="alert"-Meldung mit Warn-Icon und wird über aria-describedby
 * mit dem Steuerelement verknüpft (aria-invalid).
 */
@Component({
  selector: 'cds-field',
  standalone: true,
  template: `
    <div class="field" [class.has-error]="!!error">
      <label [attr.for]="fieldId">
        {{ label }}
        @if (required) {
          <span class="req" aria-hidden="true">*</span>
        }
      </label>

      @switch (control) {
        @case ('textarea') {
          <textarea
            [id]="fieldId"
            [placeholder]="placeholder"
            [attr.aria-required]="required ? 'true' : null"
            [attr.aria-invalid]="error ? 'true' : null"
            [attr.aria-describedby]="error ? errorId : null"
          ></textarea>
        }
        @case ('select') {
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
        }
        @default {
          <input
            [id]="fieldId"
            [type]="type"
            [placeholder]="placeholder"
            [attr.aria-required]="required ? 'true' : null"
            [attr.aria-invalid]="error ? 'true' : null"
            [attr.aria-describedby]="error ? errorId : null"
          />
        }
      }

      @if (helper && !error) {
        <span class="helper">{{ helper }}</span>
      }
      @if (error) {
        <span class="error-msg" [id]="errorId" role="alert">
          <!-- Exclamation-Circle-Icon wie docs/index.html. -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            aria-hidden="true"
            style="flex-shrink:0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          {{ error }}
        </span>
      }
    </div>
  `,
})
export class FieldComponent {
  @Input() label = 'E-Mail';
  /** Art des Steuerelements. */
  @Input() control: 'input' | 'textarea' | 'select' = 'input';
  /** input[type] für control="input". */
  @Input() type = 'text';
  @Input() placeholder = 'name@firma.de';
  @Input() helper = 'Wir nutzen die Adresse ausschließlich für die Antwort.';
  /** Gesetzt = Fehlerzustand (.has-error + .error-msg). */
  @Input() error = '';
  @Input() required = false;
  @Input() options: string[] = ['Bitte wählen', 'Option A', 'Option B'];
  /** Eindeutige id für die label/for- und aria-describedby-Verknüpfung. */
  @Input() fieldId = 'cds-field';

  get errorId(): string {
    return `${this.fieldId}-error`;
  }
}
