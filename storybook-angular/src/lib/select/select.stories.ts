import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { SelectComponent } from './select.component';

const AREAS = [
  { value: 'co', label: 'Corporate' },
  { value: 'ki', label: 'Angewandte KI' },
  { value: 'es', label: 'Effektive Software' },
  { value: 'wo', label: 'Wirksame Organisationen' },
];

const meta: Meta<SelectComponent> = {
  title: 'Molecules/Custom Select',
  component: SelectComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Gestylte Einzelauswahl mit Listbox-Popup, Häkchen und Bereichs-Akzent — für Fälle, ' +
          'in denen das native Select optisch zum Bereich gehören soll. Volle Tastatur (↑↓, ' +
          'Pos1/Ende, Type-ahead, Enter wählt, Esc schließt) und WCAG-AA-Verdrahtung ' +
          '(role=listbox/option, aria-haspopup/-expanded/-activedescendant). Für kurze Listen ' +
          'in Formularen bleibt das native Auswahlfeld der Standard.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Bereich',
    options: AREAS,
    placeholder: 'Bitte wählen…',
    area: undefined,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<SelectComponent>;

export const Interaktiv: Story = {
  // Öffnen und eine Option wählen; der Trigger zeigt danach das Label.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button'));
    await userEvent.click(c.getByRole('option', { name: 'Effektive Software' }));
    await waitFor(() => expect(c.getByRole('button')).toHaveTextContent('Effektive Software'));
  },
};

export const Geoeffnet: Story = {
  name: 'Geöffnet · vorausgewählt',
  args: { label: 'Anwendungsfall', area: 'ki', value: 'ki' },
  parameters: { controls: { disable: true } },
  // Menü offen lassen → zeigt Listbox mit Häkchen auf der gewählten Option.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button'));
    await waitFor(() => expect(c.getByRole('listbox')).toBeVisible());
  },
};

export const Deaktiviert: Story = {
  args: { label: 'Bereich', value: 'co', disabled: true },
  parameters: { controls: { disable: true } },
};

export const Formularbindung: Story = {
  name: 'Formularbindung',
  parameters: {
    controls: { disable: true },
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Der Custom Select ist ein `ControlValueAccessor` und bindet direkt an ' +
          'reactive forms (`formControl`); der Formularwert ist der Options-`value` ' +
          '(hier live angezeigt). Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: { imports: [SelectComponent, ReactiveFormsModule] },
      props: { ctrl, options: AREAS },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-select label="Bereich" [options]="options" [formControl]="ctrl"></cds-select>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '—' }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Wert: —');
    await userEvent.click(c.getByRole('button'));
    await userEvent.click(c.getByRole('option', { name: 'Effektive Software' }));
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: es'));
  },
};
