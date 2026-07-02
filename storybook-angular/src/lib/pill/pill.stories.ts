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
          'Wrapper um `.pill` (css/components.css). Passive, redaktionelle Bereichs-Markierung ' +
          '(Eyebrow, uppercase) — ordnet einen Inhalt einer Brand Area zu, typischerweise vor ' +
          'einem Titel. `[data-area]` schaltet die Bereichsfarbe; ein `aria-label` („Bereich ' +
          '<Name>") macht die Zuordnung für Screenreader explizit. Abgrenzung zur Badge: Pill = ' +
          'thematischer Inhalts-Anker im Lesefluss, Badge = punktuelle Status-/Bereichs-Kennzeichnung.',
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
