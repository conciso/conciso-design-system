import { Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Blockquote — Wrapper um `.bq` aus css/components.css → „Blockquote“.
 *
 * Bereichsgefärbtes Zitat mit linker Akzentleiste und getöntem Grund (data-area),
 * Quote-Icon (ui-quote, dieselbe Glyphe wie docs/index.html), Zitat und
 * Caption (Name/Rolle). Nur bestehende Klassen.
 */
@Component({
  selector: 'cds-blockquote',
  standalone: true,
  template: `
    <figure class="bq" [attr.data-area]="area() || null">
      <svg class="bq-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </svg>
      <blockquote>{{ quote() }}</blockquote>
      @if (name() || roleLabel()) {
        <figcaption class="bq-caption">
          @if (name()) {
            <span class="bq-name">{{ name() }}</span>
          }
          @if (roleLabel()) {
            <span class="bq-role">{{ roleLabel() }}</span>
          }
        </figcaption>
      }
    </figure>
  `,
})
export class BlockquoteComponent {
  readonly quote = input(
    'Klare Kommunikation schafft Vertrauen, lange bevor das erste Meeting stattfindet.',
  );
  readonly name = input('Maria Schneider');
  readonly roleLabel = input('Head of Marketing, Musterunternehmen GmbH');
  /** Markenbereich → data-area (Akzentleiste + getönter Grund). */
  readonly area = input<CdsArea>('co');
}
