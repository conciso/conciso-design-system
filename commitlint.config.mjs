// commitlint-Konfiguration (ADR-0010 Regel 5): Standard-Conventional-Commits, aber
// `subject-case` aus — deutsche Betreffe beginnen üblicherweise mit einem großgeschriebenen
// Nomen („Fokusring nachziehen“), das ist keine Regelverletzung. Der Typ „refine“ aus der
// bisherigen History ist bewusst NICHT im Standard-`type-enum` enthalten (siehe
// @commitlint/config-conventional) — neue veröffentlichungsrelevante Commits müssen einen
// echten Conventional-Commit-Typ tragen, nicht relevante Commits werden ohnehin nicht
// geprüft (scripts/release/check-relevant-commits.mjs).
//
// Keine Standard-Ausnahmen (`defaultIgnores: false`): commitlint winkt sonst auch
// `fixup!`/`squash!`/`amend!`, `Reapply …` und reine Versionsnummern wie „v2.1.0“ ungeprüft
// durch — ein relevanter Commit mit solcher Nachricht landete dann ohne Typ und ohne Release
// auf main. Merge-Commits braucht keine Ausnahme, sie sind nie relevant (Pfadfilter). Übrig
// bleibt nur der von Git erzeugte Revert: seine Nachricht schreibt Git, und er löst nach
// ADR-0010 ohnehin kein Release aus. Erkannt wird er an dem Kopf, den Git erzeugt — Betreff
// `Revert "…"`, Leerzeile, `This reverts commit <hash>.` —, nicht schon am Betreff allein.
// Darunter darf Text folgen: eine Begründung unter dem Revert ist gute Praxis. Bewusst kein
// Anker am Nachrichtenende, denn er schützte nicht: commitlint sieht nur die Nachricht, nie
// den Inhalt, und eine vorgetäuschte Revert-Nachricht in exakter Git-Form käme genauso
// durch. Mehr als ein verschlucktes Release kann sie ohnehin nicht bewirken — dasselbe
// erreicht jeder nicht releasende Typ wie `docs:`.
const GIT_REVERT = /^Revert ".+"\r?\n\r?\nThis reverts commit [0-9a-f]{7,40}\./;

export default {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: false,
  ignores: [(message) => GIT_REVERT.test(message)],
  rules: {
    'subject-case': [0, 'always'],
  },
};
