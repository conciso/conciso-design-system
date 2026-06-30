import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Komponenten/Karten & Kennzahlen/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper um `.badge` (css/components.css). Status-Töne über Modifier-Klassen ' +
          '(.badge-ok/.badge-warn/.badge-err/.badge-neu) oder Markenbereich über ' +
          '`[data-area]`. Ist ein Bereich gesetzt, hat er Vorrang vor dem Ton.',
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['ok', 'warn', 'err', 'neu'] },
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
  },
  args: { label: 'Aktiv', tone: 'ok', area: undefined },
};
export default meta;

type Story = StoryObj<BadgeComponent>;

export const Interaktiv: Story = {};

export const Status: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [BadgeComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-badge tone="ok" label="Erfolg"></cds-badge>
        <cds-badge tone="warn" label="Achtung"></cds-badge>
        <cds-badge tone="err" label="Fehler"></cds-badge>
        <cds-badge tone="neu" label="Neutral"></cds-badge>
      </div>
    `,
  }),
};

export const Bereiche: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [BadgeComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-badge area="co" label="Corporate"></cds-badge>
        <cds-badge area="ki" label="AI.Applied"></cds-badge>
        <cds-badge area="es" label="Eff. Software"></cds-badge>
        <cds-badge area="wo" label="Wirks. Orga"></cds-badge>
      </div>
    `,
  }),
};
