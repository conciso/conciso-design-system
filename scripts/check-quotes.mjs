// Prüft deutschen Fließtext auf kaputte Anführungszeichen-Paare: öffnendes U+201E, aber
// schließendes gerades ASCII-Zeichen statt U+201C. Dependency-frei, gedacht als CI-Gate
// neben den bestehenden Checks (Vorbild: check-dark-states.mjs, check-contrast.mjs).
//
// WARUM ES DIESEN CHECK GIBT
// CONTRIBUTING § 6 verlangt deutsche typografische Anführungszeichen (U+201E … U+201C) in
// Copy und Fließtext. In der Praxis entsteht beim Schreiben aber immer wieder die
// Mischform: das öffnende Zeichen wird typografisch gesetzt oder aus einer Vorlage
// kopiert, das schließende kommt von der Tastatur als gerades ASCII-Zeichen. Das fiel erst
// auf, als sich rund 560 solcher Paare über Doku-Site, CHANGELOG, CSS-Kommentare und
// Story-Copy verteilt hatten — genau die Sorte Drift, die kein Review zuverlässig sieht
// und ein Skript schon. Der dokumentierte Standard allein hat sie nachweislich nicht
// verhindert.
//
// WAS ER MELDET (UND WAS BEWUSST NICHT)
// Gemeldet wird jedes U+201E, dem als nächstes Anführungszeichen ein gerades ASCII-Zeichen
// folgt — per Konstruktion ein kaputtes Paar, denn ein korrektes Paar schließt mit U+201C,
// und ein ASCII-Zeichen als Code-Syntax (String-Delimiter, HTML-Attribut) steht nie
// INNERHALB eines mit U+201E geöffneten Paars, ohne dass das Paar ohnehin unbalanciert
// wäre. Paare dürfen über Zeilenenden laufen (Kommentar-Umbrüche); gemeldet wird die Zeile
// des öffnenden Zeichens.
// NICHT gemeldet werden reine ASCII-Paare in deutschem Fließtext: die sind von
// Code-Syntax nicht mechanisch unterscheidbar und bleiben Sache des Reviews.
//
// WER ÜBER DAS FEHLERMUSTER SCHREIBT, SCHREIBT ES ALS CODEPOINT
// Dieser Check prüft auch sich selbst und seine Doku — deshalb steht das Fehlermuster
// hier und in .github/workflows/quotes.yml nirgends als Glyphenpaar, sondern als
// U+-Notation. Wer es in CONTRIBUTING, Konventionsdokumenten oder Kommentaren als
// Negativbeispiel zeigen will, macht es genauso; eine Ausnahmeliste braucht es dann nicht.
import { readFileSync, lstatSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Versionierte Dateien plus noch nicht committete (--others, .gitignore-treu): sonst ist
// der Check lokal grün, solange die neue Datei untracked ist, und fällt erst in CI um.
// Binär-/Font-Formate bleiben außen vor. Abgeleitete Dateien (dist/, icons/icons.*) werden
// mitgeprüft: sie sind eingecheckt und sollen dieselbe Regel erfüllen; ihre Quelle zu
// fixen und neu zu bauen behebt beide.
const BINARY = /\.(woff2?|ttf|otf|eot|png|jpe?g|webp|gif|ico|pdf|zip)$/i;
const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
  cwd: ROOT,
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024,
})
  .split('\0')
  .filter((f) => f && !BINARY.test(f));

// U+201E, dann Text ohne weiteres Anführungszeichen, dann das gerade ASCII-Zeichen. Die
// Zeichenklasse stoppt an jedem Anführungszeichen, damit ein korrektes Paar dazwischen
// keinen Treffer über sich hinweg erzeugt. Als Escapes geschrieben, nicht als Glyphen,
// damit die Zeile nicht ihr eigenes Fehlermuster enthält.
const BROKEN = /\u201E[^\u201E\u201C\u201D"]*"/g;

let hits = 0;
for (const file of files) {
  // Symlinks überspringen (z. B. .claude/skills/* → Verzeichnisse); ihre Ziele sind
  // selbst versioniert und werden als eigene Einträge geprüft.
  if (!lstatSync(join(ROOT, file)).isFile()) continue;
  const text = readFileSync(join(ROOT, file), 'utf8');
  if (!text.includes('\u201E')) continue;
  for (const m of text.matchAll(BROKEN)) {
    const line = text.slice(0, m.index).split('\n').length;
    const snippet = m[0].replace(/\s+/g, ' ').slice(0, 60);
    console.error(`${file}:${line}: kaputtes Paar ${snippet}`);
    hits++;
  }
}

if (hits > 0) {
  console.error(`\n${hits} kaputte(s) Anführungszeichen-Paar(e): schließt mit ASCII-Zeichen statt U+201C (CONTRIBUTING § 6).`);
  console.error('Das schließende gerade Zeichen durch U+201C ersetzen.');
  process.exit(1);
}
console.log(`Anführungszeichen ok: ${files.length} Dateien geprüft, kein Paar schließt mit einem ASCII-Zeichen.`);
