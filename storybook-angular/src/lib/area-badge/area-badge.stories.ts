import type { Meta, StoryObj } from '@storybook/angular';
import { AreaBadgeComponent } from '@conciso/design-system-angular';

const meta: Meta<AreaBadgeComponent> = {
  title: 'Atoms/Bereichs-Badge',
  component: AreaBadgeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Passive Bereichs-Kennzeichnung: ein kleines, nicht interaktives Label, das ein ' +
          'Element einer der vier Brand Areas zuordnet (50er-Grund, 800er-Text). Für ' +
          'Zustände die Status-Badge, für einen redaktionellen Anker im Lesefluss die Pill, ' +
          'für interaktive Filter den Chip nutzen.',
      },
    },
  },
  argTypes: {
    area: {
      control: 'inline-radio',
      options: ['co', 'ki', 'es', 'wo'],
      description: 'Brand Area, die die Bereichsfarbe bestimmt',
    },
  },
  args: { label: 'Corporate', area: 'co' },
};
export default meta;

type Story = StoryObj<AreaBadgeComponent>;

export const Interaktiv: Story = {};

export const Bereiche: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [AreaBadgeComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-area-badge area="co" label="Corporate"></cds-area-badge>
        <cds-area-badge area="ki" label="Angewandte KI"></cds-area-badge>
        <cds-area-badge area="es" label="Effektive Software"></cds-area-badge>
        <cds-area-badge area="wo" label="Wirksame Organisationen"></cds-area-badge>
      </div>
    `,
  }),
};
