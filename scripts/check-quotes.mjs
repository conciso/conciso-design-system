// Prüft deutschen Fließtext auf kaputte Anführungszeichen-Paare: öffnendes „ (U+201E),
// aber schließendes gerades ASCII-Zeichen " statt “ (U+201C). Dependency-frei, gedacht
// als CI-Gate neben den bestehenden Checks (Vorbild: check-dark-states.mjs).
//
// WARUM ES DIESEN CHECK GIBT
// CONTRIBUTING § 6 verlangt deutsche typografische Anführungszeichen „…“ in Copy und
// Fließtext. In der Praxis entsteht beim Schreiben aber immer wieder die Mischform „…":
// das öffnende Zeichen wird typografisch gesetzt (oder aus einer Vorlage kopiert), das
// schließende kommt von der Tastatur als gerades ". Das fiel erst auf, als sich mehrere
// hundert solcher Paare über Doku, CHANGELOG, CSS-Kommentare und Story-Copy verteilt
// hatten — genau die Sorte Drift, die kein Review zuverlässig sieht und ein Skript schon.
//
// WAS ER MELDET (UND WAS BEWUSST NICHT)
// Gemeldet wird jedes „, dem als nächstes Anführungszeichen ein gerades " folgt — das ist
// per Konstruktion ein kaputtes Paar, denn ein korrektes Paar schließt mit “ und ein
// gerades " als Code-Syntax (String-Delimiter, HTML-Attribut) steht nie INNERHALB eines
// „-geöffneten Paars, ohne dass das Paar ohnehin unbalanciert wäre. Paare dürfen über
// Zeilenenden laufen (Kommentar-Umbrüche); gemeldet wird die Zeile des öffnenden „.
// NICHT gemeldet werden reine ASCII-Paare "…" in deutschem Fließtext: die sind von
// Code-Syntax nicht mechanisch unterscheidbar und bleiben Sache des Reviews.
import { readFileSync, lstatSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Nur versionierte Dateien (git ls-files), Binär-/Font-Formate ausgenommen. Abgeleitete
// Dateien (dist/, icons/icons.*) werden mitgeprüft: sie sind eingecheckt und sollen
// dieselbe Regel erfüllen; ihre Quelle zu fixen und neu zu bauen behebt beide.
const BINARY = /\.(woff2?|ttf|otf|eot|png|jpe?g|webp|gif|ico|pdf|zip)$/i;
const files = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' })
  .split('\0')
  .filter((f) => f && !BINARY.test(f));

// Öffnendes „, dann beliebiger Text ohne weiteres Anführungszeichen („ “ ” "), dann
// gerades ". Die Zeichenklasse stoppt an jedem Anführungszeichen, damit ein korrektes
// oder anders kaputtes Paar dazwischen keinen Treffer über sich hinweg erzeugt.
const BROKEN = /„[^„“”"]*"/g;

let hits = 0;
for (const file of files) {
  // Symlinks überspringen (z. B. .claude/skills/* → Verzeichnisse); ihre Ziele sind
  // selbst versioniert und werden als eigene Einträge geprüft.
  if (!lstatSync(join(ROOT, file)).isFile()) continue;
  const text = readFileSync(join(ROOT, file), 'utf8');
  if (!text.includes('„')) continue;
  for (const m of text.matchAll(BROKEN)) {
    const line = text.slice(0, m.index).split('\n').length;
    const snippet = m[0].replace(/\s+/g, ' ').slice(0, 60);
    console.error(`${file}:${line}: kaputtes Paar ${snippet}`);
    hits++;
  }
}

if (hits > 0) {
  console.error(`\n${hits} kaputte(s) Anführungszeichen-Paar(e): „…" statt „…“ (CONTRIBUTING § 6).`);
  console.error('Das schließende gerade " durch “ (U+201C) ersetzen.');
  process.exit(1);
}
console.log(`Anführungszeichen ok: ${files.length} Dateien geprüft, keine kaputten „…"-Paare.`);
