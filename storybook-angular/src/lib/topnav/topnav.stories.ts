import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { TopnavComponent } from './topnav.component';

const meta: Meta<TopnavComponent> = {
  title: 'Komponenten/Navigation & Disclosure/Topnav',
  component: TopnavComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wrapper um `.ep-topnav` (css/components.css). Logo, Top-Level-Links mit Klapp-' +
          'Submenüs (.ep-nav-has-sub), rechts Such-Popover und Theme-Umschalter (.ep-nav-actions), ' +
          'CTA-Button. Disclosure-Logik in Angular: nur ein Menü offen, Escape und Außenklick ' +
          'schließen; der Theme-Button setzt data-theme am <html>.',
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
