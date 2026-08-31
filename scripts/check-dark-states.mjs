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
// Dark problemlos, --wo-800 ist #183A0E und nicht. Eine Regel „ab Stufe 500“ würde beide gleich
// behandeln und sechs Fehlalarme auf Fokus-Rändern erzeugen.
//
// ZWEITER CHECK: ZERRISSENE PAARE
// Regeln, die Hintergrund UND Textfarbe gemeinsam setzen, tragen ihren Kontrast selbst — aber nur,
// solange das Paar zusammenbleibt. Überschreibt eine andere Regel nur eine Hälfte, entsteht genau der
// Fehler, den der erste Check nicht sieht. Deshalb bildet der zweite Check die Kaskade je
// (Element, Theme, Zustand) nach und prüft die tatsächlich gewinnende Kombination.
//
// EINE ANNAHME, DIE SICH ALS FALSCH ERWIESEN HAT
// Ursprünglich übersprang der erste Check alle Tokens, die im Dark-Block neu belegt sind, als
// „theme-aware und damit unkritisch“. Das stimmt nicht: Die Neutrals kippen dort auf DUNKLE Werte
// (--n-100 = #1C2E2E statt #E8EDED). Ein Fix, der einen Icon-Hover auf var(--n-100) setzte, war
// deshalb wirkungslos und fiel erst dem zweiten Check auf. Entscheidend ist nie der Name des Tokens,
// sondern der Wert, den er im jeweiligen Theme annimmt.
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
// ungelöster Fehler mit Deckmantel. Aktuell keine: Der einzige Kandidat (gedrückter Chip) ist
// stattdessen behoben worden, indem er im Dark invertiert wie das Segmented Control.
const ALLOW = new Map();

const findings = [];
for (const [sel, body] of rules(components)) {
  if (!STATE.test(sel)) continue;
  const decls = [...body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map(([, p, v]) => [p.trim(), v.trim()]);
  const setsBoth = decls.some(([p]) => p === 'background' || p === 'background-color') && decls.some(([p]) => p === 'color');
  if (setsBoth) continue; // trägt seinen Kontrast selbst

  for (const [prop, value] of decls) {
    if (!PROPS.includes(prop)) continue;
    for (const [, token] of value.matchAll(/var\((--[\w-]+)\)/g)) {
      // Nicht pauschal überspringen, nur weil ein Token im Dark-Block steht: Die Neutrals kippen dort
      // auf DUNKLE Werte (--n-100 = #1C2E2E). "theme-aware" heißt nicht "unkritisch", entscheidend ist
      // der Wert, den der Token im Dark tatsächlich annimmt. resolve() liefert genau den.
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

// ── Zweiter Check: zerrissene Füllung/Text-Paare ──────────────────────────────────────────────────
// Eine Regel, die Hintergrund UND Textfarbe gemeinsam setzt, trägt ihren Kontrast selbst und wird vom
// Check oben übersprungen. Das gilt aber nur, solange das Paar zusammenbleibt. Überschreibt eine
// andere Regel nur EINE Hälfte davon, entsteht genau der Fehler, den der erste Check nicht sieht:
//
//   .chip[data-area="co"][aria-pressed="true"] { background: co-700; color: #fff }   ← Paar
//   [data-theme="dark"] .chip[aria-pressed="true"]:hover { background: n-200 }       ← nur Füllung
//   → helle Füllung, weißer Text stehen geblieben = 1,53:1
//
// Grenze der Methode: Selektor-Verwandtschaft wird über die Atome eines einzelnen Compounds bestimmt
// (Klassen und Attribute). Für Nachfahren-Selektoren ist das zu grob, für die Zustands-Regeln dieser
// Codebasis reicht es.
const atoms = (sel) =>
  new Set((sel.replace(/\[data-theme="dark"\]\s*/, '').match(/\.[\w-]+|\[[^\]]+\]/g) || []));
const subset = (a, b) => [...a].every((x) => b.has(x));
const hasBg = (d) => d.some(([p]) => p === 'background' || p === 'background-color');
const hasColor = (d) => d.some(([p]) => p === 'color');

const all = [];
for (const [file, css] of [['dark-mode.css', dark], ['components.css', components]])
  for (const [sel, body] of rules(css))
    for (const one of sel.split(',')) {
      const decls = [...body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map(([, p, v]) => [p.trim(), v.trim()]);
      if (!hasBg(decls) && !hasColor(decls)) continue;
      all.push({ sel: one.trim(), file, order: all.length, decls, spec: spec(one.trim()), atoms: atoms(one.trim()) });
    }

// Ein zerrissenes Paar allein ist kein Fehler: Fast jeder Hover ändert nur die Füllung, und der Text
// bleibt lesbar. Und paarweises Vergleichen genügt nicht, weil im Dark oft eine spezifischere Regel
// den Text längst überschrieben hat. Deshalb wird hier die Kaskade je (Element, Theme, Zustand)
// nachgebildet: Wer gewinnt die Füllung, wer die Textfarbe — und trägt das Ergebnis?
const scoped = (sel) => sel.includes('[data-theme="dark"]');
const stateOf = (sel) => (STATE.test(sel) ? 'hover' : '');
const key = (set) => [...set].sort().join('');

const colorRules = [];
for (const [css] of [[dark], [components]])
  for (const [sel, body] of rules(css))
    for (const one of sel.split(',')) {
      const t = one.trim();
      // Pseudo-Elemente setzen NICHT den Grund des Elements (.ep-nav-btn::after ist der Unterstrich).
      if (!t || t.includes('::')) continue;
      // Nur einfache Compounds (nach Abzug des Theme-Prefix, das immer ein Leerzeichen mitbringt).
      const bare = t.replace(/\[data-theme="dark"\]\s*/, '');
      if (bare.includes(' ') || bare.includes('>')) continue;
      const decls = [...body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map(([, p, v]) => [p.trim(), v.trim()]);
      const bg = decls.find(([p]) => p === 'background' || p === 'background-color');
      const col = decls.find(([p]) => p === 'color');
      if (!bg && !col) continue;
      colorRules.push({ sel: t, atoms: atoms(t), dark: scoped(t), state: stateOf(t),
        bg: bg?.[1] ?? null, color: col?.[1] ?? null, spec: spec(t), order: colorRules.length });
    }

/** Token-Auflösung je Theme: im Dark gewinnen die im Dark-Block neu belegten Werte. */
const resolveLight = resolver(read('css/tokens.css'));
const hexIn = (theme, val) => {
  if (!val) return null;
  const v = val.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) return v;
  if (/^white$/i.test(v)) return '#ffffff';
  const tok = v.match(/var\((--[\w-]+)\)/);
  if (!tok) return null; // rgba(), Verläufe, currentColor: nicht statisch entscheidbar
  return theme === 'dark' ? resolve(tok[1]) : resolveLight(tok[1]);
};

// Kandidaten-Elemente: alles, was irgendwo Füllung UND Text gemeinsam gesetzt bekommt.
const elements = new Map();
for (const r of colorRules) if (r.bg && r.color) elements.set(key(r.atoms), r.atoms);

const split = [];
for (const [, el] of elements)
  for (const theme of ['light', 'dark'])
    for (const state of ['', 'hover']) {
      const applies = colorRules.filter(
        (r) => subset(r.atoms, el) && (!r.dark || theme === 'dark') && (r.state === '' || r.state === state),
      );
      const best = (prop) =>
        applies.filter((r) => r[prop]).sort((a, b) => a.spec - b.spec || a.order - b.order).pop();
      const bgR = best('bg'), colR = best('color');
      if (!bgR || !colR || bgR === colR) continue;
      const bgHex = hexIn(theme, bgR.bg), textHex = hexIn(theme, colR.color);
      if (!bgHex || !textHex) continue;
      const r = contrast(textHex, bgHex);
      if (r >= 4.5) continue;
      split.push({ el: [...el].join(''), theme, state: state || 'ruhend', bgSel: bgR.sel, colSel: colR.sel,
        bgHex, textHex, ratio: r.toFixed(2) });
    }

if (split.length) {
  console.error(`Füllung und Text stammen aus verschiedenen Regeln und tragen nicht (${split.length}):\n`);
  for (const s of split)
    console.error(
      `  ${s.el}  (${s.theme}, ${s.state})\n` +
        `      Füllung ${s.bgHex} aus: ${s.bgSel}\n` +
        `      Text    ${s.textHex} aus: ${s.colSel}\n` +
        `      → ${s.ratio}:1, nötig 4,5:1\n`,
    );
  console.error('Beheben: beide Hälften gemeinsam setzen, oder die Regel so einschränken, dass sie das');
  console.error('Paar nicht trifft (z. B. eigene Regel je Bereichsvariante). Siehe CONTRIBUTING § 5.');
  process.exit(1);
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
