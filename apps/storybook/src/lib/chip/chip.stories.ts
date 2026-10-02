import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { ChipComponent } from '@conciso/design-system-angular';

const meta: Meta<ChipComponent> = {
  title: 'Komponenten/Chips, Badges & Pills/Chip',
  component: ChipComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=3-1781',
    },
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

export const LesbarerZustand: Story = {
  name: 'Lesbarer Zustand',
  parameters: {
    controls: { disable: true },
    // Geklickter/fokussierter Endzustand → nicht deterministisch snapshotten.
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Die `cds-chip` sind per `[(pressed)]` an ein Filter-Array gebunden; ' +
          'ein Klick togglet `aria-pressed`, emittiert `pressedChange` und ' +
          'aktualisiert die Liste der aktiven Filter, genau so konsumiert man ' +
          'den Status im echten Code.',
      },
    },
  },
  render: () => {
    const filters = [
      { label: 'Corporate', area: 'co', pressed: true },
      { label: 'Angewandte KI', area: 'ki', pressed: false },
      { label: 'Effektive Software', area: 'es', pressed: false },
      { label: 'Wirksame Organisationen', area: 'wo', pressed: false },
    ];
    return {
      moduleMetadata: { imports: [ChipComponent] },
      props: {
        filters,
        aktiveLabels: () =>
          filters
            .filter((f) => f.pressed)
            .map((f) => f.label)
            .join(', ') || '(leer)',
      },
      template: `
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          @for (f of filters; track f.label) {
            <cds-chip [label]="f.label" [area]="f.area" [(pressed)]="f.pressed"></cds-chip>
          }
        </div>
        <p style="margin-top:16px;font:14px/1.4 system-ui,sans-serif">
          Aktiv: <strong>{{ aktiveLabels() }}</strong>
        </p>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    // Start: nur „Corporate“ ist aktiv.
    await expect(c.getByRole('button', { name: 'Corporate' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(canvasElement).toHaveTextContent('Aktiv: Corporate');
    // Klick auf „Angewandte KI“ → Zustand wird ausgelesen und angezeigt.
    await userEvent.click(c.getByRole('button', { name: 'Angewandte KI' }));
    await expect(canvasElement).toHaveTextContent('Aktiv: Corporate, Angewandte KI');
    // Erneuter Klick auf „Corporate“ → wieder abgewählt.
    await userEvent.click(c.getByRole('button', { name: 'Corporate' }));
    await expect(canvasElement).toHaveTextContent('Aktiv: Angewandte KI');
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
        <cds-chip area="ki" label="Angewandte KI" [pressed]="true"></cds-chip>
      </div>
    `,
  }),
};
