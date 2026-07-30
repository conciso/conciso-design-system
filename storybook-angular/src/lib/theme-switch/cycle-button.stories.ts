import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeCycleComponent } from './cycle-button.component';

const meta: Meta<ThemeCycleComponent> = {
  title: 'Atoms/Theme-Cycle-Button',
  component: ThemeCycleComponent,
  tags: ['autodocs'],
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
