import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * CtaBand (`[cdsCtaBand]`) — Wrapper um `.ep-cta-band` aus css/components.css
 * (css/components.css:1456, Kopf-Duo `.ep-cta-h2`/`.ep-cta-sub` ebenda): das
 * bereichsgefärbte Page-End-CTA-Band, das laut Doku-Site (`docs/index.html:6237`,
 * Anker `gt-cta-band`) am Ende jeder Customer-Page direkt vor dem Footer steht — die
 * „letzte Einladung“, wenn die Nutzerin die Seite durchgelesen hat. Ausgezählt: 22
 * Vorkommen auf den Beispielseiten, ausnahmslos als `<div class="ep-cta-band"
 * style="background:…">` mit genau einer Aktion.
 *
 * **Entscheidung 1 — Attributselektor, kein eigenes Element (ADR-0008, derselbe
 * „Fläche am Host“-Fall wie `cds-section`).** `css/components.css` trägt für
 * `.ep-cta-band` KEIN `[data-area]` (per Grep geprüft, keine einzige Regel dieser
 * Form existiert). Die Bandfläche kommt in allen 22 Vorkommen als Inline-Style
 * DIREKT am `.ep-cta-band`-Element (`style="background:var(--co-700);color:#fff"`,
 * docs/index.html:6304 u. a.), dem Bereich der Page folgend, nie aus einem
 * `data-area`-Attribut. Ein Element-Selektor würde exakt den in ADR-0008 „Fall 2“
 * gemessenen Fehler wiederholen: der `<cds-cta-band>`-Host ist ein unbekanntes
 * Custom Element (`display:inline`), sein einziges Kind würde als Block
 * herausgebrochen, ein am Host gesetzter Inline-`background` hätte keine eigene Box
 * zum Malen. Die Komponente hängt sich deshalb als Attribut an ein vom Konsumenten
 * geschriebenes `<div>` (`<div cdsCtaBand style="background:…">`) — das Element, das
 * den Style trägt, und `.ep-cta-band` sind derselbe Knoten. Nur `<div>`, kein
 * `<section>`-Zwilling wie bei `cds-section`: alle 22 Vorkommen benutzen
 * ausnahmslos ein `<div>`, keines variiert das Tag.
 *
 * **Entscheidung 2 — `area` färbt nur die Aktion, nicht das Band.** Aus demselben
 * Grund wie bei `cds-section` (siehe dessen Klassendoku, Entscheidung 2) bleibt die
 * Bandfläche Sache des Konsumenten: welche Bereichsfarbe ein Band trägt, ist eine
 * Entscheidung der Seite (Bereichszugehörigkeit der Customer-Page), keine
 * Bauteil-Eigenschaft — und das CSS bietet an dieser Klasse ohnehin keinen
 * `[data-area]`-Haken an (siehe Entscheidung 1). `area` steuert deshalb
 * ausschließlich die Button-Farbklasse (`.btn-{area}`), nicht die Füllung des Bands.
 *
 * **Entscheidung 3 — `.btn-on-band` + `.btn-filled` direkt komponiert, nicht über
 * `cds-button` projiziert.** `cds-button` KENNT den Modifier
 * (`variant="filled-on-band"`, geprüft über `npx storybook tools docs show --id
 * komponenten-buttons-button` — die Story „Auf Bereichs-Band“ existiert dort
 * bereits). Trotzdem baut diese Komponente die `.btn`-Klassen direkt zusammen
 * (Präzedenzfall `download-cta.component.ts`), aus einem härteren Grund als dort:
 * `cds-button` rendert IMMER ein `<button>` — sein Input-Vertrag
 * (`ButtonComponentInputs`) kennt kein `href` — und kann die vom Ticket geforderte
 * Verzweigung „`primaryHref` gesetzt → `<a>`“ strukturell gar nicht erfüllen. Ein
 * projiziertes `<cds-button>` brächte hier also kein Custom-Element-Layoutproblem
 * (kein Kindselektor an `.ep-cta-band` hängt von der DOM-Tiefe ab), sondern schlicht
 * die falsche Fähigkeit.
 *
 * **Entscheidung 4 — bewusst nur EINE Aktion, kein `secondaryLabel`.** Eine frühere
 * Fassung bot `secondaryLabel`/`secondaryHref` an, ungeprüft gegen das Mockup. Beide
 * Belege dagegen: erstens zeigt KEINES der 22 `.ep-cta-band`-Vorkommen in
 * `docs/index.html` eine zweite Aktion — der Zwei-Aktionen-Fall hat keine Vorlage.
 * Zweitens (der schwerere Grund) lässt sich eine zweite, optisch zurückhaltendere
 * Aktion mit den vorhandenen Klassen gar nicht bauen: `.btn-{area}.btn-on-band{color:
 * …}` (css/components.css:47–51) überschreibt die Textfarbe JEDER Variante auf den
 * Bereichston — genau den Ton, den die Doku durchgängig als Bandhintergrund nennt.
 * Nur `.btn-filled` tauscht zusätzlich die Füllung gegen Weiß; `.btn-outlined`,
 * `.btn-tonal` und `.btn-text` blieben transparent und zeigten Text in derselben
 * Farbe wie das Band darunter — unsichtbar. Eine zweite Aktion hätte deshalb
 * zwangsläufig dieselbe Optik wie die erste getragen, keine Hierarchie, nur zwei
 * gleich gewichtete Buttons. Das ist eine CSS-Lücke (kein kontrastsicherer
 * sekundärer On-Band-Stil), festgehalten in
 * `.scratch/angular-seitenbausteine/issues/16-css-luecke-zweite-aktion-auf-band.md`
 * — gemeldet, nicht in diesem Wrapper improvisiert. Solange sie besteht, trägt
 * `cds-cta-band` nur eine Aktion; ein Konsument mit echtem Bedarf für eine zweite
 * schreibt sie außerhalb der Komponente ins Band hinein (`<ng-content>` gibt es
 * hier bewusst nicht, um genau das nicht als unterstützten Pfad zu suggerieren).
 * Ohne zweite Aktion braucht es auch keinen eigenen Container: die einzelne Aktion
 * zentriert sich über das ererbte `.ep-cta-band{text-align:center}` von selbst,
 * genau wie in allen 22 Mockup-Vorkommen — ein zusätzliches Flex-Layout im Wrapper
 * hätte eine Darstellung erfunden, die die CSS-Schicht so nicht kennt (ADR-0001;
 * die einzige existierende Deklaration dieser Form ist `.ep-hero-ctas`,
 * css/components.css:1222, eine andere Klasse für einen anderen Bauteiltyp).
 *
 * **Kein `aria-label` auf der Aktion.** Anders als bei `cds-feature`
 * (`ctaAriaLabel`, 11 von 12 Vorkommen mit `aria-label`) zeigt keines der 22
 * Band-Vorkommen einen `aria-label` auf seiner Aktion — ausgezählt, nicht
 * geschätzt. Die sichtbaren Texte sind durchgängig konkrete Verben mit Ziel
 * („Termin buchen“, „Gespräch anfragen“, „Offene Stellen ansehen“ …) und stehen je
 * Seite nur einmal; anders als bei einer Karten-Liste braucht es hier keine
 * Disambiguierung. Kein entsprechender Input.
 */
@Component({
  selector: 'div[cdsCtaBand]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ep-cta-band',
  },
  template: `
    <h2 class="ep-cta-h2">{{ heading() }}</h2>
    @if (sub()) {
      <p class="ep-cta-sub">{{ sub() }}</p>
    }
    @if (primaryHref()) {
      <a [class]="actionClasses()" [href]="primaryHref()">{{ primaryLabel() }}</a>
    } @else {
      <button [class]="actionClasses()" type="button" (click)="primaryClick.emit($event)">
        {{ primaryLabel() }}
      </button>
    }
  `,
})
export class CtaBandComponent {
  /** Headline (`.ep-cta-h2`) — das konkrete Angebot, keine Marketing-Floskel. */
  readonly heading = input.required<string>();
  /** Beschriftung der (einzigen) Aktion. */
  readonly primaryLabel = input.required<string>();
  /** Unterzeile (`.ep-cta-sub`, leer = keine Unterzeile). */
  readonly sub = input('');
  /** Markenbereich → `.btn-{area}` auf der Aktion (nicht die Bandfläche, siehe Klassendoku). */
  readonly area = input<CdsArea>('co');
  /** Ziel der Aktion; gesetzt → `<a href>`, leer → `<button>` mit `primaryClick`. */
  readonly primaryHref = input('');

  /** Klick auf die Aktion (feuert nur, wenn `primaryHref` leer ist). */
  readonly primaryClick = output<MouseEvent>();

  /** @internal */
  protected readonly actionClasses = computed(
    () => `btn btn-filled btn-${this.area()} btn-on-band`,
  );
}
