import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { CarouselComponent } from '@conciso/design-system-angular';

const meta: Meta<CarouselComponent> = {
  title: 'Organisms/Carousel',
  component: CarouselComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bild-Carousel zur Integration in Seiteninhalt: mehrere Bilder wechseln per ' +
          'Crossfade, gesteuert über Vor-/Zurück-Buttons und Dots, mit optionaler Bildunterschrift. ' +
          'Neben der eingebetteten Standardvariante gibt es eine großformatige Hero-Variante für ' +
          'den Seitenkopf. Kein Autoplay – der Wechsel erfolgt nur per Nutzeraktion; der ' +
          'Überblendübergang wird bei `prefers-reduced-motion` abgeschaltet. Barrierefrei nach WCAG 2.1 AA.',
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
  // Weiterblättern: „Nächste" wählt den zweiten Dot (role="tab" + aria-selected).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab', { name: /^Folie / });
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(c.getByRole('button', { name: 'Nächste Slide' }));
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'false');
  },
};

export const Hero: Story = {
  args: { hero: true },
};
