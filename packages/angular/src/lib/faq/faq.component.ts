import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideChevronDown } from '../icons/cds-icons';

/** Ein FAQ-Eintrag. */
export interface CdsFaqItem {
  /** Frage (Summary-Zeile). */
  q: string;
  /** Antworttext. */
  a: string;
}

/**
 * Faq — Wrapper um `.ep-faq` aus css/components.css → „FAQ-Accordion“.
 *
 * Nutzt natives `<details>/<summary>` (kein JS nötig): Auf-/Zuklappen, Tastatur
 * und Zugänglichkeit kommen vom Browser. Der Caret (.ep-faq-caret) dreht via
 * `details[open]`. Antwort in `.ep-faq-a`.
 */
@Component({
  selector: 'cds-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideChevronDown],
  template: `
    <div class="ep-faq">
      @for (item of items(); track item) {
        <!-- Kein [open]-Binding: „standardmäßig zugeklappt“ ist der Default. Ein
             gebundenes [open]="false" würde den nativen Toggle bei jedem Change-
             Detection-Lauf wieder zuklappen. -->
        <details>
          <summary>
            {{ item.q }}
            <svg lucideChevronDown class="ep-faq-caret" size="24" [strokeWidth]="1.25"></svg>
          </summary>
          <p class="ep-faq-a">{{ item.a }}</p>
        </details>
      }
    </div>
  `,
})
export class FaqComponent {
  /** Fragen-/Antworten-Liste des Akkordeons. */
  readonly items = input.required<CdsFaqItem[]>();
}
