import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Komponenten/Aktionen & Eingaben/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper um `.chip` (css/components.css). Toggle-Filter auf Basis von ' +
          '`aria-pressed`; optionaler Markenbereich über `[data-area]` für die ' +
          'area-aware Outline-Variante. Klick schaltet den Zustand um.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['toggle', 'tag'] },
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
    pressed: { control: 'boolean' },
  },
  args: { label: 'Filter', variant: 'toggle', area: undefined, pressed: false },
};
export default meta;

type Story = StoryObj<ChipComponent>;

export const Interaktiv: Story = {
  // Toggle-Verhalten: Klick schaltet aria-pressed um.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const chip = c.getByRole('button', { name: 'Filter' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Zustaende: Story = {
  name: 'Zustände',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [ChipComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-chip label="Inaktiv"></cds-chip>
        <cds-chip label="Aktiv" [pressed]="true"></cds-chip>
        <cds-chip area="co" label="Corporate"></cds-chip>
        <cds-chip area="ki" label="AI.Applied" [pressed]="true"></cds-chip>
      </div>
    `,
  }),
};

export const Tags: Story = {
  name: 'Statische Tags (chip t-*)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Nicht-interaktiver Bereichs-Tag (`variant="tag"`) wie in den Doku-Tabellen: ' +
          '`<span class="chip t-co">` mit area-50-Grund und kompaktem Padding.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [ChipComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-chip variant="tag" area="co" label="Corporate"></cds-chip>
        <cds-chip variant="tag" area="ki" label="Angewandte KI"></cds-chip>
        <cds-chip variant="tag" area="es" label="Eff. Software"></cds-chip>
        <cds-chip variant="tag" area="wo" label="Wirks. Org."></cds-chip>
      </div>
    `,
  }),
};
