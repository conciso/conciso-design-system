import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { themeStore, ThemeSegmentComponent } from '@conciso/design-system-angular';

const meta: Meta<ThemeSegmentComponent> = {
  title: 'Komponenten/Theme-Umschalter/Segment',
  component: ThemeSegmentComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5266',
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          'Theme-Umschalter als Segment-Leiste, als eigenständiges Element zum Hovern gedacht. ' +
          'Immer responsiv (unter 640px Icon-only) und immer animiert (Aktiv-Markierung gleitet ' +
          'als Thumb); beides fest. Einzige Option: `showSystem` (Hell/Dunkel/System vs. binär).',
      },
    },
  },
  argTypes: {
    showSystem: { control: 'boolean' },
  },
  args: {
    showSystem: true,
  },
};
export default meta;

type Story = StoryObj<ThemeSegmentComponent>;

export const Interaktiv: Story = {};

export const Binaer: Story = {
  name: 'Binär (nur Hell/Dunkel)',
  args: { showSystem: false },
};

export const WechselDunkel: Story = {
  name: 'Wechsel · Dunkel',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Klick auf „Dunkel“ verschiebt aria-pressed UND die Aktiv-Klasse (Thumb-Träger).
  // themeStore ist ein Modul-Singleton — den Ausgangswert am Ende zwingend zurücksetzen.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      const hell = c.getByRole('button', { name: 'Hell' });
      const dunkel = c.getByRole('button', { name: 'Dunkel' });
      await expect(hell).toHaveAttribute('aria-pressed', 'true');
      await expect(hell).toHaveClass('active');
      await expect(dunkel).toHaveAttribute('aria-pressed', 'false');

      await userEvent.click(dunkel);

      await expect(dunkel).toHaveAttribute('aria-pressed', 'true');
      await expect(dunkel).toHaveClass('active');
      await expect(hell).toHaveAttribute('aria-pressed', 'false');
      await expect(hell).not.toHaveClass('active');
    } finally {
      themeStore.set(original);
    }
  },
};

export const IconStrichstaerke: Story = {
  name: 'Icon-Strichstärke',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Pinnt die Strichstärke der Chrome-Icons (Lucide, ADR-0016): bisher Heroicons-Outline mit
  // 1.5 (= --icon-stroke-md), Lucide-Default wäre 2. Die Komponente setzt CDS_ICON_STROKE
  // explizit; hier wird der WIRKSAME (berechnete) Wert geprüft, damit auch eine CSS-Regel,
  // die das Attribut überschreibt, auffiele. Dekorative Icons bleiben aria-hidden.
  play: async ({ canvasElement }) => {
    const icons = canvasElement.querySelectorAll('.tbtn svg');
    await expect(icons.length).toBe(3);
    for (const svg of Array.from(icons)) {
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(parseFloat(getComputedStyle(svg).strokeWidth)).toBe(1.5);
    }
  },
};
