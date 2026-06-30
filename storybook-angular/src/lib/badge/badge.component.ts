import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/** Status-Töne der bestehenden Badge-Klassen (.badge-ok/.badge-warn/.badge-err/.badge-neu). */
export type CdsBadgeTone = 'ok' | 'warn' | 'err' | 'neu';

/**
 * Badge — Wrapper um `.badge` aus css/components.css → „Badges & Chips".
 *
 * Zwei sich ausschließende Färbungs-Modi, beide bereits im CSS vorhanden:
 *  - Status-Ton via Klasse: .badge-ok / .badge-warn / .badge-err / .badge-neu
 *  - Markenbereich via Attribut: .badge[data-area="co|ki|es|wo"]
 * Ist `area` gesetzt, hat es Vorrang (es wird dann kein Ton-Modifier ausgegeben).
 */
@Component({
  selector: 'cds-badge',
  standalone: true,
  template: `<span [class]="classes" [attr.data-area]="area || null">{{ label }}</span>`,
})
export class BadgeComponent {
  @Input() label = 'Badge';
  /** Status-Ton (ignoriert, wenn `area` gesetzt ist). */
  @Input() tone: CdsBadgeTone = 'neu';
  /** Markenbereich → data-area. Hat Vorrang vor `tone`. */
  @Input() area?: CdsArea;

  get classes(): string {
    return this.area ? 'badge' : `badge badge-${this.tone}`;
  }
}
