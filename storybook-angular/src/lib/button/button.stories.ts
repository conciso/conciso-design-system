import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Komponenten/Buttons/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Angular-Wrapper um die CSS-Klassenfamilie `.btn` (css/components.css). ' +
          'Die Komponente erzeugt nur die passende Klassenkombination — alle Styles ' +
          'stammen aus der portablen CSS-Schicht.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['filled', 'tonal', 'elevated', 'outlined', 'text'],
      description: '.btn-filled / .btn-tonal / .btn-elevated / .btn-outlined / .btn-text',
    },
    area: {
      control: 'inline-radio',
      options: ['co', 'ki', 'es', 'wo'],
      description: '.btn-co / .btn-ki / .btn-es / .btn-wo',
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    full: { control: 'boolean' },
    onBand: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Kontakt aufnehmen',
    variant: 'filled',
    area: 'co',
    size: 'md',
    full: false,
    onBand: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Interaktiv: Story = {};

export const Varianten: Story = {
  name: 'Alle Varianten',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button variant="filled" label="Filled"></cds-button>
        <cds-button variant="tonal" label="Tonal"></cds-button>
        <cds-button variant="elevated" label="Elevated"></cds-button>
        <cds-button variant="outlined" label="Outlined"></cds-button>
        <cds-button variant="text" label="Text"></cds-button>
      </div>
    `,
  }),
};

export const Bereichsfarben: Story = {
  name: 'Bereichsfarben',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button area="co" label="Corporate"></cds-button>
        <cds-button area="ki" label="AI.Applied"></cds-button>
        <cds-button area="es" label="Eff. Software"></cds-button>
        <cds-button area="wo" label="Wirks. Orga"></cds-button>
      </div>
    `,
  }),
};

export const Groessen: Story = {
  name: 'Größen',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button size="sm" label="Small"></cds-button>
        <cds-button size="md" label="Medium"></cds-button>
        <cds-button size="lg" label="Large"></cds-button>
      </div>
    `,
  }),
};

export const Deaktiviert: Story = {
  args: { disabled: true, label: 'Nicht verfügbar' },
};
