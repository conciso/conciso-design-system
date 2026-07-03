import type { Preview } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import {MINIMAL_VIEWPORTS} from "storybook/viewport";

/**
 * Zwei globale Toolbar-Umschalter (globalTypes), beide über den ECHTEN CSS-Kern:
 *
 * - Theme (data-theme="dark" am <html>) → dark-mode.css greift auf [data-theme].
 * - Bereichs-Kontext (Seite): hüllt den Story bei Bedarf in ein echtes
 *   `.ep-page[data-accent="…"]` (via componentWrapperDecorator, display:contents,
 *   also ohne die Beispielseiten-Chrome). Genau diesen Selektor nutzt der Kern, um
 *   .body-link & bereichsabhängige Utilities zu tönen — es wird NICHTS gespiegelt
 *   oder gefaked. Default „aus" → Komponenten rendern isoliert; der Kontext ist ein
 *   bewusst wählbarer Seiten-Zustand, klar getrennt vom `area`-Input der Komponente.
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
          'Grundlagen',
          ['Farben', 'Typografie'],
          'Komponenten',
          [
            'Buttons',
            'Chips, Badges & Pills',
            ['Chip', 'Status-Badge', 'Bereichs-Badge', 'Pill'],
            'Eingaben & Formulare',
            ['Textfeld', 'Textbereich', 'Auswahlfeld', 'Checkbox', 'Radio', 'Slider', 'Skala'],
            'Feedback',
            'Karten & Teaser',
            'Call to Action',
            'Zitate & Testimonials',
            'Code-Block',
            'Slider & Carousel',
            'Navigation',
            'Footer',
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
    // Bereichs-Kontext standardmäßig AUS → isolierte, ehrliche Darstellung.
    areaContext: 'none',
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
    areaContext: {
      description: 'Bereichs-Kontext der Seite (.ep-page[data-accent]) — tönt z. B. .body-link auf die Bereichsfarbe',
      toolbar: {
        title: 'Bereich',
        icon: 'paintbrush',
        items: [
          { value: 'none', title: 'Kein Bereichs-Kontext' },
          { value: 'co', title: 'Corporate' },
          { value: 'ki', title: 'AI.Applied' },
          { value: 'es', title: 'Effektive Software' },
          { value: 'wo', title: 'Wirksame Organisationen' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // Bereichs-Kontext: nur bei aktiver Auswahl in ein echtes .ep-page[data-accent]
    // hüllen (display:contents = ohne Beispielseiten-Rahmen). Die Tönung erledigt
    // dann der CSS-Kern selbst. Ohne Auswahl bleibt der Wrapper ein reiner
    // display:contents-Container ohne .ep-page → keine Nebenwirkungen (z. B. kein
    // .ep-page .card-stat-strip-Padding), also echte Isolation.
    componentWrapperDecorator(
      (story) =>
        `<div [class.ep-page]="cdsAreaCtx" [attr.data-accent]="cdsAreaCtx || null" style="display:contents">${story}</div>`,
      ({ globals }) => {
        const ctx = globals['areaContext'];
        return { cdsAreaCtx: ctx && ctx !== 'none' ? ctx : '' };
      },
    ),
    // Light/Dark (data-theme am <html>).
    (story, context) => {
      const root = document.documentElement;
      if (context.globals['theme'] === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      return story();
    },
  ],
};

export default preview;
