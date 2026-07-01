import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext, waitForPageReady } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { join } from 'node:path';

/**
 * Test-Runner-Hook. Zwei Aufgaben, beide additiv zur eingebauten a11y-Prüfung
 * (die über addon-a11y + `a11y: { test: 'error' }` in preview.ts läuft und von
 * diesem Hook nicht berührt wird):
 *
 *  - setup(): erweitert `expect` um jest-image-snapshot.
 *  - postVisit(): Visual-Regression je Story — ABER nur, wenn VISUAL=1 gesetzt
 *    ist. So snapshottet die reguläre CI (storybook-angular.yml, läuft auf einem
 *    ubuntu-Runner) NICHT gegen die Baselines; die entstehen und werden nur im
 *    gepinnten Playwright-Docker-Image verglichen (visual.yml). Pixel-Baselines
 *    sind umgebungsabhängig — deshalb dieses Gating.
 *
 * Opt-out je Story über `parameters: { snapshot: { skip: true } }` (für Stories
 * mit nicht einfrierbaren, zeitgesteuerten Zuständen).
 */
const VISUAL = process.env.VISUAL === '1';
const SNAPSHOT_DIR = join(process.cwd(), 'visual-snapshots');

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },

  async postVisit(page, context) {
    if (!VISUAL) return;

    const storyContext = await getStoryContext(page, context);
    if (storyContext.parameters?.['snapshot']?.skip) return;

    // Layout & Fonts abwarten, dann Animationen/Transitions einfrieren →
    // deterministischer Screenshot.
    await waitForPageReady(page);
    await page.evaluate(async () => {
      await document.fonts?.ready;
    });
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation: none !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition: none !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
      }`,
    });

    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: SNAPSHOT_DIR,
      customSnapshotIdentifier: context.id,
      // Kleine Toleranz gegen Sub-Pixel-Rauschen; im gepinnten Image nahe 0 nötig.
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  },
};

export default config;
