# @conciso/design-system-mcp

MCP-Server für Consumer des Conciso Design System. Er beantwortet `docs-list`, `docs-show`
und `docs-show-story` über stdio — mit den echten, dokumentierten Inputs und Outputs der
[Angular-Lib](https://www.npmjs.com/package/@conciso/design-system-angular), nicht erfundenen.
Die Daten stammen aus einem mitgelieferten Snapshot des Storybook-Builds derselben Version;
der Server greift dafür nie auf ein Netzwerk zu. Beim Start vergleicht er seine Version mit der
installierten Angular-Lib und warnt bei Abweichung, bricht aber nie ab.

## Installation

```bash
npm i -D @conciso/design-system-mcp
```

## Einbinden in Claude Code

Als `.mcp.json` im Projekt committen:

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

Die vollständige Einrichtung — inklusive weiterer KI-Assistenten — steht auf der
Storybook-Seite [„Einrichtung“](https://conciso.github.io/conciso-design-system/?path=/docs/grundlagen-einrichtung--%C3%BCbersicht).
