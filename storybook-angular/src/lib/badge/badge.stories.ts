import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Komponenten/Chips, Badges & Pills/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Passive Status- und Bereichs-Kennzeichnung: ein kleines, nicht interaktives ' +
          'Label, das einen Zustand (OK, Warnung, Fehler, Neu) oder eine Brand-Area-Zugehörigkeit ' +
          'anzeigt. Anders als der interaktive Chip dient die Badge nur der Kennzeichnung.',
      },
    },
  },
  argTypes: {
    // tone und area schließen sich aus (area hat Vorrang). Das tone-Control daher
    // nur zeigen, solange kein Bereich gewählt ist.
    tone: {
      control: 'inline-radio',
      options: ['ok', 'warn', 'err', 'neu'],
      if: { arg: 'area', truthy: false },
      description: 'Status-Ton (nur ohne Bereich; .badge-ok/-warn/-err/-neu)',
    },
    area: {
      control: 'inline-radio',
      options: [undefined, 'co', 'ki', 'es', 'wo'],
      description: 'Markenbereich (.badge[data-area]) — hat Vorrang vor dem Ton',
    },
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
