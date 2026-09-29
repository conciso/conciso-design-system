import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/** Eine Kennzahl im Stat-Strip. */
export interface CdsFlatStat {
  area?: CdsArea;
  value: string;
  label: string;
}

/**
 * StatStrip — Wrapper um `.card-stat-strip` + `.card-stat-flat` aus
 * css/components.css → „Stat-Strip“. Flacher Bandstreifen (auto-fit-Grid auf
 * --n-50-Grund) mit zentrierten Kennzahlen ohne Rahmen/Schatten; Wert je
 * Bereich getönt via [data-area]. Genau wie docs/index.html.
 *
 * Verwendungsguidance dieser Gruppe: siehe Card (`komponenten-cards-teaser-card--verwendung`).
 */
@Component({
  selector: 'cds-stat-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card-stat-strip" [style.border-radius]="rounded() ? 'var(--r-lg)' : null">
      @for (stat of stats(); track stat) {
        <div class="card-stat-flat" [attr.data-area]="stat.area || null">
          <p class="card-stat-flat-value">{{ stat.value }}</p>
          <p class="card-stat-flat-label">{{ stat.label }}</p>
        </div>
      }
    </div>
  `,
})
export class StatStripComponent {
  /** Kennzahlen des Streifens. */
  readonly stats = input.required<CdsFlatStat[]>();
  /** Abgerundete Ecken (--r-lg) wie in der Doku-Verwendung. */
  readonly rounded = input(true);
}
