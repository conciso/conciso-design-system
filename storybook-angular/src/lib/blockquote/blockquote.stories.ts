import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BlockquoteComponent } from '@conciso/design-system-angular';

const meta: Meta<BlockquoteComponent> = {
  title: 'Molecules/Blockquote',
  component: BlockquoteComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hervorgehobenes Zitat mit Akzentlinie, Quote-Icon und optionaler Attribution ' +
          '(Name, Rolle). Je nach Themengebiet bereichsgefärbt. Für kurze, prägnante ' +
          'Aussagen im Textfluss.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    quote: 'Klare Kommunikation schafft Vertrauen, lange bevor das erste Meeting stattfindet.',
    name: 'Maria Schneider',
    roleLabel: 'Head of Marketing, Musterunternehmen GmbH',
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<BlockquoteComponent>;

export const Interaktiv: Story = {};

export const ProBereich: Story = {
  name: 'Je Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [BlockquoteComponent] },
    template: `
      <div style="display:grid;gap:24px;max-width:640px">
        <cds-blockquote area="co" quote="Klare Kommunikation schafft Vertrauen." name="A. Becker" roleLabel="CEO"></cds-blockquote>
        <cds-blockquote area="ki" quote="KI liefert ab Tag eins messbaren Mehrwert." name="S. Khan" roleLabel="Head of Data"></cds-blockquote>
        <cds-blockquote area="es" quote="Weniger Code, klarere Architektur." name="M. Lang" roleLabel="VP Engineering"></cds-blockquote>
        <cds-blockquote area="wo" quote="Teams, die lernen und sich anpassen." name="P. Adam" roleLabel="COO"></cds-blockquote>
      </div>
    `,
  }),
};
