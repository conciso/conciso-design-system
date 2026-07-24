# 04 — Publish-Workflow + publishConfig

**What to build:** Beide Pakete lassen sich reproduzierbar über einen
GitHub-Actions-Workflow nach GitHub Packages (privat, org-scoped) veröffentlichen.
Ein Maintainer, der ein Release taggt, löst einen Workflow aus, der zuerst den
[Consumer-Smoke-Test](../../../CONTEXT.md#consumer-smoke-test) als harte Vorbedingung
laufen lässt und erst danach publiziert — sodass nie ein Tarball veröffentlicht wird,
gegen den ein Konsument nicht bauen kann.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Beide `package.json` (`@conciso/design-system-angular` und `@conciso/design-system`) tragen `publishConfig` für GitHub Packages.
- [ ] Ein release-/tag-getriggerter GitHub-Actions-Workflow (deutscher Name im Stil der bestehenden Workflows, Node 22) baut und publiziert beide Pakete nach GitHub Packages.
- [ ] Der Publish-Job hat den Consumer-Smoke-Test als harte Vorbedingung (`needs:`); schlägt der Smoke-Test fehl, wird nicht publiziert.
- [ ] Der Workflow ist ohne echtes Veröffentlichen verifizierbar (Dry-Run / `--dry-run` o.ä.), sodass er vor dem ersten realen Release geprüft werden kann.
- [ ] Die für den Konsumenten nötige `.npmrc`-Konfiguration (org-Scope + Token) ist im README dokumentiert.
