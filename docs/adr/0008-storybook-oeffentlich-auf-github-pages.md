# ADR-0008: Storybook öffentlich auf GitHub Pages

- Status: akzeptiert
- Datum: 2026-09-23

## Kontext

`conciso/conciso-design-system` ist ein **privates** Repo auf einem GitHub-**Team**-Plan.
GitHub Pages ist dort bereits eingerichtet, Quelle „GitHub Actions“ (`build_type`
Workflow statt `legacy` Branch-Deploy). Auf dem Team-Plan gilt: Ist Pages für ein
privates Repo aktiviert, ist die veröffentlichte Site **immer öffentlich** erreichbar —
ein Zugriffsschutz auf die Site selbst (wie ihn GitHub Enterprise anbietet) existiert auf
diesem Plan nicht. Das Repo bleibt privat, nur der Pages-Output nicht.

Zu veröffentlichen wäre `storybook-angular/` (Storybook 10.6, `@storybook/angular-vite`):
Stories, MDX-Doku-Seiten und die aus JSDoc erzeugte Komponenten-API der
[Angular-Lib](../../CONTEXT.md#angular-lib) auf Basis der
[CSS-Schicht](../../CONTEXT.md#css-schicht) — siehe [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md).
Die **Pakete** (`@conciso/design-system`, `@conciso/design-system-angular`) bleiben davon
unberührt: Sie liegen weiterhin privat, org-scoped in GitHub Packages und verlangen Auth
auch fürs Lesen (siehe [ADR-0004](0004-verteilung-und-versionierung.md)). Zu entscheiden
war nur, ob und wie die **Doku** veröffentlicht wird.

Der Ziel-Pfad ist die Default-URL des Repos, `https://conciso.github.io/conciso-design-system/`
— also ein **Unterpfad**, keine Domain-Root. Mehrere Stellen im Storybook referenzierten
statische Assets (CSS, Fonts, Brand-SVGs) bislang mit wurzelabsoluten Pfaden
(`/conciso/...`), die unter diesem Unterpfad ins Leere gezeigt hätten.

Daneben existiert `.github/workflows/pr-preview.yml`: baut pro PR eine offline
lauffähige Vorschau der [Doku-Site](../../CONTEXT.md#doku-site) (`docs/index.html`,
via `scripts/build-docs-preview.sh`) als Download-Artefakt, mit einem dormanten,
nie aktivierten Pages-Deploy-Schritt für dieselbe Vorschau.

## Entscheidung

- **Storybook wird öffentlich auf GitHub Pages veröffentlicht**, unter der Default-URL
  `https://conciso.github.io/conciso-design-system/`.
- **Immer der Stand von `main`.** Kein Versionieren nach Release, keine PR-Vorschauen auf
  Pages. Ein Deploy läuft nur bei einem Push auf `main` oder manuell
  (`workflow_dispatch`), nie bei einem PR.
- **Deployt wird ausschließlich der geprüfte Build.** Der neue `deploy`-Job in
  `.github/workflows/storybook-angular.yml` hängt per `needs: verify` am bestehenden
  Lint-/Build-/Test-Job; es gibt keinen ungeprüften Direktpfad zu Pages.
- **`noindex`** auf Manager- (`index.html`) und Preview-Chrome (`iframe.html`): Storybook
  ist zum Nachschlagen gedacht, nicht zum Auffinden über Suchmaschinen.
- **Alle Asset-Pfade relativ** (`./conciso/...` statt `/conciso/...`) — Voraussetzung dafür,
  dass dieselbe Preview lokal, im Dev-Server und unter dem Pages-Unterpfad gleichermaßen
  auflöst.
- **`pr-preview.yml` entfällt ersatzlos**, mitsamt `scripts/build-docs-preview.sh`. Die
  [Doku-Site](../../CONTEXT.md#doku-site) bleibt unveröffentlicht; Reviewer prüfen
  Änderungen daran ab jetzt lokal (`docs/index.html` öffnen bzw. `npx serve .`, wie im
  Root-`README.md` beschrieben).

## Begründung

- Auf dem Team-Plan ist „Pages aktiviert, aber Site bleibt privat“ keine verfügbare
  Option — die Wahl steht zwischen öffentlichem Storybook oder gar keinem Pages-Deploy.
  Eine reine Doku, die ohnehin zur Veröffentlichung bestimmt ist (siehe
  [ADR-0006, Abwägung zum MCP-Endpunkt](0006-storybook-10-6-docgen-server-mcp-und-theming.md#der-mcp-endpunkt-ist-im-lokalen-netz-erreichbar--bewusst)),
  trägt dieses Risiko gut.
- „Immer `main`“ statt versioniert hält den Aufwand auf einen einzigen Deploy-Job
  begrenzt und passt zum bisherigen Publish-Modell des Repos (kontinuierlich statt
  release-getaktet für die Doku, anders als bei den Paketen selbst).
- Der Build über `needs: verify` stellt sicher, dass nie ein kaputter oder ungetesteter
  Stand live geht — derselbe Lint-/Build-/Manifest-/Vitest-/Kontrast-Lauf, der ohnehin
  jeden Push und PR prüft.
- `noindex` kostet nichts und vermeidet, dass eine interne Referenz-Doku in
  Suchergebnissen auftaucht, ohne dafür gedacht zu sein.
- Relative Pfade sind die einzige Änderung, die sowohl den Unterpfad auf Pages als auch
  den heutigen Dev-Server-Betrieb (`npm run storybook`, Root-relativ über Traefik) bedient
  — eine Fallunterscheidung nach Umgebung wäre die kompliziertere Alternative gewesen.
- PR-Vorschauen für Storybook selbst entstehen implizit: Ein PR läuft weiterhin durch
  `verify` (Lint/Build/Tests), zeigt also, dass der Storybook-Build funktioniert;
  eine Live-URL pro PR bringt für eine ohnehin bereits öffentliche `main`-Doku keinen
  zusätzlichen Wert, der den Mehraufwand rechtfertigt.

## Verworfene Alternativen

- **Nur artefakt-basiert / intern hosten** (z. B. wie bisher `doku-preview` als
  Download-Artefakt, oder ein separates, zugriffsbeschränktes Hosting): kein Live-Link
  zum Nachschlagen, zusätzlicher Hosting-Aufwand außerhalb der bereits eingerichteten
  Pages-Infrastruktur.
- **GitHub Enterprise mit zugriffsbeschränkten Pages:** würde eine interne, nicht
  öffentliche Site erlauben — aber auf dem Team-Plan nicht verfügbar, ein Upgrade stand
  nicht zur Debatte.
- **Versioniert pro Release** (z. B. `/v0.1.0/`, `/latest/`): würde mehreren
  Storybook-Ständen parallel eine URL geben, verlangt aber einen eigenen
  Verzeichnis-Publish-Mechanismus statt des einfachen `actions/deploy-pages`-Ersetzens;
  für eine Komponenten-Referenz, die ohnehin an der aktuellen Lib-API interessiert, kein
  Bedarf ersichtlich.
- **Custom Domain:** technisch später jederzeit nachrüstbar, ohne dass etwas hier
  umgebaut werden müsste — die Asset-Pfade sind bereits relativ, nicht an
  `conciso.github.io/conciso-design-system/` gebunden. Für jetzt kein Bedarf, kein
  Domain-Owner benannt.
- **PR-Vorschauen über einen `gh-pages`-Branch** (`rossjrw/pr-preview-action`, der
  dormante Pfad in `pr-preview.yml`): setzt Pages-Quelle „Deploy from a branch“ voraus —
  kollidiert mit der bereits gewählten Quelle „GitHub Actions“ für den
  Storybook-Deploy (nur eine Pages-Quelle pro Repo). Außerdem würde jeder PR-Zustand
  öffentlich sichtbar, nicht nur der geprüfte `main`-Stand.

## Konsequenzen

- Alles, was in Storybook landet — Stories, MDX-Seiten, Controls, generierte
  Props-Tabellen und das Komponenten-Manifest (`manifests/components.json`) — ist ab dem
  ersten Deploy öffentlich einsehbar. Wer künftig etwas in `storybook-angular/` ergänzt,
  muss davon ausgehen, dass es öffentlich wird.
- Einmal deployte Inhalte sind schwer rückgängig zu machen: Suchmaschinen-Caches,
  Archivdienste (z. B. Wayback Machine) und einzelne Nutzer:innen können einen Stand
  behalten, selbst wenn Pages später deaktiviert oder der Inhalt entfernt wird. `noindex`
  senkt das Risiko, schließt es aber nicht aus.
- Der MCP-Endpunkt (`@storybook/addon-mcp`, `/mcp`) bleibt **nur im laufenden Dev-Server**
  erreichbar (siehe [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md#der-mcp-endpunkt-ist-im-lokalen-netz-erreichbar--bewusst))
  und ist **kein** Teil des statischen `storybook-static`-Builds — der Pages-Deploy
  vergrößert diese Angriffsfläche also nicht.
- Der `github-pages`-Environment-Deploy braucht in den Repo-Einstellungen keine weitere
  manuelle Freigabe mehr, sobald Pages (wie bereits verifiziert) auf Quelle
  „GitHub Actions“ steht; nötig ist nur, dass das Environment `github-pages` Deployments
  von `main` zulässt.
- Wer Storybook-Vorschauen pro PR braucht, bekommt sie nicht mehr automatisch als Link —
  nur noch lokal (`npm run storybook` bzw. `npm run build-storybook` + Preview).
