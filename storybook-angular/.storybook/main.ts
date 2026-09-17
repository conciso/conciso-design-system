import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/angular-vite';
import remarkGfm from 'remark-gfm';

/**
 * Quell-Einstieg der Angular-Library (identisch zum `paths`-Mapping in
 * ../tsconfig.json). Webpack las das tsconfig-Mapping automatisch; Vites
 * Dependency-Scan/Optimizer tut das nicht, deshalb wird derselbe Pfad unten als
 * expliziter `resolve.alias` gesetzt.
 */
const angularLibEntry = fileURLToPath(
  new URL('../../angular-lib/projects/design-system-angular/src/public-api.ts', import.meta.url)
);

/**
 * Storybook-Konfiguration für den Angular-Teil des Conciso Design Systems.
 *
 * Trennung der Schichten:
 * - Die portable CSS-/Token-Quelle der Wahrheit liegt im Repo-Root (../../css,
 *   ../../dist, ../../fonts) und bleibt framework-unabhängig.
 * - Storybook serviert diese Verzeichnisse via `staticDirs` UNVERÄNDERT als
 *   statische Assets und bindet sie per <link> in preview-head.html ein
 *   (siehe ./preview-head.html). Es wird KEIN CSS kopiert, neu kompiliert oder
 *   durch den Angular-/Vite-Build geschleust — die Angular-Komponenten
 *   konsumieren ausschließlich die bestehenden CSS-Klassen.
 */
const config: StorybookConfig = {
  // Nur das Story-Muster: matcht *.stories.ts UND *.stories.mdx. Ein separates
  // '../src/**/*.mdx' wäre nicht nur redundant, sondern löst – solange es keine
  // reinen MDX-Doku-Seiten gibt – bei jedem Start die Warnung „No story files found
  // for the specified pattern“ aus. Für eigenständige MDX-Seiten hier wieder ergänzen.
  stories: ['../src/**/*.stories.@(ts|mdx)'],
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
    // Führt die Stories als Vitest-Tests aus (Browser-Mode via Playwright);
    // Konfiguration in ../vitest.config.ts, Setup in ./vitest.setup.ts.
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/angular-vite',
    // compodoc ist hier (wie zuvor in angular.json) bewusst aus — die Docs
    // entstehen aus CSF/argTypes, nicht aus generierter compodoc-JSON.
    options: { compodoc: false },
  },
  staticDirs: [
    { from: '../../css', to: '/conciso/css' },
    { from: '../../fonts', to: '/conciso/fonts' },
    { from: '../../dist', to: '/conciso/dist' },
    { from: '../../icons', to: '/conciso/icons' },
    // Brand-Logos (SVG) für Beispiele wie das Topnav-Logo, unverändert serviert.
    // Gemountet wird nur assets/brand, nicht der Demo-Bilderordner: Storybook
    // braucht ausschließlich die drei Wortmarken, kein Demo-Foto.
    { from: '../../assets/brand', to: '/conciso/brand' },
  ],
  /**
   * Dev-Server hört auf 0.0.0.0:6006 (siehe angular.json → architect.storybook.options)
   * und ist hinter Traefik unter http://conciso-ds.localhost erreichbar. Vite prüft
   * Host-Header selbst (server.allowedHosts), daher werden die Proxy-Hosts hier in
   * der Vite-Server-Config erlaubt — der Nachfolger der früheren
   * webpack-dev-server-Option `core.allowedHosts`.
   *
   * Markdown als Roh-String braucht keinen eigenen Loader mehr: Vite kann jede
   * Datei nativ per `?raw`-Suffix importieren (z. B. `import readme from
   * '../../README.md?raw'`) — die frühere webpackFinal-Regel (asset/source für
   * *.md) entfällt ersatzlos.
   */
  viteFinal: async (viteConfig) => {
    viteConfig.server = {
      ...viteConfig.server,
      host: '0.0.0.0',
      allowedHosts: ['conciso-ds.localhost', 'localhost', '.localhost'],
    };
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@conciso/design-system-angular': angularLibEntry,
      },
    };
    return viteConfig;
  },
};

export default config;
