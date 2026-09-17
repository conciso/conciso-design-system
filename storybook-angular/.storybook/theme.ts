import { create } from 'storybook/theming';

/**
 * Conciso-Farbschema für Storybooks eigene Oberfläche (Sidebar, Toolbar,
 * Addon-Panels — siehe manager.ts) und für die Docs-Seiten-Chrome (siehe
 * preview.ts → parameters.docs.theme).
 *
 * Läuft im React-Manager-Bundle: reines TypeScript, KEINE Imports aus
 * @conciso/design-system-angular oder Angular. Der Manager sieht keine
 * CSS-Custom-Properties aus der Preview, deshalb stehen die Hex-Werte hier
 * fest verdrahtet — mit dem jeweiligen Token-Namen aus css/tokens.css bzw.
 * css/dark-mode.css im Kommentar, damit eine Token-Änderung dort auffällt
 * und hier nachgezogen werden kann.
 */

// Werte, die in Light und Dark identisch bleiben: Schriften, Marke, Rundungen.
const shared = {
  fontBase: "'Montserrat','Segoe UI',system-ui,-apple-system,sans-serif", // --font
  fontCode: "ui-monospace,'SF Mono',Menlo,Consolas,monospace", // kein Mono-Token im DS
  brandTitle: 'Conciso Design System',
  brandUrl: 'https://github.com/conciso/conciso-design-system',
  brandTarget: '_self',
  appBorderRadius: 8, // --r-sm
  inputBorderRadius: 4, // --r-xs
};

export const concisoLight = create({
  base: 'light',
  ...shared,
  colorPrimary: '#00BEBE', // --co-500
  colorSecondary: '#007575', // --co-700, textfähig 5,52:1
  appBg: '#F5F7F7', // --n-50
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF', // --bg-page
  appHoverBg: '#E8EDED', // --n-100
  appBorderColor: '#E8EDED', // --n-100 / --bd-c
  textColor: '#333E48', // --tx-primary
  textInverseColor: '#FFFFFF',
  textMutedColor: '#5A7171', // --tx-muted
  barBg: '#FFFFFF',
  barTextColor: '#4A6565', // --tx-secondary
  barSelectedColor: '#007575',
  barHoverColor: '#009E9E', // --co-600
  buttonBg: '#F5F7F7',
  buttonBorder: '#C9D3D3', // --n-200
  booleanBg: '#E8EDED',
  booleanSelectedBg: '#FFFFFF',
  inputBg: '#FFFFFF',
  inputBorder: '#C9D3D3',
  inputTextColor: '#333E48',
  // Relativer Pfad wegen möglicher Subpath-Deployments; wird via staticDirs
  // aus assets/brand serviert (siehe main.ts).
  brandImage: './conciso/brand/logo-conciso.svg',
});

export const concisoDark = create({
  base: 'dark',
  ...shared,
  colorPrimary: '#00BEBE', // --co-500, unverändert im Dark
  colorSecondary: '#80DEDE', // --co-200 = --co-ink im Dark
  appBg: '#151A1F', // --bg-page
  appContentBg: '#28323D', // --bg-surface
  appPreviewBg: '#151A1F',
  appHoverBg: '#2E3B46', // --bg-surface-hover
  appBorderColor: '#6F7A89', // --bd-c
  textColor: '#DDE9E9', // --tx-primary
  textInverseColor: '#151A1F',
  textMutedColor: '#93B6B6', // --tx-muted
  barBg: '#28323D',
  barTextColor: '#A6C6C6', // --tx-secondary
  barSelectedColor: '#80DEDE',
  barHoverColor: '#B3ECEC', // --co-100
  buttonBg: '#28323D',
  buttonBorder: '#6F7A89',
  booleanBg: '#1E262E', // --n-100 im Dark
  booleanSelectedBg: '#28323D',
  inputBg: '#1E262E',
  inputBorder: '#6F7A89',
  inputTextColor: '#DDE9E9',
  // Weiße Wortmarke für dunkle Gründe.
  brandImage: './conciso/brand/logo-conciso-light.svg',
});
