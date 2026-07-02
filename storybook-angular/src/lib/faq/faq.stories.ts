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
          'Wrapper um `.ep-faq` (css/components.css) auf Basis von nativem ' +
          '`<details>/<summary>` — Auf-/Zuklappen, Tastaturbedienung und ' +
          'Zugänglichkeit ohne JS. Der Caret dreht über `details[open]`.',
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
