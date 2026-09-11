import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FooterBottomComponent, FooterComponent, FooterMainComponent } from '@conciso/design-system-angular';

const meta: Meta<FooterComponent> = {
  title: 'Organisms/Footer',
  component: FooterComponent,
  decorators: [moduleMetadata({ imports: [FooterComponent, FooterMainComponent, FooterBottomComponent] })],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Projektions-Kompositionen ohne passende Baseline (visual.yml noch nicht auf main)
    // → skip; nach dem Merge Baseline erzeugen.
    snapshot: { skip: true },
    docs: {
      description: {
        component:
          '`<footer>`-Landmark, das die zwei Bänder projiziert. „Website-Footer“ zeigt die ' +
          'volle Marketing-Zusammensetzung (Adresse/Nav/Newsletter im generischen ' +
          '`cds-footer-main` + `cds-footer-bottom`); „App-Footer“ den schlanken Fall für ' +
          '(interne) SPAs — nur der untere Streifen mit Copyright + Rechtslinks.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<FooterComponent>;

export const WebsiteFooter: Story = {
  name: 'Website-Footer',
  // Vollständige Marketing-Zusammensetzung als Beispiel: drei projizierte Spalten
  // (Adresse, wichtige Inhalte, Contentletter) im oberen Band + der Bottom-Streifen.
  render: () => ({
    template: `
      <cds-footer>
        <cds-footer-main>
          <div>
            <div class="footer-brand">Conciso GmbH</div>
            <address class="footer-address">
              <p>Pariser Bogen 7<br />44269 Dortmund</p>
              <p>
                Tel.: <a class="footer-link" href="tel:+492312261750">+49 231 226175-0</a><br />
                E-Mail: <a class="footer-link" href="mailto:info@conciso.de">info&#64;conciso.de</a>
              </p>
            </address>
          </div>
          <div>
            <h3 class="footer-htitle">Wichtige Inhalte</h3>
            <ul class="footer-nav-list">
              <li><a class="footer-link" href="#">Angewandte KI</a></li>
              <li><a class="footer-link" href="#">Effektive Software</a></li>
              <li><a class="footer-link" href="#">Wirksame Organisationen</a></li>
              <li><a class="footer-link" href="#">Beiträge</a></li>
              <li><a class="footer-link" href="#">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-htitle">Contentletter abonnieren</h3>
            <p class="footer-newsletter-desc">Alle drei Monate neue Beiträge direkt ins Postfach.</p>
            <form class="footer-newsletter-form" aria-label="Contentletter abonnieren">
              <label class="footer-field">
                <span class="footer-field-label">Deine E-Mail <span class="req" aria-hidden="true">*</span></span>
                <input type="email" placeholder="name@unternehmen.de" aria-required="true" autocomplete="email" required />
              </label>
              <label class="footer-newsletter-consent">
                <input type="checkbox" required />
                <span>Einverstanden mit den <a class="body-link" href="#">Datenschutzhinweisen</a></span>
              </label>
              <button type="submit" class="btn btn-filled btn-co">Abonnieren</button>
            </form>
          </div>
        </cds-footer-main>
        <cds-footer-bottom></cds-footer-bottom>
      </cds-footer>
    `,
  }),
};

export const AppFooter: Story = {
  name: 'App-Footer (schlank)',
  // Für (interne) SPAs: nur der untere Streifen — Copyright + Rechtslinks, keine
  // Social-Profile. Kein oberes Marketing-Band.
  render: () => ({
    props: {
      legal: [
        { label: 'Datenschutz', href: '#' },
        { label: 'Impressum', href: '#' },
      ],
      support: { label: 'Support', href: '#' },
    },
    template: `
      <cds-footer>
        <cds-footer-bottom
          copyright="© 2026 Conciso GmbH"
          version="Version 1.4.2"
          [support]="support"
          [legalLinks]="legal"
          [socialLinks]="[]"
        ></cds-footer-bottom>
      </cds-footer>
    `,
  }),
};
