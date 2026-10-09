/**
 * Zentrale Icon-Registry der Angular-Lib — die EINZIGE Import-Fläche für
 * Komponenten-Icons. Komponenten importieren Icons nie direkt aus `@lucide/angular`
 * oder `@conciso/design-system/icons`, sondern ausschließlich aus dieser Datei
 * (Quelle der UI-Icons: docs/adr/0016-icon-quelle-lucide.md). Zwei bewusst getrennte Quellen:
 *
 * 1. **Lucide** (`@lucide/angular`, peerDependency): alle generischen Chrome-Icons
 *    (Menü, Schließen, Chevron, Suche, Theme-Symbole). Pro Icon eine Standalone-Komponente,
 *    im Template als `<svg lucideChevronDown>`; dynamisch über `<svg [lucideIcon]="…">`
 *    (`LucideDynamicIcon`, Eingabetyp `CdsIconInput`).
 *
 * 2. **DS-eigene Glyphen** (`uiCaretDown`, `uiCheck`): aus dem generierten DS-Icon-Export
 *    (Paket `@conciso/design-system/icons`, Single Source of Truth), weil es dafür kein
 *    gleichwertiges Lucide-Icon gibt (kräftiger Caret in der 10er-, kleiner Haken in der
 *    12er-viewBox). Gerendert über `<svg [cdsGlyph]="uiCaretDown" [size]="10">`
 *    (`CdsGlyphComponent`), das die viewBox des Glyphs übernimmt — Lucides eigene
 *    Komponenten erzwingen eine quadratische Basis aus Element-Bäumen, keine String-Bodies.
 *
 *    Importiert werden ausschließlich die BENANNTEN Exporte der beiden gebrauchten Glyphen,
 *    nie das aggregierte `icons`-Objekt — ein Property-Zugriff darauf
 *    (`icons['ui-caret-down']`) ist für Bundler nicht tree-shakable und zöge alle DS-Icons
 *    in jedes Consumer-Bundle (siehe Storybook „Grundlagen → Icons“).
 *
 * Bekommt ein Lucide-Icon später ein DS-Pendant (oder umgekehrt), wird es HIER umgestellt.
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
  LucideSearch,
  LucideSun,
  LucideX,
} from '@lucide/angular';
export type { LucideIconInput as CdsIconInput } from '@lucide/angular';

// DS-eigene Glyphen (benannte Exporte, Objekt mit `viewBox`/`body`).
export { uiCaretDown, uiCheck } from '@conciso/design-system/icons';
export { CdsGlyphComponent } from './cds-glyph.component';

/**
 * Strichstärke aller Chrome-Icons. Entspricht `--icon-stroke-md` (1.5) und der bisherigen
 * Heroicons-Outline-Vorgabe; Lucide würde ohne Angabe mit 2 zeichnen. Als Zahl, weil
 * `@lucide/angular` die Strichstärke als Attribut setzt und kein CSS-Token lesen kann.
 */
export const CDS_ICON_STROKE = 1.5;
