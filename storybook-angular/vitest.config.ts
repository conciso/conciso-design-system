import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { storybookAngularVitest } from '@storybook/angular-vite/vitest';

const configDir = fileURLToPath(new URL('.storybook', import.meta.url));

/**
 * Führt alle Storybook-Stories als Vitest-Tests aus (Play-Functions +
 * Smoke-Render, inkl. a11y-Prüfung aus preview.ts). Die Storybook-Konfiguration
 * (main.ts mit viteFinal/Alias, preview.ts) wird von storybookTest() geladen —
 * hier steht bewusst nichts doppelt. storybookAngularVitest() reicht die
 * Angular-Build-Optionen (tsConfig) an das Framework durch, wenn Vitest ohne
 * laufenden `storybook dev` gestartet wird.
 */
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [
          // Reihenfolge wichtig: storybookAngularVitest() setzt die Angular-
          // Build-Optionen synchron in den Env-Kanal, BEVOR storybookTest()
          // beim Laden der Storybook-Presets darauf zugreift.
          storybookAngularVitest({ tsConfig: '.storybook/tsconfig.json' }),
          storybookTest({ configDir }),
        ],
        test: {
          name: 'storybook',
          // Stories laufen in einem echten Chromium (Playwright), nicht in
          // jsdom — identisch zur Umgebung des bisherigen Test-Runners.
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
