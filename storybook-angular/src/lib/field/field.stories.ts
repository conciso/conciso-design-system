import type { Meta, StoryObj } from '@storybook/angular';
import { FieldComponent } from './field.component';

const meta: Meta<FieldComponent> = {
  title: 'Komponenten/Eingaben & Formulare/Field',
  component: FieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Formularfeld für Inputs & Forms: verbindet Label, Steuerelement ' +
          '(Text, Textarea oder Select), Hilfetext und Fehlermeldung zu einer ' +
          'zusammenhängenden Einheit. Pflichtfelder werden markiert; im Fehlerzustand ' +
          'wird eine Meldung ausgegeben. Durchgängig WCAG AA.',
      },
    },
  },
  argTypes: {
    control: { control: 'inline-radio', options: ['input', 'textarea', 'select'] },
    required: { control: 'boolean' },
  },
  args: {
    label: 'E-Mail',
    control: 'input',
    type: 'email',
    placeholder: 'name@firma.de',
    helper: 'Wir nutzen die Adresse ausschließlich für die Antwort.',
    error: '',
    required: true,
    fieldId: 'demo-email',
  },
};
export default meta;

type Story = StoryObj<FieldComponent>;

export const Interaktiv: Story = {};

export const Fehlerzustand: Story = {
  args: {
    label: 'E-Mail',
    error: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    fieldId: 'demo-email-error',
  },
};

export const Steuerelemente: Story = {
  name: 'Alle Steuerelemente',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [FieldComponent] },
    template: `
      <div style="display:grid;gap:24px;max-width:420px">
        <cds-field fieldId="f-input" label="Name" control="input" type="text"
          placeholder="Vor- und Nachname" [required]="true"
          helper="Wie sollen wir Sie ansprechen?"></cds-field>
        <cds-field fieldId="f-select" label="Bereich" control="select"
          [options]="['Bitte wählen','Corporate','AI.Applied','Eff. Software']"
          helper="Worum geht es?"></cds-field>
        <cds-field fieldId="f-textarea" label="Nachricht" control="textarea"
          placeholder="Ihre Nachricht an uns" helper="Mind. 20 Zeichen."></cds-field>
      </div>
    `,
  }),
};
