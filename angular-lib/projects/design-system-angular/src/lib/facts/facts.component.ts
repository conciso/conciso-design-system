import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/** Ein Fakten-Paar der Angebots-Rahmendaten (`<dt>`/`<dd>`). */
export interface CdsFactsItem {
  /** Label (`<dt>`), z. B. „Dauer“. */
  term: string;
  /** Wert (`<dd>`), z. B. „2 Tage, 9–17 Uhr“. */
  value: string;
}

/**
 * Facts (`cds-facts`) — Wrapper um `.ep-facts` aus css/components.css
 * (css/components.css:1261–1272): die Definitionsliste für die harten Eckdaten
 * eines Angebots (Termin, Dauer, Ort, Preis), einspaltig mit Haarlinie zwischen
 * den Paaren oder als `.is-grid` zweispaltig für Kästen, die neben Inhalt stehen.
 * Bewusst ohne eigenen Rahmen und ohne Fläche, sie zieht in einen vorhandenen
 * Container ein (Angebots-Box, Sticky-Sidebar) — Doku-Sektion
 * `docs/index.html:9069` (`gt-seminar-fakten`), Beispielseiten `docs/index.html:
 * 9076–9082`, `13718–13726`, `16293–16300`.
 *
 * **Element-Selektor, kein Attribut (ADR-0008-Standardfall).** Ausgezählt: keines
 * der 3 `.ep-facts`-Vorkommen in `docs/index.html` sitzt in einem `.layout-grid`
 * mit `col-*`, keines wird von einem Grid-/Flex-Elternteil in der Höhe gedehnt
 * (der Flex-Fall in Zeile 16290 ist `flex-direction:column`, dort füllen Block-
 * Elemente die Breite ihres Containers unabhängig von einer zusätzlichen
 * Wrapper-Ebene — anders als bei `.ep-card`/ADR-0008 Fall 1 geht es dort um Höhe,
 * die durch Block-Layout NICHT automatisch nach unten durchgereicht wird). Das
 * Tag variiert nicht (immer `<dl>`). Analog zu `cds-faq` (`faq.component.ts`, das
 * intern `<details>` in einem `<div class="ep-faq">` rendert) trägt hier die
 * INNERE `<dl class="ep-facts">` die CSS-Klasse, nicht der `<cds-facts>`-Host: die
 * Semantik einer Definitionsliste hängt am `<dl>`-Tag selbst, ein Custom-Element
 * kann dieses Tag nicht annehmen. Da `.ep-facts > div + div` ausschließlich
 * Nachfahren INNERHALB der eigenen Vorlage anspricht, bricht eine zusätzliche
 * Host-Ebene darüber nichts — anders als bei `cds-section` (Fall 2) hängt hier
 * keine von außen gesetzte Fläche oder ein von außen adressierter Nachfahre an
 * dieser Tiefe.
 *
 * **`<dl>`/`<div>`/`<dt>`/`<dd>` exakt wie vom CSS erwartet.** `.ep-facts > div +
 * div` (css/components.css:1262) setzt Haarlinie und Abstand ab dem ZWEITEN Paar;
 * ohne das umschließende `<div>` pro Paar griffe der Selektor nicht. Jedes
 * `items()`-Element wird deshalb zu genau einem `<div><dt>…</dt><dd>…</dd></div>`.
 *
 * **`area` färbt `<dt>` über `.t-{area}`, nicht über `data-area`.** Anders als bei
 * `cds-feature`/`cds-icon-card` kennt `.ep-facts` selbst kein `[data-area]`; der
 * CSS-Kommentar zu dieser Klasse (`css/components.css:1259`) benennt
 * stattdessen ausdrücklich „Bereichston der Labels über `.t-XX` im Markup
 * (dark-safe), nie als Inline-Farbe“ als sanktionierten Weg. Ausgezählt: alle 3
 * `.ep-facts`-Vorkommen in `docs/index.html` setzen `.t-wo` auf JEDEM `<dt>`
 * derselben Liste (nie gemischt, nie eine andere Bereichsfarbe) — ein optionaler
 * `area`-Input, der `.t-{area}` einheitlich auf alle `<dt>` der Instanz anwendet,
 * bildet dieses Muster nach, ohne einen Farbwert zu erfinden (`.t-XX` ist eine
 * bestehende, bereits kontrast- und dark-mode-geprüfte Utility, `css/components.css
 * :638–642`). Ungesetzt (Default) bleibt `<dt>` ohne zusätzliche Klasse, erbt also
 * die umgebende Textfarbe — das deckt Kontexte ohne Bereichsbindung ab.
 *
 * **Über die Ticket-API hinaus:** `area` stand nicht in der ursprünglichen
 * API-Skizze von Ticket 08. Ergänzt, weil ohne ihn KEINES der 3 realen
 * `.ep-facts`-Vorkommen originalgetreu nachgebaut werden könnte — anders als bei
 * `cds-tier`s `area` (dort deckt die Einschränkung eine tatsächliche CSS-Lücke
 * ab) fehlt hier keine CSS-Regel, nur ein API-Hook auf eine bereits vollständige
 * Klasse. Siehe Ticket-Bericht für die Abwägung.
 */
@Component({
  selector: 'cds-facts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dl class="ep-facts" [class.is-grid]="grid()">
      @for (item of items(); track $index) {
        <div>
          <dt [class]="area() ? 't-' + area() : null">{{ item.term }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      }
    </dl>
  `,
})
export class FactsComponent {
  /** Fakten-Paare (`<dt>`/`<dd>`), in Darstellungsreihenfolge. */
  readonly items = input.required<CdsFactsItem[]>();
  /** Zweispaltige Rasterung ohne Haarlinien (`.is-grid`) statt der einspaltigen Grundform. */
  readonly grid = input(false);
  /** Markenbereich → `.t-{area}` auf jedem `<dt>` (siehe Klassendoku). Ungesetzt = neutral. */
  readonly area = input<CdsArea>();
}
