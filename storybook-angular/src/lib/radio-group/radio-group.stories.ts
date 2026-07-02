import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from './radio-group.component';

const meta: Meta<RadioGroupComponent> = {
  title: 'Komponenten/Eingaben & Formulare/Radio',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Optionsfelder für 2–6 sich gegenseitig ausschließende Optionen (mehr → Auswahlfeld, ' +
          'Mehrfachauswahl → Checkbox). Native Radio-Buttons mit Bereichsfarbe (accent-color), ' +
          'gruppiert in fieldset/legend, sodass Screenreader Frage und Optionen als ' +
          'zusammengehörig ansagen. WCAG AA.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    legend: 'Bevorzugter Kontaktweg',
    options: ['E-Mail', 'Telefon', 'Beides'],
    value: 'E-Mail',
    required: false,
    disabled: false,
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<RadioGroupComponent>;

export const Interaktiv: Story = {};
