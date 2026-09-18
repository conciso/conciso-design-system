import type { Preview } from '@storybook/angular-vite';
import { componentWrapperDecorator } from '@storybook/angular-vite';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { themeStore, type CdsThemeMode } from '@conciso/design-system-angular';
import { concisoLight } from './theme';

// Store → Toolbar: klickt man einen Theme-Switcher (Cycle/Segment/Dropdown),
// aktualisiert das den globalen Theme-Toolbar-Schalter — so bleiben Toolbar und
// alle Komponenten synchron. Die Gegenrichtung (Toolbar → Store) macht der
// Theme-Decorator unten. getChannel() erst beim Emit holen (dann ist er bereit).
themeStore.subscribe((mode) => addons.getChannel().emit(UPDATE_GLOBALS, { globals: { theme: mode } }));

// Toolbar → Store, auch OHNE Story-Render: Der Decorator unten läuft nur, wenn
// eine Story rendert — reine MDX-Doku-Seiten (Icons, Hero, alle „Verwendung“-
// Seiten, …) tun das nie, also blieb data-theme dort bisher auf dem zuletzt
// gesetzten Wert stehen, egal was in der Toolbar steht. Dieser Listener sitzt
// auf Modulebene und läuft einmal je Preview-Iframe, unabhängig vom Render.
// SET_GLOBALS liefert den Ausgangszustand (Preview-Boot inkl. `&globals=`-Deep-
// Link in der URL), GLOBALS_UPDATED jeden späteren Toolbar-Wechsel — beide
// Ereignisse tragen die effektiven Globals unter `globals`, im installierten
// Storybook-Dist verifiziert (node_modules/storybook/dist/core-events/index.js).
// setSilent() vermeidet die Rückkopplung: es benachrichtigt NICHT die
// `_subs`-Liste von themeStore, also emittiert das obige subscribe() kein
// erneutes UPDATE_GLOBALS — ohne das gäbe es hier eine Emit-Schleife.
const applyThemeFromGlobals = ({ globals }: { globals?: Record<string, unknown> }): void => {
  const theme = globals?.['theme'] as CdsThemeMode | undefined;
  if (theme) themeStore.setSilent(theme);
};
addons.getChannel().on(SET_GLOBALS, applyThemeFromGlobals);
addons.getChannel().on(GLOBALS_UPDATED, applyThemeFromGlobals);

/**
 * Zwei globale Toolbar-Umschalter (globalTypes), beide über den ECHTEN CSS-Kern:
 *
 * - Theme (data-theme="dark" am <html>) → dark-mode.css greift auf [data-theme].
 * - Bereichs-Kontext (Seite): hüllt den Story bei Bedarf in ein echtes
 *   `.ep-page[data-accent="…"]` (via componentWrapperDecorator, display:contents,
 *   also ohne die Beispielseiten-Chrome). Genau diesen Selektor nutzt der Kern, um
 *   .body-link & bereichsabhängige Utilities zu tönen — es wird NICHTS gespiegelt
 *   oder gefaked. Default „aus“ → Komponenten rendern isoliert; der Kontext ist ein
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
      // Die Sortierung spiegelt die Gliederung der Doku-Site (`docs/index.html`,
      // Regeln in `CONTRIBUTING.md` § 11): Gruppen, Sektionen und Bauteile stehen
      // hier in derselben Reihenfolge wie dort, damit dieselbe Sache im Repo
      // überall gleich heißt.
      storySort: {
        // Storybooks Sidebar stellt an jedem Knoten Blätter immer vor Ordner —
        // das kann storySort.order nicht verschränken. Deshalb ist jede Gruppe
        // mit eigener Doku ein Ordner: erstes Kind ist die Doku-Seite
        // („Verwendung“ bzw. die selbstbenannte Seite, z. B. „Wissensbeitrag“
        // neben „FAQ“), danach folgen die Bauteile — auch wenn nur eines
        // darunterhängt (Buttons/Button, Logo/Logo). Nicht aufgelöst sind
        // Gruppen, die noch keine Doku-Seite haben; die bleiben unverändert
        // alphabetisch.
        order: [
          'Marke',
          [
            'Markenrad',
            'Brand Areas',
            ['Übersicht', 'AreaTabs'],
            'Logo',
            ['Verwendung', 'Logo'],
            'Bildsprache',
          ],
          'Grundlagen',
          [
            'Farben',
            'Typografie',
            'Spacing & Grid',
            'Responsive',
            'Elevation',
            'Design Tokens',
            'Icons',
            'Barrierefreiheit',
          ],
          'Komponenten',
          [
            'Buttons',
            ['Verwendung', 'Button'],
            'Chips, Badges & Pills',
            ['Verwendung', 'Chip', 'Status-Badge', 'Bereichs-Badge', 'Pill'],
            'Inputs & Forms',
            ['Verwendung', 'Textfeld', 'Textbereich', 'Auswahlfeld', 'Radio', 'Checkbox', 'Slider', 'Skala'],
            'Dropdowns',
            ['Verwendung', 'Custom Select', 'Combobox'],
            'Buchungsformular',
            'Feedback',
            ['Verwendung', 'Snackbar'],
            'Cards & Teaser',
            [
              'Verwendung',
              'Card',
              'Klickbare Karte',
              'Featured-Karte',
              'Icon-Karte',
              'Feature-Liste',
              'Tier-Trenner',
              'StatCard',
              'StatStrip',
            ],
            'Call to Action',
            ['Verwendung', 'CTA-Band', 'DownloadCta'],
            'Tabelle',
            ['Übersicht', 'Tabelle', 'Vergleichstabelle'],
            'Zitate & Testimonials',
            ['Verwendung', 'Blockquote', 'Testimonial', 'TeamVoice'],
            'Code-Block',
            ['Verwendung', 'Code-Block'],
            'Slider & Carousel',
            ['Verwendung', 'Carousel', 'LogoCarousel'],
            'Sektion',
            'Navigation',
            ['Verwendung', 'Topnav'],
            'Hero',
            ['Übersicht', 'Hero-Bild', 'Störer'],
            'Footer',
            ['Verwendung', 'Komplett', 'Oberer Teil', 'Unterer Teil'],
            'Theme-Umschalter',
            ['Verwendung', 'Cycle-Button', 'Segment', 'Dropdown'],
          ],
          'Seitenmuster',
          [
            'Wissensbeitrag',
            ['Übersicht', 'FAQ'],
            'Beitragsübersicht',
            'Veranstaltung',
            'Veranstaltungsübersicht',
            'Seminar · Training',
            ['Übersicht', 'Fakten-Liste'],
            'Angebots-Detailseite',
          ],
          'Beispielseiten',
          'Referenzen',
        ],
      },
    },
    // a11y scharf: axe-Verstöße lassen den Test-Runner fehlschlagen. Einzelne
    // Stories mit bekannten CSS-Kern-Befunden setzen lokal test:'todo' (siehe dort).
    a11y: { test: 'error' },
    // Docs-Chrome (Überschriften, Tabellen, Code-Blöcke) im Conciso-Look. Immer
    // Light: das Docs-Theme ist nicht an den Toolbar-Theme-Schalter gekoppelt
    // (Storybook kennt dafür keine Kopplung), siehe Follow-up-Notiz in der Spec.
    docs: {
      // Der Default von addon-docs erfasst nur h3 — die MDX-Seiten gliedern aber mit
      // `##` (h2), darum hier explizit beide Ebenen einschließen.
      toc: { headingSelector: 'h2, h3', title: 'Auf dieser Seite' },
      theme: concisoLight,
    },
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
      description: 'Conciso Light/Dark/System (data-theme am <html>) — synchron mit den Theme-Switcher-Komponenten',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Hell', icon: 'sun' },
          { value: 'dark', title: 'Dunkel', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
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
    // Toolbar → Store (still, ohne Rück-Emit). Der Store ist der EINZIGE Schreiber
    // von data-theme (inkl. „system“ via prefers-color-scheme) und teilt sich den
    // Zustand mit den Switcher-Komponenten → Toolbar und Komponenten bleiben synchron.
    // Koexistenz mit dem Listener oben: Der Decorator garantiert die Reihenfolge
    // VOR dem Story-Render (kein Flackern im falschen Theme beim Mount); der
    // Listener deckt zusätzlich die Seiten OHNE Story-Render ab (reine MDX-Doku),
    // auf denen dieser Decorator nie läuft. Beide rufen setSilent() — für eine
    // Story-Seite doppelt, aber dank des Gleichheits-Guards in setSilent() ohne
    // messbaren Effekt (zweiter Aufruf ist ein No-op).
    (story, context) => {
      themeStore.setSilent(context.globals['theme'] as CdsThemeMode);
      return story();
    },
  ],
};

export default preview;
