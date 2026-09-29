/** Bildet den Namensanteil einer docs-list-ID nach. */
function sanitizeDocName(name) {
  return name
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/** Liest die Zeilen im „# Docs“-Abschnitt von docs-list und gruppiert die IDs nach
 * ihrem Anzeigenamen. */
function groupDocsListEntriesByName(docsListText) {
  const lines = docsListText.split(/\r?\n/);
  const sectionStart = lines.indexOf('# Docs');
  const section = sectionStart === -1 ? [] : lines.slice(sectionStart + 1);
  const idsByName = new Map();
  let hasMalformedEntry = false;
  for (const line of section) {
    if (line.startsWith('# ')) break;
    if (!line.startsWith('- ')) continue;
    const match = line.match(/^- (.+?) \(([^()]+)\)(?:: .+)?$/);
    if (!match) {
      hasMalformedEntry = true;
      continue;
    }
    const [, name, id] = match;
    if (!idsByName.has(name)) idsByName.set(name, new Set());
    idsByName.get(name).add(id);
  }
  return { hasMalformedEntry, idsByName };
}

/** Prüft, dass docs-list mindestens zwei Doku-Einträge mit demselben Anzeigenamen und
 * verschiedenen IDs liefert. */
export function checkDocsListDuplicateNames(docsListText) {
  const { hasMalformedEntry, idsByName } = groupDocsListEntriesByName(docsListText);
  if (hasMalformedEntry || idsByName.size === 0) {
    throw new Error(
      'Das Zeilenformat von docs-list konnte nicht gelesen werden: Im Abschnitt „# Docs“ ' +
        'wurde kein Eintrag im erwarteten Format „- <name> (<id>)“ gefunden.',
    );
  }

  const hasDuplicateName = [...idsByName.values()].some((ids) => ids.size >= 2);
  if (!hasDuplicateName) {
    throw new Error(
      'docs-list enthält keine zwei Doku-Einträge mit identischem Anzeigenamen mehr: die ' +
        'ID-Schema-Regel in den instructions (DOCS_LIST_ID_SCHEME_HINT) wäre dann überholt, siehe ADR-0012.',
    );
  }

  const malformed = [];
  for (const [name, ids] of idsByName) {
    const expectedSuffix = `--${sanitizeDocName(name)}`;
    for (const id of ids) {
      if (!id.endsWith(expectedSuffix) || id.length <= expectedSuffix.length) {
        malformed.push(`${id} (Anzeigename „${name}“, erwartetes Suffix „${expectedSuffix}“)`);
      }
    }
  }
  if (malformed.length > 0) {
    throw new Error(`Doku-IDs folgen nicht dem Schema „<pfad>--<name>“: ${malformed.join(', ')}.`);
  }
}
