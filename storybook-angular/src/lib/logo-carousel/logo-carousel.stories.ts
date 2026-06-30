import type { Meta, StoryObj } from '@storybook/angular';
import { LogoCarouselComponent } from './logo-carousel.component';

const meta: Meta<LogoCarouselComponent> = {
  title: 'Komponenten/LogoCarousel',
  component: LogoCarouselComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.logo-carousel` (css/components.css). Sets von je 5 Logo-Kacheln, ' +
          'automatischer Crossfade (autoplay, respektiert prefers-reduced-motion), pausierbar ' +
          'über den Pause-Button, Dots wählen ein Set. Logos sind Platzhalter (.logo-placeholder).',
      },
    },
  },
  argTypes: {
    interval: { control: { type: 'number', min: 1000, step: 500 } },
  },
  args: { interval: 3000, active: 0 },
};
export default meta;

type Story = StoryObj<LogoCarouselComponent>;

export const Interaktiv: Story = {};
