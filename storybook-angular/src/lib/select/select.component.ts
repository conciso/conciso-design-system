import {
  Component,
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
import { heroCheck, heroChevronDown } from '@ng-icons/heroicons/outline';
import type { CdsArea } from '../area';

export interface CdsSelectOption {
  value: string;
  label: string;
}

let uid = 0;

/**
 * Custom Select (cds-select) — gestylte Einzelauswahl über `.ep-select` aus
 * css/components.css → Doku „Dropdowns".
 *
 * Trigger-Button + Listbox-Popup mit Häkchen und Bereichs-Akzent (data-area).
 * Anders als die dünnen Wrapper trägt diese Komponente das Verhalten selbst — das
 * ist ihr Zweck (das native <select> reicht dafür nicht): volle Tastatur (↑↓,
 * Pos1/Ende, Type-ahead, Enter wählt, Esc schließt) und die dokumentierte a11y
 * (role=listbox/option, aria-haspopup, aria-expanded, aria-activedescendant,
 * aria-selected). Für kurze Listen in Formularen bleibt das native cds-select-field
 * der Standard; dies hier ist für bereichs-akzentuierte Auswahl.
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); ohne Formular geht `[(value)]` (valueChange via model()).
 */
@Component({
  selector: 'cds-select',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroChevronDown, heroCheck })],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ],
  template: `
    <div class="ep-select" [class.is-open]="open()" [class.is-disabled]="disabled()" [attr.data-area]="area() || null">
      <span class="ep-select-label" [id]="ids.label">{{ label() }}</span>
      <button
        #trigger
        type="button"
        class="ep-select-trigger"
        [class.is-placeholder]="!selectedOption()"
        [disabled]="disabled()"
        aria-haspopup="listbox"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="ids.menu"
        [attr.aria-labelledby]="ids.label + ' ' + ids.value"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
        (blur)="markTouched()"
      >
        <span class="ep-select-value" [id]="ids.value" [attr.data-placeholder]="placeholder()">{{
          selectedOption()?.label ?? placeholder()
        }}</span>
        <ng-icon class="ep-select-caret" name="heroChevronDown" size="24px" aria-hidden="true" />
      </button>
      <ul
        #menu
        class="ep-select-menu"
        role="listbox"
        [id]="ids.menu"
        [attr.aria-labelledby]="ids.label"
        tabindex="-1"
        [attr.aria-activedescendant]="open() && activeIndex() >= 0 ? ids.option(activeIndex()) : null"
        (keydown)="onMenuKeydown($event)"
      >
        @for (opt of options(); track opt.value; let i = $index) {
          <!-- Listbox-Muster: Optionen sind bewusst NICHT einzeln fokussierbar; die
               Tastatur läuft über den Trigger (aria-activedescendant). Klick ist reine
               Maus-Bequemlichkeit — daher die a11y-Regeln hier gezielt deaktiviert. -->
          <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
          <li
            class="ep-select-option"
            role="option"
            [id]="ids.option(i)"
            [attr.data-value]="opt.value"
            [class.is-active]="i === activeIndex()"
            [attr.aria-selected]="opt.value === value()"
            (click)="select(i)"
            (mouseenter)="activeIndex.set(i)"
          >
            <ng-icon class="ep-select-check" name="heroCheck" size="20px" aria-hidden="true" />
            {{ opt.label }}
          </li>
        }
      </ul>
      @if (name()) {
        <input type="hidden" [name]="name()" [value]="value() ?? ''" />
      }
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  @ViewChild('trigger') private trigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('menu') private menu?: ElementRef<HTMLUListElement>;

  readonly label = input('Bereich');
  readonly options = input<CdsSelectOption[]>([]);
  /** Aktuell gewählter Wert (value der Option). Two-Way (`[(value)]`) UND Angular-Forms. */
  readonly value = model<string | undefined>(undefined);
  readonly area = input<CdsArea>();
  readonly placeholder = input('Bitte wählen…');
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);
  /** Optionaler Feldname → verstecktes Input für den Formular-Submit. */
  readonly name = input<string>();

  readonly open = signal(false);
  readonly activeIndex = signal(-1);

  private onChange: (value: string) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  private onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  writeValue(value: string | null): void {
    this.value.set(value ?? undefined);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private readonly instance = ++uid;
  readonly ids = {
    label: `cds-select-${this.instance}-label`,
    value: `cds-select-${this.instance}-value`,
    menu: `cds-select-${this.instance}-menu`,
    option: (i: number) => `cds-select-${this.instance}-opt-${i}`,
  };

  private typeBuffer = '';
  private typeTimer?: ReturnType<typeof setTimeout>;

  selectedOption(): CdsSelectOption | undefined {
    return this.options().find((o) => o.value === this.value());
  }

  toggle(): void {
    if (this.open()) this.close();
    else this.openMenu();
  }

  private openMenu(): void {
    if (this.disabled()) return;
    const sel = this.options().findIndex((o) => o.value === this.value());
    this.activeIndex.set(sel >= 0 ? sel : 0);
    this.open.set(true);
    // Fokus in die Listbox (nach Render, wenn sie sichtbar ist) — APG-Listbox-
    // Muster: aria-activedescendant liegt dort, nicht auf dem Button.
    setTimeout(() => this.menu?.nativeElement.focus());
  }

  close(focusTrigger = true): void {
    this.open.set(false);
    this.activeIndex.set(-1);
    if (focusTrigger) this.trigger?.nativeElement.focus();
  }

  select(i: number): void {
    const opt = this.options()[i];
    if (!opt) return;
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.onTouched();
    this.close();
  }

  markTouched(): void {
    this.onTouched();
  }

  /** Tastatur am Trigger-Button: nur Öffnen (im offenen Zustand hat die Listbox Fokus). */
  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.open()) return;
    const key = event.key;
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
      event.preventDefault();
      this.openMenu();
    }
  }

  /** Tastatur in der offenen Listbox: Navigation, Auswahl, Schließen, Type-ahead. */
  onMenuKeydown(event: KeyboardEvent): void {
    const key = event.key;
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.move(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.move(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.setActive(0);
        break;
      case 'End':
        event.preventDefault();
        this.setActive(this.options().length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.activeIndex() >= 0) this.select(this.activeIndex());
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close(false);
        break;
      default:
        if (key.length === 1 && /\S/.test(key)) this.typeahead(key);
    }
  }

  private move(delta: number): void {
    const n = this.options().length;
    if (!n) return;
    const next = Math.min(n - 1, Math.max(0, this.activeIndex() + delta));
    this.setActive(next);
  }

  private setActive(i: number): void {
    this.activeIndex.set(i);
    // Aktiven Eintrag in Sicht scrollen (lange Listen).
    setTimeout(() => {
      this.host.nativeElement.querySelector(`#${CSS.escape(this.ids.option(i))}`)?.scrollIntoView({ block: 'nearest' });
    });
  }

  private typeahead(char: string): void {
    this.typeBuffer += char.toLowerCase();
    clearTimeout(this.typeTimer);
    this.typeTimer = setTimeout(() => (this.typeBuffer = ''), 500);
    const match = this.options().findIndex((o) => o.label.toLowerCase().startsWith(this.typeBuffer));
    if (match >= 0) this.setActive(match);
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocPointerDown(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close(false);
  }
}
