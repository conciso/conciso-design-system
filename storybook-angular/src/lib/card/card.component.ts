import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type { CdsArea } from '../area';
import { CDS_AREA_ICONS } from '../icons';

/**
 * Card — Wrapper um `.card` / `.card-elevated` aus css/components.css → „Cards".
 *
 * Bildet die im CSS vorgesehene Struktur ab: .card-media (bereichsgefärbt via
 * [data-area]) mit der echten Bereichs-Glyphe aus icons/icons.js, .card-body mit
 * .card-eyebrow / .card-title / .card-text und ein optionales .card-footer mit
 * einer kompakten Text-Aktion (.btn .btn-text .btn-sm) — genau wie docs/index.html.
 */
@Component({
  selector: 'cds-card',
  standalone: true,
  template: `
    <article [class]="classes" [attr.data-area]="area || null">
      @if (showMedia) {
        <div class="card-media" [innerHTML]="mediaSvg"></div>
      }
      <div class="card-body">
        @if (eyebrow) {
          <p class="card-eyebrow">{{ eyebrow }}</p>
        }
        <h3 class="card-title"><span>{{ title }}</span></h3>
        <p class="card-text">{{ text }}</p>
      </div>
      @if (actionLabel) {
        <div class="card-footer">
          <button [class]="actionClasses" type="button">{{ actionLabel }}</button>
        </div>
      }
    </article>
  `,
})
export class CardComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input() eyebrow = '';
  @Input() title = 'Kartentitel';
  @Input() text = 'Ein kurzer Anreißer-Text, der die Karte beschreibt.';
  /** Markenbereich → data-area (färbt Media-Glyphe + Eyebrow). */
  @Input() area?: CdsArea;
  /** Erhöhte Variante → .card-elevated. */
  @Input() elevated = true;
  /** Bereichsgefärbte Medienfläche mit Bereichs-Glyphe anzeigen. */
  @Input() showMedia = true;
  /** Kompakte Text-Aktion im Footer (leer = kein Footer). */
  @Input() actionLabel = 'Mehr erfahren';

  get classes(): string {
    return this.elevated ? 'card card-elevated' : 'card';
  }

  get actionClasses(): string {
    // .btn-sm wie in docs/index.html (Card-Footer nutzt kompakte Buttons).
    return `btn btn-text btn-sm btn-${this.area ?? 'co'}`;
  }

  /** Echte Bereichs-Glyphe aus icons/icons.js, als ico-48-SVG in die Media-Fläche. */
  get mediaSvg(): SafeHtml {
    const icon = CDS_AREA_ICONS[this.area ?? 'co'];
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg class="ico-48" viewBox="${icon.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">${icon.body}</svg>`,
    );
  }
}
