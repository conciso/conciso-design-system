import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { FaqComponent } from './faq.component';

const meta: Meta<FaqComponent> = {
  title: 'Komponenten/Navigation/FAQ',
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
