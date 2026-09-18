import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';

// Modulweiter Zähler → eindeutige id für die gerenderte Überschrift (aria-labelledby),
// analog zum Muster in area-tabs.component.ts / scale.component.ts.
let uid = 0;

/**
 * Section (`[cdsSection]`) — Wrapper um `.ep-section` aus css/components.css
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
 * **Entscheidung 1 — Attributselektor, der Konsument wählt `<section>` oder `<div>`.**
 * Erste Fassung war `cds-section` als eigenes Element, das intern selbst entschied:
 * `<section aria-labelledby="…">`, wenn ein zugänglicher Name verfügbar war, sonst ein
 * namenloses `<div>`. Das setzte voraus, dass ein `background` auf einem
 * UMSCHLIESSENDEN Element sitzen musste (siehe Entscheidung 2) — gemessen im laufenden
 * Storybook (siehe `docs/adr/0008-selektortyp-der-wrapper-komponenten.md`, „Fall 2“):
 * `getComputedStyle(host).backgroundColor` und `host.getBoundingClientRect()`
 * meldeten beide „passt“, der Screenshot zeigte trotzdem keine gemalte Fläche — ein
 * unbekanntes Custom Element ohne eigene Inline-Inhalte, dessen einziges Kind als Block
 * herausgebrochen wird, hat keine eigene Box zum Malen.
 *
 * Die Komponente hängt sich deshalb als Attribut an ein vom Konsumenten geschriebenes
 * `<section>` oder `<div>`, analog zu `cds-icon-card`
 * (`icon-card/icon-card.component.ts`). Der Konsument entscheidet über das Tag, ob die
 * Sektion überhaupt eine `<section>`-Landmark werden KANN; die Komponente entscheidet
 * nur noch, ob sie `aria-labelledby` setzt (die eigene, gerenderte `.ep-section-h2` hat
 * Vorrang, sonst — wenn `heading` leer bleibt — die per `labelledBy` übergebene id einer
 * Überschrift außerhalb der Komponente). Schreibt der Konsument `<section cdsSection>`
 * ohne Namen, bleibt es bei einer `<section>` ohne `aria-labelledby`: HTML-AAM gibt ihr
 * dann keine Landmark-Rolle, aber das ist eine Entscheidung des Konsumenten, keine der
 * Komponente — sie erzwingt kein Tag mehr.
 *
 * **Entscheidung 2 — kein `background`-Input, die Fläche darf jetzt aber am Host
 * sitzen.** Das Mockup setzt Sektionsflächen inline (`style="background:var(--bg-surface)"`
 * / `--co-50` / …). Das ist der Flächen-Rhythmus zwischen aufeinanderfolgenden
 * Sektionen einer SEITE (Begründung inkl. Messwerten in docs/index.html:1450, „Warum
 * nicht die Sektion senken?“) — eine Entscheidung, die nur die Seite treffen kann, weil
 * nur sie ihre Nachbar-Sektionen kennt. Ein Bauteil kennt seinen Kontext nicht
 * (CONTRIBUTING.md §7) und bekäme mit einem `background`-Input eine Zuständigkeit, die
 * ihm nicht zusteht. Der Konsument setzt die Fläche deshalb weiterhin selbst — jetzt
 * aber direkt auf dem Element, das `cdsSection` trägt (`<section cdsSection
 * style="background:…">` bzw. `<div cdsSection style="…">`), denn dieses Element IST
 * `.ep-section`, kein Host mehr davor. Das umschließende Element aus der ersten Fassung
 * ist damit nicht mehr nötig (siehe Story „Fläche am Host“).
 */
@Component({
  selector: 'section[cdsSection], div[cdsSection]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ep-section',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
  },
  template: `
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
   * außen übergebene id. `null`, wenn keins von beidem vorhanden ist — dann setzt die
   * Komponente kein `aria-labelledby`. Ob der Host dadurch eine Landmark wird, hängt
   * am Tag, das der Konsument gewählt hat (siehe Entscheidung 1 in der Klassendoku).
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
