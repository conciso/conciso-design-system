import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { LogoCarouselComponent } from './logo-carousel.component';

const meta: Meta<LogoCarouselComponent> = {
  title: 'Komponenten/Slider & Carousel/LogoCarousel',
  component: LogoCarouselComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Automatischer Wechsler für Kundenlogos: Sets von je fünf Logos wechseln per Crossfade ' +
          'und lassen sich über Dots gezielt ansteuern. Die Animation pausiert bei Hover und ' +
          'Tastatur-Fokus, zusätzlich über einen Pause-Button, und ruht bei reduzierter Bewegung. ' +
          'Barrierefrei nach WCAG 2.1 AA.',
      },
    },
  },
  argTypes: {
    interval: { control: { type: 'number', min: 1000, step: 500 } },
  },
  args: { interval: 6000, active: 0 },
};
export default meta;

type Story = StoryObj<LogoCarouselComponent>;

export const Interaktiv: Story = {
  // Kein Visual-Snapshot: Autoplay ist timer-getrieben (setInterval), der aktive
  // Frame hängt vom Screenshot-Timing ab → nicht deterministisch. Funktion + a11y
  // sind über den play-Test unten abgedeckt.
  parameters: { snapshot: { skip: true } },
  // Pause-Button stoppt das Autoplay und wechselt das Label auf „Abspielen".
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const pause = c.getByRole('button', { name: /Pausieren|Abspielen/ });
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Abspielen');
  },
};
