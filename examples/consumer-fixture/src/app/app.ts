import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import type { CdsArea, CdsButtonVariant } from '@conciso/design-system-angular';
import {
  ButtonComponent,
  CardComponent,
  CdsConfirmDialog,
  CheckboxComponent,
  TextFieldComponent,
  TopnavComponent,
} from '@conciso/design-system-angular';

/**
 * Konsumiert die Lib über ihren einzigen Einstiegspunkt
 * `@conciso/design-system-angular` — inkl. der öffentlichen Typen (CdsArea,
 * CdsButtonVariant), analog User Story 3 der Spec. Dient als lebendes
 * Konsum-Beispiel (siehe README-Snippet der Lib) und als Ziel des
 * Consumer-Smoke-Tests (siehe scripts/consumer-smoke-test.sh).
 *
 * Die Auswahl der Komponenten ist nicht beliebig: sie soll die
 * ABHÄNGIGKEITSFLÄCHE der Lib abdecken, nicht nur ein paar Komponenten. Denn der
 * AOT-Build löst nur auf, was auch importiert wird — eine Fixture, die
 * ausschließlich Button und Topnav nutzt, hätte fehlende peerDependencies für
 * `@angular/forms` und `@angular/platform-browser` NIE gemeldet (genau so
 * passiert, siehe docs/adr/0004). Daher pro Fremd-Paket mindestens ein Vertreter:
 *
 * - Button, Topnav → `@angular/core`/`common` und `@ng-icons` (Icon-Registrierung)
 * - TextField, Checkbox → `@angular/forms` (NG_VALUE_ACCESSOR, Laufzeit-Token)
 * - Card → `@angular/platform-browser` (DomSanitizer)
 *
 * Dazu der einzige Service der Lib, der selbst rendert (CdsConfirmDialog, docs/adr/0012):
 * Er bringt kein neues Fremd-Paket mit, steht aber für die zweite Form öffentlicher API
 * (Methode statt Inputs/Outputs) und wird deshalb einmal echt aufgerufen.
 *
 * Kommt eine Komponente mit einem NEUEN Fremd-Import in die Lib, gehört hier ein
 * Vertreter dazu — sonst prüft das Gate diese Abhängigkeit nicht.
 */
@Component({
  selector: 'app-root',
  imports: [ButtonComponent, TopnavComponent, TextFieldComponent, CheckboxComponent, CardComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  protected readonly areas: CdsArea[] = ['co', 'ki', 'es', 'wo'];
  protected readonly variants: CdsButtonVariant[] = ['filled', 'tonal', 'outlined'];
  protected readonly confirmResult = signal('');
  private readonly confirmDialog = inject(CdsConfirmDialog);

  protected async confirmDiscard(): Promise<void> {
    const discarded = await this.confirmDialog.open({
      title: 'Änderungen verwerfen?',
      message: 'Deine Änderungen gehen verloren.',
      confirmLabel: 'Verwerfen',
      cancelLabel: 'Weiter bearbeiten',
      destructive: true,
      emphasis: 'cancel',
    });
    this.confirmResult.set(discarded ? 'verworfen' : 'weiter bearbeitet');
  }
}
