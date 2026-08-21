import type { Meta, StoryObj } from '@storybook/angular-vite';

/**
 * Foundations-Story: zeigt die Typografie-Skala über die `--ty-*`-Font-Shorthand-Tokens
 * aus css/tokens.css (Montserrat + Libre Baskerville, self-hosted via css/fonts.css).
 */
const meta: Meta = {
  title: 'Grundlagen/Typografie',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Die Typografie-Skala als Live-Specimen über die `--ty-*`-Tokens aus `css/tokens.css`.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

const specimen = (token: string, sample: string): string => `
  <div style="display:grid;grid-template-columns:200px 1fr;gap:var(--s6);align-items:baseline;padding:var(--s3) 0;border-bottom:var(--bd)">
    <code style="font:var(--ty-body-xs);color:var(--tx-secondary)">var(--ty-${token})</code>
    <span style="font:var(--ty-${token});color:var(--tx-primary)">${sample}</span>
  </div>`;

export const Skala: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${specimen('display-md', 'Display Md — Effektive Software')}
        ${specimen('display-sm', 'Display Sm — Conciso Design System')}
        ${specimen('headline-md', 'Headline Md — Wirksame Organisationen')}
        ${specimen('headline-sm', 'Headline Sm — AI.Applied')}
        ${specimen('serif-lg', 'Serif Lg — ein redaktionelles Zitat')}
        ${specimen('title-sm', 'Title Sm — Kartentitel')}
        ${specimen('body-md', 'Body Md — Standard-Fließtext für längere Absätze.')}
        ${specimen('body-sm', 'Body Sm — Meta-Daten und Sekundärtext.')}
        ${specimen('label-md', 'Label Md — Button- und Formular-Labels')}
        ${specimen('caption', 'Caption — Bildunterschriften und Hinweise')}
      </div>
    `,
  }),
};
