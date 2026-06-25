# Conciso Design System: so baust du damit

**Dies ist ein CSS-Klassen- und Token-System, keine JavaScript-Komponentenbibliothek.** Es gibt keine importierbaren React-Komponenten (`window.ConcisoDS` ist leer, und es gibt keine `components/`). Gestaltet wird, indem du semantisches HTML/JSX schreibst und darauf die **CSS-Klassen** und **Tokens** dieses Systems anwendest. Ignoriere im Folgenden alle README-Hinweise auf `window.ConcisoDS.*` oder Komponenten-Importe.

## Setup
- **Eine Stylesheet-Zeile genügt:** `styles.css` einbinden. Sie zieht Fonts und alle Komponenten-/Token-Styles (`_ds_bundle.css`) nach. Kein Provider, kein JS nötig.
- **Dark Mode:** `data-theme="dark"` am `<html>` setzen. Alle Tokens flippen automatisch. Default (ohne Attribut) ist Light.
- **Schriften** sind self-hosted dabei (Montserrat, Libre Baskerville), keine externe Anfrage.

## Styling-Idiom: Klassen + Tokens (keine Props)
Style ausschließlich über diese Klassen und über `var(--token)`. Erfinde keine eigenen Klassennamen, keine fremden Utility-Frameworks (kein Tailwind o. Ä.).

**Brand Areas** (Bereichsfarben, als Suffix `-co | -ki | -es | -wo`): `co` Corporate (Petrol), `ki` Angewandte KI (Lime), `es` Effektive Software (Blau), `wo` Wirksame Organisationen (Grün). Die Nav/Chrome bleibt immer `co`.

**Buttons:** `.btn` plus eine Variante plus eine Area.
- Varianten: `.btn-filled` (Hauptaktion), `.btn-tonal`, `.btn-elevated`, `.btn-outlined`, `.btn-text` (Nebenaktion).
- Area: `.btn-co` / `.btn-ki` / `.btn-es` / `.btn-wo`. Größen: `.btn-sm` / `.btn-lg`. `.btn-full` (volle Breite). `.btn-on-band` für Buttons auf dunklem Farbband.

**Akzent-Textfarbe:** `.t-co` / `.t-ki` / `.t-es` / `.t-wo` (für Eyebrows, Labels, kleine Akzente). Fließtext bleibt neutral (`var(--tx-primary)` / `var(--tx-secondary)`), nie in Bereichsfarbe.

**Weitere Klassen:** `.badge` (+ `.badge-ok` / `.badge-warn` / `.badge-err` / `.badge-neu`), `.pill`, `.chip`, `.card`, `.ep-card` (statische Karte, flach), `.ep-card-link` (interaktive Karte, mit Schatten + Hover), `.field` (Formularfeld-Wrapper).

**Tokens (immer `var(--…)`, nie rohe Hex/px):**
- Farben: `--co-* --ki-* --es-* --wo-* --n-*` (Skala `-50 … -900`); semantisch `--c-success` / `--c-warning` / `--c-error`.
- Flächen/Text: `--bg-page`, `--bg-surface`; `--tx-primary`, `--tx-secondary`.
- Typografie (Font-Shorthands): `--ty-body-md` (16px Standard), `--ty-body-sm` (14px), `--ty-title-sm` (20px), `--ty-display-md` u. a. Skala ist 16/14/12, Minimum 12px.
- Maß: Spacing `--s1 … --s16` (4–64px), Radius `--r-xs … --r-full`, Elevation `--e0 … --e5`, Border `--bd`.

## Regeln (kurz)
- Farbiger Text auf Weiß: Bereichsfarbe `-700` (bei `ki`: `-800`); nie `-500` als Textfarbe. Alles WCAG AA.
- Elevation = Interaktivität: statische Flächen flach (`--bd`), nur interaktive bekommen Schatten.
- Sprache (Marke „Ruhig"): deutsche Anführungszeichen „… ", keine Gedankenstriche in Copy.

## Wo die Wahrheit liegt
- `styles.css` und das daraus importierte `_ds_bundle.css` enthalten alle Klassen und Token-Definitionen (`--*`). Lies sie, bevor du stylst.
- `tokens/tokens.json` listet alle Token-Werte (Light + Dark) maschinenlesbar.

## Idiomatisches Beispiel
```html
<section style="background:var(--bg-surface);padding:var(--s8)">
  <div class="t-wo" style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em">Wirksame Organisationen</div>
  <h2 style="font:var(--ty-title-sm);color:var(--tx-primary);margin:var(--s2) 0 var(--s4)">Veränderung begleiten</h2>
  <p style="font:var(--ty-body-md);color:var(--tx-secondary);margin:0 0 var(--s6)">Ein zweitägiges Training für Führungskräfte.</p>
  <button class="btn btn-filled btn-wo">Platz anfragen</button>
  <button class="btn btn-text btn-wo">Mehr erfahren</button>
</section>
```
