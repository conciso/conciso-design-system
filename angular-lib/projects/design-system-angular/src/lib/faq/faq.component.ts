import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  template: `
    <div class="ep-faq">
      @for (item of items(); track $index) {
        <!-- Kein [open]-Binding: „standardmäßig zugeklappt“ ist der Default. Ein
             gebundenes [open]="false" würde den nativen Toggle bei jedem Change-
             Detection-Lauf wieder zuklappen. -->
        <details>
          <summary>
            {{ item.q }}
            <svg
              class="ep-faq-caret"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
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
