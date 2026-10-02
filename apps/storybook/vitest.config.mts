import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { storybookAngularVitest } from '@storybook/angular-vite/vitest';
import { assertBaselinesMayBeWritten } from './visual-baseline-guard.mts';

const configDir = fileURLToPath(new URL('.storybook', import.meta.url));

// Vor allem anderen: Baselines nur dort überschreiben, wo sie hingehören. Siehe
// `visual-baseline-guard.mts` — der Guard greift ausschließlich bei VISUAL=1 zusammen
// mit --update und lässt jeden anderen Lauf unberührt.
assertBaselinesMayBeWritten({ argv: process.argv, env: process.env });

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
    // Visual-Läufe seriell: `setOuterViewportHeight` (siehe `.storybook/vitest.setup.ts`)
    // verändert das äußere Playwright-Fenster, das sich alle parallel laufenden
    // Testdateien (iframes) teilen. Parallel skaliert eine Datei die Fenster der anderen,
    // die Bildmaße schwanken zwischen Läufen (960 vs. 1200 px Breite) und die Baselines
    // werden in uneinheitlichem Maßstab erzeugt.
    // Wirkt nur auf Node-Tests: Die inline definierten `projects` erben dieses Root-Feld nicht,
    // und im Browser-Modus gilt `browser.fileParallelism` des Projekts (siehe unten).
    fileParallelism: process.env.VISUAL !== '1',
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
            // Hier greift die Serialisierung der Visual-Läufe wirklich (Begründung oben beim
            // Root-Feld): Ohne diese Zeile liefen die Testdateien parallel, obwohl das Root-Feld
            // gesetzt war, und die Bildmaße schwankten weiter.
            fileParallelism: process.env.VISUAL !== '1',
            // Fenster-Höhe des äußeren Playwright-Fensters für hohe Visual-Aufnahmen
            // (siehe `fitViewportToHeight` in `.storybook/vitest.setup.ts`).
            commands: {
              setOuterViewportHeight: async (ctx, width: number, height: number) => {
                const outer = (
                  ctx as unknown as { page: { setViewportSize(s: object): Promise<void> } }
                ).page;
                await outer.setViewportSize({ width, height });
              },
            },
            // Visual-Regression (Nachfolger von `.storybook/test-runner.ts`, siehe
            // docs/adr/0005-testebene-der-angular-lib.md). `resolveScreenshotPath`/`resolveDiffPath` müssen hier (im
            // Node-Prozess) stehen, nicht im browserseitig laufenden
            // `vitest.setup.ts`: das Browser-Fenster ruft `toMatchScreenshot()` nur
            // per RPC auf, und Funktionswerte überstehen diese Serialisierung nicht.
            // So bleiben die Baselines an ihrem heutigen Ort
            // (`visual-snapshots/<story-id>.png`, ohne Browser-/Platform-Suffix).
            expect: {
              toMatchScreenshot: {
                resolveScreenshotPath: ({ root, arg, ext }) =>
                  join(root, 'visual-snapshots', `${arg}${ext}`),
                resolveDiffPath: ({ root, arg, ext }) =>
                  join(root, 'visual-snapshots', '__diff_output__', `${arg}${ext}`),
                comparatorOptions: {
                  // Gegenstück zum bisherigen `failureThreshold: 0.01` mit
                  // `failureThresholdType: 'percent'` (jest-image-snapshot):
                  // Anteil (nicht Zahl) an Pixeln, die abweichen dürfen. Für sich allein ist das
                  // aber zu locker: Bei langen Stories (Paletten, Typografie-Skala) sind 1 % schnell
                  // eine ganze Zeile oder ein Farbfeld. Zur Zeit der Festlegung war der Screenshot
                  // noch `document.body` mit viel leerer Fläche — dort käme ein kompletter Bildtausch
                  // unter der Ratio durch (empirisch geprüft); die absolute Grenze bleibt.
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
