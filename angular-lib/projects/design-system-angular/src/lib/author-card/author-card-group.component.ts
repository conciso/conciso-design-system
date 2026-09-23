import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * AuthorCardGroup (`cds-author-card-group`) — Wrapper um `.author-card-group` aus
 * css/components.css (css/components.css:1547–1563): bündelt mehrere `[cdsAuthorCard]`
 * am Ende eines Wissensbeitrags, gestapelt (Default) oder als zweispaltiges Raster
 * (`is-grid`, css/components.css:1555). Dreizehntes und letztes Ticket der
 * Seitenbausteine-Serie. Ausgezählt: 5 reale Gruppen — 2 gestapelt in der
 * Artikel-Demo (`docs/index.html:8440,8465`, je 2 bzw. 3 Karten), 2 `is-grid`
 * (Doku-Demo `9112`, reale Beispielseite Scrum-Training `13811`, je 4 Karten) und 0
 * `is-grid`-Vorkommen im Wissensbeitrag selbst — `wissensbeitrag.mdx` verweist für
 * `is-grid` ausdrücklich auf `Seitenmuster/Seminar · Training`, „weil sie dort und
 * nicht in Wissensbeiträgen vorkommt“.
 *
 * **Element-Selektor, ADR-0008-Standardfall FÜR DIE GRUPPE SELBST** — anders als die
 * projizierte Karte. `.author-card-group` ist in keinem der 5 realen Vorkommen
 * selbst ein Grid-/Flex-Kind mit Streckungsbedarf (jedes sitzt direkt in einer
 * `.ep-section`/einem einfachen `<div>`), trägt nie eine `col-*`-Klasse vom
 * Konsumenten und kommt in keiner CSS-Regel mit einem Geschwister-Kombinator vor. Das
 * Tag variiert nicht (immer `<div>`). Ein `<cds-author-card-group>`-Host darüber
 * bricht deshalb selbst keine Selektorkette — die Karten dagegen brauchen ihren
 * eigenen Attributselektor, siehe `AuthorCardComponent`.
 *
 * **Die Klasse `.author-card-group` sitzt trotzdem NICHT auf dem Host, sondern auf
 * einem inneren `<div>` — das ist eine eigene, von den Karten unabhängige
 * Randbedingung.** Grund: `.author-card-group-eyebrow:has(+ .author-card-group.is-grid)`
 * (css/components.css:1563) ist ein Geschwister-Selektor: die Eyebrow-Überschrift
 * muss ein UNMITTELBARES Geschwister von `.author-card-group` sein, damit sie im
 * `is-grid`-Fall die breitere `max-width:960px` statt der Basis-`720px`
 * (css/components.css:1560) bekommt — sonst „sitzt sie bei der Raster-Variante 120 px
 * links neben der ersten Karte“ (Kommentar im CSS selbst). Läge `.author-card-group`
 * auf dem Host, könnte diese Komponente die Eyebrow nicht als Geschwister VOR dem
 * Host rendern (ein Angular-Template füllt ausschließlich das Innere seines eigenen
 * Hosts, nie dessen Umgebung) — die Eyebrow müsste dann ALS KIND in `.author-card-group`
 * selbst stehen und würde im Raster zur eigenen Grid-Zelle neben der ersten Karte,
 * sichtbar falsch. Mit der Klasse auf einem inneren `<div>` rendert das Template
 * `<h3 class="author-card-group-eyebrow">` und `<div class="author-card-group …">`
 * als echte, unmittelbare Geschwister IM Host `<cds-author-card-group>` — der
 * CSS-Selektor sieht nur diese beiden Geschwister, der zusätzliche äußere Host
 * ändert daran nichts, weil `:has(+ …)` ausschließlich den unmittelbaren
 * Elternknoten der beiden betrachtet, nicht dessen Vorfahren. Ohne diese zweite
 * Ebene bräuchte die Eyebrow denselben Attributselektor-Trick wie die Karte, obwohl
 * `.author-card-group` selbst kein Grid-/Flex-Kind ist — das eigentliche Problem hier
 * ist ein Geschwister-, kein Eltern-Kind-Kriterium, deshalb reicht die einfachere
 * Lösung (innere Klasse statt Host-Klasse).
 *
 * **Direkte Kinder bleiben gewahrt, `is-grid` inklusive.** `<ng-content>` fügt kein
 * eigenes Element ein: die projizierten `div[cdsAuthorCard]` (bereits selbst
 * `.author-card` am eigenen Host, siehe dort) landen unverändert als direkte Kinder
 * des inneren `.author-card-group`-`<div>` — Voraussetzung für den
 * Höhenausgleich im `is-grid`-Fall (`AuthorCardComponent`) und für den
 * Nachfahren-Selektor `.author-card-group .author-card` (css/components.css:1548).
 *
 * **`eyebrow` als `<h3>`, deckungsgleich mit den beiden realen, VOLLSTÄNDIGEN
 * Seiten-Vorkommen der gestapelten Variante** (`docs/index.html:8439,8464`, „Über die
 * Autor:innen“) — nicht mit der isolierten Doku-Illustration (`9111`, `<p>`,
 * dokumentiert ohne umgebende `<h2>`-Hierarchie). Die einzige reale `is-grid`-Seite
 * (Scrum-Training, `13811`) verzichtet auf die Gruppen-Eyebrow komplett, weil die
 * Sektion bereits `.ep-section-label` plus `<h2>` trägt — exakt der in
 * `wissensbeitrag.mdx` („Trägt die Sektion bereits ein `.ep-section-label` plus H2,
 * entfällt sie“) dokumentierte Fall. Konsumenten mit eigener Sektionsüberschrift
 * lassen `eyebrow` dafür leer, statt eine zweite `<h3>` zu erzwingen.
 *
 * **Konsequenz der inneren Klasse: der Host `<cds-author-card-group>` selbst trägt
 * weder `.author-card-group` noch `.is-grid`.** Ein `class`/`style` direkt am
 * `<cds-author-card-group>`-Tag landet auf dem unbekannten, standardmäßig
 * `display:inline` gerenderten Custom Element, NICHT auf der tatsächlichen
 * Layout-Box (dem inneren `<div>` mit `max-width`/Grid). Wer Layout-Eigenschaften
 * setzen will (z. B. `margin-top` wie im Trainer-Beispiel,
 * `docs/index.html:13811`), setzt sie am umgebenden Konsumenten-Markup, nicht am
 * Host — dieselbe Einschränkung, die ADR-0008 für Attributselektor-Komponenten
 * beschreibt, hier aber aus einem Geschwister- statt einem Eltern-Kind-Grund.
 */
@Component({
  selector: 'cds-author-card-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (eyebrow()) {
      <h3 class="author-card-group-eyebrow">{{ eyebrow() }}</h3>
    }
    <div class="author-card-group" [class.is-grid]="grid()">
      <ng-content></ng-content>
    </div>
  `,
})
export class AuthorCardGroupComponent {
  /** Gemeinsame Überschrift (`.author-card-group-eyebrow`, `<h3>`), leer = keine. */
  readonly eyebrow = input('');
  /** Zweispaltiges Raster statt gestapelter Liste (`.is-grid`). */
  readonly grid = input(false);
}
