import type { Meta, StoryObj } from '@storybook/angular';
import { BlockquoteComponent } from './blockquote.component';

const meta: Meta<BlockquoteComponent> = {
  title: 'Komponenten/Blockquote',
  component: BlockquoteComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.bq` (css/components.css). Bereichsgefärbtes Zitat mit ' +
          'Akzentleiste, getöntem Grund (`[data-area]`), Quote-Icon und Caption.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    quote: 'Klare Kommunikation schafft Vertrauen, lange bevor das erste Meeting stattfindet.',
    name: 'Maria Schneider',
    role: 'Head of Marketing, Musterunternehmen GmbH',
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
        <cds-blockquote area="co" quote="Klare Kommunikation schafft Vertrauen." name="A. Becker" role="CEO"></cds-blockquote>
        <cds-blockquote area="ki" quote="KI liefert ab Tag eins messbaren Mehrwert." name="S. Khan" role="Head of Data"></cds-blockquote>
        <cds-blockquote area="es" quote="Weniger Code, klarere Architektur." name="M. Lang" role="VP Engineering"></cds-blockquote>
        <cds-blockquote area="wo" quote="Teams, die lernen und sich anpassen." name="P. Adam" role="COO"></cds-blockquote>
      </div>
    `,
  }),
};
