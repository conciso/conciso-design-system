import {
  Component,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroXMark } from '../icons/cds-icons';
import type { CdsArea } from '../area';
import type { CdsSelectOption } from '../select/select.component';

let uid = 0;

/**
 * Combobox (cds-combobox) — Tipp-Filter über `.ep-combobox` aus css/components.css
 * → Doku „Dropdowns". Wie der Custom Select, aber mit Substring-Filter im Feld (für
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
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroChevronDown, heroXMark })],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ComboboxComponent), multi: true },
  ],
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
      <div class="ep-combobox-control" [class.has-clear]="query().length > 0" (click)="focusInput()">
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
          [attr.aria-activedescendant]="open() && activeIndex() >= 0 ? ids.option(activeIndex()) : null"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="query()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          (focus)="openMenu()"
          (blur)="markTouched()"
        />
        @if (query().length > 0) {
          <button type="button" class="ep-combobox-clear" aria-label="Eingabe löschen" (click)="clear($event)">
            <ng-icon name="heroXMark" size="16px" aria-hidden="true" />
          </button>
        }
        <ng-icon class="ep-select-caret" name="heroChevronDown" size="24px" aria-hidden="true" />
      </div>
      <ul class="ep-combobox-menu" role="listbox" [id]="ids.menu" [attr.aria-labelledby]="ids.label">
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
          <li class="ep-combobox-empty" role="option" aria-disabled="true" aria-selected="false">{{ emptyText() }}</li>
        }
      </ul>
    </div>
  `,
})
export class ComboboxComponent implements ControlValueAccessor {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;

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

  readonly open = signal(false);
  readonly activeIndex = signal(0);
  readonly query = signal('');
  private readonly selected = signal<string[]>([]);

  private onChange: (value: string | string[]) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  private onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  private readonly instance = ++uid;
  readonly ids = {
    label: `cds-combobox-${this.instance}-label`,
    menu: `cds-combobox-${this.instance}-menu`,
    option: (i: number) => `cds-combobox-${this.instance}-opt-${i}`,
  };

  constructor() {
    // Inbound-Sync: interne Auswahl aus den [(value)]/[(values)]-Inputs ableiten –
    // reaktiv, damit auch spätere programmatische Änderungen durchschlagen (nicht nur
    // der Forms-Pfad via writeValue). Läuft initial und bei jeder Input-Änderung.
    // Der Filtertext (query) wird nur außerhalb des offenen Menüs gesetzt, um die
    // laufende Eingabe nicht zu überschreiben.
    effect(() => {
      if (this.multi()) {
        this.selected.set([...this.values()]);
      } else {
        const v = this.value();
        this.selected.set(v ? [v] : []);
        if (!this.open()) {
          this.query.set(v ? (this.options().find((o) => o.value === v)?.label ?? '') : '');
        }
      }
    });
  }

  // ControlValueAccessor — Formularwert ist string[] (multi) bzw. string (single).
  writeValue(value: string | string[] | null): void {
    if (this.multi()) {
      const arr = Array.isArray(value) ? [...value] : [];
      this.values.set(arr);
      this.selected.set(arr);
    } else {
      const v = typeof value === 'string' ? value : undefined;
      this.value.set(v);
      this.selected.set(v ? [v] : []);
      this.query.set(v ? (this.options().find((o) => o.value === v)?.label ?? '') : '');
    }
  }
  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /** Aktuell gewählte Optionen (für die Chips im Multi-Modus). */
  selectedOptions(): CdsSelectOption[] {
    return this.selected()
      .map((v) => this.options().find((o) => o.value === v))
      .filter((o): o is CdsSelectOption => !!o);
  }

  /** Gefilterte Optionen: Substring (case-insensitiv); im Multi-Modus ohne bereits Gewählte. */
  filtered(): CdsSelectOption[] {
    const q = this.query().trim().toLowerCase();
    const chosen = this.selected();
    return this.options().filter((o) => {
      if (this.multi() && chosen.includes(o.value)) return false;
      return !q || o.label.toLowerCase().includes(q);
    });
  }

  isSelected(value: string): boolean {
    return this.selected().includes(value);
  }

  focusInput(): void {
    if (!this.disabled()) this.input?.nativeElement.focus();
  }

  openMenu(): void {
    if (this.disabled() || this.open()) return;
    this.open.set(true);
    this.activeIndex.set(0);
  }

  close(): void {
    this.open.set(false);
    // Einzelauswahl: keinen losen Filtertext stehen lassen.
    if (!this.multi()) {
      const label = this.options().find((o) => o.value === this.value())?.label ?? '';
      this.query.set(label);
    }
  }

  onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.open.set(true);
    this.activeIndex.set(0);
  }

  select(opt: CdsSelectOption): void {
    if (this.multi()) {
      this.selected.update((vs) => [...vs, opt.value]);
      this.values.set(this.selected());
      this.onChange(this.selected());
      this.onTouched();
      this.query.set('');
      this.activeIndex.set(0);
      this.focusInput(); // offen lassen, weiter hinzufügen
    } else {
      this.value.set(opt.value);
      this.selected.set([opt.value]);
      this.onChange(opt.value);
      this.onTouched();
      this.query.set(opt.label);
      this.open.set(false);
    }
  }

  removeValue(value: string, event?: Event): void {
    event?.stopPropagation();
    this.selected.update((vs) => vs.filter((v) => v !== value));
    this.values.set(this.selected());
    this.onChange(this.selected());
    this.onTouched();
  }

  clear(event?: Event): void {
    event?.stopPropagation();
    this.query.set('');
    this.activeIndex.set(0);
    this.focusInput();
  }

  markTouched(): void {
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent): void {
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
        this.activeIndex.set(Math.max(0, this.activeIndex() - 1));
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

  private scrollActive(): void {
    setTimeout(() => {
      this.host.nativeElement
        .querySelector(`#${CSS.escape(this.ids.option(this.activeIndex()))}`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocPointerDown(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }
}
