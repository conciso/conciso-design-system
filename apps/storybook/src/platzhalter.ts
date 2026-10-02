import montserrat500 from '../../../packages/css/fonts/montserrat-500-latin.woff2?inline';

// Neutraler Inline-SVG-Platzhalter für Bildflächen in Stories. Ein SVG, das als
// `<img src>` geladen wird, sieht die Seitenschriften nicht; deshalb ist Montserrat
// Medium (Latin-Subset aus packages/css/fonts) direkt eingebettet. Der Text folgt
// der Figma-Bibliothek („Bildfläche · 16:9“, Montserrat, Neutral/400) und der
// Altdoku (docs/legacy-site).
export function platzhalterBild(
  label: string,
  breite: number,
  hoehe: number,
  schrift = 28,
): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${breite}' height='${hoehe}'>` +
    `<style>@font-face{font-family:'Montserrat';font-weight:500;src:url(${montserrat500}) format('woff2')}</style>` +
    `<rect width='${breite}' height='${hoehe}' fill='#E8EDED'/>` +
    `<text x='${breite / 2}' y='${hoehe / 2}' font-family="Montserrat,sans-serif" font-weight='500' ` +
    `font-size='${schrift}' fill='#6E8585' text-anchor='middle' dominant-baseline='middle'>${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
