import { Component, input } from '@angular/core';

/** Status-Töne der Badge-Klassen (.badge-ok / .badge-warn / .badge-err / .badge-neu). */
export type CdsBadgeTone = 'ok' | 'warn' | 'err' | 'neu';

/**
 * Status-Badge — passive Zustands-Kennzeichnung auf Basis von `.badge` +
 * `.badge-{ok|warn|err|neu}` aus css/components.css.
 *
 * Trägt einen Zustand über semantische Farben (OK, Warnung, Fehler, Neutral) —
 * z. B. „Live“, „Beta“, „Deprecated“, „Draft“. Nicht interaktiv. Für die
 * Zuordnung zu einer Brand Area die Bereichs-Badge, für einen redaktionellen
 * Anker im Lesefluss die Pill nutzen; für interaktive Filter den Chip.
 */
@Component({
  selector: 'cds-status-badge',
  standalone: true,
  template: `<span class="badge badge-{{ tone() }}">{{ label() }}</span>`,
})
export class StatusBadgeComponent {
  readonly label = input('Live');
  /** Status-Ton → semantische Farbe. */
  readonly tone = input<CdsBadgeTone>('ok');
}
