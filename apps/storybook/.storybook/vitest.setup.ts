import { afterEach, beforeAll, expect } from 'vitest';
import { commands, page } from 'vitest/browser';
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
declare module 'vitest/browser' {
  interface BrowserCommands {
    setOuterViewportHeight(width: number, height: number): Promise<void>;
  }
}

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
/** Obergrenze für die Aufnahmehöhe; darüber wird abgeschnitten (und gewarnt). */
const MAX_CAPTURE_HEIGHT_PX = 4000;

const nextFrames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

/**
 * Chromium malt nur den sichtbaren Bereich: Ein Element-Screenshot, der höher ist als
 * das Fenster, hat die richtige Größe, ist unterhalb der Fensterhöhe aber weiß (in der
 * CI mit dem gepinnten Playwright-Image gemessen). Deshalb wird das Viewport vor der
 * Aufnahme auf die Höhe des Inhalts gesetzt (Breite unverändert, nie kleiner als das
 * Standardfenster, höchstens `MAX_CAPTURE_HEIGHT_PX`).
 */
async function fitViewportToHeight(canvas: HTMLElement, storyId: string, minHeight: number) {
  const wanted = Math.ceil(canvas.getBoundingClientRect().height);
  if (wanted > MAX_CAPTURE_HEIGHT_PX) {
    console.warn(
      `[visual] ${storyId}: Inhalt ${wanted}px hoch, Aufnahme auf ${MAX_CAPTURE_HEIGHT_PX}px begrenzt.`,
    );
  }
  const height = Math.min(Math.max(minHeight, wanted), MAX_CAPTURE_HEIGHT_PX);
  if (height !== window.innerHeight) {
    await setViewportHeight(height);
  }
}

/**
 * Das Test-Fenster ist ein skaliertes iframe im äußeren Playwright-Fenster (UI-Modus
 * von @vitest/browser): `page.viewport()` allein ändert nur das iframe, das äußere
 * Fenster bleibt 720 px hoch, schrumpft das iframe auf diese Höhe herunter und
 * fotografiert das Ergebnis. Deshalb wird zusätzlich das äußere Fenster gleich hoch
 * gemacht (Befehl `setOuterViewportHeight`, siehe `vitest.config.mts`).
 */
async function setViewportHeight(height: number) {
  await commands.setOuterViewportHeight(window.top?.innerWidth ?? window.innerWidth, height);
  await page.viewport(window.innerWidth, height);
  await nextFrames();
}

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
 * Vergrößert das Canvas um den Überstand aller Nachfahren (auch absolut/fix
 * positionierter) sowie aller Body-Geschwister samt deren Nachfahren (Overlays, die
 * Bibliotheken direkt an `<body>` hängen, z. B. ein `<dialog>`). Unsichtbare Elemente
 * (`display:none`, `visibility:hidden`, Größe 0) zählen nicht. Der Überstand je Seite
 * ist auf ein Fenster begrenzt, damit ein absichtlich weit ausgelagertes Element
 * (z. B. `left:-9999px`) das Bild nicht sprengt; ein überschrittener Wert wird gewarnt.
 *
 * Mehr Padding allein vergrößert bei `padded`/`fullscreen` die Box nicht (Blockbreite
 * folgt dem Elternelement), deshalb wird die Breite um das horizontale Delta explizit
 * erhöht. Die Höhe wächst mit dem Padding von selbst.
 */
function extendForOverflow(canvas: HTMLElement, storyId: string): void {
  const box = canvas.getBoundingClientRect();
  const siblings = Array.from(document.body.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el !== canvas,
  );
  const nodes: Element[] = [
    ...Array.from(canvas.querySelectorAll('*')),
    ...siblings.flatMap((el) => [el, ...Array.from(el.querySelectorAll('*'))]),
  ];
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;
  for (const el of nodes) {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    top = Math.max(top, box.top - r.top);
    left = Math.max(left, box.left - r.left);
    right = Math.max(right, r.right - box.right);
    bottom = Math.max(bottom, r.bottom - box.bottom);
  }
  const limit = (value: number, side: string, max: number) => {
    if (value > max) {
      console.warn(
        `[visual] ${storyId}: Überstand ${side} ${Math.round(value)}px über Grenze ${max}px, auf Grenze gekürzt.`,
      );
    }
    return Math.min(value, max);
  };
  const extra = {
    top: limit(top, 'oben', window.innerHeight),
    right: limit(right, 'rechts', window.innerWidth),
    bottom: limit(bottom, 'unten', window.innerHeight),
    left: limit(left, 'links', window.innerWidth),
  };
  const computed = getComputedStyle(canvas);
  const grow = (side: keyof typeof extra) =>
    extra[side] > 0
      ? parseFloat(computed.getPropertyValue(`padding-${side}`)) +
        Math.ceil(extra[side]) +
        CANVAS_PADDING_PX
      : null;
  const pads = {
    top: grow('top'),
    right: grow('right'),
    bottom: grow('bottom'),
    left: grow('left'),
  };
  const dx =
    (pads.left === null ? 0 : pads.left - parseFloat(computed.paddingLeft)) +
    (pads.right === null ? 0 : pads.right - parseFloat(computed.paddingRight));
  const width = box.width + dx;
  let css = '';
  for (const [side, value] of Object.entries(pads)) {
    if (value !== null) css += `padding-${side}:${value}px;`;
  }
  if (dx > 0) css += `width:${width}px;`;
  canvas.style.cssText += css;
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

  // Erst das Viewport auf die Inhaltshöhe bringen (fixe Overlays richten sich nach
  // ihm), dann Überstände messen, dann die Höhe mit dem Überstand nachziehen.
  const defaultHeight = window.innerHeight;
  await fitViewportToHeight(canvas, storyId, defaultHeight);
  extendForOverflow(canvas, storyId);
  await fitViewportToHeight(canvas, storyId, defaultHeight);

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
    if (window.innerHeight !== defaultHeight) {
      await setViewportHeight(defaultHeight);
    }
    if (savedStyle === null) canvas.removeAttribute('style');
    else canvas.setAttribute('style', savedStyle);
  }
});
