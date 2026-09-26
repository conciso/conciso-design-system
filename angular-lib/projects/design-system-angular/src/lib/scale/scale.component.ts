import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CdsArea } from '../area';
import { CvaBase } from '../shared/cva-base.directive';

// Modulweiter Zähler → eindeutige Default-id (label/for, output/for, aria).
let uid = 0;

/**
 * Skala (cds-scale) — Slider für GEORDNETE (ordinale) Kategorien, deren Labels die
 * Werte SIND (z. B. Niedrig < Mittel < Hoch, nie < selten < oft < immer).
 *
 * Basiert auf dem nativen <input type="range">; min=0, max=labels.length-1, step=1
 * werden intern abgeleitet und NICHT exponiert. Der aktuelle Wert erscheint als
 * LABEL im <output> und wird Screenreadern über `aria-valuetext` als Text gemeldet
 * (nicht als Zahl) — das anerkannte APG-Muster für ordinale Slider. Die Skalenpunkte
 * zeigen alle Labels, exakt auf ihre Position ausgerichtet und bewusst OHNE
 * Reduktion (jedes Label ist eine wählbare Stufe).
 *
 * NUR für geordnete Kategorien. Ungeordnete/gleichrangige Optionen (ohne natürliche
 * Reihenfolge) gehören NICHT auf einen Slider → cds-radio-group oder cds-area-tabs.
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); der Formularwert ist der Stufen-INDEX. Ohne Formular geht
 * `[(value)]` (valueChange via model()).
 */
@Component({
  selector: 'cds-scale',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ScaleComponent), multi: true },
  ],
  template: `
    <div class="field-slider">
      <div class="field-slider-header">
        <label class="field-slider-label" [attr.for]="scaleId()">{{ label() }}</label>
        <output [class]="outputClasses()" [attr.for]="scaleId()" [id]="scaleId() + '-out'">{{
          currentLabel()
        }}</output>
      </div>
      <input
        [class]="sliderClasses()"
        type="range"
        [id]="scaleId()"
        min="0"
        [max]="max()"
        step="1"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-valuetext]="currentLabel()"
        [attr.aria-describedby]="helper() ? scaleId() + '-hint' : null"
        (input)="onInput($event)"
        (blur)="markTouched()"
      />
      @if (labels().length) {
        <!-- Alle Skalen-Labels als CSS-Grid-Spalten (Breiten: tickColumns()), bei
             ausreichend Platz exakt auf ihre Thumb-Position ausgerichtet (Thumb 22px,
             siehe css/components.css); bei schmalen Breiten gibt das Grid lieber den
             Umbruch frei, statt Labels zu überlagern oder abzuschneiden (siehe dort).
             KEINE Reduktion — jedes Label ist wählbar, PFLICHT-Inhalt (kein Dropping
             wie bei cds-slider). Statt Absolut-Positionierung Normalfluss: mehrzeilige
             Labels (lange Kategorien bei schmaler Breite) wachsen den Container in der
             Höhe und schieben nachfolgenden Inhalt nach unten, statt ihn zu
             überlagern. Self-contained positioniert (der --tick-p-Kernmechanismus liegt
             noch auf dem main-PR; nach Merge kann das vereinfacht werden). -->
        <div
          class="field-slider-ticks"
          aria-hidden="true"
          style="position:relative;display:grid;padding:0;height:auto;align-items:start"
          [style.grid-template-columns]="tickColumns()"
        >
          @for (t of tickItems(); track $index) {
            <span [style]="t.style">{{ t.label }}</span>
          }
        </div>
      }
      @if (helper()) {
        <span class="helper" [id]="scaleId() + '-hint'">{{ helper() }}</span>
      }
    </div>
  `,
})
export class ScaleComponent extends CvaBase<number> {
  /** Feld-Label (die Frage), z. B. „Zufriedenheit“. */
  readonly label = input('Bewertung');
  /** Geordnete Skalen-Labels; sie sind zugleich die Werte. */
  readonly labels = input<string[]>(['Niedrig', 'Mittel', 'Hoch']);
  /** Gewählte Stufe als Index (0-basiert). Two-Way (`[(value)]`) UND Angular-Forms. */
  readonly value = model(1);
  /** Markenbereich → Thumb-/Output-Farbe. */
  readonly area = input<CdsArea>('co');
  readonly helper = input('');
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);
  readonly scaleId = input(`cds-scale-${++uid}`);

  constructor() {
    super();
    // Index in [0, max] halten: schrumpft labels() unter den aktuellen Index, bliebe
    // sonst ein veralteter Index stehen → leeres <output>/aria-valuetext. BEWUSST als
    // effect() belassen (WP5 §5.3 geprüft, nicht auf computed()/linkedSignal
    // umgestellt): `value` ist ein öffentliches, zweiseitig gebundenes model() — ein
    // Konsument kann es per `[(value)]` DIREKT setzen, am CVA-Pfad (writeValue/
    // normalizeValue) vorbei. computed()/linkedSignal erzeugen nur ein EIGENES,
    // abgeleitetes Signal; sie können nicht in ein FREMDES, bereits bestehendes
    // Writable-Signal zurückschreiben. Die Korrektur MUSS daher das model() selbst
    // mutieren, damit die Zwei-Wege-Bindung beim Konsumenten den korrigierten Wert
    // sieht (nicht nur die Anzeige) — das leistet nur effect().
    effect(() => {
      const max = this.max();
      const v = this.value();
      if (v > max) this.value.set(max);
      else if (v < 0) this.value.set(0);
    });
  }

  /** @internal */
  protected override normalizeValue(value: number): number {
    // Auf gültigen Stufen-Index [0, max] klemmen (max = labels().length - 1).
    const n = typeof value === 'number' && !Number.isNaN(value) ? Math.round(value) : 0;
    return Math.min(this.max(), Math.max(0, n));
  }
  /** @internal */
  protected override applyValue(value: number): void {
    this.value.set(value);
  }
  /** @internal */
  protected override applyDisabled(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /**
   * Oberer Index (aus der Label-Zahl abgeleitet, nicht exponiert).
   *
   * @internal
   */
  protected readonly max = computed(() => Math.max(0, this.labels().length - 1));
  /** @internal */
  protected readonly currentLabel = computed(() => this.labels()[this.value()] ?? '');
  /** @internal */
  protected readonly sliderClasses = computed(() => `slider slider-${this.area()}`);
  /** @internal */
  protected readonly outputClasses = computed(() => `field-slider-output slider-${this.area()}`);

  /**
   * Spaltenbreiten für das Tick-Grid, mit `minmax()` statt fixer Breiten: Bei
   * ausreichend Platz treffen die Spaltenmitten exakt die Thumb-Positionen (wie
   * bisher); wird es zu schmal, um alle Labels einzeilig zu zeigen, gibt das Grid
   * Lesbarkeit den Vorrang vor exakter Ausrichtung (Entscheidung: Umbruch statt
   * Überlappung ODER Abschneiden).
   *
   * - Rand-Spalten: `minmax(halber Schritt + 11px, max-content)`. Der Mindestwert ist
   *   wie zuvor die halbe „Schritt“-Distanz `(100% − 22px) / (n − 1)` zwischen zwei
   *   benachbarten Thumb-Positionen plus 11px (halbe Thumb-Breite, siehe
   *   css/components.css) — das kantenbündige Rand-Label beansprucht nur EINE
   *   Richtung, die Gegenseite (vor der ersten/nach der letzten Thumb-Position) fließt
   *   seiner Spalte zu. Bei breiten Containern übersteigt dieser Mindestwert die
   *   natürliche (einzeilige) Breite des Labels — dann klemmt `minmax()` laut Spezifikation
   *   auf den Mindestwert, die Spalte verhält sich also identisch zu vorher. Erst wenn
   *   der Container schmaler wird als diese Mindestbreite, wächst die Spalte auf bis
   *   zu `max-content`, das Label bleibt einzeilig, solange noch Platz da ist.
   * - Mitte-Spalten: `minmax(min-content, 1fr)` — nie schmäler als das breiteste
   *   unteilbare Wort, sonst gleichberechtigt (1fr) um den verbleibenden Platz. Bei
   *   schmalen Breiten kann die Spalte dadurch von ihrem rechnerischen Schritt
   *   abweichen; die Spaltenmitte (und damit das zentrierte Label) liegt dann
   *   geringfügig neben der Thumb-Position — akzeptierter Trade-off.
   *
   * Bei nur einem Label eine volle Spalte.
   *
   * @internal
   */
  protected readonly tickColumns = computed<string>(() => {
    const n = this.labels().length;
    if (n <= 1) return '1fr';
    const gaps = n - 1;
    const edge = `minmax(calc(11px + (100% - 22px) / ${gaps} / 2), max-content)`;
    if (n === 2) return `${edge} ${edge}`;
    const mid = `repeat(${n - 2}, minmax(min-content, 1fr))`;
    return `${edge} ${mid} ${edge}`;
  });

  /**
   * Alle Labels + Ausrichtung innerhalb ihrer Grid-Spalte (`tickColumns()`). Mitte-
   * Labels sind in ihrer Spalte zentriert — bei ausreichend Platz liegt die
   * Spaltenmitte exakt auf der Thumb-Position; bei sehr schmalen Breiten, wenn
   * `minmax(min-content, 1fr)` eine Spalte über ihren rechnerischen Schritt hinaus
   * wachsen lässt, kann die Mitte geringfügig davon abweichen (siehe
   * `tickColumns()`). Das ERSTE/LETZTE Label wird an der jeweiligen Kante verankert
   * (linksbündig bzw. rechtsbündig, 11px Innenabstand = halbe Thumb-Breite), damit
   * lange Kategorie-Labels an den Enden nicht über den Rand hinaus abgeschnitten
   * werden.
   *
   * Zusätzlich 4px `padding-inline` an der jeweils INNEREN Seite (Mitte-Labels:
   * beidseitig — bei zentriertem Text bleibt die Mitte dadurch unverschoben):
   * Mindestabstand zwischen benachbarten Labels. Ohne das können bei mittleren
   * Breiten (Spalte klemmt schon auf `minmax()`-Mindestwert, aber Label füllt sie
   * fast aus) die Text-Ink-Boxes zweier Nachbarn exakt aneinanderstoßen (0px Lücke,
   * liest sich als ein zusammengeschriebenes Wort), obwohl sie sich nicht
   * überlappen. `box-sizing:border-box` (s. u.) sorgt dafür, dass `min-content` in
   * `tickColumns()` das Padding mit einrechnet, statt die Spalte zusätzlich zu
   * stauchen.
   *
   * `hyphens:auto` trennt einzelne Wörter, die trotz der `max-content`/
   * `min-content`-Untergrenze in `tickColumns()` noch breiter als ihre Spalte sind —
   * wirkt nur, wenn die einbettende Seite `lang="de"` setzt (Storybooks Vitest-Iframe
   * tut das nicht; bei Konsumenten ist es nicht garantiert, daher rein additiv).
   * Bewusst OHNE `overflow-wrap:break-word`: das bricht mitten im Wort ohne
   * Trennzeichen (z. B. „zufriede“/„n“) und ist schlechter lesbar als ein Wort, das
   * im Ausnahmefall über seine Spalte hinausragt — Lesbarkeit vor exakter
   * Breiteneinhaltung. Ohne `white-space:nowrap` umbrechen Labels normal (zeilenweise),
   * statt sich zu überlagern.
   *
   * @internal
   */
  protected readonly tickItems = computed<{ label: string; style: Record<string, string> }[]>(
    () => {
      const labels = this.labels();
      const n = labels.length;
      // position/transform/white-space aus .field-slider-ticks>* (components.css)
      // explizit neutralisieren — sonst bleiben die Labels absolut positioniert und
      // ignorieren die Grid-Spalten, auf denen dieser Ansatz aufbaut.
      const base: Record<string, string> = {
        position: 'static',
        transform: 'none',
        'white-space': 'normal',
        'box-sizing': 'border-box',
        hyphens: 'auto',
      };
      return labels.map((label, i) => {
        if (n <= 1)
          return { label, style: { ...base, 'text-align': 'left', 'padding-left': '11px' } };
        if (i === 0)
          // Innere Seite (rechts, Richtung nächstes Label) zusätzlich 4px — Mindestlücke,
          // s. Kommentar oben.
          return {
            label,
            style: {
              ...base,
              'text-align': 'left',
              'padding-left': '11px',
              'padding-right': '4px',
            },
          };
        if (i === n - 1)
          return {
            label,
            style: {
              ...base,
              'text-align': 'right',
              'padding-left': '4px',
              'padding-right': '11px',
            },
          };
        return { label, style: { ...base, 'text-align': 'center', 'padding-inline': '4px' } };
      });
    },
  );

  /** @internal */
  protected onInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.value.set(value);
    this.onChange(value);
  }
  /** @internal */
  protected markTouched(): void {
    this.onTouched();
  }
}
