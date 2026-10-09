import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCircleAlert } from '../icons/cds-icons';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideCircleAlert],
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
        <span class="error-msg" [id]="errorId()" [attr.role]="quietError() ? null : 'alert'">
          <svg lucideCircleAlert size="24" [strokeWidth]="1.25" style="flex-shrink:0"></svg>
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
  /** Unterdrückt `role="alert"` an der Fehlermeldung (siehe `FieldBase.quietError`). */
  readonly quietError = input(false);
}
