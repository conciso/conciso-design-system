// Unit-Tests für die reine Prüf-Logik aus checker.mjs — handgepflegte Beispielantworten,
// keine echten claude-/MCP-Aufrufe (die macht run-eval.mjs). Bewusst NICHT unter
// mcp-server/test/, damit `npm test -w mcp-server` (`node --test test/*.test.mjs`) den
// Eval-Teil nicht einschließt (Issue 06, Akzeptanzkriterium „npm test bleibt grün, Eval ist
// nicht Teil davon“). Laufen lassen mit `npm run test:eval-checker -w mcp-server`.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { checkAnswer, extractCodeBlocks, extractElements, mentionsGlobalCssInclusion } from './checker.mjs';

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
