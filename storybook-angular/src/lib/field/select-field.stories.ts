import type { Meta, StoryObj } from '@storybook/angular';
import { SelectFieldComponent } from './select-field.component';

const meta: Meta<SelectFieldComponent> = {
  title: 'Molecules/Auswahlfeld',
  component: SelectFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Auswahlfeld (Dropdown): Label, Select, Hilfetext und Fehlermeldung als ' +
          'zusammenhängende Einheit. Die erste Option dient üblicherweise als Platzhalter. ' +
          'Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.',
      },
    },
  },
  argTypes: {
    required: { control: 'boolean' },
  },
  args: {
    label: 'Bereich',
    options: ['Bitte wählen', 'Corporate', 'AI.Applied', 'Eff. Software'],
    helper: 'Worum geht es?',
    error: '',
    required: false,
    fieldId: 'demo-area',
  },
};
export default meta;

type Story = StoryObj<SelectFieldComponent>;

export const Interaktiv: Story = {};
