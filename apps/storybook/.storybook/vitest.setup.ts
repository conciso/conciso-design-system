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
 * (siehe `docs/adr/0005-testebene-der-angular-lib.md`). Läuft nur
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
 * `-padded` oder `-fullscreen` Rand und Zentrierung um die Story.
 * `@storybook/addon-vitest` rendert die Story ohne dieses Chrome: Die Story sitzt
 * bündig in der linken oberen Ecke, und was über das Element hinausragt — Fokusring,
 * Schatten, Outline — läge außerhalb des Screenshots.
 *
 * Fotografiert wird deshalb nicht das Fenster, sondern der Story-Inhalt: das
 * Canvas-Element, in das addon-vitest die Story rendert (anonymes `<div>` als erstes
 * Kind von `<body>`, gemessen; es hat keine id). Das Bild hat die Größe des Inhalts —
 * keine Leerfläche bei kleinen Bauteilen, kein Abschneiden langer Stories (Playwright
 * nimmt Elemente auch dann vollständig auf, wenn sie höher als das Fenster sind).
 *
 * Der Rand (1rem, wie im Storybook-Preview) liegt als Padding am Canvas selbst und
 * gehört damit zum Bild. `display: flow-root` schließt Außenabstände der Kinder ein.
 * Absolut oder fix positionierte Inhalte, die über das Canvas hinausragen (offene
 * Menüs, Popover, Tooltips), vergrößern das Padding zusätzlich um genau den
 * Überstand (siehe `extendForOverflow`), damit sie im Bild vollständig sind.
 */
const CANVAS_PADDING_PX = 16;

const LAYOUT_CSS: Record<string, string> = {
  // schrumpft auf den Inhalt, wie die zentrierte Story im Storybook-UI
  centered: `padding:${CANVAS_PADDING_PX}px;width:fit-content;`,
  padded: `padding:${CANVAS_PADDING_PX}px;`,
  fullscreen: 'padding:0;',
};

/** Das Element, in das die Story gerendert wird (erstes Element-Kind von `<body>`, ohne a11y-Filter-SVG). */
function findCanvas(): HTMLElement | null {
  return (
    Array.from(document.body.children).find(
      (el): el is HTMLElement => el instanceof HTMLElement && el.tagName !== 'SCRIPT',
    ) ?? null
  );
}

/**
 * Vergrößert das Padding des Canvas um den Überstand aller Nachfahren (auch
 * absolut/fix positionierter) sowie um Overlay-Container, die Bibliotheken direkt an
 * `<body>` hängen. Gemessen wird nach dem Setzen des Basis-Paddings; der Überstand
 * nach links/oben wird zu Padding, nach rechts/unten ebenfalls.
 */
function extendForOverflow(canvas: HTMLElement): void {
  const box = canvas.getBoundingClientRect();
  const nodes: Element[] = [
    ...Array.from(canvas.querySelectorAll('*')),
    ...Array.from(document.body.children)
      .filter((el) => el !== canvas && el instanceof HTMLElement)
      .flatMap((el) => Array.from(el.querySelectorAll('*'))),
  ];
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    top = Math.max(top, box.top - r.top);
    left = Math.max(left, box.left - r.left);
    right = Math.max(right, r.right - box.right);
    bottom = Math.max(bottom, r.bottom - box.bottom);
  }
  const style = getComputedStyle(canvas);
  const pad = (side: string, extra: number) =>
    extra > 0
      ? `padding-${side}:${parseFloat(style.getPropertyValue(`padding-${side}`)) + Math.ceil(extra) + CANVAS_PADDING_PX}px;`
      : '';
  canvas.style.cssText +=
    pad('top', top) + pad('right', right) + pad('bottom', bottom) + pad('left', left);
}

afterEach(async (context) => {
  if (!VISUAL) return;

  const { story, task } = context as unknown as StoryTestContext;
  const storyId = task.meta.storyId;
  if (!storyId) return; // kein Story-Test

  const snapshotParams = story?.parameters?.['snapshot'] as { skip?: boolean } | undefined;
  if (snapshotParams?.skip) return; // Opt-out, z. B. Autoplay-getriebene Stories

  // Default `centered` wie in `preview.ts`; ein unbekannter Wert fällt darauf zurück.
  const layout = (story?.parameters?.['layout'] as string | undefined) ?? 'centered';
  const canvas = findCanvas();
  if (!canvas) return;
  const savedStyle = canvas.getAttribute('style');
  const frame = document.createElement('style');
  frame.textContent = 'body{margin:0;}';
  document.head.appendChild(frame);
  canvas.style.cssText += `box-sizing:border-box;display:flow-root;${LAYOUT_CSS[layout] ?? LAYOUT_CSS['centered']}`;

  // Layout & Fonts abwarten (zwei rAF-Ticks lassen einen Layout-/Paint-Zyklus
  // durchlaufen — hier zugleich der Umbruch durch das eben gesetzte Body-Layout),
  // dann Animationen/Transitions einfrieren → deterministischer Screenshot.
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
  await document.fonts?.ready;

  // Überstände erst messen, wenn Layout und Fonts stehen.
  extendForOverflow(canvas);

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
    await expect(canvas).toMatchScreenshot(transliterateGerman(storyId));
  } finally {
    freeze.remove();
    frame.remove();
    if (savedStyle === null) canvas.removeAttribute('style');
    else canvas.setAttribute('style', savedStyle);
  }
});
