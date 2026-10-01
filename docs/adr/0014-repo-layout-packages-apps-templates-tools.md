# ADR-0014: Repo-Layout mit packages, apps, templates, tools und docs

- Status: akzeptiert
- Datum: 2026-10-01
- Ersetzt: die Ordnerstruktur aus [ADR-0002](0002-topologie-und-quelle-der-wahrheit.md). Gültig bleibt dort die Quelle der Wahrheit: Komponenten-Code lebt nur in der Angular-Lib, Storybook bindet sie per Pfad-Mapping auf `public-api.ts` ein.
- Ergänzt: [ADR-0010](0010-release-ausloesung-und-versionsquelle.md) (veröffentlichungsrelevante Pfade), [ADR-0012](0012-mcp-server-fuer-consumer.md) (`tagHasMcp`).

## Kontext

Das Repo ist schrittweise gewachsen und mischte zuletzt mehrere Rollen an denselben Orten:

- Die Wurzel war zugleich Workspace-Wurzel und das veröffentlichte CSS-Paket `@conciso/design-system`; dessen Inhalt lag über sechs Ordner im Root verteilt.
- `docs/` enthielt die alte HTML-Doku, die ADRs und die Agenten-Doku.
- `scripts/` enthielt den Build des CSS-Pakets, Repo-Prüfungen und die Release-Skripte.
- Die Namen folgten keinem Schema (`angular-lib` nach Rolle, `storybook-angular` nach Werkzeug, `mcp-server` nach Produkt), die Angular-Lib war doppelt verschachtelt (`angular-lib/projects/design-system-angular/`, zwei `package.json`).
- Generierte Artefakte lagen in Git. Seit dem Vorlauf zu diesem ADR liegt alles Generierte unter `dist/`, ist gitignored und wird über `prepare` gebaut.

## Entscheidung

```
packages/   css/  angular/  mcp/        veröffentlichte npm-Pakete
apps/       storybook/                  deployte Anwendungen (GitHub Pages)
templates/  prototype-angular/          von Nutzern kopierte Vorlagen (giget)
tools/      release/  checks/  consumer-fixture/   nur für das Repo selbst
docs/       adr/  agents/  marke/  legacy-site/    Repo-Doku
```

- **Eine Rolle je Bereich:** `packages/` wird veröffentlicht, `apps/` deployt, `templates/` von Nutzern kopiert, `tools/` nur im Repo genutzt. Der Root enthält nur Workspace-Konfiguration und Repo-Doku.
- **Einheitliches Paketmuster:** eine `package.json` je Paket, README, eigene Build- und Test-Skripte im Paket, alles Generierte unter `dist/`. Die generische `.gitignore`-Regel `dist/` gilt überall.
- **Paketnamen und Consumer-Pfade bleiben unverändert.** Die innere Struktur jedes Pakets (`css/`, `fonts/`, `assets/brand/`, `icons/source/`, `dist/`, `exports`-Map) bleibt gleich; Consumer tragen diese Dateipfade direkt in `angular.json` ein, dort greift keine `exports`-Map.
- **Die alte HTML-Doku** zieht als `docs/legacy-site/` mit und wird gelöscht, sobald ihre Inhalte vollständig in Storybook stehen und `check:contrast` ein neues Prüfobjekt hat.

## Begründung

Wer ins Repo schaut, sieht sofort, was ausgeliefert wird und was Infrastruktur ist. Neue Pakete (z. B. weitere Framework-Wrapper) und Vorlagen bekommen einen festen Ort, ohne den Root weiter zu füllen. Die Struktur entspricht der Konvention gängiger Monorepo-Werkzeuge, ein späterer Wechsel bleibt billig.

## Bewusst nicht gewählt

- **Nx (oder ein vergleichbares Monorepo-Werkzeug).** Gemessen am 2026-10-01: Der längste Workflow (Storybook/Angular) braucht im Schnitt 186 s, alle Workflows laufen parallel. `nx release` bildet die Heilung pro Paket, zwei Registries und `tagHasMcp` nicht ab; die Release-Logik müsste neu gebaut werden. Neu bewerten, wenn die CI spürbar langsam wird, ein weiteres Framework-Paket dazukommt oder „affected“ echten Bedarf hat.
- **Minimaler Umzug** (nur das CSS-Paket aus dem Root): weniger Aufwand, aber Benennung und Mischformen bleiben.
- **Flache Struktur ohne Gruppierungsordner** (`design-system-css/`, `design-system-angular/` …): einheitlich benannt, aber die Rolle eines Ordners ist nicht mehr am Pfad erkennbar.
- **Innere Struktur der Pakete mit aufräumen:** würde Consumer-Dateipfade ändern und ein Major-Release erzwingen.

## Konsequenzen

- **Doppelte Pfade in der Release-Logik:** `tools/release/relevant-paths.mjs` erkennt die alten **und** die neuen Pfade (`LEGACY_PATH_PREFIXES`), weil der erste Release nach dem Umzug noch Commits mit alten Pfaden auswertet. Die alte Liste löst bis dahin auch für Root-Dateien wie `package.json` oder `README.md` aus; sie entfällt, sobald der erste Tag nach dem Umzug existiert. `tagHasMcp` (`tools/release/tag-has-mcp.mjs`) akzeptiert `mcp-server/package.json` und `packages/mcp/package.json`.
- **Heilung aus einem Stand vor dem Umzug** ist nicht automatisiert: Der Publish-Workflow baut mit den neuen Pfaden und bricht geschlossen ab, wenn der Quellstand noch das alte Layout hat. Beim Umzug waren alle Versionen bis v2.7.2 vollständig getaggt.
- Historie bleibt über `git log --follow` erreichbar; die Verschiebungen stehen in eigenen Commits ohne Inhaltsänderung.
- Ein frischer Clone braucht `npm ci`, damit `prepare` die Artefakte unter `packages/css/dist/` baut. Der MCP-Snapshot bleibt unter `packages/mcp/snapshot/`, damit sich der Paketinhalt nicht ändert. Installationen mit `--ignore-scripts` bekommen kein `dist/`.
- Neue Pakete folgen dem Paketmuster; der Coverage-Check von `relevant-paths` gleicht ihre `files`-Felder ab.
