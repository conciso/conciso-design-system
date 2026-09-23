import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { LinkCardComponent } from '@conciso/design-system-angular';

const meta: Meta<LinkCardComponent> = {
  title: 'Komponenten/Cards & Teaser/Klickbare Karte',
  component: LinkCardComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Variante B der klickbaren Karte (`a.card.card-elevated`, siehe `docs/index.html` ' +
          '„Klickbare Karte“): die ganze Fläche ist ein `<a>` und trägt deshalb nach der ' +
          'Konvention „Elevation = Interaktivität“ (`CONTRIBUTING.md` §4) den Schatten, den ' +
          '`cds-card` bewusst nicht trägt. Struktur wie `cds-card` (Media/Eyebrow/Titel/Text), ' +
          'zusätzlich ein optionaler Fuß `.card-cta-link`, wahlweise unten an die ' +
          'Kartenunterkante angeheftet (`--pinned`) für gleich hohe Karten im Raster.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
    showMedia: { control: 'boolean' },
  },
  args: {
    eyebrow: 'Angewandte KI',
    title: 'Warum 60 % der KI-Piloten nie in Produktion gehen',
    text: 'Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen gelernt haben.',
    href: '#wissensbeitrag-ki-piloten',
    area: 'ki',
    showMedia: true,
    ctaLabel: 'Beitrag lesen',
    ctaPinned: false,
  },
};
export default meta;

type Story = StoryObj<LinkCardComponent>;

export const Interaktiv: Story = {
  // Vier Entscheidungen gepinnt: (1) die ganze Fläche ist ein echtes <a> mit Ziel,
  // nicht ein <article> mit Klick-Handler, (2) es gibt genau EIN Link-Ziel im
  // Canvas — der CTA-Fuß ist ein <span>, kein verschachteltes zweites <a> — (3) das
  // <a> ist per Tab erreichbar, und (4) Enter aktiviert es wie jeden nativen Link.
  // Geprüft über einen abgefangenen click (nicht über echte Navigation: die würde
  // die Storybook-Seite selbst verlassen und den Testlauf abbrechen) —
  // preventDefault() verhindert dabei nur den Sprung, nicht die Aktivierung selbst.
  // Zusätzlich: ohne gesetztes ctaPinned bleibt der Modifier aus.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);

    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(1);
    const card = links[0];
    await expect(card.tagName).toBe('A');
    await expect(card).toHaveAttribute('href', '#wissensbeitrag-ki-piloten');

    const cta = canvasElement.querySelector('.card-cta-link');
    await expect(cta?.tagName).toBe('SPAN');
    await expect(cta).not.toHaveClass('card-cta-link--pinned');

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

export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [LinkCardComponent] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px">
        <cds-link-card area="co" eyebrow="Corporate" title="Marke &amp; Haltung"
          text="Ein konsistenter Auftritt über alle Berührungspunkte hinweg."
          href="#leistungen-marke" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="ki" eyebrow="AI.Applied" title="KI, die wirkt"
          text="Angewandte KI-Lösungen mit echtem Geschäftsnutzen."
          href="#leistungen-ki" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="es" eyebrow="Effektive Software" title="Schlanke Systeme"
          text="Weniger Code, klarere Architektur, schnellere Lieferung."
          href="#leistungen-es" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="wo" eyebrow="Wirksame Organisationen" title="Starke Teams"
          text="Organisationen, die lernen und sich wirksam anpassen."
          href="#leistungen-wo" ctaLabel="Mehr erfahren"></cds-link-card>
      </div>
    `,
  }),
};

export const ImRaster: Story = {
  name: 'Im Raster',
  parameters: { controls: { disable: true } },
  // Drei Listing-Karten mit unterschiedlich langem Anreißer nebeneinander: der
  // Grid-Container zieht sie per align-items:stretch auf gleiche Höhe
  // (.card-body{flex:1} macht die Karte dehnbar), --pinned schiebt den CTA-Fuß in
  // jeder Karte trotzdem auf dieselbe Unterkante.
  render: () => ({
    moduleMetadata: { imports: [LinkCardComponent] },
    template: `
      <div class="layout-grid" style="align-items:stretch">
        <cds-link-card class="col-4" area="ki" eyebrow="Angewandte KI"
          title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          text="Demos überzeugen, Use-Cases scheitern."
          href="#wissensbeitrag-ki-piloten" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
        <cds-link-card class="col-4" area="es" eyebrow="Effektive Software"
          title="Schlanke Architektur senkt Betriebskosten"
          text="Ein längerer Anreißer über zwei Zeilen, damit der Höhenunterschied zwischen den Karten sichtbar wird und --pinned trotzdem greift."
          href="#wissensbeitrag-architektur" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
        <cds-link-card class="col-4" area="wo"
          title="Teams, die sich selbst organisieren"
          text="Wie verteilte Verantwortung Entscheidungen beschleunigt."
          href="#wissensbeitrag-teams" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
      </div>
    `,
  }),
  // --pinned erscheint auf allen drei Karten, sobald das Flag gesetzt ist. Die
  // dritte Karte hat bewusst keine Eyebrow und ist damit von Haus aus kürzer:
  // Titel und Anreißer sind per line-clamp/min-height auf feste Zeilen gebracht,
  // die Eyebrow nicht. Gleich hoch werden die Karten dann nur, wenn a.card die
  // vom Raster gestreckte Höhe des Hosts übernimmt.
  play: async ({ canvasElement }) => {
    const pinned = canvasElement.querySelectorAll('.card-cta-link--pinned');
    await expect(pinned).toHaveLength(3);
    const heights = Array.from(canvasElement.querySelectorAll('a.card')).map((card) => card.getBoundingClientRect().height);
    await expect(new Set(heights).size).toBe(1);
    const ctaBottoms = Array.from(pinned).map((cta) => cta.getBoundingClientRect().bottom);
    await expect(new Set(ctaBottoms).size).toBe(1);
  },
};
