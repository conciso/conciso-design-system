import {
  createElement as h,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/**
 * Doc-Block für MDX-Seiten: zeigt zu einem HTML-Codeblock zusätzlich das
 * gerenderte Ergebnis aus HTML plus CSS-Schicht, aus EINER Quelle.
 *
 * Verwendung (der Codeblock bleibt ein gewöhnlicher ```html-Block, den
 * `docs-show` unverändert als Text liefert):
 *
 *     <HtmlBeispiel>
 *
 *     ```html
 *     <button class="btn btn-filled">Kontakt</button>
 *     ```
 *
 *     </HtmlBeispiel>
 *
 * Die Vorschau liegt in einem `<iframe srcdoc>` und nicht im Seitenbaum der
 * Docs-Seite. Drei Gründe:
 * - Das Beispiel ist ein vollständiges Dokument: `html`/`body`-Regeln aus
 *   base.css, `[data-theme="dark"] …`-Regeln aus dark-mode.css und Media-Queries
 *   greifen wie auf einer echten Seite (in einem Shadow-Root träfe
 *   `[data-theme="dark"]` nicht, und `html`/`body` gäbe es nicht).
 * - Doppelte IDs und Landmarks (`<nav>`, `<main>`, …) aus mehreren Beispielen
 *   landen nicht im Dokument der Docs-Seite.
 * - Die Doku-Typografie aus preview-head.html erreicht das Beispiel nicht.
 *
 * Die Vorschau ist bewusst statisch: ohne Skripte (`sandbox` ohne
 * `allow-scripts`), Links und Formulare navigieren nicht. Das Theme der Docs
 * (`data-theme` am `<html>`) wird in den Frame gespiegelt.
 */

/** Reihenfolge wie in preview-head.html vorgeschrieben. */
const CSS_DATEIEN = ['fonts', 'tokens', 'dark-mode', 'base', 'components'];

const HINWEIS_INTERAKTIV =
  'Statische Vorschau: Das Verhalten setzt eine eigene Umsetzung selbst um, siehe Abschnitt „Nur CSS-Schicht“.';

/** Fließt den Text eines (verschachtelten) React-Baums zusammen, so wie MDX ihn aus dem Codeblock liefert. */
function textAus(knoten: ReactNode): string {
  if (typeof knoten === 'string' || typeof knoten === 'number') return String(knoten);
  if (Array.isArray(knoten)) return knoten.map(textAus).join('');
  if (isValidElement(knoten)) return textAus((knoten.props as { children?: ReactNode }).children);
  return '';
}

function istDunkel(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

/** Baut das Dokument für den Frame; das Beispiel selbst bleibt unverändert. */
function dokument(html: string, dunkel: boolean): string {
  // Relativ zur Preview-Seite (iframe.html), damit der Unterpfad auf GitHub Pages stimmt.
  const basis = new URL('./conciso/css/', document.baseURI).href;
  const links = CSS_DATEIEN.map(
    (name) => `<link rel="stylesheet" href="${basis}${name}.css">`,
  ).join('');
  return (
    `<!doctype html><html lang="de"${dunkel ? ' data-theme="dark"' : ''}><head>` +
    `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` +
    `${links}<style>body{margin:0;padding:var(--s6);transition:none}</style>` +
    `</head><body>${html}</body></html>`
  );
}

export interface HtmlBeispielProps {
  /** Der ```html-Block aus MDX; liefert Vorschau und angezeigten Code zugleich. */
  children?: ReactNode;
  /** Zugänglicher Name des Vorschau-Frames, je Beispiel eigen und beschreibend (Pflicht). */
  titel: string;
  /** Interaktives Muster: ergänzt den Hinweis, dass das Verhalten selbst umzusetzen ist. */
  interaktiv?: boolean;
}

export function HtmlBeispiel({ children, titel, interaktiv = false }: HtmlBeispielProps) {
  const html = textAus(children).replace(/\n$/, '');
  const frame = useRef<HTMLIFrameElement>(null);
  const messer = useRef<ResizeObserver | null>(null);
  const [dunkel, setDunkel] = useState(istDunkel);
  const [hoehe, setHoehe] = useState(120);
  // Das Theme steht nur beim ersten Aufbau im Dokument. Spätere Wechsel setzen
  // `data-theme` im Frame-Root (Effekt unten); ein geänderter srcDoc würde den
  // Frame neu laden und Zustand wie ein geöffnetes <details> verwerfen.
  const startDunkel = useRef(dunkel);
  const srcDoc = useMemo(() => dokument(html, startDunkel.current), [html]);
  const ohneTitel = !titel;
  useEffect(() => {
    if (ohneTitel)
      console.warn('HtmlBeispiel: Das Prop `titel` fehlt, die Vorschau wird nicht gerendert.');
  }, [ohneTitel]);

  // Theme der Docs in den Frame spiegeln (der Frame lädt nicht neu).
  useEffect(() => {
    const beobachter = new MutationObserver(() => setDunkel(istDunkel()));
    beobachter.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => beobachter.disconnect();
  }, []);

  const themeSetzen = (doc: Document | null | undefined, dunkelNun: boolean) => {
    const wurzel = doc?.documentElement;
    if (!wurzel) return;
    if (dunkelNun) wurzel.setAttribute('data-theme', 'dark');
    else wurzel.removeAttribute('data-theme');
  };
  useEffect(() => themeSetzen(frame.current?.contentDocument, dunkel), [dunkel]);

  // Beim Entfernen der Komponente den Beobachter trennen.
  useEffect(() => () => messer.current?.disconnect(), []);

  // Höhe an den Inhalt binden und Navigation unterbinden, sobald das Dokument steht.
  const beiLaden = () => {
    const doc = frame.current?.contentDocument;
    if (!doc?.body) return;
    themeSetzen(doc, istDunkel());
    const messen = () => setHoehe(Math.ceil(doc.body.getBoundingClientRect().height));
    messen();
    messer.current?.disconnect();
    messer.current = new ResizeObserver(messen);
    messer.current.observe(doc.body);
    const stoppen = (e: Event) => {
      if (e.type === 'submit' || (e.target as Element | null)?.closest?.('a[href]'))
        e.preventDefault();
    };
    doc.addEventListener('click', stoppen);
    doc.addEventListener('submit', stoppen);
  };

  return h(
    'div',
    { className: 'sb-html-beispiel' },
    ohneTitel
      ? h(
          'p',
          { role: 'alert', style: { color: 'var(--tx-primary)', font: 'var(--ty-body-sm)' } },
          'HtmlBeispiel: Das Prop „titel“ fehlt, die Vorschau wird nicht gerendert.',
        )
      : html
        ? h(
            'div',
            {
              style: {
                // Eigener Grund: die Docs-Seite bleibt hell, die Vorschau folgt dem Theme.
                background: 'var(--bg-page)',
                border: 'var(--bd-strong)',
                borderRadius: 'var(--r-md)',
                overflow: 'hidden',
                margin: 'var(--s4) 0 var(--s2)',
              },
            },
            h('iframe', {
              ref: frame,
              title: titel,
              srcDoc,
              sandbox: 'allow-same-origin',
              onLoad: beiLaden,
              style: { display: 'block', width: '100%', height: `${hoehe}px`, border: 0 },
            }),
            interaktiv
              ? h(
                  'p',
                  {
                    style: {
                      margin: 0,
                      padding: 'var(--s2) var(--s4)',
                      borderTop: 'var(--bd)',
                      font: 'var(--ty-body-sm)',
                      color: 'var(--tx-secondary)',
                    },
                  },
                  HINWEIS_INTERAKTIV,
                )
              : null,
          )
        : null,
    children,
  );
}
