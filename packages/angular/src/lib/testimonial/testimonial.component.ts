import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CdsArea } from '../area';
import { CDS_ICON_STROKE, LucideQuote } from '../icons/cds-icons';

/**
 * Testimonial — Wrapper um `.testimonial` aus css/components.css → „Testimonial Card“.
 *
 * Statische Zitat-Karte mit bereichsgefärbtem Top-Akzent (data-area), Quote-Icon
 * (.testimonial-icon, fill:currentColor), Zitat (blockquote) und Footer mit Name/Rolle.
 * Nur bestehende Klassen — kein eigenes CSS.
 *
 * Verwendungsguidance dieser Gruppe: siehe Blockquote (`komponenten-zitate-testimonials-blockquote--verwendung`).
 */
@Component({
  selector: 'cds-testimonial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideQuote],
  template: `
    <figure class="testimonial" [attr.data-area]="area() || null">
      <svg lucideQuote class="testimonial-icon" [size]="24" [strokeWidth]="iconStroke"></svg>
      <blockquote>{{ quote() }}</blockquote>
      <figcaption class="testimonial-footer">
        <div>
          <p class="testimonial-name">{{ name() }}</p>
          <p class="testimonial-role">{{ roleLabel() }}</p>
        </div>
      </figcaption>
    </figure>
  `,
})
export class TestimonialComponent {
  /** Zitattext. */
  readonly quote = input.required<string>();
  /** Name der zitierten Person. */
  readonly name = input.required<string>();
  /** Rolle/Funktion der zitierten Person (leer = keine Rollenzeile im Footer). */
  readonly roleLabel = input('');
  /** Markenbereich → data-area (Top-Akzent + Icon-Farbe). */
  readonly area = input<CdsArea>('co');

  /** @internal */
  protected readonly iconStroke = CDS_ICON_STROKE;
}
