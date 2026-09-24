import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, fireEvent, waitFor, expect } from 'storybook/test';
import { ScaleComponent } from '@conciso/design-system-angular';

// Hilfsfunktionen für die Tick-Label-Regressionstests (Ink-Box statt Zellenbox: eine
// Grid-Spalte kann breiter sein als ihr Text, `getBoundingClientRect()` auf dem Label
// selbst würde also Freiraum als „Text“ mitzählen und Überlappungen verschleiern).
function inkRect(el: HTMLElement): DOMRect {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect();
}
// Ein ClientRect je Zeilenbox → dessen Anzahl ist die Zeilenzahl.
function lineCount(el: HTMLElement): number {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getClientRects().length;
}

// Warum es hier keinen Tastatur-play-Test gibt: Die Tastatursteuerung stammt vom
// nativen <input type=range> und funktioniert im Browser. Sie lässt sich mit den
// Mitteln dieser Testebene aber nicht prüfen — `userEvent.keyboard()` bildet
// Tastenverhalten in JavaScript nach, und seine Tabelle
// (@testing-library/user-event, event/behavior/keydown.js) kennt für
// ArrowLeft/ArrowRight nur input[type=radio] und für Pos1/Ende nur Textauswahl;
// für type=range gibt es keinen Eintrag. Die synthetischen Events lösen Blinks
// natives Stepping nicht aus, der Wert bleibt stehen. Ein Test dafür wäre
// strukturell nie grün. Gegenprobe mit echtem Playwright-Tastendruck auf ein
// rohes Range-Input: dort ändert sich der Wert korrekt.
const meta: Meta<ScaleComponent> = {
  title: 'Komponenten/Inputs & Forms/Skala',
  component: ScaleComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stufen-Auswahl für GEORDNETE (ordinale) Kategorien, deren Labels die Werte sind ' +
          '(z. B. Niedrig < Mittel < Hoch). Auf Basis des nativen Range-Inputs; der aktuelle ' +
          'Wert erscheint als Label und wird Screenreadern über aria-valuetext gemeldet. Für ' +
          'ungeordnete/gleichrangige Optionen ist ein Slider das falsche Element — dafür die ' +
          'Radio-Gruppe oder den Segment-Umschalter (AreaTabs) nutzen.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    value: { control: { type: 'number', min: 0 } },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Zufriedenheit',
    labels: ['Sehr unzufrieden', 'Unzufrieden', 'Neutral', 'Zufrieden', 'Sehr zufrieden'],
    value: 2,
    area: 'co',
    helper: '',
    disabled: false,
    scaleId: 'demo-scale',
  },
};
export default meta;

type Story = StoryObj<ScaleComponent>;

export const Interaktiv: Story = {
  // Schieben wählt eine Stufe; das <output> zeigt das Label (nicht die Zahl).
  // Assertion aufs <output> scopen — das Label taucht auch als Tick auf.
  play: async ({ canvasElement }) => {
    const out = canvasElement.querySelector('output');
    await expect(out).toHaveTextContent('Neutral');
    const slider = within(canvasElement).getByRole('slider');
    fireEvent.input(slider, { target: { value: '4' } });
    await waitFor(() => expect(out).toHaveTextContent('Sehr zufrieden'));
  },
};

export const Deaktiviert: Story = {
  args: { scaleId: 'demo-scale-disabled', disabled: true },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.getByRole('slider')).toBeDisabled();
  },
};

export const Stufen: Story = {
  name: 'Verschiedene Skalen',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [ScaleComponent] },
    template: `
      <div style="display:grid;gap:32px;max-width:460px">
        <cds-scale scaleId="sc-3" area="co" label="Priorität"
          [labels]="['Niedrig','Mittel','Hoch']" [value]="1"></cds-scale>
        <cds-scale scaleId="sc-4" area="ki" label="Häufigkeit"
          [labels]="['nie','selten','oft','immer']" [value]="2"></cds-scale>
        <cds-scale scaleId="sc-5" area="es" label="Erfahrung"
          [labels]="['Einsteiger','Fortgeschritten','Erfahren','Experte']" [value]="1"></cds-scale>
      </div>
    `,
  }),
};

export const LabelUeberlappung: Story = {
  name: 'Label-Kollision bei schmaler Breite',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: () => ({
    moduleMetadata: { imports: [ScaleComponent] },
    template: `
      <div style="width:432px">
        <cds-scale scaleId="sc-overlap" area="co" label="Zufriedenheit"
          [labels]="['Sehr unzufrieden','Unzufrieden','Neutral','Zufrieden','Sehr zufrieden']"
          [value]="2" helper="Pflichtfeld"></cds-scale>
      </div>
    `,
  }),
  // Regressionstest für den Überlappungs-Befund (432px, fünf Stufen: Labels 1/2 und
  // 4/5 überlagerten sich). Prüft die Grid-Positionierung aus `tickColumns()`/
  // `tickItems()` direkt am gerenderten DOM statt an der internen Berechnung, da die
  // Lib laut ADR-0005 keine eigenen .spec.ts-Unit-Tests führt — jeder Komponententest
  // läuft als Story samt Interaktionstest. Bei 432px reicht der Platz, damit
  // `tickColumns()` jede Spalte bis auf ihre natürliche (einzeilige) Breite wachsen
  // lässt — hier wird also NICHT umgebrochen, das ist beabsichtigt (Lesbarkeit vor
  // exakter Ausrichtung, siehe `tickColumns()`). Der eigentliche Umbruchfall steht in
  // `LabelUeberlappungSchmal`.
  play: async ({ canvasElement }) => {
    // Vor jeder Messung Web-Fonts abwarten: Zeilenzahl/Ink-Breite hängen an den
    // tatsächlichen Glyphenmetriken. Ohne das liefe die Messung ggf. noch gegen die
    // Fallback-Schrift (FOUT) und ergäbe je nach Timing andere, flackernde Werte.
    await document.fonts.ready;
    const ticksEl = canvasElement.querySelector('.field-slider-ticks') as HTMLElement;
    const ticks = Array.from(ticksEl.querySelectorAll<HTMLElement>(':scope > *'));
    await expect(ticks).toHaveLength(5);
    const containerBox = ticksEl.getBoundingClientRect();
    const inks = ticks.map(inkRect);
    // Mindestens 6px Lücke zwischen benachbarten Labels — auf der Text-Ink, nicht der
    // (ggf. breiteren, jetzt zusätzlich per padding-inline verbreiterten) Zellenbox
    // gemessen. Bloße Nicht-Überlappung (Lücke ≥ 0) reichte hier nicht: Bei 432px
    // stießen zwei Ink-Boxes exakt aneinander (0px Lücke, „LabelLabel“ ohne sichtbare
    // Trennung) — kein Overlap, aber auch keine Lesbarkeit. Die 4px-Innenpadding in
    // `tickItems()` erzwingen jetzt ≥ 8px; 6px als Testschwelle lässt Sub-Pixel-
    // Rundung Luft, ohne die Regression (0px) durchzulassen.
    for (let i = 1; i < inks.length; i++) {
      await expect(inks[i].left - inks[i - 1].right).toBeGreaterThanOrEqual(6);
    }
    // Kein Label ragt aus dem Tick-Container heraus.
    for (const ink of inks) {
      await expect(ink.left).toBeGreaterThanOrEqual(containerBox.left - 0.5);
      await expect(ink.right).toBeLessThanOrEqual(containerBox.right + 0.5);
    }
    // Maximal 2 Zeilen je Label.
    for (const el of ticks) {
      await expect(lineCount(el)).toBeLessThanOrEqual(2);
    }
    // Tick-Reihe schiebt den Helper-Text nach unten, statt ihn zu überlagern.
    const helper = canvasElement.querySelector('.helper')!.getBoundingClientRect();
    await expect(containerBox.bottom).toBeLessThanOrEqual(helper.top + 0.5);
  },
};

export const LabelUeberlappungSchmal: Story = {
  name: 'Label-Kollision bei sehr schmaler Breite',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: () => ({
    moduleMetadata: { imports: [ScaleComponent] },
    template: `
      <div style="width:380px">
        <cds-scale scaleId="sc-overlap-narrow" area="co" label="Zufriedenheit"
          [labels]="['Sehr unzufrieden','Unzufrieden','Neutral','Zufrieden','Sehr zufrieden']"
          [value]="2" helper="Pflichtfeld"></cds-scale>
      </div>
    `,
  }),
  // Gegenstück zu `LabelUeberlappung`: 380px ist die per Messung schmalste Breite mit
  // stabilem Ergebnis, bei der das Randlabel „Sehr unzufrieden“ noch exakt zwischen
  // den beiden Wörtern auf 2 Zeilen umbricht (kein Wort selbst muss trennen) und dabei
  // nicht mit „Unzufrieden“ überlappt. Bisektion ergab: 300px erzwang bereits 4 Zeilen
  // UND echte Ink-Überlappung; um 340px lieferte dieselbe Breite je nach umgebender
  // Struktur (ein einzelnes cds-scale direkt vs. mehrere nebeneinander) uneinheitlich
  // 2 oder 4 Zeilen — offenbar reagiert die minmax()-Spaltenverteilung nahe der
  // Wechsel-Schwelle empfindlich auf Nachbar-Elemente/Messreihenfolge, auch NACH
  // `document.fonts.ready`; nicht abschließend geklärt. 380px liegt mit Marge über
  // dieser Grauzone und war in mehreren Testläufen und Strukturvarianten konsistent
  // (400px bricht bereits gar nicht mehr um, siehe `LabelUeberlappung`-Kommentar).
  // Belegt den echten Umbruchfall: die Tick-Reihe wächst über die frühere fixe 16px
  // hinaus und schiebt den Helper-Text nach unten, statt ihn zu überlagern.
  play: async ({ canvasElement }) => {
    await document.fonts.ready;
    const ticksEl = canvasElement.querySelector('.field-slider-ticks') as HTMLElement;
    const ticks = Array.from(ticksEl.querySelectorAll<HTMLElement>(':scope > *'));
    await expect(ticks).toHaveLength(5);
    const containerBox = ticksEl.getBoundingClientRect();
    const inks = ticks.map(inkRect);
    // Mindestens 6px Lücke statt bloßer Nicht-Überlappung — s. Begründung in
    // `LabelUeberlappung`.
    for (let i = 1; i < inks.length; i++) {
      await expect(inks[i].left - inks[i - 1].right).toBeGreaterThanOrEqual(6);
    }
    for (const ink of inks) {
      await expect(ink.left).toBeGreaterThanOrEqual(containerBox.left - 0.5);
      await expect(ink.right).toBeLessThanOrEqual(containerBox.right + 0.5);
    }
    for (const el of ticks) {
      await expect(lineCount(el)).toBeLessThanOrEqual(2);
    }
    await expect(containerBox.height).toBeGreaterThan(16);
    const helper = canvasElement.querySelector('.helper')!.getBoundingClientRect();
    await expect(containerBox.bottom).toBeLessThanOrEqual(helper.top + 0.5);
  },
};

export const Formularbindung: Story = {
  name: 'Formularbindung',
  parameters: {
    controls: { disable: true },
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Die Skala ist ein `ControlValueAccessor` und bindet direkt an reactive ' +
          'forms (`formControl`); der Formularwert ist der Stufen-INDEX (hier live ' +
          'angezeigt). Ohne Formular geht alternativ `[(value)]`.',
      },
    },
  },
  render: () => {
    const ctrl = new FormControl(2);
    return {
      moduleMetadata: { imports: [ScaleComponent, ReactiveFormsModule] },
      props: {
        ctrl,
        labels: ['Sehr unzufrieden', 'Unzufrieden', 'Neutral', 'Zufrieden', 'Sehr zufrieden'],
      },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-scale label="Zufriedenheit" scaleId="form-scale" [labels]="labels" [formControl]="ctrl"></cds-scale>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Index: <strong>{{ ctrl.value }}</strong></p>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Index: 2');
    fireEvent.input(c.getByRole('slider'), { target: { value: '4' } });
    await waitFor(() => expect(canvasElement).toHaveTextContent('Index: 4'));
  },
};
