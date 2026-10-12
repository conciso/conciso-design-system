/**
 * Zentrale Icon-Registry der Angular-Lib — die EINZIGE Import-Fläche für
 * Komponenten-Icons. Komponenten importieren Icons nie direkt aus `@lucide/angular`,
 * sondern ausschließlich aus dieser Datei (Quelle der UI-Icons:
 * docs/adr/0016-icon-quelle-lucide.md).
 *
 * Einzige Quelle ist **Lucide** (`@lucide/angular`, peerDependency): alle Chrome-Icons
 * (Menü, Schließen, Chevron, Haken, Suche, Theme-Symbole, Zitat). Pro Icon eine
 * Standalone-Komponente, im Template als `<svg lucideChevronDown>`; dynamisch über
 * `<svg [lucideIcon]="…">` (`LucideDynamicIcon`, Eingabetyp `CdsIconInput`). Das Zitat-Icon
 * wird gefüllt dargestellt (CSS-Klassen setzen `fill: currentColor`).
 *
 * Die Bereichs-Glyphen (co/ki/es/wo) liegen davon getrennt in `../icons.ts` (`CDS_AREA_ICONS`).
 */
export {
  LucideCheck,
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCircleAlert,
  LucideDynamicIcon,
  LucideMenu,
  LucideMonitor,
  LucideMoon,
  LucideQuote,
  LucideSearch,
  LucideSun,
  LucideX,
} from '@lucide/angular';
export type { LucideIconInput as CdsIconInput } from '@lucide/angular';

/**
 * Strichstärke aller Chrome-Icons. Entspricht `--icon-stroke-md` (1.5) und der bisherigen
 * Heroicons-Outline-Vorgabe; Lucide würde ohne Angabe mit 2 zeichnen. Als Zahl, weil
 * `@lucide/angular` die Strichstärke als Attribut setzt und kein CSS-Token lesen kann.
 */
export const CDS_ICON_STROKE = 1.5;
