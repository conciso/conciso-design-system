import type { Meta, StoryObj } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';

const meta: Meta<CarouselComponent> = {
  title: 'Komponenten/Medien/Carousel',
  component: CarouselComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.img-slider` (css/components.css). Crossfade-Carousel mit Prev/Next ' +
          '(.img-slider-btn) und Dots (.img-dot); aktive Slide via `.active`. Optionale ' +
          'Hero-Variante (`.img-slider-hero`). Platzhalterbild, falls keine URL.',
      },
    },
  },
  argTypes: {
    hero: { control: 'boolean' },
  },
  args: { active: 0, hero: false },
};
export default meta;

type Story = StoryObj<CarouselComponent>;

export const Interaktiv: Story = {};

export const Hero: Story = {
  args: { hero: true },
};
