#!/usr/bin/env node
// Setzt die GitHub-Pages-Site aus dem Speicher-Branch `pages-storage` zusammen (ADR-0009):
// der geprüfte `main`-Build an die Wurzel, die PR-Vorschauen offener PRs unter
// `pr-preview/pr-<N>/`. Der Speicher hat genau zwei Arten von Einträgen, `main/` und `pr-<N>/`.
//
// WARUM JEDER DEPLOY DIE GANZE SITE BAUT
// `actions/deploy-pages` ersetzt die Site immer vollständig, ein „nur dieses Verzeichnis
// aktualisieren“ gibt es nicht. Deshalb trägt jeder Publish-Lauf erst seinen Build in den Speicher
// ein und setzt danach aus dem Speicher alles neu zusammen. Das ist idempotent: Ein ausgefallener
// Lauf wird vom nächsten nachgeholt, und eine verpasste Aufräumaktion heilt sich selbst, weil nur
// PRs in die Site kommen, die gerade offen sind.
//
// FREMDDATEN
// Der Vorschau-Build ist der Stand eines PR-Branches — er wird nur kopiert, nie ausgeführt. Die
// PR-Nummer, aus der der Pfad entsteht, wird streng geprüft (`slotFuerPr`), damit kein Wert aus
// einem Event-Payload einen Pfad außerhalb des Speichers ergibt.
//
// Aufruf im Publish-Workflow (.github/workflows/storybook-pages.yml):
//   node tools/ci/pages-site.mjs aktualisieren --speicher <dir> --slot main|pr-<N> --build <dir>
//   node tools/ci/pages-site.mjs bereinigen --speicher <dir> --offen "3,7"
//   node tools/ci/pages-site.mjs zusammensetzen --speicher <dir> --site <dir> --offen "3,7"
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

/** Unterverzeichnis der Site, unter dem die PR-Vorschauen liegen. */
export const VORSCHAU_VERZEICHNIS = 'pr-preview';

const PR_NUMMER = /^[1-9][0-9]*$/;
const istPrSlot = (name) => name.startsWith('pr-') && PR_NUMMER.test(name.slice(3));

/**
 * @param {number|string} nummer PR-Nummer
 * @returns {string} `pr-<N>`
 */
export function slotFuerPr(nummer) {
  const text = String(nummer ?? '');
  if (!PR_NUMMER.test(text)) {
    throw new Error(`Ungültige PR-Nummer: ${JSON.stringify(nummer)}`);
  }
  return `pr-${text}`;
}

function pruefeSlot(slot) {
  if (slot !== 'main' && !istPrSlot(slot)) {
    throw new Error(`Ungültiger Slot: ${JSON.stringify(slot)} (erwartet main oder pr-<N>)`);
  }
}

// Ein Storybook-Build ohne index.html ist kein Build — lieber den Lauf abbrechen, als einen
// leeren Stand in den Speicher und damit live zu bringen.
function pruefeBuild(dir, beschreibung) {
  if (!existsSync(join(dir, 'index.html'))) {
    throw new Error(`${beschreibung} enthält keine index.html: ${dir}`);
  }
}

/**
 * Ersetzt den Slot `slot` im Speicher vollständig durch den Inhalt von `buildDir`.
 * @param {string} speicherDir
 * @param {string} slot `main` oder `pr-<N>`
 * @param {string} buildDir
 */
export function speicherAktualisieren(speicherDir, slot, buildDir) {
  pruefeSlot(slot);
  pruefeBuild(buildDir, 'Build');
  const ziel = join(speicherDir, slot);
  rmSync(ziel, { recursive: true, force: true });
  mkdirSync(speicherDir, { recursive: true });
  cpSync(buildDir, ziel, { recursive: true });
}

/**
 * Entfernt die Vorschauen aller PRs, die nicht mehr offen sind. `main/` und Einträge, die keine
 * Vorschau sind, bleiben unangetastet.
 * @param {string} speicherDir
 * @param {Array<number|string>} offenePrs
 * @returns {string[]} entfernte Slots
 */
export function speicherBereinigen(speicherDir, offenePrs) {
  const offen = new Set(offenePrs.map(slotFuerPr));
  const entfernt = [];
  for (const eintrag of readdirSync(speicherDir)) {
    if (istPrSlot(eintrag) && !offen.has(eintrag)) {
      rmSync(join(speicherDir, eintrag), { recursive: true, force: true });
      entfernt.push(eintrag);
    }
  }
  return entfernt;
}

/**
 * Baut die komplette Site unter `siteDir`: `main/` an die Wurzel, jede offene Vorschau mit
 * abgelegtem Build unter `pr-preview/pr-<N>/`.
 * @param {string} speicherDir
 * @param {string} siteDir
 * @param {Array<number|string>} offenePrs
 * @returns {{ vorschauen: number[] }} die PR-Nummern, deren Vorschau in der Site liegt
 */
export function siteZusammensetzen(speicherDir, siteDir, offenePrs) {
  const mainDir = join(speicherDir, 'main');
  pruefeBuild(mainDir, 'Der main-Build im Speicher');
  if (existsSync(join(mainDir, VORSCHAU_VERZEICHNIS))) {
    throw new Error(
      `Der main-Build enthält selbst ein Verzeichnis ${VORSCHAU_VERZEICHNIS}/ — es würde die Vorschauen überdecken.`,
    );
  }
  rmSync(siteDir, { recursive: true, force: true });
  cpSync(mainDir, siteDir, { recursive: true });

  const vorschauen = [];
  for (const nummer of offenePrs) {
    const slot = slotFuerPr(nummer);
    const quelle = join(speicherDir, slot);
    if (!existsSync(join(quelle, 'index.html'))) continue;
    cpSync(quelle, join(siteDir, VORSCHAU_VERZEICHNIS, slot), { recursive: true });
    vorschauen.push(Number(nummer));
  }
  return { vorschauen };
}

function offeneListe(text) {
  return (text ?? '')
    .split(',')
    .map((teil) => teil.trim())
    .filter(Boolean);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      speicher: { type: 'string' },
      slot: { type: 'string' },
      build: { type: 'string' },
      site: { type: 'string' },
      offen: { type: 'string' },
    },
  });
  const [befehl] = positionals;
  try {
    if (!values.speicher) throw new Error('--speicher fehlt');
    if (befehl === 'aktualisieren') {
      if (!values.slot || !values.build) throw new Error('--slot und --build sind Pflicht');
      speicherAktualisieren(values.speicher, values.slot, values.build);
      console.log(`Speicher: ${values.slot} aktualisiert`);
    } else if (befehl === 'bereinigen') {
      const entfernt = speicherBereinigen(values.speicher, offeneListe(values.offen));
      console.log(`Speicher: entfernt ${entfernt.length ? entfernt.join(', ') : 'nichts'}`);
    } else if (befehl === 'zusammensetzen') {
      if (!values.site) throw new Error('--site fehlt');
      const { vorschauen } = siteZusammensetzen(values.speicher, values.site, offeneListe(values.offen));
      console.log(`Site: main + ${vorschauen.length} Vorschau(en)${vorschauen.length ? ' (' + vorschauen.join(', ') + ')' : ''}`);
    } else {
      throw new Error('Befehl erwartet: aktualisieren | bereinigen | zusammensetzen');
    }
  } catch (fehler) {
    console.error(fehler.message);
    process.exit(1);
  }
}
