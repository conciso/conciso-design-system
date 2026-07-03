import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
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
 */
@Component({
  selector: 'cds-combobox',
  standalone: true,
  template: `
    <div
      class="ep-combobox"
      [class.is-multi]="multi"
      [class.is-open]="open()"
      [class.is-disabled]="disabled"
      [attr.data-area]="area || null"
    >
      <span class="ep-select-label" [id]="ids.label">{{ label }}</span>
      <!-- Klick auf die Feldfläche fokussiert das Input (cursor:text); das Input selbst
           ist direkt tastaturfokussierbar — daher a11y-Regeln hier gezielt aus. -->
      <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
      <div class="ep-combobox-control" [class.has-clear]="query().length > 0" (click)="focusInput()">
        @if (multi) {
          @for (opt of selectedOptions(); track opt.value) {
            <span class="ep-combobox-token">
              <span class="ep-combobox-token-label">{{ opt.label }}</span>
              <button
                type="button"
                class="ep-combobox-token-remove"
                [attr.aria-label]="'Entfernen: ' + opt.label"
                (click)="removeValue(opt.value, $event)"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14">
                  <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
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
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="query()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          (focus)="openMenu()"
        />
        @if (query().length > 0) {
          <button type="button" class="ep-combobox-clear" aria-label="Eingabe löschen" (click)="clear($event)">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="16" height="16">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        }
        <svg class="ep-select-caret" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
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
          <li class="ep-combobox-empty" role="option" aria-disabled="true" aria-selected="false">{{ emptyText }}</li>
        }
      </ul>
    </div>
  `,
})
export class ComboboxComponent implements OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;

  @Input() label = 'Thema';
  @Input() options: CdsSelectOption[] = [];
  /** Einzelauswahl: gewählter Wert. */
  @Input() value?: string;
  /** Mehrfachauswahl: gewählte Werte (nur bei multi). */
  @Input() values: string[] = [];
  @Input() multi = false;
  @Input() area?: CdsArea;
  @Input() placeholder = 'Suchen…';
  @Input() emptyText = 'Kein Treffer';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() valuesChange = new EventEmitter<string[]>();

  readonly open = signal(false);
  readonly activeIndex = signal(0);
  readonly query = signal('');
  private readonly selected = signal<string[]>([]);

  private readonly instance = ++uid;
  readonly ids = {
    label: `cds-combobox-${this.instance}-label`,
    menu: `cds-combobox-${this.instance}-menu`,
    option: (i: number) => `cds-combobox-${this.instance}-opt-${i}`,
  };

  ngOnInit(): void {
    this.selected.set(this.multi ? [...this.values] : this.value ? [this.value] : []);
    // Einzelauswahl: Feld zeigt anfangs das gewählte Label.
    if (!this.multi && this.value) {
      this.query.set(this.options.find((o) => o.value === this.value)?.label ?? '');
    }
  }

  /** Aktuell gewählte Optionen (für die Chips im Multi-Modus). */
  selectedOptions(): CdsSelectOption[] {
    return this.selected()
      .map((v) => this.options.find((o) => o.value === v))
      .filter((o): o is CdsSelectOption => !!o);
  }

  /** Gefilterte Optionen: Substring (case-insensitiv); im Multi-Modus ohne bereits Gewählte. */
  filtered(): CdsSelectOption[] {
    const q = this.query().trim().toLowerCase();
    const chosen = this.selected();
    return this.options.filter((o) => {
      if (this.multi && chosen.includes(o.value)) return false;
      return !q || o.label.toLowerCase().includes(q);
    });
  }

  isSelected(value: string): boolean {
    return this.selected().includes(value);
  }

  focusInput(): void {
    if (!this.disabled) this.input?.nativeElement.focus();
  }

  openMenu(): void {
    if (this.disabled || this.open()) return;
    this.open.set(true);
    this.activeIndex.set(0);
  }

  close(): void {
    this.open.set(false);
    // Einzelauswahl: keinen losen Filtertext stehen lassen.
    if (!this.multi) {
      const label = this.options.find((o) => o.value === this.value)?.label ?? '';
      this.query.set(label);
    }
  }

  onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.open.set(true);
    this.activeIndex.set(0);
  }

  select(opt: CdsSelectOption): void {
    if (this.multi) {
      this.selected.update((vs) => [...vs, opt.value]);
      this.values = this.selected();
      this.valuesChange.emit(this.selected());
      this.query.set('');
      this.activeIndex.set(0);
      this.focusInput(); // offen lassen, weiter hinzufügen
    } else {
      this.value = opt.value;
      this.selected.set([opt.value]);
      this.valueChange.emit(opt.value);
      this.query.set(opt.label);
      this.open.set(false);
    }
  }

  removeValue(value: string, event?: Event): void {
    event?.stopPropagation();
    this.selected.update((vs) => vs.filter((v) => v !== value));
    this.values = this.selected();
    this.valuesChange.emit(this.selected());
  }

  clear(event?: Event): void {
    event?.stopPropagation();
    this.query.set('');
    this.activeIndex.set(0);
    this.focusInput();
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
        if (this.multi && this.query().length === 0 && this.selected().length) {
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
