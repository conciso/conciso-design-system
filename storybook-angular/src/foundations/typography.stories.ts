import type { Meta, StoryObj } from '@storybook/angular-vite';

/**
 * Foundations-Story: zeigt die Typografie-Skala über die `--ty-*`-Font-Shorthand-Tokens
 * aus css/tokens.css (Montserrat + Libre Baskerville, self-hosted via css/fonts.css).
 */
const meta: Meta = {
  title: 'Grundlagen/Typografie',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Die Typografie-Skala als Live-Specimen über die `--ty-*`-Tokens aus `css/tokens.css`.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

const specimen = (token: string, sample: string): string => `
  <div style="display:grid;grid-template-columns:200px 1fr;gap:var(--s6);align-items:baseline;padding:var(--s3) 0;border-bottom:var(--bd)">
    <code style="font:var(--ty-body-xs);color:var(--tx-secondary)">var(--ty-${token})</code>
    <span style="font:var(--ty-${token});color:var(--tx-primary)">${sample}</span>
  </div>`;

export const Skala: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${specimen('display-md', 'Display Md — Effektive Software')}
        ${specimen('display-sm', 'Display Sm — Conciso Design System')}
        ${specimen('headline-md', 'Headline Md — Wirksame Organisationen')}
        ${specimen('headline-sm', 'Headline Sm — AI.Applied')}
        ${specimen('serif-lg', 'Serif Lg — ein redaktionelles Zitat')}
        ${specimen('title-sm', 'Title Sm — Kartentitel')}
        ${specimen('body-md', 'Body Md — Standard-Fließtext für längere Absätze.')}
        ${specimen('body-sm', 'Body Sm — Meta-Daten und Sekundärtext.')}
        ${specimen('label-md', 'Label Md — Button- und Formular-Labels')}
        ${specimen('caption', 'Caption — Bildunterschriften und Hinweise')}
      </div>
    `,
  }),
};

/**
 * 1:1 aus docs/index.html übernommen (Zeilen 1535–1572, Abschnitt
 * „Ligaturen: warum „ff“ verbunden aussieht“): erst der Vergleich mit/ohne
 * OpenType-Ligatur über `font-feature-settings: 'liga' 0|1`, dann das
 * Muster-Gitter der Standard-Ligaturen in Libre Baskerville.
 */
export const Ligaturen: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        <div class="layout-grid" style="margin-bottom:var(--s6)">
          <div class="col-6" style="background:var(--bg-surface);border:var(--bd-strong);border-radius:var(--r-lg);padding:var(--s5)">
            <div style="font:500 12px/16px var(--font);letter-spacing:.08em;text-transform:uppercase;color:var(--c-success);margin-bottom:var(--s3)">Mit Ligatur · so wird gesetzt</div>
            <div style="font:400 64px/72px var(--font-display);color:var(--tx-primary);font-feature-settings:'liga' 1;margin-bottom:var(--s3)">Stoff</div>
            <div style="font:var(--ty-body-md);color:var(--tx-secondary)">Die beiden <em>f</em> verschmelzen zu einem zusammenhängenden Zeichen. Der überhängende Bogen des ersten <em>f</em> trifft sauber auf den Bogen des zweiten, ohne sichtbare Naht.</div>
          </div>
          <div class="col-6" style="background:var(--bg-surface);border:var(--bd-strong);border-radius:var(--r-lg);padding:var(--s5)">
            <div style="font:500 12px/16px var(--font);letter-spacing:.08em;text-transform:uppercase;color:var(--c-error);margin-bottom:var(--s3)">Ohne Ligatur · zum Vergleich</div>
            <div style="font:400 64px/72px var(--font-display);color:var(--tx-primary);font-feature-settings:'liga' 0;margin-bottom:var(--s3)">Stoff</div>
            <div style="font:var(--ty-body-md);color:var(--tx-secondary)">Ohne Ligatur kollidieren die Bögen der beiden <em>f</em>, es entsteht eine ungewollte schwarze Stelle und ein optisches „Stolpern“ im Schriftbild.</div>
          </div>
        </div>

        <div style="background:var(--bg-surface);border:var(--bd-strong);border-radius:var(--r-lg);padding:var(--s5)">
          <div class="t-co" style="font:500 12px/16px var(--font);letter-spacing:.08em;text-transform:uppercase;margin-bottom:var(--s4)">Standard-Ligaturen in Libre Baskerville</div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--s4)">
            <div style="text-align:center">
              <div style="font:400 56px/64px var(--font-display);color:var(--tx-primary);margin-bottom:var(--s2)">ff</div>
              <div style="font:var(--ty-label-md);color:var(--tx-secondary)">Sto<strong>ff</strong></div>
            </div>
            <div style="text-align:center">
              <div style="font:400 56px/64px var(--font-display);color:var(--tx-primary);margin-bottom:var(--s2)">fi</div>
              <div style="font:var(--ty-label-md);color:var(--tx-secondary)"><strong>fi</strong>nden</div>
            </div>
            <div style="text-align:center">
              <div style="font:400 56px/64px var(--font-display);color:var(--tx-primary);margin-bottom:var(--s2)">fl</div>
              <div style="font:var(--ty-label-md);color:var(--tx-secondary)">P<strong>fl</strong>ug</div>
            </div>
            <div style="text-align:center">
              <div style="font:400 56px/64px var(--font-display);color:var(--tx-primary);margin-bottom:var(--s2)">ffi</div>
              <div style="font:var(--ty-label-md);color:var(--tx-secondary)">E<strong>ffi</strong>zienz</div>
            </div>
            <div style="text-align:center">
              <div style="font:400 56px/64px var(--font-display);color:var(--tx-primary);margin-bottom:var(--s2)">ffl</div>
              <div style="font:var(--ty-label-md);color:var(--tx-secondary)">Sa<strong>ffl</strong>or</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Live-Kopie aus docs/index.html (Abschnitt Ligaturen, Zeilen 1535–1572). Libre Baskerville aktiviert die OpenType-Standard-Ligatur `liga`: Der linke Block zeigt „Stoff“ mit `font-feature-settings: \'liga\' 1`, der rechte zum Vergleich mit deaktivierter Ligatur (`\'liga\' 0`). Darunter das Muster-Gitter der Ligaturen ff, fi, fl, ffi, ffl.',
      },
    },
  },
};

/**
 * 1:1 aus docs/index.html übernommen (col-7-Box aus dem layout-grid in
 * Zeilen 1605–1632, Abschnitt „Verwendung“, Block „Schematisches Beispiel,
 * Seitenhierarchie“): verschachtelte Font-Tokens von Eyebrow über Display
 * und Body bis zur Karte mit Title, Body und Label-Button.
 */
export const Seitenhierarchie: Story = {
  render: () => ({
    template: `
      <div style="padding:var(--s8);background:var(--bg-page)">
        <div class="layout-grid" style="align-items:start">
          <div class="col-7">
            <span class="lbl">Schematisches Beispiel, Seitenhierarchie</span>
            <div class="ds-surface">
              <span class="t-co" style="font:var(--ty-label-xs);letter-spacing:.08em;text-transform:uppercase">Label Eyebrow · --ty-label-xs</span>
              <div style="font:var(--ty-display-sm);color:var(--tx-primary);margin:var(--s2) 0 var(--s3)">Display Small · Seitentitel</div>
              <div style="font:var(--ty-body-md);color:var(--tx-secondary);margin-bottom:var(--s5)">Body Medium · Einleitungstext für Kontext und Beschreibung der Seiteninhalte.</div>
              <div style="border-top:var(--bd);padding-top:var(--s5);margin-bottom:var(--s3)">
                <div style="font:var(--ty-headline-sm);color:var(--tx-primary);margin-bottom:var(--s2)">Headline Small · Abschnittstitel</div>
                <div style="font:var(--ty-body-md);color:var(--tx-secondary);margin-bottom:var(--s4)">Body Medium · Sekundärer Text für Beschreibungen und Hinweise in Komponenten.</div>
              </div>
              <div style="background:var(--bg-overlay);border-radius:var(--r-md);padding:var(--s4)">
                <div style="font:var(--ty-title-sm);color:var(--tx-primary);margin-bottom:var(--s1)">Title Small · Karten-Titel</div>
                <div style="font:var(--ty-body-xs);color:var(--tx-muted);margin-bottom:var(--s4)">Body Small · Caption · Metadaten · Zeitstempel</div>
                <div style="display:inline-block;background:var(--co-500);border-radius:var(--r-full);padding:var(--s2) var(--s4);font:var(--ty-label-md);color:var(--co-900)">Label Large · Button</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Live-Kopie aus docs/index.html (Abschnitt „Verwendung“, Block „Schematisches Beispiel, Seitenhierarchie“, Zeilen 1605–1632). Zeigt die Font-Tokens verschachtelt in echter Seitenhierarchie: Eyebrow (`--ty-label-xs`), Display Small (`--ty-display-sm`) und Body Medium (`--ty-body-md`), darunter durch eine Trennlinie abgesetzt Headline Small (`--ty-headline-sm`) mit Body Medium, und zuunterst in einer Karte Title Small (`--ty-title-sm`), Body X-Small (`--ty-body-xs`) und ein Label-Large-Button (`--ty-label-md`). Die Token-Übersicht (col-5) aus dem Quellblock ist nicht Teil dieser Story, da nur das benannte Schema-Beispiel als visueller Block übertragen wurde.',
      },
    },
  },
};
