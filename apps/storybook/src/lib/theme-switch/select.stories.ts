import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { themeStore, ThemeSelectComponent } from '@conciso/design-system-angular';

const meta: Meta<ThemeSelectComponent> = {
  title: 'Komponenten/Theme-Umschalter/Dropdown',
  component: ThemeSelectComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Theme-Umschalter auf Basis unseres Custom Select (gestylte Listbox mit Häkchen). ' +
          'Vorgesehener Einsatz: nur in den Einstellungen (Settings), NICHT als persistentes ' +
          'Element auf allen Seiten. `showSystem` schaltet zwischen Hell/Dunkel/System und binär.',
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

type Story = StoryObj<ThemeSelectComponent>;

export const Interaktiv: Story = {};

export const Binaer: Story = {
  name: 'Binär (nur Hell/Dunkel)',
  args: { showSystem: false },
};

export const OptionWaehlen: Story = {
  name: 'Option wählen',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Option „Dunkel“ wählen ändert den Modus im themeStore. Modul-Singleton — den
  // Ausgangswert am Ende zwingend zurücksetzen, sonst färbt der Modus in
  // nachfolgende Stories ab.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await userEvent.click(c.getByRole('button'));
      await userEvent.click(c.getByRole('option', { name: 'Dunkel' }));
      await waitFor(() => expect(themeStore.mode()).toBe('dark'));
      await expect(c.getByRole('button')).toHaveTextContent('Dunkel');
    } finally {
      themeStore.set(original);
    }
  },
};
