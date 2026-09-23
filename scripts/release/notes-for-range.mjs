#!/usr/bin/env node
// Erzeugt die Release-Notes für einen festen Commit-Bereich — für das Nachziehen eines
// unfertigen Releases (decide.mjs, Modus `nachziehen`). semantic-release selbst kann das
// nicht: es rechnet immer vom letzten Tag bis HEAD, und HEAD kann inzwischen weitere
// Commits enthalten, die erst ins NÄCHSTE Release gehören. Hier wird deshalb genau der
// Bereich <vorheriger Tag>..<Quellstand des unfertigen Releases> durch dasselbe
// generateNotes geschickt wie im regulären Lauf — gleicher Pfadfilter, gleicher
// CHANGELOG-Verweis, gleiche Ausgabedatei (release-notes-generated.md).
//
// Aufruf: node scripts/release/notes-for-range.mjs <vorheriger-tag|""> <quell-sha> <version>
import { execFileSync } from 'node:child_process';
import { generateNotes } from './semantic-release-plugin.mjs';

const [, , vonTag, bisSha, version] = process.argv;
if (!bisSha || !version) {
  console.error('Aufruf: node scripts/release/notes-for-range.mjs <vorheriger-tag|""> <quell-sha> <version>');
  process.exit(1);
}

const git = (args) => execFileSync('git', args, { encoding: 'utf8' });
const bereich = vonTag ? `${vonTag}..${bisSha}` : bisSha;

// Datensätze mit NUL trennen, Felder mit dem Unit-Separator: Commit-Nachrichten dürfen
// Zeilenumbrüche enthalten, diese beiden Zeichen nicht.
const commits = git(['log', '--format=%H%x1f%cI%x1f%B%x00', bereich])
  .split('\0')
  .map((eintrag) => eintrag.replace(/^\n/, ''))
  .filter(Boolean)
  .map((eintrag) => {
    const [hash, committerDate, message] = eintrag.split('\x1f');
    return { hash, committerDate, message };
  });

const repositoryUrl = git(['remote', 'get-url', 'origin']).trim();

await generateNotes(
  {},
  {
    commits,
    cwd: process.cwd(),
    env: process.env,
    logger: { log: () => {}, error: console.error },
    options: { repositoryUrl },
    lastRelease: vonTag ? { gitTag: vonTag, gitHead: git(['rev-list', '-n', '1', vonTag]).trim() } : {},
    nextRelease: { version, gitTag: `v${version}`, gitHead: bisSha },
  },
);
console.log(`Notes für ${bereich} (v${version}) → release-notes-generated.md`);
