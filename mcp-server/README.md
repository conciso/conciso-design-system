# @conciso/design-system-mcp

MCP-Server für Consumer des Conciso Design System. Er beantwortet `docs-list`, `docs-show`
und `docs-show-story` über stdio — mit den echten, dokumentierten Inputs und Outputs der
[Angular-Lib](https://www.npmjs.com/package/@conciso/design-system-angular), nicht erfundenen.
Die Daten stammen aus einem mitgelieferten Snapshot des Storybook-Builds derselben Version;
der Server greift dafür nie auf ein Netzwerk zu. Beim Start vergleicht er seine Version mit der
installierten Angular-Lib und warnt bei Abweichung, bricht aber nie ab.

## Installation

Zwei Wege: mit installiertem Paket, oder per `npx` ganz ohne Installation (etwa wenn dein
Projekt die CSS-Schicht nur kopiert statt installiert hat — dann mit fester Version statt
`latest`, passend zum kopierten Stand):

```bash
npm i -D @conciso/design-system-mcp
```

```bash
npx -y @conciso/design-system-mcp@2.1.0
```

## Einbinden in Claude Code

Mit installiertem Paket, als `.mcp.json` im Projekt committen:

```json
{
  "mcpServers": {
    "conciso-ds": {
      "command": "npx",
      "args": ["cds-mcp"]
    }
  }
}
```

Ohne installiertes Paket dieselbe Datei, nur mit fester Version statt `cds-mcp`:

```json
{
  "mcpServers": {
    "conciso-ds": {
      "command": "npx",
      "args": ["-y", "@conciso/design-system-mcp@2.1.0"]
    }
  }
}
```

Die vollständige Einrichtung — inklusive weiterer KI-Assistenten (VS Code, Cursor) und dem
Weg ohne Angular — steht auf der Storybook-Seite
[„Einrichtung“](https://conciso.github.io/conciso-design-system/?path=/docs/grundlagen-einrichtung--%C3%BCbersicht).
