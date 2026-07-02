import type { Meta, StoryObj } from '@storybook/angular';
import { PillComponent } from './pill.component';

const meta: Meta<PillComponent> = {
  title: 'Komponenten/Chips, Badges & Pills/Pill',
  component: PillComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Redaktioneller Eyebrow in Versalien: eine passive Markierung, die einen Inhalt ' +
          'einer Brand Area zuordnet, typischerweise als thematischer Anker vor einem Titel. ' +
          'Abgrenzung zur Badge: die Pill ist ein redaktioneller Bereichs-Anker im Lesefluss, ' +
          'die Badge eine punktuelle Status- oder Bereichs-Kennzeichnung.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: { label: 'Angewandte KI', area: 'ki' },
};
export default meta;

type Story = StoryObj<PillComponent>;

export const Interaktiv: Story = {};

export const Bereiche: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [PillComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-pill area="co" label="Corporate"></cds-pill>
        <cds-pill area="ki" label="Angewandte KI"></cds-pill>
        <cds-pill area="es" label="Effektive Software"></cds-pill>
        <cds-pill area="wo" label="Wirksame Organisationen"></cds-pill>
      </div>
    `,
  }),
};
