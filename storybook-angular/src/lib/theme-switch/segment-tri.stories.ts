import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { themeStore, ThemeSegmentComponent } from '@conciso/design-system-angular';

const meta: Meta<ThemeSegmentComponent> = {
  title: 'Molecules/Theme-Segment',
  component: ThemeSegmentComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Theme-Umschalter als Segment-Leiste — als eigenständiges Element zum Hovern gedacht. ' +
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
