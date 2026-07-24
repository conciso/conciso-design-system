import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeSegmentComponent } from '@conciso/design-system-angular';

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
