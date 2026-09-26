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
      {
        title: 'Team-Enablement',
        text: 'Wissen teilen, Verantwortung verteilen, Wirkung erhöhen.',
      },
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
    // Bewusst über die Klasse statt über die Rolle: `aria-hidden="true"` nimmt ein
    // Element aus dem Accessibility-Baum, damit verliert es Rolle UND berechenbaren
    // Namen. `getAllByRole('group', { name: …, hidden: true })` findet die inaktiven
    // Folien deshalb nicht — der Namensfilter läuft ins Leere. Geprüft wird hier
    // ohnehin das Attribut selbst, nicht die Auffindbarkeit (gleiches Vorgehen wie
    // in topnav.stories.ts für `[aria-current]`).
    const slides = canvasElement.querySelectorAll('.img-slide');
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

export const DoppelteTitel: Story = {
  name: 'Doppelte Titel',
  // Regressionstest: gleich betitelte Slides sind zulässig und dürfen das Rendern
  // nicht abbrechen (NG0955 bei Tracking per Titel), weder bei Slides noch Dots.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    slides: [
      { title: 'Workshop', text: 'Erster Termin.' },
      { title: 'Workshop', text: 'Zweiter Termin.' },
    ],
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.img-slide')).toHaveLength(2);
    await expect(canvasElement.querySelectorAll('.img-dot')).toHaveLength(2);
  },
};
