import type { Preview } from '@storybook/angular';

/**
 * Globaler Theme-Umschalter über Storybooks eingebaute Toolbar (globalTypes):
 * setzt data-theme="dark" am <html> des Preview-Iframes, genau wie es das Design
 * System erwartet (dark-mode.css greift auf [data-theme="dark"]). Damit
 * dokumentieren die Stories Light- und Dark-Mode über denselben CSS-Kern.
 */
const preview: Preview = {
  parameters: {
    layout: 'centered',
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
    docs: { toc: true },
  },
  initialGlobals: {
    theme: 'light',
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
