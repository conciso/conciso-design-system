import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Pill — Wrapper um `.pill` aus css/components.css → „Badges & Chips“ (Pill).
 *
 * Passive, redaktionelle Bereichs-Markierung, typografisch als Eyebrow (uppercase,
 * letter-spacing .09em, label-xs) — sitzt typischerweise oberhalb eines Titels und
 * ordnet einen Inhalt einer Brand Area zu. Abgrenzung zur Badge: die Pill ist der
 * thematische „Was für ein Inhalt ist das?“-Anker im Lesefluss; die Badge die
 * punktuelle Status-/Bereichs-Kennzeichnung neben Elementen. Nicht interaktiv.
 *
 * a11y: Der reine Bereichsname klingt im Screenreader-Fluss leicht wie eine
 * Überschrift — daher trägt die Pill ein explizites `aria-label` (Default
 * „Bereich <label>“, überschreibbar), genau wie in der Doku vorgegeben.
 *
 * Inhalt auf Teaser-Cards: nur der Bereichsname. Meta-Daten wie Lesezeit, Datum oder Format
 * gehören dort in eine separate `.card-meta`-Zeile. Auf der Featured-Card und im Artikelkopf
 * darf die Pill die Lesezeit tragen. `.pill` trägt `width:fit-content` selbst, im
 * Card-Kontext regelt `.card-body` (bzw. `.card-featured-body`) den Abstand — kein
 * `margin-bottom` und kein `align-self` an der Pill.
 *
 * Verwendungsguidance dieser Gruppe: siehe Chip (`komponenten-chips-badges-pills-chip--verwendung`).
 */
@Component({
  selector: 'cds-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="pill" [attr.data-area]="area()" [attr.aria-label]="computedAriaLabel()">{{
    label()
  }}</span>`,
})
export class PillComponent {
  /** Sichtbarer Bereichsname. */
  readonly label = input.required<string>();
  /** Brand Area → data-area (Farbton; ohne Angabe greift der Corporate-Default). */
  readonly area = input<CdsArea>('ki');
  /** aria-label überschreiben; Default „Bereich <label>“. */
  readonly ariaLabel = input<string>();

  /** @internal */
  protected readonly computedAriaLabel = computed(
    () => this.ariaLabel() ?? `Bereich ${this.label()}`,
  );
}
