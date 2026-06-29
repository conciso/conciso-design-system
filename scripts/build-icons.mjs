// Icon-Export: liest die kuratierten Quell-SVGs aus icons/source/*.svg (Source of Truth,
// bereits normalisiert: currentColor, inline stroke-width) und erzeugt icons/icons.json
// und icons/icons.js. Optionale Labels (name, usage) aus icons/manifest.json.
// Dependency-frei (nur Node fs). Vorbild: scripts/build-tokens.mjs.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'icons', 'source');

// Bereich aus dem Key-Präfix: co|ki|es|wo = Brand-Area, ui = bereichsneutral.
const areaOf = (key) => (/^(co|ki|es|wo)-/.test(key) ? key.slice(0, 2) : 'ui');

// Stil aus dem SVG ableiten: Stroke (Root oder Pfad) ⇒ outline; zusätzlich Fill ⇒ mixed; sonst solid.
function styleOf(svg) {
  const root = svg.match(/<svg\b[^>]*>/)[0];
  const hasStroke = /stroke="currentColor"/.test(root) || /stroke="currentColor"/.test(svg.slice(root.length));
  const hasFill = /fill="currentColor"/.test(svg.slice(root.length));
  if (hasStroke && hasFill) return 'mixed';
  if (hasStroke) return 'outline';
  return 'solid';
}
const attrOf = (svg, name) => {
  const m = svg.match(/<svg\b[^>]*>/)[0].match(new RegExp(name + '="([^"]*)"'));
  return m ? m[1] : null;
};
const innerOf = (svg) => { const open = svg.match(/<svg\b[^>]*>/)[0]; return svg.slice(open.length, svg.length - '</svg>'.length); };

const manifest = existsSync(join(ROOT, 'icons', 'manifest.json'))
  ? JSON.parse(readFileSync(join(ROOT, 'icons', 'manifest.json'), 'utf8'))
  : {};

const files = readdirSync(SRC).filter((f) => f.endsWith('.svg')).sort();
const icons = {};
const tally = { co: 0, ki: 0, es: 0, wo: 0, ui: 0 };

for (const file of files) {
  const key = file.replace(/\.svg$/, '');
  const svg = readFileSync(join(SRC, file), 'utf8').trim();
  const area = areaOf(key);
  const style = styleOf(svg);
  const entry = {
    name: (manifest[key] && manifest[key].name) || key,
    area,
    style,
    viewBox: attrOf(svg, 'viewBox'),
    body: innerOf(svg),
    svg,
  };
  const sw = attrOf(svg, 'stroke-width');
  if (sw) entry.strokeWidth = sw;
  if (manifest[key] && manifest[key].usage && manifest[key].usage.length) entry.usage = manifest[key].usage;
  icons[key] = entry;
  tally[area]++;
}

writeFileSync(join(ROOT, 'icons', 'icons.json'), JSON.stringify(icons, null, 2) + '\n');

const js =
  `// Generiert von scripts/build-icons.mjs — NICHT manuell editieren.\n` +
  `// Quelle: icons/source/*.svg (+ icons/manifest.json). Jede Eintrag: { name, area, style, viewBox, strokeWidth?, body, svg, usage? }.\n` +
  `export const icons = ${JSON.stringify(icons, null, 2)};\n\n` +
  `export default icons;\n`;
writeFileSync(join(ROOT, 'icons', 'icons.js'), js);

// README mit Prosa + generierter Mapping-Tabelle (damit das Mapping nie driftet).
const AREA_LABEL = { co: 'Corporate', ki: 'Angewandte KI', es: 'Effektive Software', wo: 'Wirksame Organisationen', ui: 'Bereichsneutral (UI)' };
const rows = (area) => Object.entries(icons)
  .filter(([, v]) => v.area === area)
  .map(([k, v]) => `| \`${k}\` | ${v.name} | ${v.style}${v.strokeWidth ? ` (${v.strokeWidth})` : ''} | ${(v.usage || []).join(', ') || '—'} |`)
  .join('\n');
const section = (area) => `### ${AREA_LABEL[area]}\n\n| Key | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |\n|---|---|---|---|\n${rows(area)}\n`;
const readme = `# Conciso Design System — Icons

Maschinenlesbare Icon-Bibliothek. **Generiert** von \`scripts/build-icons.mjs\` aus
\`icons/source/*.svg\` (kanonische Quelle) + \`icons/manifest.json\`. Nicht manuell editieren —
neue/geänderte Icons in \`icons/source/\` ablegen und \`npm run build:icons\` ausführen.

## Inhalt

- \`icons/icons.json\` — Map \`key → { name, area, style, viewBox, strokeWidth?, body, svg, usage? }\`
- \`icons/icons.js\` — derselbe Datensatz als ESM (\`import { icons } from '@conciso/design-system/icons'\`)
- \`icons/source/*.svg\` — die einzelnen normalisierten Quell-SVGs (Dateiname = Key)

## Konventionen

- **Stil:** \`solid\` (gefüllte Glyphen, \`fill="currentColor"\`) oder \`outline\` (Linien,
  \`stroke="currentColor"\` + inline \`stroke-width\`); \`mixed\` = beides. Das Feld \`style\` sagt pro
  Icon, was erwartet wird — kein Raten mehr. Die vier **Bereichs-Glyphen** (\`ki-bot\`, \`es-window-check\`,
  \`wo-network\`, \`co-building\`) sind **solid**; die meisten generischen UI-Icons sind **outline**.
- **Farbe:** alle Icons nutzen ausschließlich \`currentColor\` → Einfärbung beim Consumer über CSS
  \`color\` (z. B. \`color: var(--ki-800)\` bzw. im Dark \`--ki-200\`). Keine hartkodierten Hex-Werte.
- **Self-contained:** Outline-Icons tragen ihre \`stroke-width\` inline → \`set:html\` funktioniert ohne
  Wrapper-Annahmen über den Stil. Größe via \`width\`/\`height\` oder CSS (viewBox bleibt erhalten).
- **Keys:** \`{area}-{name}\` für die Bereichs-Glyphen (\`co|ki|es|wo\`), \`ui-{name}\` für bereichsneutrale Icons.

## Verwendung

\`\`\`js
import { icons } from '@conciso/design-system/icons';
// oder: import iconsJson from '@conciso/design-system/icons.json' assert { type: 'json' };

const shield = icons['ui-shield-check'];
shield.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
shield.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
shield.style  // "outline"
\`\`\`

**Astro (set:html):**

\`\`\`astro
---
import { icons } from '@conciso/design-system/icons';
const { svg } = icons['ki-bot'];
---
<span class="icon" set:html={svg} />
<style>.icon { color: var(--ki-800); display: inline-flex; }
.icon :global(svg) { width: 24px; height: 24px; }</style>
\`\`\`

Die Bereichs-Cards (KI/ES/WO) auf \`/leistungen\` und der Landingpage nutzen \`ki-bot\` /
\`es-window-check\` / \`wo-network\` (jeweils **solid**), eingefärbt über die Bereichsfarbe
(\`--XX-800\` Light / \`--XX-200\` Dark) — exakt wie \`.ep-card-icon.t-XX\` im DS.

## Icon-Verzeichnis

${section('co')}
${section('ki')}
${section('es')}
${section('wo')}
${section('ui')}`;
writeFileSync(join(ROOT, 'icons', 'README.md'), readme.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');

const n = Object.keys(icons).length;
console.log(`icons: ${n} (co ${tally.co}, ki ${tally.ki}, es ${tally.es}, wo ${tally.wo}, ui ${tally.ui}) → icons/{icons.json,icons.js,README.md}`);
