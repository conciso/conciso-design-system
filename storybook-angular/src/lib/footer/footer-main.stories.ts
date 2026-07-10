import type { Meta, StoryObj } from '@storybook/angular';
import { FooterMainComponent } from './footer-main.component';

const meta: Meta<FooterMainComponent> = {
  title: 'Organisms/Footer/Oberer Teil',
  component: FooterMainComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Neue Story ohne eingecheckte Baseline (visual.yml noch nicht auf main) → skip;
    // nach dem Merge Baseline erzeugen + entfernen.
    snapshot: { skip: true },
    docs: {
      description: {
        component:
          'Oberer Footer-Teil (`.footer-main`): helles 3-Spalten-Band mit Marken-Identität + ' +
          'Adresse, Nav-Liste und optionaler Contentletter-Anmeldung (per `showNewsletter` ' +
          'abschaltbar). Wird in `<cds-footer>` zusammen mit dem unteren Teil projiziert.',
      },
    },
  },
  argTypes: {
    brand: { control: 'text' },
    address: { control: 'text' },
    tel: { control: 'text' },
    fax: { control: 'text' },
    email: { control: 'text' },
    navTitle: { control: 'text' },
    showNewsletter: { control: 'boolean' },
    newsletterTitle: { control: 'text' },
    newsletterDesc: { control: 'text' },
    newsletterNameLabel: { control: 'text' },
    newsletterNamePlaceholder: { control: 'text' },
    newsletterEmailLabel: { control: 'text' },
    newsletterEmailPlaceholder: { control: 'text' },
    newsletterConsentText: { control: 'text' },
    newsletterConsentLinkLabel: { control: 'text' },
    newsletterConsentLinkHref: { control: 'text' },
    newsletterSubmitLabel: { control: 'text' },
  },
  // Werte vorbefüllt, damit sie im Controls-Panel sichtbar/editierbar sind.
  args: {
    brand: 'Conciso GmbH',
    address: 'Pariser Bogen 7\n44269 Dortmund',
    mapsLinks: [
      { label: 'Google Maps', href: 'https://www.google.com/maps/place/Pariser+Bogen+7,+44269+Dortmund' },
      {
        label: 'OpenStreetMap',
        href: 'https://www.openstreetmap.org/search?query=Pariser+Bogen+7%2C+44269+Dortmund',
      },
      { label: 'Apple Karten', href: 'https://maps.apple.com/?address=Pariser+Bogen+7,44269+Dortmund' },
    ],
    tel: '+49 231 226175-0',
    fax: '+49 231 226175-10',
    email: 'info@conciso.de',
    navTitle: 'Wichtige Inhalte',
    navLinks: [
      { label: 'Angewandte KI', href: '#' },
      { label: 'Effektive Software', href: '#' },
      { label: 'Wirksame Organisationen', href: '#' },
      { label: 'Beiträge', href: '#' },
      { label: 'Jobs', href: '#' },
      { label: 'Kontakt', href: '#' },
    ],
    showNewsletter: true,
    newsletterTitle: 'Contentletter abonnieren',
    newsletterDesc: 'Alle drei Monate neue Beiträge direkt ins Postfach.',
    newsletterNameLabel: 'Dein Vorname',
    newsletterNamePlaceholder: 'Maria',
    newsletterEmailLabel: 'Deine E-Mail',
    newsletterEmailPlaceholder: 'name@unternehmen.de',
    newsletterConsentText: 'Einverstanden mit den',
    newsletterConsentLinkLabel: 'Datenschutzhinweisen',
    newsletterConsentLinkHref: '#',
    newsletterSubmitLabel: 'Abonnieren',
  },
};
export default meta;

type Story = StoryObj<FooterMainComponent>;

export const Interaktiv: Story = {};

export const OhneNewsletter: Story = {
  name: 'Ohne Newsletter',
  args: { showNewsletter: false },
};
