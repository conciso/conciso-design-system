import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Komponenten/Karten & Teaser/Card',
  component: CardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.card` / `.card-elevated` (css/components.css). Struktur aus ' +
          '.card-media, .card-body (.card-eyebrow/.card-title/.card-text) und optionalem ' +
          '.card-footer mit `.btn .btn-text`. Bereichsfarbe über `[data-area]`.',
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
