import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { themeStore, ThemeCycleComponent } from '@conciso/design-system-angular';

const meta: Meta<ThemeCycleComponent> = {
  title: 'Komponenten/Theme-Umschalter/Cycle-Button',
  component: ThemeCycleComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    docs: {
      description: {
        component:
          'Theme-Umschalter als einzelner Icon-Button: ein Klick zyklt durch die Modi, das ' +
          'Icon zeigt den aktuellen. Vorgesehener Einsatz: im Header (kompakt, ein Tap). ' +
          '`showSystem` schaltet zwischen Hell/Dunkel/System und binär Hell/Dunkel.',
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

type Story = StoryObj<ThemeCycleComponent>;

export const Interaktiv: Story = {};

export const Binaer: Story = {
  name: 'Binär (nur Hell/Dunkel)',
  args: { showSystem: false },
};

export const KlickZyklus: Story = {
  name: 'Klick-Zyklus',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Klick zyklt Hell → Dunkel → System (und zurück), das aria-label wandert mit.
  // themeStore ist ein Modul-Singleton (geteilt mit der Storybook-Toolbar und den
  // anderen Theme-Switchern) — den Ausgangswert am Ende zwingend zurücksetzen,
  // sonst färbt der Modus in nachfolgende Stories ab.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const button = c.getByRole('button');
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell — klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Dunkel — klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: System — klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell — klicken zum Wechseln');
    } finally {
      themeStore.set(original);
    }
  },
};

export const KlickZyklusBinaer: Story = {
  name: 'Klick-Zyklus · binär',
  args: { showSystem: false },
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Mit showSystem=false zyklt nur Hell ↔ Dunkel, „System“ wird übersprungen.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const button = c.getByRole('button');
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell — klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Dunkel — klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell — klicken zum Wechseln');
    } finally {
      themeStore.set(original);
    }
  },
};
