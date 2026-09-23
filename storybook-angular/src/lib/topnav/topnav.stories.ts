import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { TopnavComponent } from '@conciso/design-system-angular';

// Echtes Conciso-Logo laut Doku (logo-conciso.svg / -light.svg), via staticDir
// (.storybook/main.ts → /conciso/brand) serviert. Theme-Swap (hell/dunkel) über
// die portablen Klassen .logo-themed-default/-light.
const LOGO_DEFAULT = '/conciso/brand/logo-conciso.svg';
const LOGO_DARK = '/conciso/brand/logo-conciso-light.svg';

const meta: Meta<TopnavComponent> = {
  title: 'Komponenten/Navigation/Topnav',
  component: TopnavComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hauptnavigation der Customer-Pages: Logo (Text ODER Bild/SVG mit Theme-Swap) und ' +
          'Top-Level-Links mit aufklappbaren Submenüs links, rechts optional Suche, der ' +
          'Theme-Cycle-Button und ein optionaler Kontakt-Button als Call-to-Action. Der aktive ' +
          'Eintrag (genau einer, via `activeHref`) wird über einen dezenten Unterstrich und ' +
          'Bereichsfarbe markiert. Barrierefrei nach WCAG 2.1 AA.',
      },
    },
  },
  argTypes: {
    logo: { control: 'text' },
    logoSrc: { control: 'text' },
    logoDarkSrc: { control: 'text' },
    logoAlt: { control: 'text' },
    ctaLabel: { control: 'text' },
    activeHref: { control: 'text' },
    showSearch: { control: 'boolean' },
    showCta: { control: 'boolean' },
    showSystemTheme: { control: 'boolean' },
  },
  args: {
    logo: 'conciso.',
    logoSrc: LOGO_DEFAULT,
    logoDarkSrc: LOGO_DARK,
    logoAlt: 'Conciso',
    ctaLabel: 'Kontakt',
    activeHref: '#kontakt',
    showSearch: true,
    showCta: true,
    showSystemTheme: true,
  },
};
export default meta;

type Story = StoryObj<TopnavComponent>;

export const Interaktiv: Story = {
  parameters: {
    // Nutzt jetzt das Bild-Logo (Default) → Rendering weicht von der eingecheckten
    // Text-Logo-Baseline ab. visual.yml liegt noch nicht auf main (kein
    // workflow_dispatch) → nach dem Merge Baseline neu erzeugen + snapshot.skip
    // entfernen.
    snapshot: { skip: true },
  },
  // Submenü öffnet per Klick (aria-expanded) und schließt mit Escape.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: /Leistungen/ });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Single Source of Truth: höchstens ein Eintrag ist aktiv (aria-current="page").
    await expect(canvasElement.querySelectorAll('[aria-current="page"]')).toHaveLength(1);

    // Fokus-Rückgabe (WCAG 2.4.3): Submenü per Tastatur öffnen, mit Tab hinein
    // fokussieren, Escape schließt UND gibt den Fokus an den Toggle zurück — die
    // CSS blendet .ep-nav-sub per display:none aus, sobald .is-open fehlt, das
    // fokussierte Element verschwindet sonst und der Fokus fiele ans <body>.
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    const subLink = c.getByRole('link', { name: 'Angewandte KI' });
    await expect(subLink).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveFocus();
  },
};

export const Minimal: Story = {
  name: 'Ohne Suche & Kontakt',
  // Neue Story ohne eingecheckte Baseline (visual.yml noch nicht auf main → keine
  // Baseline-Erzeugung möglich); nach dem Merge Baseline erzeugen + skip entfernen.
  parameters: { snapshot: { skip: true } },
  args: { showSearch: false, showCta: false },
  // Suche und CTA sind optional abschaltbar; Lupe + Theme-Switcher bleiben trotzdem
  // rechtsbündig (siehe margin-left-Fix in der Komponente).
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.ep-nav-search')).toBeNull();
    await expect(canvasElement.querySelector('a.btn')).toBeNull();
  },
};

export const DoppelteLabels: Story = {
  name: 'Doppelte Labels',
  // Regressionstest: gleich beschriftete Haupt- und Untermenüpunkte sind zulässig
  // und dürfen das Rendern nicht abbrechen (NG0955 bei Tracking per Label).
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    links: [
      { label: 'Leistungen', sub: [{ label: 'Übersicht', href: '#l' }, { label: 'Beratung', href: '#b' }] },
      { label: 'Wissen', sub: [{ label: 'Übersicht', href: '#w' }, { label: 'Übersicht', href: '#w2' }] },
      { label: 'Wissen', href: '#wissen' },
    ],
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('nav.ep-nav-links > *')).toHaveLength(3);
    await expect(canvasElement.querySelectorAll('.ep-nav-sub a')).toHaveLength(4);
  },
};
