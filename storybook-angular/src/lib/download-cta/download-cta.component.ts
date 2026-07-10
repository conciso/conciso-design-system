import { Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * DownloadCta — Wrapper um `.cta-dl` aus css/components.css → „Download CTA".
 *
 * Aufmerksamkeitsstarker Download-Block mit bereichsgefärbtem Top-Akzent + Icon
 * (data-area), Eyebrow/Titel/Beschreibung/Meta und zwei Aktionen (primär/sekundär,
 * über die bestehenden `.btn`-Klassen). Konsumiert nur vorhandene Styles.
 */
@Component({
  selector: 'cds-download-cta',
  standalone: true,
  template: `
    <div class="cta-dl" [attr.data-area]="area() || null">
      <div class="cta-dl-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      </div>
      <div class="cta-dl-body">
        @if (eyebrow()) {
          <p class="cta-dl-eyebrow">{{ eyebrow() }}</p>
        }
        <h3 class="cta-dl-title">{{ title() }}</h3>
        <p class="cta-dl-desc">{{ desc() }}</p>
        @if (meta()) {
          <div class="cta-dl-meta">
            <span class="cta-strip-meta">{{ meta() }}</span>
          </div>
        }
      </div>
      <div class="cta-dl-actions">
        <button [class]="'btn btn-filled btn-' + area()" type="button">{{ primaryLabel() }}</button>
        @if (secondaryLabel()) {
          <button [class]="'btn btn-text btn-' + area()" type="button">{{ secondaryLabel() }}</button>
        }
      </div>
    </div>
  `,
})
export class DownloadCtaComponent {
  /** Markenbereich → data-area (Top-Akzent, Icon-Tönung, Button-Farbe). */
  readonly area = input<CdsArea>('co');
  readonly eyebrow = input('Conciso Design System');
  readonly title = input('Figma-Bibliothek herunterladen');
  readonly desc = input(
    'Alle Komponenten, Tokens, Icons und Brand Assets, direkt einsatzbereit als Figma-Bibliothek.',
  );
  readonly meta = input('Figma · Version 1.0 · 48 MB');
  readonly primaryLabel = input('Herunterladen');
  readonly secondaryLabel = input('Vorschau ansehen');
}
