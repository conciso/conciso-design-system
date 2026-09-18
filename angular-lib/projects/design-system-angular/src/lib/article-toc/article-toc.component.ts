import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Ein Eintrag des Inhaltsverzeichnisses (`.article-toc-list li`). */
export interface CdsArticleTocItem {
  /** Sichtbarer Linktext, i. d. R. die Überschrift des Abschnitts. */
  label: string;
  /** Sprungziel, i. d. R. der Anker der zugehörigen `<h2>` im Article Body. */
  href: string;
}

/**
 * ArticleToc (`cds-article-toc`) — Wrapper um `.article-toc*` aus css/components.css
 * (css/components.css:1577–1589): das aufklappbare Inhaltsverzeichnis am Anfang eines
 * Wissensbeitrags. Zwölftes Ticket der Seitenbausteine-Serie („Artikel-Körper“).
 * Ausgezählt: genau 2 reale Vorkommen, beide mit 5 Einträgen und identischem
 * sichtbarem Text „Inhalt“ plus identischem `aria-label`
 * (`docs/index.html:7948–7960`, Doku-Sektion mit Platzhalter-Hrefs `#gt-article-toc`;
 * `docs/index.html:15049–15061`, reale Beispielseite Wissensbeitrag · KI mit echten
 * Abschnittsankern wie `#wb-ki-demo`).
 *
 * **Element-Selektor, ADR-0008-Standardfall.** `.article-toc` sitzt in beiden
 * Vorkommen als gewöhnlicher Block-Nachfahre direkt in `.article-body`
 * (`docs/index.html:7950`, `15051` je eine Ebene über dem `<details>`) — kein
 * Grid-/Flex-Kind, keine Layout-Klasse (`col-*`) vom Konsumenten, kein
 * Geschwister-Kombinator (`.article-toc` kommt in keiner CSS-Regel mit `+`/`~`
 * vor), kein Tag-Wechsel (immer `<details>`). Keines der drei ADR-0008-Kriterien
 * greift; ein Attributselektor brächte hier nichts. Die einzige direkte
 * Kind-Regel von `.article-body` (`.article-body > p`, css/components.css:1566)
 * zielt auf `p`, nicht auf `details` — ein `<cds-article-toc>`-Host zwischen
 * `.article-body` und dem `<details>` bricht deshalb keine Selektorkette.
 *
 * **Natives `<details>`/`<summary>`, kein nachgebautes Disclosure** (Ticket-Vorgabe,
 * Akzeptanzkriterium): Tastaturbedienung (Enter/Space auf `<summary>`) und
 * Toggle-Zustand kommen vollständig vom Browser, das CSS hängt direkt an `[open]`
 * (`.article-toc[open] .article-toc-caret`, css/components.css:1583). `<details
 * class="article-toc">` sitzt deshalb im TEMPLATE, nicht am Host — derselbe Grund
 * wie bei `cds-compare`s `<details class="ep-compare">` (`compare.component.ts`):
 * ein `<cds-article-toc>`-Host ist ein unbekanntes Custom Element und kann native
 * Disclosure-Semantik nicht annehmen.
 *
 * **Zweites Vorkommen des `<details>`-mit-drehendem-Caret-Musters, nicht
 * zusammengezogen mit `cds-compare` (ADR-0007 §5).** Beide Bauteile teilen die
 * Form (natives `<details>`, SVG-Caret, `[open]`-Rotation über
 * `transition:transform`), aber nicht die Aufgabe: `cds-compare` trägt eine
 * Vergleichstabelle mit `columns`/`rows`/`toggled`-Output, dieses Bauteil trägt
 * eine reine Link-Liste ohne Output (siehe API-Vorgabe des Tickets, die für dieses
 * Bauteil bewusst keinen `toggled` vorsieht). Zwei gleiche Stellen sind ein
 * Zufall, kein Muster — eine gemeinsame Basisklasse für zwei Vorkommen hätte nur
 * das `<details>`+Caret-Skelett gebündelt und dabei entweder Verhalten
 * vereinheitlicht (ein erzwungener `toggled`-Output ohne Zweck hier) oder so viel
 * parametrisiert, dass nichts gewonnen wäre.
 *
 * **`aria-label` am `<summary>` ist fest verdrahtet, kein Input.** Ausgezählt:
 * beide realen Vorkommen tragen wortgleich
 * `aria-label="Inhaltsverzeichnis ein- und ausklappen"` — der sichtbare Text
 * „Inhalt“ (`summary`-Input) allein wäre außerhalb des Beitragskontexts nicht
 * eindeutig, das `aria-label` schreibt deshalb aus, was das Element tut. Genau
 * dieser Wortlaut aus dem Mockup übernommen, kein erfundener zugänglicher Name.
 *
 * **Keine Nummerierung im Markup.** Die sichtbaren Ziffern vor jedem Eintrag
 * kommen aus `counter(toc)` auf `.article-toc-list li::before`
 * (css/components.css:1586), nicht aus dem `<ol>`-Default (`list-style:none` setzt
 * ihn zurück) — die Komponente muss dafür nichts weiter tun als `<ol
 * class="article-toc-list">` zu rendern.
 */
@Component({
  selector: 'cds-article-toc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <details class="article-toc" [attr.open]="open() ? '' : null">
      <summary class="article-toc-summary" aria-label="Inhaltsverzeichnis ein- und ausklappen">
        <span>{{ summary() }}</span>
        <svg
          class="article-toc-caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <ol class="article-toc-list">
        @for (item of items(); track item.href) {
          <li><a [href]="item.href">{{ item.label }}</a></li>
        }
      </ol>
    </details>
  `,
})
export class ArticleTocComponent {
  /** Sichtbarer Text im `<summary>`, z. B. „Inhalt“. */
  readonly summary = input('Inhalt');
  /** Anfangszustand des `<details>` — reine Vorbelegung, kein Zwei-Wege-Zustand. */
  readonly open = input(false);
  /** Abschnitte des Beitrags, in Anzeige-Reihenfolge. */
  readonly items = input.required<CdsArticleTocItem[]>();
}
