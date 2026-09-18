import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, expect } from 'storybook/test';
import { SectionComponent } from '@conciso/design-system-angular';

const meta: Meta<SectionComponent> = {
  title: 'Komponenten/Sektion/Sektion',
  component: SectionComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Strukturelles Grundgerüst einer Seiten-Sektion: `.ep-section` mit dem optionalen ' +
          'Kopf-Trio aus Kicker (`label`), Überschrift (`heading`) und Lead (`sub`). Alle drei ' +
          'sind Beiwerk, eine Sektion besteht auch nur aus ihrem projizierten Inhalt. Die ' +
          'Hintergrundfläche einer Sektion ist eine Seiten-Entscheidung (Flächen-Rhythmus ' +
          'zwischen Nachbar-Sektionen) und deshalb kein Input dieser Komponente: Sie gehört ' +
          'einem umschließenden Element, nicht dem `cds-section`-Host selbst (der ohne eigene ' +
          'CSS-Regel `display:inline` bleibt und seinen Hintergrund nicht über ein ' +
          'Block-Kind hinweg malt).',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
  },
  args: {
    label: 'Was wir tun',
    heading: 'Drei Bereiche. Ein Maßstab.',
    sub: 'Sie stärken sich gegenseitig. Wir denken sie zusammen, nicht nebeneinander.',
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<SectionComponent>;

const bodyStyle = 'font:var(--ty-body-md);color:var(--tx-secondary);margin:0';

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-section [label]="label" [heading]="heading" [sub]="sub" [area]="area">
        <p style="${bodyStyle}">Beliebiger Inhalt unterhalb des Kopfes, hier ein einfacher Absatz als Platzhalter.</p>
      </cds-section>
    `,
  }),
  // Entscheidung 1 gepinnt: Mit gesetzter Überschrift bekommt die Sektion eine echte
  // region-Landmark, deren zugänglicher Name (via aria-labelledby) der gerenderten
  // .ep-section-h2 entspricht.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const region = c.getByRole('region', { name: 'Drei Bereiche. Ein Maßstab.' });
    await expect(region.tagName).toBe('SECTION');
  },
};

export const OhneKopf: Story = {
  name: 'Ohne Kopf',
  parameters: { controls: { disable: true } },
  // Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt — ohne
  // heading/labelledBy bekommt sie dabei bewusst kein <section> (siehe Entscheidung 1
  // in der Klassendoku), sondern ein namenloses <div>.
  render: () => ({
    template: `
      <cds-section>
        <p style="${bodyStyle}">Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.</p>
      </cds-section>
    `,
  }),
  // Entscheidung 1 gepinnt (Gegenprobe): ohne Namen keine region-Landmark, der
  // projizierte Inhalt ist trotzdem da.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.queryByRole('region')).toBeNull();
    await expect(
      c.getByText('Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.'),
    ).toBeInTheDocument();
  },
};

export const BenanntVonAussen: Story = {
  name: 'Benannt von außen',
  parameters: { controls: { disable: true } },
  // Ohne eigene Überschrift kommt der zugängliche Name über labelledBy von einer
  // Überschrift AUSSERHALB der Komponente (siehe Entscheidung 1 in der Klassendoku).
  render: () => ({
    template: `
      <h2 id="story-section-externe-ueberschrift" style="font:var(--ty-headline-md);margin:0 0 var(--s4)">Externe Überschrift oberhalb der Sektion</h2>
      <cds-section labelledBy="story-section-externe-ueberschrift">
        <p style="${bodyStyle}">Kein eigener Kopf, der zugängliche Name kommt von der Überschrift darüber.</p>
      </cds-section>
    `,
  }),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const region = c.getByRole('region', { name: 'Externe Überschrift oberhalb der Sektion' });
    await expect(region.tagName).toBe('SECTION');
  },
};

export const NurUeberschrift: Story = {
  name: 'Nur Überschrift',
  parameters: { controls: { disable: true } },
  args: { label: '', sub: '', area: undefined },
  render: (args) => ({
    props: args,
    template: `
      <cds-section [heading]="heading">
        <p style="${bodyStyle}">Kicker und Lead bleiben hier leer, nur die Überschrift ist gesetzt.</p>
      </cds-section>
    `,
  }),
};

export const BereichsgefaerbtesLabel: Story = {
  name: 'Bereichsgefärbtes Label',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-section label="Corporate" area="co" heading="Marke &amp; Haltung"></cds-section>
        <cds-section label="AI.Applied" area="ki" heading="Angewandte KI"></cds-section>
        <cds-section label="Effektive Software" area="es" heading="Schlanke Systeme"></cds-section>
        <cds-section label="Wirksame Organisationen" area="wo" heading="Starke Teams"></cds-section>
      </div>
    `,
  }),
};
