# ADR-0011: Veröffentlichung auf npmjs.org (zusätzlich zu GitHub Packages)

- Status: akzeptiert
- Datum: 2026-09-25

## Kontext

Beide Pakete — `@conciso/design-system` (CSS-Schicht) und
`@conciso/design-system-angular` (Angular-Lib) — liegen bislang ausschließlich in
**GitHub Packages**, org-scoped und privat (siehe
[ADR-0004](0004-verteilung-und-versionierung.md)). Das passte, solange nur interne
[Consumer](../../CONTEXT.md#consumer--konsument) das Design System einbinden: Ein
Personal Access Token (classic) ist Pflicht, auch nur zum **Lesen**.

Die npm-Org `conciso` existiert bereits auf npmjs.org. Beide Pakete sollen
**zusätzlich** dort erscheinen — Lockstep, dieselbe Version, derselbe
Publish-Workflow. GitHub Packages bleibt unverändert bestehen; es geht nicht um
Ablösung, sondern um eine zweite, öffentlich lesbare Registry ohne Auth-Hürde für
Konsumenten außerhalb der GitHub-Organisation.

Auslöser für den Publish-Job ist weiterhin
[ADR-0010](0010-release-ausloesung-und-versionsquelle.md): ein pfadgefilterter,
kommittbasierter Release ohne Handschritt, mit paketweiser Existenzprüfung und
Nachziehen eines halb veröffentlichten Standes. Diese Existenzprüfung muss jetzt zwei
Registries statt einer betrachten, ohne dass ein Ausfall auf der einen Seite den
Lockstep der anderen verletzt.

**Recherchierte Fakten zu npm Trusted Publishing** (Quelle:
[docs.npmjs.com/trusted-publishers](https://docs.npmjs.com/trusted-publishers/),
ergänzt um [github.blog, GA-Ankündigung](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)
und [npm/cli#8544](https://github.com/npm/cli/issues/8544)):

- **Versionsanforderung:** „Trusted publishing requires npm CLI version 11.5.1 or
  later and Node version 22.14.0 or higher.“ Der Runner nutzt `actions/setup-node`
  mit `node-version: 22` (erfüllt die Node-Anforderung), die mitgelieferte npm-Version
  ist aber nicht garantiert aktuell genug — der Workflow hebt sie deshalb explizit
  (`npm install -g npm@^11.5.1`).
- **Berechtigung:** „The critical requirement is the `id-token: write` permission,
  which allows GitHub Actions to generate OIDC tokens.“ Nur der Job, der tatsächlich
  veröffentlicht, braucht sie.
- **Provenance automatisch:** „When you publish using trusted publishing from GitHub
  Actions or GitLab CI/CD, npm automatically generates and publishes provenance
  attestations for your package. This happens by default — you don't need to add the
  `--provenance` flag.“ Kein zusätzliches Flag im Workflow nötig.
- **`repository.url` muss exakt passen:** „To publish from GitHub, your package's
  `repository.url` field in `package.json` must exactly match your GitHub
  repository.“ Beide Pakete tragen bereits
  `git+https://github.com/conciso/conciso-design-system.git` — unverändert, kein
  Anpassungsbedarf.
- **Workflow-Dateiname exakt, `.yml`-Endung Pflicht:** Beim Einrichten des Trusted
  Publisher auf npmjs.com muss der Dateiname `publish.yml` (case-sensitive, mit
  Endung) hinterlegt werden.
- **Erst-Publish (Bootstrap-Problem), bestätigt in
  [npm/cli#8544](https://github.com/npm/cli/issues/8544):** „it's not possible to
  publish the initial version of a package using OIDC, it needs to be published
  manually or using a token.“ Ein Trusted Publisher lässt sich auf npmjs.com nur für
  ein **bereits existierendes** Paket einrichten — die UI verlangt eine Paketseite,
  die es vor dem ersten Publish nicht gibt. Für beide Pakete ist deshalb ein
  **einmaliger manueller Bootstrap-Publish VOR dem Merge** nötig (Platzhalterversion
  `0.0.0-bootstrap.0`, Tag `bootstrap` statt `latest`), siehe Checkliste in
  [CONTRIBUTING.md](../../CONTRIBUTING.md) § 15.
- **dist-tag `latest` bei einem Erst-Publish mit `--tag`:** Die Dokumentation
  ([docs.npmjs.com/cli/v11/commands/npm-publish](https://docs.npmjs.com/cli/v11/commands/npm-publish/))
  belegt nur den Normalfall: „By default, running `npm publish` will tag your
  package with the `latest` dist-tag. To use another dist-tag, use the `--tag`
  flag.“ Ob der **allererste** Publish eines fabrikneuen Pakets `latest` trotzdem
  zusätzlich setzt, obwohl `--tag bootstrap` angegeben ist, sagt die Doku nicht
  explizit — das ist **nicht verifiziert**, nur angenommen. Es gibt dazu eine
  bekannte, verwandte Fehlerklasse (`latest` wird unerwartet gesetzt, obwohl ein
  anderer Tag angegeben war), dokumentiert u. a. in
  [npm/cli#7553](https://github.com/npm/cli/issues/7553) („`npm publish` tags
  pre-versions as `latest`“). Die Bootstrap-Checkliste behandelt das defensiv (siehe
  dort) — und selbst im ungünstigsten Fall bleibt der Schaden auf ein kurzes
  Zeitfenster begrenzt: Der erste **echte** Release über die Pipeline veröffentlicht
  eine SemVer-strikt höhere Version ohne `--tag` und setzt `latest` damit
  unabhängig davon verbindlich neu.
- **„Require two-factor authentication and disallow tokens“ ist mit Trusted
  Publishing kompatibel**, bestätigt in
  [docs.npmjs.com/trusted-publishers](https://docs.npmjs.com/trusted-publishers/):
  „The 'disallow tokens' setting only affects traditional token authentication.
  Your trusted publishers will continue to work normally, as they use OIDC
  tokens.“ Diese striktere Einstellung unter *Settings → Publishing access* lässt
  sich also **nach** der Trusted-Publisher-Einrichtung pro Paket setzen, ohne den
  automatisierten OIDC-Publish zu blockieren (Quelle für die Einstellung selbst:
  [docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/)).
- **Limit:** bis zu 10 Trusted-Publisher-Konfigurationen je Paket — hier wird je
  Paket genau eine gebraucht.

## Entscheidung

- **Zusätzliche Registry:** Beide Pakete gehen künftig **zusätzlich** nach
  `https://registry.npmjs.org`, im selben Publish-Lauf, im selben Lockstep wie
  GitHub Packages. GitHub Packages ändert sich nicht (`publishConfig.registry`
  bleibt darauf stehen — siehe unten, warum das so bleiben kann).
- **Auth: npm Trusted Publishing (OIDC), kein `NPM_TOKEN`.** Der `publish`-Job bekommt
  `permissions: id-token: write` (einzig dieser Job). Kein Secret im Repo, kein Token
  zu rotieren.
- **Registry-Ziel für die npmjs-Schritte: `--@conciso:registry=https://registry.npmjs.org`
  als CLI-Flag**, nicht `--registry` allein und nicht ein dauerhaft geändertes
  `publishConfig`. Begründung und Beleg unten.
- **`--access public`** bei jedem npmjs-Publish (nicht nur beim ersten): Ein
  gescoptes Paket ist auf npmjs ohne diese Angabe standardmäßig privat
  (kostenpflichtig).
- **Existenzprüfung erweitert um npmjs:** `scripts/release/decide.mjs` bekommt
  `cssVersionsNpm`/`libVersionsNpm` als zusätzliche Fakten und liefert
  `publishCssNpm`/`publishLibNpm` zusätzlich zu `publishCss`/`publishLib`. Beide
  Registry-Paare werden unabhängig voneinander nachgezogen.
- **Alte Versionen (1.0.0, 2.0.0) bleiben nur in GitHub Packages.** Eine feste
  Konstante `NPM_BASELINE = '2.0.0'` in `decide.mjs` markiert die letzte Version, die
  es auf npmjs nie gab und nie geben soll. Nur Versionen **echt über**
  `NPM_BASELINE` zählen für den npmjs-Vollständigkeits-Check — ein alter,
  längst abgeschlossener Tag wird nie fälschlich als „auf npmjs unfertig“ gewertet,
  selbst wenn die npmjs-Registry-Abfrage für ihn (korrekt) „nicht gefunden“ liefert.
  Begründung für eine feste Konstante statt einer Ableitung: `latestTag` wandert mit
  jedem Release weiter, der Stichtag für „npmjs beginnt hier“ nicht — eine Ableitung
  aus `latestTag` würde bei jedem neuen Release den Stichtag mitverschieben und wieder
  alte Versionen einschließen.
- **Die Bootstrap-Platzhalterversion (`0.0.0-bootstrap.0`) zählt nirgendwo als
  echter npmjs-Release.** `decide.mjs` filtert `cssVersionsNpm`/`libVersionsNpm`
  ganz vorn auf schlichtes `X.Y.Z` (dasselbe Muster, das `stamp-version.mjs` für
  reguläre Releases ohnehin erzwingt) — ein Prerelease-Suffix fällt damit strukturell
  heraus, unabhängig von `NPM_BASELINE`. Zwei Gründe zugleich: Erstens ist das die
  korrekte Regel (eine Bootstrap-Version ist kein Release). Zweitens verhindert es
  einen Absturz — `NPM_BASELINE`-Vergleiche erwarten schlichtes `X.Y.Z` und würden an
  einem Prerelease-String ohne den Filter hart scheitern.

## Begründung

- **Registry-Ziel — Befund per `npm publish --dry-run`:** `publishConfig.registry`
  zeigt auf GitHub Packages. Ein `npm publish --dry-run --registry
  https://registry.npmjs.org` **gewinnt zwar gegen `publishConfig`** (verifiziert:
  `npm notice Publishing to https://registry.npmjs.org/ … (dry-run)` in einer
  isolierten Umgebung ohne weitere Registry-Config) — **aber nicht mehr**, sobald
  vorher (im selben Job, für die GitHub-Packages-Schritte) `actions/setup-node` mit
  `scope: '@conciso'` gelaufen ist. Dieser Schritt schreibt
  `@conciso:registry=https://npm.pkg.github.com` in die `.npmrc`, und npm prüft für
  gescopte Pakete **immer zuerst die Scope-Registry**, vor der generischen
  `registry`-Option — auch vor dem `--registry`-Flag. Verifiziert (dieselbe isolierte
  Umgebung, jetzt mit einer `@conciso:registry`-Zeile wie von setup-node erzeugt):
  `npm publish --dry-run --registry https://registry.npmjs.org` liefert weiterhin
  `Publishing to https://npm.pkg.github.com/ … (dry-run)` — das generische
  `--registry`-Flag verpufft. Erst die **scope-eigene** CLI-Option
  `--@conciso:registry=https://registry.npmjs.org` überschreibt zuverlässig (auch
  gegenüber `publishConfig` und einer bestehenden `.npmrc`-Zeile, da CLI-Flags in npms
  Konfigurationshierarchie die höchste Priorität haben): Beleg
  `npm notice Publishing to https://registry.npmjs.org with tag latest and public
  access (dry-run)`. Dasselbe Bild für `npm view …` (Existenzprüfung in `pruefen`, s.
  u.). Ein temporäres Überschreiben von `publishConfig.registry` in der Checkout-Kopie
  (analog zum Versions-Stempel) hätte am selben Problem gescheitert: Die
  scope-spezifische `.npmrc`-Zeile aus `setup-node` sticht `publishConfig` ebenso wie
  ein reines `--registry`.
- **Warum GitHub Packages in `publishConfig` bleiben darf:** Weil die Umgehung pro
  Schritt über das CLI-Flag läuft, muss der Standard (`npm publish` ohne Extra-Flags,
  z. B. von Hand auf einem Entwickler-Rechner) weiter GitHub Packages treffen — das
  ist ohnehin der Fall, gewollt, und ändert nichts an ADR-0004.
- **npm-Version im Runner:** `Node 22` über `setup-node` erfüllt „Node ≥ 22.14.0“
  bereits. Die mitgelieferte npm-Version ist nicht separat garantiert ≥ 11.5.1, daher
  der explizite Hebe-Schritt `npm install -g npm@^11.5.1` — bewusst **nach** den
  GitHub-Packages-Publishes platziert, damit deren erprobte Standard-npm-Version
  unangetastet bleibt.
- **`NPM_BASELINE` als Konstante statt Ableitung:** Der Bestand ist bekannt und fest
  (1.0.0, 2.0.0 — nur GitHub Packages, CHANGELOG endet bei 2.0.0). Eine Ableitung aus
  Laufzeitdaten (z. B. „ältester Tag ohne npm-Eintrag“) wäre fragiler und würde bei
  jedem neuen, künftig korrekt auf npmjs fehlenden Zwischenschritt falsch feuern.
- **Bootstrap VOR dem Merge, nicht als roter erster Lauf:** Ein
  Trusted-Publisher-Setup, das erst beim ersten echten Release „nebenbei“
  nachgeholt wird, hieße: der erste Lauf auf `main` scheitert absichtlich zur
  Hälfte (npmjs-Schritt rot), und jemand muss das live beobachten und reagieren.
  Sauberer: Der Mensch erledigt den Erst-Publish **lokal, vor dem Merge**, mit
  einer Platzhalterversion (`0.0.0-bootstrap.0`, Tag `bootstrap`, nie `latest`,
  nie committet) — danach existiert das Paket auf npmjs.com, der Trusted Publisher
  lässt sich einrichten, und der erste echte Release über die Pipeline läuft von
  Anfang an grün durch. Details in CONTRIBUTING.md § 15.
- **Der bisherige Weg bleibt als Rückfall bestehen, nicht als Ersatz:** Wurde der
  Bootstrap vergessen oder ist er unvollständig (z. B. nur ein Paket bootstrapped),
  bricht beim ersten echten Release trotzdem nur der npmjs-Teil ab — GitHub
  Packages und npmjs sind unabhängig konditioniert (Regel oben). GitHub Packages
  wird veröffentlicht, Tag und Release werden zurückgehalten (siehe
  ADR-0004-Nachtrag/ADR-0010: „ERST einen unfertigen Release abschließen“), und der
  nächste Lauf zieht npmjs nach, sobald der Bootstrap nachgeholt ist. Kein
  Sonderfall in `decide.mjs` nötig, derselbe „Nachziehen“-Pfad wie bei jedem
  anderen halben Release — der Bootstrap-VOR-dem-Merge-Weg macht diesen Pfad nur
  zum Ausnahmefall statt zum Regelfall.

## Verworfene Alternativen

- **Nur npmjs, GitHub Packages abschalten:** Würde bestehende Consumer-Setups (die
  `.npmrc` mit `@conciso:registry=https://npm.pkg.github.com`) brechen, ohne
  Übergangsfrist. Zwei Registries parallel zu pflegen ist der geringere Aufwand
  gegenüber einer koordinierten Migration aller Consumer.
- **`NPM_TOKEN` (klassisches Auth-Token) statt Trusted Publishing:** Ein
  langlebiges Secret im Repo, das rotiert und bei Kompromittierung sofort
  Schreibzugriff auf beide Pakete gibt. Trusted Publishing braucht kein Secret,
  tauscht kurzlebige Tokens pro Lauf und liefert Provenance kostenlos mit — die
  aktuelle npm-Empfehlung für CI/CD-Publishes.
- **`publishConfig.registry` dauerhaft auf npmjs umstellen und GitHub Packages per
  Flag ansteuern:** Hätte den Standardfall (Entwickler-Rechner, ADR-0004-Workflow für
  GitHub Packages) umgedreht und mehr Stellen berührt, ohne einen Vorteil gegenüber
  der hier gewählten Lösung.
- **Eigene `.npmrc` je Job-Schritt schreiben** (statt CLI-Flag): funktional
  gleichwertig, aber ein zusätzlicher Datei-Schreib-/Aufräum-Schritt für denselben
  Effekt, den ein einzelnes Flag pro `npm publish`-Aufruf erreicht.
- **`NPM_BASELINE` aus einem Datum statt einer Version ableiten:** Ein Stichtag
  bräuchte einen Abgleich Commit-Datum ↔ Release, den die Registry-basierte Logik
  nicht sonst braucht. Eine Versionskonstante passt zum bereits vorhandenen
  Versionsvergleich in `decide.mjs` und ist eine Zeile.
- **Kein Bootstrap, erster echter Release scheitert bewusst zur Hälfte:** War der
  ursprüngliche Entwurf — funktional korrekt (das Nachziehen fängt es ab), aber ein
  absichtlich roter erster Lauf ist ein schlechter Normalfall, gerade weil er nach
  außen wie ein Fehler aussieht statt wie ein erwarteter Zwischenschritt. Der
  Bootstrap vor dem Merge macht denselben Rückfallpfad zum Ausnahmefall statt zur
  Regel.

## Konsequenzen

- **Zwei Registries pro Release, ein Workflow.** `scripts/release/decide.mjs` prüft
  jetzt vier statt zwei Zustände (`publish_css`, `publish_lib`, `publish_css_npm`,
  `publish_lib_npm`) und zieht jeden fehlenden Zustand unabhängig nach; Tag und
  GitHub-Release entstehen weiterhin erst, wenn alle vier für die aktuelle Version
  erledigt sind (oder von vornherein nicht nötig waren).
- **Einmalige, manuelle Einrichtung nötig, VOR dem Merge** (Checkliste in
  CONTRIBUTING.md § 15): pro Paket ein Bootstrap-Publish mit Platzhalterversion
  (`0.0.0-bootstrap.0`, Tag `bootstrap`), danach ein Trusted Publisher auf
  npmjs.com (Org/Repo `conciso/conciso-design-system`, Workflow-Datei
  `publish.yml`) — ein Trusted Publisher lässt sich nicht für ein noch nicht
  existierendes Paket einrichten. Nach der Einrichtung: *Publishing access* auf
  „Require two-factor authentication and disallow tokens“ setzen (bleibt mit
  Trusted Publishing kompatibel, siehe Kontext) und das für den Bootstrap
  genutzte Token widerrufen. Ohne diesen Bootstrap bricht beim ersten echten
  Release nur der npmjs-Teil ab; GitHub Packages veröffentlicht trotzdem, npmjs
  zieht im nächsten Lauf nach (Rückfall, siehe Begründung).
- **Bis zum ersten echten Release nach dem Merge gibt es auf npmjs nur die
  Bootstrap-Platzhalterversion** (falls der Bootstrap gelaufen ist) oder noch gar
  keine Version (falls nicht). Die npmjs-Installationsanleitung in README.md,
  docs/GETTING-STARTED.md und der Lib-README gilt entsprechend erst **ab** diesem
  ersten echten Release.
- **Provenance** entsteht ab dem ersten OIDC-Publish automatisch und ist auf der
  npmjs-Paketseite sichtbar (SLSA-Build-Attestierung, Repository/Commit/Workflow
  nachvollziehbar) — ohne Zutun im Workflow. Der Bootstrap-Publish selbst läuft
  NICHT über OIDC (siehe Kontext), trägt also keine Provenance — unkritisch, weil
  er keine echte, installierbare Version ist.
- **GitHub Packages bleibt unverändert** die Registry für `publishConfig` und für
  bestehende interne Consumer; nichts an ADR-0004 oder an der dortigen
  `.npmrc`-Anleitung ändert sich.
- **Setzt auf der MIT-Relizenzierung auf.** Ein öffentlich lesbares npmjs-Paket
  braucht ein korrektes `license`-Feld; das liefert die parallel entschiedene
  Umstellung auf MIT (`LICENSE`, `NOTICE`), hier unverändert übernommen und nicht
  Gegenstand dieses ADRs.
