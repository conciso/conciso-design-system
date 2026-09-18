import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type { CdsArea } from '../area';
import { CDS_AREA_ICONS } from '../icons';

/**
 * LinkCard (cds-link-card) — Wrapper um `a.card.card-elevated` aus css/components.css
 * (css/components.css:147–154) samt `.card-cta-link` (css/components.css:1347–1356).
 *
 * Die Lücke, die `CardComponent` bewusst offen lässt (siehe deren Klassendoku):
 * `.card-elevated` wirkt im CSS ausschließlich auf `a.card-elevated` (Riegel aus
 * `CONTRIBUTING.md` §4, „Elevation = Interaktivität“) — eine `<article>`/`<div>`-Karte
 * bekommt den Schatten auch mit gesetzter Klasse nicht. Diese Komponente rendert
 * deshalb ein echtes `<a>`, die ganze Fläche ist der Link, kein Klick-Handler auf
 * einem nicht-interaktiven Element.
 *
 * Struktur wie `CardComponent`: optionale bereichsgefärbte `.card-media` mit der
 * echten Bereichs-Glyphe, `.card-body` mit `.card-eyebrow` / `.card-title` /
 * `.card-text`. Neu ist der Fuß `.card-cta-link`, optional unten angeheftet
 * (`--pinned`, für gleich hohe Karten im Raster über `.card-body{flex:1}`).
 *
 * **Entscheidung — Fuß ist ein `<span>`, kein zweites `<a>`.** Die ganze Karte ist
 * bereits `a.card-elevated`; ein verschachteltes `<a>` im Fuß wäre ungültiges HTML
 * (der Browser schließt es beim Parsen vorzeitig) und würde zwei Klickziele auf
 * derselben Fläche erzeugen. `docs/index.html:4707–4716` zeigt exakt dieses Muster:
 * `<span class="card-cta-link card-cta-link--pinned">…</span>` innerhalb von
 * `a.card.card-elevated`. `.card-cta-link` selbst ist nicht auf `a.` gescoped (anders
 * als `.card-elevated`), der Span trägt Farbe und Typografie also unverändert.
 *
 * **Entscheidung — Pfeil-Suffix wird von der Komponente ergänzt, nicht Teil von
 * `ctaLabel`.** Der Pfeil ist reine visuelle Affordanz, kein Inhalt — `docs/index.html`
 * (Abschnitt „Klickbare Karte“) kapselt ihn deshalb selbst in ein
 * `aria-hidden`-Span. Läge das Zeichen im `ctaLabel`-Text, müsste jeder Aufrufer
 * selbst an das `aria-hidden` denken; das wird hier stattdessen einmalig in der
 * Komponente erledigt.
 *
 * **Entscheidung — kein `data-area` auf `.card-cta-link`.** Die Doku hält die
 * CTA-Farbe in gemischten Bereichs-Listen bewusst einheitlich Corporate-Petrol
 * (`docs/index.html:8762`: „CTA-Farbe einheitlich `--co-700`“), unabhängig vom
 * `area` der Karte. Der Fuß bleibt deshalb ohne `data-area`-Bindung.
 */
@Component({
  selector: 'cds-link-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="card card-elevated" [href]="href()" [attr.data-area]="area() || null">
      @if (showMedia()) {
        <div class="card-media" [innerHTML]="mediaSvg()"></div>
      }
      <div class="card-body">
        @if (eyebrow()) {
          <p class="card-eyebrow">{{ eyebrow() }}</p>
        }
        <h3 class="card-title"><span>{{ title() }}</span></h3>
        <p class="card-text">{{ text() }}</p>
        @if (ctaLabel()) {
          <span class="card-cta-link" [class.card-cta-link--pinned]="ctaPinned()">
            {{ ctaLabel() }} <span aria-hidden="true">→</span>
          </span>
        }
      </div>
    </a>
  `,
})
export class LinkCardComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Kartentitel. */
  readonly title = input.required<string>();
  /** Anreißer-/Beschreibungstext der Karte. */
  readonly text = input.required<string>();
  /** Linkziel; die ganze Kartenfläche ist klickbar. */
  readonly href = input.required<string>();
  /** Kicker-Text oberhalb des Titels (`.card-eyebrow`, leer = keine Eyebrow-Zeile). */
  readonly eyebrow = input('');
  /** Markenbereich → `data-area` (färbt Media-Glyphe + Eyebrow). */
  readonly area = input<CdsArea>();
  /** Bereichsgefärbte Medienfläche mit Bereichs-Glyphe anzeigen. */
  readonly showMedia = input(true);
  /** Fuß-Link-Text (`.card-cta-link`, leer = kein Fuß). */
  readonly ctaLabel = input('');
  /** Fuß unten an die Kartenunterkante anheften (`.card-cta-link--pinned`, für gleich hohe Karten im Raster). */
  readonly ctaPinned = input(false);

  /**
   * Echte Bereichs-Glyphe aus icons/icons.js, als ico-48-SVG in die Media-Fläche —
   * identisch zu `CardComponent.mediaSvg`.
   *
   * @internal
   */
  protected readonly mediaSvg = computed<SafeHtml>(() => {
    const icon = CDS_AREA_ICONS[this.area() ?? 'co'];
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg class="ico-48" viewBox="${icon.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">${icon.body}</svg>`,
    );
  });
}
