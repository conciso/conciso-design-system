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

// Benannter Export pro Icon (camelCase, tree-shakable): Bindestrich-Segment groß
// (ui-caret-down → uiCaretDown, co-building → coBuilding). Bricht bei Kollision oder
// ungültigem JS-Bezeichner ab, statt eine Fehlform ins generierte icons.js zu schreiben.
const toCamelCase = (key) => key.replace(/-([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
const isValidIdentifier = (name) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name);
const RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
  'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in',
  'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof',
  'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'await', 'implements', 'package',
  'protected', 'interface', 'private', 'public',
]);

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

// Key → Export-Name (camelCase), mit Kollisions-/Gültigkeits-Prüfung. Ein Abbruch hier
// verhindert, dass ein kaputtes icons.js (doppelter oder ungültiger const-Name) committet wird.
const keyToExportName = new Map();
for (const key of Object.keys(icons)) {
  const exportName = toCamelCase(key);
  if (!isValidIdentifier(exportName) || RESERVED_WORDS.has(exportName)) {
    throw new Error(`build-icons: Key "${key}" ergibt keinen gültigen JS-Bezeichner ("${exportName}").`);
  }
  if (keyToExportName.has(exportName)) {
    const other = [...keyToExportName.entries()].find(([, v]) => v === exportName)[0];
    throw new Error(`build-icons: camelCase-Kollision "${exportName}" zwischen Keys "${other}" und "${key}".`);
  }
  keyToExportName.set(key, exportName);
}
const exportNameOf = (key) => keyToExportName.get(key);

const namedExportsJs = Object.entries(icons)
  .map(([key, entry]) => `export const ${exportNameOf(key)} = ${JSON.stringify(entry, null, 2)};`)
  .join('\n\n');
const aggregateJs = `export const icons = {\n${Object.keys(icons)
  .map((key) => `  ${JSON.stringify(key)}: ${exportNameOf(key)},`)
  .join('\n')}\n};\n`;

const js =
  `// Generiert von scripts/build-icons.mjs — NICHT manuell editieren.\n` +
  `// Quelle: icons/source/*.svg (+ icons/manifest.json). Jede Eintrag: { name, area, style, viewBox, strokeWidth?, body, svg, usage? }.\n` +
  `//\n` +
  `// Ein benannter Export pro Icon (camelCase, z. B. "ui-caret-down" -> uiCaretDown) ist\n` +
  `// tree-shakable: jeder ist ein eigenes Top-Level-const ohne Property-Zugriff. Das\n` +
  `// aggregierte „icons“-Objekt darunter referenziert dieselben Consts (wieder kein\n` +
  `// Property-Zugriff, kein Funktionsaufruf) und bleibt dadurch ebenfalls tree-shakable,\n` +
  `// solange NICHTS daraus importiert wird — ein "import { icons } ..." oder der Import von\n` +
  `// icons.json zieht dagegen alle Icons ins Bundle (siehe icons/README.md „Verwendung“).\n\n` +
  `${namedExportsJs}\n\n` +
  `${aggregateJs}\n` +
  `export default icons;\n`;
writeFileSync(join(ROOT, 'icons', 'icons.js'), js);

// Typdeklaration für icons.js (benannte Exporte + Aggregat), damit Consumer mit types-aware
// Modulauflösung (moduleResolution "bundler"/"node16"+) ohne eigene Ambient-Deklaration
// auskommen. Subpath-Export „./icons“ verweist im „types“-Condition darauf (siehe package.json).
const dtsEntries = Object.keys(icons)
  .map((key) => `export const ${exportNameOf(key)}: CdsIconEntry;`)
  .join('\n');
const dts =
  `// Generiert von scripts/build-icons.mjs — NICHT manuell editieren.\n` +
  `// Typdeklaration für icons/icons.js. Siehe icons/README.md „Verwendung“.\n\n` +
  `export interface CdsIconEntry {\n` +
  `  name: string;\n` +
  `  area: string;\n` +
  `  style: 'solid' | 'outline' | 'mixed';\n` +
  `  viewBox: string;\n` +
  `  strokeWidth?: string;\n` +
  `  /** Nur das innere Markup (für set:html in ein bestehendes <svg>). */\n` +
  `  body: string;\n` +
  `  /** Komplettes <svg>…</svg> (currentColor, self-contained). */\n` +
  `  svg: string;\n` +
  `  usage?: string[];\n` +
  `}\n\n` +
  `${dtsEntries}\n\n` +
  `export const icons: Record<string, CdsIconEntry>;\n` +
  `export default icons;\n`;
writeFileSync(join(ROOT, 'icons', 'icons.d.ts'), dts);

// README mit Prosa + generierter Mapping-Tabelle (damit das Mapping nie driftet).
const AREA_LABEL = { co: 'Corporate', ki: 'Angewandte KI', es: 'Effektive Software', wo: 'Wirksame Organisationen', ui: 'Bereichsneutral (UI)' };
const rows = (area) => Object.entries(icons)
  .filter(([, v]) => v.area === area)
  .map(([k, v]) => `| \`${k}\` | \`${exportNameOf(k)}\` | ${v.name} | ${v.style}${v.strokeWidth ? ` (${v.strokeWidth})` : ''} | ${(v.usage || []).join(', ') || '—'} |`)
  .join('\n');
const section = (area) => `### ${AREA_LABEL[area]}\n\n| Key | Export | Name | Stil (Stroke-Width) | Verwendung (DS-Kontext) |\n|---|---|---|---|---|\n${rows(area)}\n`;
const n = Object.keys(icons).length;
const readme = `# Conciso Design System — Icons

Maschinenlesbare Icon-Bibliothek. **Generiert** von \`scripts/build-icons.mjs\` aus
\`icons/source/*.svg\` (kanonische Quelle) + \`icons/manifest.json\`. Nicht manuell editieren —
neue/geänderte Icons in \`icons/source/\` ablegen und \`npm run build:icons\` ausführen.

## Inhalt

- \`icons/icons.json\` — Map \`key → { name, area, style, viewBox, strokeWidth?, body, svg, usage? }\`
- \`icons/icons.js\` — derselbe Datensatz als ESM: **ein benannter Export pro Icon** (camelCase,
  z. B. \`uiShieldCheck\`) **plus** das aggregierte \`icons\`-Objekt (Key → Eintrag)
- \`icons/icons.d.ts\` — Typdeklaration zu \`icons/icons.js\` (benannte Exporte + \`icons\`, je \`CdsIconEntry\`)
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
- **Keys:** \`{area}-{name}\` für die Bereichs-Glyphen (\`co|ki|es|wo\`), \`ui-{name}\` für bereichsneutrale
  Icons. Jeder Key hat einen benannten Export in camelCase (Bindestrich-Segment groß:
  \`ui-caret-down\` → \`uiCaretDown\`, \`co-building\` → \`coBuilding\`); der Generator bricht bei einer
  Kollision oder einem ungültigen JS-Bezeichner ab.

## Verwendung

**Empfohlen: benannter Import.** Nur benannte Imports sind tree-shakable — jeder Export ist ein
eigenes \`const\` auf Modulebene ohne Property-Zugriff oder Funktionsaufruf, Bundler (Webpack,
Rollup, esbuild, Angular/Vite) lassen dadurch jedes nicht importierte Icon aus dem Bundle.

\`\`\`js
import { uiShieldCheck } from '@conciso/design-system/icons';

uiShieldCheck.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
uiShieldCheck.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
uiShieldCheck.style  // "outline"
\`\`\`

**Aggregat \`icons\` / \`icons.json\`: nur für Kataloge und Doku.** \`import { icons } from
'@conciso/design-system/icons'\` oder der Import von \`icons.json\` liefert alle ${n} Icons in einem
Objekt — praktisch für eine Icon-Galerie oder einen dynamischen Lookup per String-Key, zieht dabei
aber immer die komplette Bibliothek ins Bundle, auch wenn nur ein Icon benutzt wird. In Apps daher
immer den benannten Import verwenden; \`icons\`/\`icons.json\` bleiben Kataloge/Doku (z. B. die
Storybook-Icon-Galerie) vorbehalten.

\`\`\`js
import { icons } from '@conciso/design-system/icons';
// oder: import iconsJson from '@conciso/design-system/icons.json' assert { type: 'json' };

const shield = icons['ui-shield-check']; // äquivalent zu uiShieldCheck oben, aber nicht tree-shakable
shield.svg    // komplettes <svg>…</svg> (currentColor, self-contained)
shield.body   // nur das innere Markup (für set:html in ein bestehendes <svg>)
shield.style  // "outline"
\`\`\`

**Astro (set:html):**

\`\`\`astro
---
import { kiBot } from '@conciso/design-system/icons';
const { svg } = kiBot;
---
<span class="icon" set:html={svg} />
<style>.icon { color: var(--ki-800); display: inline-flex; }
.icon :global(svg) { width: 24px; height: 24px; }</style>
\`\`\`

**Jede Karte, die auf eine Bereichs-Übersicht verlinkt**, trägt das Glyph dieses Bereichs:
\`ki-bot\` / \`es-window-check\` / \`wo-network\` (jeweils **solid**), eingefärbt über die Bereichsfarbe
(\`--XX-800\` Light / \`--XX-200\` Dark) — exakt wie \`.ep-card-icon.t-XX\` im DS.

Die Regel hängt am **Anlass, nicht an der Seite**: Sie gilt auf \`/leistungen\` und der Landingpage
genauso wie in „Weiter im Thema“-Blöcken tiefer liegender Detailseiten. Zuvor war sie nur für die
ersten beiden Orte notiert, woraufhin fünf Verweiskarten auf Angebots-Detailseiten mit einem
generischen Heroicon liefen.

Abgrenzung: \`.ep-card-icon\` **ohne** \`.t-XX\` trägt bewusst ein thematisches Outline-Icon (Kalender,
Team, Suche) in der Bereichsfarbe. Das ist kein Fehler, sondern der Normalfall für inhaltliche
Karten. Das Marken-Glyph ist dem Verweis auf den Bereich selbst vorbehalten.

## Icon-Verzeichnis

${section('co')}
${section('ki')}
${section('es')}
${section('wo')}
${section('ui')}`;
writeFileSync(join(ROOT, 'icons', 'README.md'), readme.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');

console.log(`icons: ${n} (co ${tally.co}, ki ${tally.ki}, es ${tally.es}, wo ${tally.wo}, ui ${tally.ui}) → icons/{icons.json,icons.js,icons.d.ts,README.md}`);
