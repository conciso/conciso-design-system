import { addons } from 'storybook/manager-api';
import { concisoDark, concisoLight } from './theme';

// Manager-Theme ist statisch je Ladevorgang; folgt der OS-Einstellung
// (prefers-color-scheme), nicht Storybooks eigenem Theme-Umschalter. Der
// Toolbar-Theme-Schalter in preview.ts steuert ausschließlich die Preview
// (data-theme am <html> des Story-Frames), nicht diesen Manager — bewusst,
// denn das Storybook-Chrome selbst ist kein Teil des Design Systems.
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

addons.setConfig({
  theme: prefersDark ? concisoDark : concisoLight,
});
