# ADR-0004: Verteilung über GitHub Packages, Lockstep-Versionierung, CI-Gate

- Status: akzeptiert
- Datum: 2026-07-24

## Kontext

Damit „andere Projekte“ die Angular-Komponenten nutzen können, braucht es einen
Verteilweg. Anders als die CSS-Schicht (die vorgebaut im Repo liegt und heute per
GitHub-Tarball installiert wird) muss eine Angular-Lib durch ng-packagr **gebaut**
werden — ein `npm install github:...` auf den Quell-Code liefert kein nutzbares
Angular-Paket. Es braucht ein echtes, gebautes Artefakt aus einer Registry.

Die Konsumenten sind intern (Paket ist `private` / `UNLICENSED`). Die Angular-Lib
hängt als peerDependency an der CSS-Schicht (siehe
[ADR-0001](0001-angular-lib-als-css-wrapper.md)), also muss auch deren Verteilung
zusammenpassen.

## Entscheidung

- **Verteilung:** Beide Pakete — `@conciso/design-system-angular` **und**
  `@conciso/design-system` — nach **GitHub Packages** (privat, org-scoped). Der
  Konsument hat einen einheitlichen npm-Install-Weg (ein `.npmrc`, ein Mechanismus).
- **Paketname der Lib:** `@conciso/design-system-angular`.
- **Versionierung:** **Lockstep** — beide Pakete tragen immer dieselbe
  Versionsnummer; die peerDependency der Angular-Lib auf die CSS-Schicht wird eng
  gepinnt (z.B. `0.1.x`).
- **Build:** Angular-CLI-Workspace + ng-packagr (Angular Package Format), **ein**
  Einstiegspunkt (`public-api.ts`), der Komponenten **und** öffentliche Typen
  (`CdsArea`, `CdsButtonVariant`, `ThemeMode`, …) exportiert.
- **peer-Range Angular:** `^21.2.0` (aktuelle Major, gegen die gebaut wird).
- **Icons:** `@ng-icons/*` als normale `dependency` (vollständig gekapselt via
  `provideIcons`/`viewProviders`; kein globales Singleton).
- **Consumer-Smoke-Test als CI-Gate:** Eine committete Minimal-Consumer-Fixture im
  Repo installiert den per `npm pack` gebauten Tarball und läuft durch einen
  produktiven **AOT-`ng build`**. Läuft bei PR/Push **und** als harte Vorbedingung
  (`needs:`) des Publish-Jobs. Ein GitHub-Actions-Workflow (deutscher Name, Node 22)
  publiziert beide Pakete; wodurch er ausgelöst wird, steht im Nachtrag unten.

## Begründung

- GitHub Packages passt zu „intern“ und löst das Problem, dass ein Angular-Paket ein
  gebautes Artefakt (nicht Quell-Code) sein muss.
- Beide Pakete in derselben Registry ergeben konsistente Konsumenten-DX und lassen
  die peer-Range sauber auflösen.
- **Lockstep** ist bei [Wrapper-Komponenten](../../CONTEXT.md#wrapper-komponente), die
  eng an konkrete CSS-Klassen gekoppelt sind, leicht zu merken und macht die
  Kompatibilität offensichtlich (Angular-Lib vX ↔ CSS vX).
- Ein einziger Einstiegspunkt reicht: Da alle Komponenten standalone sind,
  tree-shaked der Konsument ohnehin nur das Genutzte — ohne den ng-packagr-Aufwand
  sekundärer Entry-Points für ~40 Komponenten.
- `@ng-icons` als `dependency` (statt peer) hält die Friktion gering, weil der
  Konsument die Icons nie direkt anfasst.
- Der Consumer-Smoke-Test fängt genau die Fehlerklassen ab, die Lint und
  Storybook-Tests nicht sehen: unvollständige APF-Metadaten, fehlende Re-Exports,
  peer-Dep-Auflösung, AOT-Template-Typfehler, fehlende Icon-Registrierungen. So wird
  nie ein Tarball publiziert, gegen den ein Konsument nicht bauen kann.

## Verworfene Alternativen

- **Öffentliche npm-Registry:** widerspricht `private`/`UNLICENSED`.
- **Committetes `dist/` + GitHub-Tarball (wie CSS heute):** Build-Artefakte im Git und
  heikle `prepare`-Schritte.
- **Eigene private Registry (Verdaccio/Artifactory):** Overhead, sofern Conciso so
  etwas nicht ohnehin betreibt.
- **Unabhängiges Semver + peer-Range** statt Lockstep: flexibler, aber der
  Versionsvertrag wurde bewusst zugunsten der Merkbarkeit vereinfacht.
- **Sekundäre Entry-Points:** feinere Granularität, aber deutlich mehr
  ng-packagr-Konfiguration und Pflege.
- **`>=21.2.0` (offen nach oben):** gibt ein ungetestetes Kompatibilitätsversprechen.
- **`@ng-icons` als peerDependency:** konservative Angular-Konvention, aber
  Zusatz-Install ohne Nutzen für den Konsumenten.
- **Smoke-Test mit Render-Check (Playwright):** deckt auch die CSS-Kopplung ab, ist
  aber schwerer/langsamer in CI — vorerst nur das AOT-Build-Gate; Render-Absicherung
  bleibt bei den bestehenden Visual-Tests.
- **Consumer-Fixture in CI generieren (`ng new`):** langsamer, netzabhängig, flakier
  und kein dauerhaftes Beispiel im Repo.

## Konsequenzen

- Beide `package.json` brauchen `publishConfig` für GitHub Packages; der Konsument
  braucht ein `.npmrc` mit org-Scope + Token.
- Ein reines Angular-Versions-Update erzwingt (durch Lockstep) einen gemeinsamen
  Release-Sprung beider Pakete — bewusst in Kauf genommen.
- Die Consumer-Fixture wird versioniert und dient zugleich als lebendes
  Konsum-Beispiel.

## Nachtrag: Auslöser des Publish-Workflows

Ursprünglich war der Workflow **release-/tag-getriggert** gedacht und als
`release: published` umgesetzt. Das war falsch: Ein Git-Tag löst kein
`release`-Event aus, und die Release-Konvention dieses Repos sind Tags
(CHANGELOG: „Releases werden als Git-Tags `vX.Y.Z` markiert"). Am Bestand belegt —
der Tag `v0.1.0` existiert, ein zugehöriges GitHub-Release nicht. Wer nach der
Konvention getaggt hätte, hätte nichts veröffentlicht, ohne Warnung.

Ausgelöst wird jetzt durch **eine Versionsänderung auf `main`**: ein Push, der eine
der beiden `package.json` berührt. Ob veröffentlicht wird, entscheidet die
**Registry** („liegt diese Version schon in GitHub Packages?") und nicht ein Diff
gegen den Vorgänger-Commit — ein Diff wäre unzuverlässig, weil Squash-Merges und
Pushes mit mehreren Commits den Versionswechsel verstecken. Damit gilt: Version
anheben und nach `main` mergen ist das Release; es gibt keinen Knopf, den man
vergessen kann.

Daraus folgt:

- Der Workflow legt **Tag und GitHub-Release selbst** an (Release-Text ist der
  CHANGELOG-Abschnitt der Version), damit die Tag-Konvention erfüllt bleibt und
  Notes nicht vom CHANGELOG abweichen. Beides erst **nach** den Publishes — ein Tag
  auf einem Stand, dessen Veröffentlichung scheiterte, wäre irreführend.
- `release: published` ist **entfernt**: Da der Workflow ein Release erzeugt, hätte
  er sich damit rekursiv selbst ausgelöst.
- Die Existenzprüfung läuft **pro Paket**. Bricht ein Lauf zwischen den beiden
  Publishes ab, zieht der nächste nur das fehlende Paket nach und warnt laut. Eine
  Prüfung auf „irgendeines von beiden liegt schon" würde in diesem Fall still
  übergehen und den Lockstep dauerhaft brechen.
- Zusätzliches Gate: fehlt der CHANGELOG-Abschnitt zur Version, bricht der Lauf ab
  (fängt „Version angehoben, Unreleased-Block vergessen").
