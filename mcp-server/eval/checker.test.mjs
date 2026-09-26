// Unit-Tests für die reine Prüf-Logik aus checker.mjs — handgepflegte Beispielantworten,
// keine echten claude-/MCP-Aufrufe (die macht run-eval.mjs). Bewusst NICHT unter
// mcp-server/test/, damit `npm test -w mcp-server` (`node --test test/*.test.mjs`) den
// Eval-Teil nicht einschließt: `npm test` bleibt grün, der Eval ist kein Teil davon.
// Laufen lassen mit `npm run test:eval-checker -w mcp-server`.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  checkAnswer,
  checkCoreClaim,
  extractCodeBlocks,
  extractElements,
  mentionsGlobalCssInclusion,
} from './checker.mjs';

function makeTruthMap() {
  const button = {
    componentId: 'komponenten-buttons-button',
    inputs: new Set(['area', 'disabled', 'full', 'label', 'size', 'type', 'variant']),
    outputs: new Set(['clicked']),
  };
  const iconCard = {
    componentId: 'komponenten-cards-teaser-icon-karte',
    inputs: new Set(['href', 'title']),
    outputs: new Set([]),
  };
  return {
    elementSelectors: new Map([['cds-button', button]]),
    attributeSelectors: new Map([['cdsIconCard', iconCard]]),
  };
}

test('extractCodeBlocks findet nur Fließtext in Fences, nicht außerhalb', () => {
  const md = 'Text davor\n```html\n<cds-button></cds-button>\n```\nText danach';
  assert.deepEqual(extractCodeBlocks(md), ['<cds-button></cds-button>\n']);
});

test('extractElements zerlegt Tag und Angular-Attributformen', () => {
  const [el] = extractElements('<cds-button label="Los" [full]="true" (clicked)="go()" *ngIf="show" #ref>');
  assert.equal(el.tag, 'cds-button');
  assert.deepEqual(el.attrs, ['label', '[full]', '(clicked)', '*ngIf', '#ref']);
});

test('erfundenes Input auf einer dokumentierten Komponente wird gemeldet', () => {
  const answer = 'So geht das:\n```html\n<cds-button label="Los" [icon]="\'left\'" variant="filled"></cds-button>\n```';
  const { findings } = checkAnswer(answer, makeTruthMap());
  assert.equal(findings.length, 1);
  assert.equal(findings[0].reason, 'undocumented-input');
  assert.equal(findings[0].componentId, 'komponenten-buttons-button');
  assert.match(findings[0].attribute, /icon/);
});

test('Antwort mit ausschließlich dokumentierten Inputs/Outputs bleibt ohne Befund', () => {
  const answer = '```html\n<cds-button label="Los" variant="filled" area="ki" (clicked)="onClick()"></cds-button>\n```';
  const { findings, checkedComponents } = checkAnswer(answer, makeTruthMap());
  assert.deepEqual(findings, []);
  assert.deepEqual(checkedComponents, ['komponenten-buttons-button']);
});

test('Standard-HTML/Angular-Attribute werden ignoriert, nicht gemeldet', () => {
  const answer =
    '```html\n<cds-button class="mt-4" id="save-btn" *ngIf="show" #btnRef aria-label="Speichern" ' +
    'data-testid="save" [ngClass]="{active:true}" label="Los" variant="filled"></cds-button>\n```';
  const { findings, ignoredAttributes } = checkAnswer(answer, makeTruthMap());
  assert.deepEqual(findings, []);
  assert.ok(ignoredAttributes.includes('class'));
  assert.ok(ignoredAttributes.includes('aria-label'));
});

test('undokumentierter Output wird gemeldet, natives DOM-Event nicht', () => {
  const answer =
    '```html\n<cds-button label="Los" variant="filled" (hover)="onHover()" (click)="onNative()"></cds-button>\n```';
  const { findings, ignoredAttributes } = checkAnswer(answer, makeTruthMap());
  assert.equal(findings.length, 1);
  assert.equal(findings[0].reason, 'undocumented-output');
  assert.match(findings[0].attribute, /hover/);
  assert.ok(ignoredAttributes.includes('(click)'));
});

test('unbekanntes cds-*-Element ohne Manifest-Eintrag wird gemeldet', () => {
  const answer = '```html\n<cds-icon name="star"></cds-icon>\n```';
  const { findings, unknownSelectors } = checkAnswer(answer, makeTruthMap());
  assert.equal(findings.length, 1);
  assert.equal(findings[0].reason, 'unknown-selector');
  assert.deepEqual(unknownSelectors, ['cds-icon']);
});

test('ein normales div ohne passendes Attribut wird stillschweigend übersprungen', () => {
  const answer = '```html\n<div class="grid"><p>Text</p></div>\n```';
  const { findings, checkedElementCount } = checkAnswer(answer, makeTruthMap());
  assert.deepEqual(findings, []);
  assert.equal(checkedElementCount, 0);
});

test('Attribut-Selektor-Komponente wird über ihr Marker-Attribut aufgelöst', () => {
  const answer = '```html\n<div cdsIconCard [href]="link" [subtitle]="x" [title]="t"></div>\n```';
  const { findings } = checkAnswer(answer, makeTruthMap());
  assert.equal(findings.length, 1);
  assert.match(findings[0].attribute, /subtitle/);
  assert.equal(findings[0].componentId, 'komponenten-cards-teaser-icon-karte');
});

test('Code-Blöcke ohne cds-*-Elemente bleiben ohne Befund', () => {
  const answer = '```ts\nconst x = 1;\n```';
  const { findings, checkedElementCount } = checkAnswer(answer, makeTruthMap());
  assert.deepEqual(findings, []);
  assert.equal(checkedElementCount, 0);
});

test('mentionsGlobalCssInclusion erkennt deutsche Einrichtungs-Formulierungen', () => {
  assert.equal(mentionsGlobalCssInclusion('Du musst die CSS-Schicht global in der angular.json einbinden.'), true);
  assert.equal(mentionsGlobalCssInclusion('@conciso/design-system muss als Style in angular.json stehen.'), true);
  assert.equal(mentionsGlobalCssInclusion('Setze einfach [variant]="\'filled\'" am Button.'), false);
});

test('mentionsGlobalCssInclusion wertet die Angular-Lib „@conciso/design-system-angular“ nicht als CSS-Hinweis', () => {
  // Regressionstest: `@conciso\/design-system\b` matchte bisher auch „@conciso/design-system-angular“,
  // weil `\b` schon an der Grenze „m“→„-“ zuschlägt (Wortzeichen → Nicht-Wortzeichen). Das bloße
  // Importieren der Angular-Lib sagt nichts darüber, ob die CSS-Schicht global eingebunden wurde.
  assert.equal(
    mentionsGlobalCssInclusion('Importiere die Komponente aus @conciso/design-system-angular.'),
    false,
  );
});

// ─── checkCoreClaim (Intentionsfragen-Check-Typ) ──────────────────────────────────────────────

test('checkCoreClaim: Treffer in jeder Gruppe erfüllt die Kernaussage', () => {
  const groups = [
    ['montserrat'],
    ['headline', 'display'],
  ];
  const answer = 'Für Fließtext nimm Montserrat, Libre Baskerville bleibt der Headline vorbehalten.';
  const { matched, missingGroups } = checkCoreClaim(answer, groups);
  assert.equal(matched, true);
  assert.deepEqual(missingGroups, []);
});

test('checkCoreClaim: eine unerfüllte Gruppe lässt die Kernaussage insgesamt scheitern', () => {
  const groups = [
    ['montserrat'],
    ['headline', 'display'],
  ];
  const answer = 'Für Fließtext nimm Montserrat.';
  const { matched, missingGroups, matchedGroups } = checkCoreClaim(answer, groups);
  assert.equal(matched, false);
  assert.deepEqual(missingGroups, [['headline', 'display']]);
  assert.deepEqual(matchedGroups, [['montserrat']]);
});

test('checkCoreClaim: ein Treffer aus mehreren Synonymen einer Gruppe genügt (ODER innerhalb der Gruppe)', () => {
  const groups = [['höchstens ein', 'maximal ein', 'nur ein']];
  const answer = 'Pro Ansicht ist maximal ein destruktiver Button vorgesehen.';
  assert.equal(checkCoreClaim(answer, groups).matched, true);
});

test('checkCoreClaim: Groß-/Kleinschreibung spielt keine Rolle', () => {
  const groups = [['montserrat']];
  assert.equal(checkCoreClaim('MONTSERRAT ist die richtige Wahl.', groups).matched, true);
  assert.equal(checkCoreClaim('montserrat ist die richtige Wahl.', groups).matched, true);
});

test('checkCoreClaim: Umlaute/scharfes S werden unabhängig von der Schreibweise erkannt', () => {
  // Groß-/Kleinschreibung UND unterschiedliche Unicode-Normalform (vorkomponiertes „ü“ vs.
  // zerlegtes „u“+Combining-Diaeresis) dürfen den Treffer nicht verhindern.
  const groups = [['ermüdet'], ['groß']];
  assert.equal(checkCoreClaim('Serifenschrift ERMÜDET beim Lesen.', groups.slice(0, 1)).matched, true);
  assert.equal(
    checkCoreClaim(`Serifenschrift ermüdet beim Lesen.`, groups.slice(0, 1)).matched,
    true,
  );
  assert.equal(checkCoreClaim('Das ist ein GROSSER Unterschied.', groups.slice(1)).matched, true);
});

test('checkCoreClaim: Stichwort als Wortstamm matcht mehrere Flexionsformen', () => {
  const groups = [['ermüd']];
  assert.equal(checkCoreClaim('Lange Serifentexte ermüden die Augen.', groups).matched, true);
  assert.equal(checkCoreClaim('Das Auge ist schnell ermüdet.', groups).matched, true);
});
