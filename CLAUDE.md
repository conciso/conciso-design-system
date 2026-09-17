## Contributing standards

Everything that goes into the repo follows `CONTRIBUTING.md` — in particular § 6 Typography: German copy uses typographic quotation marks („…“, U+201E / U+201C), never straight ASCII quotes. `npm run check:quotes` gates this in CI.

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature-slug>/`, which is gitignored and never committed. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical triage labels (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Storybook-Werkzeuge

Die Storybook-CLI stellt Agenten-Werkzeuge bereit (Komponenten-Doku, betroffene Stories, Tests) —
größtenteils ohne laufenden Server. Siehe `docs/agents/storybook-tools.md`.

### Domain docs

Single-context layout — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
