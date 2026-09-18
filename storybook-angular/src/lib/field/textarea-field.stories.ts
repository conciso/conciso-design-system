import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { TextareaFieldComponent } from '@conciso/design-system-angular';

const meta: Meta<TextareaFieldComponent> = {
  title: 'Komponenten/Inputs & Forms/Textbereich',
  component: TextareaFieldComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Mehrzeiliges Textfeld für längere Eingaben (z. B. Nachrichten): Label, Textbereich, ' +
          'Hilfetext und Fehlermeldung als zusammenhängende Einheit. Pflichtfelder werden ' +
          'markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.',
      },
    },
  },
  argTypes: {
    required: { control: 'boolean' },
  },
  args: {
    label: 'Nachricht',
    placeholder: 'Ihre Nachricht an uns',
    helper: 'Mind. 20 Zeichen.',
    error: '',
    required: false,
    fieldId: 'demo-message',
  },
};
export default meta;

type Story = StoryObj<TextareaFieldComponent>;

export const Interaktiv: Story = {};

export const Deaktiviert: Story = {
  args: { fieldId: 'demo-message-disabled', disabled: true },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByLabelText(/Nachricht/)).toBeDisabled();
  },
};

export const Formularbindung: Story = {
  name: 'Formularbindung',
  parameters: {
    controls: { disable: true },
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Der Textbereich ist ein `ControlValueAccessor` (via FieldBase) und bindet ' +
          'direkt an reactive forms (`formControl`) — der Wert lässt sich so auslesen ' +
          '(hier die Zeichenzahl) und validieren. Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: { imports: [TextareaFieldComponent, ReactiveFormsModule] },
      props: { ctrl },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-textarea-field
            label="Nachricht"
            placeholder="Ihre Nachricht an uns"
            fieldId="form-message"
            [formControl]="ctrl"
          ></cds-textarea-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Zeichen: <strong>{{ ctrl.value?.length || 0 }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Zeichen: 0');
    await userEvent.type(c.getByLabelText(/Nachricht/), 'Hallo');
    await waitFor(() => expect(canvasElement).toHaveTextContent('Zeichen: 5'));
  },
};
