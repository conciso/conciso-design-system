import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
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

    await userEvent.click(c.getByRole('button', { name: 'Nächste Folie' }));
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

export const PfeiltastenAmSlider: Story = {
  name: 'Pfeiltasten am gesamten Slider',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  decorators: [moduleMetadata({ imports: [CarouselComponent] })],
  // Zwei Instanzen, damit die Eindeutigkeit der Folien-IDs über Instanzen hinweg geprüft wird.
  render: (args) => ({
    props: args,
    template: `
      <cds-carousel [slides]="slides" label="Projekte"></cds-carousel>
      <cds-carousel [slides]="slides" label="Referenzen"></cds-carousel>
    `,
  }),
  // ← und → wirken nicht nur auf den Dots, sondern auf dem gesamten Slider (hier mit
  // Fokus auf den Buttons), mit Umlauf; die Buttons tragen „Folie“ statt „Slide“.
  play: async ({ canvasElement }) => {
    const roots = Array.from(canvasElement.querySelectorAll<HTMLElement>('.img-slider'));
    await expect(roots).toHaveLength(2);
    // Zwei Bildstrecken auf einer Seite brauchen unterscheidbare Namen (axe: landmark-unique).
    await expect(roots[0]).toHaveAttribute('aria-label', 'Projekte');
    await expect(roots[1]).toHaveAttribute('aria-label', 'Referenzen');
    const c = within(roots[0]);
    const dots = c.getAllByRole('tab', { name: /^Folie / });
    const prev = c.getByRole('button', { name: 'Vorherige Folie' });
    const next = c.getByRole('button', { name: 'Nächste Folie' });
    await expect(c.queryByRole('button', { name: /Slide/ })).toBeNull();

    next.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(next).toHaveFocus();

    prev.focus();
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(prev).toHaveFocus();

    // Auf den Dots wandert der Fokus weiterhin mit.
    dots[dots.length - 1].focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    // Folien-IDs sind über beide Instanzen eindeutig, jeder Dot verweist auf seine eigene Folie.
    const allIds = Array.from(canvasElement.querySelectorAll('.img-slide')).map((el) => el.id);
    await expect(new Set(allIds).size).toBe(allIds.length);
    for (const root of roots) {
      const ids = Array.from(root.querySelectorAll('.img-slide')).map((el) => el.id);
      const rootDots = Array.from(root.querySelectorAll('.img-dot'));
      await expect(rootDots).toHaveLength(ids.length);
      for (const [i, dot] of rootDots.entries()) {
        await expect(dot).toHaveAttribute('aria-controls', ids[i]);
      }
    }
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
