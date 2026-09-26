# @conciso/design-system-mcp

MCP-Server für das Conciso Design System. Er gibt deinem KI-Assistenten (Claude Code,
GitHub Copilot in VS Code, Cursor und andere) die echte, dokumentierte API der
[Angular-Lib](https://www.npmjs.com/package/@conciso/design-system-angular) an die Hand,
passend zu der Version, die in deinem Projekt installiert ist.

## Wozu?

KI-Assistenten kennen das Conciso Design System nicht. Fragst du nach einem Button mit Icon,
erfinden sie gern Inputs wie `icon` oder `iconPosition`, Elemente wie `<cds-icon>` oder
vergessen, dass die CSS-Schicht global eingebunden sein muss. Der Code sieht plausibel aus
und funktioniert nicht.

Mit diesem Server schlägt der Assistent nach, bevor er Code schreibt: welche Komponenten es
gibt, welche Inputs und Outputs sie haben, wie die Beispiele im Storybook aussehen. Gibt es
etwas nicht, sagt er das, statt es zu erfinden.

In unserem eigenen Test mit sechs typischen Fragen hat die KI ohne Server bei drei Fragen
Inputs oder Elemente erfunden, mit Server bei keiner.

## Was er kann

| Werkzeug | Liefert |
|---|---|
| `docs-list` | alle Komponenten der Angular-Lib und alle Doku-Seiten des Storybooks mit ihren IDs |
| `docs-show` | zu einer Komponente die Inputs und Outputs mit Typen, Standardwerten und Beschreibung, dazu Code-Beispiele aus den Stories; zu einer Doku-Seite ihren vollständigen Text |
| `docs-show-story` | den Code einer einzelnen Story-Variante |

Beim Verbinden gibt der Server dem Assistenten außerdem feste Regeln mit:

1. CSS-Schicht und Fonts global einbinden, sonst bleiben die Komponenten ungestylt.
2. Kein eigenes CSS für Design-System-Komponenten, keine erfundenen CSS-Klassen.
3. Nur Inputs und Outputs verwenden, die `docs-show` liefert. Vorher nachsehen, nie raten.
4. Bei Fragen zur Einrichtung die Storybook-Seite „Einrichtung“ lesen.

Weitere Eigenschaften:

- **Offline.** Die Daten liegen als Snapshot des Storybook-Builds im Paket. Der Server
  öffnet keinen Port und greift auf kein Netzwerk zu.
- **Versionsgenau.** Der Snapshot gehört zu genau einer Version des Design Systems. Beim
  Start vergleicht der Server seine Version mit der installierten Angular-Lib und weist den
  Assistenten bei Abweichung darauf hin. Er bricht dabei nie ab.

## Beispiel

> Schreib mir einen Conciso-Button in der Variante „outlined“, Bereich „ki“, groß,
> deaktiviert, mit Icon links.

Der Assistent ruft `docs-list` und `docs-show` für den Button auf, findet dort die Inputs
`area`, `disabled`, `full`, `label`, `size`, `type` und `variant` und antwortet:

```html
<cds-button label="Vorschau" variant="outlined" area="ki" size="lg" [disabled]="true" />
```

Dazu der Hinweis, dass der Button keinen Input für ein Icon hat, statt eines erfundenen.

## Voraussetzungen

- Node.js 20 oder neuer
- ein KI-Assistent, der MCP-Server über stdio einbinden kann

## Installation

Empfohlen als Entwicklungsabhängigkeit, in derselben Version wie die Angular-Lib:

```bash
npm i -D @conciso/design-system-mcp
```

Hält dein Projekt das Design System nicht als Paket, sondern als kopierte Dateien, startest
du den Server ohne Installation über `npx` mit fester Version (siehe unten, „Versionen“).

## Einbinden

Die Konfiguration als Datei im Projekt committen, dann hat das ganze Team den Server.

**Claude Code**, `.mcp.json` im Projektordner:

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

Oder per Befehl: `claude mcp add --scope project conciso-ds -- npx cds-mcp`

**VS Code / GitHub Copilot**, `.vscode/mcp.json`:

```json
{
  "servers": {
    "conciso-ds": {
      "type": "stdio",
      "command": "npx",
      "args": ["cds-mcp"]
    }
  }
}
```

**Cursor**, `.cursor/mcp.json`:

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

**Ohne installiertes Paket** ersetzt du in allen drei Varianten `"args": ["cds-mcp"]` durch
`"args": ["-y", "@conciso/design-system-mcp@<Version>"]`.

## Versionen

Angular-Lib, CSS-Schicht und MCP-Server tragen immer dieselbe Versionsnummer. Aktualisierst
du die Lib, aktualisiere den Server mit, dann passt die Doku zum Code.

Nutzt du den Server ohne installiertes Paket, ist `<Version>` die Version der CSS-Schicht,
die dein Projekt verwendet. Den MCP-Server gibt es erst ab einer späteren Version als die
CSS-Schicht; welche Versionen existieren, zeigt `npm view @conciso/design-system-mcp versions`.
Ist dein Stand älter, nimm die älteste verfügbare Version und aktualisiere die Kopie bei
Gelegenheit. Die automatische Versionsprüfung greift in diesem Fall nicht, der Server nennt
dann nur, für welche Version sein Snapshot gilt.

## Grenzen

- Die Werkzeuge beschreiben die **Angular-Lib**. Projekte ohne Angular (etwa Astro oder
  statisches HTML) finden auf der Seite „Einrichtung“ und in den Komponenten-Beschreibungen
  die CSS-Klassen, eigene HTML-Beispiele liefert der Server noch nicht.
- Design-Tokens und Icons lassen sich noch nicht direkt abfragen.
- Der Server sieht nur, was im Storybook dokumentiert ist. Was dort fehlt, gilt für ihn als
  nicht vorhanden.

## Mehr

- Storybook des Design Systems mit allen Komponenten:
  <https://conciso.github.io/conciso-design-system/>
- Einrichtung Schritt für Schritt, mit und ohne Angular:
  [Storybook-Seite „Einrichtung“](https://conciso.github.io/conciso-design-system/?path=/docs/grundlagen-einrichtung--%C3%BCbersicht)

## Lizenz

MIT
