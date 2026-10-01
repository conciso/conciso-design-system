import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { LogoCarouselComponent } from '@conciso/design-system-angular';

const meta: Meta<LogoCarouselComponent> = {
  title: 'Komponenten/Slider & Carousel/LogoCarousel',
  component: LogoCarouselComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Automatischer Wechsler für Kundenlogos: Sets von je fünf Logos wechseln per Crossfade ' +
          'und lassen sich über Dots gezielt ansteuern. Jede Kachel ist ein `cds-logo` – bevorzugt ' +
          'ein Bild (`src`), sonst der Text als Platzhalter/Fallback. Die Animation pausiert bei ' +
          'Hover und Tastatur-Fokus, zusätzlich über einen Pause-Button, und ruht bei reduzierter ' +
          'Bewegung. Barrierefrei nach WCAG 2.1 AA.',
      },
    },
  },
  argTypes: {
    interval: {
      description: 'Autoplay-Intervall in **Millisekunden** (Standard 6000 = 6 s).',
      control: { type: 'number', min: 1000, step: 500 },
    },
  },
  args: {
    interval: 6000,
    active: 0,
    sets: [
      [
        { label: 'NORDWIND' },
        { label: 'MERIDIAN' },
        { label: 'AVERA' },
        { label: 'KONTUR' },
        { label: 'STELLA' },
      ],
      [
        { label: 'VOLTAIC' },
        { label: 'HEXAGON' },
        { label: 'LUMEN' },
        { label: 'PRAXIS' },
        { label: 'ORBIT' },
      ],
      [
        { label: 'CASCADE' },
        { label: 'VERTEX' },
        { label: 'NIMBUS' },
        { label: 'FORGE' },
        { label: 'ATLAS' },
      ],
    ],
  },
};
export default meta;

type Story = StoryObj<LogoCarouselComponent>;

export const Interaktiv: Story = {
  // Kein Visual-Snapshot: Autoplay ist timer-getrieben (setInterval), der aktive
  // Frame hängt vom Screenshot-Timing ab → nicht deterministisch. Funktion + a11y
  // sind über den play-Test unten abgedeckt.
  parameters: { snapshot: { skip: true } },
  // Pause-Button stoppt das Autoplay und startet es wieder. Das Label wechselt zwischen
  // „Logo-Animation pausieren“ und „Logo-Animation fortsetzen“, `aria-pressed` fehlt
  // bewusst (sonst sagt der Screenreader den Zustand doppelt an).
  // Wichtig: am Ende wieder auf „pausieren“ (= läuft) und Fokus vom Carousel weg,
  // damit die Default-Story sichtbar autoplayt (Fokus/Hover pausieren sonst transient).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const pause = c.getByRole('button', { name: /Logo-Animation (pausieren|fortsetzen)/ });
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    await expect(pause).not.toHaveAttribute('aria-pressed');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
    await expect(pause).not.toHaveAttribute('aria-pressed');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    // Fokus aus dem Carousel nehmen → Fokus-Pause endet, Autoplay läuft sichtbar.
    (pause as HTMLElement).blur();
  },
};

export const TastaturDots: Story = {
  name: 'Tastatur (Dots)',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Dot-Leiste (role=tab in role=tablist): roving tabindex, ArrowRight mit Umlauf,
  // Home/End an die Enden, Fokus wandert mit (1:1 wie beim Carousel).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab');
    dots[0].focus();
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[1]).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[dots.length - 1]).toHaveFocus();

    await userEvent.keyboard('{Home}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();
  },
};

export const DotKlickPausiert: Story = {
  name: 'Dot-Klick pausiert dauerhaft',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Ein Klick auf einen Dot springt zum Set und pausiert dauerhaft: der Pause-Button
  // zeigt „fortsetzen“, das Karussell trägt `.paused`. Erst der Button startet neu.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab');
    const pause = c.getByRole('button', { name: 'Logo-Animation pausieren' });
    await userEvent.click(dots[1]);
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
    await expect(canvasElement.querySelector('.logo-carousel')).toHaveClass('paused');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    await expect(canvasElement.querySelector('.logo-carousel')).not.toHaveClass('paused');
    (pause as HTMLElement).blur();
  },
};

export const TastaturPausiertUndHoch: Story = {
  name: 'Tastatur pausiert, Auf/Ab wie Links/Rechts',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // ↓ wirkt wie →, ↑ wie ←; jede Dot-Taste (auch Home/End) pausiert dauerhaft.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab');
    const pause = c.getByRole('button', { name: /Logo-Animation/ });
    dots[0].focus();
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');

    await userEvent.keyboard('{ArrowDown}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[1]).toHaveFocus();
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');

    await userEvent.keyboard('{ArrowUp}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    // Umlauf rückwärts mit ↑ am ersten Dot.
    await userEvent.keyboard('{ArrowUp}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    dots[0].focus();
    await userEvent.keyboard('{Home}');
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
  },
};

export const ReduzierteBewegung: Story = {
  name: 'Reduzierte Bewegung ohne Pause-Button',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Bei `prefers-reduced-motion: reduce` läuft kein Timer, also gibt es nichts zu
  // pausieren: der Pause-Button ist versteckt, die Dots bleiben bedienbar.
  beforeEach: () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;
    return () => {
      window.matchMedia = original;
    };
  },
  play: async ({ canvasElement }) => {
    const pause = canvasElement.querySelector<HTMLElement>('.logo-carousel-pause');
    await expect(pause).toHaveAttribute('hidden');
    await expect(pause).not.toBeVisible();
    const dots = within(canvasElement).getAllByRole('tab');
    await userEvent.click(dots[1]);
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
  },
};

/**
 * Reale Logos sind Bilder (`src`). Kacheln ohne Bild fallen auf den Text-`label`
 * als Platzhalter zurück – so bleibt das Set auch bei fehlendem Asset vollständig.
 * (Hier das Conciso-Logo als Stellvertreter; echte Anwendungen übergeben Kundenlogos.)
 */
export const MitBildern: Story = {
  parameters: { snapshot: { skip: true } },
  args: {
    sets: [
      [
        { label: 'Conciso', src: './conciso/brand/logo-conciso.svg' },
        { label: 'Conciso', src: './conciso/brand/logo-conciso.svg' },
        { label: 'NORDWIND' },
        { label: 'Conciso', src: './conciso/brand/logo-conciso.svg' },
        { label: 'MERIDIAN' },
      ],
      [
        { label: 'AVERA' },
        { label: 'Conciso', src: './conciso/brand/logo-conciso.svg' },
        { label: 'KONTUR' },
        { label: 'Conciso', src: './conciso/brand/logo-conciso.svg' },
        { label: 'STELLA' },
      ],
    ],
  },
};
