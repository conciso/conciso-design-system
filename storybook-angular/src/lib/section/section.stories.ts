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
          'sind Beiwerk, eine Sektion besteht auch nur aus ihrem projizierten Inhalt. ' +
          'Attributselektor `[cdsSection]` statt eigenem Element: `<section cdsSection>` oder ' +
          '`<div cdsSection>` — der Konsument wählt das Tag und entscheidet damit, ob die ' +
          'Sektion überhaupt eine `<section>`-Landmark werden kann; die Komponente setzt nur ' +
          '`aria-labelledby`, wenn ein zugänglicher Name verfügbar ist. Die Hintergrundfläche ' +
          'einer Sektion ist eine Seiten-Entscheidung (Flächen-Rhythmus zwischen ' +
          'Nachbar-Sektionen) und deshalb kein Input dieser Komponente, sitzt aber direkt am ' +
          'Host: `<section cdsSection style="background:…">` — kein umschließendes Element ' +
          'mehr nötig (siehe „Fläche am Host“).',
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
      <section cdsSection [label]="label" [heading]="heading" [sub]="sub" [area]="area">
        <p style="${bodyStyle}">Beliebiger Inhalt unterhalb des Kopfes, hier ein einfacher Absatz als Platzhalter.</p>
      </section>
    `,
  }),
  // Entscheidung 1 gepinnt: Mit gesetzter Überschrift bekommt die Sektion eine echte
  // region-Landmark, deren zugänglicher Name (via aria-labelledby) der gerenderten
  // .ep-section-h2 entspricht. Das Tag selbst (<section>) hat hier der Konsument
  // gewählt, nicht die Komponente.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const region = c.getByRole('region', { name: 'Drei Bereiche. Ein Maßstab.' });
    await expect(region.tagName).toBe('SECTION');
  },
};

export const OhneKopf: Story = {
  name: 'Ohne Kopf',
  parameters: { controls: { disable: true } },
  // Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt. Hier
  // bewusst als <div cdsSection> geschrieben: ohne heading/labelledBy bekäme ein
  // <section> ohnehin keine Landmark-Rolle (Entscheidung 1 in der Klassendoku) — das
  // ist jetzt eine Entscheidung des Konsumenten am Tag, nicht mehr der Komponente.
  render: () => ({
    template: `
      <div cdsSection>
        <p style="${bodyStyle}">Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.</p>
      </div>
    `,
  }),
  // Entscheidung 1 gepinnt (Gegenprobe): kein aria-labelledby ohne Namen, der
  // projizierte Inhalt ist trotzdem da.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.queryByRole('region')).toBeNull();
    const host = canvasElement.querySelector('.ep-section');
    await expect(host).not.toHaveAttribute('aria-labelledby');
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
      <section cdsSection labelledBy="story-section-externe-ueberschrift">
        <p style="${bodyStyle}">Kein eigener Kopf, der zugängliche Name kommt von der Überschrift darüber.</p>
      </section>
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
      <section cdsSection [heading]="heading">
        <p style="${bodyStyle}">Kicker und Lead bleiben hier leer, nur die Überschrift ist gesetzt.</p>
      </section>
    `,
  }),
};

export const BereichsgefaerbtesLabel: Story = {
  name: 'Bereichsgefärbtes Label',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <section cdsSection label="Corporate" area="co" heading="Marke &amp; Haltung"></section>
        <section cdsSection label="AI.Applied" area="ki" heading="Angewandte KI"></section>
        <section cdsSection label="Effektive Software" area="es" heading="Schlanke Systeme"></section>
        <section cdsSection label="Wirksame Organisationen" area="wo" heading="Starke Teams"></section>
      </div>
    `,
  }),
};

export const FlaecheAmHost: Story = {
  name: 'Fläche am Host',
  parameters: { controls: { disable: true } },
  // Ging mit dem Element-Selektor nicht (siehe ADR-0008, „Fall 2“: ein background auf
  // dem <cds-section>-Host wurde computed korrekt gemeldet, aber nie gemalt — der Host
  // war ein unbekanntes Custom Element, display:inline, mit einem Block-Kind darin).
  // Mit dem Attributselektor IST das Element, das den Style trägt, dasselbe Element,
  // das .ep-section trägt: kein umschließendes <div> mehr nötig.
  render: () => ({
    template: `
      <section cdsSection heading="Getönte Fläche direkt am Host" style="background:var(--n-50);border-radius:var(--r-lg)">
        <p style="${bodyStyle}">Kein umschließendes Element mehr nötig: style sitzt direkt auf dem Element, das cdsSection trägt.</p>
      </section>
    `,
  }),
  // Kein Wrapper-Element mehr zwischen dem style-Attribut und .ep-section: beides
  // sitzt auf demselben Knoten. Ob die Fläche auch tatsächlich GEMALT wird (nicht nur
  // computed korrekt gemeldet, siehe ADR-0008 „Fall 2“), zeigt die Baseline-PNG dieser
  // Story — das ist der Punkt, an dem Computed Styles/getBoundingClientRect laut
  // Messung versagt hatten, ein Screenshot nicht.
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('section.ep-section') as HTMLElement;
    await expect(host).not.toBeNull();
    // style und .ep-section sitzen auf demselben Knoten, kein Wrapper mehr dazwischen.
    await expect(host.getAttribute('style')).toContain('background');
  },
};
