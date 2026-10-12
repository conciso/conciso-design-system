// Generiert von packages/css/scripts/build-icons.mjs — NICHT manuell editieren.
// Typdeklaration für dist/icons/icons.js. Siehe dist/icons/README.md „Verwendung“.

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

export const coBuilding: CdsIconEntry;
export const coMark: CdsIconEntry;
export const esWindowCheck: CdsIconEntry;
export const kiBot: CdsIconEntry;
export const woNetwork: CdsIconEntry;

export const icons: Record<string, CdsIconEntry>;
export default icons;
