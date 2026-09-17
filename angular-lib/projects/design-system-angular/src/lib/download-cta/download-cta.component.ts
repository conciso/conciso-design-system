import { Component, input, output } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * DownloadCta — Wrapper um `.cta-dl` aus css/components.css → „Download CTA“.
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
        <!-- Klassen direkt komponiert statt cds-button: .cta-dl-actions steht auf
             flex-direction:column + align-items:stretch (css/components.css:1421) und
             streckt seine Kinder; ein cds-button-Custom-Element streckt sich darüber
             nicht mit. Die einzige Eingabe, die es zum Füllen der Spalte brächte, full,
             zentriert über .btn-full (css/components.css:53) zugleich das Label und
             würde den bisher linksbündigen Look ändern. -->
        <button [class]="'btn btn-filled btn-' + area()" type="button" (click)="primaryClick.emit($event)">{{ primaryLabel() }}</button>
        @if (secondaryLabel()) {
          <button [class]="'btn btn-text btn-' + area()" type="button" (click)="secondaryClick.emit($event)">{{ secondaryLabel() }}</button>
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

  /** Klick auf die primäre Aktion (Haupt-CTA). */
  readonly primaryClick = output<MouseEvent>();
  /** Klick auf die sekundäre Aktion (nur wenn `secondaryLabel` gesetzt ist). */
  readonly secondaryClick = output<MouseEvent>();
}
