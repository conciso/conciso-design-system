import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { FaqComponent } from '@conciso/design-system-angular';

const meta: Meta<FaqComponent> = {
  title: 'Organisms/FAQ',
  component: FaqComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Akkordeon aus aufklappbaren Fragen und Antworten für FAQ-Sektionen auf Content- und ' +
          'Marketingseiten. Standardmäßig zugeklappt, öffnet sich jede Frage per Klick oder ' +
          'Tastatur. Liest sich am besten im zweispaltigen Layout mit Überschrift links und ' +
          'Fragenliste rechts.',
      },
    },
  },
  args: {
    items: [
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
    ],
  },
};
export default meta;

type Story = StoryObj<FaqComponent>;

export const Interaktiv: Story = {
  // Natives details/summary: Klick auf die Frage klappt die Antwort auf.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const summary = c.getByText('Wie läuft die Bewerbung ab?');
    const details = summary.closest('details');
    await expect(details).not.toHaveAttribute('open');
    await userEvent.click(summary);
    await expect(details).toHaveAttribute('open');
  },
};
