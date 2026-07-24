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

**Status:** ready-for-agent

- [ ] Eine committete Consumer-Fixture-App im Repo importiert die Pilot-Komponenten aus `@conciso/design-system-angular` und bindet die CSS-Schicht + Fonts global über ihre `angular.json` (`styles`/`assets`) ein.
- [ ] Der Smoke-Test baut die Lib und die CSS-Schicht, tarballt beide per `npm pack` und installiert sie in die Fixture (keine Registry-Rechte nötig).
- [ ] Die Fixture läuft anschließend durch einen produktiven AOT-`ng build`; der Test schlägt fehl bei unvollständigen APF-Metadaten, fehlenden Re-Exports, nicht auflösbaren peer-Deps, AOT-Template-Typfehlern oder fehlender Icon-Registrierung.
- [ ] Der Smoke-Test läuft als CI-Job bei `push` (main/`feat/**`) und `pull_request`, im Stil der bestehenden Workflows (Node 22).
- [ ] Der copy-paste-fertige `angular.json`-Einbindungs-Schnipsel aus der Fixture ist im README der Lib dokumentiert.
