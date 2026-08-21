import { Component, input } from '@angular/core';

export interface CdsFaqItem {
  q: string;
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
  standalone: true,
  template: `
    <div class="ep-faq">
      @for (item of items(); track item.q) {
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
  readonly items = input<CdsFaqItem[]>([
    {
      q: 'Wie läuft die Bewerbung ab?',
      a: 'Über das Formular bei der jeweiligen Stelle oder initiativ. Du bekommst zeitnah eine Rückmeldung, danach folgt ein Kennenlern-Gespräch.',
    },
    {
      q: 'Wo und wie arbeitet ihr?',
      a: 'Unser Büro ist der Workgarden in Dortmund. Du kannst flexibel remote arbeiten, gemeinsame Präsenztage halten das Team zusammen.',
    },
    {
      q: 'Welche Technologien nutzt ihr?',
      a: 'Moderne, langlebige Stacks — die Wahl richtet sich nach dem Problem, nicht nach dem Hype.',
    },
  ]);
}
