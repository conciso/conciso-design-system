import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Eine Vergleichsspalte (Paket/Tarif) der Vergleichstabelle. */
export interface CdsCompareColumn {
  /** Spaltenüberschrift, z. B. „Core“ oder „Pro“. */
  label: string;
  /** Hervorgehobene Spalte (`.ep-compare-pro`), z. B. das empfohlene Paket. */
  pro?: boolean;
}

/** Eine Vergleichszeile: das verglichene Merkmal plus eine Zelle je Spalte. */
export interface CdsCompareRow {
  /** Zeilenüberschrift (`<th scope="row">`), das verglichene Merkmal. */
  label: string;
  /**
   * Eine Zelle je Eintrag in `columns`, in derselben Reihenfolge. `boolean` → Ja/Nein-Glyphe
   * (`.ep-compare-yes`/`-no`) mit Screenreader-Text, `string` → die kurze Angabe als Text
   * (z. B. „bis 70 Mrd. Param.“).
   */
  cells: (boolean | string)[];
}

/**
 * Compare (`cds-compare`) — Wrapper um `.ep-compare*` aus css/components.css
 * (css/components.css:1275–1294): die aufklappbare Vergleichstabelle für den zeilenweisen
 * Direktvergleich mehrerer Pakete/Tarife (Doku-Site `sec-table`, Nav-Eintrag
 * „Vergleichstabelle (aufklappbar)“, `docs/index.html:5182–5204`). Zehntes Ticket der
 * Seitenbausteine-Serie, nach `cds-table` (Ticket 09).
 *
 * **Mit Daten-Input, anders als `cds-table`.** `cds-table` projiziert `<thead>`/`<tbody>`
 * unverändert per `<ng-content>`, weil seine Zellen Badges, Links und `data-num` tragen können
 * (siehe dessen Klassendoku). Hier ist der Zellinhalt strukturell auf Ja/Nein oder eine kurze
 * Angabe begrenzt — ausgezählt: alle 22 Datenzellen des einzigen realen Vorkommens
 * (`docs/index.html:11970–12038`, 11 Zeilen × 2 Spalten, ohne die Zeilenüberschriften) sind
 * entweder ein `.ep-compare-yes`/`-no`-Marker (18×, davon 14× „Ja“, 4× „Nein“) oder ein kurzer
 * Text wie „bis 70 Mrd. Param.“ bzw. „30 Min.“ (4×) — nie ein Badge, Link oder anderes Markup.
 * Weil Spaltenzahl, `pro`-Spalte und Zellinhalt damit vollständig aus zwei Arrays (`columns`,
 * `rows`) hervorgehen, würde `<ng-content>` beim Konsumenten nur denselben `@for`-Code
 * duplizieren, ohne eine Freiheit zu gewinnen, die die Zell-Typisierung (`boolean | string`)
 * ohnehin ausschließt.
 *
 * **Ja/Nein-Zellen tragen einen Screenreader-Text, übernommen statt erfunden.** Im einzigen
 * realen Vorkommen steht hinter jeder Glyphe ein `.sr-only`-Text, ausnahmslos:
 * `<span class="ep-compare-yes" aria-hidden="true">✓</span><span class="sr-only">Enthalten</span>`
 * (14×) bzw. `<span class="ep-compare-no" aria-hidden="true">−</span><span class="sr-only">Nicht
 * enthalten</span>` (4×, „−“ ist U+2212 Minus, kein Bindestrich). Genau diese Zeichen und dieser
 * Wortlaut, keine eigene Formulierung — Farbe und Glyphe allein tragen keine Bedeutung
 * (WCAG 1.4.1), der `.sr-only`-Text ist deshalb kein optionaler Zusatz, sondern fest verdrahtet,
 * nicht per Input überschreibbar.
 *
 * **`caption` ist Pflicht (`input.required<string>()`), abweichend von der Ticket-Skizze (dort
 * kein Input dafür vorgesehen) — dieselbe Begründung wie bei `cds-table`.** Die eigene Doku
 * (`storybook-angular/src/docs/komponenten/tabelle.mdx:91`) nennt `<caption class="sr-only">`
 * ausdrücklich als Teil des Bauteils, und das einzige reale Vorkommen hat eine. Anders als bei
 * `cds-table` ist sie hier `.sr-only`, nicht sichtbar: der Klartext steht schon im `<summary>`
 * (`summary`-Input), die `<caption>` wiederholt ihn nur für Screenreader, die nach dem Aufklappen
 * direkt in die Tabelle springen, ohne den Summary-Text erneut vorgelesen zu bekommen.
 *
 * **`rowsLabel` (erste Kopfzelle, `<th scope="col">Funktion</th>` im Mockup) ist dagegen Beiwerk,
 * optional mit Default `''`.** Auch dafür sieht die Ticket-Skizze keinen Input vor. Den Text fest
 * im Template zu verdrahten hieße, AI.Box-Copy in einen wiederverwendbaren Wrapper zu backen
 * (ADR-0007 §2); ihn ganz wegzulassen wich ohne CSS-Befund vom einzigen Beleg ab, ohne dass die
 * Doku das verlangt. Anders als `caption` ist die Kopfzelle nicht barrierefreiheitsrelevant
 * Pflicht: ein leeres `<th scope="col">` bleibt eine gültige, in Vergleichsmatrizen verbreitete
 * Ecke ohne eigenen Namen. Deshalb Beiwerk, kein Inhalt — das Beispielwort „Funktion“ steht in
 * der Story, nicht in der Klasse.
 *
 * **Natives `<details>`/`<summary>` bleibt erhalten, kein nachgebautes Disclosure** (Ticket-
 * Vorgabe, analog `cds-faq`): Tastaturbedienung und Toggle-Verhalten kommen vom Browser, das CSS
 * hängt direkt an `[open]` (`.ep-compare[open] .ep-compare-caret`). `<details class="ep-compare">`
 * sitzt deshalb im TEMPLATE, nicht am Host — derselbe Grund wie bei `cds-table`s
 * `.tbl-wrap`/`.tbl`: ein `<cds-compare>`-Host ist ein unbekanntes Custom Element, kein echtes
 * `<details>`, und kann dessen native Disclosure-Semantik nicht annehmen.
 *
 * **Element-Selektor (ADR-0008-Standardfall).** `.ep-compare` sitzt im einzigen realen Vorkommen
 * als gewöhnlicher Block-Nachfahre in `.ep-section` (`docs/index.html:11969`) — kein Grid-/
 * Flex-Kind, keine `col-*`-Klasse vom Konsumenten, kein Tag-Wechsel (immer `<details>`). Keines
 * der drei ADR-0008-Kriterien greift, ein Attributselektor brächte hier nichts.
 *
 * **`open` ist ein reiner Anfangszustand, keine Zwei-Wege-Bindung.** Gebunden über
 * `[attr.open]="open() ? '' : null"`: Angular schreibt das Attribut nur, wenn sich der GEPRÜFTE
 * Ausdruckswert seit dem letzten Change-Detection-Lauf ändert. `open()` bleibt nach dem ersten
 * Rendern konstant (die Komponente schreibt nie in dieses Signal zurück), ein nachfolgender
 * nativer Toggle wird deshalb nicht rückgängig gemacht — geprüft in der Story „Interaktiv“
 * (Play-Funktion: Klick öffnet, `toggled` feuert `true`, ein zweiter, vom Toggle unabhängiger
 * Interaktionsschritt lässt die Tabelle weiterhin offen).
 */
@Component({
  selector: 'cds-compare',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <details class="ep-compare" [attr.open]="open() ? '' : null" (toggle)="onToggle($event)">
      <summary class="ep-compare-summary">
        {{ summary() }}
        <svg
          class="ep-compare-caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          aria-hidden="true"
          focusable="false"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div class="ep-compare-table-wrap">
        <table class="ep-compare-table">
          <caption class="sr-only">{{ caption() }}</caption>
          <thead>
            <tr>
              <th scope="col">{{ rowsLabel() }}</th>
              @for (column of columns(); track $index) {
                <th scope="col" [class.ep-compare-pro]="column.pro">{{ column.label }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track $index) {
              <tr>
                <th scope="row">{{ row.label }}</th>
                @for (cell of row.cells; track $index) {
                  <td [class.ep-compare-pro]="columns()[$index].pro">
                    @if (cell === true) {
                      <span class="ep-compare-yes" aria-hidden="true">✓</span><span class="sr-only"
                        >Enthalten</span
                      >
                    } @else if (cell === false) {
                      <span class="ep-compare-no" aria-hidden="true">−</span><span class="sr-only"
                        >Nicht enthalten</span
                      >
                    } @else {
                      {{ cell }}
                    }
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    </details>
  `,
})
export class CompareComponent {
  /** Text im `<summary>`, z. B. „Alle Funktionen vergleichen“. */
  readonly summary = input.required<string>();
  /** `<caption class="sr-only">` der Tabelle — Pflicht, siehe Klassendoku. */
  readonly caption = input.required<string>();
  /** Überschrift der ersten Spalte (Zeilentitel, z. B. „Funktion“) — Beiwerk, siehe Klassendoku. */
  readonly rowsLabel = input('');
  /** Anfangszustand des `<details>` — reine Vorbelegung, siehe Klassendoku. */
  readonly open = input(false);
  /** Vergleichsspalten (Pakete/Tarife), in Render-Reihenfolge. */
  readonly columns = input.required<CdsCompareColumn[]>();
  /** Vergleichszeilen; `cells` hat je Zeile genau einen Eintrag pro Spalte in `columns`. */
  readonly rows = input.required<CdsCompareRow[]>();

  /** Feuert bei jedem Auf- oder Zuklappen mit dem neuen Zustand. */
  readonly toggled = output<boolean>();

  /** @internal */
  protected onToggle(event: Event): void {
    this.toggled.emit((event.target as HTMLDetailsElement).open);
  }
}
