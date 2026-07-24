import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { TopnavComponent } from '@conciso/design-system-angular';

// Echtes Conciso-Logo laut Doku (logo-conciso.svg / -light.svg), via staticDir
// (.storybook/main.ts → /conciso/images) serviert. Theme-Swap (hell/dunkel) über
// die portablen Klassen .logo-themed-default/-light.
const LOGO_DEFAULT = '/conciso/images/logo-conciso.svg';
const LOGO_DARK = '/conciso/images/logo-conciso-light.svg';

const meta: Meta<TopnavComponent> = {
  title: 'Organisms/Topnav',
  component: TopnavComponent,
  tags: ['autodocs'],
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
