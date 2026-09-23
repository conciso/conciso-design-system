/**
 * Schutz gegen lokal erzeugte Visual-Baselines.
 *
 * WARUM ES DIESEN GUARD GIBT
 * Baselines sind pixelgenau an die Umgebung gebunden, in der sie entstanden sind.
 * Zwischen einer Entwicklermaschine und dem in `.github/workflows/visual.yml`
 * gepinnten Playwright-Image unterscheiden sich Schriftrasterung UND Glyphenbreiten;
 * Beschriftungen wandern horizontal, die Bauteile mit ihnen. Wer lokal mit `--update`
 * neu setzt, bekommt einen grünen lokalen Lauf und eine flächendeckend rote CI.
 *
 * Genau das ist in PR 28 passiert: 70 von 112 Tests in 30 von 37 Testdateien. Die
 * Gegenprobe zeigte, dass sich an der CI-Umgebung nichts geändert hatte — 68 der 70
 * Ist-Bilder aus dem fehlgeschlagenen Lauf waren bytegleich zu den Baselines, die
 * eine Woche zuvor im Container entstanden waren. Der Fehlschluss lag nahe und ist
 * in der Commit-Historie nachlesbar: die lokale Abweichung wurde als veränderte
 * Render-Umgebung gelesen, nicht als falscher Erzeugungsort.
 *
 * Bis dahin stand der richtige Ablauf ausschließlich als Kommentar in `visual.yml` —
 * also an der Stelle, an die niemand schaut, der lokal `--update` tippt. Deshalb
 * jetzt zusätzlich als Gate im Moment des Schreibens, und in CONTRIBUTING § 13.
 *
 * WAS ER NICHT ABFÄNGT
 * Eine Story ohne Baseline: Vitest legt die fehlende Referenz beim ersten lokalen
 * Lauf auch ohne `--update` an. Dieser Weg bleibt offen — er wird vom Visual-Job in
 * der CI aufgefangen, der die Bilder gegen den gepinnten Container prüft (er hat
 * genau so auch den Fall aus PR 28 gemeldet).
 */

/**
 * Name der Variable, die den Erzeugungsort der Baselines benennt.
 *
 * Damit die Befehle unten auch vom Repo-Root aus stimmen, endet das dortige
 * `test:vitest`-Script auf `--`: ohne diesen Separator schluckt npm ein
 * nachgestelltes `--update` (es expandiert es zu `--update-notifier`), der
 * Workspace-Lauf startet dann ohne Update-Modus und dieser Guard sieht nichts.
 * Wer das `--` entfernt, macht den Notausgang still wirkungslos.
 */
export const BASELINE_ENV_VAR = 'VISUAL_BASELINES';

/**
 * `pinned-ci` setzt `visual.yml` in seinem Erzeugungsschritt — nur dort läuft der
 * gepinnte Container. `local-throwaway` ist der bewusste Notausgang zum Ansehen;
 * so erzeugte Bilder gehören nicht in einen Commit.
 */
export type BaselineSource = 'pinned-ci' | 'local-throwaway';

interface GuardInput {
  argv: readonly string[];
  env: Record<string, string | undefined>;
  warn?: (message: string) => void;
}

const UPDATE_FLAGS = new Set(['-u', '--update', '--update=true']);

const HOW_TO = `So entstehen Baselines richtig:
  1. Workflow „Visual Tests“ auf dem eigenen Branch starten:
       gh workflow run visual.yml --ref <branch>
  2. Artefakt „visual-baselines“ des Laufs herunterladen:
       gh run download <run-id> -n visual-baselines -D storybook-angular/visual-snapshots
  3. Die Bilder committen — danach ist der PR-Vergleich scharf.

Lokale Abweichungen ansehen, ohne bestehende Baselines zu überschreiben:
       VISUAL=1 npm run test:vitest
  (ohne --update; schreibt Diff-Bilder nach visual-snapshots/__diff_output__/)
  Ausnahme: Fehlt einer Story die Baseline ganz, legt Vitest sie auch ohne
  --update an. Ein so entstandenes Bild stammt von dieser Maschine und
  gehört nicht in den Commit.

Siehe CONTRIBUTING § 13 und die Kommentare in .github/workflows/visual.yml.`;

/**
 * Bricht ab, wenn Baselines außerhalb des gepinnten Images überschrieben werden
 * sollen. Greift nur im Zusammentreffen beider Bedingungen: Bildvergleiche aktiv
 * (`VISUAL=1`) und Update-Modus (`--update` / `-u`). Der reguläre Testlauf und der
 * reine Vergleichslauf bleiben unberührt.
 */
export function assertBaselinesMayBeWritten({ argv, env, warn = console.warn }: GuardInput): void {
  if (env['VISUAL'] !== '1') return;
  if (!argv.some((arg) => UPDATE_FLAGS.has(arg))) return;

  const source = env[BASELINE_ENV_VAR];

  if (source === 'pinned-ci') return;

  if (source === 'local-throwaway') {
    warn(
      `\n${BASELINE_ENV_VAR}=local-throwaway: Baselines werden außerhalb des gepinnten ` +
        `Images geschrieben.\nDiese Bilder sind an diese Maschine gebunden und dürfen NICHT ` +
        `committet werden.\n`,
    );
    return;
  }

  throw new Error(
    `Visual-Baselines werden hier nicht geschrieben.\n\n` +
      `Sie sind pixelgenau an die Render-Umgebung gebunden, in der sie entstehen. Auf dieser\n` +
      `Maschine unterscheiden sich Schriftrasterung und Glyphenbreiten vom gepinnten\n` +
      `Playwright-Image der CI; lokal erzeugte Bilder sind lokal grün und in der CI rot,\n` +
      `und zwar flächendeckend.\n\n` +
      `${HOW_TO}\n\n` +
      `Wer trotzdem lokal erzeugen will und weiß, dass die Bilder nicht committet werden:\n` +
      `       ${BASELINE_ENV_VAR}=local-throwaway VISUAL=1 npm run test:vitest -- --update\n`,
  );
}
