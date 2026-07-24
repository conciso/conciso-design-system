import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { ComboboxComponent } from '@conciso/design-system-angular';

const THEMEN = [
  { value: 'ki', label: 'Angewandte KI' },
  { value: 'es', label: 'Effektive Software' },
  { value: 'wo', label: 'Wirksame Organisationen' },
  { value: 'strategie', label: 'Strategie-Workshop' },
  { value: 'daten', label: 'Datenanalyse & Reporting' },
  { value: 'auto', label: 'Prozessautomatisierung' },
  { value: 'cloud', label: 'Cloud-Migration' },
  { value: 'change', label: 'Change-Begleitung' },
  { value: 'training', label: 'Schulung & Training' },
  { value: 'presse', label: 'Presse & Medien' },
];

const INTERESSEN = [
  { value: 'ki', label: 'Künstliche Intelligenz' },
  { value: 'rag', label: 'LLM & RAG' },
  { value: 'ds', label: 'Design Systems' },
  { value: 'cloud', label: 'Cloud & DevOps' },
  { value: 'scrum', label: 'Agile & Scrum' },
  { value: 'okr', label: 'OKR & Strategie' },
  { value: 'change', label: 'Change-Management' },
  { value: 'ux', label: 'UX & Forschung' },
];

const meta: Meta<ComboboxComponent> = {
  title: 'Molecules/Combobox',
  component: ComboboxComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wie der Custom Select, aber mit Tipp-Filter im Feld — für lange Listen. Substring-' +
          'Filter (case-insensitiv), Leerzustand bei keinem Treffer, Lösch-Button bei Texteingabe. ' +
          'Mit `multi` als Mehrfachauswahl: gewählte Werte werden zu entfernbaren Chips, Rücktaste ' +
          'bei leerem Feld entfernt den letzten. Input als role=combobox mit aria-autocomplete/' +
          '-activedescendant; Listbox mit role=listbox/option.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
    multi: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Thema',
    options: THEMEN,
    placeholder: 'Thema suchen…',
    emptyText: 'Kein Thema gefunden',
    area: 'es',
    multi: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<ComboboxComponent>;

export const Interaktiv: Story = {
  // Tippen filtert; Auswahl übernimmt das Label ins Feld.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    await userEvent.type(input, 'Cloud');
    await userEvent.click(await c.findByRole('option', { name: 'Cloud-Migration' }));
    await waitFor(() => expect(input).toHaveValue('Cloud-Migration'));
  },
};

export const MultiSelect: Story = {
  name: 'Multi-Select',
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: ['ki', 'ds', 'ux'],
  },
  // Statischer Ruhezustand (drei voreingestellte Chips, kein Fokus/Popup) — bewusst
  // OHNE play, damit der Visual-Snapshot deterministisch ist. Die Tipp-/Auswahl-
  // Interaktion prüft „Multi-Select · Hinzufügen" (dort snapshot-frei).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getAllByRole('button', { name: /Entfernen:/ })).toHaveLength(3);
  },
};

export const MultiSelectHinzufuegen: Story = {
  name: 'Multi-Select · Hinzufügen',
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: ['ki', 'ds'],
  },
  // Interaktionstest: startet mit zwei Chips, ein weiteres Interesse tippen + wählen → drei.
  // Vom Visual-Snapshot ausgenommen: der getippte/fokussierte Zwischenzustand ist nicht
  // pixel-deterministisch (Sub-Pixel-Antialiasing → ~2px Rauschen bei jedem Re-Baseline).
  parameters: { snapshot: { skip: true } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByRole('combobox'), 'UX');
    await userEvent.click(await c.findByRole('option', { name: 'UX & Forschung' }));
    await waitFor(() => expect(c.getAllByRole('button', { name: /Entfernen:/ })).toHaveLength(3));
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
          'Die Combobox ist ein `ControlValueAccessor` und bindet direkt an reactive ' +
          'forms (`formControl`); im Einzelmodus ist der Formularwert der Options-`value` ' +
          '(hier live angezeigt), im Multi-Modus ein `string[]`. Ohne Formular gehen ' +
          '`[(value)]` / `[(values)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: { imports: [ComboboxComponent, ReactiveFormsModule] },
      props: { ctrl, options: THEMEN },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-combobox label="Thema" [options]="options" [formControl]="ctrl"></cds-combobox>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '—' }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    await userEvent.type(input, 'Cloud');
    await userEvent.click(await c.findByRole('option', { name: 'Cloud-Migration' }));
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: cloud'));
  },
};
