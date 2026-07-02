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
    full: { control: 'boolean', description: 'Volle Breite (.btn-full)' },
    // Nur mit variant="filled" definiert (Doku-Konvention) → Control erscheint
    // nur dann; die Story rendert dazu das farbige Bereichs-Band als Kontext.
    onBand: {
      control: 'boolean',
      if: { arg: 'variant', eq: 'filled' },
      description: 'Invertiert für farbige Bereichs-Bänder (.btn-on-band, nur filled)',
    },
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

export const Interaktiv: Story = {
  // padded statt centered: im zentrierten Flex-Canvas schrumpft der Story-Root
  // auf Inhaltsbreite, wodurch .btn-full (width:100%) nie sichtbar würde.
  parameters: { layout: 'padded' },
  // Bei onBand den Button auf dem farbigen Bereichs-Band zeigen (wie in der Doku,
  // Band = --XX-700 bzw. ki-800) — auf weißem Canvas wäre die Invertierung nicht
  // beurteilbar. Ohne onBand exakt das ungerahmte Standard-Rendering.
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ButtonComponent] },
    template: `
      @if (onBand && variant === 'filled') {
        <div [style.background]="'var(--' + area + (area === 'ki' ? '-800' : '-700') + ')'" style="padding:24px;border-radius:var(--r-md)">
          <cds-button [label]="label" [variant]="variant" [area]="area" [size]="size" [full]="full" [onBand]="onBand" [disabled]="disabled" />
        </div>
      } @else {
        <cds-button [label]="label" [variant]="variant" [area]="area" [size]="size" [full]="full" [onBand]="onBand" [disabled]="disabled" />
      }
    `,
  }),
};

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
