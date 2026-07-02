import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Komponenten/Eingaben & Formulare/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  // Der Datenschutz-Link (.body-link) ist Corporate — die Bereichs-Tönung ist ein
  // SEITEN-Zustand, nicht Sache der Checkbox. Über den Toolbar-Umschalter „Bereich"
  // (preview.ts) lässt sich der echte .ep-page[data-accent]-Kontext zuschalten; dann
  // tönt der CSS-Kern den Link. Bewusst entkoppelt vom `area`-Input der Komponente.
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Einwilligungs-Feld: ein natives Kontrollkästchen mit Bereichsfarbe (accent-color) ' +
          'und einem Label, das den Einwilligungstext samt optional verlinktem Datenschutz' +
          'hinweis trägt. Typische Verwendung: Newsletter- und DSGVO-Einwilligung, meist als ' +
          'Pflichtfeld. WCAG AA.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    required: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label:
      'Ich bin einverstanden, dass meine E-Mail-Adresse für den Versand des Newsletters verwendet wird.',
    linkLabel: 'Datenschutzhinweise',
    linkHref: '#',
    required: true,
    checked: false,
    disabled: false,
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Interaktiv: Story = {};
