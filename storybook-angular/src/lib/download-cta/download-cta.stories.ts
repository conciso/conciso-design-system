import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { DownloadCtaComponent } from '@conciso/design-system-angular';

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
  //
  // Der Accessible Name ist seit der a11y-Nachbesserung nicht mehr der reine Button-Text
  // (der bliebe generisch, „Herunterladen“ allein nennt kein Ziel), sondern
  // „<Label>: <Titel> (<Meta>)“ — genau wie beim Combobox-Remove-Button
  // (`aria-label="'Entfernen: ' + opt.label"`) matchen wir hier per Regex auf den
  // Label-Präfix statt auf den vollen, von den Args abhängigen String.
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const primary = c.getByRole('button', { name: /^Herunterladen:/ });
    await expect(primary).toHaveAccessibleName(`${args.primaryLabel}: ${args.title} (${args.meta})`);
    await userEvent.click(primary);
    await expect(args.primaryClick).toHaveBeenCalledTimes(1);

    const secondary = c.getByRole('button', { name: /^Vorschau ansehen:/ });
    await expect(secondary).toHaveAccessibleName(`${args.secondaryLabel}: ${args.title} (${args.meta})`);
    await userEvent.click(secondary);
    await expect(args.secondaryClick).toHaveBeenCalledTimes(1);
  },
};
