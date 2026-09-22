import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { CarouselComponent } from '@conciso/design-system-angular';

const meta: Meta<CarouselComponent> = {
  title: 'Komponenten/Slider & Carousel/Carousel',
  component: CarouselComponent,
  tags: ['autodocs', 'angular'],
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
  args: {
    active: 0,
    hero: false,
    slides: [
      { title: 'Strategie-Workshop', text: 'Gemeinsam Ziele schärfen und Prioritäten setzen.' },
      { title: 'Team-Enablement', text: 'Wissen teilen, Verantwortung verteilen, Wirkung erhöhen.' },
      { title: 'Go-Live', text: 'Vom Prototyp zur produktiven Lösung, messbar und stabil.' },
    ],
  },
};
export default meta;

type Story = StoryObj<CarouselComponent>;

export const Interaktiv: Story = {
  // Weiterblättern: „Nächste“ wählt den zweiten Dot (role="tab" + aria-selected).
  // Zusätzlich: inaktive Slides tragen aria-hidden, sonst läse ein Screenreader
  // Titel/Text aller Folien vor (siehe slider-verwendung.mdx).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab', { name: /^Folie / });
    // Slides sind für Screenreader per role="group" gruppiert. `hidden: true` ist
    // nötig, weil Testing Library aria-hidden-Elemente sonst aus der Rollen-Query
    // ausschließt – genau das wollen wir hier ja prüfen.
    const slides = c.getAllByRole('group', { name: /^Folie /, hidden: true });
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    await expect(slides[1]).toHaveAttribute('aria-hidden', 'true');

    await userEvent.click(c.getByRole('button', { name: 'Nächste Slide' }));
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'false');
    await expect(slides[1]).toHaveAttribute('aria-hidden', 'false');
    await expect(slides[0]).toHaveAttribute('aria-hidden', 'true');
  },
};

export const Hero: Story = {
  args: { hero: true },
};

export const TastaturDots: Story = {
  name: 'Tastatur (Dots)',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Dot-Leiste (role=tab in role=tablist): roving tabindex, ArrowRight/-Left mit
  // Umlauf in beide Richtungen, Home/End an die Enden, Fokus wandert mit (identische
  // Logik wie LogoCarousel, ../shared/dots-keyboard.ts).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab', { name: /^Folie / });
    dots[0].focus();
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[1]).toHaveFocus();

    // Umlauf vorwärts: ArrowRight am letzten Dot springt zum ersten.
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    // Umlauf rückwärts: ArrowLeft am ersten Dot springt zum letzten.
    await userEvent.keyboard('{ArrowLeft}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[dots.length - 1]).toHaveFocus();

    await userEvent.keyboard('{Home}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[dots.length - 1]).toHaveFocus();
  },
};
