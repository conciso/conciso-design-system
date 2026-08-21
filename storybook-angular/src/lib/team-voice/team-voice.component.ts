import { Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * TeamVoice — Wrapper um `.team-voice` aus css/components.css → „Team-Stimmen“.
 *
 * Editoriale Zitat-Reihe mit seitlichem Foto (im Grid abwechselnd links/rechts,
 * gesteuert per :nth-child innerhalb von `.team-voices`), bereichsgefärbtem
 * Akzent (data-area), Quote-Icon (ui-quote), Zitat und Name/Rolle. Mehrere
 * Komponenten in einen `<div class="team-voices">` legen, damit das alternierende
 * Layout greift (siehe Story).
 */
@Component({
  selector: 'cds-team-voice',
  standalone: true,
  template: `
    <figure class="team-voice" [attr.data-area]="area() || null">
      <div class="team-voice-media">
        <img [src]="image() || placeholder" [alt]="imageAlt()" loading="lazy" />
      </div>
      <figcaption class="team-voice-body">
        <!-- ui-quote aus icons/icons.js — dieselbe Glyphe wie docs/index.html. -->
        <svg class="team-voice-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
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
  readonly quote = input(
    'Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein.',
  );
  readonly name = input('Lena Brandt');
  readonly roleLabel = input('Softwareentwicklerin, seit 2021');
  /** Markenbereich → data-area (Akzentfarbe + Rahmen). */
  readonly area = input<CdsArea>('co');
  /** Bild-URL; leer = neutraler Platzhalter (Doku-Assets sind hier nicht eingebunden). */
  readonly image = input('');
  readonly imageAlt = input('Teamfoto');

  /** Neutraler Inline-SVG-Platzhalter, damit Stories ohne externe Assets rendern. */
  protected readonly placeholder =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='450'%3E%3Crect%20width='600'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='300'%20y='225'%20font-family='sans-serif'%20font-size='22'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3ETeamfoto%3C/text%3E%3C/svg%3E";
}
