import type { Meta, StoryObj } from '@storybook/angular';
import { DownloadCtaComponent } from '@conciso/design-system-angular';

// Bekannter a11y-Befund: `.cta-dl-eyebrow` (Bereich co) hat nur 3.28:1 Kontrast,
// weil css/components.css hier --co-600 statt --co-700 nutzt (Ausreißer ggü.
// ki/es/wo). Fix gehört in den CSS-Kern; bis dahin bewusst offen. Siehe README.

const meta: Meta<DownloadCtaComponent> = {
  title: 'Molecules/DownloadCta',
  component: DownloadCtaComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // Der Grund für dieses 'todo' ist weg: .cta-dl-eyebrow trug --co-600 mit 3.28:1 und
    // nutzt jetzt --co-700 mit 5,52:1 auf Weiß. Wieder scharf schalten, sobald der
    // Test-Runner einmal grün durchgelaufen ist.
    a11y: { test: 'todo' },
    docs: {
      description: {
        component:
          'Call-to-Action-Block für Ressourcen-Downloads mit Icon, Eyebrow, Titel, ' +
          'Beschreibung und bis zu zwei Aktionen (Hero · Mit Vorschaubild · Kompakt · ' +
          'Minimal). Farblich an jede Brand Area angepasst.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    area: 'co',
    eyebrow: 'Conciso Design System',
    title: 'Figma-Bibliothek herunterladen',
    desc: 'Alle Komponenten, Tokens, Icons und Brand Assets, direkt einsatzbereit als Figma-Bibliothek.',
    meta: 'Figma · Version 1.0 · 48 MB',
    primaryLabel: 'Herunterladen',
    secondaryLabel: 'Vorschau ansehen',
  },
};
export default meta;

type Story = StoryObj<DownloadCtaComponent>;

export const Interaktiv: Story = {};
