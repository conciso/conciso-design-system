// Server-`instructions` aus ADR-0012: Regeln des Design Systems, die die KI eines Consumers
// erreichen, bevor sie überhaupt ein Werkzeug aufruft (`initialize`-Antwort, `tmcp`s
// `ServerOptions.instructions`). Eigene deutsche Regeln zuerst, danach unverändert
// `STORYBOOK_MCP_INSTRUCTIONS` aus `@storybook/mcp` — die Anleitung zu docs-list/docs-show/
// docs-show-story bleibt bei der Bibliothek, die die Werkzeuge auch definiert.
import { STORYBOOK_MCP_INSTRUCTIONS } from '@storybook/mcp';

/**
 * Storybook-ID der Einrichtungsseite (`storybook-angular/src/docs/grundlagen/einrichtung.mdx`,
 * `<Meta title="Grundlagen/Einrichtung" name="Übersicht" />`). Als Konstante exportiert, statt
 * die ID nur im Fließtext unten zu verstecken, damit ein Test sie referenzieren kann, ohne sie
 * ein zweites Mal abzutippen.
 */
export const EINRICHTUNG_DOC_ID = 'grundlagen-einrichtung--übersicht';

const OWN_INSTRUCTIONS = `## Conciso Design System

Feste Regeln für die Angular-Lib „@conciso/design-system-angular“:

1. CSS-Schicht und Fonts global einbinden, nicht pro Komponente. Ohne diesen Schritt bleiben die Wrapper-Komponenten ungestylt.
2. Kein eigenes CSS für DS-Komponenten schreiben und keine CSS-Klassen erfinden.
3. Nur Inputs und Outputs verwenden, die docs-show für die jeweilige Komponente liefert. Vorher nachsehen, nie raten.
4. Bei Fragen zur Einrichtung docs-show mit der ID „${EINRICHTUNG_DOC_ID}“ aufrufen (Storybook-Seite „Einrichtung“).
5. Für Auswahl- und Gestaltungsfragen (welche Komponente, welche Variante, wo platzieren) zusätzlich die Verwendungsguidance heranziehen: Sie steht, wenn vorhanden, in der docs-show-Antwort der Komponente im Abschnitt „Docs“. Fehlt dieser Abschnitt, über docs-list nach einer Seite „Verwendung“ der Komponentengruppe suchen und sie mit docs-show laden.`;

/**
 * Anzahl der oben nummerierten Regeln in OWN_INSTRUCTIONS. Exportiert, damit ein Test sie gegen
 * die Regel-Liste in der Paket-README (mcp-server/README.md, Abschnitt „Was er kann“) absichern
 * kann, ohne die Regeln selbst dafür zu duplizieren.
 */
export const OWN_RULE_COUNT = (OWN_INSTRUCTIONS.match(/^\d+\.\s/gm) ?? []).length;

/**
 * Baut den vollständigen `instructions`-Text: eigene Regeln, optional die Versions-Notiz aus
 * `checkVersion`, danach die Storybook-eigenen Anweisungen.
 * @param {string | null} [versionNote] `instructionsNote` aus `checkVersion` (src/version-check.mjs).
 * @returns {string}
 */
export function buildInstructions(versionNote) {
  const sections = [OWN_INSTRUCTIONS];
  if (versionNote) {
    sections.push(versionNote);
  }
  sections.push(STORYBOOK_MCP_INSTRUCTIONS);
  return sections.join('\n\n');
}
