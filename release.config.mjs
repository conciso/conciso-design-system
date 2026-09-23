// semantic-release-Konfiguration (ADR-0009, .scratch/automatische-releases/spec.md Regel 6).
// Läuft NUR als `--dry-run` (siehe publish.yml, Job „pruefen“): kein Plugin hier
// veröffentlicht, taggt oder erzeugt ein GitHub-Release — das bleibt Aufgabe des
// bestehenden `publish`-Jobs, der die von hier gelieferte Version und die Notes übernimmt.
//
// Das eigene Plugin (scripts/release/semantic-release-plugin.mjs) ersetzt
// @semantic-release/commit-analyzer + @semantic-release/release-notes-generator NICHT,
// sondern filtert deren Eingabe-Commits vorab über den gemeinsamen Pfadfilter
// (relevant-paths.mjs) und wendet die Bump-Regeln aus ADR-0009 an.
//
// @semantic-release/exec übernimmt nur `verifyReleaseCmd`: sobald semantic-release ein
// Release als feststehend markiert, schreibt es die Version nach $GITHUB_OUTPUT. Die
// Release-Notes schreibt bereits unser eigenes `generateNotes` als Datei
// (release-notes-generated.md) — ein zweiter Weg über `generateNotesCmd` wäre nur eine
// zweite Quelle für denselben Text.
export default {
  // Release-Branch ist main. RELEASE_BRANCH setzt publish.yml nur beim MANUELLEN Start auf den
  // Branch, von dem aus gestartet wurde — damit lässt sich die Engine vor einem Merge einmal
  // echt durchspielen (semantic-release steigt auf einem fremden Branch sonst sofort aus,
  // noch vor der Berechtigungsprüfung). Veröffentlicht wird von dort nie: publish.yml
  // erzwingt außerhalb von main den Dry-Run.
  branches: [process.env.RELEASE_BRANCH || 'main'],
  tagFormat: 'v${version}',
  plugins: [
    './scripts/release/semantic-release-plugin.mjs',
    [
      '@semantic-release/exec',
      {
        verifyReleaseCmd: 'node scripts/release/write-release-outputs.mjs "${nextRelease.version}"',
      },
    ],
  ],
};
