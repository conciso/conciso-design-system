import type { Meta, StoryObj } from '@storybook/angular';
import { BrandWheelComponent } from './brand-wheel.component';

const meta: Meta<BrandWheelComponent> = {
  title: 'Komponenten/Seite & Marke/BrandWheel',
  component: BrandWheelComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Wrapper um `.bw-wrap` / `.bw-svg` (css/components.css). Statische Marken-' +
          'Illustration „Ruhige Energie" (Kernwert Gelassenheit, drei Pfeiler). SVG verbatim ' +
          'aus docs/index.html, nutzt nur `.bw-*`-Klassen + Tokens (theme-reaktiv).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<BrandWheelComponent>;

export const Interaktiv: Story = {};
