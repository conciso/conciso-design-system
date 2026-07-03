import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaFieldComponent } from './textarea-field.component';

const meta: Meta<TextareaFieldComponent> = {
  title: 'Molecules/Textbereich',
  component: TextareaFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Mehrzeiliges Textfeld für längere Eingaben (z. B. Nachrichten): Label, Textbereich, ' +
          'Hilfetext und Fehlermeldung als zusammenhängende Einheit. Pflichtfelder werden ' +
          'markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.',
      },
    },
  },
  argTypes: {
    required: { control: 'boolean' },
  },
  args: {
    label: 'Nachricht',
    placeholder: 'Ihre Nachricht an uns',
    helper: 'Mind. 20 Zeichen.',
    error: '',
    required: false,
    fieldId: 'demo-message',
  },
};
export default meta;

type Story = StoryObj<TextareaFieldComponent>;

export const Interaktiv: Story = {};
