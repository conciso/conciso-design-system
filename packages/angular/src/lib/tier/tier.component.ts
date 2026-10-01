import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Tier (`cds-tier`) — Wrapper um `.ep-tier` aus css/components.css
 * (css/components.css:1381–1384): der Stufen-Trenner (Label + Haarlinie), der eine
 * Offene Feature-Liste in Pakete gliedert (z. B. „In jedem Paket enthalten“ /
 * „Zusätzlich mit Pro“).
 *
 * **Element-Selektor, kein Attribut (ADR-0008-Standardfall).** Alle vier
 * `.ep-tier`-Vorkommen stehen als eigenständiger `<div>` VOR
 * einem `.layout-grid` oder einer Karten-Reihe, nie als deren Kind — keines trägt
 * eine `col-*`-Spaltenklasse, keines liegt in einem Grid/Flex, das seine Kinder
 * dehnt. Das Tag variiert ebenfalls nicht (immer `<div>`). Keines der drei
 * ADR-0008-Kriterien (Grid-/Flex-Kind, Ziel einer Layout-Klasse, wechselndes Tag)
 * trifft zu, der Element-Selektor bleibt deshalb der Standardfall. `.ep-tier{
 * display:flex}` sitzt direkt auf dem Host (`host: { class: 'ep-tier' }`), kein
 * inneres Wrapper-Element darunter — anders als bei `cds-section` (ADR-0008 Fall 2)
 * ist hier nichts von außen auf eine bestimmte DOM-Tiefe angewiesen: kein
 * Nachfahren-Selektor zielt auf `.ep-tier`, keine Fläche hängt am Host.
 *
 * **`area` nimmt alle vier Markenbereiche (`CdsArea`).** `.ep-tier-label[data-area]` tönt das
 * Label für `co`, `ki`, `es` und `wo` in der Bereichsfarbe, theme-fähig: `co`/`es`/`wo` über
 * `--XX-ink` (flippt im Dark selbst), `ki` über `--ki-800` mit Dark-Override auf `--ki-100`
 * (`css/dark-mode.css`). Ohne `area` bleibt das Label neutral (`--tx-secondary`).
 *
 * Verwendungsguidance dieser Gruppe: siehe Card (`komponenten-cards-teaser-card--verwendung`).
 */
@Component({
  selector: 'cds-tier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ep-tier',
  },
  template: `
    <span class="ep-tier-label" [attr.data-area]="area() || null">{{ label() }}</span>
    <span class="ep-tier-rule" aria-hidden="true"></span>
  `,
})
export class TierComponent {
  /** Beschriftung des Trenners (`.ep-tier-label`), z. B. „In jedem Paket enthalten“. */
  readonly label = input.required<string>();
  /**
   * Bereichstönung → `data-area` auf `.ep-tier-label` (`co`, `ki`, `es`, `wo`).
   * Ungesetzt (Default) bleibt das Label neutral (`--tx-secondary`), siehe Klassendoku.
   */
  readonly area = input<CdsArea>();
}
