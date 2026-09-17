import { Component, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type { CdsArea } from '../area';
import { CDS_QUOTE_ICON } from '../icons';

/**
 * Testimonial — Wrapper um `.testimonial` aus css/components.css → „Testimonial Card“.
 *
 * Statische Zitat-Karte mit bereichsgefärbtem Top-Akzent (data-area), Quote-Icon
 * (.testimonial-icon, fill:currentColor), Zitat (blockquote) und Footer mit Name/Rolle.
 * Nur bestehende Klassen — kein eigenes CSS.
 */
@Component({
  selector: 'cds-testimonial',
  standalone: true,
  template: `
    <figure class="testimonial" [attr.data-area]="area() || null">
      <!-- ui-quote aus icons/icons.js — dieselbe Glyphe wie docs/index.html. -->
      <svg class="testimonial-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" [innerHTML]="quoteIcon"></svg>
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
  private readonly sanitizer = inject(DomSanitizer);

  /** Zitattext. */
  readonly quote = input.required<string>();
  /** Name der zitierten Person. */
  readonly name = input.required<string>();
  /** Rolle/Funktion der zitierten Person (leer = keine Rollenzeile im Footer). */
  readonly roleLabel = input('');
  /** Markenbereich → data-area (Top-Akzent + Icon-Farbe). */
  readonly area = input<CdsArea>('co');

  /**
   * Zitat-Icon aus der zentralen Icon-Registry (icons.ts) statt dreifach
   * dupliziertem SVG-Pfad in Blockquote/Testimonial/TeamVoice.
   *
   * @internal
   */
  get quoteIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(CDS_QUOTE_ICON.body);
  }
}
