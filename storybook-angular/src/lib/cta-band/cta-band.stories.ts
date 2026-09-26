import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { CtaBandComponent } from '@conciso/design-system-angular';

// Bereichs-Hintergrund wie in button.stories.ts („Auf Bereichs-Band“): --XX-700, ki
// als einziger Ausreißer auf -800. Die Fläche ist bewusst KEIN Input der Komponente
// (siehe cta-band.component.ts, Entscheidung 2) — der Konsument setzt sie am
// Host, genau wie im Mockup (docs/index.html:6304 u. a.).
const bandBackground = "'var(--' + area + (area === 'ki' ? '-800' : '-700') + ')'";

const meta: Meta<CtaBandComponent> = {
  title: 'Komponenten/Call to Action/CTA-Band',
  component: CtaBandComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Das bereichsgefärbte Page-End-CTA-Band (`.ep-cta-band`, css/components.css:1456): ' +
          'letzte Einladung am Ende jeder Customer-Page, direkt vor dem Footer. Attributselektor ' +
          '`[cdsCtaBand]` statt eigenem Element: die Bandfläche sitzt als Inline-Style direkt am ' +
          '`<div cdsCtaBand style="background:…">`, genau wie im Mockup — ein Element-Selektor ' +
          'würde denselben „Fläche am Host“-Fehler wiederholen, den ADR-0008 für `cds-section` ' +
          'gemessen hat. `area` färbt deshalb nur die Aktion (`.btn-{area}`), nicht das Band ' +
          'selbst. Die Aktion ist ein echter `<a href>`, wenn `primaryHref` gesetzt ist, sonst ' +
          'ein `<button>` mit `primaryClick` — nie ein `<a>` ohne Ziel. Bewusst nur EINE Aktion: ' +
          'keines der 22 Mockup-Vorkommen zeigt eine zweite, und `.btn-on-band` lässt sich mit ' +
          'den vorhandenen CSS-Klassen ohnehin nicht in einer zurückhaltenderen Variante bauen ' +
          '(siehe Klassendoku, Entscheidung 4, sowie ' +
          '`.scratch/angular-seitenbausteine/issues/16-css-luecke-zweite-aktion-auf-band.md`). ' +
          'Die Aktion komponiert `.btn-filled` + `.btn-on-band` direkt (nicht über `cds-button`, ' +
          'das keinen `href` kennt) und zentriert sich über das ererbte ' +
          '`.ep-cta-band{text-align:center}` — kein zusätzliches Layout im Wrapper.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    // Wortlaut aus dem Mockup (docs/index.html:6305–6307, Beispielseite 9598 ff.).
    heading: 'Erstgespräch, 30 Minuten, kostenfrei.',
    sub: 'Du schilderst Dein Vorhaben, wir geben eine erste Einschätzung. Wenn es passt, sprechen wir über konkrete Schritte. Wenn nicht, war es trotzdem nützlich.',
    area: 'co',
    primaryLabel: 'Termin buchen',
    primaryHref: '',
    primaryClick: fn(),
  },
};
export default meta;

type Story = StoryObj<CtaBandComponent>;

export const Interaktiv: Story = {
  // Bekannter CSS-Kern-Befund, kein Wrapper-Artefakt (Randbedingung 1, spec.md;
  // Ticket 15, .scratch/angular-seitenbausteine/issues/15-css-kern-ep-cta-sub-kontrast.md):
  // `.ep-cta-sub` (opacity:.85, css/components.css:1458) unterschreitet auf --co-700
  // den AA-Kontrast (gerechnet mit der WCAG-Formel gegen die Token-Werte: 4,46:1 statt
  // 4,5:1 — Weiß bei 85% Deckkraft ergibt #d9eaea auf #007575). Auf ki-800/es-700/
  // wo-700 liegt derselbe Text bei 6,1–7,4:1: co ist hier der systematische Ausreißer,
  // genau wie beim bekannten Befund zu `.cta-dl-eyebrow` in download-cta.stories.ts.
  // Identisches rohes HTML (docs/index.html:6304 ff.) hat denselben Fehler, also kein
  // Wrapper-Problem — Fix gehört in den CSS-Kern, nicht in diese Komponente.
  parameters: { a11y: { test: 'todo' } },
  render: (args) => ({
    props: args,
    template: `
      <div
        cdsCtaBand
        [heading]="heading"
        [sub]="sub"
        [area]="area"
        [primaryLabel]="primaryLabel"
        [primaryHref]="primaryHref"
        (primaryClick)="primaryClick($event)"
        [style.background]="${bandBackground}"
        style="color:#fff;border-radius:var(--r-lg)"
      ></div>
    `,
  }),
  // .ep-cta-band sitzt auf dem Host (ein <div>), kein Wrapper darunter. Ohne
  // primaryHref (Default '') rendert ein <button>, der primaryClick feuert. Die
  // Aktion zentriert sich ohne eigenes Layout über das ererbte text-align:center.
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const band = canvasElement.querySelector('.ep-cta-band') as HTMLElement;
    await expect(band).not.toBeNull();
    await expect(band.tagName).toBe('DIV');
    await expect(canvasElement.querySelector('.ep-cta-h2')).toHaveTextContent(
      'Erstgespräch, 30 Minuten, kostenfrei.',
    );

    const btn = c.getByRole('button', { name: 'Termin buchen' });
    await userEvent.click(btn);
    await expect(args.primaryClick).toHaveBeenCalledTimes(1);

    await expect(c.queryAllByRole('button')).toHaveLength(1);
    await expect(c.queryAllByRole('link')).toHaveLength(0);
  },
};

export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  // Absichtlich unterschiedlich lange Unterzeilen (Regressionsschutz-Konvention aus
  // spec.md): mit gleich langen Texten bliebe ein gebrochener Zeilenumbruch unsichtbar.
  render: () => ({
    moduleMetadata: { imports: [CtaBandComponent] },
    template: `
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <div cdsCtaBand heading="Erstgespräch, 30 Minuten, kostenfrei." primaryLabel="Termin buchen" area="co" style="background:var(--co-700);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Wo steht Ihr KI-Piloten-Portfolio wirklich?" sub="Ein kurzes Gespräch zeigt, welche Anwendungsfälle sich lohnen und welche eher nicht." primaryLabel="Potenzial einschätzen lassen" area="ki" style="background:var(--ki-800);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Lernen wir uns kennen?" sub="Erzähl uns, was Du vorhast." primaryLabel="Gespräch anfragen" area="es" style="background:var(--es-700);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Drei Muster, an denen Veränderung scheitert." sub="Wir zeigen in einem kurzen Termin, woran es in Ihrer Organisation konkret hakt, und was ein erster wirksamer Schritt wäre." primaryLabel="Termin vereinbaren" area="wo" style="background:var(--wo-700);color:#fff;border-radius:var(--r-lg)"></div>
      </div>
    `,
  }),
};

export const AlsLinks: Story = {
  name: 'Als Links',
  args: {
    heading: 'Lernen wir uns kennen?',
    sub: 'Erzähl uns, was Du vorhast, oder komm in Dortmund auf einen Kaffee vorbei.',
    primaryLabel: 'Gespräch anfragen',
    primaryHref: '#sec-examples',
  },
  // Derselbe bekannte CSS-Kern-Befund wie in „Interaktiv“ (co-700 + .ep-cta-sub,
  // Ticket 15).
  parameters: { a11y: { test: 'todo' } },
  render: (args) => ({
    props: args,
    template: `
      <div
        cdsCtaBand
        [heading]="heading"
        [sub]="sub"
        [area]="area"
        [primaryLabel]="primaryLabel"
        [primaryHref]="primaryHref"
        (primaryClick)="primaryClick($event)"
        [style.background]="${bandBackground}"
        style="color:#fff;border-radius:var(--r-lg)"
      ></div>
    `,
  }),
  // Gesetztes Href → echter <a> MIT Ziel, nie ein <a> ohne href (kein
  // klickbar aussehender, aber nicht fokussierbarer Fake-Link).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('button')).toHaveLength(0);

    const primary = c.getByRole('link', { name: 'Gespräch anfragen' });
    await expect(primary.tagName).toBe('A');
    await expect(primary).toHaveAttribute('href', '#sec-examples');
  },
};
