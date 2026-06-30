import type { Meta, StoryObj } from '@storybook/angular';
import { StatStripComponent } from './stat-strip.component';

const meta: Meta<StatStripComponent> = {
  title: 'Komponenten/Karten & Kennzahlen/StatStrip',
  component: StatStripComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wrapper um `.card-stat-strip` + `.card-stat-flat` (css/components.css). ' +
          'Flacher Bandstreifen mit zentrierten Kennzahlen auf --n-50-Grund, je ' +
          'Bereich getönt via `[data-area]`. Ohne Rahmen/Schatten.',
      },
    },
  },
  argTypes: {
    rounded: { control: 'boolean' },
  },
  args: {
    rounded: true,
    stats: [
      { area: 'co', value: '94 %', label: 'Kundenzufriedenheit' },
      { area: 'ki', value: '3×', label: 'Schnellere Prozesse durch KI' },
      { area: 'es', value: '99,9 %', label: 'System-Uptime' },
      { area: 'wo', value: '280+', label: 'Transformationsprojekte' },
    ],
  },
};
export default meta;

type Story = StoryObj<StatStripComponent>;

export const Interaktiv: Story = {};

export const DreiKennzahlen: Story = {
  name: 'Drei Kennzahlen',
  args: {
    stats: [
      { area: 'co', value: '120+', label: 'Projekte' },
      { area: 'es', value: '−34 %', label: 'Time-to-Market' },
      { area: 'wo', value: '15 J.', label: 'Erfahrung' },
    ],
  },
};
