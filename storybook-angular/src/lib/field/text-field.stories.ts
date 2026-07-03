import type { Meta, StoryObj } from '@storybook/angular';
import { TextFieldComponent } from './text-field.component';

const meta: Meta<TextFieldComponent> = {
  title: 'Molecules/Textfeld',
  component: TextFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Einzeiliges Textfeld: verbindet Label, Eingabe, Hilfetext und Fehlermeldung ' +
          'zu einer zusammenhängenden Einheit. Über den Typ für E-Mail, Telefon, Text usw. ' +
          'Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.',
      },
    },
  },
  argTypes: {
    type: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'E-Mail',
    type: 'email',
    placeholder: 'name@firma.de',
    helper: 'Wir nutzen die Adresse ausschließlich für die Antwort.',
    error: '',
    required: true,
    fieldId: 'demo-email',
  },
};
export default meta;

type Story = StoryObj<TextFieldComponent>;

export const Interaktiv: Story = {};

export const Fehlerzustand: Story = {
  args: {
    error: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    fieldId: 'demo-email-error',
  },
};
