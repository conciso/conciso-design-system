import { Component, input, output } from '@angular/core';

export type CdsSnackTone = 'def' | 'ok' | 'err';

/**
 * Snackbar — Wrapper um `.snack` aus css/components.css → „Snackbar".
 *
 * Kurze Statusmeldung in drei Tönen (.snack-def / .snack-ok / .snack-err) mit
 * führendem, tonfarbenem Icon (wie die Doku) und optionaler Aktion (.snack-act).
 * Ton „err" ist eine echte Fehlermeldung → role="alert" + aria-live="assertive";
 * def/ok bleiben role="status" + aria-live="polite" (wie im Doku-Markup).
 * Konsumiert nur bestehende Klassen.
 */
@Component({
  selector: 'cds-snackbar',
  standalone: true,
  template: `
    <div
      [class]="classes"
      [attr.role]="isError ? 'alert' : 'status'"
      [attr.aria-live]="isError ? 'assertive' : 'polite'"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        [attr.stroke]="iconStroke"
        stroke-width="1.25"
        aria-hidden="true"
        focusable="false"
        style="flex-shrink: 0"
      >
        <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="iconPath" />
      </svg>
      {{ message() }}
      @if (actionLabel()) {
        <button class="snack-act" type="button" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </div>
  `,
})
export class SnackbarComponent {
  readonly message = input('Formular gespeichert, noch nicht abgesendet.');
  /** Ton → .snack-def / .snack-ok / .snack-err */
  readonly tone = input<CdsSnackTone>('def');
  /** Optionaler Aktions-Button (.snack-act); leer = keiner. */
  readonly actionLabel = input('Jetzt senden');
  readonly action = output<void>();

  get classes(): string {
    return `snack snack-${this.tone()}`;
  }

  get isError(): boolean {
    return this.tone() === 'err';
  }

  /** Tonfarbe des Icons (wie im Doku-Markup). */
  get iconStroke(): string {
    return { def: '#80DEDE', ok: '#88f0c4', err: '#f9a8a8' }[this.tone()];
  }

  /** Lucide-artiger Pfad je Ton (Glühbirne / Häkchen-Kreis / Ausrufezeichen-Kreis). */
  get iconPath(): string {
    return {
      def: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
      ok: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      err: 'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z',
    }[this.tone()];
  }
}
