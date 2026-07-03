import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { TopnavComponent } from './topnav.component';

const meta: Meta<TopnavComponent> = {
  title: 'Organisms/Topnav',
  component: TopnavComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hauptnavigation der Customer-Pages: Logo und Top-Level-Links mit aufklappbaren ' +
          'Submenüs links, rechts Suche, Theme-Umschalter und ein Kontakt-Button als Call-to-Action. ' +
          'Die aktive Sektion wird über einen dezenten Unterstrich und Bereichsfarbe markiert. ' +
          'Barrierefrei nach WCAG 2.1 AA.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<TopnavComponent>;

export const Interaktiv: Story = {
  // Submenü öffnet per Klick (aria-expanded) und schließt mit Escape.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: /Leistungen/ });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  },
};
