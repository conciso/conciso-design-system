import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { HeroImageComponent, StoererComponent, StoererSetComponent } from '@conciso/design-system-angular';

// Neutraler Inline-SVG-Platzhalter im 21:9-Format für die Kombinations-Story mit
// cds-hero-image — dasselbe Muster wie in hero-image.stories.ts (storybook-angular
// mountet nur assets/brand als Static-Dir, siehe .storybook/main.ts).
const heroPlaceholder =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1600'%20height='686'%3E%3Crect%20width='1600'%20height='686'%20fill='%23E8EDED'/%3E%3Ctext%20x='800'%20y='343'%20font-family='sans-serif'%20font-size='28'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EHero-Bild%2021%3A9%3C/text%3E%3C/svg%3E";

// Zwei Heroicons wie im Mockup (docs/index.html:9421–9430): calendar-days für
// Veranstaltungen, document-text für Wissensbeiträge. Wechselnde Content-Icons, keine
// DS-Bereichsglyphen — deshalb als rohes SVG projiziert statt aus einer Registry
// importiert (siehe Entscheidung in stoerer.component.ts).
const iconCalendarDays =
  '<svg cdsIcon class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>';
const iconDocumentText =
  '<svg cdsIcon class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" /></svg>';

const meta: Meta<StoererSetComponent> = {
  title: 'Komponenten/Hero/Störer',
  component: StoererSetComponent,
  decorators: [moduleMetadata({ imports: [StoererSetComponent, StoererComponent, HeroImageComponent] })],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Set aus ein bis drei Verweiskacheln (`<cds-stoerer>`), das ausschließlich auf der ' +
          'Startseite oben rechts über dem Hero-Bild liegt (`.stoerer-set` / `.stoerer-list`). ' +
          'Jede Kachel ist ein vollständig klickbarer `<a>` mit Typ-Glyph, Thema-Label, Titel ' +
          'und Meta-Zeile. Der Positionsrahmen `.stoerer-hero`, der Hero-Bild und Set gemeinsam ' +
          'umschließt, ist bewusst kein Teil dieser Komponente und bleibt Sache des Konsumenten ' +
          '(siehe „Zwei Kacheln über dem Hero“ unten).',
      },
    },
  },
  args: { label: 'Aktuelles' },
};
export default meta;

type Story = StoryObj<StoererSetComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-stoerer-set [label]="label">
        <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n"
          href="#veranstaltung" date="2026-12-03" meta="Dortmund">
          ${iconCalendarDays}
        </cds-stoerer>
        <cds-stoerer topic="Neu im Wissen" title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          href="#wissensbeitrag" date="2026-05-13" meta="8 min Lesezeit">
          ${iconDocumentText}
        </cds-stoerer>
      </cds-stoerer-set>
    `,
  }),
  // Drei Entscheidungen gepinnt: (1) das Set trägt sein aria-label, (2) jede Kachel
  // ist ein echtes <a>, tastaturerreichbar, (3) der sr-only-Trenner steht in der
  // Meta-Zeile, wenn date UND meta gesetzt sind (bei beiden Kacheln hier der Fall).
  // Zusätzlich die <li>-Entscheidung selbst: die Liste hat ausschließlich <li> als
  // direkte Kinder, kein <cds-stoerer>-Tag taucht im gerenderten DOM auf.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);

    const aside = canvasElement.querySelector('aside.stoerer-set');
    await expect(aside).toHaveAttribute('aria-label', 'Aktuelles');

    const list = canvasElement.querySelector('ul.stoerer-list');
    await expect(list?.children.length).toBe(2);
    await expect(Array.from(list?.children ?? []).every((el) => el.tagName === 'LI')).toBe(true);
    await expect(canvasElement.querySelector('cds-stoerer')).toBeNull();

    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(2);
    await expect(links[0].tagName).toBe('A');
    await userEvent.tab();
    await expect(links[0]).toHaveFocus();
    await userEvent.tab();
    await expect(links[1]).toHaveFocus();

    const separators = canvasElement.querySelectorAll('.stoerer-meta .sr-only');
    await expect(separators).toHaveLength(2);
  },
};

export const ZweiKachelnUeberDemHero: Story = {
  name: 'Zwei Kacheln über dem Hero',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`.stoerer-hero` umschließt Hero-Bild und Set gemeinsam (`position:relative`, ' +
          '`container-type:inline-size`): Der Rahmen bleibt Sache der Seite, nicht der ' +
          'Störer-Komponente, sonst könnte das Set das Hero-Bild nicht überlagern.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="stoerer-hero">
        <cds-hero-image src="${heroPlaceholder}" alt="Conciso-Team geht gemeinsam über ein sonniges Industriegelände"
          eyebrow="Seit 2016 · Dortmund" heading="KI, Software und Organisation für den Mittelstand."
          text="Pragmatisch geplant, kraftvoll umgesetzt."></cds-hero-image>
        <cds-stoerer-set>
          <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n"
            href="#veranstaltung" date="2026-12-03" meta="Dortmund">
            ${iconCalendarDays}
          </cds-stoerer>
          <cds-stoerer topic="Neu im Wissen" title="Warum 60 % der KI-Piloten nie in Produktion gehen"
            href="#wissensbeitrag" date="2026-05-13" meta="8 min Lesezeit">
            ${iconDocumentText}
          </cds-stoerer>
        </cds-stoerer-set>
      </div>
    `,
  }),
  // Die Kombination selbst ist das Verhalten: Hero-Bild und Störer-Set rendern
  // gemeinsam innerhalb desselben .stoerer-hero-Rahmens, den der Konsument stellt.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    // Nachfahren-Selektoren, nicht ">": cds-hero-image/cds-stoerer-set bleiben als
    // eigene Host-Elemente im DOM stehen (anders als das projizierte cds-stoerer,
    // siehe Entscheidung in stoerer-set.component.ts).
    await expect(canvasElement.querySelector('.stoerer-hero .hero-image')).not.toBeNull();
    await expect(canvasElement.querySelector('.stoerer-hero aside.stoerer-set')).not.toBeNull();
    await expect(c.getAllByRole('link')).toHaveLength(2);
  },
};

export const OhneMeta: Story = {
  name: 'Ohne Meta',
  parameters: { controls: { disable: true } },
  // Bleiben date und meta beide leer, entfällt die gesamte .stoerer-meta-Zeile statt
  // leer zu rendern — dieselbe „leer = ausgeblendet“-Konvention wie bei cds-hero-image
  // und cds-section.
  render: () => ({
    template: `
      <cds-stoerer-set label="Aktuelles">
        <cds-stoerer topic="Neues Seminar" title="Scrum Master Kurs, neue Termine ab Oktober" href="#seminar">
          ${iconDocumentText}
        </cds-stoerer>
      </cds-stoerer-set>
    `,
  }),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement.querySelector('.stoerer-meta')).toBeNull();
    await expect(
      c.getByRole('link', { name: /Scrum Master Kurs, neue Termine ab Oktober/ }),
    ).toBeInTheDocument();
  },
};
