// Prüft die Farben für Datenvisualisierung (--dv-*) und die Status-Flächen (--c-*-fill) auf
// Kontrast und Unterscheidbarkeit, in Light und Dark. Dependency-frei, gedacht als CI-Gate nach
// dem Token-Build (liest packages/css/dist/tokens/tokens.json, Werte mit aufgelöstem var()).
//
// WARUM ES DIESEN CHECK GIBT
// check:contrast misst gerenderten Text und Bauteil-Füllungen in der Doku. Diagrammfarben stehen
// dort nicht als Text, und ob sechs Farben sich bei Farbsehschwäche noch unterscheiden, sieht kein
// Kontrastrechner. Eine Farbe, die einzeln 3:1 trägt, kann trotzdem mit ihrer Nachbarin
// verschmelzen. Genau das ist bei der Entwicklung der Palette mehrfach passiert (Orange und Grün
// unter Protanopie, das erste „Sonstige“-Grau unter Deuteranopie auf Teal).
//
// WAS ER PRÜFT
// 1. Jede --dv-* und --c-*-fill trägt ≥ 3:1 gegen die Flächen, auf denen Diagramme stehen
//    (WCAG 1.4.11): Light gegen bg-surface und n-50, Dark gegen bg-page und bg-surface.
// 2. Die kategorialen Farben samt --dv-other haben paarweise einen Mindestabstand in OKLab, normal
//    und unter Simulation von Deuteranopie und Protanopie (Machado et al. 2009, Schweregrad 1,0).
// 3. Die sequenzielle Skala ist in der Helligkeit monoton (Light dunkler, Dark heller mit der
//    Menge) und ihre Stufen sind voneinander unterscheidbar.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const TOKENS = join(ROOT, 'packages/css/dist/tokens/tokens.json');

/** Kleinster OKLab-Abstand, ab dem zwei Kategorien als sicher unterscheidbar gelten. */
const MIN_DELTA_CATEGORICAL = 0.06;
/** Kleinster OKLab-Abstand zwischen benachbarten Stufen einer sequenziellen Skala. */
const MIN_DELTA_STEP = 0.05;
const MIN_CONTRAST = 3;

const CATEGORICAL = ['dv-cat-1', 'dv-cat-2', 'dv-cat-3', 'dv-cat-4', 'dv-cat-5', 'dv-cat-6', 'dv-other'];
const SEQUENTIAL = ['dv-seq-1', 'dv-seq-2', 'dv-seq-3', 'dv-seq-4', 'dv-seq-5'];
const SURFACES = { light: ['bg-surface', 'n-50'], dark: ['bg-page', 'bg-surface'] };

const SIMULATIONS = {
  normal: null,
  Deuteranopie: [
    [0.367, 0.861, -0.228],
    [0.28, 0.673, 0.047],
    [-0.012, 0.043, 0.969],
  ],
  Protanopie: [
    [0.152, 1.053, -0.205],
    [0.115, 0.786, 0.099],
    [-0.004, -0.048, 1.052],
  ],
};

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** '#RRGGBB' → lineares sRGB [r, g, b]; andere Formate (rgba, Shorthands) liefern null. */
function linearRgb(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  return [0, 2, 4].map((i) => toLinear(parseInt(m[1].slice(i, i + 2), 16) / 255));
}

const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function simulate(rgb, matrix) {
  if (!matrix) return rgb;
  return matrix.map((row) => Math.min(1, Math.max(0, row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])));
}

function oklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

const deltaE = (a, b) => Math.hypot(...oklab(a).map((v, i) => v - oklab(b)[i]));
const fmt = (n, digits = 2) => n.toFixed(digits).replace('.', ',');

const tokens = JSON.parse(readFileSync(TOKENS, 'utf8'));
const problems = [];

for (const mode of ['light', 'dark']) {
  const values = { ...tokens.light, ...(mode === 'dark' ? tokens.dark : {}) };
  const rgb = (name) => {
    const v = linearRgb(values[name]);
    if (!v) problems.push(`${mode}: --${name} fehlt oder ist kein #RRGGBB-Wert (${values[name]})`);
    return v;
  };

  const checked = Object.keys(values).filter((n) => n.startsWith('dv-') || /^c-.+-fill$/.test(n));
  for (const name of checked) {
    const color = rgb(name);
    if (!color) continue;
    for (const surface of SURFACES[mode]) {
      const bg = rgb(surface);
      if (!bg) continue;
      const ratio = contrast(color, bg);
      if (ratio < MIN_CONTRAST) problems.push(`${mode}: --${name} trägt gegen --${surface} nur ${fmt(ratio)}:1 (Soll ≥ 3:1)`);
    }
  }

  const categorical = CATEGORICAL.map((n) => [n, rgb(n)]).filter(([, c]) => c);
  for (const [simName, matrix] of Object.entries(SIMULATIONS)) {
    for (let i = 0; i < categorical.length; i++) {
      for (let j = i + 1; j < categorical.length; j++) {
        const [na, a] = categorical[i];
        const [nb, b] = categorical[j];
        const d = deltaE(simulate(a, matrix), simulate(b, matrix));
        if (d < MIN_DELTA_CATEGORICAL) {
          problems.push(`${mode}: --${na} und --${nb} liegen ${simName === 'normal' ? '' : `unter ${simName} `}nur ΔE ${fmt(d, 3)} auseinander (Soll ≥ ${fmt(MIN_DELTA_CATEGORICAL, 2)})`);
        }
      }
    }
  }

  const steps = SEQUENTIAL.map((n) => [n, rgb(n)]).filter(([, c]) => c);
  for (let i = 1; i < steps.length; i++) {
    const [prevName, prev] = steps[i - 1];
    const [name, color] = steps[i];
    const getsDarker = luminance(color) < luminance(prev);
    if (getsDarker !== (mode === 'light')) {
      problems.push(`${mode}: --${name} ist nicht ${mode === 'light' ? 'dunkler' : 'heller'} als --${prevName}, die Skala muss mit der Menge ${mode === 'light' ? 'dunkler' : 'heller'} werden`);
    }
    const d = deltaE(prev, color);
    if (d < MIN_DELTA_STEP) problems.push(`${mode}: --${prevName} und --${name} liegen nur ΔE ${fmt(d, 3)} auseinander (Soll ≥ ${fmt(MIN_DELTA_STEP, 2)})`);
  }
}

if (problems.length) {
  console.error(`Datenpalette: ${problems.length} Befund(e)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log('Datenpalette: Kontrast, Unterscheidbarkeit (inkl. Deuteranopie/Protanopie) und Stufen in Light und Dark in Ordnung.');
