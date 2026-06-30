import type { Meta, StoryObj } from '@storybook/angular';
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

export const Interaktiv: Story = {};
