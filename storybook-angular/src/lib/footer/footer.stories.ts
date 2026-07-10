import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FooterBottomComponent } from './footer-bottom.component';
import { FooterComponent } from './footer.component';
import { FooterMainComponent } from './footer-main.component';

const meta: Meta<FooterComponent> = {
  title: 'Organisms/Footer',
  component: FooterComponent,
  decorators: [moduleMetadata({ imports: [FooterComponent, FooterMainComponent, FooterBottomComponent] })],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Projektion aus zwei Kind-Komponenten; neue Story-Struktur ohne passende Baseline
    // (visual.yml noch nicht auf main) → skip; nach dem Merge Baseline erzeugen.
    snapshot: { skip: true },
    docs: {
      description: {
        component:
          'Kompletter Seitenfuß als `<footer>`-Landmark. Die zwei Bänder werden als ' +
          '`<cds-footer-main>` (oben) und `<cds-footer-bottom>` (unten) projiziert und lassen ' +
          'sich einzeln konfigurieren/betrachten (siehe „Oberer Teil" / „Unterer Teil"). Hier ' +
          'die Standard-Zusammensetzung.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<FooterComponent>;

export const Interaktiv: Story = {
  render: () => ({
    template: `
      <cds-footer>
        <cds-footer-main></cds-footer-main>
        <cds-footer-bottom></cds-footer-bottom>
      </cds-footer>
    `,
  }),
};
