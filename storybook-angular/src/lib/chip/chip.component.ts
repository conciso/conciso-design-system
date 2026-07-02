import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Chip — Wrapper um `.chip` aus css/components.css → „Badges & Chips".
 *
 * Interaktiver Filter-Chip auf Basis von `aria-pressed` (.chip[aria-pressed],
 * optional area-aware über [data-area]). Klick schaltet den Zustand um.
 *
 * Chips sind interaktive Elemente (Filter/Einstellungen), KEINE statischen Tags.
 * Für nicht-interaktive Bereichs-Labels die Badge- bzw. Pill-Komponente nutzen.
 */
@Component({
  selector: 'cds-chip',
  standalone: true,
  template: `
    <button
      class="chip"
      type="button"
      [attr.data-area]="area || null"
      [attr.aria-pressed]="pressed"
      (click)="toggle()"
    >
      {{ label }}
    </button>
  `,
})
export class ChipComponent {
  @Input() label = 'Filter';
  /** Markenbereich → data-area (area-aware Outline). */
  @Input() area?: CdsArea;
  /** Gedrückt/aktiv → aria-pressed="true". */
  @Input() pressed = false;

  toggle(): void {
    this.pressed = !this.pressed;
  }
}
