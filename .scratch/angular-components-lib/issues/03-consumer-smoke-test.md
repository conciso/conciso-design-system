# 03 — Consumer-Smoke-Test (neuer Seam)

**What to build:** Es gibt einen automatisierten Nachweis, dass ein echtes Projekt die
gebaute Lib konsumieren kann. Eine committete
[Consumer-Fixture](../../../CONTEXT.md#consumer-fixture) — eine Minimal-Angular-App im
Repo, die die Pilot-Komponenten benutzt und zugleich als lebendes Konsum-Beispiel
dient — installiert die per `npm pack` gebauten Tarballs (Angular-Lib **und**
CSS-Schicht), bindet CSS + Fonts über `angular.json` ein und fährt durch einen
produktiven AOT-Build. Dieser [Consumer-Smoke-Test](../../../CONTEXT.md#consumer-smoke-test)
ist der einzige neue Test-Seam und fängt genau die Fehler ab, die erst beim echten
Konsum auftreten.

**Blocked by:** 02

**Status:** done

- [x] Eine committete Consumer-Fixture-App im Repo importiert die Pilot-Komponenten aus `@conciso/design-system-angular` und bindet die CSS-Schicht + Fonts global über ihre `angular.json` (`styles`/`assets`) ein.
- [x] Der Smoke-Test baut die Lib und die CSS-Schicht, tarballt beide per `npm pack` und installiert sie in die Fixture (keine Registry-Rechte nötig).
- [x] Die Fixture läuft anschließend durch einen produktiven AOT-`ng build`; der Test schlägt fehl bei unvollständigen APF-Metadaten, fehlenden Re-Exports, nicht auflösbaren peer-Deps, AOT-Template-Typfehlern oder fehlender Icon-Registrierung.
- [x] Der Smoke-Test läuft als CI-Job bei `push` (main/`feat/**`) und `pull_request`, im Stil der bestehenden Workflows (Node 22).
- [x] Der copy-paste-fertige `angular.json`-Einbindungs-Schnipsel aus der Fixture ist im README der Lib dokumentiert.

## Umsetzung

- Consumer-Fixture: [`examples/consumer-fixture`](../../../examples/consumer-fixture) — minimale, eigenständige Angular-21-App (kein npm-Workspace-Mitglied, eigene `node_modules`), konsumiert Button + Topnav samt öffentlicher Typen (`CdsArea`, `CdsButtonVariant`) aus `@conciso/design-system-angular`. CSS + Fonts werden über `angular.json` (`assets`, nicht `styles` — kein CSS-Bundling) nach `conciso/css`/`conciso/fonts` kopiert und in `index.html` per `<link>` in der vorgeschriebenen Reihenfolge eingebunden (Vorbild: `storybook-angular/.storybook/preview-head.html`).
- Smoke-Test-Skript: [`scripts/consumer-smoke-test.sh`](../../../scripts/consumer-smoke-test.sh) — baut CSS-Schicht (`npm run build`) + Lib (`npm run build --workspace=angular-lib`), tarballt beide per `npm pack`, installiert die Tarballs per `npm install --no-save` in einen sauberen `node_modules`-losen Zustand der Fixture, fährt dort `ng build` (produktiv, AOT).
- CI: [`.github/workflows/consumer-smoke-test.yml`](../../../.github/workflows/consumer-smoke-test.yml), Job-ID `consumer-smoke-test`. Trigger `push` (main/`feat/**`) + `pull_request` + `workflow_call` — Letzteres macht den Job als reusable Workflow aufrufbar, damit der künftige Publish-Workflow (Ticket 04) ihn per `uses:` einbinden und den Publish-Job per `needs:` darauf verdrahten kann (`needs:` wirkt nur innerhalb derselben Workflow-Datei).
- README-Snippet: [`angular-lib/projects/design-system-angular/README.md`](../../../angular-lib/projects/design-system-angular/README.md) → Abschnitt „CSS + Fonts einbinden“.
- Per Stichprobe verifiziert, dass der Smoke-Test bei folgenden Fehlerklassen tatsächlich fehlschlägt: fehlender Re-Export in `public-api.ts` (TS2724), nicht auflösbare peer-Dep (ERESOLVE bei abweichender CSS-Version) und AOT-Template-Typfehler (TS2322 bei ungültigem `CdsButtonVariant`).
