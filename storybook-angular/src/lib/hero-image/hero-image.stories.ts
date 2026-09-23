import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, expect } from 'storybook/test';
import { HeroImageComponent } from '@conciso/design-system-angular';

// Neutraler Inline-SVG-Platzhalter im 21:9-Format, analog zum Muster in
// carousel.component.ts / team-voice.component.ts: storybook-angular mountet nur
// assets/brand als Static-Dir (siehe .storybook/main.ts), der Demo-Bilderordner
// assets/images ist dort bewusst nicht eingebunden. Ein Pfad wie
// `assets/images/team-gruppenbild.jpg` würde deshalb in keiner Story auflösen.
const heroPlaceholder =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1600'%20height='686'%3E%3Crect%20width='1600'%20height='686'%20fill='%23E8EDED'/%3E%3Ctext%20x='800'%20y='343'%20font-family='sans-serif'%20font-size='28'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EHero-Bild%2021%3A9%3C/text%3E%3C/svg%3E";

// Zweiter Platzhalter eigens für die Bildausschnitt-Story: hochformatig (2:3) statt
// 21:9, mit drei farbigen Banden („Kopf“/„Mitte“/„Fuß“). Ein Bild im Hero-Seitenverhältnis
// selbst zeigt bei object-fit:cover praktisch keinen Beschnitt (siehe heroPlaceholder oben),
// objectPosition hätte dort nichts sichtbar zu verschieben. Das Hochformat zwingt object-fit:cover
// zu einem deutlichen vertikalen Crop, an dem der Unterschied zwischen den beiden
// Objekt-Positionen unten tatsächlich zu sehen ist (geprüft im Browser, siehe Play-Funktion).
const portraitPlaceholder =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='720'%20height='1080'%3E" +
  "%3Crect%20width='720'%20height='360'%20fill='%23F4B183'/%3E" +
  "%3Crect%20y='360'%20width='720'%20height='360'%20fill='%239DC3E6'/%3E" +
  "%3Crect%20y='720'%20width='720'%20height='360'%20fill='%23A9D18E'/%3E" +
  "%3Ctext%20x='360'%20y='180'%20font-family='sans-serif'%20font-size='48'%20fill='%23543310'%20text-anchor='middle'%20dominant-baseline='middle'%3EKopf%3C/text%3E" +
  "%3Ctext%20x='360'%20y='540'%20font-family='sans-serif'%20font-size='48'%20fill='%231B3A57'%20text-anchor='middle'%20dominant-baseline='middle'%3EMitte%3C/text%3E" +
  "%3Ctext%20x='360'%20y='900'%20font-family='sans-serif'%20font-size='48'%20fill='%23274B1E'%20text-anchor='middle'%20dominant-baseline='middle'%3EFu%C3%9F%3C/text%3E%3C/svg%3E";

const meta: Meta<HeroImageComponent> = {
  title: 'Komponenten/Hero/Hero-Bild',
  component: HeroImageComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    // Vollbreit und randlos wie Topnav/Footer (layout:'fullscreen'), nicht
    // 'padded': ein Storybook-Rand würde genau die Randlosigkeit verdecken, die
    // den Hero von den content-breiten Akzentbildern (.ep-media-band) unterscheidet.
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Vollbreites, randloses `<figure>` im 21:9-Format (`.hero-image`) mit optionaler ' +
          'Caption als Gradient-Overlay aus Eyebrow, Titel und Text. Bleiben alle drei ' +
          'Textteile leer, entfällt das `<figcaption>` vollständig statt leer zu rendern ' +
          '(Variante „Hero ohne Caption“ eines Beitrags-Heros). Der Bildausschnitt ' +
          '(`objectPosition`) landet als Inline-Style direkt am `<img>`, weil er eine ' +
          'Eigenschaft des konkreten Bildes ist, nicht der Seite.',
      },
    },
  },
  argTypes: {
    headingLevel: { control: 'inline-radio', options: [1, 2] },
  },
  args: {
    src: heroPlaceholder,
    alt: 'Conciso-Team geht gemeinsam über ein sonniges Industriegelände',
    eyebrow: 'Seit 2016 · Dortmund',
    heading: 'Klare Köpfe. Ruhige Energie.',
    text: 'KI, Software und Organisationsentwicklung aus Dortmund.',
    headingLevel: 1,
    eager: true,
    objectPosition: '',
  },
};
export default meta;

type Story = StoryObj<HeroImageComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-hero-image
        [src]="src"
        [alt]="alt"
        [eyebrow]="eyebrow"
        [heading]="heading"
        [text]="text"
        [headingLevel]="headingLevel"
        [eager]="eager"
        [objectPosition]="objectPosition"
      ></cds-hero-image>
    `,
  }),
  // Zwei Entscheidungen gepinnt: alt landet als zugänglicher Name am <img> (nicht
  // nur als Attribut irgendwo im Markup), und der Caption-Titel rendert bei
  // Default-headingLevel als echtes <h1>.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(
      c.getByRole('img', { name: 'Conciso-Team geht gemeinsam über ein sonniges Industriegelände' }),
    ).toBeInTheDocument();
    await expect(c.getByRole('heading', { level: 1, name: 'Klare Köpfe. Ruhige Energie.' })).toBeInTheDocument();
  },
};

export const OhneCaption: Story = {
  name: 'Ohne Caption',
  parameters: { controls: { disable: true } },
  args: { eyebrow: '', heading: '', text: '' },
  render: (args) => ({
    props: args,
    template: `<cds-hero-image [src]="src" [alt]="alt"></cds-hero-image>`,
  }),
  // Entscheidung 1 gepinnt: ohne Eyebrow/Titel/Text entsteht kein <figcaption> —
  // das Bild rendert trotzdem vollständig, mit seinem alt-Text als zugänglichem Namen.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement.querySelector('figcaption')).toBeNull();
    await expect(
      c.getByRole('img', { name: 'Conciso-Team geht gemeinsam über ein sonniges Industriegelände' }),
    ).toBeInTheDocument();
  },
};

export const BeitragsHero: Story = {
  name: 'Beitrags-Hero (h2)',
  parameters: { controls: { disable: true } },
  // Beitrags-Heros sitzen unter einem Article-Header, der bereits ein eigenes
  // <h1> trägt (.article-title) — hier als externes <h1> nachgestellt, damit die
  // Story dieselbe Ausgangslage wie im Wissensbeitrag zeigt.
  render: () => ({
    template: `
      <h1 style="font:var(--ty-headline-md);margin:0 0 var(--s4)">Warum 60 % der KI-Piloten nie in Produktion gehen</h1>
      <cds-hero-image
        src="${heroPlaceholder}"
        alt="Whiteboard mit handgezeichneter Matrix der Achsen AI Value und AI Readiness"
        eyebrow="8 min Lesezeit"
        heading="Readiness statt Begeisterung"
        text="Was 200 KI-Implementierungen über den Weg in die Produktion zeigen."
        [headingLevel]="2"
      ></cds-hero-image>
    `,
  }),
  // Entscheidung 2 gepinnt: unter einem eigenen <h1> rendert der Caption-Titel als
  // <h2>, es entsteht keine zweite Top-Überschrift auf derselben Seite.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByRole('heading', { level: 1 })).toBeInTheDocument();
    await expect(c.getByRole('heading', { level: 2, name: 'Readiness statt Begeisterung' })).toBeInTheDocument();
  },
};

export const Bildausschnitt: Story = {
  parameters: { controls: { disable: true } },
  // Zwei Instanzen desselben hochformatigen Platzhalters direkt untereinander:
  // links/oben ohne objectPosition (Browser-Default `center center`, beschneidet
  // hier auf die mittlere Bande), darunter mit `center 10%` (beschneidet auf die
  // obere Bande). Der Unterschied ist damit im selben Screenshot sichtbar, nicht
  // nur im DOM behauptet.
  render: () => ({
    template: `
      <p style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--tx-muted);margin:var(--s4) var(--s6) var(--s1)">Ohne objectPosition (Default: center center)</p>
      <cds-hero-image
        src="${portraitPlaceholder}"
        alt="Testbild mit drei Banden Kopf, Mitte, Fuß, ohne gesetzten Bildausschnitt"
      ></cds-hero-image>
      <p style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--tx-muted);margin:var(--s6) var(--s6) var(--s1)">Mit objectPosition="center 10%"</p>
      <cds-hero-image
        src="${portraitPlaceholder}"
        alt="Dasselbe Testbild mit Bildausschnitt auf die obere Bande"
        objectPosition="center 10%"
      ></cds-hero-image>
    `,
  }),
  // Entscheidung 3 gepinnt: object-position landet als Inline-Style direkt am
  // <img>, nicht als Klasse — die CSS-Schicht hat dafür keinen Modifier. Beide
  // Bilder bekommen den erwarteten (unterschiedlichen) Style-Wert; welche Bande
  // dadurch sichtbar wird, zeigt der Screenshot.
  play: async ({ canvasElement }) => {
    const images = canvasElement.querySelectorAll<HTMLImageElement>('.hero-image-media img');
    await expect(images).toHaveLength(2);
    await expect(images[0].style.objectPosition).toBe('');
    await expect(images[1].style.objectPosition).toBe('center 10%');
  },
};

export const AlsSprungziel: Story = {
  name: 'Als Sprungziel',
  // Kein eigener Screenshot: Die Story sieht aus wie „Ohne Caption“, geprüft wird
  // hier nur die Box des Hosts.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: () => ({
    template: `
      <a href="#hauptinhalt">Zum Inhalt springen</a>
      <cds-hero-image
        id="hauptinhalt"
        tabindex="-1"
        src="${heroPlaceholder}"
        alt="Conciso-Team geht gemeinsam über ein sonniges Industriegelände"
      ></cds-hero-image>
    `,
  }),
  // Entscheidung 4 gepinnt: id und tabindex sitzen am Host, und der Host ist ein
  // Block mit derselben Box wie das gerenderte <figure>. Als Inline-Element hätte
  // er keine eigene Box, Fokus und Scroll-Position des Skip-Links liefen ins Leere.
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<HTMLElement>('#hauptinhalt')!;
    const figure = host.querySelector('figure')!;
    await expect(getComputedStyle(host).display).toBe('block');
    host.focus();
    await expect(document.activeElement).toBe(host);
    const hostBox = host.getBoundingClientRect();
    const figureBox = figure.getBoundingClientRect();
    await expect(hostBox.height).toBeGreaterThan(0);
    await expect(hostBox.top).toBe(figureBox.top);
    await expect(hostBox.height).toBe(figureBox.height);
  },
};
