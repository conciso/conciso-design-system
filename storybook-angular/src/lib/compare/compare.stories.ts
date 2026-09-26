import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { CompareComponent } from '@conciso/design-system-angular';

const meta: Meta<CompareComponent> = {
  title: 'Komponenten/Tabelle/Vergleichstabelle',
  component: CompareComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Aufklappbare Vergleichstabelle für den zeilenweisen Direktvergleich mehrerer ' +
          'Pakete/Tarife (`.ep-compare*`, css/components.css:1275–1294). Natives ' +
          '`<details>`/`<summary>` (standardmäßig zu), Tastaturbedienung und Toggle kommen vom ' +
          'Browser. **Mit Daten-Input, anders als `Komponenten/Tabelle/Tabelle` (`cds-table`)**: ' +
          'ausgezählt sind alle 22 Datenzellen des einzigen realen Vorkommens ' +
          '(`docs/index.html:11970–12038`, 11 Zeilen × 2 Spalten) entweder ein Ja/Nein-Marker ' +
          '(18×) oder eine kurze Angabe (4×), nie ein Badge oder Link, deshalb `columns`/`rows` ' +
          'statt `<ng-content>`. Ja/Nein-Zellen ' +
          '(`boolean`) tragen fest verdrahteten `.sr-only`-Text („Enthalten“/„Nicht enthalten“), ' +
          'Text-Zellen (`string`) rendern die Angabe unverändert. Die empfohlene Spalte wird über ' +
          '`columns[].pro` als `.ep-compare-pro` hervorgehoben (in `thead` UND `tbody`). ' +
          '`caption` ist Pflicht (`.sr-only`, wie in `tabelle.mdx` dokumentiert), `rowsLabel` ' +
          "(erste Kopfzelle) ist Beiwerk mit Default `''` — beide Abweichungen von der " +
          'Ticket-Skizze sind in der Klassendoku begründet.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<CompareComponent>;

// Wortlaut und Datensatz 1:1 aus dem Mockup (docs/index.html:11970–12038, Beispielseite
// Angewandte KI · AI.Box, Abschnitt „Leistungspakete“) — 11 Zeilen, ausgezählt: 7 beidseitig
// „Ja“, 4 nur in der Pro-Spalte, 2 mit Text-Zellen statt Ja/Nein.
const columns = [{ label: 'Core' }, { label: 'Pro', pro: true }];
const rows = [
  { label: 'Hosting in Deutschland', cells: [true, true] },
  { label: 'SSO, Nutzer- und Rechtemanagement', cells: [true, true] },
  { label: 'Lokale Modelle', cells: ['bis 24 Mrd. Param.', 'bis 70 Mrd. Param.'] },
  { label: 'OpenAI-Modelle über API-Key', cells: [true, true] },
  { label: 'Chatbots mit Modellvergleich', cells: [true, true] },
  { label: 'Websuche', cells: [true, true] },
  { label: 'LLM-Gateway für externe Cloud-Modelle', cells: [false, true] },
  { label: 'Eigene KI-Assistenten', cells: [false, true] },
  { label: 'Memory: Wissen über Chats hinweg', cells: [false, true] },
  { label: 'Anbindung an Confluence und SharePoint', cells: [false, true] },
  { label: 'Support pro Monat', cells: ['30 Min.', '2,5 Std.'] },
];

export const Interaktiv: Story = {
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: false,
    columns,
    rows,
    toggled: fn(),
  },
  // Akzeptanzkriterien: Klick auf <summary> klappt auf und feuert toggled mit true, das Caret
  // dreht über [open], die pro-Spalte ist in thead und tbody markiert, Ja/Nein-Zellen haben
  // einen Textwert.
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const details = canvasElement.querySelector('details.ep-compare') as HTMLDetailsElement;
    const caret = canvasElement.querySelector('.ep-compare-caret') as SVGElement;

    // Standardmäßig zu, Caret ungedreht.
    await expect(details).not.toHaveAttribute('open');
    await expect(details.open).toBe(false);
    await expect(getComputedStyle(caret).transform).toBe('none');

    // Klick auf <summary> klappt auf.
    const summary = c.getByText('Alle Funktionen vergleichen');
    await userEvent.click(summary);
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    await expect(args.toggled).toHaveBeenCalledTimes(1);
    await expect(args.toggled).toHaveBeenCalledWith(true);
    // Caret dreht über [open] (css/components.css:1281) — gemessen, nicht angenommen.
    await expect(getComputedStyle(caret).transform).not.toBe('none');

    // Ein zweiter, vom Toggle unabhängiger Interaktionsschritt (Fokus auf die Tabelle) löst eine
    // weitere Change-Detection aus; die Tabelle bleibt offen (siehe Klassendoku zu `open`).
    const table = canvasElement.querySelector('table.ep-compare-table') as HTMLElement;
    table.focus();
    await expect(details).toHaveAttribute('open');

    // pro-Spalte in thead UND tbody markiert.
    const headPro = canvasElement.querySelectorAll('thead th.ep-compare-pro');
    await expect(headPro).toHaveLength(1);
    await expect(headPro[0]).toHaveTextContent('Pro');
    const bodyPro = canvasElement.querySelectorAll('tbody td.ep-compare-pro');
    await expect(bodyPro).toHaveLength(rows.length);

    // Ja/Nein-Zellen haben einen für Screenreader lesbaren Textwert, nicht nur die Glyphe.
    const firstRowCells = canvasElement.querySelectorAll('tbody tr:first-child td');
    for (const cell of Array.from(firstRowCells)) {
      await expect(cell.querySelector('.ep-compare-yes')).toHaveTextContent('✓');
      await expect(cell).toHaveTextContent('Enthalten');
    }
    const noCell = canvasElement.querySelector('.ep-compare-no') as HTMLElement;
    await expect(noCell.parentElement).toHaveTextContent('Nicht enthalten');
  },
};

export const BereitsOffen: Story = {
  name: 'Bereits offen',
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: true,
    columns,
    rows,
  },
  parameters: { controls: { disable: true } },
  // open=true ist reiner Anfangszustand (siehe Klassendoku): schon beim ersten Rendern offen,
  // ohne Klick.
  play: async ({ canvasElement }) => {
    const details = canvasElement.querySelector('details.ep-compare') as HTMLDetailsElement;
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    const wrap = canvasElement.querySelector('.ep-compare-table-wrap') as HTMLElement;
    await expect(wrap.offsetHeight).toBeGreaterThan(0);
  },
};

// Zwei Zeilen mit Text-Zellen statt Ja/Nein (Mockup: „Lokale Modelle“, „Support pro Monat“) —
// belegt, dass string-Zellen unverändert als Text rendern, ohne Ja/Nein-Glyphe.
export const MitTextZellen: Story = {
  name: 'Mit Text-Zellen',
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: true,
    columns,
    rows: [
      { label: 'Hosting in Deutschland', cells: [true, true] },
      { label: 'Lokale Modelle', cells: ['bis 24 Mrd. Param.', 'bis 70 Mrd. Param.'] },
      { label: 'Support pro Monat', cells: ['30 Min.', '2,5 Std.'] },
    ],
  },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const modelleRow = c.getByText('Lokale Modelle').closest('tr') as HTMLElement;
    const cells = modelleRow.querySelectorAll('td');
    await expect(cells[0]).toHaveTextContent('bis 24 Mrd. Param.');
    await expect(cells[0].querySelector('.ep-compare-yes, .ep-compare-no')).toBeNull();
    await expect(cells[1]).toHaveTextContent('bis 70 Mrd. Param.');

    const supportRow = c.getByText('Support pro Monat').closest('tr') as HTMLElement;
    const supportCells = supportRow.querySelectorAll('td');
    await expect(supportCells[0]).toHaveTextContent('30 Min.');
    await expect(supportCells[1]).toHaveTextContent('2,5 Std.');
  },
};

// Fokus auf die hervorgehobene Spalte: Hintergrund und Kopfzeilen-Unterstreichung von
// .ep-compare-pro gemessen, nicht angenommen (css/components.css:1291–1292).
export const HervorgehobeneSpalte: Story = {
  name: 'Hervorgehobene Spalte',
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: true,
    columns,
    rows,
  },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const headCells = canvasElement.querySelectorAll('thead th');
    const coreHead = headCells[1] as HTMLElement;
    const proHead = headCells[2] as HTMLElement;
    await expect(proHead).toHaveClass('ep-compare-pro');
    await expect(getComputedStyle(proHead).color).not.toBe(getComputedStyle(coreHead).color);
    await expect(getComputedStyle(proHead).borderBottomWidth).not.toBe(
      getComputedStyle(coreHead).borderBottomWidth,
    );

    const firstRow = canvasElement.querySelector('tbody tr') as HTMLElement;
    const bodyCells = firstRow.querySelectorAll('td');
    const coreCell = bodyCells[0] as HTMLElement;
    const proCell = bodyCells[1] as HTMLElement;
    await expect(proCell).toHaveClass('ep-compare-pro');
    await expect(getComputedStyle(proCell).backgroundColor).not.toBe(
      getComputedStyle(coreCell).backgroundColor,
    );
  },
};
