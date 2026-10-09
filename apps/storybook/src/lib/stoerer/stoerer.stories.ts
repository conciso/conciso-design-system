import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { platzhalterBild } from '../../platzhalter';
import {
  HeroImageComponent,
  StoererComponent,
  StoererSetComponent,
} from '@conciso/design-system-angular';

// Neutraler Inline-SVG-Platzhalter im 21:9-Format für die Kombinations-Story mit
// cds-hero-image — dasselbe Muster wie in hero-image.stories.ts (apps/storybook
// mountet nur assets/brand als Static-Dir, siehe .storybook/main.ts).
const heroPlaceholder = platzhalterBild('Bildfläche · 21:9', 1600, 686);

// Zwei Lucide-Icons: calendar-days für
// Veranstaltungen, file-text für Wissensbeiträge. Wechselnde Content-Icons, keine
// DS-Bereichsglyphen — deshalb als rohes SVG projiziert statt aus einer Registry
// importiert (siehe Entscheidung in stoerer.component.ts).
const iconCalendarDays =
  '<svg cdsIcon class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 2v3" /><path d="M16 2v3" /><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M8 13h.01" /><path d="M12 13h.01" /><path d="M16 13h.01" /><path d="M8 17h.01" /><path d="M12 17h.01" /><path d="M16 17h.01" /></svg>';
const iconDocumentText =
  '<svg cdsIcon class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>';

const meta: Meta<StoererSetComponent> = {
  title: 'Komponenten/Hero/Störer',
  component: StoererSetComponent,
  decorators: [
    moduleMetadata({ imports: [StoererSetComponent, StoererComponent, HeroImageComponent] }),
  ],
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1132',
    },
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

export const HostAttribut: Story = {
  name: 'Host-Attribut',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: () => ({
    template: `
      <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n" href="#veranstaltung">
        ${iconCalendarDays}
      </cds-stoerer>
    `,
  }),
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('cds-stoerer');
    await expect(host).not.toHaveAttribute('title');
  },
};

export const ZweiKachelnUeberDemHero: Story = {
  name: 'Zwei Kacheln über dem Hero',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3999',
    },
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
    // Nachfahren-Selektoren, nicht `>`: cds-hero-image/cds-stoerer-set bleiben als
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
