import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * HeroImage (cds-hero-image) — Wrapper um `.hero-image` aus css/components.css
 * (css/components.css:851–878) mit optionaler Caption als Gradient-Overlay
 * (`-caption`, `-caption-eyebrow`, `-caption-title`, `-caption-text`). Vollbreites,
 * randloses `<figure>` im 21:9-Format, der Standard-Hero auf allen Customer-Pages
 * (17 Vorkommen in den Beispielseiten). Semantisch ein figure/figcaption-Pattern:
 * `alt` trägt die faktische Bildbeschreibung, die Caption die redaktionelle
 * Einordnung (Eyebrow, Titel, Text) — beide sollen sich nach `docs/index.html`
 * (Abschnitt „In-Article Figure“, dasselbe Prinzip) nicht inhaltlich decken.
 *
 * **Entscheidung 1 — kein `<figcaption>` ohne Textinhalt.** Bleiben `eyebrow`,
 * `heading` und `text` alle leer, entfällt das `<figcaption>`-Element vollständig
 * statt leer zu rendern (Variante „Hero ohne Caption“, siehe
 * `storybook-angular/src/docs/seitenmuster/wissensbeitrag.mdx` Abschnitt „Aufbau“,
 * Zeile 3: Beitrags-Heros zeigen das visuelle Versprechen ohne Marketing-Overlay).
 * Ein leeres `<figcaption>` wäre totes Markup ohne Zugänglichkeitsnutzen.
 *
 * **Entscheidung 2 — `headingLevel` statt fest verdrahtetem `<h1>`.** Das Mockup
 * (`docs/index.html:9412` u. a.) rendert `.hero-image-caption-title` durchgehend als
 * `<h1>`, weil der Hero dort das erste Überschriften-Element der Seite ist. Sitzt
 * der Hero dagegen unter einem eigenen `<h1>` — der Wissensbeitrag hat seinen
 * Titel bereits im Article-Header (`.article-title`, ebenfalls `<h1>`) —, entstünde
 * mit einem zweiten `<h1>` eine doppelte Top-Überschrift. `headingLevel` (Default
 * `1`) macht die Ebene explizit, `.hero-image-caption-title` ist reine CSS-Klasse
 * und trägt keine Heading-Semantik, das Styling bleibt in beiden Fällen identisch.
 *
 * **Entscheidung 3 — `objectPosition` als Style-Binding, die eine Ausnahme von
 * Spec-Randbedingung 6.** Der Bildausschnitt ist eine Eigenschaft des konkreten
 * Bildes (Motiv, Kopfposition), nicht der Seite — anders als z. B. eine
 * Sektionsfläche, die vom Seitenkontext abhängt. `docs/index.html` setzt ihn
 * deshalb an jedem Hero individuell direkt am `<img>` (z. B. `object-position:center
 * 70%`, Zeile 2640). Ohne diesen Input wäre die Komponente für Porträt-lastige
 * Motive unbrauchbar: `object-fit:cover` beschneidet das Bild sobald der
 * `max-height`-Cap greift (siehe `.hero-image-media`), und ohne Steuerung landet
 * der Ausschnitt zufällig in der Bildmitte. Als Style-Binding am `<img>`, nicht als
 * Klasse — es gibt in der CSS-Schicht keine Modifier-Klassen dafür, nur den
 * Inline-Weg, den das Mockup selbst nutzt.
 *
 * **Entscheidung 4 — `tabindex`/`id` sind nicht Teil der Komponente.** Das Mockup
 * setzt beides am `<figure>` (`id="ep-landing-main" tabindex="-1"`, z. B. Zeile
 * 9406) als Sprungziel des Skip-Links. Das Sprungziel ist eine Entscheidung der
 * Seite (welches Element „Hauptinhalt“ ist, hängt vom Seitenaufbau ab, nicht vom
 * Hero selbst), deshalb setzt der Konsument beides am `<cds-hero-image>`-Host.
 * Damit dieses Sprungziel eine eigene Box hat, ist der Host per
 * `:host{display:block}` selbst ein Block (Muster wie `cds-footer-main`): Als
 * unbekanntes Element wäre er `display:inline` mit herausgebrochenem Block-Kind
 * und hätte keine brauchbare Box für Fokus und Scroll-Position (ADR-0008, Fall 2).
 */
@Component({
  selector: 'cds-hero-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host{display:block}'],
  template: `
    <figure class="hero-image">
      <div class="hero-image-media">
        <img
          [src]="src()"
          [alt]="alt()"
          [attr.loading]="eager() ? 'eager' : 'lazy'"
          [style.object-position]="objectPosition() || null"
        />
      </div>
      @if (hasCaption()) {
        <figcaption class="hero-image-caption">
          @if (eyebrow()) {
            <p class="hero-image-caption-eyebrow">{{ eyebrow() }}</p>
          }
          @if (heading()) {
            @if (headingLevel() === 2) {
              <h2 class="hero-image-caption-title">{{ heading() }}</h2>
            } @else {
              <h1 class="hero-image-caption-title">{{ heading() }}</h1>
            }
          }
          @if (text()) {
            <p class="hero-image-caption-text">{{ text() }}</p>
          }
        </figcaption>
      }
    </figure>
  `,
})
export class HeroImageComponent {
  /** Bildquelle. */
  readonly src = input.required<string>();
  /** Alternativtext — Pflicht, das Bild trägt Bedeutung (kein dekoratives Hero-Bild). */
  readonly alt = input.required<string>();
  /** Eyebrow-Zeile über dem Titel (`.hero-image-caption-eyebrow`, leer = keine Zeile). */
  readonly eyebrow = input('');
  /** Titel der Caption (`.hero-image-caption-title`, leer = kein Titel). */
  readonly heading = input('');
  /** Text unter dem Titel (`.hero-image-caption-text`, leer = kein Text). */
  readonly text = input('');
  /**
   * Heading-Ebene des gerenderten Titels: `1`, wenn der Hero die erste Überschrift
   * der Seite trägt (Standard auf Customer-Pages), `2`, wenn er unter einem
   * eigenen `<h1>` sitzt (Beitrags-Hero unter dem Article-Header, siehe
   * Entscheidung 2 in der Klassendoku).
   */
  readonly headingLevel = input<1 | 2>(1);
  /**
   * `loading`-Strategie des Bildes: `true` (Standard) rendert `loading="eager"`,
   * weil der Hero auf Customer-Pages immer above the fold sitzt. `false` für einen
   * zweiten, weiter unten liegenden Hero (z. B. innerhalb einer Bildstrecke).
   */
  readonly eager = input(true);
  /**
   * `object-position` direkt am `<img>` (z. B. `'center 70%'`), siehe Entscheidung 3
   * in der Klassendoku. Leer = Browser-Default `center center`.
   */
  readonly objectPosition = input('');

  /**
   * Ob die Caption gerendert wird: nur, wenn mindestens einer der drei Textteile
   * gesetzt ist (siehe Entscheidung 1 in der Klassendoku).
   *
   * @internal
   */
  protected readonly hasCaption = computed(() => !!(this.eyebrow() || this.heading() || this.text()));
}
