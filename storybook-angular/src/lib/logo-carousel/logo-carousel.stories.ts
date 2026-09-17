import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { LogoCarouselComponent } from '@conciso/design-system-angular';

const meta: Meta<LogoCarouselComponent> = {
  title: 'Organisms/LogoCarousel',
  component: LogoCarouselComponent,
  tags: ['autodocs'],
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
      [{ label: 'NORDWIND' }, { label: 'MERIDIAN' }, { label: 'AVERA' }, { label: 'KONTUR' }, { label: 'STELLA' }],
      [{ label: 'VOLTAIC' }, { label: 'HEXAGON' }, { label: 'LUMEN' }, { label: 'PRAXIS' }, { label: 'ORBIT' }],
      [{ label: 'CASCADE' }, { label: 'VERTEX' }, { label: 'NIMBUS' }, { label: 'FORGE' }, { label: 'ATLAS' }],
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
  // Pause-Button stoppt das Autoplay (Label „Abspielen“) und startet es wieder.
  // Wichtig: am Ende wieder auf „Pausieren“ (= läuft) und Fokus vom Carousel weg,
  // damit die Default-Story sichtbar autoplayt (Fokus/Hover pausieren sonst transient).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const pause = c.getByRole('button', { name: /Pausieren|Abspielen/ });
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Abspielen');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Pausieren');
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
        { label: 'Conciso', src: '/conciso/brand/logo-conciso.svg' },
        { label: 'Conciso', src: '/conciso/brand/logo-conciso.svg' },
        { label: 'NORDWIND' },
        { label: 'Conciso', src: '/conciso/brand/logo-conciso.svg' },
        { label: 'MERIDIAN' },
      ],
      [
        { label: 'AVERA' },
        { label: 'Conciso', src: '/conciso/brand/logo-conciso.svg' },
        { label: 'KONTUR' },
        { label: 'Conciso', src: '/conciso/brand/logo-conciso.svg' },
        { label: 'STELLA' },
      ],
    ],
  },
};
