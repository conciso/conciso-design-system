import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
 *
 * Verwendungsguidance dieser Gruppe: siehe Chip (`komponenten-chips-badges-pills-chip--verwendung`).
 */
@Component({
  selector: 'cds-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge badge-{{ tone() }}">{{ label() }}</span>`,
})
export class StatusBadgeComponent {
  /** Sichtbarer Text der Badge. */
  readonly label = input.required<string>();
  /** Status-Ton → semantische Farbe. */
  readonly tone = input<CdsBadgeTone>('ok');
}
