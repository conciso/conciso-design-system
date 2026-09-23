import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';

/** Größenvarianten von `cds-avatar` (`.article-avatar` / `-lg` / `-xl`). */
export type CdsAvatarSize = 'sm' | 'lg' | 'xl';

/**
 * Avatar (`div[cdsAvatar]`) — Wrapper um `.article-avatar` aus css/components.css
 * (css/components.css:1520–1536): der Initialen-/Foto-Kreis im Meta-Strip eines
 * Wissensbeitrags (`.article-meta-author`), in der Author-Card (`-lg`) und im
 * Team-Tile-Grid (`-xl`). Elftes Ticket der Seitenbausteine-Serie.
 *
 * **Attributselektor (ADR-0008), gemessen an der Geschwister-Kette.** Ausgezählt in
 * `docs/index.html`: 8 der 11 Instanzen der Grundgröße sitzen als direkte, adjazente
 * Geschwister in einer von 3 `.article-avatar-stack`-Kacheln (2 Avatare in Zeilen
 * 8343–8344, je 3 in Zeilen 8373–8375 und 8404–8406) — genau dort greift
 * `.article-avatar-stack .article-avatar + .article-avatar`
 * (css/components.css:1540–1541), eine Geschwister-Kette (Kriterium `spec.md` 2b).
 * Ein Element-Selektor `cds-avatar`, der `.article-avatar` auf einem INNEREN Element
 * rendert (wie `cds-facts` es mit `<dl>` tut, weil `<dl>` ein Custom Element nicht
 * annehmen kann), würde diese Kette brechen: die beiden `.article-avatar`-Knoten
 * lägen dann je eine Ebene UNTER ihrem eigenen `<cds-avatar>`-Host und wären keine
 * Geschwister mehr — `+` verlangt denselben Elternknoten, egal wie dicht die Hosts
 * selbst nebeneinanderstehen. Eine zweite, ebenfalls tragfähige Variante
 * (Element-Selektor MIT `host: { class: 'article-avatar' }`, ohne innere
 * Wrapper-Ebene) hätte dieselbe Geschwister-Kette ebenso erfüllt — verworfen zugunsten
 * des Attributselektors nur wegen des zweiten, unabhängigen Grundes unten, nicht weil
 * sie die Kette nicht gelöst hätte.
 *
 * **Gemessen, nicht nur hergeleitet.** Story „Avatar-Stapel“ (Play-Funktion) rendert
 * drei `div[cdsAvatar]` in einem `cds-avatar-stack` und misst
 * `getBoundingClientRect()` der drei `.article-avatar`-Knoten: bei 40 px Kachelbreite
 * und `margin-left:-12px` (css/components.css:1541) überlappen der zweite und dritte
 * Kreis den jeweils vorherigen um 12 px (Differenz der `left`-Koordinaten = 28 px,
 * nicht 40 px) — plus Screenshot-Baseline (`visual-snapshots/…avatar-stapel.png`) als
 * visuelle Bestätigung, nicht nur die Zahl.
 *
 * **Zweiter, unabhängiger Grund: Wiederverwendung als Projektions-Selektor.**
 * `cds-article-header` projiziert den Avatar über
 * `<ng-content select="[cdsAvatar]">` (siehe dessen Klassendoku) — dasselbe Attribut,
 * das hier den Host selektiert, dient dem Elternteil zugleich als
 * Content-Projection-Selektor. Ein Element-Selektor bräuchte dafür eine zusätzliche,
 * eigens erfundene Marker-Klasse; der Attributselektor liefert die Zielscheibe für
 * beide Zwecke aus einer Hand, ohne dass der Konsument zwei Attribute schreiben muss.
 *
 * **Initialen werden aus `name` abgeleitet, kein eigener Input** (Ticket-Vorgabe):
 * erstes Zeichen des ersten und des letzten durch Whitespace getrennten Worts, groß
 * — ein einzelnes Wort liefert dessen erste zwei Zeichen. Zwei Inputs für dieselbe
 * Information (Name UND Initialen) könnten auseinanderlaufen, sobald nur eines
 * gepflegt wird.
 *
 * **`aria-hidden="true"` fest verdrahtet, kein Input.** Ausgezählt: von 53
 * `.article-avatar`-Instanzen (11 Grundgröße + 17 `-lg` + 25 `-xl`) tragen 45 das
 * Attribut direkt am Element; die restlichen 8 sind genau die Grundgrößen-Avatare
 * INNERHALB von `.article-avatar-stack`, wo bereits der Stack-Container selbst
 * `aria-hidden="true"` trägt (siehe `AvatarStackComponent`) — dort wäre ein zweites
 * `aria-hidden` am Kind redundant, aber unschädlich: verschachteltes `aria-hidden`
 * ändert nichts am Ergebnis, der Teilbaum ist so oder so für Assistenztechnologie
 * unsichtbar. Der Avatar trägt es deshalb immer: 100 % Deckung mit dem Mockup im
 * Alleinstand, harmlose Redundanz im Stapel.
 */
@Component({
  selector: 'div[cdsAvatar]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'article-avatar',
    '[class.article-avatar-lg]': "size() === 'lg'",
    '[class.article-avatar-xl]': "size() === 'xl'",
    '[attr.data-area]': 'area() || null',
    'aria-hidden': 'true',
  },
  template: `
    @if (src()) {
      <img [src]="src()" [alt]="name()" />
    } @else {
      {{ initials() }}
    }
  `,
})
export class AvatarComponent {
  /** Voller Name — Quelle der Initialen und des Bild-`alt`-Texts. */
  readonly name = input.required<string>();
  /** Größe (`.article-avatar` = sm, `-lg`, `-xl`). */
  readonly size = input<CdsAvatarSize>('sm');
  /** Markenbereich → `data-area` (Füllfarbe der Initialen-Kachel). */
  readonly area = input<CdsArea>();
  /** Bildquelle; gesetzt → `<img>` ersetzt die Initialen. */
  readonly src = input('');

  /**
   * Erstes Zeichen des ersten und letzten Worts aus `name`, groß — bei einem
   * einzelnen Wort dessen erste zwei Zeichen.
   *
   * @internal
   */
  protected readonly initials = computed(() => {
    const parts = this.name().trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase();
  });
}
