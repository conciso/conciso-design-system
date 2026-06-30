import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Testimonial — Wrapper um `.testimonial` aus css/components.css → „Testimonial Card".
 *
 * Statische Zitat-Karte mit bereichsgefärbtem Top-Akzent (data-area), Quote-Icon
 * (.testimonial-icon, fill:currentColor), Zitat (blockquote) und Footer mit Name/Rolle.
 * Nur bestehende Klassen — kein eigenes CSS.
 */
@Component({
  selector: 'cds-testimonial',
  standalone: true,
  template: `
    <figure class="testimonial" [attr.data-area]="area || null">
      <!-- ui-quote aus icons/icons.js — dieselbe Glyphe wie docs/index.html. -->
      <svg class="testimonial-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </svg>
      <blockquote>{{ quote }}</blockquote>
      <figcaption class="testimonial-footer">
        <div>
          <p class="testimonial-name">{{ name }}</p>
          <p class="testimonial-role">{{ role }}</p>
        </div>
      </figcaption>
    </figure>
  `,
})
export class TestimonialComponent {
  @Input() quote =
    'Conciso hat unsere Plattform spürbar verschlankt — weniger Code, klarere Prozesse, zufriedenere Teams.';
  @Input() name = 'Dr. Maria Schmidt';
  @Input() role = 'CTO, Beispiel GmbH';
  /** Markenbereich → data-area (Top-Akzent + Icon-Farbe). */
  @Input() area: CdsArea = 'co';
}
