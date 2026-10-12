import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
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
  title: 'Komponenten/Dropdowns/Combobox',
  component: ComboboxComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5495',
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wie der Custom Select, aber mit Tipp-Filter im Feld, für lange Listen. Substring-' +
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

export const Tastatur: Story = {
  name: 'Tastatur',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: [],
  },
  // Reine Tastatur, keine Klicks auf Optionen: ArrowDown/ArrowUp öffnen BEIDE das
  // geschlossene Menü (vorher nur ArrowDown), Home/End springen auf die erste/letzte
  // gefilterte Option, Enter wählt, Escape schließt und leert im Multi-Modus den
  // stehen gebliebenen Filtertext (vorher blieb er stehen).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');

    // Fokus öffnet automatisch ((focus)="openMenu()") — für den eigentlichen
    // Test erst wieder schließen.
    await userEvent.click(input);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    // ArrowDown öffnet das geschlossene Menü (Referenzverhalten, unverändert).
    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    // ArrowUp öffnet das geschlossene Menü genauso (der eigentliche Fix).
    await userEvent.keyboard('{ArrowUp}');
    await expect(input).toHaveAttribute('aria-expanded', 'true');

    // Home/End auf der (noch ungefilterten) Optionsliste.
    const options = c.getAllByRole('option');
    await userEvent.keyboard('{End}');
    await expect(input).toHaveAttribute('aria-activedescendant', options[options.length - 1].id);
    await userEvent.keyboard('{Home}');
    await expect(input).toHaveAttribute('aria-activedescendant', options[0].id);

    // Enter wählt die aktive (erste) Option → Chip „Künstliche Intelligenz“.
    await userEvent.keyboard('{Enter}');
    await expect(c.getAllByRole('button', { name: / entfernen$/ })).toHaveLength(1);

    // Filtertext ohne Auswahl tippen, dann Escape: schließt UND leert das Feld.
    await userEvent.type(input, 'Cloud');
    await expect(input).toHaveValue('Cloud');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveValue('');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
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
  // Interaktion prüft „Multi-Select · Hinzufügen“ (dort snapshot-frei).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getAllByRole('button', { name: / entfernen$/ })).toHaveLength(3);
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
    await waitFor(() => expect(c.getAllByRole('button', { name: / entfernen$/ })).toHaveLength(3));
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
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
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

export const ChipEntfernen: Story = {
  name: 'Multi-Select · Chip entfernen',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: ['ki', 'ds'],
  },
  // Das Label nennt die Option („<Label> entfernen“), nach dem Entfernen steht der Fokus
  // wieder im Eingabefeld statt auf dem verschwundenen Button.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: 'Design Systems entfernen' }));
    await expect(c.queryByRole('button', { name: 'Design Systems entfernen' })).toBeNull();
    await expect(c.getAllByRole('button', { name: / entfernen$/ })).toHaveLength(1);
    await expect(c.getByRole('combobox')).toHaveFocus();
  },
};

export const EinzelauswahlLoeschen: Story = {
  name: 'Einzelauswahl · Eingabe löschen hebt Auswahl auf',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  render: () => {
    const ctrl = new FormControl('cloud');
    return {
      moduleMetadata: { imports: [ComboboxComponent, ReactiveFormsModule] },
      props: { ctrl, options: THEMEN },
      template: `
        <cds-combobox label="Thema" [options]="options" [formControl]="ctrl"></cds-combobox>
        <p data-testid="wert">Wert: {{ ctrl.value || '(leer)' }}</p>
      `,
    };
  },
  // Der Lösch-Button leert nicht nur den Text, sondern hebt die Auswahl auf: Auch nach
  // dem Schließen bleibt das Feld leer, der Formularwert ist geleert.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    await expect(input).toHaveValue('Cloud-Migration');
    await userEvent.click(c.getByRole('button', { name: 'Eingabe löschen' }));
    await expect(input).toHaveFocus();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveValue('');
    await expect(canvasElement).toHaveTextContent('Wert: (leer)');
  },
};

export const MenueAttribute: Story = {
  name: 'Menü · Mehrfachauswahl und Leerzustand',
  parameters: {
    snapshot: { skip: true },
    controls: { disable: true },
  },
  render: () => ({
    moduleMetadata: { imports: [ComboboxComponent] },
    props: { options: INTERESSEN, themen: THEMEN },
    template: `
      <div data-testid="multi"><cds-combobox label="Interessen" [options]="options" [multi]="true"></cds-combobox></div>
      <div data-testid="einzel"><cds-combobox label="Thema" [options]="themen"></cds-combobox></div>
    `,
  }),
  // Die Mehrfachauswahl-Listbox trägt aria-multiselectable, die Einzelauswahl nicht.
  // Der Leerzustand ist eine Statusmeldung (role=status) außerhalb der Listbox mit dem Vorgabetext „Keine Treffer“.
  play: async ({ canvasElement }) => {
    const multi = within(within(canvasElement).getByTestId('multi'));
    const einzel = within(within(canvasElement).getByTestId('einzel'));
    await expect(multi.getByRole('listbox', { hidden: true })).toHaveAttribute(
      'aria-multiselectable',
      'true',
    );
    await expect(einzel.getByRole('listbox', { hidden: true })).not.toHaveAttribute(
      'aria-multiselectable',
    );

    // Die Live-Region steht vor dem Filtern leer im DOM, damit der Wechsel angesagt wird.
    const leer = multi.getByRole('status');
    await expect(leer).toBeEmptyDOMElement();
    await userEvent.type(multi.getByRole('combobox'), 'zzz');
    await expect(leer).toHaveTextContent('Keine Treffer');
    const panel = within(canvasElement).getByTestId('multi').querySelector('.ep-combobox-empty');
    await expect(panel?.closest('.ep-combobox-menu')).toHaveAttribute('aria-hidden', 'true');
    // Die Meldung ist keine Option und steht außerhalb der Listbox; die leere Listbox ist ausgeblendet.
    await expect(leer.closest('[role="listbox"]')).toBeNull();
    await expect(multi.queryByRole('listbox')).toBeNull();
    await expect(multi.queryAllByRole('option')).toHaveLength(0);
  },
};

export const ChevronUmschalten: Story = {
  name: 'Chevron schaltet das Menü um',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Ein Klick auf den Chevron schließt ein offenes und öffnet ein geschlossenes Menü.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    const chevron = canvasElement.querySelector<HTMLElement>('.ep-select-caret');
    if (!chevron) throw new Error('Chevron fehlt.');

    await userEvent.click(chevron);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(chevron);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(chevron);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
  },
};

export const IconStrichstaerke: Story = {
  name: 'Icon-Strichstärke',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Pinnt die Strichstärke der Chrome-Icons (Lucide, ADR-0016): bisher Heroicons-Outline mit
  // 1.5 (= --icon-stroke-md), Lucide-Default wäre 2. Die Komponente setzt CDS_ICON_STROKE
  // explizit; hier wird der WIRKSAME (berechnete) Wert geprüft, damit auch eine CSS-Regel,
  // die das Attribut überschreibt, auffiele. Dekorative Icons bleiben aria-hidden.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const caret = canvasElement.querySelector('svg.ep-select-caret') as SVGElement;
    await expect(caret).toHaveAttribute('aria-hidden', 'true');
    await expect(parseFloat(getComputedStyle(caret).strokeWidth)).toBe(1.5);

    await userEvent.type(c.getByRole('combobox'), 'Cloud');
    const clear = await c.findByRole('button', { name: 'Eingabe löschen' });
    const x = clear.querySelector('svg') as SVGElement;
    await expect(x).toHaveAttribute('aria-hidden', 'true');
    await expect(parseFloat(getComputedStyle(x).strokeWidth)).toBe(1.5);
  },
};
