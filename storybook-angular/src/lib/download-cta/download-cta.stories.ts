import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { DownloadCtaComponent } from '@conciso/design-system-angular';

// Bekannter a11y-Befund: `.cta-dl-eyebrow` (Bereich co) hat nur 3.28:1 Kontrast,
// weil css/components.css hier --co-600 statt --co-700 nutzt (Ausreißer ggü.
// ki/es/wo). Fix gehört in den CSS-Kern; bis dahin bewusst offen. Siehe README.

const meta: Meta<DownloadCtaComponent> = {
  title: 'Komponenten/Call to Action/DownloadCta',
  component: DownloadCtaComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
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
    primaryClick: fn(),
    secondaryClick: fn(),
  },
};
export default meta;

type Story = StoryObj<DownloadCtaComponent>;

export const Interaktiv: Story = {
  // Beide Aktionen sind rohe <button>-Elemente mit (click)-gebundenem Output
  // (primaryClick/secondaryClick) — vorher ohne jede Bindung, ein Klick verpuffte.
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: 'Herunterladen' }));
    await expect(args.primaryClick).toHaveBeenCalledTimes(1);
    await userEvent.click(c.getByRole('button', { name: 'Vorschau ansehen' }));
    await expect(args.secondaryClick).toHaveBeenCalledTimes(1);
  },
};
