import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type { CdsArea } from '../area';
import { CDS_QUOTE_ICON } from '../icons';

/**
 * TeamVoice — Wrapper um `.team-voice` aus css/components.css → „Team-Stimmen“.
 *
 * Editoriale Zitat-Reihe mit seitlichem Foto (im Grid abwechselnd links/rechts,
 * gesteuert per :nth-child innerhalb von `.team-voices`), bereichsgefärbtem
 * Akzent (data-area), Quote-Icon (ui-quote), Zitat und Name/Rolle. Mehrere
 * Komponenten in einen `<div class="team-voices">` legen, damit das alternierende
 * Layout greift (siehe Story).
 *
 * Verwendungsguidance dieser Gruppe: siehe Blockquote (`komponenten-zitate-testimonials-blockquote--verwendung`).
 */
@Component({
  selector: 'cds-team-voice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="team-voice" [attr.data-area]="area() || null">
      <div class="team-voice-media">
        <img [src]="image() || placeholder" [alt]="imageAlt()" loading="lazy" />
      </div>
      <figcaption class="team-voice-body">
        <!-- ui-quote aus icons/icons.js — dieselbe Glyphe wie docs/index.html. -->
        <svg
          class="team-voice-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          [innerHTML]="quoteIcon()"
        ></svg>
        <blockquote class="team-voice-quote">{{ quote() }}</blockquote>
        <div class="team-voice-footer">
          <p class="team-voice-name">{{ name() }}</p>
          <p class="team-voice-role">{{ roleLabel() }}</p>
        </div>
      </figcaption>
    </figure>
  `,
})
export class TeamVoiceComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Zitattext. */
  readonly quote = input.required<string>();
  /** Name der zitierten Person. */
  readonly name = input.required<string>();
  /** Rolle/Funktion der zitierten Person (leer = keine Rollenzeile). */
  readonly roleLabel = input('');
  /** Markenbereich → data-area (Akzentfarbe + Rahmen). */
  readonly area = input<CdsArea>('co');
  /** Bild-URL; leer = neutraler Platzhalter (Doku-Assets sind hier nicht eingebunden). */
  readonly image = input('');
  /** Alternativtext des Fotos. */
  readonly imageAlt = input('Teamfoto');

  /**
   * Zitat-Icon aus der zentralen Icon-Registry (icons.ts) statt dreifach
   * dupliziertem SVG-Pfad in Blockquote/Testimonial/TeamVoice.
   *
   * @internal
   */
  protected readonly quoteIcon = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(CDS_QUOTE_ICON.body),
  );

  /**
   * Neutraler Inline-SVG-Platzhalter, damit Stories ohne externe Assets rendern.
   *
   * @internal
   */
  protected readonly placeholder =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='450'%3E%3Crect%20width='600'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='300'%20y='225'%20font-family='sans-serif'%20font-size='22'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3ETeamfoto%3C/text%3E%3C/svg%3E";
}
