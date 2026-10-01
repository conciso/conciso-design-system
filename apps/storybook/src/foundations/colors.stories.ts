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
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Die Marken- und Neutral-Paletten als Live-Swatches direkt aus `css/tokens.css`. ' +
          'Schaltet man oben das Theme auf „Dark“, greifen die Overrides aus `css/dark-mode.css`.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

const ramp = (prefix: string, name: string): string => {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const cells = steps
    .map(
      (s) => `
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--${prefix}-${s})"></div>
        <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${prefix}-${s}</span>
      </div>`,
    )
    .join('');
  return `
    <section style="margin-bottom:var(--s8)">
      <h3 style="font:var(--ty-title-sm);color:var(--tx-primary);margin:0 0 var(--s3)">${name}</h3>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:var(--s2)">${cells}</div>
    </section>`;
};

export const Paletten: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${ramp('co', 'Corporate (--co)')}
        ${ramp('ki', 'AI.Applied (--ki)')}
        ${ramp('es', 'Effektive Software (--es)')}
        ${ramp('wo', 'Wirksame Organisationen (--wo)')}
        ${ramp('ro', 'Rosé (--ro)')}
        ${ramp('n', 'Neutrals (--n)')}
      </div>
    `,
  }),
};

export const Semantisch: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s6)">
        <div style="padding:var(--s5);border-radius:var(--r-md);background:var(--c-success-bg);color:var(--c-success);font:var(--ty-label-md)">Success · --c-success</div>
        <div style="padding:var(--s5);border-radius:var(--r-md);background:var(--c-warning-bg);color:var(--c-warning);font:var(--ty-label-md)">Warning · --c-warning</div>
        <div style="padding:var(--s5);border-radius:var(--r-md);background:var(--c-error-bg);color:var(--c-error);font:var(--ty-label-md)">Error · --c-error</div>
      </div>
    `,
  }),
};
