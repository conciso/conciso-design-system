import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Komponenten/Footer/Footer',
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
          'Profilen.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<FooterComponent>;

export const Interaktiv: Story = {};
