/**
 * Zentrale Icon-Registry des Storybooks — die EINZIGE Import-Fläche für
 * Komponenten-Icons. Zwei bewusst getrennte Quellen:
 *
 * 1. **DS-eigene Glyphen** (`ui*`): aus dem generierten DS-Icon-Export
 *    (Paket `@conciso/design-system/icons`, Single Source of Truth). Nur dort, wo das
 *    DS ein eigenes Glyph definiert, das KEIN bzw. ein abweichendes Heroicon-Pendant hat:
 *      · `ui-caret-down` — kräftiger Caret (10er-viewBox), kein Heroicon-Pendant.
 *      · `ui-check`      — eigener Haken (12er-viewBox), weicht vom heroCheck (24er) ab.
 *
 *    Importiert werden ausschließlich die BENANNTEN Exporte der beiden gebrauchten Glyphen
 *    (`uiCaretDown`, `uiCheck`), nie das aggregierte `icons`-Objekt — ein Property-Zugriff
 *    darauf (`icons['ui-caret-down']`) ist für Bundler nicht tree-shakable und zöge alle
 *    alle DS-Icons in jedes Consumer-Bundle (siehe icons/README.md „Verwendung“).
 *
 * 2. **Heroicons**: für Glyphen, die im DS mit dem Heroicon glyph-identisch sind
 *    (chevron-down, magnifying-glass — gleicher Pfad, das DS setzt nur einen dünneren
 *    Stroke) sowie für die im DS-Set (noch) fehlenden Chrome-Icons (bars-3, x-mark,
 *    moon, sun, computer-desktop).
 *
 * Bekommt ein Heroicon später ein DS-Pendant, wird es HIER umgestellt — die
 * Komponenten importieren ausschließlich aus dieser Datei, nie direkt aus
 * `@ng-icons/heroicons`.
 */
import { uiCaretDown as dsUiCaretDown, uiCheck as dsUiCheck } from '@conciso/design-system/icons';

// Heroicons: glyph-identische (chevron/magnifying) + im DS fehlende Chrome-Icons.
export {
  heroBars3,
  heroChevronDown,
  heroComputerDesktop,
  heroMagnifyingGlass,
  heroMoon,
  heroSun,
  heroXMark,
} from '@ng-icons/heroicons/outline';

// DS-eigene Glyphen aus dem generierten, benannten Export (kein Duplizieren des SVG-Markups).
// Als @ng-icons-Custom-Icons registrierbar: der Wert ist das komplette <svg>-Markup.
export const uiCaretDown = dsUiCaretDown.svg;
export const uiCheck = dsUiCheck.svg;
