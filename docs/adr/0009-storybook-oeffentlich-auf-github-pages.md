# ADR-0009: Storybook öffentlich auf GitHub Pages

- Status: akzeptiert, überarbeitet am 2026-10-02 (PR-Vorschauen, Kontext „öffentliches Repo“)
- Datum: 2026-09-23

## Kontext

`conciso/conciso-design-system` ist ein **öffentliches** Repo; Forks sind möglich.
GitHub Pages ist eingerichtet, Quelle „GitHub Actions“ (`build_type` Workflow statt
`legacy` Branch-Deploy). Das Environment `github-pages` lässt Deployments nur von `main` zu.

> Ursprünglich (2026-09-23) war das Repo **privat** auf einem GitHub-Team-Plan; dort ist
> eine Pages-Site immer öffentlich, ein Zugriffsschutz auf die Site existiert nicht. Die
> Entscheidung für ein öffentliches Storybook fiel unter dieser Bedingung. Seit das Repo
> selbst öffentlich ist, ist der Quelltext ohnehin einsehbar — eine öffentliche Doku legt
> nichts offen, was nicht schon im Repo steht.

Veröffentlicht wird `apps/storybook/` (Storybook 10.6, `@storybook/angular-vite`):
Stories, MDX-Doku-Seiten und die aus JSDoc erzeugte Komponenten-API der
[Angular-Lib](../../CONTEXT.md#angular-lib) auf Basis der
[CSS-Schicht](../../CONTEXT.md#css-schicht) — siehe [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md).
Die **Pakete** sind davon unberührt; wie sie verteilt werden, regelt
[ADR-0011](0011-veroeffentlichung-auf-npmjs.md).

Der Ziel-Pfad ist die Default-URL des Repos, `https://conciso.github.io/conciso-design-system/`
— also ein **Unterpfad**, keine Domain-Root. Mehrere Stellen im Storybook referenzierten
statische Assets (CSS, Fonts, Brand-SVGs) bislang mit wurzelabsoluten Pfaden
(`/conciso/...`), die unter diesem Unterpfad ins Leere gezeigt hätten.

Komponenten-PRs werden von Entwickler:innen und Designer:innen reviewt. Ohne Live-Link
muss jede:r Reviewer:in das Repo lokal auschecken und Storybook starten, um eine neue
oder geänderte Komponente zu sehen — für Designer:innen eine hohe Hürde. Deshalb kommen
[PR-Vorschauen](../../CONTEXT.md#pr-vorschau) hinzu (Überarbeitung 2026-10-02).

## Entscheidung

- **Storybook wird öffentlich auf GitHub Pages veröffentlicht**, unter der Default-URL
  `https://conciso.github.io/conciso-design-system/`. An der Wurzel liegt **immer der
  Stand von `main`**; kein Versionieren nach Release.
- **Der `main`-Stand geht nur geprüft live.** Er wird erst veröffentlicht, wenn der
  `verify`-Job von `.github/workflows/storybook-angular.yml` (Lint, Typecheck, Build,
  Manifest, Vitest, Kontrast) auf `main` erfolgreich war — per Push oder manuell
  (`workflow_dispatch`).
- **Jeder offene PR aus einem Branch dieses Repos bekommt eine
  [PR-Vorschau](../../CONTEXT.md#pr-vorschau)** unter
  `https://conciso.github.io/conciso-design-system/pr-preview/pr-<N>/`, sofern er
  Storybook-relevante Pfade berührt (derselbe Pfadfilter wie `storybook-angular.yml`).
  Die Vorschau ist das vollständige Storybook des PR-Stands, nicht gefiltert.
- **Prüf-Schwelle der Vorschau: Lint, Typecheck und Build** (dazu die Unit-Tests des
  Site-Zusammenbaus selbst) — ohne auf Vitest und visuelle Tests zu warten. Eine Vorschau
  ist ausdrücklich ein ungeprüfter Stand zum Review, kein veröffentlichter Stand der Doku.
- **Keine Vorschauen für Fork-PRs.** Eine Vorschau veröffentlicht HTML/JS unter
  `conciso.github.io`; für fremden Code braucht das eine eigene, spätere Entscheidung
  (etwa eine Freigabe per Maintainer-Label).
- **Mechanismus: Pages-Quelle bleibt „GitHub Actions“, jeder Deploy setzt die ganze Site
  zusammen.**
  - Die Builds liegen auf dem Branch `pages-storage` (`main/`, `pr-<N>/`), der **nicht**
    ausgeliefert wird. Er besteht immer aus genau einem verwaisten Commit, der bei jeder
    Aktualisierung per Force-Push ersetzt wird — er sammelt keine Historie an.
  - Ein Publish-Workflow (`.github/workflows/storybook-pages.yml`) läuft per
    `workflow_run` nach dem `main`-Lauf von `storybook-angular.yml` bzw. nach dem
    Vorschau-Build (`.github/workflows/storybook-preview.yml`). Er legt den neuen Build
    in `pages-storage` ab, setzt `main/` an die Wurzel und die Vorschauen **offener** PRs
    unter `pr-preview/` und deployt das Ganze mit `actions/deploy-pages`.
  - Alle Deploys teilen sich eine Concurrency-Gruppe mit `queue: max`: kein Lauf wird
    verworfen, keiner überholt einen anderen.
  - Im PR erscheint „View deployment“ über ein Deployment im Environment `pr-preview`,
    das der Publish-Workflow per API auf den Head-Branch des PRs legt.
  - Wird ein PR geschlossen oder gemergt, verschwindet seine Vorschau: Jeder Deploy nimmt
    nur offene PRs auf und räumt den Speicher entsprechend auf; ein nächtlicher Lauf setzt
    die Site auch ohne neuen Build neu zusammen, sodass keine Vorschau länger als bis zum
    nächsten Morgen übersteht.
- **`noindex`** auf Manager- (`index.html`) und Preview-Chrome (`iframe.html`): Storybook
  ist zum Nachschlagen gedacht, nicht zum Auffinden über Suchmaschinen. Vorschauen erben
  das, weil sie derselbe Build sind.
- **Alle Asset-Pfade relativ** (`./conciso/...` statt `/conciso/...`) — Voraussetzung dafür,
  dass dieselbe Preview lokal, im Dev-Server, unter dem Pages-Unterpfad und unter
  `pr-preview/pr-<N>/` gleichermaßen auflöst.
- **Die [Doku-Site](../../CONTEXT.md#doku-site) bleibt unveröffentlicht**, auch als
  Vorschau; Reviewer prüfen Änderungen daran lokal (`docs/index.html` öffnen bzw.
  `npx serve .`, wie im Root-`README.md` beschrieben). Das frühere
  `.github/workflows/pr-preview.yml` (Doku-Site als Download-Artefakt) entfällt ersatzlos.

## Begründung

- Ein öffentliches Storybook legt nichts offen, was nicht ohnehin im öffentlichen Repo
  steht. Für Vorschauen gilt dasselbe: Der Stand jedes PR-Branches ist bereits öffentlich
  lesbar, die Vorschau macht ihn nur ohne lokalen Checkout ansehbar.
- „Immer `main`“ an der Wurzel statt versioniert passt zum kontinuierlichen
  Publish-Modell der Doku (anders als bei den Paketen selbst).
- Die volle `verify`-Schwelle für `main` stellt sicher, dass nie ein kaputter oder
  ungetesteter Stand als Doku live geht. Für eine Vorschau zählt dagegen schnelles
  Feedback: Wer reviewt, will den Stand sehen, sobald er baut — Testfehler meldet der
  PR-Check ohnehin.
- **Warum die Pages-Quelle „GitHub Actions“ bleibt** (statt „Deploy from a branch“ mit
  einem `gh-pages`-Branch): `actions/deploy-pages` ersetzt bei jedem Deploy die ganze
  Site; es gibt nur eine Pages-Quelle pro Repo. Statt vieler Schreiber auf eine live
  ausgelieferte Quelle gibt es so genau einen kontrollierten Deploy, der jedes Mal das
  Ganze aus `pages-storage` neu zusammensetzt. Das ist idempotent: Fällt ein Deploy aus,
  stellt der nächste alles richtig; eine verpasste Aufräumaktion heilt sich selbst, weil
  nur offene PRs in die Site kommen. Die `main`-only-Regel des `github-pages`-Environments
  bleibt wirksam, weil `workflow_run` im Kontext des Default-Branches läuft — und es
  braucht kein Secret.
- `workflow_run` wartet auf den ganzen auslösenden Workflow. Damit eine Vorschau nicht
  auf Vitest wartet, baut ein eigener, schlanker Workflow den PR-Stand; Storybook wird bei
  einem PR dadurch zweimal gebaut. Die zusätzlichen CI-Minuten sind der Preis für die
  niedrige Schwelle. Derselbe Schnitt (unprivilegierter Build unter `pull_request`,
  privilegierter Publish unter `workflow_run`) ist das von GitHub empfohlene Muster und
  trägt später auch Fork-Vorschauen.
- Für `main` wertet der Publish-Workflow gezielt das Ergebnis des `verify`-Jobs aus, nicht
  das des ganzen Workflows: Ein Fehler im MCP-Smoke-Test ([ADR-0012](0012-mcp-server-fuer-consumer.md))
  soll den Doku-Deploy weiterhin nicht blockieren.
- `pages-storage` als Ein-Commit-Branch: Jede Vorschau bringt einige MB entpackten Build
  mit; normale Commits würden die Repo-Historie dauerhaft aufblähen. Weil alle Schreiber
  serialisiert sind und der Branch keine Quelle ist, ist der Force-Push gefahrlos. Der Name
  sagt den Zweck — bewusst nicht `gh-pages`, das man als ausgelieferten Branch läse.
- `queue: max` statt des Defaults (`queue: single`): Jeder Publish-Lauf trägt den Build
  *seines* PRs in den Speicher. Verwürfe GitHub einen wartenden Lauf, fehlte diese
  Vorschau bis zum nächsten Push.
- Ein Deployment, das ein Job mit `environment:` im `workflow_run`-Kontext anlegt, hinge
  an `main` statt am PR — der Button erschiene nicht. Deshalb legt der Workflow es selbst
  per API an, mit dem Head-Branch des PRs als `ref`; ein gemeinsames Environment
  `pr-preview` für alle PRs vermeidet, Environments pro PR anlegen und löschen zu müssen.
- `noindex` kostet nichts und vermeidet, dass eine Referenz-Doku oder ein
  Zwischenstand in Suchergebnissen auftaucht, ohne dafür gedacht zu sein.
- Relative Pfade sind die einzige Änderung, die alle Auslieferungsorte bedient — eine
  Fallunterscheidung nach Umgebung wäre die kompliziertere Alternative gewesen.

## Verworfene Alternativen

- **Keine PR-Vorschauen** (die ursprüngliche Entscheidung vom 2026-09-23): Ein PR lief
  durch `verify` und zeigte damit, dass der Storybook-Build funktioniert; eine Live-URL
  pro PR schien keinen Mehrwert zu haben. Verworfen, weil das Review von Komponenten-PRs
  durch Designer:innen ohne lokalen Checkout den Mehraufwand rechtfertigt.
- **PR-Vorschauen über einen `gh-pages`-Branch** (`rossjrw/pr-preview-action`, Pages-Quelle
  „Deploy from a branch“): fertige Action mit Kommentar und Aufräumen, aber der Deploy über
  `actions/deploy-pages` und damit die `main`-only-Regel des Environments fielen weg; jeder
  PR-Lauf mit Schreibrecht änderte die Live-Site direkt. Dazu Schreib-Konflikte zwischen
  `main` und PRs auf einem Branch, das Limit von 10 Pages-Builds pro Stunde und die
  ungeklärte Frage, ob ein Push mit `GITHUB_TOKEN` überhaupt einen Pages-Build auslöst.
- **Separates Vorschau-Repo** mit eigener Pages-Site: stärkste Isolation der `main`-Site,
  braucht aber eine dauerhafte Repo-übergreifende Zugangsberechtigung (PAT oder
  GitHub-App-Key) — ein ISMS-relevantes Secret.
- **Externe Vorschau-Hoster** (Chromatic, Netlify, Cloudflare Pages): ausgeschlossen, das
  Hosting bleibt bei GitHub; ein neuer Dienst bräuchte eine ISB-Freigabe.
- **Vorschau-Builds als Workflow-Artefakte statt auf einem Branch:** Artefakte verfallen
  (Default 90 Tage), der Deploy müsste „neuestes Artefakt je offenem PR“ über die API
  zusammensuchen. Cache scheidet aus, weil PR-Caches für `main` nicht sichtbar sind.
- **Nur artefakt-basiert / intern hosten** (Download-Artefakt, zugriffsbeschränktes
  Hosting): kein Live-Link, zusätzlicher Hosting-Aufwand außerhalb von Pages.
- **Versioniert pro Release** (z. B. `/v0.1.0/`, `/latest/`): für eine Komponenten-Referenz,
  die an der aktuellen Lib-API interessiert ist, kein Bedarf ersichtlich.
- **Custom Domain:** technisch später jederzeit nachrüstbar, die Asset-Pfade sind relativ.
  Für jetzt kein Bedarf, kein Domain-Owner benannt.

## Konsequenzen

- Alles, was in Storybook landet — Stories, MDX-Seiten, Controls, generierte
  Props-Tabellen und das Komponenten-Manifest (`manifests/components.json`) — ist
  öffentlich einsehbar, und zwar schon mit dem ersten Push eines PR-Branches, nicht erst
  nach dem Merge.
- Einmal deployte Inhalte sind schwer rückgängig zu machen: Suchmaschinen-Caches,
  Archivdienste (z. B. Wayback Machine) und einzelne Nutzer:innen können einen Stand
  behalten, selbst wenn er entfernt wird. `noindex` senkt das Risiko, schließt es aber
  nicht aus.
- Jeder Deploy lädt `main` plus alle offenen Vorschauen hoch (wenige MB je Build) — bei
  der Pages-Grenze von 1 GB pro Site weit unkritisch, aber die Deploy-Dauer wächst mit der
  Zahl offener PRs.
- `main`-Deploys warten in derselben Warteschlange wie Vorschau-Deploys.
- Wer `pages-storage` von Hand ändert oder schützt (Branch-Schutz, Rulesets), bricht den
  Publish-Workflow; der Branch gehört allein dem Workflow.
- Der MCP-Endpunkt (`@storybook/addon-mcp`, `/mcp`) bleibt **nur im laufenden Dev-Server**
  erreichbar (siehe [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md#der-mcp-endpunkt-ist-im-lokalen-netz-erreichbar--bewusst))
  und ist **kein** Teil des statischen Builds — weder Pages noch Vorschauen vergrößern
  diese Angriffsfläche. Der MCP-Snapshot ([ADR-0012](0012-mcp-server-fuer-consumer.md))
  liest weiterhin das `storybook-static`-Artefakt seines eigenen Laufs, nicht Pages.
