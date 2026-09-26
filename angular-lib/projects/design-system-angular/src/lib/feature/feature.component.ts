import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Feature (`[cdsFeature]`) — Wrapper um `.ep-feature` aus css/components.css
 * (css/components.css:1363–1379): die flache Feature-Zeile ohne Box und ohne
 * Schatten (Icon-Kachel links, Titel/Text rechts) — die „Offene Feature-Liste“ der
 * Beispielseiten (Doku-Sektion `docs/index.html:4882` ff., Beispielseiten u. a.
 * `docs/index.html:10405–10415`, `11582–11588`; 40 Vorkommen als
 * `class="ep-feature col-4"` im `.layout-grid`).
 *
 * **Attributselektor, kein eigenes Element (ADR-0008).** Das Mockup setzt die
 * Spaltenklasse am selben Element wie `.ep-feature` (`class="ep-feature col-4"`).
 * Das Bauteil ist damit selbst Grid-Kind UND Ziel einer Layout-Klasse des
 * Konsumenten — exakt das Kriterium aus
 * [ADR-0008](../../../../../../docs/adr/0008-selektortyp-der-wrapper-komponenten.md).
 * Ein eigenes `<cds-feature>`-Element mit innerem `<div class="ep-feature">` würde
 * `.layout-grid>[class*="col-"]` (css/base.css:214) brechen: der `col-*`-Selektor
 * träfe den unsichtbaren Host, nicht `.ep-feature`, das `.layout-grid` gibt seinem
 * Kind (dem Host) dann zwar per `align-items:stretch` (Grid-Default) die volle
 * Zeilenhöhe, aber `.ep-feature` darunter bliebe auf Inhaltshöhe — derselbe Fehler,
 * den ADR-0008 Fall 1 für `.ep-card`/`.ep-cards` gemessen hat (174px/270px statt
 * 306px/306px). Die Komponente hängt sich deshalb als Attribut an ein vom
 * Konsumenten geschriebenes `<div>` (`<div cdsFeature class="col-4">`), analog zu
 * `cds-icon-card` (siehe dessen Klassendoku). Gemessen für dieses Bauteil in der
 * Story „Dreispalter“ (Play-Funktion): drei `.ep-feature` mit stark
 * unterschiedlich langem Text als `col-4`-Geschwister in einem `.layout-grid`
 * ergeben identische Höhen und deckungsgleiche Unterkanten (Messwerte in der
 * Story-Doku dort).
 *
 * **Icon-Kontrakt: `.ep-feature-icon` ist ein Container, keine Klasse auf dem
 * SVG — UND reicht zusätzlich die Farbe durch, anders als `.ep-card-icon`.** Wie
 * `.ep-card-icon` (siehe `icon-card.component.ts`, Entscheidung 2) setzt
 * css/components.css:1369 Maße und Stroke über den Nachfahren-Selektor
 * `.ep-feature-icon svg{width:26px;height:26px;stroke-width:var(--icon-stroke-md)}`
 * — NICHT über eine Klasse auf dem SVG selbst, anders als `.stoerer-icon`
 * (`stoerer.component.ts`), das direkt auf dem projizierten `<svg>` sitzt. Der
 * Konsument liefert deshalb ein unverändertes
 * `<svg cdsIcon viewBox="…" aria-hidden="true" focusable="false">…</svg>` OHNE
 * zusätzliche Größenklasse, projiziert über `<ng-content select="[cdsIcon]">`
 * (Kontrakt in der Story „Interaktiv“ per `getBoundingClientRect()` gepinnt).
 * Anders als `.ep-card-icon` (nur `background`, kein `color`) setzt
 * `.ep-feature-icon` UND ihre vier `[data-area]`-Varianten (css/components.css:
 * 1367–1372) zusätzlich `color` auf dem Container selbst. Das Mockup nutzt das
 * aktiv aus: die projizierten SVGs dort (`docs/index.html:10406` u. a.) tragen
 * `stroke="currentColor"` statt eines hart codierten Bereichstons — die Farbe
 * kommt allein aus dem Container, ein Icon-Autor muss den Bereich der Kachel gar
 * nicht kennen. Bei `cds-icon-card` ist das nicht möglich (kein `color` am
 * Container), dort trägt jedes Icon seinen Bereichston selbst im `stroke`-Attribut.
 * Story „Interaktiv“ demonstriert das mit `stroke="currentColor"` und prüft die
 * geerbte Farbe per `getComputedStyle()`. Die Icon-Kachel selbst ist im Mockup
 * (`docs/index.html:4883` u. a.) ein `<span aria-hidden="true">`, kein `<div>` —
 * rein dekorativ, das SVG trägt bereits sein eigenes `aria-hidden`; die Komponente
 * übernimmt beides unverändert.
 *
 * **CTA: `<a>` mit `href`, sonst `<span>` — nie ein `<a>` ohne `href`.**
 * css/components.css:1376 zielt mit `.ep-feature-body>.card-cta-link` auf den
 * direkten Nachfahren; Angulars `@if`/`@else` fügt dafür kein Wrapper-Element ein
 * (kompiliert zu Kommentar-Ankern, kein Element), der Kindselektor bleibt also in
 * beiden Zweigen erhalten. Ausgezählt in `docs/index.html`: alle 13 Vorkommen von
 * `.card-cta-link` innerhalb von `.ep-feature-body` sind entweder ein `<a
 * href="…">` (12×) oder ein `<span>` (1×, `docs/index.html:13216`,
 * „Landingpage folgt“ — Platzhalter für ein Ziel, das noch fehlt). Ein `<a>` OHNE
 * `href` kommt kein einziges Mal vor — dieselbe Falle, die `cds-icon-card` über
 * `isLink()` schließt (ein Link-Tag ohne `href` ist weder fokussierbar noch hat
 * es eine Link-Rolle, sieht mit der `.card-cta-link`-Optik aber trotzdem wie ein
 * bedienbares Element aus). Hier entscheidet sich das nicht am Host-Tag (der ist
 * bei `cdsFeature` immer `<div>`), sondern strukturell im eigenen Template:
 * `ctaHref` gesetzt → `<a class="card-cta-link" [href]="ctaHref()">`, leer →
 * `<span class="card-cta-link">` mit identischer Optik und identischem Pfeil,
 * aber ohne Link-Rolle (siehe Story „Ohne Href“). Ein `[attr.href]`-Nullwert wäre
 * dieselbe Krücke gewesen wie ein `<a>` ohne `href` zu tolerieren; der
 * `@if`/`@else`-Zweig macht den Fall stattdessen unmöglich, statt ihn nur
 * abzufedern. `data-area` sitzt auf beiden Zweigen, weil `.card-cta-link[data-area]`
 * (css/components.css:1363–1366) ein direkter Attributselektor ist, keine
 * Nachfahren-Regel wie `.ep-card[data-area] .ep-card-cta` bei der Icon-Karte —
 * ohne eigenes `data-area` bliebe der Link/Span auf der CSS-Vorgabefarbe, auch bei
 * gesetztem `area`.
 *
 * **`ctaAriaLabel` — der zugängliche Name ist im Mockup die Regel, nicht die
 * Ausnahme.** Erster Anlauf dieser Komponente hatte keinen solchen Input, mit der
 * (falschen) Annahme, das Mockup verzichte meist auf einen zusätzlichen
 * `aria-label`. Ausgezählt: von den 12 `<a class="card-cta-link">` in
 * `.ep-feature-body` tragen 11 einen `aria-label`, nur einer nicht
 * („Contentletter abonnieren“, `docs/index.html:15203` — der sichtbare Text ist
 * dort bereits eindeutig). Grund: nur 3 verschiedene sichtbare Texte verteilen
 * sich auf diese 12 Links, „Zur Landingpage“ allein zehnmal
 * (`docs/index.html:11587` u. a.) — eine Screenreader-Linkliste hörte sonst
 * zehnmal denselben Namen ohne Unterscheidung. Das Mockup disambiguiert
 * durchgängig mit der Form `<sichtbarer Text>: <Ziel>`
 * (`aria-label="Zur Landingpage: KI Kickstart Workshops"`). `ctaAriaLabel` ist
 * deshalb Beiwerk (Default `''`): leer bleibt der sichtbare `ctaLabel`-Text der
 * zugängliche Name (passt für einen eindeutigen CTA-Text wie „Contentletter
 * abonnieren“), gesetzt überschreibt er ihn — Konsumenten mit einer Liste
 * gleichlautender CTA-Texte (wie den zehn „Zur Landingpage“ im Mockup) setzen ihn
 * pro Instanz auf `<ctaLabel>: <Ziel>`. Wirkt nur am `<a>`-Zweig: `aria-label` an
 * einem `<span>` ohne Rolle hat keinen verlässlichen Effekt im
 * Accessibility-Baum, und der `<span>`-Zweig ist ohnehin nicht interaktiv.
 *
 * Verwendungsguidance dieser Gruppe: siehe Card (`komponenten-cards-teaser-card--verwendung`).
 */
@Component({
  selector: 'div[cdsFeature]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ep-feature',
  },
  template: `
    <span class="ep-feature-icon" [attr.data-area]="area() || null" aria-hidden="true">
      <ng-content select="[cdsIcon]"></ng-content>
    </span>
    <div class="ep-feature-body">
      <h3 class="ep-feature-title">{{ title() }}</h3>
      <p class="ep-feature-text">{{ text() }}</p>
      @if (ctaLabel()) {
        @if (ctaHref()) {
          <a
            class="card-cta-link"
            [attr.data-area]="area() || null"
            [href]="ctaHref()"
            [attr.aria-label]="ctaAriaLabel() || null"
          >
            {{ ctaLabel() }} <span aria-hidden="true">→</span>
          </a>
        } @else {
          <span class="card-cta-link" [attr.data-area]="area() || null">
            {{ ctaLabel() }} <span aria-hidden="true">→</span>
          </span>
        }
      }
    </div>
  `,
})
export class FeatureComponent {
  /** Titel (`.ep-feature-title`). */
  readonly title = input.required<string>();
  /** Beschreibungstext (`.ep-feature-text`). */
  readonly text = input.required<string>();
  /** Markenbereich → `data-area` auf Icon-Kachel und CTA-Link. */
  readonly area = input<CdsArea>();
  /** CTA-Linktext (`.card-cta-link` als direktes Kind von `.ep-feature-body`, leer = kein CTA). */
  readonly ctaLabel = input('');
  /** CTA-Linkziel; gesetzt → `<a href>`, leer → `<span>` ohne Link-Rolle (siehe Klassendoku). */
  readonly ctaHref = input('');
  /**
   * Zugänglicher Name des CTA-Links, überschreibt den sichtbaren `ctaLabel`-Text.
   * Nötig, wenn derselbe sichtbare CTA-Text mehrfach auf einer Seite steht (siehe
   * Klassendoku); Form aus dem Mockup: `<ctaLabel>: <Ziel>`. Leer (Default) = kein
   * `aria-label`, der sichtbare `ctaLabel`-Text bleibt der zugängliche Name. Wirkt
   * nur, wenn `ctaHref` gesetzt ist (nur der `<a>`-Zweig hat eine Link-Rolle).
   */
  readonly ctaAriaLabel = input('');
}
