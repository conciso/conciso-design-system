import { Component, inject, input, output } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type { CdsArea } from '../area';
import { CDS_AREA_ICONS } from '../icons';

/**
 * Card — Wrapper um `.card` aus css/components.css → „Cards".
 *
 * Die Karte rendert `<article class="card">` und ruht damit flach mit Rahmen. Das folgt der
 * Konvention „Elevation = Interaktivität": Schatten trägt eine Karte nur, wenn die Karte selbst
 * der klickbare Bereich ist. Hier liegt die Interaktion in der Footer-Aktion, nicht in der Fläche.
 * `.card-elevated` wirkt im CSS ausschließlich auf `a.card-elevated`; eine Link-Karten-Variante
 * (`<a>` mit Ziel statt `<article>` mit Button) ist deshalb eine eigene Komponente/Variante.
 *
 * Bildet die im CSS vorgesehene Struktur ab: .card-media (bereichsgefärbt via
 * [data-area]) mit der echten Bereichs-Glyphe, .card-body mit .card-eyebrow /
 * .card-title / .card-text und ein optionales .card-footer mit einer Text-Aktion.
 *
 * Alle Textteile sind optional (leer = ausgeblendet); zusätzlich nimmt `.card-body`
 * beliebigen projizierten Inhalt via `<ng-content>` auf — so eignet sich die Karte
 * auch für freie Listen-/Detail-Inhalte in SPAs, nicht nur die Marketing-Struktur.
 * Die Footer-Aktion meldet Klicks über `actionClick`.
 */
@Component({
  selector: 'cds-card',
  standalone: true,
  template: `
    <article class="card" [attr.data-area]="area() || null">
      @if (showMedia()) {
        <div class="card-media" [innerHTML]="mediaSvg"></div>
      }
      <div class="card-body">
        @if (eyebrow()) {
          <p class="card-eyebrow">{{ eyebrow() }}</p>
        }
        @if (title()) {
          <h3 class="card-title"><span>{{ title() }}</span></h3>
        }
        @if (text()) {
          <p class="card-text">{{ text() }}</p>
        }
        <ng-content></ng-content>
      </div>
      @if (actionLabel()) {
        <div class="card-footer">
          <button [class]="actionClasses" type="button" (click)="actionClick.emit()">{{ actionLabel() }}</button>
        </div>
      }
    </article>
  `,
})
export class CardComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly eyebrow = input('');
  readonly title = input('Kartentitel');
  readonly text = input('Ein kurzer Anreißer-Text, der die Karte beschreibt.');
  /** Markenbereich → data-area (färbt Media-Glyphe + Eyebrow). */
  readonly area = input<CdsArea>();
  /** Bereichsgefärbte Medienfläche mit Bereichs-Glyphe anzeigen. */
  readonly showMedia = input(true);
  /** Kompakte Text-Aktion im Footer (leer = kein Footer). */
  readonly actionLabel = input('Mehr erfahren');

  /** Klick auf die Footer-Aktion. */
  readonly actionClick = output<void>();

  get actionClasses(): string {
    // .btn-sm wie in docs/index.html (Card-Footer nutzt kompakte Buttons).
    return `btn btn-text btn-sm btn-${this.area() ?? 'co'}`;
  }

  /** Echte Bereichs-Glyphe aus icons/icons.js, als ico-48-SVG in die Media-Fläche. */
  get mediaSvg(): SafeHtml {
    const icon = CDS_AREA_ICONS[this.area() ?? 'co'];
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg class="ico-48" viewBox="${icon.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">${icon.body}</svg>`,
    );
  }
}
