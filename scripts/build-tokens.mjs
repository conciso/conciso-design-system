// Token-Export: liest css/tokens.css (:root = Light, Source of Truth) und die
// Dark-Overrides aus css/dark-mode.css ([data-theme="dark"] {...}) und erzeugt
// tokens/tokens.json, tokens/tokens.scss, tokens/tokens.js.
// Dependency-frei (nur Node fs). tokens.css bleibt die kanonische Quelle.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');

// Body eines Selektor-Blocks per Brace-Matching extrahieren (alle Vorkommen).
function blocks(css, selectorRe) {
  const out = [];
  let m;
  const re = new RegExp(selectorRe, 'g');
  while ((m = re.exec(css))) {
    let depth = 1, i = m.index + m[0].length;
    const start = i;
    for (; i < css.length && depth > 0; i++) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
    }
    out.push(css.slice(start, i - 1));
  }
  return out;
}

function parseDecls(block) {
  const out = {};
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block))) out[m[1]] = m[2].trim().replace(/\s+/g, ' ');
  return out;
}

// var(--x) rekursiv gegen die map auflösen (mit Zyklus-Schutz).
function resolve(value, map, seen = new Set()) {
  return value.replace(/var\(\s*--([\w-]+)\s*\)/g, (full, name) => {
    if (seen.has(name) || !(name in map)) return full;
    return resolve(map[name], map, new Set(seen).add(name));
  });
}

const tokensCss = stripComments(read('css/tokens.css'));
const darkCss = stripComments(read('css/dark-mode.css'));

const lightRaw = parseDecls(blocks(tokensCss, ':root\\s*\\{').join('\n'));
// Nur der Token-Block mit EXAKTEM Selektor [data-theme="dark"] { ... } (keine Deszendenten-Regeln).
const darkRaw = parseDecls(blocks(darkCss, '\\[data-theme="dark"\\]\\s*\\{').join('\n'));

const light = Object.fromEntries(Object.entries(lightRaw).map(([k, v]) => [k, resolve(v, lightRaw)]));
const darkMerged = { ...lightRaw, ...darkRaw };
const dark = Object.fromEntries(Object.entries(darkRaw).map(([k, v]) => [k, resolve(v, darkMerged)]));

mkdirSync(join(ROOT, 'tokens'), { recursive: true });

// JSON
writeFileSync(join(ROOT, 'tokens/tokens.json'), JSON.stringify({ light, dark }, null, 2) + '\n');

// SCSS: zusammengesetzte Werte (Leerzeichen oder /) als String quoten, damit Sass
// keine Division/Listen-Fehlinterpretation macht. Dark als Map.
const scssVal = (v) => (/[ /]/.test(v) && !/^#|^rgba?\(/.test(v) ? `"${v}"` : v);
const scss =
  `// Generiert von scripts/build-tokens.mjs — NICHT manuell editieren.\n` +
  `// Quelle: css/tokens.css (Light) + css/dark-mode.css (Dark-Overrides).\n\n` +
  Object.entries(light).map(([k, v]) => `$${k}: ${scssVal(v)};`).join('\n') +
  `\n\n// Dark-Mode-Overrides (zur Laufzeit via [data-theme="dark"]):\n` +
  `$conciso-dark: (\n` +
  Object.entries(dark).map(([k, v]) => `  "${k}": ${scssVal(v)}`).join(',\n') +
  `\n);\n`;
writeFileSync(join(ROOT, 'tokens/tokens.scss'), scss);

// JS (ESM)
const js =
  `// Generiert von scripts/build-tokens.mjs — NICHT manuell editieren.\n` +
  `export const tokens = ${JSON.stringify(light, null, 2)};\n\n` +
  `export const darkTokens = ${JSON.stringify(dark, null, 2)};\n\n` +
  `export default tokens;\n`;
writeFileSync(join(ROOT, 'tokens/tokens.js'), js);

console.log(`tokens: ${Object.keys(light).length} light, ${Object.keys(dark).length} dark overrides → tokens/{tokens.json,tokens.scss,tokens.js}`);
