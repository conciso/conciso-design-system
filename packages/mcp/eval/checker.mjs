// Reine Prüf-Logik für das Eval-Set „KI mit und ohne MCP-Server“ (ADR-0012).
// Bewusst KEIN LLM-Richter: eine Antwort gilt nur dann als „erfundene API“, wenn ein
// `cds-*`-Element (per Element-Selektor wie `cds-button` oder per Attribut-Selektor wie
// `[cdsIconCard]`, siehe ADR-0008) ein Attribut oder eine Bindung trägt, die für GENAU
// diese Komponente nicht in ihren `argTypes` steht (`table.category === 'inputs'|'outputs'`).
//
// Die Wahrheit kommt ausschließlich aus dem installierten Snapshot
// (services/core/docgen/*.json), nie aus einer handgepflegten Liste. `buildTruthMap` liest
// dieselbe Form, die scripts/smoke-test.mjs bereits für sein @internal-Gate liest
// (argTypes[*].table.category), ergänzt um `angularComponentMeta.selector` für die
// Selektor→Komponente-Zuordnung (per Spike in ADR-0012 verifiziert).
//
// Alles hier ist eine reine Funktion von (Text, Wahrheits-Map) → Befunde — keine
// Seiteneffekte außer dem Lesen der Docgen-Dateien in buildTruthMap. Das macht checkAnswer()
// isoliert testbar (siehe checker.test.mjs) ohne einen laufenden Server oder einen echten
// Claude-Aufruf.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * @typedef {{ componentId: string, inputs: Set<string>, outputs: Set<string> }} Truth
 * @typedef {{ elementSelectors: Map<string, Truth>, attributeSelectors: Map<string, Truth> }} TruthMap
 */

// Attribute, die auf JEDEM Angular-Host-Element stehen können und nie ein `@Input()`/
// `@Output()` einer cds-*-Komponente sind. Bewusst NICHT in dieser Liste: Namen, die
// zufällig wie native HTML-Attribute aussehen, aber bei mindestens einer Komponente ein
// echtes, dokumentiertes @Input() sind — z. B. `disabled`, `value`, `type`, `required`,
// `placeholder`, `checked`, `label`. Die werden bewusst GEPRÜFT statt ignoriert: genau dort
// würde eine erfundene Kombination (z. B. `required` an einer Komponente ohne dieses Input)
// sonst unbemerkt durchrutschen.
export const IGNORED_ATTRIBUTE_NAMES = new Set([
  'class',
  'id',
  'style',
  'title',
  'hidden',
  'tabindex',
  'slot',
  'dir',
  'lang',
  'role',
  'translate',
  'draggable',
  'spellcheck',
  'ngModel',
  'ngModelChange',
  'ngModelOptions',
  'formControl',
  'formControlName',
  'formGroup',
  'ngClass',
  'ngStyle',
  'ngNonBindable',
  'ngProjectAs',
]);

// Präfixe für Angular-Sonderbindungen und -Metadaten, die nie ein Komponenten-Input/-Output
// sind: `[class.foo]`, `[style.color]`, `[attr.aria-label]`, `aria-*`, `data-*`, sowie die
// `ng-reflect-*`-Attribute, die Angular selbst im DEV-Modus ins DOM schreibt.
const IGNORED_ATTRIBUTE_PREFIXES = ['aria-', 'data-', 'ng-reflect-', 'class.', 'style.', 'attr.'];

// Native DOM-Events: an jedem Element bindbar (auch an cds-*-Komponenten, weil sie auf einem
// echten DOM-Element sitzen), unabhängig davon, ob die Komponente selbst dieses Ereignis als
// eigenen Output deklariert. Nur relevant für Attribute in `(…)`-Form.
const NATIVE_DOM_EVENTS = new Set([
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'keydown',
  'keyup',
  'keypress',
  'input',
  'change',
  'submit',
  'focus',
  'blur',
  'scroll',
  'load',
  'contextmenu',
  'wheel',
  'touchstart',
  'touchend',
  'touchmove',
  'drag',
  'drop',
]);

/**
 * Liest alle Docgen-Dateien eines Snapshots und baut die Wahrheit: Selektor → dokumentierte
 * Inputs/Outputs. Deckt beide im Manifest vorkommenden Selektor-Formen ab (ADR-0008):
 * Element-Selektoren (`cds-button`) und Attribut-Selektoren (`div[cdsIconCard]`, auch als
 * Mehrfachselektor `a[cdsIconCard], div[cdsIconCard]`).
 *
 * @param {string} snapshotDir Pfad zum `snapshot`-Verzeichnis eines installierten Tarballs
 *   (z. B. `<tmpDir>/node_modules/@conciso/design-system-mcp/snapshot`) oder des Quellbaums.
 * @returns {TruthMap}
 */
export function buildTruthMap(snapshotDir) {
  const docgenDir = join(snapshotDir, 'services', 'core', 'docgen');
  const elementSelectors = new Map();
  const attributeSelectors = new Map();

  for (const file of readdirSync(docgenDir).filter((name) => name.endsWith('.json'))) {
    const data = JSON.parse(readFileSync(join(docgenDir, file), 'utf8'));
    for (const component of Object.values(data.components ?? {})) {
      const meta = component.angularComponentMeta;
      if (!meta?.selector) continue; // nicht-Angular-Docgen (z. B. reine MDX-Grundlagenseiten)

      const inputs = new Set();
      const outputs = new Set();
      for (const [argName, argType] of Object.entries(component.argTypes ?? {})) {
        const category = argType?.table?.category;
        if (category === 'inputs') inputs.add(argName);
        else if (category === 'outputs') outputs.add(argName);
      }
      const truth = { componentId: component.id, inputs, outputs };

      // "a[cdsIconCard], div[cdsIconCard]" → zwei Selektor-Teile, ein Attributname.
      for (const part of meta.selector.split(',').map((s) => s.trim()).filter(Boolean)) {
        const attrMatch = part.match(/^[\w-]*\[([\w-]+)\]$/);
        if (attrMatch) {
          attributeSelectors.set(attrMatch[1], truth);
        } else {
          elementSelectors.set(part, truth);
        }
      }
    }
  }
  return { elementSelectors, attributeSelectors };
}

// Fenced Code-Blöcke: ```<optionale Sprache>\n<Inhalt>```. Nur darin wird nach `cds-*`-
// Elementen gesucht — Fließtext-Erwähnungen wie „das Input `variant`“ sind keine Bindung.
const CODE_BLOCK_RE = /```[ \t]*[\w-]*\r?\n([\s\S]*?)```/g;

/** @param {string} markdown @returns {string[]} */
export function extractCodeBlocks(markdown) {
  return [...markdown.matchAll(CODE_BLOCK_RE)].map((m) => m[1]);
}

// Ein Tag mit seinem rohen Attributtext, öffnend oder selbstschließend. Bewusst kein
// vollständiger HTML-Parser: deckt die Angular-Template-Syntax ab, die realistische
// Antworten benutzen (Bindungen, Events, Structural Directives, Template-Refs), scheitert
// aber an Kunstgriffen wie einem `>` innerhalb eines Attributwerts (siehe checker.test.mjs /
// README-Hinweis zu Grenzen).
const TAG_RE = /<([a-zA-Z][\w-]*)((?:\s+[^<>]*?)?)\/?>/g;

// Eine einzelne Attribut-„Bezeichnung“ in einer ihrer Angular-Formen, optional gefolgt von
// `="Wert"`/`='Wert'`/`={Wert}`. Reihenfolge der Alternativen ist wichtig: Banana-in-a-Box
// (`[(x)]`) muss vor der einfachen Eckklammer-Form (`[x]`) geprüft werden.
const ATTR_RE = /(\[\([\w.-]+\)\]|\[[\w.-]+\]|\([\w.-]+\)|\*[\w-]+|#[\w-]+|[\w-]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\}))?/g;

/** @param {string} code @returns {{tag: string, attrs: string[]}[]} */
export function extractElements(code) {
  const elements = [];
  for (const tagMatch of code.matchAll(TAG_RE)) {
    const [, tag, rawAttrs] = tagMatch;
    const attrs = rawAttrs?.trim() ? [...rawAttrs.matchAll(ATTR_RE)].map((m) => m[1]) : [];
    elements.push({ tag, attrs });
  }
  return elements;
}

/** @param {string} raw @returns {{ kind: 'banana'|'input'|'output'|'structural'|'templateRef'|'plain', name: string }} */
function classifyAttr(raw) {
  if (raw.startsWith('[(') && raw.endsWith(')]')) return { kind: 'banana', name: raw.slice(2, -2) };
  if (raw.startsWith('[') && raw.endsWith(']')) return { kind: 'input', name: raw.slice(1, -1) };
  if (raw.startsWith('(') && raw.endsWith(')')) return { kind: 'output', name: raw.slice(1, -1) };
  if (raw.startsWith('*')) return { kind: 'structural', name: raw.slice(1) };
  if (raw.startsWith('#')) return { kind: 'templateRef', name: raw.slice(1) };
  return { kind: 'plain', name: raw };
}

/**
 * Prüft eine Antwort gegen die Wahrheit: jedes Attribut/jede Bindung auf einem erkannten
 * `cds-*`-Element muss ein dokumentierter Input oder Output der zugehörigen Komponente sein.
 *
 * @param {string} answerText Die vollständige Antwort (Markdown mit ggf. Code-Blöcken).
 * @param {TruthMap} truthMap Aus buildTruthMap().
 * @returns {{
 *   findings: Array<{ selector: string, componentId: string|null, attribute: string|null, reason: string, detail: string }>,
 *   ignoredAttributes: string[],
 *   checkedComponents: string[],
 *   checkedElementCount: number,
 *   unknownSelectors: string[],
 * }}
 */
export function checkAnswer(answerText, truthMap) {
  const findings = [];
  const ignoredAttrs = [];
  const checkedComponents = [];
  const unknownSelectors = new Set();

  for (const block of extractCodeBlocks(answerText)) {
    for (const { tag, attrs } of extractElements(block)) {
      let truth = truthMap.elementSelectors.get(tag);
      let selectorAttrName = null;

      if (!truth) {
        // Kein Element-Selektor-Treffer: prüfen, ob eines der Attribute ein bekannter
        // Attribut-Selektor ist (z. B. `cdsIconCard` an einem `<div>`/`<a>`).
        for (const raw of attrs) {
          const { name } = classifyAttr(raw);
          if (truthMap.attributeSelectors.has(name)) {
            truth = truthMap.attributeSelectors.get(name);
            selectorAttrName = name;
            break;
          }
        }
      }

      if (!truth) {
        // Weder Element- noch Attribut-Selektor gefunden. Nur ein Fund, wenn das Tag selbst
        // wie eine Design-System-Komponente benannt ist (`cds-*`) — ein gewöhnliches `<div>`
        // ohne passendes Attribut ist kein Design-System-Element und wird übersprungen.
        if (/^cds-/.test(tag)) {
          unknownSelectors.add(tag);
          findings.push({
            selector: tag,
            componentId: null,
            attribute: null,
            reason: 'unknown-selector',
            detail: `Element „<${tag}>“ kommt in keinem Docgen-Manifest des Snapshots vor.`,
          });
        }
        continue;
      }

      checkedComponents.push(truth.componentId);
      for (const raw of attrs) {
        const { kind, name } = classifyAttr(raw);
        if (name === selectorAttrName) continue; // die Selektor-Markierung selbst, kein Input/Output

        if (kind === 'structural' || kind === 'templateRef') {
          ignoredAttrs.push(raw);
          continue;
        }
        if (IGNORED_ATTRIBUTE_NAMES.has(name) || IGNORED_ATTRIBUTE_PREFIXES.some((p) => name.startsWith(p))) {
          ignoredAttrs.push(raw);
          continue;
        }

        if (kind === 'output') {
          if (NATIVE_DOM_EVENTS.has(name)) {
            ignoredAttrs.push(raw);
            continue;
          }
          if (!truth.outputs.has(name)) {
            findings.push({
              selector: tag,
              componentId: truth.componentId,
              attribute: raw,
              reason: 'undocumented-output',
              detail: `„(${name})“ ist kein dokumentierter Output von „${truth.componentId}“.`,
            });
          }
          continue;
        }

        // input | banana | plain → gegen die dokumentierten Inputs prüfen. Eine einfache
        // Attribut-Zuweisung (`variant="filled"`, ohne Klammern) ist in Angular für
        // string-kompatible Inputs gültige Syntax und wird deshalb genauso behandelt wie
        // `[variant]="'filled'"`.
        if (!truth.inputs.has(name)) {
          findings.push({
            selector: tag,
            componentId: truth.componentId,
            attribute: raw,
            reason: 'undocumented-input',
            detail: `„${raw}“ ist kein dokumentierter Input von „${truth.componentId}“.`,
          });
        }
      }
    }
  }

  return {
    findings,
    ignoredAttributes: [...new Set(ignoredAttrs)],
    checkedComponents: [...new Set(checkedComponents)],
    checkedElementCount: checkedComponents.length,
    unknownSelectors: [...unknownSelectors],
  };
}

// Erkennt, ob eine Antwort auf Einrichtungsfragen die globale Einbindung der CSS-Schicht
// erwähnt. Bewusst großzügig (mehrere Formulierungen), weil es hier nur um „wurde der
// Grundgedanke erwähnt“ geht, nicht um exakten Wortlaut. `(?!-)` nach „design-system“: ohne die
// Sperre matcht `\b` auch an der Wortzeichen→Bindestrich-Grenze und liest deshalb
// „@conciso/design-system-angular“ (die Angular-Lib, keine Aussage über die CSS-Schicht) als
// denselben CSS-Hinweis.
const GLOBAL_CSS_MENTION_RE =
  /(css[- ]schicht|@conciso\/design-system(?!-)\b|angular\.json|"styles"\s*:|styles\.(scss|css)|global[^.\n]{0,40}(einbind|eingebunden|import))/i;

/** @param {string} answerText @returns {boolean} */
export function mentionsGlobalCssInclusion(answerText) {
  return GLOBAL_CSS_MENTION_RE.test(answerText);
}

// ─── Kernaussagen-Check für Intentionsfragen (ADR-0012) ────────────────────────────────────────
//
// Prüft, ob eine Antwort die Kernaussage einer Verwendungsguidance trifft — bewusst ein reiner
// Stichwort-Abgleich, kein LLM-Richter (dasselbe Prinzip wie checkAnswer). „Robust, aber einfach“
// heißt hier: Groß-/Kleinschreibung und unterschiedliche Unicode-Normalformen von
// Umlauten/scharfem S spielen keine Rolle, und pro Teilaspekt der Kernaussage sind mehrere
// Synonyme erlaubt (ODER innerhalb einer Gruppe) — keine Grammatik- oder Bedeutungsprüfung.

/** Groß-/Kleinschreibung und Umlaut-Schreibweisen vereinheitlichen, damit „ERMÜDET“, „ermüdet“
 * und die ASCII-Umschreibung „ermuedet“ als dasselbe Wort zählen, unabhängig davon, ob das
 * Stichwort oder die Antwort den echten Umlaut oder die Umschreibung verwendet. `ä`/`ö`/`ü`
 * werden dafür kanonisch auf `ae`/`oe`/`ue` abgebildet, nicht auf den bloßen Basisvokal.
 * `.normalize('NFC')` geht voran, damit eine zerlegte Unicode-Form (`u` + Combining Diaeresis
 * statt `ü`) zuerst zum vorkomponierten Zeichen zusammengesetzt wird und dieselbe Ersetzung
 * greift. `ß` wird wie bisher auf `ss` abgebildet, damit „groß“/„GROSS“ gleich zählen.
 * @param {string} text @returns {string} */
function normalizeForClaimMatch(text) {
  return text
    .normalize('NFC')
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
}

/**
 * @typedef {string[]} ClaimKeywordGroup Synonyme/Varianten für EINEN Teilaspekt der Kernaussage
 *   (ODER-verknüpft: ein Treffer aus der Gruppe genügt).
 */

/**
 * Prüft eine Antwort gegen die Kernaussage einer Intentionsfrage. `claimKeywords` ist eine Liste
 * von Gruppen (siehe `ClaimKeywordGroup`); ALLE Gruppen müssen mindestens einen Treffer haben,
 * damit die Kernaussage insgesamt als getroffen gilt (UND zwischen den Gruppen) — das bildet ab,
 * dass eine Kernaussage meist aus mehreren Teilaspekten besteht (z. B. „welches Token“ UND
 * „warum“), von denen keiner fehlen darf, während jeder Teilaspekt in unterschiedlichen Worten
 * formuliert sein darf. Ein Stichwort darf ein Wortstamm sein (z. B. „ermüd“ für
 * „ermüden“/„ermüdet“) — das ist gewollt, hält den Check aber bewusst grammatikblind.
 *
 * @param {string} answerText
 * @param {ClaimKeywordGroup[]} claimKeywords
 * @returns {{ matched: boolean, matchedGroups: ClaimKeywordGroup[], missingGroups: ClaimKeywordGroup[] }}
 */
export function checkCoreClaim(answerText, claimKeywords) {
  const normalizedAnswer = normalizeForClaimMatch(answerText ?? '');
  const matchedGroups = [];
  const missingGroups = [];
  for (const group of claimKeywords) {
    const hit = group.some((keyword) => normalizedAnswer.includes(normalizeForClaimMatch(keyword)));
    (hit ? matchedGroups : missingGroups).push(group);
  }
  return { matched: missingGroups.length === 0, matchedGroups, missingGroups };
}
