# Brand-Assets

Die Conciso-Wortmarke in drei Varianten. Verbindlich für Größen, Schutzraum und
Verwendung ist die Doku-Sektion **Marke → Logo** (`docs/index.html`, `#sec-logo`);
dieses Dokument beschreibt nur die Dateien und den Einbau.

| Datei | Einsatz |
|---|---|
| `logo-conciso.svg` | Default. Wortmarke in `--tx-brand`, Punkt in `--co-500`. Helle Hintergründe |
| `logo-conciso-light.svg` | Vollständig weiß. Dunkle Hintergründe, Footer, Dark Mode |
| `logo-conciso-dark.svg` | Monochrom in `--tx-brand`, ohne Punkt. Druck, Stempel, einfarbig |

## Einbau

Immer als SVG per `<img>`, nie als PNG oder JPG. Der Wechsel zwischen Light und
Dark läuft über die portablen Klassen `.logo-themed-default` und
`.logo-themed-light` aus `css/components.css`, rein per CSS und ohne JavaScript:

```html
<span class="ep-logo">
  <img class="logo-themed-default" src="assets/brand/logo-conciso.svg" alt="Conciso">
  <img class="logo-themed-light" src="assets/brand/logo-conciso-light.svg" alt="" aria-hidden="true">
</span>
```

Die Höhe ist das Leitmaß, die Breite ergibt sich proportional. `.ep-logo img`
setzt bereits `height:24px;width:auto`.

Als Paket-Abhängigkeit liegen die Dateien unter
`@conciso/design-system/assets/brand/logo-conciso.svg`.

## Warum hier `width` und `height` am SVG stehen bleiben

`CONTRIBUTING.md` § 10 schreibt für `icons/source/` vor, `width` und `height`
weglassen. Das gilt dort, weil Icons inline eingebettet werden und die Attribute
die Größensteuerung per CSS behindern.

Logos werden per `<img>` eingebunden. Dort liefern genau diese Attribute dem
Browser das intrinsische Seitenverhältnis (2400 zu 314, also etwa 7,6 zu 1) und
verhindern Layout-Shift beim Laden. Die Attribute sind hier also Absicht und
keine Nachlässigkeit, bitte nicht gegen die Icon-Regel „aufräumen“.
