import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';

// Modulweiter Zähler → eindeutige id für die gerenderte Überschrift (aria-labelledby),
// analog zum Muster in area-tabs.component.ts / scale.component.ts.
let uid = 0;

/**
 * Section (cds-section) — Wrapper um `.ep-section` aus css/components.css
 * (css/components.css:1223–1253, mobiler Innenabstand: Zeile 1228) mit dem optionalen
 * Kopf-Trio `.ep-section-label` (Kicker) / `.ep-section-h2` (Überschrift) /
 * `.ep-section-sub` (Lead). Das strukturelle Grundgerüst, in dem auf den
 * Beispielseiten praktisch jeder andere Baustein sitzt (133 Vorkommen, 85 davon mit
 * Kopfzeile).
 *
 * Alle drei Textteile sind Beiwerk (`input('')`): eine Sektion besteht auch ganz ohne
 * Kopf, nur aus ihrem projizierten Inhalt (docs/index.html:9378). Der Inhalt selbst
 * kommt per `<ng-content>` und ist deshalb kein Input.
 *
 * **Entscheidung 1 — Landmark nur mit zugänglichem Namen.** Eine `<section>` ohne
 * accessible name wird von Screenreadern nicht als Region-Landmark angekündigt (HTML-AAM);
 * ohne Namen wäre sie in der Landmark-Navigation nur ein weiterer namenloser Eintrag. Die
 * Komponente rendert `<section aria-labelledby="…">` deshalb NUR, wenn ein Name
 * verfügbar ist: vorrangig die eigene, gerenderte `.ep-section-h2` (bekommt eine
 * generierte id), sonst — wenn `heading` leer bleibt, der Name aber von einer
 * Überschrift AUSSERHALB der Komponente kommt — die per `labelledBy` übergebene id.
 * Ist beides leer, bleibt es bei einem namenlosen `<div class="ep-section">`, statt ein
 * `<section>` zu rendern, das ohnehin keine Landmark-Rolle bekäme: Der fehlende Name
 * ist damit direkt im Markup sichtbar, nicht erst beim Prüfen des Accessibility-Trees.
 *
 * **Entscheidung 2 — kein `background`-Input.** Das Mockup setzt Sektionsflächen
 * inline (`style="background:var(--bg-surface)"` / `--co-50` / …). Das ist der
 * Flächen-Rhythmus zwischen aufeinanderfolgenden Sektionen einer SEITE (Begründung
 * inkl. Messwerten in docs/index.html:1450, „Warum nicht die Sektion senken?“) — eine
 * Entscheidung, die nur die Seite treffen kann, weil nur sie ihre Nachbar-Sektionen
 * kennt. Ein Bauteil kennt seinen Kontext nicht (CONTRIBUTING.md §7) und bekäme mit
 * einem `background`-Input eine Zuständigkeit, die ihm nicht zusteht. Der Konsument setzt
 * die Fläche daher weiterhin selbst — und zwar auf einem UMSCHLIESSENDEN Element, nicht auf
 * dem `<cds-section>`-Host: Ein unbekanntes Custom Element ist ohne eigene CSS-Regel
 * standardmäßig `display:inline` (nichts im Repo setzt `cds-section{display:block}`), und ein
 * Inline-Element mit einem Block-Kind (`<section class="ep-section">`) malt seinen
 * Hintergrund nicht zuverlässig über dessen Fläche. `<div style="background:…"><cds-section
 * …></cds-section></div>` ist deshalb der richtige Ort, nicht `<cds-section
 * style="background:…">`.
 */
@Component({
  selector: 'cds-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    @if (ariaLabelledBy(); as labelledById) {
      <section class="ep-section" [attr.aria-labelledby]="labelledById">
        <ng-container [ngTemplateOutlet]="body"></ng-container>
      </section>
    } @else {
      <div class="ep-section">
        <ng-container [ngTemplateOutlet]="body"></ng-container>
      </div>
    }
    <!--
      Laufzeit-Wechsel geprüft (Spike, siehe PR-Historie): Springt "heading" zwischen
      '' und einem Wert, wird der @if/@else-Zweig zerstört und neu aufgebaut — der per
      <ng-content> projizierte Inhalt übersteht das trotzdem, weil Angular denselben
      <ng-template>-Inhalt (inkl. der darin liegenden Projektion) über ngTemplateOutlet
      erneut instanziiert, statt die Projektion an den Host zu binden. Kein Bug, keine
      offene Frage.
    -->
    <ng-template #body>
      @if (label()) {
        <div [class]="labelClasses()">{{ label() }}</div>
      }
      @if (heading()) {
        <h2 class="ep-section-h2" [id]="headingId">{{ heading() }}</h2>
      }
      @if (sub()) {
        <p class="ep-section-sub">{{ sub() }}</p>
      }
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class SectionComponent {
  /** Kicker-Text über der Überschrift (`.ep-section-label`, leer = keine Kopfzeile). */
  readonly label = input('');
  /** Sektions-Überschrift (`.ep-section-h2`, leer = keine Überschrift). */
  readonly heading = input('');
  /** Lead-Text unter der Überschrift (`.ep-section-sub`, leer = kein Lead). */
  readonly sub = input('');
  /** Markenbereich → `.t-{area}` auf dem Label (Mockup: `class="ep-section-label t-co"`). */
  readonly area = input<CdsArea>();
  /**
   * Id einer Überschrift AUSSERHALB der Komponente, die als zugänglicher Name dient,
   * wenn `heading` leer bleibt (siehe Entscheidung 1 in der Klassendoku).
   */
  readonly labelledBy = input('');

  private readonly instance = ++uid;
  /** @internal */
  protected readonly headingId = `cds-section-${this.instance}-heading`;

  /**
   * Zugänglicher Name der Sektion: die eigene Überschrift hat Vorrang, sonst die von
   * außen übergebene id. `null`, wenn keins von beidem vorhanden ist — dann rendert die
   * Komponente ein `<div>` statt eines `<section>` (Entscheidung 1 in der Klassendoku).
   *
   * @internal
   */
  protected readonly ariaLabelledBy = computed<string | null>(() =>
    this.heading() ? this.headingId : this.labelledBy() || null,
  );

  /** @internal */
  protected readonly labelClasses = computed(() => {
    const area = this.area();
    return area ? `ep-section-label t-${area}` : 'ep-section-label';
  });
}
