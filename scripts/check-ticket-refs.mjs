// Prüft Kommentare, JSDoc und Doku-Text auf Verweise zu lokalen `.scratch/`-Tickets
// („Ticket 05“, „Tickets 01–09“, „Bulk-Batch A“, „.scratch/angular-seitenbausteine/…“,
// „Issue 07“, „spec.md“). Dependency-frei, gedacht als CI-Gate neben den bestehenden Checks
// (Vorbild: check-quotes.mjs, check-dark-states.mjs).
//
// WARUM ES DIESEN CHECK GIBT
// `.scratch/` ist gitignored (siehe .gitignore, docs/agents/issue-tracker.md) und lebt nicht
// mit dem Branch weiter: sobald ein PR gemerged ist, existiert das referenzierte Ticket nur
// noch auf der Maschine des damaligen Bearbeiters. Ein Verweis wie „(Ticket 05)“ oder ein Pfad
// wie „.scratch/angular-seitenbausteine/issues/05-icon-karte.md“ ist für jeden anderen — auch
// für ein KI-Werkzeug, das später dieselbe Datei liest — eine tote Adresse, kein Beleg. Trägt
// der Verweis eine echte Begründung, gehört die Begründung selbst in den Kommentar (oder eine
// ADR), nicht ein Zeiger auf eine Datei, die es nicht mehr gibt.
//
// WAS ER MELDET (UND WAS BEWUSST NICHT)
// Fünf Muster: „Ticket“ (Einzahl oder Mehrzahl „Tickets“) + Ziffer (mit oder ohne Leerzeichen
// dazwischen) · ein `.scratch/`-Pfad · „Bulk-Batch“ · „Issue“ + genau zwei Ziffern · das
// literale Dateiwort „spec.md“ (siehe „spec.md OHNE .scratch/-PFAD“ unten). NICHT gemeldet wird
// das Wort „Ticket“/„Tickets“ allein oder in einem Kompositum („Ticket-Referenzen“, wie in
// diesem Kommentar) — nur die Kombination mit einer Ziffer identifiziert einen konkreten, toten
// Verweis. Echtes Content-Vokabular wie „Eintritts-Tickets“ (Veranstaltungs-Tickets, kein
// Tracker-Verweis) bleibt aus demselben Grund unberührt. Echte GitHub-Referenzen („#53“) matchen
// keins der fünf Muster und bleiben unberührt. Ziffernlose Narrative-Formen wie „das Ticket“
// oder „der Ticket-Vorgabe“ werden BEWUSST NICHT geprüft: das Risiko, damit legitimen Fließtext
// (z. B. echte Support-/Veranstaltungs-Tickets) fälschlich zu melden, ist zu groß, um es ohne
// Ziffer als Anker zu automatisieren — die entfernt man von Hand.
//
// spec.md OHNE .scratch/-PFAD
// Ein Kommentar wie „Randbedingung 1, spec.md“ verweist ebenso auf eine gitignorete Datei,
// ohne `.scratch/`-Pfad und ohne Ticketziffer — die anderen vier Muster übersehen das. Repo-weite
// Nachsuche zeigt keine legitime Verwendung des literalen Dateiworts „spec.md“ außerhalb der
// Allowlist unten. Anders als bei „das Ticket“ ist das Fehlalarmrisiko hier gering: „spec.md“
// ist ein Dateiname, kein Wort mit Alltagsbedeutung.
//
// AUSNAHMEN (ALLOWLIST)
// `docs/CHANGELOG-legacy.md` ist eingefroren und historisch (nicht mehr gepflegt, siehe
// Kommentar in scripts/release/relevant-paths.mjs) — auch seine „spec.md“-/Ticket-Zitate bleiben
// unangetastet. `.gitignore` und `.prettierignore` brauchen die literale Zeichenkette
// „.scratch/“ als Ignore-Muster, das ist keine Narration. `AGENTS.md` und
// `docs/agents/issue-tracker.md` beschreiben die `.scratch/`-Tracker-KONVENTION selbst
// (an welchem Pfad Tickets liegen, dass die Spec-Datei „spec.md“ heißt), nicht einen toten
// Verweis auf ein konkretes Ticket. `.agents/` enthält importierte, generische Skill-Vorlagen
// eines fremden Skill-Packs, die „.scratch/“ und „spec.md“ ebenfalls nur als generisches
// Tracker-Beispiel nennen, nicht projektspezifisch.
//
// SELBSTREFERENZ
// Anders als check-quotes.mjs (dessen Fehlermuster sich als Unicode-Escape schreiben lässt,
// ohne die geprüfte Zeichenfolge selbst zu enthalten) lassen sich die fünf Muster hier nicht
// verlustfrei so codieren — jede Regex, die „Ticket 05“ erkennen soll, enthält zwangsläufig
// die Zeichenkette „Ticket 0“. Diese Datei schließt sich deshalb über die Allowlist selbst von
// der Prüfung aus, statt ihr eigenes Muster zu verschleiern. Aus demselben Grund steht auch
// check-ticket-refs.test.mjs in der Allowlist: seine Testfälle brauchen echte Beispieltreffer
// („Ticket 07“, „spec.md“ usw.) als Fixture-Text, keine Narration über ein totes Ticket.
import { readFileSync, lstatSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SELF = 'scripts/check-ticket-refs.mjs';
const SELF_TEST = 'scripts/check-ticket-refs.test.mjs';

// Siehe „AUSNAHMEN“ und „SELBSTREFERENZ“ oben für die Begründung je Eintrag.
const ALLOWLIST_EXACT = [
  'docs/CHANGELOG-legacy.md',
  '.gitignore',
  '.prettierignore',
  'AGENTS.md',
  'docs/agents/issue-tracker.md',
  SELF,
  SELF_TEST,
];
const ALLOWLIST_PREFIXES = ['.agents/'];

export function isAllowlisted(file) {
  return ALLOWLIST_EXACT.includes(file) || ALLOWLIST_PREFIXES.some((prefix) => file.startsWith(prefix));
}

// Fünf Muster: „Ticket“ (optional Mehrzahl-„s“) + optionales Leerzeichen + Ziffer ·
// ein `.scratch/`-Pfad · „Bulk-Batch“ · „Issue“ + genau zwei Ziffern · das literale
// Dateiwort „spec.md“ (siehe „spec.md OHNE .scratch/-PFAD“ oben).
export const PATTERN = /Tickets? ?\d|\.scratch\/|Bulk-Batch|Issue \d{2}\b|spec\.md/g;

const BINARY = /\.(woff2?|ttf|otf|eot|png|jpe?g|webp|gif|ico|pdf|zip)$/i;

// Nur zum CLI-Lauf gehörig (Dateisystem/Prozess) — beim Import als Modul (siehe Test) bleibt
// das unangetastet.
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
    .split('\0')
    .filter((f) => f && !BINARY.test(f) && !isAllowlisted(f));

  let hits = 0;
  let skipped = 0;
  for (const file of files) {
    const path = join(ROOT, file);
    let text;
    try {
      // Symlinks überspringen (z. B. .claude/skills/* → Verzeichnisse), wie in check-quotes.mjs.
      if (!lstatSync(path).isFile()) continue;
      text = readFileSync(path, 'utf8');
    } catch (err) {
      // Siehe check-quotes.mjs: git ls-files kann Pfade listen, die im Working Tree gerade
      // nicht lesbar sind (lokal gelöscht, kaputter Symlink). Überspringen, nicht als
      // Verstoß werten.
      console.error(`${file}: übersprungen, nicht lesbar (${err.code ?? err.message})`);
      skipped++;
      continue;
    }
    if (
      !text.includes('Ticket') &&
      !text.includes('.scratch/') &&
      !text.includes('Bulk-Batch') &&
      !text.includes('Issue ') &&
      !text.includes('spec.md')
    ) {
      continue;
    }
    // Wie check-quotes.mjs: alle Treffer im ganzen Text (nicht nur der erste je Zeile), Zeile
    // aus dem Match-Index errechnet.
    for (const match of text.matchAll(PATTERN)) {
      const line = text.slice(0, match.index).split('\n').length;
      console.error(`${file}:${line}: Ticket-Referenz „${match[0]}“`);
      hits++;
    }
  }

  if (hits > 0) {
    console.error(
      `\n${hits} Ticket-Referenz(en) außerhalb von .scratch/ gefunden. .scratch/ ist gitignored ` +
        'und lebt nicht mit dem Branch weiter — die Begründung gehört in den Kommentar selbst ' +
        '(oder eine ADR), nicht ein Verweis auf ein Ticket, das niemand sonst lesen kann.',
    );
    process.exit(1);
  }
  console.log(
    `Keine Ticket-Referenzen gefunden: ${files.length - skipped} Dateien geprüft.` +
      (skipped > 0 ? ` (${skipped} nicht lesbar, übersprungen)` : ''),
  );
}
