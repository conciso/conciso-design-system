import { afterEach, beforeAll, expect } from 'vitest';
import { setProjectAnnotations } from '@storybook/angular-vite';
// Workaround für einen Bug in @storybook/angular-vite (10.5.x–10.6.0):
// setProjectAnnotations() registriert als Framework-Default nur render/
// renderToCanvas, NICHT aber applyDecorators aus dem Preview-Entry. Ohne
// dessen prepareMain()-Schritt bleibt bei Component-only-Stories (ohne
// eigenes render/template) das Template undefined und Decorators wie
// componentWrapperDecorator rendern wörtlich "undefined". Deshalb wird der
// Preview-Entry des Frameworks hier explizit mitgegeben. Die Info-Box von
// @storybook/addon-vitest („Found a setup file with setProjectAnnotations …
// You can safely remove …“) ist deshalb erwartet: Der Aufruf bleibt, bis der
// Framework-Bug behoben ist.
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
 * `vitest.config.mts` (`browser.expect.toMatchScreenshot`).
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

/**
 * `toMatchScreenshot()` sanitisiert den übergebenen Namen selbst zu einem
 * Dateinamen, entfernt dabei aber Umlaute/ß ersatzlos statt sie zu
 * transliterieren (z. B. `komponenten-hero-störer` → `komponenten-hero-strer`
 * statt `…-stoerer`). Das widerspricht der Namenskonvention der Baselines
 * (Story-Titel und -Name folgen der Sidebar-Taxonomie, siehe CONTRIBUTING §12,
 * und die Dateinamen sollen dieser Taxonomie lesbar folgen). Deshalb hier
 * selbst transliterieren, BEVOR der Name an `toMatchScreenshot()` geht — sonst
 * baut die nächste Komponente mit Umlaut im Titel (z. B. eine künftige
 * `Störer`-Schwester) wieder einen verstümmelten Dateinamen.
 */
function transliterateGerman(id: string): string {
  return id
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss');
}

/**
 * Storybooks `layout`-Parameter für den Screenshot nachziehen.
 *
 * Im Storybook-UI setzt das Preview-Chrome je nach Parameter `sb-main-centered`,
 * `-padded` oder `-fullscreen` auf `<body>` und erzeugt damit Zentrierung und Rand
 * um die Story. `@storybook/addon-vitest` rendert die Story ohne dieses Chrome:
 * `<body>` bleibt ungestylt, die Story sitzt bündig in der linken oberen Ecke, und
 * was über das Element hinausragt — Fokusring, Schatten, Outline — liegt außerhalb
 * des Screenshots.
 *
 * Gemessen an `chip--interaktiv`: im Storybook-UI sitzt der Chip bei (600,339), im
 * Vitest-Lauf bei (0,0), der Fokusring war oben und links abgeschnitten. Die
 * Baselines hielten damit angeschnittene Zustände fest, und gerade die Ränder, auf
 * die es den Interaktions-Stories ankommt, waren im Bildvergleich unsichtbar.
 *
 * Werte wie im Storybook-Preview: 1rem Rand, `min-height:100vh`, damit jede
 * Aufnahme dieselbe Fläche zeigt und nicht nur den Inhalt umschließt.
 */
const LAYOUT_CSS: Record<string, string> = {
  centered:
    'margin:0;padding:1rem;box-sizing:border-box;min-height:100vh;display:flex;align-items:center;justify-content:center;',
  padded: 'margin:0;padding:1rem;box-sizing:border-box;min-height:100vh;',
  fullscreen: 'margin:0;padding:0;box-sizing:border-box;min-height:100vh;',
};

afterEach(async (context) => {
  if (!VISUAL) return;

  const { story, task } = context as unknown as StoryTestContext;
  const storyId = task.meta.storyId;
  if (!storyId) return; // kein Story-Test

  const snapshotParams = story?.parameters?.['snapshot'] as { skip?: boolean } | undefined;
  if (snapshotParams?.skip) return; // Opt-out, z. B. Autoplay-getriebene Stories

  // Default `centered` wie in `preview.ts`; ein unbekannter Wert fällt darauf zurück.
  const layout = (story?.parameters?.['layout'] as string | undefined) ?? 'centered';
  const frame = document.createElement('style');
  frame.textContent = `body{${LAYOUT_CSS[layout] ?? LAYOUT_CSS['centered']}}`;
  document.head.appendChild(frame);

  // Layout & Fonts abwarten (zwei rAF-Ticks lassen einen Layout-/Paint-Zyklus
  // durchlaufen — hier zugleich der Umbruch durch das eben gesetzte Body-Layout),
  // dann Animationen/Transitions einfrieren → deterministischer Screenshot.
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
    await expect(document.body).toMatchScreenshot(transliterateGerman(storyId));
  } finally {
    freeze.remove();
    frame.remove();
  }
});
