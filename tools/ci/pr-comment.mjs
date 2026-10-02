#!/usr/bin/env node
// Rendert den Sticky-Kommentar der PR-Vorschau (ADR-0009): Link auf die Vorschau, darunter die
// neuen und geänderten Stories des PRs (story-links.json aus tools/ci/story-links.mjs).
//
// FREMDDATEN
// story-links.json entsteht im unprivilegierten PR-Lauf und ist damit Daten eines PR-Autors. Der
// Publish-Workflow läuft mit Schreibrecht auf PRs, deshalb vertraut dieses Skript dem Inhalt nicht:
// - Links entstehen NIE aus URLs der Datei, sondern aus der vertrauenswürdigen Vorschau-URL
//   (`--vorschau`) und den Story-IDs; die IDs werden auf ein enges Zeichenspektrum geprüft.
// - Titel, Namen und Pfade laufen durch `escape` (kein Markdown, kein HTML, keine Steuerzeichen,
//   begrenzte Länge) — ein Titel wie „[Zahlung](https://evil)“ erscheint als Text.
// - Anzahl der Einträge ist begrenzt, damit der Kommentar unter dem Limit von GitHub bleibt.
// Eine unlesbare oder ungültige Datei ist kein Fehler des Workflows: Der Kommentar nennt dann nur
// die Vorschau und sagt, dass die Story-Links fehlen.
//
// Aufruf im Publish-Workflow (.github/workflows/storybook-pages.yml):
//   node tools/ci/pr-comment.mjs --vorschau <url> --sha <sha> [--links story-links.json] --out kommentar.md
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

/** Erste Zeile des Kommentars; daran erkennt der Workflow den eigenen Kommentar wieder. */
export const MARKER = '<!-- storybook-pr-preview -->';

export const MAX_KOMPONENTEN = 40;
export const MAX_STORIES = 25;
export const MAX_DOCS_SEITEN = 20;
export const MAX_PFADE = 20;

const MAX_TEXT = 120;
// Story-IDs sind klein geschrieben, mit Bindestrichen und gelegentlich Umlauten; Slashes, Query
// und Anführungszeichen kommen darin nicht vor.
const ID = /^[\p{L}\p{N}_.-]{1,200}$/u;
// Repo-Pfade: kein Backtick, kein Zeilenumbruch, keine Leerzeichen am Rand.
const PFAD = /^[\p{L}\p{N}_.@/-]{1,200}$/u;

/** Text → Markdown-sicher: kein Markup, keine Steuerzeichen, gekürzt. */
export function escape(wert, max = MAX_TEXT) {
  let text = String(wert ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, ' ')
    .trim();
  if (text.length > max) text = `${text.slice(0, max - 1)}…`;
  return text.replace(/[\\`*_{}[\]()<>#+!|~&:@]/g, '\\$&');
}

const istText = (wert) => typeof wert === 'string' && wert.length > 0;
const istId = (wert) => typeof wert === 'string' && ID.test(wert);

/** URL einer Story (/story/) oder Docs-Seite (/docs/) in der Vorschau. */
export function linkFuer(vorschau, art, id) {
  const wurzel = vorschau.endsWith('/') ? vorschau : `${vorschau}/`;
  return `${wurzel}?path=/${art}/${encodeURIComponent(id)}`;
}

/**
 * Prüft story-links.json und gibt nur das zurück, was der Kommentar braucht. Wirft bei einer Form,
 * die nicht stimmt; einzelne unbrauchbare Einträge werden übersprungen.
 */
export function bereinigeLinks(rohdaten) {
  if (rohdaten === null || typeof rohdaten !== 'object' || Array.isArray(rohdaten)) {
    throw new Error('story-links.json ist kein Objekt');
  }
  if (!Array.isArray(rohdaten.components) || !Array.isArray(rohdaten.docsPages) || !Array.isArray(rohdaten.unmapped)) {
    throw new Error('story-links.json: components, docsPages oder unmapped fehlt');
  }
  const status = (wert) => (wert === 'new' ? 'new' : 'changed');
  const komponenten = rohdaten.components
    .filter((k) => k && istText(k.title))
    .map((k) => ({
      title: k.title,
      status: status(k.status),
      docs: k.docs && istId(k.docs.id) ? k.docs.id : null,
      stories: (Array.isArray(k.stories) ? k.stories : [])
        .filter((s) => s && istId(s.id) && istText(s.name))
        .map((s) => ({ id: s.id, name: s.name, status: status(s.status) })),
    }));
  const docsSeiten = rohdaten.docsPages
    .filter((d) => d && istId(d.id) && istText(d.title))
    .map((d) => ({ id: d.id, title: d.title, name: istText(d.name) ? d.name : null, status: status(d.status) }));
  const global = rohdaten.global && typeof rohdaten.global === 'object' ? rohdaten.global : {};
  return {
    komponenten,
    docsSeiten,
    globalFlag: global.flag === true,
    globalDateien: (Array.isArray(global.files) ? global.files : []).filter((p) => typeof p === 'string' && PFAD.test(p)),
    nichtZugeordnet: rohdaten.unmapped.filter((p) => typeof p === 'string' && PFAD.test(p)),
    summaryOnly: rohdaten.summaryOnly === true,
    basisIndex: ['merge-base', 'pages-main', 'unavailable'].includes(rohdaten.baseIndexSource) ? rohdaten.baseIndexSource : null,
  };
}

const kuerzen = (liste, max) => ({ sichtbar: liste.slice(0, max), rest: Math.max(0, liste.length - max) });

function komponentenZeile(k, vorschau, nurTitel) {
  const titel = `**${escape(k.title)}**`;
  const ziel = k.docs ? linkFuer(vorschau, 'docs', k.docs) : k.stories[0] ? linkFuer(vorschau, 'story', k.stories[0].id) : null;
  if (nurTitel || k.stories.length === 0) return ziel ? `- [${titel}](${ziel})` : `- ${titel}`;
  const { sichtbar, rest } = kuerzen(k.stories, MAX_STORIES);
  const links = sichtbar.map((s) => `[${escape(s.name)}](${linkFuer(vorschau, 'story', s.id)})`);
  if (rest > 0) links.push(`… und ${rest} weitere`);
  const uebersicht = k.docs ? `[Übersicht](${linkFuer(vorschau, 'docs', k.docs)}) · ` : '';
  return `- ${titel}: ${uebersicht}${links.join(' · ')}`;
}

/**
 * @param {object} eingabe
 * @param {string} eingabe.vorschau vertrauenswürdige Wurzel-URL der PR-Vorschau
 * @param {string} eingabe.sha Commit des PR-Stands
 * @param {object|null} eingabe.links story-links.json (roh) oder null, wenn nicht verfügbar
 * @returns {string} Markdown des Kommentars
 */
export function rendereKommentar({ vorschau, sha, links }) {
  const kopf = [
    MARKER,
    '## Storybook-Vorschau',
    '',
    `**[Vorschau öffnen](${vorschau})** · Stand \`${String(sha).slice(0, 7)}\``,
    '',
  ];

  let daten = null;
  let fehler = null;
  if (links !== null && links !== undefined) {
    try {
      daten = bereinigeLinks(links);
    } catch (e) {
      fehler = e.message;
    }
  }
  if (!daten) {
    const grund = fehler ? ` (${escape(fehler)})` : '';
    return [...kopf, `Die Links zu neuen und geänderten Stories liegen für diesen Stand nicht vor${grund}. Die Vorschau selbst ist vollständig.`, ''].join('\n');
  }

  const zeilen = [...kopf];
  const neu = daten.komponenten.filter((k) => k.status === 'new');
  const geaendert = daten.komponenten.filter((k) => k.status !== 'new');
  const abschnitt = (titel, liste) => {
    if (liste.length === 0) return;
    const { sichtbar, rest } = kuerzen(liste, MAX_KOMPONENTEN);
    zeilen.push(`### ${titel}`, '', ...sichtbar.map((k) => komponentenZeile(k, vorschau, daten.summaryOnly)));
    if (rest > 0) zeilen.push(`- … und ${rest} weitere Komponenten`);
    zeilen.push('');
  };
  abschnitt('Neue Komponenten', neu);
  abschnitt('Geänderte Komponenten', geaendert);

  if (daten.docsSeiten.length > 0) {
    const { sichtbar, rest } = kuerzen(daten.docsSeiten, MAX_DOCS_SEITEN);
    zeilen.push('### Doku-Seiten', '');
    for (const d of sichtbar) {
      const name = d.name && d.name !== d.title ? `${escape(d.title)} · ${escape(d.name)}` : escape(d.title);
      zeilen.push(`- [${name}](${linkFuer(vorschau, 'docs', d.id)})${d.status === 'new' ? ' (neu)' : ''}`);
    }
    if (rest > 0) zeilen.push(`- … und ${rest} weitere Seiten`);
    zeilen.push('');
  }

  if (daten.globalFlag) {
    const dateien = daten.globalDateien.slice(0, 5).map((p) => `\`${p}\``).join(', ');
    zeilen.push(
      '### Globale Änderung',
      '',
      `Der PR ändert ${dateien || 'Grundlagen'}, die jede Story betreffen. [Vorschau durchsehen](${vorschau}) statt einzelner Links.`,
      '',
    );
  }

  const nichtsGefunden = daten.komponenten.length === 0 && daten.docsSeiten.length === 0 && !daten.globalFlag;
  if (nichtsGefunden && daten.nichtZugeordnet.length === 0) {
    zeilen.push('Keine neuen oder geänderten Stories erkannt.', '');
  }

  if (daten.nichtZugeordnet.length > 0) {
    const { sichtbar, rest } = kuerzen(daten.nichtZugeordnet, MAX_PFADE);
    zeilen.push(
      '<details><summary>Änderungen ohne zugeordnete Story</summary>',
      '',
      ...sichtbar.map((p) => `- \`${p}\``),
      ...(rest > 0 ? [`- … und ${rest} weitere`] : []),
      '',
      '</details>',
      '',
    );
  }

  const hinweise = [];
  if (daten.summaryOnly) hinweise.push('Viele Komponenten betroffen — hier nur die Titel.');
  if (daten.basisIndex === 'pages-main') hinweise.push('„Neu“ ist gegen den aktuellen main-Stand bestimmt, nicht gegen den Merge-Base (Näherung).');
  if (daten.basisIndex === 'unavailable') hinweise.push('Kein Vergleichsstand verfügbar — „neu“ erkennt nur hinzugefügte Story-Dateien.');
  if (hinweise.length > 0) zeilen.push(`<sub>${hinweise.join(' ')}</sub>`, '');

  return zeilen.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({
    options: { vorschau: { type: 'string' }, sha: { type: 'string' }, links: { type: 'string' }, out: { type: 'string' } },
  });
  try {
    if (!values.vorschau || !values.sha || !values.out) throw new Error('--vorschau, --sha und --out sind Pflicht');
    if (!/^https:\/\/[^\s]+$/.test(values.vorschau)) throw new Error('--vorschau muss eine https-URL sein');
    if (!/^[0-9a-f]{7,40}$/.test(values.sha)) throw new Error('--sha muss ein Commit-Hash sein');
    let links = null;
    if (values.links) {
      try {
        links = JSON.parse(readFileSync(values.links, 'utf8'));
      } catch (e) {
        console.warn(`story-links.json nicht lesbar: ${e.message}`);
      }
    }
    writeFileSync(values.out, rendereKommentar({ vorschau: values.vorschau, sha: values.sha, links }));
  } catch (fehler) {
    console.error(fehler.message);
    process.exit(1);
  }
}
