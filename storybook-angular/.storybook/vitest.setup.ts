import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/angular-vite';
// Workaround für einen Bug in @storybook/angular-vite (10.5.x):
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
