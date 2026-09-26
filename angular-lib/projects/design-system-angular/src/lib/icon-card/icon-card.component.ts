import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * IconCard (`[cdsIconCard]`) — Wrapper um `.ep-card` aus css/components.css
 * (css/components.css:1298–1340): die Icon-Kachel mit farbiger Icon-Fläche, Eyebrow,
 * Titel, Text und optionaler Pfeil-CTA-Zeile, die auf den Beispielseiten Bereichs-
 * und Angebots-Einstiege trägt (`docs/index.html:9401–9420` u. a., 81 Vorkommen).
 *
 * **Entscheidung 1 — Attributselektor, kein Element-Selektor.** Erste Fassung dieser
 * Komponente war `cds-icon-card` als eigenes Element mit `href`-Input, das intern
 * zwischen `<a class="ep-card ep-card-link">` und `<div class="ep-card">` wählte
 * (`@if`/`@else` + `<ng-template>`). Gemessen im laufenden Storybook: zwei Karten mit
 * unterschiedlich langem Text ergaben im `.ep-cards`-Grid ungleiche `.ep-card`-Höhen
 * (174px/270px), weil `align-items:stretch` nur den unsichtbaren `<cds-icon-card>`-Host
 * streckt, nicht das `.ep-card`-Element eine Ebene darunter. Dieselbe Messung mit
 * `.ep-card` OHNE Host-Wrapper (rohes Markup direkt in `.ep-cards`) ergab 306px/306px,
 * CTA-Unterkanten auf identischer Y-Koordinate — das CSS gleicht die Höhen korrekt aus,
 * sobald `.ep-card` selbst das Grid-Kind ist. Der Fehler saß also im Wrapper-Element,
 * nicht in der CSS-Schicht (siehe „Im Raster“-Story, dort dieselbe Messung als
 * Play-Funktion gepinnt).
 *
 * Die Lösung, analog zu Angular Materials `a[mat-button], button[mat-button]`: die
 * Komponente hängt sich als Attribut an ein vom Konsumenten geschriebenes `<a>` oder
 * `<div>`, statt ein eigenes Element zu sein. Dadurch trägt **derselbe** native Knoten,
 * den der Konsument in sein Grid schreibt, sowohl die Komponentenlogik als auch die
 * `.ep-card`-Klasse — kein Host-Element dazwischen, `align-items:stretch` trifft direkt
 * auf `.ep-card`.
 *
 * **`href` ist deshalb kein Input mehr.** Ob die Karte ein Link ist, entscheidet der
 * Konsument über das gewählte Tag (`<a cdsIconCard href="…">` vs. `<div cdsIconCard>`)
 * und setzt `href` als natives Attribut direkt am `<a>` — Angular muss dafür nichts
 * verwalten. `.ep-card-link` (nur auf `a.ep-card-link` wirksam, `CONTRIBUTING.md` §4)
 * wird deshalb vom Host-Tag abgeleitet, nicht mehr per Verzweigung im Template
 * gerendert.
 *
 * **`.ep-card-link` hängt an `<a>` UND `href`, nicht am Tag allein.** Ein `<a
 * cdsIconCard>` ohne `href` ist weder fokussierbar noch hat es eine Link-Rolle —
 * `.ep-card-link` (Schatten, Hover-Anhebung, Cursor) nur am Tag festzumachen hätte
 * eine Karte erzeugt, die aussieht wie ein Link, aber keiner ist, und genau die
 * Garantie aufgegeben, die die frühere `href`-Input-Fassung strukturell hatte (leerer
 * String → zwingend der `<div>`-Zweig). `isLink()` prüft deshalb beides.
 *
 * **`isLink()` ist eine Methode im Host-Binding, kein einmalig berechnetes Feld.**
 * `href` kann nach dem Erstellen zur Laufzeit gesetzt/entfernt werden (z. B.
 * `<a cdsIconCard [attr.href]="urlSignal()">`). Ein Host-Binding-Ausdruck
 * (`'[class.ep-card-link]': 'isLink()'`) wird bei JEDEM Refresh der DECLARING VIEW
 * neu ausgewertet — also der Elternvorlage, die `<a cdsIconCard>` schreibt —, nicht
 * nur bei einem Refresh der eigenen (OnPush-gesteuerten) Kindvorlage dieser
 * Komponente. Das ist kein Sonderfall wie bei einem in ADR-0007 §3 verworfenen
 * Getter (dort ging es um einen Getter in einer INTERPOLATION der eigenen
 * Kindvorlage, die unter OnPush nur bei eigenen Signal-Änderungen neu läuft):
 * Host-Bindings werden unabhängig vom OnPush-Status der Komponente selbst
 * mitgeführt, wenn die Elternansicht aktualisiert wird — reagiert also auf
 * `[attr.href]`/`[href]`-Bindungen des Konsumenten, ob Signal- oder
 * Zone.js-getrieben, ohne `effect()` (ADR-0007 §4) und ohne `MutationObserver`.
 * Empirisch geprüft (Spike-Story mit `[attr.href]="signal()"`-Toggle zur Laufzeit,
 * seither wieder gelöscht): Setzen des Signals nach Erstrender schaltet
 * `.ep-card-link` zuverlässig um. Einzige Grenze: eine Änderung, die AUSSERHALB von
 * Angular direkt am nativen Element vorgenommen wird (z. B. `el.setAttribute
 * ('href', …)` von Fremdcode), löst keinen Refresh aus — das gilt aber für jede
 * Angular-Bindung gleichermaßen und ist kein Sonderfall dieser Komponente.
 *
 * **Entscheidung 2 — Icon als projizierter Inhalt, OHNE dass das SVG eine eigene
 * Größenklasse tragen muss.** Wie bei `cds-stoerer` (siehe dessen Klassendoku) sind
 * die Icons auf den Beispielseiten wechselnde Heroicons, keine DS-Bereichsglyphen aus
 * der Registry `icons/cds-icons.ts` — Inhalt, nicht Chrom. Deshalb Projektion über
 * `<ng-content select="[cdsIcon]">` statt eines `icon`-Strings. Anders als beim Störer
 * ist `.ep-card-icon` hier aber ein echter CONTAINER: css/components.css:1310+1318
 * setzt Maße und Stroke über den Nachfahren-Selektor `.ep-card-icon svg{width:32px;
 * height:32px;stroke-width:var(--icon-stroke-sm)}`, nicht über eine Klasse auf dem
 * SVG selbst. Der Konsument liefert deshalb ein unverändertes `<svg cdsIcon
 * viewBox="…" aria-hidden="true" focusable="false">…</svg>` OHNE zusätzliche Klasse —
 * das Verhältnis Größe/Stroke kommt allein aus dem Container. Geprüft an
 * css/components.css:1298–1318 (Kommentar dort: „Farbe kommt aus der Komponente,
 * nicht aus … inline gesetzten style-Attributen“) und in der Story „Interaktiv“
 * gepinnt (Play-Funktion misst die gerenderte SVG-Breite).
 *
 * **`data-area` sitzt auf drei Elementen** (`.ep-card` (Host), `.ep-card-icon`,
 * `.ep-card-eyebrow`, wie im Mockup, `docs/index.html:4681–4686`): die CTA-Farbe
 * braucht dagegen KEIN eigenes `data-area`, sie kommt über den Nachfahren-Selektor
 * `.ep-card[data-area="…"] .ep-card-cta` (css/components.css:1336–1339) vom
 * `data-area` der Karte selbst.
 *
 * **Kein erfundener `aria-label`.** Der Pfeil-Suffix der CTA-Zeile ist reine visuelle
 * Affordanz (`docs/index.html:4686`: `<span aria-hidden="true">→</span>`) und steht
 * deshalb `aria-hidden`, unverändert zum Mockup — kein zusätzlicher, selbst
 * ausgedachter zugänglicher Name.
 *
 * **Entscheidung 3 — kein `cdsIconCards`-Raster.** `.ep-cards` ist ein reines
 * `display:grid` ohne Struktur oder Verhalten (dieselbe Begründung wie beim Verzicht
 * auf einen `layout-grid`-Wrapper, siehe `spec.md`). Konsumenten schreiben
 * `<div class="ep-cards">` von Hand (siehe Story „Im Raster“).
 *
 * Verwendungsguidance dieser Gruppe: siehe Card (`komponenten-cards-teaser-card--verwendung`).
 */
@Component({
  selector: 'a[cdsIconCard], div[cdsIconCard]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ep-card',
    '[class.ep-card-link]': 'isLink()',
    '[attr.data-area]': 'area() || null',
  },
  template: `
    <div class="ep-card-icon" [attr.data-area]="area() || null">
      <ng-content select="[cdsIcon]"></ng-content>
    </div>
    @if (eyebrow()) {
      <p class="ep-card-eyebrow" [attr.data-area]="area() || null">{{ eyebrow() }}</p>
    }
    <h3 class="ep-card-title">{{ title() }}</h3>
    <p class="ep-card-text">{{ text() }}</p>
    @if (ctaLabel()) {
      <div class="ep-card-cta">{{ ctaLabel() }} <span aria-hidden="true">→</span></div>
    }
  `,
})
export class IconCardComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Kartentitel (`.ep-card-title`). */
  readonly title = input.required<string>();
  /** Anreißer-/Beschreibungstext (`.ep-card-text`). */
  readonly text = input.required<string>();
  /** Kicker-Text oberhalb des Titels (`.ep-card-eyebrow`, leer = keine Eyebrow-Zeile). */
  readonly eyebrow = input('');
  /** Markenbereich → `data-area` auf Karte, Icon-Kachel und Eyebrow. */
  readonly area = input<CdsArea>();
  /** CTA-Zeile am Kartenfuß (`.ep-card-cta`, leer = keine CTA-Zeile). */
  readonly ctaLabel = input('');

  /**
   * Ob der Host ein `<a>` MIT `href` ist → schaltet `.ep-card-link` (Schatten/Hover,
   * `CONTRIBUTING.md` §4). Als Methode im Host-Binding aufgerufen (nicht einmalig in
   * ein Feld geschrieben), damit ein zur Laufzeit gesetztes/entferntes `href` erkannt
   * wird — Begründung und Grenzen in der Klassendoku oben.
   *
   * @internal
   */
  protected isLink(): boolean {
    const el = this.elementRef.nativeElement;
    return el.tagName === 'A' && el.hasAttribute('href');
  }
}
