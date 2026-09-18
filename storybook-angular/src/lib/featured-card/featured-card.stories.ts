import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { FeaturedCardComponent } from '@conciso/design-system-angular';

// Neutraler Inline-SVG-Platzhalter im 16:9-Format — storybook-angular mountet nur
// assets/brand als Static-Dir (.storybook/main.ts), assets/images ist dort bewusst
// nicht eingebunden (siehe hero-image.stories.ts).
const eventPlaceholder =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='800'%20height='450'%3E%3Crect%20width='800'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='400'%20y='225'%20font-family='sans-serif'%20font-size='24'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EBildfl%C3%A4che%20%C2%B7%2016%3A9%3C/text%3E%3C/svg%3E";

const meta: Meta<FeaturedCardComponent> = {
  title: 'Komponenten/Cards & Teaser/Featured-Karte',
  component: FeaturedCardComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Horizontale Großkarte für genau einen hervorgehobenen Beitrag oder Termin ' +
          '(`.card-featured`, siehe `docs/index.html` „Featured · horizontale Großkarte“): ' +
          'Bild links 60 %, Textspalte rechts 40 % als absolut positioniertes Overlay, mit ' +
          '`.card-title-hero` (Serif-Editorial-Titel) und optionaler `.pill`. Mit gesetztem ' +
          '`href` ein `<a class="card card-elevated card-featured">`, sonst ein `<article ' +
          'class="card card-featured">` ohne Schatten (§4 „Elevation = Interaktivität“: ' +
          '`.card-elevated` wirkt nur auf `a.card-elevated`). Kein Grid: Featured ist die ' +
          '„genau einer auf der Bühne“-Variante, die Standard-Karte fürs Grid ist ' +
          '`cds-link-card`.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
  },
  args: {
    title: 'Effizienz durch n8n.',
    text: 'Drei kurze Inputs, ein Workflow, spürbar weniger Klickarbeit im Tagesgeschäft.',
    imageSrc: eventPlaceholder,
    imageAlt: 'Laptop mit einem n8n-Workflow-Diagramm auf dem Bildschirm',
    href: '#veranstaltung-n8n',
    pill: 'Effektive Software',
    area: 'es',
  },
};
export default meta;

type Story = StoryObj<FeaturedCardComponent>;

export const Interaktiv: Story = {
  // Die gefährliche Stelle des Tickets: .card-featured arbeitet mit direkten
  // Kindselektoren (.card-featured>.card-media, .card-featured-body>.pill/-.card-text/
  // -.card-title-hero). Diese Play-Funktion prüft die gerenderte Kette im echten DOM,
  // nicht nur, dass die Klassen irgendwo vorkommen — zusätzlich verifiziert im
  // laufenden Storybook per querySelector (siehe Bericht). Dazu: mit gesetztem href
  // ist die Karte ein <a>, per Tastatur erreichbar, Enter aktiviert es.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);

    const featured = canvasElement.querySelector('.card-featured');
    await expect(featured?.tagName).toBe('A');

    // Direkte Kindselektoren: exakt die Elemente, auf die das CSS zielt, müssen
    // DIREKTE Kinder sein, kein Angular-Host dazwischen.
    await expect(canvasElement.querySelector('.card-featured > .card-media')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured > .card-media > img')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .pill')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .card-title-hero')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .card-text')).not.toBeNull();
    // Gegenprobe: kein <cds-pill>-Tag im gerenderten DOM (die Pille ist direkt
    // komponiertes Markup, siehe Klassendoku Entscheidung 2).
    await expect(canvasElement.querySelector('cds-pill')).toBeNull();
    // Ohne pillAriaLabel greift derselbe Default wie bei PillComponent: „Bereich <pill>“.
    await expect(canvasElement.querySelector('.pill')).toHaveAttribute('aria-label', 'Bereich Effektive Software');

    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(1);
    const card = links[0];
    await expect(card).toHaveAttribute('href', '#veranstaltung-n8n');
    await userEvent.tab();
    await expect(card).toHaveFocus();

    // Enter aktiviert den nativen Link — abgefangen über preventDefault(), sonst
    // verließe die echte Navigation die Storybook-Seite und der Testlauf bräche ab
    // (siehe Begründung in link-card.stories.ts).
    let activated = false;
    card.addEventListener('click', (event) => {
      activated = true;
      event.preventDefault();
    });
    await userEvent.keyboard('{Enter}');
    await expect(activated).toBe(true);
  },
};

export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [FeaturedCardComponent] },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <cds-featured-card area="co" pill="Corporate" title="Zehn Jahre Conciso."
          text="Wie aus einer Zwei-Personen-Idee ein Team wurde, das Mittelstand und KI zusammendenkt."
          imageSrc="${eventPlaceholder}" imageAlt="Conciso-Team bei einem Firmenjubiläum"
          href="#beitrag-jubilaeum"></cds-featured-card>
        <cds-featured-card area="ki" pill="Angewandte KI" title="Effizienz durch n8n."
          text="Drei kurze Inputs, ein Workflow, spürbar weniger Klickarbeit im Tagesgeschäft."
          imageSrc="${eventPlaceholder}" imageAlt="Laptop mit einem n8n-Workflow-Diagramm auf dem Bildschirm"
          href="#veranstaltung-n8n"></cds-featured-card>
        <cds-featured-card area="es" pill="Effektive Software" title="Schlanke Architektur senkt Betriebskosten."
          text="Was 40 Migrationsprojekte über den Zusammenhang von Komplexität und Wartungsaufwand zeigen."
          imageSrc="${eventPlaceholder}" imageAlt="Whiteboard mit einer Architekturskizze"
          href="#beitrag-architektur"></cds-featured-card>
        <cds-featured-card area="wo" pill="Wirksame Organisationen" title="Teams, die sich selbst organisieren."
          text="Wie verteilte Verantwortung Entscheidungen beschleunigt, ohne Führung zu verlieren."
          imageSrc="${eventPlaceholder}" imageAlt="Team im Kreis bei einem Workshop"
          href="#beitrag-teams"></cds-featured-card>
      </div>
    `,
  }),
};

export const PilleAlsLesezeit: Story = {
  name: 'Pille als Lesezeit',
  parameters: { controls: { disable: true } },
  // Die Pille benennt nicht immer einen Bereich (docs/index.html:7913: sichtbar
  // "12 min Lesezeit", aria-label "Lesezeit 12 Minuten") — ohne pillAriaLabel
  // entstünde daraus fälschlich "Bereich 12 min Lesezeit". pillAriaLabel
  // überschreibt den Default gezielt, dieselbe Regel wie bei PillComponent.
  args: { pill: '12 min Lesezeit', pillAriaLabel: 'Lesezeit 12 Minuten' },
  play: async ({ canvasElement }) => {
    const pill = canvasElement.querySelector('.pill');
    await expect(pill).toHaveTextContent('12 min Lesezeit');
    await expect(pill).toHaveAttribute('aria-label', 'Lesezeit 12 Minuten');
  },
};

export const OhnePill: Story = {
  name: 'Ohne Pill',
  parameters: { controls: { disable: true } },
  args: { pill: '' },
  // Leeres pill rendert keine .pill — die Kindselektor-Kette bricht dadurch nicht,
  // .card-featured-body hat dann eben ein Kind weniger.
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.pill')).toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .card-title-hero')).not.toBeNull();
  },
};

export const OhneLink: Story = {
  name: 'Ohne Link',
  parameters: { controls: { disable: true } },
  args: { href: '' },
  // Pflicht-Verhalten: ohne href entsteht kein <a> — die Karte rendert als
  // <article>, bewusst ohne .card-elevated (die Klasse wirkt im CSS ohnehin nur auf
  // a.card-elevated, siehe Entscheidung 1 in der Klassendoku).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('link')).toHaveLength(0);
    const featured = canvasElement.querySelector('.card-featured');
    await expect(featured?.tagName).toBe('ARTICLE');
    await expect(featured).not.toHaveClass('card-elevated');
  },
};
