import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * FeaturedCard (cds-featured-card) — Wrapper um `.card-featured` aus
 * css/components.css (css/components.css:230–249): die horizontale Großkarte für
 * **genau einen** hervorgehobenen Beitrag oder Termin (Bild links 60 %, Textspalte
 * rechts 40 % als absolut positioniertes Overlay), siehe `docs/index.html`
 * Abschnitt „Featured · horizontale Großkarte“ (`#gt-events-featured`).
 *
 * **Entscheidung 1 — `href` entscheidet zwischen `<a>` und `<article>`.** Die
 * Doku-Beispiele zeigen die Featured-Card ausschließlich als Link
 * (`a.card.card-elevated.card-featured`), das Ticket verlangt aber ausdrücklich eine
 * Variante ohne `<a>`. `.card-elevated` ist nach `CONTRIBUTING.md` §4 („Elevation =
 * Interaktivität“) im CSS auf `a.card-elevated` gescoped — eine `<article>` bekäme
 * den Schatten mit gesetzter Klasse ohnehin nicht. Die Komponente führt die Klasse
 * deshalb nur mit, wenn sie auch wirkt: mit `href` ein `<a class="card card-elevated
 * card-featured">`, ohne `href` ein `<article class="card card-featured">` (ruht
 * flach mit dem `--bd-strong`-Rahmen aus `.card`, wie jede statische Fläche). Media
 * und Body stehen dafür einmal in einem gemeinsamen `<ng-template>` und werden in
 * beiden Zweigen per `<ng-container [ngTemplateOutlet]>` eingesetzt — dasselbe
 * Muster wie `SectionComponent` (`section.component.ts`) für „zwei Wurzelelemente,
 * ein Körper“. `<ng-container>` rendert selbst kein Element, die Kindselektoren aus
 * Entscheidung 2 bleiben also unberührt: im laufenden Storybook erneut per
 * `querySelector`/`getBoundingClientRect` gemessen (siehe Play-Funktionen), Ergebnis
 * unverändert zur vorherigen, noch duplizierten Fassung.
 *
 * **Entscheidung 2 — die Pill ist direkt komponiertes Markup, kein `<cds-pill>`.**
 * Das CSS arbeitet mit direkten Kindselektoren: `.card-featured>.card-media`,
 * `.card-featured-body>.pill`, `.card-featured-body>.card-text`,
 * `.card-featured-body>.card-title-hero` (jeweils mit `margin`/`min-height`/
 * `line-clamp`-Übernahmen, siehe CSS-Kommentare dort). `<cds-pill>` rendert sein
 * `.pill`-`<span>` nicht auf dem eigenen Host-Element, sondern eine Ebene tiefer
 * (`pill.component.ts`: Host ist `<cds-pill>`, `.pill` sitzt im Template darunter) —
 * projiziert als `<cds-pill class="pill">` stünde die Pille damit als
 * `.card-featured-body>cds-pill>.pill`, zwei Ebenen statt einer, und die
 * Kindselektoren griffen nicht mehr (leise: kein Fehler, nur falsches Layout).
 * Dieselbe Abwägung wie in `download-cta.component.ts` (Kommentar über den
 * Buttons): dort verhindert `.cta-dl-actions`, das seine Kinder per Flex streckt,
 * dass ein `<cds-button>`-Host mitstreckt; hier verhindert ein Kindselektor, dass
 * irgendein zusätzliches Host-Element dazwischentritt. In beiden Fällen werden die
 * Klassen direkt komponiert statt eine Wrapper-Komponente zu verwenden. Geprüft im
 * laufenden Storybook (`Komponenten/Cards & Teaser/Featured-Karte`): die gerenderte
 * Kette ist `.card-featured>.card-media` und `.card-featured-body` mit `.pill`,
 * `.card-text`, `.card-title-hero` als direkten Kindern, kein zusätzliches Element
 * dazwischen (siehe Play-Funktionen der Stories).
 *
 * Weil die Pille direkt komponiert wird, übernimmt diese Komponente auch die
 * `aria-label`-Regel von `PillComponent` (`pill.component.ts`) von Hand nach:
 * Default „Bereich `<pill>`“, überschreibbar über `pillAriaLabel` — nötig, weil die
 * Pille nicht immer einen Bereich benennt (siehe `pillAriaLabel`-Doku unten).
 *
 * **Entscheidung 3 — kein separates `data-area` für die Pille.** Die Doku setzt
 * Karte und Pille immer auf denselben Bereich (`docs/index.html:8979`: Karte
 * `data-area="es"`, Pille `data-area="es"`). Die Komponente bindet deshalb `area`
 * auf beide, statt einen zweiten Bereichs-Input zu erfinden.
 *
 * **Entscheidung 4 — kein CTA- und kein Meta-Input.** Die Doku-Vorlage zeigt
 * zusätzlich einen Meta-Strip (Datum/Ort/Format) und einen `.card-cta-link`-Fuß;
 * das Ticket benennt als API aber nur `title`/`text`/`imageSrc`/`imageAlt`/`href`/
 * `pill`/`area`. Diese Komponente bildet exakt diese Fläche ab, ohne Inputs zu
 * erfinden, die das Ticket nicht vorsieht — ein Meta-Strip oder ein CTA-Fuß wären
 * eine spätere, eigene Erweiterung.
 *
 * Verwendungsguidance dieser Gruppe: siehe Card (`komponenten-cards-teaser-card--verwendung`).
 */
@Component({
  selector: 'cds-featured-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    @if (href()) {
      <a class="card card-elevated card-featured" [href]="href()" [attr.data-area]="area() || null">
        <ng-container [ngTemplateOutlet]="body"></ng-container>
      </a>
    } @else {
      <article class="card card-featured" [attr.data-area]="area() || null">
        <ng-container [ngTemplateOutlet]="body"></ng-container>
      </article>
    }
    <ng-template #body>
      <div class="card-media">
        <img [src]="imageSrc()" [alt]="imageAlt()" />
      </div>
      <div class="card-featured-body">
        @if (pill()) {
          <span
            class="pill"
            [attr.data-area]="area() || null"
            [attr.aria-label]="computedPillAriaLabel()"
            >{{ pill() }}</span
          >
        }
        <h3 class="card-title-hero">{{ title() }}</h3>
        <p class="card-text">{{ text() }}</p>
      </div>
    </ng-template>
  `,
})
export class FeaturedCardComponent {
  /** Titel (`.card-title-hero`). */
  readonly title = input.required<string>();
  /** Anreißer-/Beschreibungstext (`.card-text`). */
  readonly text = input.required<string>();
  /** Bildquelle der 16:9-Medienfläche. */
  readonly imageSrc = input.required<string>();
  /** Alternativtext des Bildes — Pflicht, das Bild trägt Bedeutung. */
  readonly imageAlt = input.required<string>();
  /** Linkziel; gesetzt → `<a>` (ganze Fläche klickbar), leer → `<article>` (statisch, kein Schatten). */
  readonly href = input('');
  /** Bereichs-Pille über dem Titel (`.pill`, leer = keine Pille). */
  readonly pill = input('');
  /**
   * `aria-label` der Pille überschreiben; Default „Bereich `<pill>`“, wie
   * `PillComponent` (`pill.component.ts`). Nötig, weil `pill` nicht immer einen
   * Bereich benennt — das Mockup zeigt neben `aria-label="Bereich Corporate"` auch
   * `aria-label="Lesezeit 12 Minuten"` für dieselbe Klasse.
   */
  readonly pillAriaLabel = input<string>();
  /** Markenbereich → `data-area` auf Karte und Pille. */
  readonly area = input<CdsArea>();

  /** @internal */
  protected readonly computedPillAriaLabel = computed(
    () => this.pillAriaLabel() ?? `Bereich ${this.pill()}`,
  );
}
