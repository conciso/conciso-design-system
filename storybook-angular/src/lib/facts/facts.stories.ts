import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { FactsComponent } from '@conciso/design-system-angular';

const meta: Meta<FactsComponent> = {
  title: 'Seitenmuster/Seminar · Training/Fakten-Liste',
  component: FactsComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Definitionsliste für die Rahmendaten eines Angebots (Termin, Dauer, Ort, Preis) — ' +
          '`.ep-facts` (css/components.css:1261–1272), einspaltig mit Haarlinie zwischen den Paaren ' +
          'oder als `.is-grid` zweispaltig für Kästen, die neben Inhalt stehen. Bringt bewusst ' +
          'keinen eigenen Rahmen mit, sie zieht in einen vorhandenen Container ein (Angebots-Box, ' +
          'Sticky-Sidebar). Element-Selektor `cds-facts` (ADR-0008-Standardfall): analog zu ' +
          '`cds-faq` trägt die INNERE `<dl class="ep-facts">` die CSS-Klasse, nicht der Host — die ' +
          'Semantik einer Definitionsliste hängt am `<dl>`-Tag selbst, ein Custom-Element kann es ' +
          'nicht annehmen. Jedes Paar rendert als `<div><dt>…</dt><dd>…</dd></div>`, weil ' +
          '`.ep-facts > div + div` den Trenner ab dem zweiten Paar über den direkten `<div>`-' +
          'Nachfahren setzt. `area` färbt `.t-{area}` auf jedes `<dt>` — über die Ticket-Skizze ' +
          'hinaus ergänzt, weil alle 3 realen `.ep-facts`-Vorkommen im Mockup diese Tönung ' +
          'einheitlich einsetzen (siehe Klassendoku und Ticket-Bericht).',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
  },
  args: {
    // Wortlaut aus dem Mockup (docs/index.html:9077–9081, Doku-Sektion gt-seminar-fakten).
    items: [
      { term: 'Dauer', value: '2 Tage, 9–17 Uhr' },
      { term: 'Format', value: 'Präsenz & Online' },
      { term: 'Gruppe', value: 'max. 12 Personen' },
      { term: 'Sprache', value: 'Deutsch' },
    ],
    grid: false,
    area: 'wo',
  },
};
export default meta;

type Story = StoryObj<FactsComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `<cds-facts [items]="items" [grid]="grid" [area]="area"></cds-facts>`,
  }),
  // Akzeptanzkriterium: <dl>/<div>/<dt>/<dd>-Verschachtelung exakt wie vom CSS
  // erwartet. Trenner ab dem zweiten Paar (.ep-facts > div + div,
  // css/components.css:1262): erstes Paar ohne oberen Rand, ab dem zweiten mit.
  play: async ({ canvasElement }) => {
    const dl = canvasElement.querySelector('dl') as HTMLElement;
    await expect(dl).toHaveClass('ep-facts');
    await expect(dl).not.toHaveClass('is-grid');

    const pairs = Array.from(dl.children) as HTMLElement[];
    await expect(pairs).toHaveLength(4);
    for (const pair of pairs) {
      await expect(pair.tagName).toBe('DIV');
      await expect(pair.children).toHaveLength(2);
      await expect(pair.children[0].tagName).toBe('DT');
      await expect(pair.children[1].tagName).toBe('DD');
    }

    const dts = dl.querySelectorAll('dt');
    await expect(dts[0]).toHaveTextContent('Dauer');
    await expect(dts[0]).toHaveClass('t-wo');
    const dds = dl.querySelectorAll('dd');
    await expect(dds[0]).toHaveTextContent('2 Tage, 9–17 Uhr');

    await expect(getComputedStyle(pairs[0]).borderTopWidth).toBe('0px');
    await expect(getComputedStyle(pairs[1]).borderTopWidth).not.toBe('0px');
  },
};

export const AlsRaster: Story = {
  name: 'Als Raster',
  args: { grid: true },
  parameters: { controls: { disable: true } },
  // Wie im Mockup zieht die Liste in einen vorhandenen Kasten ein (docs/index.html:
  // 16289–16300); die max-width sitzt deshalb am umschließenden <div>, nicht am
  // cds-facts-Host — ein Custom-Element ohne eigenes display ist per UA-Stylesheet
  // inline, `max-width` griffe dort nicht (derselbe Grund wie ADR-0008 Fall 2).
  render: (args) => ({
    props: args,
    template: `
      <div style="background:var(--bg-surface);border:var(--bd-strong);border-radius:var(--r-lg);padding:var(--s6);max-width:420px">
        <cds-facts [items]="items" [grid]="grid" [area]="area"></cds-facts>
      </div>
    `,
  }),
  // is-grid schaltet die Rasterung: zweispaltig ohne Haarlinien zwischen den
  // Paaren (css/components.css:1271–1272), auto-fit legt bei 420 px Kastenbreite
  // zwei Spalten an (2×140px + 20px Gap = 300px, drei Spalten passen mit 460px
  // nicht mehr).
  play: async ({ canvasElement }) => {
    const dl = canvasElement.querySelector('dl') as HTMLElement;
    await expect(dl).toHaveClass('is-grid');
    await expect(getComputedStyle(dl).display).toBe('grid');

    const pairs = Array.from(dl.children) as HTMLElement[];
    await expect(getComputedStyle(pairs[1]).borderTopWidth).toBe('0px');

    const firstRect = pairs[0].getBoundingClientRect();
    const secondRect = pairs[1].getBoundingClientRect();
    await expect(secondRect.top).toBe(firstRect.top);
  },
};
