import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { TeamVoiceComponent } from '@conciso/design-system-angular';
import { platzhalterBild } from '../../platzhalter';

const teamfoto = platzhalterBild('Teamfoto', 600, 450, 24);

const meta: Meta<TeamVoiceComponent> = {
  title: 'Komponenten/Zitate & Testimonials/TeamVoice',
  component: TeamVoiceComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4541',
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          'Team-Stimme in editorialer, fotostarker Variante: großes Foto seitlich, Zitat und ' +
          'Attribution daneben. In Reihen abwechselnd links/rechts angeordnet. Für ' +
          'Repräsentation, wenn Gesichter und Präsenz zählen, etwa auf Karriereseiten.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    quote:
      'Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein.',
    name: 'Lena Brandt',
    roleLabel: 'Softwareentwicklerin, seit 2021',
    area: 'co',
    image: teamfoto,
    imageAlt: 'Teamfoto',
  },
};
export default meta;

type Story = StoryObj<TeamVoiceComponent>;

export const Interaktiv: Story = {
  // Zitat-Icon: gefülltes Lucide-Quote (ADR-0016) — dekorativ, Füllung per CSS-Klasse (currentColor).
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('svg.team-voice-icon') as SVGElement;
    await expect(icon).toHaveClass('lucide-quote');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(getComputedStyle(icon).fill).not.toBe('none');
    // Optische Größe: per transform auf 60 % skaliert, Layoutmaße bleiben.
    await expect(getComputedStyle(icon).transform).toBe('matrix(0.6, 0, 0, 0.6, 0, 0)');
  },
};

export const AlternierendeReihen: Story = {
  name: 'Alternierende Reihen',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [TeamVoiceComponent] },
    props: { teamfoto },
    template: `
      <div class="team-voices">
        <cds-team-voice [image]="teamfoto" area="co" name="Lena Brandt" roleLabel="Softwareentwicklerin, seit 2021"
          quote="Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein."></cds-team-voice>
        <cds-team-voice [image]="teamfoto" area="wo" name="Tobias Reuter" roleLabel="Lead Developer, seit 2018"
          quote="Was mich hält, ist die Ehrlichkeit. Wir reden über das, was gut läuft, und genauso über das, was nicht klappt."></cds-team-voice>
        <cds-team-voice [image]="teamfoto" area="es" name="Mara Vogt" roleLabel="Platform Engineer, seit 2022"
          quote="Hier zählt, was funktioniert, nicht, wer am lautesten ist. Das macht die Arbeit ruhig und fokussiert."></cds-team-voice>
      </div>
    `,
  }),
  // Akzeptanzkriterium: Jede .team-voice steckt allein in ihrem cds-team-voice-Host, deshalb
  // zählt die Position des Hosts in .team-voices. Erste und dritte Karte: Bild links vom Text,
  // zweite Karte: Bild rechts vom Text.
  play: async ({ canvasElement }) => {
    const hosts = Array.from(canvasElement.querySelectorAll('.team-voices > cds-team-voice'));
    await expect(hosts).toHaveLength(3);
    const media = hosts.map((h) => h.querySelector('.team-voice-media') as HTMLElement);
    const body = hosts.map((h) => h.querySelector('.team-voice-body') as HTMLElement);
    const imageLeftOfText = (i: number) =>
      media[i].getBoundingClientRect().left < body[i].getBoundingClientRect().left;
    await expect(imageLeftOfText(0)).toBe(true);
    await expect(imageLeftOfText(1)).toBe(false);
    await expect(imageLeftOfText(2)).toBe(true);
  },
};

export const AlternierendMobil: Story = {
  name: 'Alternierende Reihen (mobil)',
  // Reine Verhaltensprüfung ohne Baseline. Die Media-Query hängt am Viewport, nicht an der
  // Container-Breite, daher läuft die gerenderte Angular-Markup in einem 375 px breiten iframe.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: AlternierendeReihen.render,
  // Akzeptanzkriterium: Ab max-width 768px ist auch die gerade (zweite) Karte einspaltig, das
  // Bild steht über dem Text und nicht daneben.
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelector('.team-voices') as HTMLElement;
    const frame = document.createElement('iframe');
    frame.style.cssText = 'width:375px;height:1400px;border:0';
    const head = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((n) => n.outerHTML)
      .join('');
    frame.srcdoc = `<!doctype html><html><head>${head}</head><body>${rows.outerHTML}</body></html>`;
    const loaded = new Promise<void>((resolve) => frame.addEventListener('load', () => resolve()));
    frame.title = 'Mobile Vorschau der Team-Stimmen';
    rows.style.display = 'none';
    canvasElement.appendChild(frame);
    await loaded;
    // Stylesheets per <link> laden asynchron nach dem load-Event des Dokuments nicht mehr nach.
    const doc = frame.contentDocument as Document;
    await expect(frame.contentWindow!.matchMedia('(max-width:768px)').matches).toBe(true);
    const card = doc.querySelectorAll('.team-voices > cds-team-voice')[1];
    const media = card.querySelector('.team-voice-media') as HTMLElement;
    const body = card.querySelector('.team-voice-body') as HTMLElement;
    const m = media.getBoundingClientRect();
    const b = body.getBoundingClientRect();
    await expect(
      getComputedStyle(card.querySelector('.team-voice') as Element).gridTemplateColumns.split(' '),
    ).toHaveLength(1);
    await expect(m.bottom).toBeLessThanOrEqual(b.top + 1);
    await expect(Math.abs(m.left - b.left)).toBeLessThan(1);
  },
};
