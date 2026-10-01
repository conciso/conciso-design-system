import type { Meta, StoryObj } from '@storybook/angular-vite';
import { StatusBadgeComponent } from '@conciso/design-system-angular';

const meta: Meta<StatusBadgeComponent> = {
  title: 'Komponenten/Chips, Badges & Pills/Status-Badge',
  component: StatusBadgeComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    docs: {
      description: {
        component:
          'Passive Zustands-Kennzeichnung: ein kleines, nicht interaktives Label, das den ' +
          'Status eines Elements über semantische Farben trägt — OK, Warnung, Fehler oder ' +
          'Neutral (z. B. Live, Beta, Deprecated, Draft). Für die Zuordnung zu einer Brand ' +
          'Area die Bereichs-Badge, für interaktive Filter den Chip nutzen.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['ok', 'warn', 'err', 'neu'],
      description: 'Status-Ton: OK, Warnung, Fehler oder Neutral',
    },
  },
  args: { label: 'Live', tone: 'ok' },
};
export default meta;

type Story = StoryObj<StatusBadgeComponent>;

export const Interaktiv: Story = {};

export const Toene: Story = {
  name: 'Alle Töne',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [StatusBadgeComponent] },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-status-badge tone="ok" label="Live"></cds-status-badge>
        <cds-status-badge tone="warn" label="Beta"></cds-status-badge>
        <cds-status-badge tone="err" label="Deprecated"></cds-status-badge>
        <cds-status-badge tone="neu" label="Draft"></cds-status-badge>
      </div>
    `,
  }),
};
