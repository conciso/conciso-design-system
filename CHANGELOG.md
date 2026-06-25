# Changelog

Alle nennenswerten Änderungen am Conciso Design System. Format nach
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/), Versionierung nach
[SemVer](https://semver.org/lang/de/).

Versionspolitik:
- **MAJOR** — Breaking Changes an der öffentlichen API (umbenannte/entfernte
  Klassen oder Tokens, geänderte Ladereihenfolge).
- **MINOR** — neue Komponenten/Tokens, abwärtskompatibel.
- **PATCH** — Bugfixes, Kontrast-/Dark-Mode-Korrekturen, Doku.

Releases werden als Git-Tags `vX.Y.Z` markiert.

## [Unreleased]

### Added
- Onboarding-/Governance-Doku: `README.md`, `CONTRIBUTING.md` (Konventionen),
  `LICENSE`, dieses `CHANGELOG.md`, `docs/GETTING-STARTED.md`.

### Geplant
- npm-Paketierung (`@conciso/design-system`) inkl. Token-Export
  (`tokens.json` / `.scss` / `.js`) und gebündeltem `dist/conciso-ds.css`.
- Repo-Hygiene: Trennung Doku-Site/Kern, Demo-Bilder via Git LFS.

---

Frühere Arbeit (vor formaler Versionierung) ist in der Git-Historie
dokumentiert: Aufbau der Foundations (Tokens, Typografie 16/14/12, Spacing,
Elevation), Komponentenbibliothek, vollständiger Light/Dark-Mode mit
WCAG-AA-Kontrasten, Beispielseiten und die navigierbare Doku-Site.
Die erste getaggte Version markiert den Start der paketierten Distribution.
