import type { Meta, StoryObj } from '@storybook/angular';
import { within, fireEvent, waitFor, expect } from 'storybook/test';
import { ScaleComponent } from './scale.component';

const meta: Meta<ScaleComponent> = {
  title: 'Komponenten/Eingaben & Formulare/Skala',
  component: ScaleComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stufen-Auswahl für GEORDNETE (ordinale) Kategorien, deren Labels die Werte sind ' +
          '(z. B. Niedrig < Mittel < Hoch). Auf Basis des nativen Range-Inputs; der aktuelle ' +
          'Wert erscheint als Label und wird Screenreadern über aria-valuetext gemeldet. Für ' +
          'ungeordnete/gleichrangige Optionen ist ein Slider das falsche Element — dafür die ' +
          'Radio-Gruppe oder den Segment-Umschalter (AreaTabs) nutzen.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    value: { control: { type: 'number', min: 0 } },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Zufriedenheit',
    labels: ['Sehr unzufrieden', 'Unzufrieden', 'Neutral', 'Zufrieden', 'Sehr zufrieden'],
    value: 2,
    area: 'co',
    helper: '',
    disabled: false,
    scaleId: 'demo-scale',
  },
};
export default meta;

type Story = StoryObj<ScaleComponent>;

export const Interaktiv: Story = {
  // Schieben wählt eine Stufe; das <output> zeigt das Label (nicht die Zahl).
  // Assertion aufs <output> scopen — das Label taucht auch als Tick auf.
  play: async ({ canvasElement }) => {
    const out = canvasElement.querySelector('output');
    await expect(out).toHaveTextContent('Neutral');
    const slider = within(canvasElement).getByRole('slider');
    fireEvent.input(slider, { target: { value: '4' } });
    await waitFor(() => expect(out).toHaveTextContent('Sehr zufrieden'));
  },
};

export const Stufen: Story = {
  name: 'Verschiedene Skalen',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [ScaleComponent] },
    template: `
      <div style="display:grid;gap:32px;max-width:460px">
        <cds-scale scaleId="sc-3" area="co" label="Priorität"
          [labels]="['Niedrig','Mittel','Hoch']" [value]="1"></cds-scale>
        <cds-scale scaleId="sc-4" area="ki" label="Häufigkeit"
          [labels]="['nie','selten','oft','immer']" [value]="2"></cds-scale>
        <cds-scale scaleId="sc-5" area="es" label="Erfahrung"
          [labels]="['Einsteiger','Fortgeschritten','Erfahren','Experte']" [value]="1"></cds-scale>
      </div>
    `,
  }),
};
