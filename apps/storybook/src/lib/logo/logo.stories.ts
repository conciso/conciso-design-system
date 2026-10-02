import type { Meta, StoryObj } from '@storybook/angular-vite';
import { LogoComponent } from '@conciso/design-system-angular';

const meta: Meta<LogoComponent> = {
  title: 'Marke/Logo/Logo',
  component: LogoComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4032',
    },
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
    label: { description: 'Firmen-/Markenname, Alt-Fallback und Text-Platzhalter.' },
    src: { description: 'Bildquelle (URL/Data-URI). Gesetzt → Bild statt Text.' },
    alt: { description: 'Alt-Text des Bilds (Fallback: `label`).' },
  },
};
export default meta;

type Story = StoryObj<LogoComponent>;

/** Mit Bild: das Conciso-Logo als Stellvertreter (Kacheln liegen randlos auf weißer Platte). */
export const MitBild: Story = {
  parameters: { snapshot: { skip: true } },
  args: { label: 'Conciso', src: './conciso/brand/logo-conciso.svg' },
};

/** Ohne Bild: Text-Platzhalter als Fallback. */
export const TextFallback: Story = {
  // TODO: snapshot.skip entfernen, sobald visual.yml auf main ist und Baselines
  // erzeugt werden können (CI schreibt neue Snapshots nicht selbst).
  parameters: { snapshot: { skip: true } },
  args: { label: 'NORDWIND' },
};

/**
 * Die drei Wortmarken-Varianten, jeweils auf dem Grund, für den sie gedacht sind:
 * Standard (Vollfarbe) auf heller Platte, Mono dunkel (ohne Punkt) auf festem Hellgrau,
 * Mono hell (Weiß) auf dunklem Grund. Dateien: `logo-conciso.svg`, `logo-conciso-dark.svg`
 * und `logo-conciso-light.svg`.
 */
export const Wortmarken: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => ({
    moduleMetadata: { imports: [LogoComponent] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
        <figure style="margin:0">
          <div style="background:var(--bg-plate);border:var(--bd-strong);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Standard" src="./conciso/brand/logo-conciso.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Standard</figcaption>
        </figure>
        <figure style="margin:0">
          <div style="background:#F5F7F7;border:var(--bd-strong);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Mono dunkel" src="./conciso/brand/logo-conciso-dark.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Mono dunkel</figcaption>
        </figure>
        <figure style="margin:0">
          <div style="background:var(--n-700);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Mono hell" src="./conciso/brand/logo-conciso-light.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Mono hell auf dunklem Grund</figcaption>
        </figure>
      </div>
    `,
  }),
};
