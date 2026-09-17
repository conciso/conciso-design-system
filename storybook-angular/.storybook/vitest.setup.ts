import { afterEach, beforeAll, expect } from 'vitest';
import { setProjectAnnotations } from '@storybook/angular-vite';
// Workaround für einen Bug in @storybook/angular-vite (10.5.x–10.6.0):
// setProjectAnnotations() registriert als Framework-Default nur render/
// renderToCanvas, NICHT aber applyDecorators aus dem Preview-Entry. Ohne
// dessen prepareMain()-Schritt bleibt bei Component-only-Stories (ohne
// eigenes render/template) das Template undefined und Decorators wie
// componentWrapperDecorator rendern wörtlich "undefined". Deshalb wird der
// Preview-Entry des Frameworks hier explizit mitgegeben.
import * as frameworkAnnotations from '@storybook/angular-vite/client/config';
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import * as projectAnnotations from './preview';

/**
 * Vitest-Pendant zum Storybook-Preview: wendet dieselben globalen Decorators,
 * Parameters und die a11y-Prüfung auf jede als Test ausgeführte Story an —
 * Stories verhalten sich im Test exakt wie im Storybook-UI.
 */
const project = setProjectAnnotations([
  frameworkAnnotations,
  a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(project.beforeAll);

/**
 * Visual-Regression je Story — Nachfolger von `.storybook/test-runner.ts`
 * (siehe Ticket 08, `docs/adr/0005-testebene-der-angular-lib.md`). Läuft nur
 * mit VISUAL=1 (dieselbe Bedingung wie zuvor im Test-Runner), damit der
 * reguläre `test:vitest`-Lauf unberührt bleibt; Pfad und Toleranz stehen in
 * `vitest.config.ts` (`browser.expect.toMatchScreenshot`).
 *
 * `context.story` und `context.task.meta.storyId` setzt @storybook/addon-vitest
 * selbst für jeden generierten Story-Test (vitest-plugin/test-utils.ts,
 * `testStory()`: `context.story = composedStory; task.meta.storyId = storyId`).
 * Beides ist nicht offiziell exportiert/typisiert, aber an der installierten
 * Version (10.6.x) geprüft — `storyId` dient wie zuvor `context.id` im
 * Test-Runner als Dateiname.
 */
declare const __VISUAL__: boolean;
const VISUAL = __VISUAL__;

interface StoryTestContext {
  story?: { parameters?: Record<string, unknown> };
  task: { meta: { storyId?: string } };
}

afterEach(async (context) => {
  if (!VISUAL) return;

  const { story, task } = context as unknown as StoryTestContext;
  const storyId = task.meta.storyId;
  if (!storyId) return; // kein Story-Test

  const snapshotParams = story?.parameters?.['snapshot'] as { skip?: boolean } | undefined;
  if (snapshotParams?.skip) return; // Opt-out, z. B. Autoplay-getriebene Stories

  // Layout & Fonts abwarten (zwei rAF-Ticks lassen einen Layout-/Paint-Zyklus
  // durchlaufen), dann Animationen/Transitions einfrieren → deterministischer
  // Screenshot.
  await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  await document.fonts?.ready;

  const freeze = document.createElement('style');
  freeze.textContent = `*, *::before, *::after {
    animation: none !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition: none !important;
    transition-duration: 0s !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
  }`;
  document.head.appendChild(freeze);

  try {
    await expect(document.body).toMatchScreenshot(storyId);
  } finally {
    freeze.remove();
  }
});
