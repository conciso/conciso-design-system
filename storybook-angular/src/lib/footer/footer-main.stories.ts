import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { FooterMainComponent } from '@conciso/design-system-angular';

const meta: Meta<FooterMainComponent> = {
  title: 'Organisms/Footer/Oberer Teil',
  component: FooterMainComponent,
  decorators: [moduleMetadata({ imports: [FooterMainComponent] })],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Projizierter Inhalt / neue Struktur ohne passende Baseline (visual.yml noch
    // nicht auf main) → skip; nach dem Merge Baseline erzeugen.
    snapshot: { skip: true },
    docs: {
      description: {
        component:
          'Oberer Footer-Teil (`.footer-main`) als generisches Spalten-Layout: beliebige ' +
          'Spalten werden projiziert (jedes Top-Level-Kind = eine Grid-Spalte). Spaltenanzahl/' +
          '-breiten über `columns` (grid-template-columns); ohne Angabe gilt das 3-Spalten-' +
          'Default. Adresse/Nav/Newsletter sind dadurch freie Kompositionen (siehe die ' +
          'kombinierte „Footer“-Story), keine erzwungene Struktur.',
      },
    },
  },
  argTypes: {
    columns: { control: 'text' },
  },
  args: {
    columns: undefined,
  },
};
export default meta;

type Story = StoryObj<FooterMainComponent>;

export const Interaktiv: Story = {
  // Drei projizierte Spalten im Default-Grid (1.2fr 1fr 1.3fr).
  render: (args) => ({
    props: args,
    template: `
      <cds-footer-main [columns]="columns">
        <div>
          <h3 class="footer-htitle">Produkt</h3>
          <ul class="footer-nav-list">
            <li><a class="footer-link" href="#">Funktionen</a></li>
            <li><a class="footer-link" href="#">Preise</a></li>
            <li><a class="footer-link" href="#">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-htitle">Ressourcen</h3>
          <ul class="footer-nav-list">
            <li><a class="footer-link" href="#">Dokumentation</a></li>
            <li><a class="footer-link" href="#">Beiträge</a></li>
            <li><a class="footer-link" href="#">Status</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-htitle">Kontakt</h3>
          <address class="footer-address">
            <p>Pariser Bogen 7<br />44269 Dortmund</p>
            <p>E-Mail: <a class="footer-link" href="mailto:info@conciso.de">info&#64;conciso.de</a></p>
          </address>
        </div>
      </cds-footer-main>
    `,
  }),
};

export const VierSpalten: Story = {
  name: 'Vier Spalten (columns)',
  // Beliebige Spaltenzahl/-breite über die columns-Eingabe.
  render: () => ({
    template: `
      <cds-footer-main columns="repeat(4, 1fr)">
        @for (col of ['Produkt', 'Lösungen', 'Ressourcen', 'Unternehmen']; track col) {
          <div>
            <h3 class="footer-htitle">{{ col }}</h3>
            <ul class="footer-nav-list">
              <li><a class="footer-link" href="#">Link A</a></li>
              <li><a class="footer-link" href="#">Link B</a></li>
            </ul>
          </div>
        }
      </cds-footer-main>
    `,
  }),
};
