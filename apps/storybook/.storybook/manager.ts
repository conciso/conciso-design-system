import { addons } from 'storybook/manager-api';
import { createElement } from 'react';
import { concisoDark, concisoLight } from './theme';
import rawIcons from '@conciso/design-system/icons.json';

// Manager-Theme ist statisch je Ladevorgang; folgt der OS-Einstellung
// (prefers-color-scheme), nicht Storybooks eigenem Theme-Umschalter. Der
// Toolbar-Theme-Schalter in preview.ts steuert ausschließlich die Preview
// (data-theme am <html> des Story-Frames), nicht diesen Manager — bewusst,
// denn das Storybook-Chrome selbst ist kein Teil des Design Systems.
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

// Sektions-Icons machen die Navigation unterscheidbar: Vor jedem Nav-Eintrag
// steht ein Icon aus der gemeinsamen Registry (`@conciso/design-system/icons.json`), und jeder
// fachliche Abschnitt bekommt dasselbe Icon vor seinem Storybook-Sidebar-Knoten.
// Das ersetzt den früheren Grund,
// renderLabel wegzulassen (ein Angular-Tag auf 158 von 181 Zeilen
// unterschied nichts) — der neue Zweck ist gezielt: er trifft genau die 35
// Sektions-Zeilen und dient der Wiedererkennung innerhalb der Sidebar.
//
// Die Schlüssel sind Storybooks eigene Knoten-IDs. Sie folgen zwar dem
// Muster sanitize("Wurzel/Sektion") (z. B. "Komponenten/Buttons" →
// "komponenten-buttons"), aber NICHT immer: eine Sektion mit nur einem
// einzigen Kind (nur eine MDX-Seite, keine weitere Bauteil-Ebene darunter)
// verschmilzt Storybook mit diesem Kind zu einer Zeile und hängt dessen
// Story-Namen an, z. B. "grundlagen-elevation--übersicht" statt
// "grundlagen-elevation". Deshalb keine Ableitung aus einer Formel, sondern
// jede ID einzeln aus dem gerenderten Sidebar-DOM (`[data-item-id]`) des
// laufenden Story-Index abgelesen. Jede der 35 Sektionen trifft
// genau einen dieser Knoten.
//
// Sonderfall Komponenten/Theme-Umschalter: Das Icon liegt als `ui-sun` in
// `@conciso/design-system/icons.json`, deshalb bekommt der Knoten unten denselben Eintrag wie
// jede andere Sektion.
const SECTION_ICON_KEYS: Record<string, string> = {
  'marke-markenrad--übersicht': 'ui-sparkles-4',
  'marke-brand-areas': 'ui-squares-2x2',
  'marke-logo': 'ui-flag',
  'marke-bildsprache--übersicht': 'ui-photo',
  'grundlagen-einrichtung--übersicht': 'ui-wrench-screwdriver',
  'grundlagen-farben': 'ui-swatch',
  'grundlagen-typografie': 'ui-language',
  'grundlagen-spacing-grid--übersicht': 'ui-squares-plus',
  'grundlagen-responsive--übersicht': 'ui-device-phone-mobile',
  'grundlagen-elevation--übersicht': 'ui-cube-2',
  'grundlagen-design-tokens--übersicht': 'ui-cube-transparent',
  'grundlagen-icons--übersicht': 'ui-face-smile',
  'grundlagen-barrierefreiheit--übersicht': 'ui-shield-check-2',
  'komponenten-buttons': 'ui-cursor-arrow-rays',
  'komponenten-chips-badges-pills': 'ui-tag',
  'komponenten-inputs-forms': 'ui-pencil-square',
  'komponenten-dropdowns': 'ui-chevron-up-down',
  'komponenten-buchungsformular': 'ui-calendar-days',
  'komponenten-feedback': 'ui-chat-bubble-oval-left-ellipsis',
  'komponenten-cards-teaser': 'ui-rectangle-stack',
  'komponenten-call-to-action': 'ui-arrow-down-tray-2',
  'komponenten-tabelle': 'ui-table-cells',
  'komponenten-zitate-testimonials': 'ui-chat-bubble-left-right',
  'komponenten-code-block': 'ui-code-bracket-square',
  'komponenten-slider-carousel': 'ui-square-2-stack',
  'komponenten-sektion': 'ui-viewfinder-circle',
  'komponenten-navigation': 'ui-bars-3',
  'komponenten-hero': 'ui-computer-desktop',
  'komponenten-footer': 'ui-bars-3-center-left',
  'komponenten-theme-umschalter': 'ui-sun',
  'seitenmuster-wissensbeitrag': 'ui-document-text',
  'seitenmuster-beitragsübersicht--übersicht': 'ui-newspaper-2',
  'seitenmuster-veranstaltung--übersicht': 'ui-calendar-days',
  'seitenmuster-veranstaltungsübersicht--übersicht': 'ui-newspaper-2',
  'seitenmuster-seminar-·-training--übersicht': 'ui-academic-cap',
  'seitenmuster-angebots-detailseite--übersicht': 'ui-tag',
  'beispielseiten-übersicht--übersicht': 'ui-window',
  'referenzen-quellen--übersicht': 'ui-book-open',
};

interface IconRegistryEntry {
  viewBox: string;
  body: string;
  style: 'outline' | 'solid';
}
const icons = rawIcons as Record<string, IconRegistryEntry>;

// 16 px ist die "Micro"-Stufe der Größentabelle in src/docs/grundlagen/
// icons.mdx (Zeilenhöhe der Sidebar), dazu gehört Stroke-Width 1
// (--icon-stroke-micro in css/tokens.css). Der Manager sieht keine
// CSS-Custom-Properties aus dem Design System (siehe Kommentar zum Theme
// oben) — deshalb stehen beide Werte hier fest verdrahtet, nicht als
// icon.strokeWidth (das ist der Wert für die native Darstellungsgröße).
// Strichstärke 1.25 statt 1: manager-head.html setzt dazu
// vector-effect: non-scaling-stroke, die Zahl gilt also in Bildschirm-Pixeln
// und nicht in viewBox-Einheiten — so wirken dichte und lockere Icons
// gleich schwer, unabhängig von ihrer viewBox.
const SECTION_ICON_SIZE = 16;
const SECTION_ICON_STROKE_WIDTH = 1.25;

// Storybook setzt vor Ordner-Knoten (type 'group' | 'component') einen Pfeil,
// vor Blättern nicht. Blätter mit Icon rücken deshalb um diese Breite nach
// links, damit Icon und Text auf einer x-Position mit den Ordnern stehen.
// Gemessen am laufenden Manager: Ordner x=34, Blätter x=40.
const LEAF_ICON_SHIFT = 6;

function renderSectionIcon(iconKey: string) {
  const icon = icons[iconKey];
  if (!icon) return null;
  const presentation =
    icon.style === 'solid'
      ? { fill: 'currentColor' }
      : { fill: 'none', stroke: 'currentColor', strokeWidth: SECTION_ICON_STROKE_WIDTH };
  // dekorativ: aria-hidden statt role="img", die Sektionsbezeichnung liefert
  // weiterhin item.name als Text daneben.
  return createElement('svg', {
    viewBox: icon.viewBox,
    width: SECTION_ICON_SIZE,
    height: SECTION_ICON_SIZE,
    'aria-hidden': 'true',
    focusable: 'false',
    style: { flexShrink: 0 },
    ...presentation,
    dangerouslySetInnerHTML: { __html: icon.body },
  });
}

addons.setConfig({
  theme: prefersDark ? concisoDark : concisoLight,
  sidebar: {
    // Startzustand: die drei Wurzeln mit den wenigsten Einträgen (Seitenmuster,
    // Beispielseiten, Referenzen) beginnen zugeklappt, Marke, Grundlagen und
    // Komponenten (dort hängen 149 der 181 Einträge) bleiben offen. IDs sind die
    // sanitisierten Titel-Wurzeln aus dem Story-Index (storybook/dist/csf →
    // `sanitize()`: lowercase, kein Umlaut-Sonderfall nötig), nicht geraten.
    // Wirkt nur auf frischen UI-Zustand — Storybook merkt sich auf-/zugeklappte
    // Knoten im localStorage, ein Browser mit bestehender Sitzung zeigt daher
    // keine Änderung.
    collapsedRoots: ['seitenmuster', 'beispielseiten', 'referenzen'],
    // Icon nur vor Sektionsknoten (item.id steht in SECTION_ICON_KEYS); alle
    // anderen Zeilen (Wurzeln, Bauteil-Knoten, restliche Story-/Docs-Blätter)
    // bleiben unverändert bei ihrem Namen. Die Tabelle enthält bei
    // Ein-Kind-Sektionen bewusst die verschmolzene Blatt-ID (z. B.
    // "grundlagen-elevation--übersicht", siehe Kommentar oben) — die
    // explizite root-Prüfung schließt trotzdem aus, dass eine Wurzel je ein
    // Icon bekäme, selbst wenn sich die Sidebar-Struktur künftig ändert.
    renderLabel: (item) => {
      if (item.type === 'root') return item.name;
      const iconKey = SECTION_ICON_KEYS[item.id];
      if (!iconKey) return item.name;
      const icon = renderSectionIcon(iconKey);
      if (!icon) return item.name;
      return createElement(
        'span',
        {
          // Storybooks eigener Link für verschmolzene Ein-Kind-Sektionen
          // (Klasse css-nn4w5h auf dem <a>, dort für den ausgeblendeten
          // Standard-Marker gedacht) setzt text-indent: -20px; das vererbt
          // sich sonst auf jeden Text, den wir hier zurückgeben, und
          // schiebt ihn sichtbar nach links aus dem abgeschnittenen
          // Container heraus. Deshalb hier explizit zurückgesetzt.
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 0,
            textIndent: 0,
            marginLeft: item.type === 'group' || item.type === 'component' ? 0 : -LEAF_ICON_SHIFT,
          },
        },
        icon,
        createElement(
          'span',
          { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
          item.name,
        ),
      );
    },
  },
});
