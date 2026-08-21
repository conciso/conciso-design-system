import { Component, input } from '@angular/core';

/** Ein Logo: in der Regel ein Bild; der Text dient als Alt-Fallback und als Platzhalter. */
export interface CdsLogo {
  /** Firmen-/Markenname. Pflicht – dient als Alt-Text-Fallback UND als Text-Platzhalter,
   *  falls (noch) kein Bild vorliegt. */
  label: string;
  /** Bildquelle (URL oder Data-URI). Gesetzt → Bild wird gezeigt, sonst der Text-Platzhalter. */
  src?: string;
  /** Alt-Text des Bilds (Fallback: `label`). */
  alt?: string;
}

/**
 * Logo — einzelne Logo-Kachel (`.logo-tile` aus css/components.css).
 *
 * Rendert bevorzugt ein **Bild** (`src`); ohne Bild fällt es auf den Text-`label`
 * als Platzhalter zurück (`.logo-placeholder`). So lässt es sich sowohl im
 * Logo-Carousel als auch eigenständig verwenden (Partner-Leiste, „Bekannt aus“-Reihe,
 * Footer). Die Host-Klasse `logo-tile` trägt Flex-Zentrierung/Padding aus der portablen CSS.
 */
@Component({
  selector: 'cds-logo',
  standalone: true,
  host: { class: 'logo-tile' },
  template: `
    @if (src()) {
      <img [src]="src()" [alt]="alt() || label()" />
    } @else {
      <span class="logo-placeholder">{{ label() }}</span>
    }
  `,
})
export class LogoComponent {
  readonly label = input.required<string>();
  /** Bildquelle; gesetzt → Bild statt Text-Platzhalter. */
  readonly src = input<string>();
  /** Alt-Text des Bilds (Fallback: `label`). */
  readonly alt = input('');
}
