import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Table (`cds-table`) — Wrapper um `.tbl`/`.tbl-wrap` aus css/components.css
 * (css/components.css:1462–1480): die Datentabelle der Doku-Site (`sec-table`,
 * Nav-Einträge „Standard“ und „Gestreift“). Ausgezählt: außerhalb von `sec-table`
 * selbst kommt `.tbl-wrap` nur zweimal vor, beide auf Beitragsseiten
 * (`docs/index.html:8622`, `15080`) — keine der 24 Beispielseiten außerhalb von
 * Wissensbeiträgen setzt aktuell eine Tabelle ein. Neuntes Ticket der
 * Seitenbausteine-Serie.
 *
 * **Kein Daten-Input.** Eine `columns`/`rows`-API würde Zellinhalte auf Strings
 * festlegen; die Beispielseiten setzen darin Badges, Links und `data-num`
 * (`docs/index.html:5076–5177`). Der Konsument projiziert `<thead>`/`<tbody>`/
 * `<tfoot>` unverändert per `<ng-content>`, die Komponente liefert nur die
 * Hülle: `.tbl-wrap`, `.tbl`, `<caption>` und die Striped-Klasse.
 *
 * **`caption` ist Pflicht (`input.required<string>()`), abweichend von der
 * Ticket-Skizze (dort `caption? = ''`).** Die eigene Doku dieser Komponente
 * (`storybook-angular/src/docs/komponenten/tabelle.mdx:137`) nennt `<caption>`
 * ausdrücklich „Pflicht, Screenreader lesen den Titel vor, bevor die Zellen
 * vorgelesen werden“ und wiederholt das in den Dos (`tabelle.mdx:147`:
 * „`<caption>` und `scope`-Attribute immer setzen, auch bei einfachen
 * Tabellen“). Ausgezählt: alle 5 realen `.tbl`-Vorkommen in `docs/index.html`
 * haben eine `<caption>`, ausnahmslos. Ein optionaler Input mit Default `''`
 * hätte genau den Fall erlaubt, den die eigene Doku verbietet — nach
 * ADR-0007 §2 ist `caption` damit Inhalt, nicht Beiwerk: ohne sie ist eine
 * `cds-table` eine Tabelle, die die eigenen Barrierefreiheitsregeln bricht,
 * also sinnlos. Ein vergessenes Binding wirft jetzt `NG0950`, statt eine
 * unbeschriftete Tabelle still auszuliefern.
 *
 * **Element-Selektor, `.tbl-wrap`/`.tbl` sitzen im eigenen Template, nicht am
 * Host (ADR-0008-Standardfall, analog zu `cds-facts`/`cds-faq`).** Ausgezählt:
 * alle 5 `.tbl-wrap`-Vorkommen in `docs/index.html` (Zeilen 5061, 5116, 5236,
 * 8622, 15080). Keines ist selbst ein direktes Grid-/Flex-Kind — das einzige
 * Vorkommen in einem `.layout-grid` (Zeile 5236) sitzt eine Ebene tiefer in
 * einem `.col-8`, das seinerseits der Grid-Child ist; `.tbl-wrap` ist dort ein
 * gewöhnlicher Block-Nachfahre, dessen Breite vom umschließenden `.col-8`
 * kommt, nicht von `align-items:stretch` auf einer bestimmten DOM-Tiefe (kein
 * `.ep-card`-Fall). Keines trägt eine `col-*`-Klasse selbst, keines variiert
 * das Tag (immer `<div class="tbl-wrap">`). Ein `<cds-table>`-Host ohne eigene
 * Klasse und ohne eigenes `background` gerät deshalb nicht in den „Fläche am
 * Host“-Fall aus ADR-0008 Fall 2: die Komponente setzt nichts auf dem Host,
 * das eine eigene Box bräuchte, `.tbl-wrap` bleibt ein normaler Block-Nachfahre
 * unabhängig vom `display` des `<cds-table>`-Hosts (derselbe Grund, warum
 * `cds-facts`/`cds-faq` als Element-Selektor funktionieren).
 *
 * Eine Attributselektor-Variante direkt am `<table>` (`table[cdsTable]`, analog
 * zu `cdsSection`) wurde erwogen und verworfen: `<table>` ist als Tag ohnehin
 * fix (kein Tag-Wechsel wie bei `cdsIconCard`), aber `.tbl-wrap` bräuchte dann
 * ein ZWEITES Element, das der Konsument von Hand um die Tabelle schreiben
 * müsste (`<div class="tbl-wrap" tabindex="0" role="region" aria-label="…">
 * <table cdsTable>…`) — genau die beiden Aufgaben, die laut Ticket am ehesten
 * vergessen werden (fokussierbarer, benannter Scroll-Container), blieben dann
 * beim Konsumenten statt bei der Komponente. Der Element-Selektor hält Wrap und
 * Tabelle zusammen in einem Template.
 *
 * **Geprüft im laufenden Storybook (Story „Interaktiv“, Play-Funktion):**
 * `<table class="tbl">` liegt direkt unter `<div class="tbl-wrap">`, `<caption>`
 * ist ihr erstes Kind, danach folgen ohne zusätzlichen Knoten dazwischen genau
 * die projizierten `<thead>`/`<tbody>`-Elemente — `<ng-content>` fügt selbst
 * kein DOM-Element ein, es verschiebt nur die vom Konsumenten geschriebenen
 * nativen Elemente an ihre Stelle. Damit bleibt die Tabellenstruktur (`<table>`
 * → `<caption>` + `<thead>` + `<tbody>` + optional `<tfoot>`, keine fremde
 * Ebene dazwischen) exakt so gültig wie im rohen Markup.
 *
 * **`.tbl-wrap` ist immer fokussierbar UND immer benannt.** Das CSS gibt dem
 * Scroll-Container einen eigenen `:focus-visible`-Ring
 * (css/components.css:1463) — ein scrollbarer Bereich muss per Tastatur
 * erreichbar sein (WCAG 2.1.1), `tabindex="0"` steht deshalb fest im Template.
 * `role="region"` braucht laut HTML-AAM einen zugänglichen Namen, sonst bekäme
 * der Bereich keine Landmark-Rolle — weil `caption` jetzt Pflicht ist, kann
 * `accessibleName()` (`scrollLabel() || caption()`) nicht mehr leer werden,
 * `role`/`aria-label` sind deshalb unbedingt gesetzt, kein Nullfall mehr zu
 * behandeln. `scrollLabel` bleibt eine optionale Überschreibung (Vorrang vor
 * `caption`) für Fälle, in denen der sichtbare Tabellentitel für den
 * Scroll-Container zu lang oder zu unspezifisch wäre.
 *
 * **`.tbl-sort` bleibt außen vor.** Die Klasse existiert
 * (css/components.css:1477–1482), die Sortierlogik nicht — kein zugehöriges
 * JS in `docs/main.js` für die Beispielseiten. Ein Wrapper, der nur den
 * Button-Look lieferte, täuschte Funktion vor, die es nicht gibt. Siehe
 * `.scratch/angular-seitenbausteine/issues/19-fehlende-sortierlogik-tbl-sort.md`.
 */
@Component({
  selector: 'cds-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tbl-wrap" tabindex="0" role="region" [attr.aria-label]="accessibleName()">
      <table class="tbl" [class.tbl--striped]="striped()">
        <caption>
          {{
            caption()
          }}
        </caption>
        <ng-content></ng-content>
      </table>
    </div>
  `,
})
export class TableComponent {
  /** Überschrift der Tabelle (`<caption>`, erstes Kind) — Pflicht, siehe Klassendoku. */
  readonly caption = input.required<string>();
  /** Alternierende Zeilenfarbe für Tabellen mit vielen Zeilen (`.tbl--striped`). */
  readonly striped = input(false);
  /**
   * Zugänglicher Name des Scroll-Containers (`aria-label` auf `.tbl-wrap`), hat
   * Vorrang vor `caption`. Leer = `caption` wird zum Namen (siehe Klassendoku).
   */
  readonly scrollLabel = input('');

  /**
   * Name des Scroll-Containers: `scrollLabel` hat Vorrang, sonst `caption` —
   * dank Pflicht-`caption` nie leer (siehe Klassendoku).
   *
   * @internal
   */
  protected readonly accessibleName = computed(() => this.scrollLabel() || this.caption());
}
