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
  new URL('../../angular-lib/projects/design-system-angular/src/public-api.ts', import.meta.url),
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
  // Zwei Muster sind nötig: '*.stories.@(ts|mdx)' matcht die Stories (inklusive an eine
  // Story angehängter MDX-Docs-Seiten), '../src/**/*.mdx' zusätzlich die eigenständigen
  // MDX-Doku-Seiten ohne zugehörige Story. Die Doku-Seiten der Gruppen Marke, Grundlagen,
  // Seitenmuster, Beispielseiten und Referenzen liegen als solche eigenständigen
  // MDX-Dateien unter src/docs/ und blieben ohne dieses zweite Muster unsichtbar.
  stories: ['../src/**/*.stories.@(ts|mdx)', '../src/**/*.mdx'],
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
    // Konfiguration in ../vitest.config.mts, Setup in ./vitest.setup.ts.
    '@storybook/addon-vitest',
    // Schreibt beim Build manifests/{docs,components}.json und stellt im
    // Dev-Server einen MCP-Endpunkt unter /mcp bereit (Tools u. a.
    // stories-preview, test-run, docs-show, review-create). Der Endpunkt ist
    // ohne Authentifizierung im lokalen Netz erreichbar, weil angular.json den
    // Dev-Server auf 0.0.0.0 bindet; die Abwägung dazu steht in ADR-0006
    // („Der MCP-Endpunkt ist im lokalen Netz erreichbar — bewusst“).
    '@storybook/addon-mcp',
  ],
  framework: {
    name: '@storybook/angular-vite',
    // Seit 10.6 ersetzt der In-Process-Docgen-Server (Default) die Compodoc-
    // Pipeline; die Docs entstehen aus TypeScript-Quelle sowie CSF/argTypes.
    options: {},
  },
  // Autodocs-Eintrag jeder Komponente heißt sonst „Docs“ — einzige englische
  // Zeile in einer durchgehend deutschen Navigation. „Übersicht“ ist bereits
  // der Name, den die eigenständigen MDX-Doku-Seiten tragen (CONTRIBUTING.md § 11).
  docs: { defaultName: 'Übersicht' },
  features: {
    // Manifest für Agenten/MCP-Clients; addon-mcp erzwingt es ohnehin über
    // seinen eigenen Features-Preset, hier zusätzlich explizit als Dokumentation
    // der Absicht.
    componentsManifest: true,
    // Seit 10.6 in angular-vite bereits Default; explizit gesetzt als Schutz
    // gegen einen künftigen Default-Wechsel. Liefert Inputs/Outputs/JSDoc aus
    // der TS-Quelle für Controls, Docs und Manifest.
    experimentalDocgenServer: true,
    // `review-create` ist für direkte MCP-Clients (z. B. „claude mcp add
    // --transport http …“) nur bei explizitem true erreichbar; unset gilt nur
    // für den deprecated „storybook ai“-Proxy-Kanal.
    experimentalReview: true,
    // Onboarding-Widget in der Seitenleiste und die Anleitungsseite im Menü aus.
    // Beide sind für ein frisch aufgesetztes Storybook gedacht; dieses hier ist
    // eingerichtet, dokumentiert und wird täglich benutzt. Die Checkliste nähme
    // in der Seitenleiste nur Platz weg, den die Komponenten brauchen.
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
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
