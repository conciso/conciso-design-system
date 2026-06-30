import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Komponenten/Seite & Marke/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wrapper um `.footer` (css/components.css). Zwei-Band-Layout: helles Main-Band ' +
          '(Brand/Adresse · Nav-Liste · Contentletter-Form) und dunkler Bottom-Streifen ' +
          '(Copyright · Rechts-Links · Social). Social-Glyphen als Inline-SVG (currentColor).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<FooterComponent>;

export const Interaktiv: Story = {};
