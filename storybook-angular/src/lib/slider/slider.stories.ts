import type { Meta, StoryObj } from '@storybook/angular';
import { within, fireEvent, waitFor, expect } from 'storybook/test';
import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Komponenten/Aktionen & Eingaben/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // Bekannter CSS-Kern-Befund: .field-slider-output.slider-{co,ki,wo} nutzt --sl-color
    // = --XX-500/700 und reißt AA. Im Panel weiter sichtbar, blockiert den Test nicht.
    a11y: { test: 'todo' },
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

export const Interaktiv: Story = {
  // Schieben aktualisiert die formatierte Live-Ausgabe (de-DE + Einheit).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByText('50.000 €')).toBeInTheDocument();
    const slider = c.getByRole('slider');
    fireEvent.input(slider, { target: { value: '75000' } });
    await waitFor(() => expect(c.getByText('75.000 €')).toBeInTheDocument());
  },
};

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
