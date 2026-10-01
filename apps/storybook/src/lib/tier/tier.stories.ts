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
          'streckt, keines trägt eine `col-*`-Klasse, das Tag variiert nicht. `area` nimmt alle ' +
          'vier Markenbereiche (`co`, `ki`, `es`, `wo`) und tönt das Label in der Bereichsfarbe, ' +
          'theme-fähig; ohne `area` bleibt es neutral. `.ep-tier-rule` ist rein dekorativ und ' +
          'trägt `aria-hidden="true"`.',
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
  // Ein neutraler Trenner vor den Kern-Funktionen, ein ki-getönter vor den
  // Pro-Funktionen: der getönte Trenner unterscheidet sich sichtbar vom neutralen.
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

const AREAS = ['co', 'ki', 'es', 'wo'] as const;

/** Löst `color: var(--<token>)` im aktuellen Theme zu einem computed color auf. */
function resolveColor(host: HTMLElement, token: string): string {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  host.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}

export const AlleBereiche: Story = {
  name: 'Alle Bereiche',
  parameters: { controls: { disable: true } },
  // Das Stufen-Label ist area-aware: jeder Bereich schreibt data-area und tönt das Label
  // in seiner Bereichsfarbe, in Hell und Dunkel. Ohne area bleibt es neutral.
  render: () => ({
    moduleMetadata: { imports: [TierComponent] },
    template: `
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-tier label="Neutral"></cds-tier>
        <cds-tier label="Corporate" area="co"></cds-tier>
        <cds-tier label="AI.Applied" area="ki"></cds-tier>
        <cds-tier label="Effektive Software" area="es"></cds-tier>
        <cds-tier label="Wirksame Organisationen" area="wo"></cds-tier>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const labels = Array.from(canvasElement.querySelectorAll('.ep-tier-label')) as HTMLElement[];
    await expect(labels).toHaveLength(5);
    const [neutral, ...tinted] = labels;
    await expect(neutral).not.toHaveAttribute('data-area');

    const root = document.documentElement;
    const previousTheme = root.getAttribute('data-theme');
    try {
      for (const theme of ['light', 'dark']) {
        root.setAttribute('data-theme', theme);
        const colors = new Set<string>();
        for (const [i, label] of tinted.entries()) {
          const area = AREAS[i];
          await expect(label).toHaveAttribute('data-area', area);
          const color = getComputedStyle(label).color;
          // Bereichsfarbe = der themeabhängige Akzenttext-Ton des Bereichs, nicht neutral.
          if (area !== 'ki') {
            await expect(color).toBe(resolveColor(label, `--${area}-ink`));
          }
          await expect(color).not.toBe(getComputedStyle(neutral).color);
          colors.add(color);
        }
        await expect(colors.size).toBe(4);
      }
    } finally {
      if (previousTheme === null) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', previousTheme);
    }
  },
};
