import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { AreaTabsComponent } from './area-tabs.component';

const meta: Meta<AreaTabsComponent> = {
  title: 'Komponenten/Navigation & Disclosure/AreaTabs',
  component: AreaTabsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.area-tabs` / `.atab` / `.atab-content` (css/components.css). ' +
          'Bereichsgefärbte Tab-Leiste; der aktive Tab färbt Text + Unterstrich über ' +
          '`--atab-color` (Bereichs-700), der Punkt über Bereichs-500. Umschalten per Klick.',
      },
    },
  },
  args: { active: 0 },
};
export default meta;

type Story = StoryObj<AreaTabsComponent>;

export const Interaktiv: Story = {
  // Tab-Wechsel: Klick aktiviert den Tab (aria-selected) und sein Panel.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const tabs = c.getAllByRole('tab');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(tabs[1]);
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  },
};
