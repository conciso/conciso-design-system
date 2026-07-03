import type { Meta, StoryObj } from '@storybook/angular';
import { within, fireEvent, waitFor, expect } from 'storybook/test';
import { SliderComponent } from './slider.component';

const meta: Meta<SliderComponent> = {
  title: 'Komponenten/Eingaben & Formulare/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Numerische Wertauswahl über einen Regler mit Live-Anzeige des gewählten Werts ' +
          '(formatiert, z. B. mit Einheit). Volle Tastatursteuerung über Pfeiltasten sowie ' +
          'Pos1/Ende.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    tickCount: { control: { type: 'number', min: 0, max: 12 } },
    minTickSpacing: { control: { type: 'number', min: 24, max: 120 } },
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
    tickCount: 5,
    minTickSpacing: 56,
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

export const AutoTicks: Story = {
  name: 'Ticks (auto-reduziert)',
  parameters: { controls: { disable: true } },
  // Gleiche gewünschte Tick-Zahl (7), zwei Breiten: breit zeigt alle, schmal
  // reduziert automatisch (ResizeObserver), Endpunkte bleiben erhalten.
  render: () => ({
    moduleMetadata: { imports: [SliderComponent] },
    template: `
      <div style="display:grid;gap:32px">
        <div style="max-width:520px">
          <cds-slider sliderId="s-wide" label="Breit — 7 Ticks" [tickCount]="7"></cds-slider>
        </div>
        <div style="max-width:200px">
          <cds-slider sliderId="s-narrow" label="Schmal — reduziert" [tickCount]="7"></cds-slider>
        </div>
      </div>
    `,
  }),
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
