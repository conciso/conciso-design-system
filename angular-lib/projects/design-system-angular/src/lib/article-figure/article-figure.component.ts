import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * ArticleFigure (`cds-article-figure`) — Wrapper um `.article-figure`/
 * `.article-figcaption` aus css/components.css (css/components.css:1573–1575):
 * das redaktionelle Inline-Bild mit optionaler Bildunterschrift im Lauftext eines
 * Wissensbeitrags. Zwölftes Ticket der Seitenbausteine-Serie („Artikel-Körper“).
 * Ausgezählt: 3 reale Vorkommen — Doku-Demo mit Caption
 * (`docs/index.html:8028–8031`), reales Body-Bild mit Caption in der Beispielseite
 * Wissensbeitrag · KI (`docs/index.html:15115–15118`, identischer Bild- und
 * Caption-Text wie die Doku-Demo) und ein dritter, captionsloser Sonderfall direkt
 * unter dem Article Header derselben Beispielseite (`docs/index.html:15040–15042`,
 * dazu unten mehr).
 *
 * **Element-Selektor, ADR-0008-Standardfall.** In allen 3 Vorkommen sitzt
 * `.article-figure` als gewöhnlicher Block-Nachfahre (zwei in `.article-body`,
 * eines direkt in einer eigenen `.ep-section`) — kein Grid-/Flex-Kind, keine
 * `col-*`-Klasse vom Konsumenten, kein Tag-Wechsel (immer `<figure>`), kein
 * Vorkommen von `.article-figure` mit einem Geschwister-Kombinator in
 * css/components.css. Die einzige direkte Kind-Regel von `.article-body`
 * (`.article-body > p`, css/components.css:1566) zielt auf `p`, nicht auf
 * `figure` — ein `<cds-article-figure>`-Host zwischen `.article-body` und dem
 * `<figure>` bricht deshalb keine Selektorkette.
 *
 * **`loading="lazy"` ist fest verdrahtet, kein Input — bewusst NUR der
 * In-Article-Fall, nicht der dritte Mockup-Beleg.** Ausgezählt tragen 2 der 3
 * Vorkommen `loading="lazy"` (die beiden Bilder MIT Caption, mittig im
 * Lauftext, „below the fold“ — genau der in `wissensbeitrag.mdx`, Abschnitt
 * „In-Article Figure“, dokumentierte Dos-Punkt). Das dritte Vorkommen
 * (`docs/index.html:15040–15042`) trägt stattdessen `loading="eager"
 * fetchpriority="high"` UND hat keine Caption — es ist das erste Bild direkt
 * unter dem Article Header (Kommentar im Mockup: „Hero-Bild auf Body-Breite …
 * identisches Bild wie Vorschaubild für Wiedererkennung“), sitzt außerhalb von
 * `.article-body` und bekommt seine 720-px-Breite über ein
 * Inline-`style="max-width:720px;margin:0 auto"` am Konsumenten, nicht über die
 * Komponente (Randbedingung 6 der Spec: Mockup-Inline-Styles wandern nicht in
 * den Wrapper). Die Ticket-API sieht dafür kein `loading`/`fetchpriority`-Input
 * vor; dieses Bauteil deckt deshalb den (häufigeren, dokumentierten) In-Body-Fall
 * ab. Für den Lead-Bild-Sonderfall bleibt `<figure class="article-figure">` roh
 * schreibbar oder — sofern die Semantik passt — `cds-hero-image` (Ticket 02) zu
 * prüfen.
 *
 * **`alt` und `caption` sind bewusst getrennte Pflicht-/Beiwerk-Inputs, keine
 * Prüfung auf inhaltliche Überschneidung.** `wissensbeitrag.mdx` dokumentiert die
 * beiden Rollen ausdrücklich als unterschiedliche Jobs
 * (Dont: „Alt-Text und Caption inhaltlich identisch, Screenreader liest
 * doppelt“) — Vorgabe an den Konsumenten, nicht etwas, das eine Wrapper-Komponente
 * zur Laufzeit sinnvoll erzwingen könnte.
 */
@Component({
  selector: 'cds-article-figure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="article-figure">
      <img [src]="src()" [alt]="alt()" loading="lazy" />
      @if (caption()) {
        <figcaption class="article-figcaption">{{ caption() }}</figcaption>
      }
    </figure>
  `,
})
export class ArticleFigureComponent {
  /** Bildquelle. */
  readonly src = input.required<string>();
  /** Faktische Bildbeschreibung für Screenreader, siehe Klassendoku. */
  readonly alt = input.required<string>();
  /** Redaktionelle Bildunterschrift (`.article-figcaption`), leer = keine Caption. */
  readonly caption = input('');
}
