import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroXMark } from '../icons/cds-icons';
import type { CdsArea } from '../area';
import type { CdsSelectOption } from '../select/select.component';
import { disposableTimeout } from '../shared/disposable-timeout';

let uid = 0;

/**
 * Combobox (cds-combobox) — Tipp-Filter über `.ep-combobox` aus css/components.css
 * → Doku „Dropdowns“. Wie der Custom Select, aber mit Substring-Filter im Feld (für
 * lange Listen). Optional Multi-Select mit Chips (`multi`).
 *
 * Verhalten/a11y selbst getragen: Input mit role=combobox (dort ist
 * aria-activedescendant erlaubt), aria-expanded/-controls/-autocomplete; Listbox mit
 * role=listbox/option; ↓ öffnet/navigiert, Enter wählt, Esc schließt, Rücktaste bei
 * leerem Feld entfernt im Multi-Modus den letzten Chip. Beim Schließen ohne Auswahl
 * fällt die Einzelauswahl auf das gewählte Label zurück (kein loser Filtertext).
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); der Formularwert ist im Multi-Modus `string[]`, sonst `string`.
 * Ohne Formular gehen `[(value)]` / `[(values)]` (valueChange/valuesChange via model()).
 */
@Component({
  selector: 'cds-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroChevronDown, heroXMark })],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ComboboxComponent), multi: true },
  ],
  host: {
    '(document:pointerdown)': 'onDocPointerDown($event)',
  },
  template: `
    <div
      class="ep-combobox"
      [class.is-multi]="multi()"
      [class.is-open]="open()"
      [class.is-disabled]="disabled()"
      [attr.data-area]="area() || null"
    >
      <span class="ep-select-label" [id]="ids.label">{{ label() }}</span>
      <!-- Klick auf die Feldfläche fokussiert das Input (cursor:text); das Input selbst
           ist direkt tastaturfokussierbar — daher a11y-Regeln hier gezielt aus. -->
      <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
      <div
        class="ep-combobox-control"
        [class.has-clear]="query().length > 0"
        (click)="focusInput()"
      >
        @if (multi()) {
          @for (opt of selectedOptions(); track opt.value) {
            <span class="ep-combobox-token">
              <span class="ep-combobox-token-label">{{ opt.label }}</span>
              <button
                type="button"
                class="ep-combobox-token-remove"
                [attr.aria-label]="'Entfernen: ' + opt.label"
                (click)="removeValue(opt.value, $event)"
              >
                <ng-icon name="heroXMark" size="14px" aria-hidden="true" />
              </button>
            </span>
          }
        }
        <input
          #input
          class="ep-combobox-input"
          type="text"
          role="combobox"
          autocomplete="off"
          [attr.aria-labelledby]="ids.label"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="ids.menu"
          aria-autocomplete="list"
          [attr.aria-activedescendant]="
            open() && activeIndex() >= 0 ? ids.option(activeIndex()) : null
          "
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="query()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          (focus)="openMenu()"
          (blur)="markTouched()"
        />
        @if (query().length > 0) {
          <button
            type="button"
            class="ep-combobox-clear"
            aria-label="Eingabe löschen"
            (click)="clear($event)"
          >
            <ng-icon name="heroXMark" size="16px" aria-hidden="true" />
          </button>
        }
        <ng-icon class="ep-select-caret" name="heroChevronDown" size="24px" aria-hidden="true" />
      </div>
      <ul
        class="ep-combobox-menu"
        role="listbox"
        [id]="ids.menu"
        [attr.aria-labelledby]="ids.label"
      >
        @for (opt of filtered(); track opt.value; let i = $index) {
          <!-- Listbox-Muster: Optionen bewusst nicht einzeln fokussierbar; Tastatur
               läuft über das Input (aria-activedescendant). -->
          <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
          <li
            class="ep-select-option"
            role="option"
            [id]="ids.option(i)"
            [attr.data-value]="opt.value"
            [class.is-active]="i === activeIndex()"
            [attr.aria-selected]="isSelected(opt.value)"
            (click)="select(opt)"
            (mouseenter)="activeIndex.set(i)"
          >
            {{ opt.label }}
          </li>
        }
        @if (!filtered().length) {
          <li class="ep-combobox-empty" role="option" aria-disabled="true" aria-selected="false">
            {{ emptyText() }}
          </li>
        }
      </ul>
    </div>
  `,
})
export class ComboboxComponent implements ControlValueAccessor {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  readonly label = input('Thema');
  readonly options = input<CdsSelectOption[]>([]);
  /** Einzelauswahl: gewählter Wert. Two-Way (`[(value)]`) UND Angular-Forms. */
  readonly value = model<string | undefined>(undefined);
  /** Mehrfachauswahl: gewählte Werte (nur bei multi). Two-Way UND Angular-Forms. */
  readonly values = model<string[]>([]);
  readonly multi = input(false);
  readonly area = input<CdsArea>();
  readonly placeholder = input('Suchen…');
  readonly emptyText = input('Kein Treffer');
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);

  /** @internal */
  protected readonly open = signal(false);
  /** @internal */
  protected readonly activeIndex = signal(0);

  /**
   * Aktuell gewählte Werte — reiner Ableitungszustand aus `[(value)]`/`[(values)]`,
   * je nach Modus (WP5 §5.3: vorher ein per `effect()` nachgeführtes Signal; die
   * `effect()`-Zustandsableitung ist das Anti-Muster, das die Angular-Doku
   * ausdrücklich nennt). Alle Schreibpfade (`select()`, `removeValue()`,
   * `writeValue()`) schreiben seitdem direkt in `value`/`values` — die Quelle,
   * nicht mehr in dieses abgeleitete Signal.
   *
   * @internal
   */
  protected readonly selected = computed<string[]>(() =>
    this.multi() ? this.values() : this.value() ? [this.value() as string] : [],
  );

  /** Label der aktuellen Einzelauswahl (leer bei Multi/keiner Auswahl). */
  private readonly selectedLabel = computed(
    () => this.options().find((o) => o.value === this.value())?.label ?? '',
  );

  /**
   * Sichtbarer Filtertext im Feld. Vorgabe: leer im Multi-Modus, sonst das Label
   * der aktuellen Auswahl — lokal überschreibbar (Tippen via `onInput`,
   * `select()`/`clear()`/`close()` setzen ihn ebenfalls direkt). Aktualisiert sich
   * NICHT von der Vorgabe her, während das Menü offen ist (Nutzer tippt gerade);
   * erst das nächste Schließen übernimmt die neue Vorgabe. Ersetzt den Teil des
   * bisherigen `effect()`, der `query` außerhalb des offenen Menüs nachführte
   * (WP5 §5.3).
   *
   * @internal
   */
  protected readonly query = linkedSignal<{ open: boolean; multi: boolean; label: string }, string>(
    {
      source: () => ({ open: this.open(), multi: this.multi(), label: this.selectedLabel() }),
      computation: (src, previous) => {
        // Offenes Menü: laufende Eingabe nicht überschreiben (entspricht dem alten
        // `if (!this.open())`-Gate). Geschlossen: Multi zeigt nie ein Label (leeren),
        // Einzelauswahl übernimmt das Label der aktuellen Auswahl.
        if (src.open) return previous?.value ?? '';
        return src.multi ? '' : src.label;
      },
    },
  );

  private onChange: (value: string | string[]) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  private onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  private readonly instance = ++uid;
  /** @internal */
  protected readonly ids = {
    label: `cds-combobox-${this.instance}-label`,
    menu: `cds-combobox-${this.instance}-menu`,
    option: (i: number) => `cds-combobox-${this.instance}-opt-${i}`,
  };

  /**
   * ControlValueAccessor — Formularwert ist string[] (multi) bzw. string (single).
   *
   * @internal
   */
  writeValue(value: string | string[] | null): void {
    if (this.multi()) {
      const arr = Array.isArray(value) ? [...value] : [];
      this.values.set(arr);
    } else {
      const v = typeof value === 'string' ? value : undefined;
      this.value.set(v);
      this.query.set(v ? (this.options().find((o) => o.value === v)?.label ?? '') : '');
    }
  }
  /** @internal */
  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }
  /** @internal */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** @internal */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /**
   * Aktuell gewählte Optionen (für die Chips im Multi-Modus).
   *
   * @internal
   */
  protected selectedOptions(): CdsSelectOption[] {
    return this.selected()
      .map((v) => this.options().find((o) => o.value === v))
      .filter((o): o is CdsSelectOption => !!o);
  }

  /**
   * Gefilterte Optionen: Substring (case-insensitiv); im Multi-Modus ohne bereits Gewählte.
   *
   * @internal
   */
  protected filtered(): CdsSelectOption[] {
    const q = this.query().trim().toLowerCase();
    const chosen = this.selected();
    return this.options().filter((o) => {
      if (this.multi() && chosen.includes(o.value)) return false;
      return !q || o.label.toLowerCase().includes(q);
    });
  }

  /** @internal */
  protected isSelected(value: string): boolean {
    return this.selected().includes(value);
  }

  /** @internal */
  protected focusInput(): void {
    if (!this.disabled()) this.input()?.nativeElement.focus();
  }

  /** @internal */
  protected openMenu(): void {
    if (this.disabled() || this.open()) return;
    this.open.set(true);
    this.activeIndex.set(0);
  }

  /** @internal */
  protected close(): void {
    this.open.set(false);
    if (this.multi()) {
      // Multi-Modus: keinen losen Filtertext stehen lassen, der zu keiner Auswahl
      // gehört (Auswahl läuft über die Chips, nicht über das Feld).
      this.query.set('');
    } else {
      // Einzelauswahl: keinen losen Filtertext stehen lassen.
      const label = this.options().find((o) => o.value === this.value())?.label ?? '';
      this.query.set(label);
    }
  }

  /** @internal */
  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.open.set(true);
    this.activeIndex.set(0);
  }

  /** @internal */
  protected select(opt: CdsSelectOption): void {
    if (this.multi()) {
      const next = [...this.selected(), opt.value];
      this.values.set(next);
      this.onChange(next);
      this.onTouched();
      this.query.set('');
      this.activeIndex.set(0);
      this.focusInput(); // offen lassen, weiter hinzufügen
    } else {
      this.value.set(opt.value);
      this.onChange(opt.value);
      this.onTouched();
      this.query.set(opt.label);
      this.open.set(false);
    }
  }

  /** @internal */
  protected removeValue(value: string, event?: Event): void {
    event?.stopPropagation();
    const next = this.selected().filter((v) => v !== value);
    this.values.set(next);
    this.onChange(next);
    this.onTouched();
  }

  /** @internal */
  protected clear(event?: Event): void {
    event?.stopPropagation();
    this.query.set('');
    this.activeIndex.set(0);
    this.focusInput();
  }

  /** @internal */
  protected markTouched(): void {
    this.onTouched();
  }

  /** @internal */
  protected onKeydown(event: KeyboardEvent): void {
    const opts = this.filtered();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.open()) this.openMenu();
        else this.activeIndex.set(Math.min(opts.length - 1, this.activeIndex() + 1));
        this.scrollActive();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.open()) this.openMenu();
        else this.activeIndex.set(Math.max(0, this.activeIndex() - 1));
        this.scrollActive();
        break;
      case 'Home':
        // Nur bei offenem Menü abfangen (erste gefilterte Option) — bei
        // geschlossenem Feld bleibt die native Cursor-Bewegung im Text erhalten.
        if (!this.open()) return;
        event.preventDefault();
        this.activeIndex.set(0);
        this.scrollActive();
        break;
      case 'End':
        // Analog zu Home: nur bei offenem Menü (letzte gefilterte Option).
        if (!this.open()) return;
        event.preventDefault();
        this.activeIndex.set(opts.length - 1);
        this.scrollActive();
        break;
      case 'Enter': {
        const opt = opts[this.activeIndex()];
        if (this.open() && opt) {
          event.preventDefault();
          this.select(opt);
        }
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Backspace':
        if (this.multi() && this.query().length === 0 && this.selected().length) {
          this.removeValue(this.selected()[this.selected().length - 1]);
        }
        break;
    }
  }

  // Timer über DestroyRef aufgeräumt (WP5 §5.5).
  private readonly scrollTimer = disposableTimeout();

  private scrollActive(): void {
    this.scrollTimer.schedule(() => {
      this.host.nativeElement
        .querySelector(`#${CSS.escape(this.ids.option(this.activeIndex()))}`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  /** @internal */
  protected onDocPointerDown(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }
}
