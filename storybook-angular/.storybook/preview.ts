import type { Preview } from '@storybook/angular';
import {MINIMAL_VIEWPORTS} from "storybook/viewport";

/**
 * Globaler Theme-Umschalter über Storybooks eingebaute Toolbar (globalTypes):
 * setzt data-theme="dark" am <html> des Preview-Iframes, genau wie es das Design
 * System erwartet (dark-mode.css greift auf [data-theme="dark"]). Damit
 * dokumentieren die Stories Light- und Dark-Mode über denselben CSS-Kern.
 */
const preview: Preview = {
  parameters: {
    layout: 'centered',
    // Der Hintergrund wird ausschließlich über das Theme (--bg-page / data-theme)
    // gesteuert; der eingebaute Backgrounds-Umschalter würde das überschreiben.
    // disable:true entfernt den Toolbar-Button und die Funktion komplett.
    backgrounds: { disable: true },
    viewport: { options: MINIMAL_VIEWPORTS },
    options: {
      storySort: {
        order: [
          'Einführung',
          'Foundations',
          ['Farben', 'Typografie'],
          'Komponenten',
          [
            'Aktionen & Eingaben',
            'Karten & Kennzahlen',
            'Editorial & Zitate',
            'Navigation & Disclosure',
            'Feedback',
            'Medien',
            'Seite & Marke',
          ],
        ],
      },
    },
    // a11y scharf: axe-Verstöße lassen den Test-Runner fehlschlagen. Einzelne
    // Stories mit bekannten CSS-Kern-Befunden setzen lokal test:'todo' (siehe dort).
    a11y: { test: 'error' },
    docs: { toc: true },
  },
  initialGlobals: {
    theme: 'light',
    // Standard: responsive (keine feste Breite); Größe wählbar über die Toolbar.
    viewport: { value: undefined, isRotated: false },
  },
  globalTypes: {
    theme: {
      description: 'Conciso Light/Dark-Mode (data-theme am <html>)',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals['theme'] === 'dark' ? 'dark' : 'light';
      const root = document.documentElement;
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      return story();
    },
  ],
};

export default preview;
