#!/usr/bin/env node
// Ermittelt den Fakt `tagHasMcp` für decide.mjs: enthält der Baum des getaggten Commits den
// MCP-Server? Das ist eine Eigenschaft des Baums, keine der Versionsnummer (siehe Kopfkommentar
// in decide.mjs). Der Server liegt je nach Alter des Tags an einem von zwei Orten: unter
// mcp-server/ im Layout vor dem Umzug, unter packages/mcp/ danach. Beide Pfade zählen, sonst
// gälte jeder Tag auf der einen Seite des Umzugs als „ohne MCP“ und ein halber Release ließe
// sich nicht nachziehen.
//
// Aufruf im Publish-Workflow: `node tools/release/tag-has-mcp.mjs "$LATEST_TAG"` gibt `true`
// oder `false` aus. Ein unbekannter Tag oder ein Git-Fehler ergibt `false` (sicherer
// Rückfall: nie versuchen, MCP aus einem Tag zu heilen, der ihn nicht kennt).
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const MCP_MANIFEST_PATHS = ['packages/mcp/package.json', 'mcp-server/package.json'];

/**
 * @param {string} tag Tag oder Commit-Referenz
 * @param {{ cwd?: string }} [optionen] Arbeitsverzeichnis des Repos (Default: aktuelles)
 * @returns {boolean}
 */
export function tagHasMcp(tag, { cwd } = {}) {
  // `^{commit}` peelt einen annotierten Tag auf seinen Commit, bevor der Pfad aufgelöst wird;
  // ein leichtgewichtiger Alt-Tag zeigt schon direkt auf einen Commit. `cat-file -e` gibt bei
  // Erfolg nichts aus, geprüft wird der Exit-Code.
  return MCP_MANIFEST_PATHS.some((pfad) => {
    try {
      execFileSync('git', ['cat-file', '-e', `${tag}^{commit}:${pfad}`], { cwd, stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const tag = process.argv[2];
  if (!tag) {
    console.error('Aufruf: node tools/release/tag-has-mcp.mjs <tag>');
    process.exit(1);
  }
  console.log(String(tagHasMcp(tag)));
}
