import type { StorybookConfig } from '@storybook/angular';
import remarkGfm from 'remark-gfm';

/**
 * Storybook-Konfiguration für den Angular-Teil des Conciso Design Systems.
 *
 * Trennung der Schichten:
 * - Die portable CSS-/Token-Quelle der Wahrheit liegt im Repo-Root (../../css,
 *   ../../dist, ../../fonts) und bleibt framework-unabhängig.
 * - Storybook serviert diese Verzeichnisse via `staticDirs` UNVERÄNDERT als
 *   statische Assets und bindet sie per <link> in preview-head.html ein
 *   (siehe ./preview-head.html). Es wird KEIN CSS kopiert, neu kompiliert oder
 *   durch den Angular-/Webpack-Build geschleust — die Angular-Komponenten
 *   konsumieren ausschließlich die bestehenden CSS-Klassen.
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|mdx)'],
  // addon-docs nutzt MDX3, das GitHub-Flavored-Markdown-Tabellen NICHT von Haus aus
  // parst. remark-gfm aktiviert Tabellen (und übrige GFM-Syntax) in allen *.mdx-Dateien.
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    // axe-basierte Barrierefreiheits-Prüfung (Panel + passive Mitprüfung im
    // Test-Runner, aktuell nicht-blockierend).
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  /**
   * Dev-Server hört auf 0.0.0.0:6006 (siehe angular.json → architect.storybook.options)
   * und ist hinter Traefik unter http://conciso-ds.localhost erreichbar. Damit der
   * Builder Requests mit diesem Host-Header akzeptiert, wird er hier explizit erlaubt.
   */
  core: {
    allowedHosts: ['conciso-ds.localhost', 'localhost', '.localhost'],
  },
  staticDirs: [
    { from: '../../css', to: '/conciso/css' },
    { from: '../../fonts', to: '/conciso/fonts' },
    { from: '../../dist', to: '/conciso/dist' },
    { from: '../../icons', to: '/conciso/icons' },
    // Brand-Logos (SVG) für Beispiele wie das Topnav-Logo — unverändert serviert.
    { from: '../../docs/assets/images', to: '/conciso/images' },
  ],
  // Erlaubt das Importieren von .md-Dateien als Roh-String (webpack-5-eigenes
  // asset/source, kein Extra-Loader). Damit kann die Einführungs-Seite die echte
  // README.md rendern → eine einzige Quelle, README-Änderungen sind sofort sichtbar.
  webpackFinal: async (config) => {
    config.module ??= {};
    config.module.rules ??= [];
    config.module.rules.push({ test: /\.md$/, exclude: /node_modules/, type: 'asset/source' });
    return config;
  },
};

export default config;
