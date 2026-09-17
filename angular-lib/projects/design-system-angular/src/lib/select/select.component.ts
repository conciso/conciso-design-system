import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, uiCheck } from '../icons/cds-icons';
import type { CdsArea } from '../area';
import { disposableTimeout } from '../shared/disposable-timeout';

export interface CdsSelectOption {
  value: string;
  label: string;
}

let uid = 0;

/**
 * Custom Select (cds-select) — gestylte Einzelauswahl über `.ep-select` aus
 * css/components.css → Doku „Dropdowns“.
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroChevronDown, uiCheck })],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ],
  host: {
    '(focusout)': 'onFocusOut($event)',
    '(document:pointerdown)': 'onDocPointerDown($event)',
  },
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
            <ng-icon class="ep-select-check" name="uiCheck" size="20px" aria-hidden="true" />
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
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly menu = viewChild<ElementRef<HTMLUListElement>>('menu');

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

  /** @internal */
  protected readonly open = signal(false);
  /** @internal */
  protected readonly activeIndex = signal(-1);

  private onChange: (value: string) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  private onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  /** @internal */
  writeValue(value: string | null): void {
    this.value.set(value ?? undefined);
  }
  /** @internal */
  registerOnChange(fn: (value: string) => void): void {
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

  private readonly instance = ++uid;
  /** @internal */
  protected readonly ids = {
    label: `cds-select-${this.instance}-label`,
    value: `cds-select-${this.instance}-value`,
    menu: `cds-select-${this.instance}-menu`,
    option: (i: number) => `cds-select-${this.instance}-opt-${i}`,
  };

  private typeBuffer = '';
  // Timer über DestroyRef aufgeräumt (WP5 §5.5) — dieselbe `disposableTimeout()`
  // deckt sowohl Fire-and-forget (Fokus/Scroll) als auch Debounce (Type-ahead) ab.
  private readonly menuFocusTimer = disposableTimeout();
  private readonly scrollTimer = disposableTimeout();
  private readonly typeaheadTimer = disposableTimeout();

  /** @internal */
  selectedOption(): CdsSelectOption | undefined {
    return this.options().find((o) => o.value === this.value());
  }

  /** @internal */
  protected toggle(): void {
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
    this.menuFocusTimer.schedule(() => this.menu()?.nativeElement.focus());
  }

  /** @internal */
  close(focusTrigger = true): void {
    this.open.set(false);
    this.activeIndex.set(-1);
    if (focusTrigger) this.trigger()?.nativeElement.focus();
  }

  /** @internal */
  select(i: number): void {
    const opt = this.options()[i];
    if (!opt) return;
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.onTouched();
    this.close();
  }

  /** @internal */
  protected markTouched(): void {
    this.onTouched();
  }

  /**
   * `onTouched` erst, wenn der Fokus die GESAMTE Komponente verlässt — nicht schon beim
   * Öffnen, wenn er vom Trigger in die Listbox wandert (beides liegt im Host). Sonst
   * wäre das Control „touched“, bevor überhaupt ausgewählt wurde.
   *
   * @internal
   */
  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.markTouched();
  }

  /**
   * Tastatur am Trigger-Button: nur Öffnen (im offenen Zustand hat die Listbox Fokus).
   *
   * @internal
   */
  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.open()) return;
    const key = event.key;
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
      event.preventDefault();
      this.openMenu();
    }
  }

  /**
   * Tastatur in der offenen Listbox: Navigation, Auswahl, Schließen, Type-ahead.
   *
   * @internal
   */
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
    this.scrollTimer.schedule(() => {
      this.host.nativeElement.querySelector(`#${CSS.escape(this.ids.option(i))}`)?.scrollIntoView({ block: 'nearest' });
    });
  }

  private typeahead(char: string): void {
    this.typeBuffer += char.toLowerCase();
    this.typeaheadTimer.schedule(() => (this.typeBuffer = ''), 500);
    const match = this.options().findIndex((o) => o.label.toLowerCase().startsWith(this.typeBuffer));
    if (match >= 0) this.setActive(match);
  }

  /** @internal */
  onDocPointerDown(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close(false);
  }
}
