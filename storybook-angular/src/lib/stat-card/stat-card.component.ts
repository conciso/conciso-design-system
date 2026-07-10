import { Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * StatCard — Wrapper um `.card-stat` aus css/components.css → „Stat Card".
 *
 * Flache, statische Kennzahlen-Karte mit bereichsgefärbtem Top-Akzent (data-area),
 * großem Wert (.card-stat-value), Label (.card-stat-label) und optionalem
 * Trend-Pill (.card-stat-trend.up/.down) inkl. Richtungs-Pfeil — wie docs/index.html.
 */
@Component({
  selector: 'cds-stat-card',
  standalone: true,
  template: `
    <div class="card-stat" [attr.data-area]="area() || null">
      <p class="card-stat-value">{{ value() }}</p>
      <p class="card-stat-label">{{ label() }}</p>
      @if (trend()) {
        <span class="card-stat-trend" [class.up]="trend() === 'up'" [class.down]="trend() === 'down'">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path [attr.d]="trend() === 'up' ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z'" />
          </svg>
          {{ trendText() }}
        </span>
      }
    </div>
  `,
})
export class StatCardComponent {
  readonly value = input('98 %');
  readonly label = input('Kundenzufriedenheit');
  /** Markenbereich → data-area (Top-Akzent + Wertfarbe). */
  readonly area = input<CdsArea>('co');
  /** Trendrichtung → .card-stat-trend.up / .down (leer = kein Pill). */
  readonly trend = input<'up' | 'down'>();
  readonly trendText = input('+12 %');
}
