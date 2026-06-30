import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Chip — Wrapper um `.chip` aus css/components.css → „Badges & Chips".
 *
 * Zwei Modi:
 *  - `toggle` (Default): interaktiver Filter-Chip auf Basis von `aria-pressed`
 *    (.chip[aria-pressed], optional area-aware via [data-area]).
 *  - `tag`: statischer, nicht-interaktiver Bereichs-Tag wie in docs/index.html
 *    (`<span class="chip t-co">` mit area-50-Grund, kompaktes Padding). Die
 *    Text-Utility `.t-<area>` färbt den Text in der Bereichsfarbe (Dark-Override
 *    in dark-mode.css auf -200/-100).
 */
@Component({
  selector: 'cds-chip',
  standalone: true,
  template: `
    @if (variant === 'tag') {
      <span [class]="tagClasses" [attr.style]="tagStyle">{{ label }}</span>
    } @else {
      <button
        class="chip"
        type="button"
        [attr.data-area]="area || null"
        [attr.aria-pressed]="pressed"
        (click)="toggle()"
      >
        {{ label }}
      </button>
    }
  `,
})
export class ChipComponent {
  @Input() label = 'Filter';
  /** `toggle` = interaktiver Filter (Default), `tag` = statischer Bereichs-Tag. */
  @Input() variant: 'toggle' | 'tag' = 'toggle';
  /** Markenbereich → data-area (toggle) bzw. .t-<area> + area-50-Grund (tag). */
  @Input() area?: CdsArea;
  /** Nur `toggle`: gedrückt/aktiv → aria-pressed="true". */
  @Input() pressed = false;

  toggle(): void {
    this.pressed = !this.pressed;
  }

  private get tagArea(): CdsArea {
    return this.area ?? 'co';
  }

  get tagClasses(): string {
    return `chip t-${this.tagArea}`;
  }

  /** Statischer Tag: area-50-Grund + kompaktes Padding, nicht klickbar (wie docs). */
  get tagStyle(): string {
    return `background:var(--${this.tagArea}-50);pointer-events:none;min-height:auto;padding:2px 10px`;
  }
}
