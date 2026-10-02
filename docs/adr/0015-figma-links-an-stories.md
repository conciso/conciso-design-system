# ADR-0015: Figma-Links an den Stories

- Status: akzeptiert
- Datum: 2026-10-02
- Ersetzt: in [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md) den Punkt „`@storybook/addon-designs` bewusst nicht übernommen“.

## Kontext

ADR-0006 hat `@storybook/addon-designs` ausgeschlossen, weil das Repo keinen Figma-Bezug hatte. Inzwischen gibt es die Bibliothek „Conciso Design System“ in Figma (fileKey `BQCBQwIDcconnYNpb2w9fn`), deren Komponenten den Stories entsprechen. Wer eine Story ansieht, soll den passenden Figma-Frame daneben sehen.

## Entscheidung

- `@storybook/addon-designs` (exakt gepinnt) ist registriert. Jede Story-Datei mit Figma-Gegenstück setzt `parameters.design` auf Ebene der Meta, mit der Node-ID des ComponentSets bzw. der Komponente. Overrides je Story nur, wo es einen eigenen Figma-Knoten gibt.
- **Keine Figma-Skripte und kein Gate im Repo.** Kein Snapshot der Figma-Datei, keine Prüfung der Node-IDs in CI. Die Bridge zu Figma Desktop hat nur eine Person im Team; ein Gate, das nur sie aktualisieren kann, würde alle anderen blockieren.

## Folgen

- Links setzt man per „Copy link“ in Figma; die Node-ID steht in der URL.
- Baut jemand die Figma-Datei so um, dass Node-IDs wegfallen, zeigt das Panel „Design“ nichts mehr an. Das fällt nur beim Ansehen auf. Gegenmittel: in Figma Komponenten umbenennen und verschieben statt neu anlegen, dann bleiben die IDs stabil.
- Das Panel rendert den Figma-Embed nur für Personen mit Zugriff auf die Datei, sofern die Datei nicht per Link öffentlich lesbar ist.
