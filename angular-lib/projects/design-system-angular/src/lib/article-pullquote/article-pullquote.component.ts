import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * ArticlePullquote (`cds-article-pullquote`) — Wrapper um `.article-pullquote` aus
 * css/components.css (css/components.css:1608–1612): die typografische
 * Hervorhebung eines Satzes aus dem eigenen Lauftext eines Wissensbeitrags.
 * Zwölftes Ticket der Seitenbausteine-Serie („Artikel-Körper“). Ausgezählt: 2
 * reale Vorkommen, wortgleich, beide `data-area="ki"` — Doku-Demo
 * (`docs/index.html:8136`) und reale Beispielseite Wissensbeitrag · KI
 * (`docs/index.html:15075`).
 *
 * **Nicht `cds-blockquote` (`BlockquoteComponent`, `.bq`) — Ticket-Vorgabe, im
 * JSDoc beider Bauteile wechselseitig abgegrenzt.** Pull-Quote und Blockquote
 * teilen die typografische Familie (Serif, bereichsgefärbter Linksakzent in
 * `{area}-500`), aber nicht den Zweck, dokumentiert in `wissensbeitrag.mdx`,
 * Abschnitt „Pull-Quote gegen Blockquote“:
 *
 * | | Pull-Quote (dieses Bauteil) | Blockquote (`cds-blockquote`) |
 * |---|---|---|
 * | Wessen Stimme? | Der Beitrag zitiert sich selbst — ein Schlüsselsatz aus dem eigenen Lauftext | Eine dritte, benannte Person (Kund:in, Forschungsstimme, Branchen-Statement) |
 * | Attribution | Keine (`quote` ist der einzige Input) | Pflicht (`name`, `roleLabel`) |
 * | Hintergrund/Icon | Keiner — `quotes:none`, kein Quote-Icon, bewusst „offen“ statt umrahmt | Getönte Akzent-Box (`--bq-bg`) mit Quote-Icon (`.bq-icon`) |
 * | Tag | `<blockquote class="article-pullquote">` direkt, kein umschließendes `<figure>` | `<figure class="bq">` außen, `<blockquote>` (ohne eigene Klasse) innen für den Zitattext |
 *
 * Ein Self-Quote im eigenen Beitrag (Blockquote-Optik auf einem Satz des
 * Autors) wirkt sonst absurd — der Autor zitiert die Person, die den Beitrag
 * schreibt. Wer eine externe Stimme mit Namen und Rolle zeigen will, verwendet
 * `cds-blockquote`.
 *
 * **`quote` enthält die deutschen Anführungszeichen bereits als Teil des Texts,
 * die Komponente ergänzt keine.** `.article-pullquote{quotes:none}`
 * (css/components.css:1608) — es gibt keine `content:open-quote`/`close-quote`-Regel
 * in der CSS-Schicht, weder hier noch bei `.bq blockquote` oder
 * `.testimonial blockquote`. Ausgezählt stehen die Anführungszeichen in BEIDEN
 * realen Vorkommen als literale Zeichen im Text
 * („KI scheitert selten an der Technologie. …“), nicht CSS-generiert. Wie bei
 * `cds-compare`/`cds-table` ist Copy-Text Sache des Konsumenten (ADR-0007 §2) —
 * die Story liefert deshalb `quote` bereits mit „…“ (CONTRIBUTING.md §6), die
 * Komponente rendert den String unverändert, ohne eigene Anführungszeichen zu
 * erfinden.
 *
 * **Element-Selektor, ADR-0008-Standardfall.** `.article-pullquote` sitzt in
 * beiden Vorkommen als gewöhnlicher Block-Nachfahre in `.article-body` — kein
 * Grid-/Flex-Kind, keine `col-*`-Klasse vom Konsumenten, kein
 * Geschwister-Kombinator in css/components.css, kein Tag-Wechsel (immer
 * `<blockquote>`). Die einzige direkte Kind-Regel von `.article-body`
 * (`.article-body > p`, css/components.css:1566) zielt auf `p`, nicht auf
 * `blockquote` — ein `<cds-article-pullquote>`-Host zwischen `.article-body` und
 * dem `<blockquote>` bricht deshalb keine Selektorkette.
 *
 * **`area` ist Konfiguration mit verteidigbarer Vorgabe (`'co'`), keine
 * erfundene Bereichsfarbe.** Die Basisregel `.article-pullquote` selbst (ohne
 * `[data-area]`) setzt bereits exakt denselben Wert wie `[data-area="co"]`
 * (`border-left-color:var(--co-500)`, css/components.css:1608–1609) — `'co'` ist
 * damit der reale CSS-Fallback ohne Attribut, nicht geraten.
 */
@Component({
  selector: 'cds-article-pullquote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<blockquote class="article-pullquote" [attr.data-area]="area() || null">
    {{ quote() }}
  </blockquote>`,
})
export class ArticlePullquoteComponent {
  /** Hervorgehobener Satz, inklusive deutscher Anführungszeichen, siehe Klassendoku. */
  readonly quote = input.required<string>();
  /** Markenbereich → `data-area` (Linksakzent), siehe Klassendoku. */
  readonly area = input<CdsArea>('co');
}
