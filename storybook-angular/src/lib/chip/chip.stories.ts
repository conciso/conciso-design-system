import type { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent, expect } from 'storybook/test';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Komponenten/Chips, Badges & Pills/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interaktiver Filter-Chip: ein umschaltbares Element, das eine Auswahl ' +
          'aktiviert oder deaktiviert, etwa in Bereichs-Filtern von Listing-Seiten. ' +
          'Optional je Brand Area farblich codiert.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: [undefined, 'co', 'ki', 'es', 'wo'] },
    pressed: { control: 'boolean' },
  },
  args: { label: 'Filter', area: undefined, pressed: false },
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
