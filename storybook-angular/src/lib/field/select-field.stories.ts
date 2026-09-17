import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { SelectFieldComponent } from '@conciso/design-system-angular';

const meta: Meta<SelectFieldComponent> = {
  title: 'Molecules/Auswahlfeld',
  component: SelectFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Auswahlfeld (Dropdown): Label, Select, Hilfetext und Fehlermeldung als ' +
          'zusammenhängende Einheit. Die erste Option dient üblicherweise als Platzhalter. ' +
          'Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.',
      },
    },
  },
  argTypes: {
    required: { control: 'boolean' },
  },
  args: {
    label: 'Bereich',
    options: ['Bitte wählen', 'Corporate', 'AI.Applied', 'Eff. Software'],
    helper: 'Worum geht es?',
    error: '',
    required: false,
    fieldId: 'demo-area',
  },
};
export default meta;

type Story = StoryObj<SelectFieldComponent>;

export const Interaktiv: Story = {};

export const Deaktiviert: Story = {
  args: { fieldId: 'demo-area-disabled', disabled: true },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByLabelText(/Bereich/)).toBeDisabled();
  },
};

export const LeereOptionsliste: Story = {
  name: 'Leere Optionsliste',
  args: { fieldId: 'demo-area-empty', options: [] },
  parameters: { controls: { disable: true } },
  // Randfall: keine Optionen → das native <select> bleibt leer, rendert aber ohne
  // Fehler und bleibt fokussierbar.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const select = c.getByLabelText(/Bereich/) as HTMLSelectElement;
    await expect(select.options).toHaveLength(0);
    select.focus();
    await expect(select).toHaveFocus();
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
          'Das Auswahlfeld ist ein `ControlValueAccessor` (via FieldBase) und bindet ' +
          'direkt an reactive forms (`formControl`); der Formularwert ist der Options-' +
          'Text (hier live angezeigt). Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: { imports: [SelectFieldComponent, ReactiveFormsModule] },
      props: { ctrl, options: ['Bitte wählen', 'Corporate', 'AI.Applied', 'Eff. Software'] },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-select-field
            label="Bereich"
            [options]="options"
            fieldId="form-area"
            [formControl]="ctrl"
          ></cds-select-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '—' }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.selectOptions(c.getByLabelText(/Bereich/), 'Corporate');
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: Corporate'));
  },
};
