import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { themeStore, ThemeCycleComponent } from '@conciso/design-system-angular';

const meta: Meta<ThemeCycleComponent> = {
  title: 'Komponenten/Theme-Umschalter/Cycle-Button',
  component: ThemeCycleComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5234',
    },
    docs: {
      description: {
        component:
          'Theme-Umschalter als einzelner Icon-Button: ein Klick schaltet der Reihe nach durch die Modi, das ' +
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
  // Klicks durchlaufen Hell → Dunkel → System (und zurück), das aria-label wandert mit.
  // themeStore ist ein Modul-Singleton (geteilt mit der Storybook-Toolbar und den
  // anderen Theme-Switchern) — den Ausgangswert am Ende zwingend zurücksetzen,
  // sonst färbt der Modus in nachfolgende Stories ab.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const button = c.getByRole('button');
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Dunkel, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: System, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
    } finally {
      themeStore.set(original);
    }
  },
};

export const KlickZyklusBinaer: Story = {
  name: 'Klick-Zyklus · binär',
  args: { showSystem: false },
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Mit showSystem=false wechselt nur Hell ↔ Dunkel, „System“ wird übersprungen.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const button = c.getByRole('button');
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Dunkel, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
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
    const svg = canvasElement.querySelector('button svg') as SVGElement;
    await expect(svg).not.toBeNull();
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    await expect(parseFloat(getComputedStyle(svg).strokeWidth)).toBe(1.5);
  },
};
