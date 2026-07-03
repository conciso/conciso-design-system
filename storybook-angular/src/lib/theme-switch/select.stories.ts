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
          'Theme-Umschalter als natives Dropdown in Feld-Optik. Vorgesehener Einsatz: nur in ' +
          'den Einstellungen (Settings), NICHT als persistentes Element auf allen Seiten. ' +
          '`triState` schaltet zwischen Hell/Dunkel/System und binär Hell/Dunkel.',
      },
    },
  },
  argTypes: {
    triState: { control: 'boolean' },
  },
  args: {
    triState: true,
  },
};
export default meta;

type Story = StoryObj<ThemeSelectComponent>;

export const Interaktiv: Story = {};

export const Binaer: Story = {
  name: 'Binär (nur Hell/Dunkel)',
  args: { triState: false },
};
