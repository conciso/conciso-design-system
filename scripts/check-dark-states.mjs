// Prüft Zustands-Regeln (:hover, :focus, :active) in css/components.css darauf, ob sie im Dark Mode
// dunkel-auf-dunkel laufen. Dependency-frei, gedacht als CI-Gate neben dem Build.
//
// WARUM ES DIESEN CHECK GIBT
// css/dark-mode.css wird VOR css/components.css geladen (Reihenfolge ist Teil der API, siehe
// bundle-css.mjs). Eine Zustands-Regel in components.css hat dadurch bei gleicher Spezifität Vorrang
// vor der Dark-Grundregel. Setzt sie einen Ton, der im Dark nicht mitflippt (z. B. --wo-800), gewinnt
// im Dark Mode der Light-Wert:
//
//   components.css   [data-accent="wo"] .body-link:hover { color: var(--wo-800) }   0,3,0
//   dark-mode.css    [data-theme="dark"] [data-accent="wo"] .body-link { … }        0,3,0  ← verliert
//
// Ergebnis war 1,17:1 statt der geforderten 4,5:1 — der Link verschwand beim Überfahren. Derselbe
// Fehler steckte an drei weiteren Stellen. Der Check findet die Klasse statt des Einzelfalls.
//
// WAS ER MELDET
// Zustands-Regeln, die color/border-color/fill/stroke auf einen NICHT theme-awaren Token setzen,
// dessen Kontrast gegen den dunklen Grund unter der WCAG-Schwelle liegt (4,5:1 für Text, 3:1 für
// Ränder und Icons nach 1.4.11), ohne dass dark-mode.css eine gleichlautende Zustands-Regel mit
// mindestens gleicher Spezifität nachzieht.
//
// Gerechnet wird mit echtem Kontrast, nicht mit der Stufennummer: --co-500 ist #00BEBE und trägt im
// Dark problemlos, --wo-800 ist #183A0E und nicht. Eine Regel „ab Stufe 500" würde beide gleich
// behandeln und sechs Fehlalarme auf Fokus-Rändern erzeugen.
//
// WAS ER BEWUSST DURCHLÄSST
// Regeln, die Hintergrund UND Textfarbe gemeinsam setzen (z. B. .ep-tab.active:hover mit co-700 auf
// Weiß). Die tragen ihren Kontrast selbst und sind vom Theme unabhängig.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, f), 'utf8');

/** Kommentare entfernen, damit Prosa in /* … *​/ keine Selektoren vortäuscht. */
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Regeln als [selektor, body] — flach, reicht für unsere Dateien (keine verschachtelten At-Rules mit Zustand). */
function rules(css) {
  const out = [];
  for (const m of stripComments(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim();
    if (!sel || sel.startsWith('@')) continue;
    out.push([sel, m[2]]);
  }
  return out;
}

/** Tokens, die dark-mode.css im [data-theme="dark"]-Block neu belegt — die flippen mit und sind unkritisch. */
function themeAwareTokens(darkCss) {
  const block = stripComments(darkCss).match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\}/);
  if (!block) return new Set();
  return new Set([...block[1].matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
}

const STATE = /:(hover|focus|focus-visible|active)\b/;
const PROPS = ['color', 'border-color', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color', 'fill', 'stroke'];
/** Schwellen nach WCAG: Text 1.4.3, Ränder und Icons 1.4.11. */
const MIN = (prop) => (prop === 'color' ? 4.5 : 3);

/** Token → Hex auflösen, auch über Ketten wie --ki-ink: var(--ki-800). */
function resolver(css) {
  const map = new Map([...stripComments(css).matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)].map((m) => [m[1], m[2].trim()]));
  return function resolve(token, depth = 0) {
    const v = map.get(token);
    if (!v || depth > 5) return null;
    const chain = v.match(/var\((--[\w-]+)\)/);
    if (chain) return resolve(chain[1], depth + 1);
    const hex = v.match(/#([0-9a-f]{6}|[0-9a-f]{3})\b/i);
    return hex ? hex[0] : null;
  };
}

const lum = (hex) => {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/** Spezifität grob als (Klassen/Attribute/Pseudoklassen, Elemente) — reicht für den Vergleich hier. */
const spec = (sel) =>
  ((sel.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g) || []).length) * 100 +
  ((sel.match(/(^|[\s>+~])[a-z]+/g) || []).length);

const components = read('css/components.css');
const dark = read('css/dark-mode.css');
const flips = themeAwareTokens(dark);
const resolve = resolver(read('css/tokens.css') + '\n' + dark);

/** Dunkle Grundflächen, gegen die geprüft wird: bg-page und bg-surface aus dem Dark-Block. */
const darkBlock = stripComments(dark).match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\}/)?.[1] ?? '';
const GROUNDS = ['--bg-page', '--bg-surface']
  .map((t) => darkBlock.match(new RegExp(t + '\\s*:\\s*(#[0-9a-fA-F]{3,6})'))?.[1])
  .filter(Boolean);

// Zustands-Regeln, die dark-mode.css bereits nachzieht: Selektor ohne [data-theme="dark"] als Schlüssel.
const covered = new Map();
for (const [sel, body] of rules(dark)) {
  if (!sel.includes('[data-theme="dark"]') || !STATE.test(sel)) continue;
  for (const one of sel.split(',')) {
    const key = one.replace(/\[data-theme="dark"\]\s*/, '').trim();
    const props = new Set([...body.matchAll(/([\w-]+)\s*:/g)].map((m) => m[1]));
    covered.set(key, { spec: spec(one.trim()), props });
  }
}

// Bewusste Ausnahmen. Jede braucht eine Begründung, sonst ist sie keine Ausnahme, sondern ein
// ungelöster Fehler mit Deckmantel.
const ALLOW = new Map([
  [
    '.chip[aria-pressed="true"]:hover',
    'Gedrückter Chip: Die Füllung ist im Dark eine sehr dunkle Fläche auf dunklem Grund, der Rand ' +
      'trägt dieselbe Farbe wie die Füllung und ist deshalb kein eigenes Element. Der Zustand bleibt ' +
      'über den weißen Text klar erkennbar (1.4.11 ist über die Textmarkierung erfüllt). Ihn im Dark ' +
      'hell zu füllen wäre die sauberere Lösung, ist aber eine Gestaltungsentscheidung und ändert das ' +
      'Erscheinungsbild der Chips — offen, siehe CHANGELOG.',
  ],
]);

const findings = [];
for (const [sel, body] of rules(components)) {
  if (!STATE.test(sel)) continue;
  const decls = [...body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map(([, p, v]) => [p.trim(), v.trim()]);
  const setsBoth = decls.some(([p]) => p === 'background' || p === 'background-color') && decls.some(([p]) => p === 'color');
  if (setsBoth) continue; // trägt seinen Kontrast selbst

  for (const [prop, value] of decls) {
    if (!PROPS.includes(prop)) continue;
    for (const [, token] of value.matchAll(/var\((--[\w-]+)\)/g)) {
      if (flips.has(token)) continue;
      const hex = resolve(token);
      if (!hex) continue;
      // Bester Kontrast über beide dunklen Grundflächen — trägt er dort, ist die Regel unkritisch.
      const best = Math.max(...GROUNDS.map((g) => contrast(hex, g)));
      if (best >= MIN(prop)) continue;
      for (const one of sel.split(',')) {
        const key = one.trim();
        if (!STATE.test(key)) continue;
        if (ALLOW.has(key)) continue;
        const cov = covered.get(key);
        if (cov && cov.props.has(prop) && cov.spec >= spec(key)) continue;
        findings.push({ sel: key, prop, token, hex, ratio: best.toFixed(2), min: MIN(prop) });
      }
    }
  }
}

if (findings.length) {
  console.error(`Zustands-Regeln, die im Dark Mode dunkel-auf-dunkel laufen (${findings.length}):\n`);
  for (const f of findings)
    console.error(`  ${f.sel}\n      ${f.prop}: var(${f.token}) = ${f.hex} → ${f.ratio}:1 auf dunklem Grund, nötig ${f.min}:1\n`);
  console.error('Beheben: in css/dark-mode.css eine gleichlautende Zustands-Regel mit [data-theme="dark"] davor');
  console.error('ergänzen (heller statt dunkler) — dadurch liegt sie eine Spezifitätsstufe höher und die');
  console.error('Ladereihenfolge spielt keine Rolle mehr. Siehe CONTRIBUTING § 5.');
  process.exit(1);
}

console.log(`Dark-Mode-Zustände: keine dunkel-auf-dunkel-Regeln gefunden (${ALLOW.size} dokumentierte Ausnahme${ALLOW.size === 1 ? '' : 'n'}).`);
for (const [sel, why] of ALLOW) console.log(`  Ausnahme ${sel}\n    ${why.replace(/\s+/g, ' ')}`);
