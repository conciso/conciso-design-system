# ADR-0008: Automatische Releases aus Conventional Commits, pfadgefiltert

- Status: akzeptiert
- Datum: 2026-09-23
- Löst ab: den „Nachtrag: Auslöser des Publish-Workflows“ in
  [ADR-0004](0004-verteilung-und-versionierung.md). Verteilung über GitHub Packages
  und [Lockstep-Versionierung](../../CONTEXT.md#lockstep-versionierung) aus ADR-0004
  gelten unverändert.

## Kontext

Seit dem Nachtrag zu ADR-0004 war „Version anheben und nach `main` mergen“ das
Release. Veröffentlichen, Tag und GitHub-Release liefen automatisch, drei Schritte
blieben Handarbeit: die SemVer-Stufe entscheiden, die Nummer an fünf Stellen
eintragen (beide `package.json`, die Peer-Pin der Lib, zweimal die Consumer-Fixture,
dazu das Lockfile) und den `[Unreleased]`-Block im CHANGELOG schließen. Jeder dieser
Schritte war eine Stelle, an der ein Release vergessen oder falsch nummeriert werden
konnte.

## Entscheidung

Ein [Release](../../CONTEXT.md#release) entsteht **ohne Handschritt** aus jedem Push
auf `main`.

- **Welche Commits zählen, entscheidet der Pfad.** Nur Commits, die mindestens einen
  [veröffentlichungsrelevanten Pfad](../../CONTEXT.md#veröffentlichungsrelevanter-pfad)
  berühren — ausgelieferter Inhalt beider Pakete **plus** dessen Build-Eingaben —
  werden ausgewertet. Die Liste steht an genau einer Stelle; ein CI-Check stellt
  sicher, dass sie jeden Eintrag der `files`-Felder abdeckt.
- **Welche Stufe, entscheidet der Typ** (Conventional Commits): `feat` → minor;
  `fix`, `perf`, `build(deps)` → patch; `!` oder `BREAKING CHANGE:` → major; alle
  anderen Typen → kein Release. Scopes sind frei und wirken nicht aufs Release.
- **Merge-Commits bleiben**, kein Squash: Jeder Commit eines PRs zählt einzeln und
  erscheint in den Release-Notes. Die vollständige History wiegt schwerer als
  rauschfreie Notes.
- **commitlint prüft hart, aber nur relevante Commits.** Commits, die keinen
  veröffentlichungsrelevanten Pfad berühren, sind frei — auch nicht-konventionelle.
  `subject-case` ist aus (deutsche Betreffe beginnen mit Nomen).
- **Das Repo ist versionsfrei.** In den `package.json` stehen Platzhalter; die echte
  Version und die Peer-Pin `X.Y.x` werden erst beim Publish in die Artefakte
  geschrieben. Wahrheit sind Tag `vX.Y.Z` und GitHub-Release.
- **Release-Notes werden erzeugt.** Der handgeschriebene CHANGELOG endet mit 2.0.0
  und ist danach eingefroren.
- **Der eigene Publish-Workflow bleibt** (Consumer-Smoke-Test als Vorbedingung,
  Heilung pro Paket, manueller Dry-Run, Tag und Release nach den Publishes).
  Ausgetauscht wird nur die Quelle der Version: `semantic-release --dry-run` mit
  Pfadfilter liefert Version und Notes; Tag, Release und Publish macht weiter der
  Workflow selbst.
- Jeder PR zeigt in der Job-Summary, ob und welches Release er auslösen würde.

## Begründung

- Die Stufe steckt schon heute in den Commits (`feat(lib)!`); sie ein zweites Mal von
  Hand in eine Versionsnummer zu übersetzen, ist doppelte Buchführung.
- Der Pfadfilter ersetzt ein festes Scope-Vokabular: Die History kennt über 30 Scopes,
  viele für Beispielseiten und Storybook, die nie im Paket landen. Eine Scope-Liste
  würde veralten; die Pfadliste lässt sich gegen die `files`-Felder prüfen. Dieselbe
  Liste steuert auch, welche Commits commitlint hart prüft.
- Versionsfreies Repo: kein Bot-Commit auf `main`, keine Schleifengefahr durch
  `[skip ci]`, kein schreibendes Token auf `main`, und erzeugte Notes mit geraden
  Anführungszeichen kollidieren nicht mit `check:quotes`.
- Den eigenen Workflow zu behalten, bewahrt die Robustheit aus dem ADR-0004-Nachtrag
  (Existenzprüfung pro Paket, idempotente Finalisierung), die semantic-release nicht
  mitbringt.

## Verworfene Alternativen

- **semantic-release komplett** (inkl. Publish über `@semantic-release/exec`): die
  Heilung halber Releases müsste im exec-Skript nachgebaut werden.
- **release-please:** Release-PR statt vollautomatisch; erzeugt den Changelog
  ohnehin aus Commits, ohne Pfadfilter.
- **Changesets:** hält Prosa-Notes, verwaltet aber das Root-Paket eines Workspaces
  nicht und behält einen Handschritt pro PR.
- **Eigenes Bump-Skript aus den `[Unreleased]`-Überschriften:** behält den
  handgeschriebenen CHANGELOG, den wir abschaffen wollen.
- **Squash-Merge mit PR-Titel als Commit:** saubere Notes, aber verlorene History.
- **Festes Scope-Vokabular (`scope-enum`) statt Pfaden:** veraltet, und Themen-Scopes
  (`a11y`, `dark-mode`) sagen nichts darüber, ob etwas ausgeliefert wird.
- **Version und CHANGELOG per Bot-Commit zurückschreiben:** Bot-Commits auf `main`,
  Kollision mit `check:quotes`, abhängig davon, dass `main` ungeschützt bleibt.

## Konsequenzen

- Jeder Commit, der veröffentlichungsrelevante Pfade berührt, **ist** eine
  Release-Entscheidung — auch Zwischenstände wie „fix: Review-Anmerkungen“. Wer das
  nicht will, wählt einen nicht-releasenden Typ oder formt die Commits vor dem Merge
  um.
- Ein Angular-Update mit neuer Peer-Major-Range braucht `build(deps)!`.
- Dependabot/Renovate müssen auf `build(deps)` konfiguriert sein, sonst releasen
  Abhängigkeits-Updates nicht.
- Wer die installierte Version im Repo sucht, findet sie nicht in der `package.json`,
  sondern im neuesten Tag.
- Handgeschriebene Prosa (Migrationshinweise) gibt es nicht mehr. Falls sie fehlt,
  kann sie wieder eingeführt und per Pipeline abgesichert werden.
