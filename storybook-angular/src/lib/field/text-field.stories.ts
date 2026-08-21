import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { TextFieldComponent } from '@conciso/design-system-angular';

const meta: Meta<TextFieldComponent> = {
  title: 'Molecules/Textfeld',
  component: TextFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Einzeiliges Textfeld: verbindet Label, Eingabe, Hilfetext und Fehlermeldung ' +
          'zu einer zusammenhängenden Einheit. Über den Typ für E-Mail, Telefon, Text usw. ' +
          'Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.',
      },
    },
  },
  argTypes: {
    type: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'E-Mail',
    type: 'email',
    placeholder: 'name@firma.de',
    helper: 'Wir nutzen die Adresse ausschließlich für die Antwort.',
    error: '',
    required: true,
    fieldId: 'demo-email',
  },
};
export default meta;

type Story = StoryObj<TextFieldComponent>;

export const Interaktiv: Story = {};

export const Fehlerzustand: Story = {
  args: {
    error: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    fieldId: 'demo-email-error',
  },
};

export const Formularbindung: Story = {
  name: 'Formularbindung',
  parameters: {
    controls: { disable: true },
    // Getippter/fokussierter Endzustand → nicht deterministisch snapshotten.
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Das Feld ist ein `ControlValueAccessor` und bindet direkt an reactive ' +
          'forms (`formControl`) — genau so wird die Komponentenbibliothek in echten ' +
          'Angular-Projekten konsumiert. Der Wert lässt sich damit auslesen (hier live ' +
          'angezeigt) und validieren. Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: { imports: [TextFieldComponent, ReactiveFormsModule] },
      props: { ctrl },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-text-field
            label="E-Mail"
            type="email"
            placeholder="name@firma.de"
            fieldId="demo-email-form"
            [formControl]="ctrl"
          ></cds-text-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">
            Wert: <strong>{{ ctrl.value || '—' }}</strong>
          </p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByLabelText(/E-Mail/);
    await expect(canvasElement).toHaveTextContent('Wert: —');
    // Tippen → CVA schreibt in den FormControl, Anzeige liest den Wert aus.
    await userEvent.type(input, 'maria@firma.de');
    await expect(input).toHaveValue('maria@firma.de');
    await expect(canvasElement).toHaveTextContent('Wert: maria@firma.de');
  },
};
