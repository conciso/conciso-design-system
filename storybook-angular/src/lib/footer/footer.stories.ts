import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

// GitHub-Octocat (simple-icons, viewBox 0 0 24) — Beispiel für ein eigenes Social-Icon
// über `iconPath`, ohne dass die Komponente ein Built-in dafür mitbringen muss.
const GITHUB_ICON =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12';

const meta: Meta<FooterComponent> = {
  title: 'Organisms/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Seitenfuß in zwei Bändern: ein helles Main-Band mit drei Spalten — Marken-' +
          'Identität und Adresse, wichtigste Inhalte als Nav-Liste und die Contentletter-' +
          'Anmeldung — sowie eine dunkle Bottom-Zeile mit Copyright, Rechtslinks und Social-' +
          'Profilen. Alle Inhalte sind über Inputs konfigurierbar; die Newsletter-Spalte ist ' +
          'per `showNewsletter` abschaltbar, Social-Links über `socialLinks` (Built-in-Icon via ' +
          '`platform` oder eigenes `iconPath`).',
      },
    },
  },
  argTypes: {
    brand: { control: 'text' },
    tel: { control: 'text' },
    email: { control: 'text' },
    navTitle: { control: 'text' },
    showNewsletter: { control: 'boolean' },
    newsletterTitle: { control: 'text' },
    newsletterSubmitLabel: { control: 'text' },
    copyright: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<FooterComponent>;

export const Interaktiv: Story = {};

export const OhneNewsletter: Story = {
  name: 'Ohne Newsletter',
  // Newsletter-Spalte ausgeblendet (z. B. für schlanke Landingpage-Footer).
  // Neue Story ohne eingecheckte Baseline → snapshot.skip (visual.yml noch nicht auf
  // main); nach dem Merge Baseline erzeugen + skip entfernen.
  parameters: { snapshot: { skip: true } },
  args: { showNewsletter: false },
};

export const CustomSocial: Story = {
  name: 'Eigene Social-Links',
  // Built-in (linkedin) + eigenes Icon per iconPath (GitHub) — plus gesetzte hrefs.
  parameters: { snapshot: { skip: true } },
  args: {
    socialLinks: [
      { platform: 'linkedin', href: 'https://www.linkedin.com/company/conciso' },
      { label: 'GitHub', href: 'https://github.com/conciso', iconPath: GITHUB_ICON },
    ],
  },
};
