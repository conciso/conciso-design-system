import type { Meta, StoryObj } from '@storybook/angular';
import { StatCardComponent } from './stat-card.component';

const meta: Meta<StatCardComponent> = {
  title: 'Komponenten/StatCard',
  component: StatCardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.card-stat` (css/components.css). Kennzahl mit bereichsgefärbtem ' +
          'Top-Akzent (`[data-area]`), `.card-stat-value`, `.card-stat-label` und ' +
          'optionalem Trend-Pill `.card-stat-trend.up/.down`.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    trend: { control: 'inline-radio', options: [undefined, 'up', 'down'] },
  },
  args: {
    value: '98 %',
    label: 'Kundenzufriedenheit',
    area: 'co',
    trend: 'up',
    trendText: '+12 %',
  },
};
export default meta;

type Story = StoryObj<StatCardComponent>;

export const Interaktiv: Story = {};

export const Kennzahlen: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [StatCardComponent] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
        <cds-stat-card area="co" value="120+" label="Projekte" trend="up" trendText="+8"></cds-stat-card>
        <cds-stat-card area="ki" value="98 %" label="Zufriedenheit" trend="up" trendText="+12 %"></cds-stat-card>
        <cds-stat-card area="es" value="−34 %" label="Time-to-Market" trend="down" trendText="schneller"></cds-stat-card>
        <cds-stat-card area="wo" value="15 J." label="Erfahrung"></cds-stat-card>
      </div>
    `,
  }),
};
