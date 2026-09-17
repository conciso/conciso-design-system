import { Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Bereichs-Badge — passive Bereichs-Kennzeichnung auf Basis von `.badge` +
 * `[data-area]` aus css/components.css.
 *
 * Ordnet ein Element einer der vier Brand Areas zu (50er-Grund, 800er-Text).
 * Nicht interaktiv. Für Zustände die Status-Badge, für einen redaktionellen
 * Anker im Lesefluss die Pill nutzen; für interaktive Filter den Chip.
 */
@Component({
  selector: 'cds-area-badge',
  standalone: true,
  template: `<span class="badge" [attr.data-area]="area()">{{ label() }}</span>`,
})
export class AreaBadgeComponent {
  /** Sichtbarer Text der Badge. */
  readonly label = input.required<string>();
  /** Brand Area → data-area (bestimmt die Bereichsfarbe). */
  readonly area = input<CdsArea>('co');
}
