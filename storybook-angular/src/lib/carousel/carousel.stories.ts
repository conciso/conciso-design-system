import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
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

export const Interaktiv: Story = {
  // Weiterblättern: „Nächste" aktiviert den zweiten Dot (aria-current).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('button', { name: /^Slide / });
    await expect(dots[0]).toHaveAttribute('aria-current', 'true');
    await userEvent.click(c.getByRole('button', { name: 'Nächste Slide' }));
    await expect(dots[1]).toHaveAttribute('aria-current', 'true');
    await expect(dots[0]).toHaveAttribute('aria-current', 'false');
  },
};

export const Hero: Story = {
  args: { hero: true },
};
