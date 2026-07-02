import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { AreaTabsComponent } from './area-tabs.component';

const meta: Meta<AreaTabsComponent> = {
  title: 'Komponenten/Navigation/AreaTabs',
  component: AreaTabsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tab-Umschalter zwischen mehreren Bereichen: pro Bereich ein Tab, dessen Inhalt beim ' +
          'Anklicken angezeigt wird. Der aktive Tab wird in der jeweiligen Bereichsfarbe hervorgehoben. ' +
          'Typisch für den Vergleich bereichsspezifischer Inhalte auf einer Seite.',
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
