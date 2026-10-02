import type { Meta, StoryObj } from '@storybook/angular-vite';

/**
 * Foundations-Story: rendert die Marken-Farbtokens direkt aus der CSS-Schicht
 * (var(--co-500) usw. aus css/tokens.css). Keine kopierten Hex-Werte — die Swatches
 * lesen exakt die Tokens, die auch die Komponenten verwenden.
 */
const meta: Meta = {
  title: 'Grundlagen/Farben',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=3-172',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Die Marken- und Neutral-Paletten, Flächen, Text- und Randfarben sowie die Status- und ' +
          'Badge-Farben als Live-Swatches direkt aus `css/tokens.css`. ' +
          'Schaltet man oben das Theme auf „Dark“, greifen die Overrides aus `css/dark-mode.css`.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

const swatch = (token: string, label = token): string => `
  <div style="display:flex;flex-direction:column;gap:4px">
    <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--${token})"></div>
    <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${label}</span>
  </div>`;

const textSwatch = (token: string): string => `
  <div style="display:flex;flex-direction:column;gap:4px">
    <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--bg-surface);display:flex;align-items:center;padding:0 var(--s3);font:var(--ty-title-sm);color:var(--${token})">Aa</div>
    <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${token}</span>
  </div>`;

const pairSwatch = (bg: string, fg: string, sample: string): string => `
  <div style="display:flex;flex-direction:column;gap:4px">
    <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--${bg});color:var(--${fg});display:flex;align-items:center;padding:0 var(--s3);font:var(--ty-label-md)">${sample}</div>
    <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${bg} / ${fg}</span>
  </div>`;

const grid = (cells: string, columns = 5): string =>
  `<div style="display:grid;grid-template-columns:repeat(${columns},1fr);gap:var(--s2)">${cells}</div>`;

const section = (name: string, body: string): string => `
  <section style="margin-bottom:var(--s8)">
    <h3 style="font:var(--ty-title-sm);color:var(--tx-primary);margin:0 0 var(--s3)">${name}</h3>
    ${body}
  </section>`;

const ramp = (
  prefix: string,
  name: string,
  extras: string[] = [],
  first: number[] = [],
): string => {
  const steps = [...first, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const cells = [
    ...steps.map((s) => swatch(`${prefix}-${s}`)),
    ...extras.map((e) => swatch(`${prefix}-${e}`)),
  ].join('');
  return section(name, grid(cells, 10));
};

// ink, band und fill gibt es nur für die vier Bereiche (siehe tokens.css, Bereichs-Akzenttext,
// Bereichs-Bänder, Bauteil-Füllungen). Rosé hat keines davon.
const areaExtras = ['ink', 'band', 'fill'];

export const Paletten: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${ramp('co', 'Corporate (--co)', areaExtras)}
        ${ramp('ki', 'Angewandte KI (--ki)', areaExtras)}
        ${ramp('es', 'Effektive Software (--es)', areaExtras)}
        ${ramp('wo', 'Wirksame Organisationen (--wo)', areaExtras)}
        ${ramp('ro', 'Rosé (--ro)')}
        ${ramp('n', 'Neutrals (--n)', [], [0])}
      </div>
    `,
  }),
};

export const Semantisch: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${section(
          'Status (Text und Tint)',
          grid(
            [
              pairSwatch('c-success-bg', 'c-success', 'Success'),
              pairSwatch('c-warning-bg', 'c-warning', 'Warning'),
              pairSwatch('c-error-bg', 'c-error', 'Error'),
            ].join(''),
            3,
          ),
        )}
        ${section(
          'Status kräftig (Snackbar: Fläche, Text, Icon)',
          grid(
            [
              pairSwatch('c-success-strong', 'c-success-on-strong', 'Text'),
              pairSwatch('c-success-strong', 'c-success-strong-icon', 'Icon'),
              pairSwatch('c-error-strong', 'c-error-on-strong', 'Text'),
              pairSwatch('c-error-strong', 'c-error-strong-icon', 'Icon'),
            ].join(''),
            4,
          ),
        )}
        ${section(
          'Status-Badge',
          grid(
            [
              pairSwatch('c-success-bg', 'badge-ok-text', 'Live'),
              pairSwatch('c-warning-bg', 'badge-warn-text', 'Beta'),
              pairSwatch('c-error-bg', 'badge-err-text', 'Deprecated'),
              pairSwatch('badge-neu-bg', 'badge-neu-text', 'Draft'),
            ].join(''),
            4,
          ),
        )}
        ${section(
          'Kontrast-Badge',
          grid(
            [
              pairSwatch('cbadge-aa-bg', 'cbadge-aa-text', 'AA'),
              pairSwatch('cbadge-aaa-bg', 'cbadge-aaa-text', 'AAA'),
              pairSwatch('cbadge-fail-bg', 'cbadge-fail-text', 'Fail'),
            ].join(''),
            3,
          ),
        )}
      </div>
    `,
  }),
};

/** Flächen-, Text- und Randtokens, die jedes Bauteil über Hell und Dunkel hinweg trägt. */
export const FlaechenTextRand: Story = {
  name: 'Flächen, Text und Rand',
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${section(
          'Fläche',
          grid(
            [
              'bg-page',
              'bg-surface',
              'bg-surface-hover',
              'bg-overlay',
              'bg-plate',
              'bg-code',
              'bg-scrim',
            ]
              .map((t) => swatch(t))
              .join(''),
            7,
          ),
        )}
        ${section(
          'Text',
          grid(
            ['tx-primary', 'tx-brand', 'tx-secondary', 'tx-muted']
              .map((t) => textSwatch(t))
              .join(''),
            4,
          ),
        )}
        ${section('Rand', grid(['bd-c', 'bd-strong-c'].map((t) => swatch(t)).join(''), 2))}
      </div>
    `,
  }),
};
