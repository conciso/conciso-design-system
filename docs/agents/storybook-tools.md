# Storybook-Werkzeuge für Agenten

Seit Storybook 10.6 bringt die CLI Werkzeuge mit, die Agenten direkt nutzen können — ohne
MCP-Server, ohne laufenden Dev-Server. Aufruf aus `storybook-angular/`.

## Warum das wichtig ist

Die Props einer Komponente stehen seit [ADR-0006](../adr/0006-storybook-10-6-docgen-server-mcp-und-theming.md)
im Docgen-Manifest, gespeist aus dem JSDoc der Angular-Lib. Diese Werkzeuge lesen genau daraus.
Wer eine Komponenten-API wissen will, fragt sie ab — statt Quelltext oder Typdefinitionen zu lesen
und dabei Eigenschaften zu erfinden, die es nicht gibt.

## Die Befehle

```bash
npx storybook tools --help          # alle Werkzeuge mit Argumenten
npx storybook skills                # die drei mitgelieferten Arbeitsanleitungen
npx storybook skills stories        # der vorgegebene Ablauf für UI-Änderungen
```

| Werkzeug | Zweck | Server nötig? |
|---|---|---|
| `docs list` | alle Komponenten- und Doku-Kennungen | nein |
| `docs show --id <id>` | Props und Verwendungsbeispiele einer Komponente | nein |
| `docs show-story` | Doku zu einer einzelnen Story | nein |
| `stories changed` | welche Stories eine Änderung im Arbeitsbaum betrifft | nein |
| `stories find-by-component` | Stories zu einer Komponentendatei | nein |
| `test run` | Story-Tests ausführen | nein |
| `stories preview` | Vorschau-URLs | ja |
| `review create` | Review-Ansicht für visuelle Änderungen | ja |

`--json` liefert strukturierte Daten statt Markdown, `-o <pfad>` schreibt in eine Datei.

## Nützlich im Alltag dieses Repos

- **Nach einer Änderung an Komponenten, Stories, CSS oder Tokens:** `stories changed` sagt, was
  betroffen ist. Es meldet auch Dateien, die keine Story erreicht — etwa Theme- oder
  Preview-Konfiguration.
- **Vor dem Schreiben einer Story:** `npx storybook skills write-story` beschreibt die Konventionen
  dieses Projekts.
- **Statt Props im Quelltext nachzuschlagen:** `docs list`, dann `docs show`. Fehlt dort eine
  Eigenschaft, ist sie nicht dokumentiert — und laut [ADR-0007](../adr/0007-api-konventionen-der-angular-komponenten.md)
  bedeutet das entweder, sie ist interne Implementierung, oder ihr JSDoc fehlt.

## Verhältnis zum MCP-Endpunkt

Derselbe Werkzeugkasten steht bei laufendem `npm run storybook` unter `http://localhost:6006/mcp`
bereit (siehe `storybook-angular/README.md`). Die CLI ist der kürzere Weg, wenn kein Server läuft;
MCP lohnt sich, wenn ein Agent dauerhaft angebunden ist.
