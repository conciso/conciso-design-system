import { addons } from 'storybook/manager-api';
import { createElement } from 'react';
import { concisoDark, concisoLight } from './theme';
import {
  AlignLeft,
  AppWindow,
  BookOpen,
  Box,
  Boxes,
  CalendarDays,
  ChevronsUpDown,
  Copy,
  Download,
  FileText,
  Flag,
  GraduationCap,
  Grid3x3,
  Image,
  Languages,
  Layers,
  LayoutGrid,
  Menu,
  MessageCircleMore,
  MessagesSquare,
  Monitor,
  MousePointerClick,
  Newspaper,
  Scan,
  ShieldCheck,
  Smartphone,
  Smile,
  Sparkles,
  SquareCode,
  SquarePen,
  Sun,
  SwatchBook,
  Table,
  Tag,
  Wrench,
} from 'lucide-static';

// Manager-Theme ist statisch je Ladevorgang; folgt der OS-Einstellung
// (prefers-color-scheme), nicht Storybooks eigenem Theme-Umschalter. Der
// Toolbar-Theme-Schalter in preview.ts steuert ausschließlich die Preview
// (data-theme am <html> des Story-Frames), nicht diesen Manager — bewusst,
// denn das Storybook-Chrome selbst ist kein Teil des Design Systems.
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

// Sektions-Icons machen die Navigation unterscheidbar: Vor jedem Nav-Eintrag
// steht ein Lucide-Icon (`lucide-static`, siehe ADR 0016), und jeder
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
const SECTION_ICONS: Record<string, string> = {
  'marke-markenrad--übersicht': Sparkles,
  'marke-brand-areas': LayoutGrid,
  'marke-logo': Flag,
  'marke-bildsprache--übersicht': Image,
  'grundlagen-einrichtung--übersicht': Wrench,
  'grundlagen-farben': SwatchBook,
  'grundlagen-typografie': Languages,
  'grundlagen-spacing-grid--übersicht': Grid3x3,
  'grundlagen-responsive--übersicht': Smartphone,
  'grundlagen-elevation--übersicht': Box,
  'grundlagen-design-tokens--übersicht': Boxes,
  'grundlagen-icons--übersicht': Smile,
  'grundlagen-barrierefreiheit--übersicht': ShieldCheck,
  'komponenten-buttons': MousePointerClick,
  'komponenten-chips-badges-pills': Tag,
  'komponenten-inputs-forms': SquarePen,
  'komponenten-dropdowns': ChevronsUpDown,
  'komponenten-buchungsformular': CalendarDays,
  'komponenten-feedback': MessageCircleMore,
  'komponenten-cards-teaser': Layers,
  'komponenten-call-to-action': Download,
  'komponenten-tabelle': Table,
  'komponenten-zitate-testimonials': MessagesSquare,
  'komponenten-code-block': SquareCode,
  'komponenten-slider-carousel': Copy,
  'komponenten-sektion': Scan,
  'komponenten-navigation': Menu,
  'komponenten-hero': Monitor,
  'komponenten-footer': AlignLeft,
  'komponenten-theme-umschalter': Sun,
  'seitenmuster-wissensbeitrag': FileText,
  'seitenmuster-beitragsübersicht--übersicht': Newspaper,
  'seitenmuster-veranstaltung--übersicht': CalendarDays,
  'seitenmuster-veranstaltungsübersicht--übersicht': Newspaper,
  'seitenmuster-seminar-·-training--übersicht': GraduationCap,
  'seitenmuster-angebots-detailseite--übersicht': Tag,
  'beispielseiten-übersicht--übersicht': AppWindow,
  'referenzen-quellen--übersicht': BookOpen,
};

// 16 px ist die "Micro"-Stufe der Größentabelle in src/docs/grundlagen/
// icons.mdx (Zeilenhöhe der Sidebar), dazu gehört Stroke-Width 1
// (--icon-stroke-micro in css/tokens.css). Der Manager sieht keine
// CSS-Custom-Properties aus dem Design System (siehe Kommentar zum Theme
// oben) — deshalb stehen beide Werte hier fest verdrahtet, nicht als
// icon.strokeWidth (das ist der Wert für die native Darstellungsgröße).
const SECTION_ICON_SIZE = 16;
const SECTION_ICON_STROKE_WIDTH = 1;

// lucide-static liefert jedes Icon als fertigen SVG-String (24er-Raster,
// Strich-Stil). Nur der Innenteil wird übernommen: Das umgebende <svg> baut
// die Funktion selbst, damit Größe, currentColor und Strichstärke aus den
// Konstanten oben kommen. Benannte Importe sind tree-shakable, im
// Manager-Bundle landen nur die oben importierten Icons.
function svgInner(svg: string): string {
  return svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'));
}

function renderSectionIcon(svg: string) {
  // dekorativ: aria-hidden statt role="img", die Sektionsbezeichnung liefert
  // weiterhin item.name als Text daneben.
  return createElement('svg', {
    viewBox: '0 0 24 24',
    width: SECTION_ICON_SIZE,
    height: SECTION_ICON_SIZE,
    'aria-hidden': 'true',
    focusable: 'false',
    style: { flexShrink: 0 },
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: SECTION_ICON_STROKE_WIDTH,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    dangerouslySetInnerHTML: { __html: svgInner(svg) },
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
    // Icon nur vor Sektionsknoten (item.id steht in SECTION_ICONS); alle
    // anderen Zeilen (Wurzeln, Bauteil-Knoten, restliche Story-/Docs-Blätter)
    // bleiben unverändert bei ihrem Namen. Die Tabelle enthält bei
    // Ein-Kind-Sektionen bewusst die verschmolzene Blatt-ID (z. B.
    // "grundlagen-elevation--übersicht", siehe Kommentar oben) — die
    // explizite root-Prüfung schließt trotzdem aus, dass eine Wurzel je ein
    // Icon bekäme, selbst wenn sich die Sidebar-Struktur künftig ändert.
    renderLabel: (item) => {
      if (item.type === 'root') return item.name;
      const iconSvg = SECTION_ICONS[item.id];
      if (!iconSvg) return item.name;
      const icon = renderSectionIcon(iconSvg);
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
