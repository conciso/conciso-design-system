import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { within, fireEvent, waitFor, expect } from 'storybook/test';
import { ScaleComponent } from '@conciso/design-system-angular';

const meta: Meta<ScaleComponent> = {
  title: 'Atoms/Skala',
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

export const Formularbindung: Story = {
  name: 'Formularbindung',
  parameters: {
    controls: { disable: true },
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Die Skala ist ein `ControlValueAccessor` und bindet direkt an reactive ' +
          'forms (`formControl`); der Formularwert ist der Stufen-INDEX (hier live ' +
          'angezeigt). Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl(2);
    return {
      moduleMetadata: { imports: [ScaleComponent, ReactiveFormsModule] },
      props: {
        ctrl,
        labels: ['Sehr unzufrieden', 'Unzufrieden', 'Neutral', 'Zufrieden', 'Sehr zufrieden'],
      },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-scale label="Zufriedenheit" scaleId="form-scale" [labels]="labels" [formControl]="ctrl"></cds-scale>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Index: <strong>{{ ctrl.value }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Index: 2');
    fireEvent.input(c.getByRole('slider'), { target: { value: '4' } });
    await waitFor(() => expect(canvasElement).toHaveTextContent('Index: 4'));
  },
};
