import type { Meta, StoryObj } from '@storybook/angular';
import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Komponenten/Aktionen & Eingaben/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.field-slider` / `.slider` (css/components.css). Range-Eingabe mit ' +
          'Live-Ausgabe; `.slider-<area>` färbt Thumb und Output (`--sl-color`). Wert wird ' +
          'beim Schieben formatiert (de-DE + Einheit) aktualisiert.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Budget-Rahmen',
    area: 'co',
    min: 10000,
    max: 100000,
    step: 5000,
    value: 50000,
    unit: ' €',
    ticks: ['10k', '55k', '100k'],
    helper: 'Schritte: 5.000 €',
    disabled: false,
    sliderId: 'demo-slider',
  },
};
export default meta;

type Story = StoryObj<SliderComponent>;

export const Interaktiv: Story = {};

export const ProBereich: Story = {
  name: 'Je Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [SliderComponent] },
    template: `
      <div style="display:grid;gap:24px;max-width:420px">
        <cds-slider area="co" sliderId="s-co" label="Corporate"></cds-slider>
        <cds-slider area="ki" sliderId="s-ki" label="AI.Applied"></cds-slider>
        <cds-slider area="es" sliderId="s-es" label="Eff. Software"></cds-slider>
        <cds-slider area="wo" sliderId="s-wo" label="Wirks. Orga"></cds-slider>
      </div>
    `,
  }),
};
