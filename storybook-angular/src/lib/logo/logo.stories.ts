import type { Meta, StoryObj } from '@storybook/angular-vite';
import { LogoComponent } from '@conciso/design-system-angular';

const meta: Meta<LogoComponent> = {
  title: 'Marke/Logo/Logo',
  component: LogoComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Einzelne Logo-Kachel. Zeigt bevorzugt ein **Bild** (`src`); ohne Bild fällt sie auf ' +
          'den Text-`label` als Platzhalter zurück. Eigenständig nutzbar (Partner-Leiste, ' +
          '„Bekannt aus“-Reihe) oder als Baustein des `cds-logo-carousel`.',
      },
    },
  },
  argTypes: {
    label: { description: 'Firmen-/Markenname – Alt-Fallback und Text-Platzhalter.' },
    src: { description: 'Bildquelle (URL/Data-URI). Gesetzt → Bild statt Text.' },
    alt: { description: 'Alt-Text des Bilds (Fallback: `label`).' },
  },
};
export default meta;

type Story = StoryObj<LogoComponent>;

/** Mit Bild: das Conciso-Logo als Stellvertreter (Kacheln liegen randlos auf weißer Platte). */
export const MitBild: Story = {
  parameters: { snapshot: { skip: true } },
  args: { label: 'Conciso', src: '/conciso/brand/logo-conciso.svg' },
};

/** Ohne Bild: Text-Platzhalter als Fallback. */
export const TextFallback: Story = {
  // TODO: snapshot.skip entfernen, sobald visual.yml auf main ist und Baselines
  // erzeugt werden können (CI schreibt neue Snapshots nicht selbst).
  parameters: { snapshot: { skip: true } },
  args: { label: 'NORDWIND' },
};
