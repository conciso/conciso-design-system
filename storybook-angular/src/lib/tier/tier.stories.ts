import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { TierComponent } from '@conciso/design-system-angular';

const meta: Meta<TierComponent> = {
  title: 'Komponenten/Cards & Teaser/Tier-Trenner',
  component: TierComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stufen-Trenner aus Label und Haarlinie (`.ep-tier`, css/components.css:1381–1384), der ' +
          'eine Offene Feature-Liste in Pakete gliedert, z. B. „In jedem Paket enthalten“ vor ' +
          '„Zusätzlich mit Pro“. Element-Selektor `cds-tier` (ADR-0008-Standardfall, siehe ' +
          'Klassendoku): keines der 4 Mockup-Vorkommen sitzt in einem Grid/Flex, das seine Kinder ' +
          "streckt, keines trägt eine `col-*`-Klasse, das Tag variiert nicht. `area` ist auf `'ki'` " +
          'typisiert, nicht auf die vollen vier Markenbereiche: `css/components.css` kennt ' +
          'ausschließlich `.ep-tier-label[data-area="ki"]`, für `co`/`es`/`wo` existiert keine ' +
          'Regel — ausgezählt in `docs/index.html`: 3 von 4 Vorkommen setzen `ki`, eines gar kein ' +
          '`data-area`, keines einen anderen Bereich. `.ep-tier-rule` ist rein dekorativ und trägt ' +
          '`aria-hidden="true"`.',
      },
    },
  },
  args: {
    label: 'In jedem Paket enthalten',
  },
};
export default meta;

type Story = StoryObj<TierComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `<cds-tier [label]="label" [area]="area"></cds-tier>`,
  }),
  // .ep-tier sitzt direkt auf dem Host (Element-Selektor, kein inneres Wrapper-Div,
  // siehe Klassendoku). Ungesetztes area (Default) schreibt kein data-area.
  play: async ({ canvasElement }) => {
    const tier = canvasElement.querySelector('cds-tier') as HTMLElement;
    await expect(tier).toHaveClass('ep-tier');

    const label = canvasElement.querySelector('.ep-tier-label') as HTMLElement;
    await expect(label).toHaveTextContent('In jedem Paket enthalten');
    await expect(label).not.toHaveAttribute('data-area');

    const rule = canvasElement.querySelector('.ep-tier-rule');
    await expect(rule).toHaveAttribute('aria-hidden', 'true');
  },
};

export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  // Reproduziert das reale Mockup-Muster (docs/index.html:11855–11885): ein
  // neutraler Trenner vor den Kern-Funktionen, ein ki-getönter vor den
  // Pro-Funktionen. Regressionsschutz für die area-Einschränkung auf 'ki' aus der
  // Klassendoku: der getönte Trenner unterscheidet sich sichtbar vom neutralen; ein
  // dritter/vierter Bereichston existiert nicht zu testen, weil das CSS keinen kennt.
  render: () => ({
    moduleMetadata: { imports: [TierComponent] },
    template: `
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-tier label="In jedem Paket enthalten"></cds-tier>
        <cds-tier label="Zusätzlich mit Pro" area="ki"></cds-tier>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const labels = Array.from(canvasElement.querySelectorAll('.ep-tier-label')) as HTMLElement[];
    await expect(labels).toHaveLength(2);
    const [core, pro] = labels;
    await expect(core).not.toHaveAttribute('data-area');
    await expect(pro).toHaveAttribute('data-area', 'ki');

    const coreColor = getComputedStyle(core).color;
    const proColor = getComputedStyle(pro).color;
    await expect(proColor).not.toBe(coreColor);
  },
};
