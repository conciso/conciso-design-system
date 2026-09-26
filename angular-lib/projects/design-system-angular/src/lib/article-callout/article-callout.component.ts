import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';

// Modulweiter Zähler → eindeutige id für die Eyebrow (aria-labelledby), analog zum Muster in
// section.component.ts / area-tabs.component.ts / scale.component.ts.
let uid = 0;

/**
 * ArticleCallout (`cds-article-callout`) — Wrapper um `.article-callout*` aus
 * css/components.css (css/components.css:1591–1600): der bereichsgetönte
 * Aside-Block für Praxis-Beispiele und „In der Realität“-Einschübe im Lauftext
 * eines Wissensbeitrags. Zwölftes Ticket der Seitenbausteine-Serie
 * („Artikel-Körper“). Ausgezählt: 5 reale Vorkommen, je eines pro Bereich in der
 * Doku-Sektion (`docs/index.html:8086–8115`, co/ki/es/wo) plus eines in der realen
 * Beispielseite Wissensbeitrag · KI (`docs/index.html:15110–15114`).
 *
 * **Element-Selektor, ADR-0008-Standardfall.** `.article-callout` sitzt in allen 5
 * Vorkommen als gewöhnlicher Block-Nachfahre — die 4 Doku-Boxen je in einem
 * schlichten `<div>` innerhalb eines `display:flex;flex-direction:column`-Stapels
 * (kein Stretch-Bedarf in Spaltenrichtung), die reale Instanz direkt in
 * `.article-body`. Keines ist ein Grid-/Flex-Kind mit Streckungsbedarf, keines
 * trägt eine `col-*`-Klasse, `.article-callout` kommt in keiner CSS-Regel mit
 * einem Geschwister-Kombinator (`+`/`~`) vor, das Tag variiert nicht (immer
 * `<aside>`). Keines der drei ADR-0008-Kriterien greift. Die einzige direkte
 * Kind-Regel von `.article-body` (`.article-body > p`, css/components.css:1566)
 * zielt auf `p`, nicht auf `aside` — ein `<cds-article-callout>`-Host zwischen
 * `.article-body` und dem `<aside>` bricht deshalb keine Selektorkette.
 *
 * **Projizierte Absätze bleiben direkte Kinder von `.article-callout`, kein
 * `<div>` um `<ng-content>`** (Ticket-Vorgabe: `.article-callout > p` ist ein
 * Kindselektor, css/components.css:1600). `<ng-content>` selbst fügt kein
 * DOM-Element ein — es verschiebt nur die vom Konsumenten geschriebenen
 * `<p>`-Elemente an ihre Stelle direkt im `<aside>`, eine Ebene unter dem
 * `<cds-article-callout>`-Host, aber ohne zusätzlichen Knoten dazwischen. Geprüft
 * im laufenden Storybook (Story „Interaktiv“, Play-Funktion):
 * `aside.article-callout > p` liefert sowohl die Eyebrow als auch jeden
 * projizierten Absatz, `:scope > *` zählt keine fremde Zwischenebene.
 *
 * **`eyebrow` ist Beiwerk (Default `''`), `area` ist Konfiguration mit
 * verteidigbarer Vorgabe (`'co'`).** Die Basisregel `.article-callout` selbst
 * (ohne `[data-area]`) rendert bereits exakt wie `[data-area="co"]`
 * (`background:var(--co-50)`, `border-left-color:var(--co-500)`, beide Werte
 * identisch an beiden Stellen, css/components.css:1591–1592) — `'co'` ist damit
 * keine erfundene Markenfarbe, sondern der reale CSS-Fallback ohne Attribut.
 * Anders als bei `cds-pill` (dessen `.pill` ohne `data-area` gar keine Füllfarbe
 * hat) gibt es hier keinen sinnvollen „kein Bereich“-Zustand.
 *
 * **Bekannter CSS-Befund, nicht im Wrapper geflickt (ADR-0001):**
 * `.article-callout-eyebrow` (Spezifität 0,1,0) verliert gegen
 * `.article-callout > p` (Spezifität 0,1,1, css/components.css:1600), weil die
 * Eyebrow selbst ein `<p>` UND ein direktes Kind von `.article-callout` ist.
 * Gemessen in rohem Markup ohne Angular (Playwright/Chromium,
 * `getComputedStyle`): die Eyebrow rendert in JEDEM Bereich mit `font-size:16px`
 * statt `12px` und `margin-bottom:0` statt `4px`; die Akzentfarbe geht zusätzlich
 * verloren, wenn kein bereichsspezifischer Override existiert (`co` und „kein
 * `data-area`“ zeigen `--tx-primary` statt `--co-700`). Diese Komponente
 * reproduziert exakt die Klassen und die Struktur des Mockups und zeigt deshalb
 * denselben, vorbestehenden Fehler wie rohes HTML — siehe
 * `.scratch/angular-seitenbausteine/issues/22-css-luecke-callout-eyebrow-spezifitaet.md`.
 *
 * **`aria-labelledby` auf `<aside>`, sobald `eyebrow` gesetzt ist — Zusatz zum
 * Mockup, keine CSS-Änderung.** `<aside>` hat implizit die Landmark-Rolle
 * `complementary`; ein Wissensbeitrag mit mehr als einem Callout hat damit
 * mehrere gleichnamige Landmarks ohne zugänglichen Namen. Gemessen mit
 * axe-core an rohem Markup ohne Angular (zwei `<aside class="article-callout">`
 * ohne Auszeichnung): `landmark-unique` schlägt fehl, unabhängig von dieser
 * Komponente — das Mockup selbst kennt diese Auszeichnung nicht (siehe
 * `.scratch/angular-seitenbausteine/issues/23-doku-luecke-callout-landmark-label.md`).
 * Die Eyebrow ist bereits ein prägnanter, vom Redakteur gepflegter Kurztext
 * genau für diesen Zweck (z. B. „In der Praxis“) — sie bekommt deshalb eine
 * generierte `id`, auf die `aria-labelledby` zeigt, sobald sie existiert. Ohne
 * Eyebrow bleibt das `<aside>` unbenannt wie im Mockup: ein zugänglicher Name
 * ließe sich sonst nur aus dem projizierten Absatztext raten, und das wäre eine
 * erfundene Bezeichnung, keine reale.
 */
@Component({
  selector: 'cds-article-callout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside
      class="article-callout"
      [attr.data-area]="area() || null"
      [attr.aria-labelledby]="eyebrowId()"
    >
      @if (eyebrow(); as eyebrowText) {
        <p class="article-callout-eyebrow" [id]="eyebrowId()">{{ eyebrowText }}</p>
      }
      <ng-content></ng-content>
    </aside>
  `,
})
export class ArticleCalloutComponent {
  private readonly instanceId = `cds-article-callout-${uid++}`;

  /** Kicker über dem Absatztext (`.article-callout-eyebrow`), leer = keine Eyebrow. */
  readonly eyebrow = input('');
  /** Markenbereich → `data-area` (Hintergrund + Akzentfarbe), siehe Klassendoku. */
  readonly area = input<CdsArea>('co');

  /**
   * `id` der Eyebrow für `aria-labelledby`, nur wenn eine Eyebrow existiert —
   * siehe Klassendoku.
   *
   * @internal
   */
  protected readonly eyebrowId = computed(() =>
    this.eyebrow() ? `${this.instanceId}-eyebrow` : null,
  );
}
