# design-sync NOTES

## CSS-first system — Off-Script Foundations-Import
Dieses Repo ist **kein React-Design-System**: 0 React/JS-Komponenten, kein Storybook,
`dist/` = nur `conciso-ds.css`. Der `/design-sync`-Konverter ist React-only
("a non-React DS has nothing for the agent to build with"; "Tokens-only DS:
emits styles.css only with empty-bodied _ds_bundle.js").

Daher: **Foundations-Import von Hand** (kein `package-build.mjs`):
- `_ds_bundle.css` = `dist/conciso-ds.css`, Font-`url('../fonts/` -> `url('fonts/` (Bundle-Root).
- `styles.css` @importiert `_ds_bundle.css` (gesamte Closure: Fonts+Tokens+Base+Components).
- `_ds_bundle.js` = leeres Bundle mit `@ds-bundle`-Header (keine Komponenten).
- `tokens/` aus `tokens/tokens.*`, `fonts/` aus `fonts/`.
- README enthaelt den Conventions-Header (CSS-Klassen-Vokabular + Dark-Mode).
- Kein `_ds_sync.json` (Off-Script ohne Konverter-Recipe) -> Re-Sync re-verifiziert; bei Tokens-only trivial.

## Re-sync risks
- Komponenten-Karten gibt es bewusst nicht (CSS-Klassen, keine React-Exporte).
  Echte Komponenten-Previews erst moeglich, wenn React-Wrapper existieren -> dann normaler Konverter-Pfad.
- Wenn `dist/conciso-ds.css` neu gebaut wird (`npm run build`), Font-Pfad-Rewrite erneut anwenden.
- Conventions-Header gegen die gebauten Artefakte validieren (Klassen/Tokens muessen existieren).
