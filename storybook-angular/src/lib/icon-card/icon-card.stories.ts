import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { IconCardComponent } from '@conciso/design-system-angular';

// Vier Heroicons wie im Mockup (docs/index.html:9464–9487, 9892–9909): wechselnde
// Content-Icons, keine DS-Bereichsglyphen — deshalb als rohes SVG projiziert statt
// aus einer Registry importiert (siehe Entscheidung 2 in icon-card.component.ts).
// Bewusst OHNE zusätzliche Klasse auf dem <svg>: der Kontrakt ist, dass
// `.ep-card-icon` als Container Maße und Stroke über den Nachfahren-Selektor
// `.ep-card-icon svg` durchreicht (anders als beim Störer, siehe dessen
// Klassendoku). Die Stroke-Farbe je Bereich liegt beim Konsumenten, exakt wie im
// Mockup: dort trägt das projizierte SVG die Farbe entweder über `currentColor` +
// eine `.t-XX`-Textfarb-Utility auf dem Container oder direkt über den
// CSS-Custom-Property-Wert im `stroke`-Attribut (docs/index.html:9894). Hier
// direkt, damit keine zusätzliche Klasse auf `.ep-card-icon` nötig ist.
const iconBriefcase =
  '<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--co-700)" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>';
const iconCheckCircle =
  '<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--ki-800)" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>';
const iconDocumentText =
  '<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--es-700)" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg>';
const iconCalendarDays =
  '<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--wo-700)" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>';

const meta: Meta<IconCardComponent> = {
  title: 'Komponenten/Cards & Teaser/Icon-Karte',
  component: IconCardComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Kompakte Teaser-Kachel mit farbiger Icon-Fläche, Eyebrow, Titel, Text und ' +
          'optionaler Pfeil-CTA-Zeile (`.ep-card`, css/components.css:1298–1340), die auf ' +
          'den Beispielseiten Bereichs- und Angebots-Einstiege trägt. Attributselektor ' +
          '`[cdsIconCard]` statt eigenem Element: `<a cdsIconCard href="…">` (ganze Fläche ' +
          'klickbar, `.ep-card-link` wird vom Host-Tag abgeleitet) oder ' +
          '`<div cdsIconCard>` (statisch, ruht flach mit Rahmen) — der Konsument schreibt ' +
          'das Tag, kein Wrapper-Element schiebt sich zwischen Grid und Karte. Das Icon ' +
          'kommt als projizierter Inhalt (`<ng-content select="[cdsIcon]">`): ' +
          '`.ep-card-icon` ist ein Container und reicht Maße/Stroke per ' +
          'Nachfahren-Selektor durch, das projizierte `<svg>` braucht deshalb KEINE ' +
          'eigene Größenklasse. **Kein `cdsIconCards`-Raster:** `.ep-cards` ist ein reines ' +
          '`display:grid` ohne Struktur oder Verhalten (dieselbe Begründung wie beim ' +
          'Verzicht auf einen `layout-grid`-Wrapper, siehe `spec.md`), Konsumenten ' +
          'schreiben deshalb `<div class="ep-cards">` von Hand, siehe „Im Raster“.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
  },
  args: {
    eyebrow: 'Effektive Software',
    title: 'Schlanke Systeme',
    text: 'Weniger Code, klarere Architektur, schnellere Lieferung.',
    area: 'es',
    ctaLabel: 'Mehr erfahren',
  },
};
export default meta;

type Story = StoryObj<IconCardComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${iconDocumentText}
      </div>
    `,
  }),
  // Tag <div> statt <a>: kein Link-Verhalten, keine Rolle `link` im Canvas.
  // data-area sitzt auf allen drei dafür vorgesehenen Elementen (Karte, Icon-Kachel,
  // Eyebrow) — NICHT auf der CTA-Zeile, deren Farbe über den Nachfahren-Selektor
  // .ep-card[data-area] .ep-card-cta kommt (siehe Klassendoku). Zusätzlich der
  // Icon-Kontrakt aus Entscheidung 2: das projizierte SVG braucht keine eigene
  // Klasse, die Größe (32×32) kommt allein aus dem Container .ep-card-icon.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('link')).toHaveLength(0);

    const card = canvasElement.querySelector('.ep-card');
    await expect(card?.tagName).toBe('DIV');
    await expect(card).not.toHaveClass('ep-card-link');
    await expect(card).toHaveAttribute('data-area', 'es');

    const icon = canvasElement.querySelector('.ep-card-icon');
    await expect(icon).toHaveAttribute('data-area', 'es');
    const eyebrow = canvasElement.querySelector('.ep-card-eyebrow');
    await expect(eyebrow).toHaveAttribute('data-area', 'es');
    // Gegenprobe: die CTA-Zeile trägt selbst kein data-area.
    const cta = canvasElement.querySelector('.ep-card-cta');
    await expect(cta).not.toHaveAttribute('data-area');
    await expect(cta?.querySelector('[aria-hidden="true"]')).toHaveTextContent('→');

    // Icon-Kontrakt: das projizierte <svg> trägt keine eigene Größenklasse, die
    // 32×32-Größe kommt aus dem Nachfahren-Selektor .ep-card-icon svg.
    const svg = canvasElement.querySelector('.ep-card-icon svg');
    await expect(svg).not.toHaveAttribute('class');
    const svgRect = svg?.getBoundingClientRect();
    await expect(svgRect?.width).toBe(32);
    await expect(svgRect?.height).toBe(32);
  },
};

export const AlsLink: Story = {
  name: 'Als Link',
  render: (args) => ({
    props: args,
    template: `
      <a cdsIconCard href="#leistungen-es" [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${iconDocumentText}
      </a>
    `,
  }),
  // Tag <a> statt <div>: .ep-card-link wird vom Host-Tag abgeleitet (kein Input
  // mehr), die ganze Fläche ist ein <a>, per Tastatur erreichbar, Enter aktiviert
  // es wie jeden nativen Link (abgefangen über preventDefault(), sonst verließe die
  // echte Navigation die Storybook-Seite, siehe dieselbe Begründung in
  // link-card.stories.ts). href ist ein natives Attribut, kein Angular-Input.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(1);
    const card = links[0];
    await expect(card.tagName).toBe('A');
    await expect(card).toHaveClass('ep-card', 'ep-card-link');
    await expect(card).toHaveAttribute('href', '#leistungen-es');

    await userEvent.tab();
    await expect(card).toHaveFocus();

    let activated = false;
    card.addEventListener('click', (event) => {
      activated = true;
      event.preventDefault();
    });
    await userEvent.keyboard('{Enter}');
    await expect(activated).toBe(true);
  },
};

export const AnkerOhneHref: Story = {
  name: 'Anker ohne Href',
  parameters: { controls: { disable: true } },
  render: (args) => ({
    props: args,
    template: `
      <a cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${iconDocumentText}
      </a>
    `,
  }),
  // Regressionsschutz für Auftrag 1 der Grundsatzentscheidung: .ep-card-link hängt
  // an „ist <a> UND hat href“, nicht am Tag allein. Ein <a cdsIconCard> ohne href
  // ist weder fokussierbar noch hat es eine Link-Rolle — es darf deshalb auch nicht
  // aussehen wie ein Link (kein Schatten, kein Hover). Ohne diese Prüfung würde die
  // Karte durch das bloße Tag <a> das .ep-card-link-Aussehen bekommen, obwohl sie
  // nicht bedienbar ist.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('link')).toHaveLength(0);

    const card = canvasElement.querySelector('.ep-card') as HTMLElement;
    await expect(card.tagName).toBe('A');
    await expect(card).not.toHaveAttribute('href');
    await expect(card).not.toHaveClass('ep-card-link');
  },
};

export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [IconCardComponent] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
        <a cdsIconCard href="#leistungen-co" area="co" eyebrow="Corporate" title="Marke mit Haltung"
          text="Klare Kommunikation, die vertraut und bewegt." ctaLabel="Entdecken">
          ${iconBriefcase}
        </a>
        <a cdsIconCard href="#leistungen-ki" area="ki" eyebrow="Angewandte KI" title="KI mit Wirkung"
          text="Liefert, wenn die Demo vorbei ist." ctaLabel="Entdecken">
          ${iconCheckCircle}
        </a>
        <a cdsIconCard href="#leistungen-es" area="es" eyebrow="Effektive Software" title="Präzise Systeme"
          text="Lebt, wenn der Hype vorbei ist." ctaLabel="Ansehen">
          ${iconDocumentText}
        </a>
        <a cdsIconCard href="#leistungen-wo" area="wo" eyebrow="Wirksame Organisationen" title="Wandel, der trägt"
          text="Bleibt, wenn wir gehen." ctaLabel="Kennenlernen">
          ${iconCalendarDays}
        </a>
      </div>
    `,
  }),
};

export const ImRaster: Story = {
  name: 'Im Raster',
  parameters: { controls: { disable: true } },
  // Kein cdsIconCards-Raster (siehe Entscheidung 3 in icon-card.component.ts): das
  // Raster ist ein reines <div class="ep-cards"> aus der CSS-Schicht, keine eigene
  // Komponente. Absichtlich UNTERSCHIEDLICH lange Texte (wie link-card.stories.ts,
  // Story „Im Raster“) statt der kurzen, ähnlich langen Mockup-Texte: das ist jetzt
  // der Regressionsschutz für die Grundsatzentscheidung "Attributselektor, damit
  // .ep-card selbst das Grid-Kind ist". Mit der früheren Element-Selektor-Fassung
  // (<cds-icon-card> als eigenes Host-Element um ein inneres .ep-card) ergab exakt
  // dieser Aufbau ungleiche Kartenhöhen (174px/270px gemessen); mit dem
  // Attributselektor ist .ep-card selbst der Grid-Kind, align-items:stretch greift
  // direkt, und die Play-Funktion unten pinnt gleiche Höhen + auf einer Linie
  // liegende CTA-Unterkanten.
  render: () => ({
    moduleMetadata: { imports: [IconCardComponent] },
    template: `
      <div class="ep-cards">
        <a cdsIconCard href="#leistungen-ki" area="ki" eyebrow="Angewandte KI" title="KI mit Wirkung"
          text="Kurzer Text." ctaLabel="Entdecken">
          ${iconCheckCircle}
        </a>
        <a cdsIconCard href="#leistungen-es" area="es" eyebrow="Effektive Software" title="Präzise Systeme"
          text="Ein deutlich längerer Anreißertext, der über mehrere Zeilen umbricht und die Karte dadurch von Natur aus höher macht als ihre Nachbarn." ctaLabel="Ansehen">
          ${iconDocumentText}
        </a>
        <a cdsIconCard href="#leistungen-wo" area="wo" eyebrow="Wirksame Organisationen" title="Wandel, der trägt"
          text="Mittellanger Text zur Kontrolle." ctaLabel="Kennenlernen">
          ${iconCalendarDays}
        </a>
      </div>
    `,
  }),
  // Direkte Grid-Kinder: .ep-cards hat ausschließlich .ep-card-Elemente als Kinder
  // (hier <a>, da alle drei Karten Links sind), kein Wrapper-Element dazwischen.
  // Regressionsschutz für die Grundsatzentscheidung: trotz stark unterschiedlicher
  // Textlänge bekommen alle drei Karten dieselbe Höhe (align-items:stretch trifft
  // direkt auf .ep-card) und die CTA-Zeilen liegen auf derselben Unterkante.
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector('.ep-cards');
    const cards = Array.from(grid?.children ?? []) as HTMLElement[];
    await expect(cards).toHaveLength(3);
    await expect(cards.every((el) => el.classList.contains('ep-card'))).toBe(true);

    const heights = cards.map((el) => el.getBoundingClientRect().height);
    await expect(heights[1]).toBe(heights[0]);
    await expect(heights[2]).toBe(heights[0]);

    const ctaBottoms = cards.map((el) => el.querySelector('.ep-card-cta')?.getBoundingClientRect().bottom);
    await expect(ctaBottoms[1]).toBe(ctaBottoms[0]);
    await expect(ctaBottoms[2]).toBe(ctaBottoms[0]);
  },
};

export const OhneCta: Story = {
  name: 'Ohne CTA',
  args: { ctaLabel: '' },
  render: (args) => ({
    props: args,
    template: `
      <div cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${iconDocumentText}
      </div>
    `,
  }),
  // Leeres ctaLabel (Default '') rendert keine .ep-card-cta-Zeile, statt leer zu
  // rendern — dieselbe Konvention wie bei cds-link-card/cds-hero-image/cds-section.
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.ep-card-cta')).toBeNull();
    await expect(canvasElement.querySelector('.ep-card-title')).toHaveTextContent('Schlanke Systeme');
  },
};
