import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Tier (`cds-tier`) — Wrapper um `.ep-tier` aus css/components.css
 * (css/components.css:1381–1384): der Stufen-Trenner (Label + Haarlinie), der eine
 * Offene Feature-Liste in Pakete gliedert (z. B. „In jedem Paket enthalten“ /
 * „Zusätzlich mit Pro“, Doku-Sektion `docs/index.html:4880`, Beispielseiten
 * `docs/index.html:11855–11857`, `11883–11885`, `12576–12578`).
 *
 * **Element-Selektor, kein Attribut (ADR-0008-Standardfall).** Ausgezählt: alle 4
 * `.ep-tier`-Vorkommen in `docs/index.html` stehen als eigenständiger `<div>` VOR
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
 * **`area` ist auf `'ki'` typisiert, nicht auf `CdsArea`.** `css/components.css:1383`
 * kennt nur die eine Regel `.ep-tier-label[data-area="ki"]` (Dark-Override
 * `css/dark-mode.css:476`) — für `co`/`es`/`wo` existiert keine einzige
 * `[data-area]`-Regel auf `.ep-tier-label`, per Grep über `css/*.css` geprüft.
 * Ausgezählt in `docs/index.html`: von 4 `.ep-tier-label`-Vorkommen tragen 3
 * `data-area="ki"` (4880, 11884, 12577), eines trägt gar kein `data-area` (11856),
 * keines der Werte `co`/`es`/`wo` kommt vor. Ein `area`-Input vom Typ `CdsArea`
 * würde für drei von vier gültigen Werten ein `data-area`-Attribut schreiben, das
 * im CSS folgenlos bleibt — die Falle, die genau dann entsteht, wenn eine Eingabe
 * mehr verspricht, als die Stilschicht einlöst. Der Typ ist deshalb auf den einen
 * Wert eingeschränkt, den das CSS tatsächlich kennt; der Compiler verhindert damit
 * strukturell, dass jemand `co`/`es`/`wo` setzt und ein wirkungsloses Attribut
 * bekommt, statt es nur im JSDoc zu behaupten.
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
   * Einzige vom CSS unterstützte Tönung → `data-area="ki"` auf `.ep-tier-label`.
   * Ungesetzt (Default) bleibt das Label neutral (`--tx-secondary`), siehe Klassendoku.
   */
  readonly area = input<'ki'>();
}
