import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeSelectComponent } from './select.component';

const meta: Meta<ThemeSelectComponent> = {
  title: 'Molecules/Theme-Dropdown',
  component: ThemeSelectComponent,
  tags: ['autodocs'],
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
