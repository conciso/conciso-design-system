import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { RadioGroupComponent } from '@conciso/design-system-angular';

const meta: Meta<RadioGroupComponent> = {
  title: 'Molecules/Radio',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Optionsfelder für 2–6 sich gegenseitig ausschließende Optionen (mehr → Auswahlfeld, ' +
          'Mehrfachauswahl → Checkbox). Native Radio-Buttons mit Bereichsfarbe (accent-color), ' +
          'gruppiert in fieldset/legend, sodass Screenreader Frage und Optionen als ' +
          'zusammengehörig ansagen. WCAG AA.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    legend: 'Bevorzugter Kontaktweg',
    options: ['E-Mail', 'Telefon', 'Beides'],
    value: 'E-Mail',
    required: false,
    disabled: false,
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<RadioGroupComponent>;

export const Interaktiv: Story = {};

export const Formularbindung: Story = {
  name: 'Formularbindung',
  parameters: {
    controls: { disable: true },
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Die Radio-Gruppe ist ein `ControlValueAccessor` und bindet direkt an ' +
          'reactive forms (`formControl`) — der Wert lässt sich so auslesen (hier live ' +
          'angezeigt) und validieren. Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl('E-Mail');
    return {
      moduleMetadata: { imports: [RadioGroupComponent, ReactiveFormsModule] },
      props: { ctrl, options: ['E-Mail', 'Telefon', 'Beides'] },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-radio-group legend="Bevorzugter Kontaktweg" [options]="options" [formControl]="ctrl"></cds-radio-group>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '—' }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Wert: E-Mail');
    await userEvent.click(c.getByRole('radio', { name: 'Telefon' }));
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: Telefon'));
  },
};
