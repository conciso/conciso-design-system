import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from '@conciso/design-system-angular';

const meta: Meta<CardComponent> = {
  title: 'Organisms/Card',
  component: CardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Generische Teaser-Karte für Inhalte mit optionalem Medienbereich, ' +
          'Eyebrow, Titel, Text und Fußzeilen-Aktion. Als flache oder erhöhte ' +
          '(elevated) Variante und farblich an jede Brand Area angepasst.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
    elevated: { control: 'boolean' },
    showMedia: { control: 'boolean' },
  },
  args: {
    eyebrow: 'Insights',
    title: 'Effektive Software für den Mittelstand',
    text: 'Wie schlanke Architektur und klare Prozesse messbar Zeit und Kosten sparen.',
    area: 'es',
    elevated: true,
    showMedia: true,
    actionLabel: 'Mehr erfahren',
  },
};
export default meta;

type Story = StoryObj<CardComponent>;

export const Interaktiv: Story = {};

export const ProBereich: Story = {
  name: 'Eine Karte je Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [CardComponent] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">
        <cds-card area="co" eyebrow="Corporate" title="Marke & Haltung"
          text="Ein konsistenter Auftritt über alle Berührungspunkte hinweg."></cds-card>
        <cds-card area="ki" eyebrow="AI.Applied" title="KI, die wirkt"
          text="Angewandte KI-Lösungen mit echtem Geschäftsnutzen."></cds-card>
        <cds-card area="es" eyebrow="Eff. Software" title="Schlanke Systeme"
          text="Weniger Code, klarere Architektur, schnellere Lieferung."></cds-card>
        <cds-card area="wo" eyebrow="Wirks. Orga" title="Starke Teams"
          text="Organisationen, die lernen und sich wirksam anpassen."></cds-card>
      </div>
    `,
  }),
};

export const OhneMedien: Story = {
  name: 'Ohne Medienfläche',
  args: { showMedia: false, area: 'co', eyebrow: 'Hinweis' },
};

export const FreierInhalt: Story = {
  name: 'Freier Inhalt (ng-content)',
  // Für SPAs: Titel behalten, aber Text/Aktion/Media aus und beliebigen Inhalt
  // in den .card-body projizieren (z. B. Kennzahlen, Listen, eigene Controls).
  // Neue Story ohne Baseline (visual.yml noch nicht auf main) → snapshot.skip.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: () => ({
    moduleMetadata: { imports: [CardComponent] },
    template: `
      <cds-card
        area="ki"
        title="Projektstatus"
        [text]="''"
        [actionLabel]="''"
        [showMedia]="false"
        style="max-width:320px"
      >
        <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s2);font:var(--ty-body-md)">
          <li style="display:flex;justify-content:space-between"><span>Offen</span><strong>12</strong></li>
          <li style="display:flex;justify-content:space-between"><span>In Arbeit</span><strong>5</strong></li>
          <li style="display:flex;justify-content:space-between"><span>Erledigt</span><strong>28</strong></li>
        </ul>
      </cds-card>
    `,
  }),
};
