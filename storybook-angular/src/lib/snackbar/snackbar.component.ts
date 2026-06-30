import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CdsSnackTone = 'def' | 'ok' | 'err';

/**
 * Snackbar — Wrapper um `.snack` aus css/components.css → „Snackbar".
 *
 * Kurze Statusmeldung (role="status", aria-live="polite") in drei Tönen
 * (.snack-def / .snack-ok / .snack-err) mit optionaler Aktion (.snack-act).
 * Konsumiert nur bestehende Klassen.
 */
@Component({
  selector: 'cds-snackbar',
  standalone: true,
  template: `
    <div [class]="classes" role="status" aria-live="polite">
      {{ message }}
      @if (actionLabel) {
        <button class="snack-act" type="button" (click)="action.emit()">{{ actionLabel }}</button>
      }
    </div>
  `,
})
export class SnackbarComponent {
  @Input() message = 'Formular gespeichert, noch nicht abgesendet.';
  /** Ton → .snack-def / .snack-ok / .snack-err */
  @Input() tone: CdsSnackTone = 'def';
  /** Optionaler Aktions-Button (.snack-act); leer = keiner. */
  @Input() actionLabel = 'Jetzt senden';
  @Output() action = new EventEmitter<void>();

  get classes(): string {
    return `snack snack-${this.tone}`;
  }
}
