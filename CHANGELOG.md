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
- npm-Paketierung (`@conciso/design-system`, `package.json` mit `exports`/`files`).
- Token-Export `tokens/tokens.json` · `.scss` · `.js` (generiert aus `tokens.css`
  + Dark-Overrides, `var(...)` aufgelöst) via `scripts/build-tokens.mjs`.
- Gebündeltes `dist/conciso-ds.css` (korrekte Ladereihenfolge) via
  `scripts/bundle-css.mjs`. `npm run build` erzeugt beides.
- Release-Workflow `.github/workflows/release.yml` (publiziert bei Tag `vX.Y.Z`).

### Geplant
- Repo-Hygiene: Trennung Doku-Site/Kern, Demo-Bilder via Git LFS, History-Bereinigung.

---

Frühere Arbeit (vor formaler Versionierung) ist in der Git-Historie
dokumentiert: Aufbau der Foundations (Tokens, Typografie 16/14/12, Spacing,
Elevation), Komponentenbibliothek, vollständiger Light/Dark-Mode mit
WCAG-AA-Kontrasten, Beispielseiten und die navigierbare Doku-Site.
Die erste getaggte Version markiert den Start der paketierten Distribution.
