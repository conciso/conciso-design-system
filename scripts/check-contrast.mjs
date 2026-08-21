#!/usr/bin/env node
/**
 * Kontrast-Gate: misst die gerenderte Doku-Seite in BEIDEN Modi und zählt Verstöße.
 *
 * Warum im Browser und nicht am CSS: Kontrast entsteht erst aus der fertigen Kette. Eine Farbe
 * kann als Token einwandfrei sein und trotzdem auf dem Grund landen, den ein Elternelement drei
 * Ebenen höher setzt, halbtransparent überlagert von einem vierten. Genau diese Zusammensetzung
 * rechnet dieses Skript nach: es liest computed styles, komponiert halbtransparente Schichten
 * aufeinander und vergleicht das Ergebnis. Deshalb findet es auch inline gesetzte Farben, die
 * kein Token-Check sieht.
 *
 * Drei Prüfungen:
 *   1. TEXT      – WCAG 1.4.3: 4,5:1, ab 24 px bzw. 18,66 px + fett 3:1.
 *   2. FÜLLUNGEN – Hausregel (CONTRIBUTING § 3): getönte Bauteil-Füllungen mindestens 1,3:1 gegen
 *                  ihren Grund UND mindestens 10 L*-Punkte Helligkeitsabstand. Das zweite Kriterium
 *                  ist nötig, weil satte Farben den Quotienten erfüllen können, ohne als Stufe zu
 *                  lesen: die ES-Füllung im Dark lag bei 1,33:1 mit nur 8,3 L*.
 *   3. RAHMEN    – WCAG 1.4.11: Bedienelement-Grenzen 3:1, gerechnet gegen die günstigere der
 *                  beiden Seiten (innen/außen), weil eine sichtbare Seite genügt.
 *
 * Genau EINE Ausnahme, siehe SPECIMEN: Swatches, die ein Farbpaar als Inhalt zeigen. In den
 * Kontrast-Tabellen steht daneben das gemessene Verhältnis und ein Pass/Fail-Badge; der Wert IST
 * dort die Aussage, nicht die Oberfläche. Alles andere zählt, auch Paletten-Beschriftungen,
 * Code-Blöcke und Specimen.
 *
 * Text über Fotos und Verläufen wird NICHT gewertet, sondern nur gezählt: sein Grund lässt sich
 * nicht über die Elternkette auflösen, das braucht eine Pixelmessung (siehe Hero-Scrim im
 * CHANGELOG). Diese Fälle bleiben Handarbeit.
 *
 * RESTLISTE: Das Gate ist eine Ratsche. Es schlägt fehl, wenn eine Zahl STEIGT (Regression) und
 * ebenso, wenn sie SINKT, ohne dass die Restliste nachgezogen wurde. So bleibt der Stand ehrlich
 * im Repo sichtbar und kann sich nur nach unten bewegen. Ziel ist überall 0.
 */
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = 'file://' + join(ROOT, 'docs/index.html');

/**
 * Stand 2026-08-20: alles 0. Ab hier ist jede Abweichung eine Regression, und der Fehlschlag
 * nennt die Stelle. Der Weg dahin, zur Einordnung der Groessenordnung: Light 49 Text / 101
 * Fuellungen / 6 Rahmen, Dark 20 / 0 / 0.
 */
const RESTLISTE = {
  light: { text: 0, fill: 0, border: 0 },
  dark: { text: 0, fill: 0, border: 0 },
};

/* Swatches, die das Farbpaar selbst zeigen (Kontrast-Tabellen). Einzige Ausnahme. */
const SPECIMEN = ['cswatch', 'cbadge'];

/**
 * Bauteile, deren Füllung als FLÄCHE lesen muss: STATUS-Träger. Bei ihnen ist die Farbfläche der
 * schnelle Hinweis in dichten Kontexten (Tabellenzeile, Liste), noch bevor das Label gelesen wird.
 * Für sie gilt die Hausregel (1,3:1 und 10 L*).
 * NICHT hier drin, und das ist eine bewusste Grenze:
 *   · Dekorative Flächen (Icon-Kachel .ep-card-icon, Timeline-Marker .ep-tl-icon). WCAG verlangt
 *     nichts, der Glyph ist aria-hidden und wiederholt das Eyebrow daneben.
 *   · Bereichs-Pill und Bereichs-Badge. Sie benennen eine Kategorie, und das tut ihr Label; die
 *     Fläche ist Dekor. Im Light tragen sie deshalb den ruhigen Tint mit kräftiger Schrift
 *     (7,5 bis 11,4:1), wie die Kacheln. Im Dark liegt helle Schrift auf dunklem Tint, dort sind
 *     die Werte gehoben, aber auch das ist eine Marken-, keine WCAG-Entscheidung.
 * Was in beiden Fällen geprüft bleibt, ist der Text darauf, und der läuft über die Text-Prüfung.
 * Neue Status-Füllung hier ergänzen, neue Label- oder Dekor-Fläche nicht.
 */
const FILL_SELECTOR = [
  '.badge-ok', '.badge-warn', '.badge-err', '.badge-neu', '.card-stat-trend',
].join(',');

/* Bedienelemente, deren Rahmen die Grenze markiert (WCAG 1.4.11). */
const BORDER_SELECTOR = [
  '.field input', '.field select', '.field textarea', '.chip', '.btn-outlined',
  '.ep-select-trigger', '.ep-combobox-control', '.seg', 'input[type=search]',
].join(',');

function resolveChromium() {
  const require = createRequire(import.meta.url);
  // playwright-core wird von storybook-angular deklariert, liegt physisch aber je nach
  // Installations-Layout woanders: seit der npm-Workspaces-Umstellung hoistet npm es ins
  // Wurzel-node_modules (damit storybook-angular und angular-lib EIN @angular/* teilen),
  // bei einer isolierten Installation im Workspace selbst. Deshalb erst Nodes eigene
  // Auflösung fragen und nur als Rückfall den verschachtelten Pfad prüfen — ein fest
  // verdrahteter Pfad bricht bei jeder Änderung am Layout.
  try {
    return require('playwright-core').chromium;
  } catch {
    const nested = join(ROOT, 'storybook-angular/node_modules/playwright-core');
    if (existsSync(nested)) return require(join(nested, 'index.js')).chromium;
  }
  console.error('Kontrast-Gate: playwright-core nicht gefunden.');
  console.error('  → npm ci    (im Repo-Wurzelverzeichnis; npm-Workspaces installieren');
  console.error('    storybook-angular und angular-lib mit)');
  process.exit(1);
}

/** Läuft im Seitenkontext. Muss selbstständig sein, keine Closures von außen. */
function collect({ specimen, fillSelector, borderSelector }) {
  /**
   * Computed-Farbe lesen. Zwei Formen, weil Chrome color-mix() NICHT als rgb() zurückgibt,
   * sondern als color(srgb 0.95 0.987 0.987) mit Werten von 0 bis 1. Wer das als 0..255 liest,
   * bekommt Beinah-Schwarz und damit erfundene Befunde. Alles, was keine dieser Formen hat
   * (oklch, lab, …), wird NICHT geraten, sondern als nicht auswertbar gezählt.
   */
  const parse = (c) => {
    if (!c) return null;
    const srgb = /^color\(srgb\s+([-\d.eE%]+)\s+([-\d.eE%]+)\s+([-\d.eE%]+)(?:\s*\/\s*([-\d.eE%]+))?\s*\)$/.exec(c.trim());
    if (srgb) {
      const num = (t) => (t.endsWith('%') ? parseFloat(t) / 100 : parseFloat(t));
      return { r: num(srgb[1]) * 255, g: num(srgb[2]) * 255, b: num(srgb[3]) * 255, a: srgb[4] === undefined ? 1 : num(srgb[4]) };
    }
    if (/^(rgb|rgba)\(/.test(c)) {
      const v = c.match(/[\d.]+/g);
      return v ? { r: +v[0], g: +v[1], b: +v[2], a: v[3] === undefined ? 1 : +v[3] } : null;
    }
    if (/^(transparent|none)$/.test(c.trim())) return { r: 0, g: 0, b: 0, a: 0 };
    return { unparsed: c };
  };
  const over = (t, b) => ({
    r: t.r * t.a + b.r * (1 - t.a), g: t.g * t.a + b.g * (1 - t.a),
    b: t.b * t.a + b.b * (1 - t.a), a: 1,
  });
  const lum = (c) => {
    const f = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4) };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (fg, bg) => {
    const s = [lum(fg), lum(bg)].sort((m, n) => n - m);
    return +((s[0] + 0.05) / (s[1] + 0.05)).toFixed(2);
  };
  /**
   * Helligkeit in L* (CIE-Lab, Y aus derselben Leuchtdichte). Zweites Kriterium für Füllungen:
   * Der Kontrastquotient allein greift bei satten Farben zu kurz. Zwei Flächen können 1,33:1
   * erfüllen und trotzdem nicht als Stufe lesen, wenn der Unterschied fast nur in Farbton und
   * Sättigung liegt. Genau so lag die ES-Füllung im Dark: 1,33:1, aber nur 8,3 L*-Punkte Abstand.
   */
  const lstar = (c) => { const Y = lum(c); return 116 * (Y > 0.008856 ? Math.cbrt(Y) : 7.787 * Y + 16 / 116) - 16 };
  /** Effektiver Grund: Elternkette hoch, halbtransparente Schichten aufeinander komponiert. */
  const stack = (el, includeSelf) => {
    const layers = [];
    let node = includeSelf ? el : el.parentElement, image = false, host = null, unknown = false;
    while (node) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') image = true;
      const c = parse(cs.backgroundColor);
      if (c && c.unparsed) { unknown = true; break }
      if (c && c.a > 0) { layers.push(c); if (!host) host = node; if (c.a >= 0.999) break }
      node = node.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    if (layers.length && layers[layers.length - 1].a >= 0.999) base = layers.pop();
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return { bg: base, image, unknown, host: host || document.body };
  };
  const isSpecimen = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement)
      if ([...a.classList].some((c) => specimen.includes(c))) return true;
    return false;
  };
  const name = (el) => el.className.toString().trim().split(/\s+/)[0] || el.tagName.toLowerCase();
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  /** Kurzer Pfad zum Auffinden im Markup: nächste id plus die letzten Glieder mit Klasse. */
  const path = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body && parts.length < 4; n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) { parts.unshift('#' + n.id); break }
      const c = n.className.toString().trim().split(/\s+/).filter(Boolean).slice(0, 2);
      if (c.length) s += '.' + c.join('.');
      parts.unshift(s);
    }
    return parts.join(' > ');
  };

  const out = { text: [], fill: [], border: [], overImage: 0, specimen: 0, unknown: 0, checked: 0 };

  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0') continue;
    if (el.closest('.sr-only')) continue;
    const hasOwnText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!hasOwnText) continue;
    const g = stack(el, true);
    if (g.image) { out.overImage++; continue }
    if (g.unknown) { out.unknown++; continue }
    if (isSpecimen(el)) { out.specimen++; continue }
    const raw = parse(cs.color);
    if (!raw || raw.unparsed) { if (raw) out.unknown++; continue }
    if (raw.a === 0) continue;
    const fg = raw.a >= 0.999 ? raw : over(raw, g.bg);
    const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight) || 400;
    const need = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
    const r = ratio(fg, g.bg);
    out.checked++;
    if (r < need) out.text.push({ sel: name(el), on: name(g.host), r, need, size: Math.round(size), color: cs.color, ground: hex(g.bg), path: path(el), txt: el.textContent.trim().slice(0, 44) });
  }

  for (const el of document.querySelectorAll(fillSelector)) {
    const cs = getComputedStyle(el);
    const own = parse(cs.backgroundColor);
    if (!own || own.unparsed || own.a === 0 || isSpecimen(el)) { if (own && own.unparsed) out.unknown++; continue }
    const g = stack(el, false);
    if (g.image || g.unknown) continue;
    const fill = own.a >= 0.999 ? own : over(own, g.bg);
    const r = ratio(fill, g.bg);
    const dL = Math.abs(lstar(fill) - lstar(g.bg));
    if (r < 1.3 || dL < 10)
      out.fill.push({ sel: name(el), on: name(g.host), r, need: 1.3, dL: +dL.toFixed(1), why: r < 1.3 ? 'Kontrast' : 'Helligkeit', path: path(el) });
  }

  for (const el of document.querySelectorAll(borderSelector)) {
    const cs = getComputedStyle(el);
    const w = parseFloat(cs.borderTopWidth) || 0;
    const bc = parse(cs.borderTopColor);
    if (!w || !bc || bc.unparsed || bc.a === 0 || isSpecimen(el)) { if (bc && bc.unparsed) out.unknown++; continue }
    const inner = stack(el, true), outer = stack(el, false);
    if (inner.image || outer.image || inner.unknown || outer.unknown) continue;
    const b = bc.a >= 0.999 ? bc : over(bc, inner.bg);
    const r = Math.max(ratio(b, inner.bg), ratio(b, outer.bg));
    if (r < 3) out.border.push({ sel: name(el), r, need: 3, color: cs.borderTopColor, path: path(el) });
  }
  return out;
}

const group = (rows, key) => {
  const m = new Map();
  for (const x of rows) {
    const k = key(x);
    const e = m.get(k) || { n: 0, worst: Infinity, ex: x };
    e.n++;
    if (x.r < e.worst) { e.worst = x.r; e.ex = x }
    m.set(k, e);
  }
  return [...m.entries()].sort((a, b) => a[1].worst - b[1].worst);
};

const LIST = process.argv.includes('--list');   // jeden Fund einzeln mit Pfad ausgeben

const chromium = resolveChromium();
let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ channel: 'chrome' }); // lokal ohne gebündelten Browser
}
const page = await browser.newPage();
await page.goto(PAGE);
/* Übergänge abschalten, sonst liest die Messung Zwischenwerte der Theme-Animation. Die Seite
   animiert color und background (--m-std); ohne das hier wandern die Zahlen je nach Wartezeit,
   und ein Gate mit wackligen Zahlen ist wertlos. */
await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });

let failed = false;
for (const theme of ['light', 'dark']) {
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const r = await page.evaluate(collect, { specimen: SPECIMEN, fillSelector: FILL_SELECTOR, borderSelector: BORDER_SELECTOR });
  const soll = RESTLISTE[theme];
  const ist = { text: r.text.length, fill: r.fill.length, border: r.border.length };

  console.log(`\n── ${theme.toUpperCase()} ──  ${r.checked} Textknoten geprüft, ${r.overImage} über Bild/Verlauf (Pixelmessung nötig), ${r.specimen} Specimen ausgenommen, ${r.unknown} Farbe nicht auswertbar`);
  for (const [art, label, rows] of [
    ['text', 'Text (WCAG 1.4.3)', r.text],
    ['fill', 'Füllungen (1,3:1 UND 10 L*)', r.fill],
    ['border', 'Bedienelement-Rahmen (WCAG 1.4.11)', r.border],
  ]) {
    const mark = ist[art] > soll[art] ? '⛔ REGRESSION' : ist[art] < soll[art] ? '↓ Restliste senken' : 'unverändert';
    console.log(`   ${label}: ${ist[art]} (Restliste ${soll[art]}) ${mark}`);
    if (ist[art] !== soll[art]) failed = true;
    if (LIST) {
      for (const x of rows.sort((a, b) => a.r - b.r))
        console.log(`      ${String(x.r).padStart(5)}:1 (Soll ${x.need})${x.dL !== undefined ? `  ΔL* ${x.dL} (Soll 10, ${x.why})` : ''}  ${x.path}${x.color ? `  ${x.color}` : ''}${x.ground ? ` auf ${x.ground}` : ''}${x.txt ? `  "${x.txt}"` : ''}`);
    } else {
      for (const [k, v] of group(rows, (x) => `${x.sel} auf ${x.on || '-'}`).slice(0, 10))
        console.log(`      ${String(v.n).padStart(3)}x ${k.padEnd(34)} ${String(v.worst).padStart(5)}:1 (Soll ${v.ex.need})${v.ex.txt ? `  "${v.ex.txt}"` : ''}`);
    }
  }
}
await browser.close();

if (failed) {
  console.error('\nKontrast-Gate: Ist-Stand und Restliste weichen ab.');
  console.error('  Mehr Befunde  → Regression, Ursache beheben.');
  console.error('  Weniger       → Erfolg, RESTLISTE in scripts/check-contrast.mjs nachziehen.');
  process.exit(1);
}
console.log('\nKontrast-Gate: Ist-Stand entspricht der Restliste, keine Regression.');
