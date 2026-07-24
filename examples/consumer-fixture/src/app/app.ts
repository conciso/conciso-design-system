import { Component } from '@angular/core';
import type { CdsArea, CdsButtonVariant } from '@conciso/design-system-angular';
import { ButtonComponent, TopnavComponent } from '@conciso/design-system-angular';

/**
 * Konsumiert die Pilot-Scheibe (Button + Topnav) aus dem einzigen Einstiegspunkt
 * `@conciso/design-system-angular` — inkl. der öffentlichen Typen (CdsArea,
 * CdsButtonVariant), analog User Story 3 der Spec. Dient als lebendes
 * Konsum-Beispiel (siehe README-Snippet der Lib) und als Ziel des
 * Consumer-Smoke-Tests (siehe scripts/consumer-smoke-test.sh).
 */
@Component({
  selector: 'app-root',
  imports: [ButtonComponent, TopnavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly areas: CdsArea[] = ['co', 'ki', 'es', 'wo'];
  protected readonly variants: CdsButtonVariant[] = ['filled', 'tonal', 'outlined'];
}
