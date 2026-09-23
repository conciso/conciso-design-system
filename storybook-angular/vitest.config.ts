import { join } from 'node:path';
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
        // `vitest.setup.ts` läuft im Browser (dort, wo die Stories rendern),
        // nicht im Node-Prozess — `process.env` gibt es dort nicht. `define`
        // bäckt den Wert zur Build-Zeit (hier, Node-seitig, gelesen) in den
        // Client-Bundle-Code ein. Jedes `projects`-Element ist eine eigene
        // Vite-Konfiguration; ein `define` auf der äußeren `defineConfig()`
        // erreicht dieses Projekt nicht.
        define: {
          __VISUAL__: JSON.stringify(process.env.VISUAL === '1'),
        },
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
            // Visual-Regression (Nachfolger von `.storybook/test-runner.ts`, siehe
            // Ticket 08). `resolveScreenshotPath`/`resolveDiffPath` müssen hier (im
            // Node-Prozess) stehen, nicht im browserseitig laufenden
            // `vitest.setup.ts`: das Browser-Fenster ruft `toMatchScreenshot()` nur
            // per RPC auf, und Funktionswerte überstehen diese Serialisierung nicht.
            // So bleiben die Baselines an ihrem heutigen Ort
            // (`visual-snapshots/<story-id>.png`, ohne Browser-/Platform-Suffix).
            expect: {
              toMatchScreenshot: {
                resolveScreenshotPath: ({ root, arg, ext }) => join(root, 'visual-snapshots', `${arg}${ext}`),
                resolveDiffPath: ({ root, arg, ext }) =>
                  join(root, 'visual-snapshots', '__diff_output__', `${arg}${ext}`),
                comparatorOptions: {
                  // Gegenstück zum bisherigen `failureThreshold: 0.01` mit
                  // `failureThresholdType: 'percent'` (jest-image-snapshot):
                  // Anteil (nicht Zahl) an Pixeln, die abweichen dürfen. Für sich allein ist das
                  // aber zu locker: Der Screenshot ist `document.body`, und bei `layout: 'centered'`
                  // (die meisten Stories) ist die Canvas größtenteils leerer Hintergrund — 1 % davon
                  // ist eine größere Fläche als eine ganze Komponente einnimmt. Ein kompletter
                  // Bildtausch käme unter dieser Ratio durch (empirisch geprüft, s. Ticket 08).
                  // Deshalb zusätzlich eine absolute Pixelzahl setzen: Laut Typdefinition
                  // (`@vitest/browser/context.d.ts`, `StandardScreenshotComparators`) gilt bei
                  // gesetzten `allowedMismatchedPixels` UND `allowedMismatchedPixelRatio` jeweils der
                  // strengere Wert. 150 Pixel als feste Grenze: Rauschen ist im gepinnten
                  // Playwright-Image nahe 0 nötig (deterministisches Rendering, s. altes
                  // `test-runner.ts`), eine einzelne geänderte Ziffer/Zeile liegt laut Stichprobe im
                  // Bereich von zehn bis niedrigen Hunderten Pixeln, und eine echte Regression ist
                  // deutlich größer (z. B. der Fokusring-Unterschied bei der FAQ-Story: 13066 Pixel).
                  // 150 liegt damit über dem Rauschboden, fängt aber auch kleine Text-/Layout-
                  // Abweichungen ab, statt erst bei komponentengroßen Änderungen zu greifen.
                  allowedMismatchedPixelRatio: 0.01,
                  allowedMismatchedPixels: 150,
                },
              },
            },
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
