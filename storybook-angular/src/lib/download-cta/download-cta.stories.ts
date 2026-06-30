import type { Meta, StoryObj } from '@storybook/angular';
import { DownloadCtaComponent } from './download-cta.component';

const meta: Meta<DownloadCtaComponent> = {
  title: 'Komponenten/DownloadCta',
  component: DownloadCtaComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.cta-dl` (css/components.css). Download-Block mit bereichsgefärbtem ' +
          'Top-Akzent + Icon (`[data-area]`), Texten und zwei Aktionen über die `.btn`-Klassen.',
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
