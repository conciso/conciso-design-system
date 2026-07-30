import type { Meta, StoryObj } from '@storybook/angular';
import { TestimonialComponent } from './testimonial.component';

const meta: Meta<TestimonialComponent> = {
  title: 'Organisms/Testimonial',
  component: TestimonialComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Kundenstimme als Karte: Zitat mit Quote-Icon und Attribution (Name und Rolle) ' +
          'im Footer. Semantisch korrektes figure/blockquote/figcaption-Muster, je nach ' +
          'Themengebiet bereichsgefärbt.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    quote:
      'Conciso hat unsere Plattform spürbar verschlankt — weniger Code, klarere Prozesse, zufriedenere Teams.',
    name: 'Dr. Maria Schmidt',
    roleLabel: 'CTO, Beispiel GmbH',
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<TestimonialComponent>;

export const Interaktiv: Story = {};

export const ProBereich: Story = {
  name: 'Je Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [TestimonialComponent] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
        <cds-testimonial area="co" name="A. Becker" roleLabel="CEO"
          quote="Ein Auftritt, auf den wir stolz sind — klar, konsistent, professionell."></cds-testimonial>
        <cds-testimonial area="ki" name="S. Khan" roleLabel="Head of Data"
          quote="Die KI-Lösung liefert seit Tag eins messbaren Mehrwert."></cds-testimonial>
        <cds-testimonial area="es" name="M. Lang" roleLabel="VP Engineering"
          quote="Weniger technische Schulden, schnellere Releases — genau wie versprochen."></cds-testimonial>
      </div>
    `,
  }),
};
