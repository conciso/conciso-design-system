import { Component, input } from '@angular/core';

/**
 * Präsentations-Hülle für alle Field-Komponenten (intern, nicht als eigene Story).
 *
 * Rendert die gemeinsame `.field`-Struktur aus css/components.css — Label mit
 * optionalem Pflicht-Asterisk, Hilfetext und Fehlermeldung — und projiziert das
 * eigentliche Steuerelement via `<ng-content>`. So teilen sich Textfeld,
 * Textbereich und Auswahlfeld dieses Markup per Komposition, ohne Duplikat.
 */
@Component({
  selector: 'cds-field-shell',
  standalone: true,
  template: `
    <div class="field" [class.has-error]="!!error()">
      <label [attr.for]="fieldId()">
        {{ label() }}
        @if (required()) {
          <span class="req" aria-hidden="true">*</span>
        }
      </label>

      <ng-content></ng-content>

      @if (helper() && !error()) {
        <span class="helper">{{ helper() }}</span>
      }
      @if (error()) {
        <span class="error-msg" [id]="errorId()" role="alert">
          <!-- Exclamation-Circle-Icon wie docs/index.html. Noch inline: das Icon
               liegt nicht im Register (icons/icons.js); die externe Icon-Lib folgt
               auf feat/theme-switch, dann hier ersetzen. -->
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
          {{ error() }}
        </span>
      }
    </div>
  `,
})
export class FieldShellComponent {
  readonly label = input('');
  readonly required = input(false);
  readonly helper = input('');
  readonly error = input('');
  /** id des projizierten Steuerelements (für label/for). */
  readonly fieldId = input('');
  /** id der Fehlermeldung (für aria-describedby am Steuerelement). */
  readonly errorId = input('');
}
