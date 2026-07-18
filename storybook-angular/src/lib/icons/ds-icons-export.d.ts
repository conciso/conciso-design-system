/**
 * Typdeklaration für den generierten DS-Icon-ESM-Export (repo-root `icons/icons.js`).
 * Die Datei ist reines, generiertes JS ohne mitgelieferte Typen → hier deklariert,
 * damit die Registry (cds-icons.ts) sie typsicher importieren kann. Wildcard, weil
 * der Import über einen relativen Pfad (`../../../../icons/icons.js`) läuft.
 */
declare module '*/icons/icons.js' {
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
