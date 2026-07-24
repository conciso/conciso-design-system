/**
 * Typdeklaration für den generierten DS-Icon-ESM-Export, bezogen über das Paket
 * `@conciso/design-system/icons` (Subpath-Export auf `icons/icons.js`, Single
 * Source of Truth). Die Datei ist reines, generiertes JS ohne mitgelieferte Typen
 * → hier deklariert, damit die Registry (cds-icons.ts) sie typsicher importieren kann.
 */
declare module '@conciso/design-system/icons' {
  export interface CdsIconEntry {
    name: string;
    area: string;
    style: 'solid' | 'outline' | 'mixed';
    viewBox: string;
    strokeWidth?: string;
    /** Nur das innere Markup (für set:html in ein bestehendes <svg>). */
    body: string;
    /** Komplettes <svg>…</svg> (currentColor, self-contained). */
    svg: string;
    usage?: string[];
  }
  export const icons: Record<string, CdsIconEntry>;
}
