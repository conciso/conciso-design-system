import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { TopnavComponent } from '@conciso/design-system-angular';

// Echtes Conciso-Logo laut Doku (logo-conciso.svg / -light.svg), via staticDir
// (.storybook/main.ts → /conciso/brand) serviert. Relativer Pfad (./conciso/...),
// da iframe.html auf GitHub Pages unter einem Unterpfad liegt und ein
// wurzelabsoluter Pfad dort ins Leere zeigen würde. Theme-Swap (hell/dunkel) über
// die portablen Klassen .logo-themed-default/-light.
const LOGO_DEFAULT = './conciso/brand/logo-conciso.svg';
const LOGO_DARK = './conciso/brand/logo-conciso-light.svg';

const meta: Meta<TopnavComponent> = {
  title: 'Komponenten/Navigation/Topnav',
  component: TopnavComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1061',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hauptnavigation der Customer-Pages: Logo (Text ODER Bild/SVG mit Theme-Swap) und ' +
          'Top-Level-Links mit aufklappbaren Submenüs links, rechts optional Suche, der ' +
          'Theme-Cycle-Button und ein optionaler Kontakt-Button als Call-to-Action. Der aktive ' +
          'Eintrag (genau einer, via `activeHref`) wird über einen dezenten Unterstrich und ' +
          'Bereichsfarbe markiert. Barrierefrei nach WCAG 2.1 AA.',
      },
    },
  },
  argTypes: {
    logo: { control: 'text' },
    logoSrc: { control: 'text' },
    logoDarkSrc: { control: 'text' },
    logoAlt: { control: 'text' },
    ctaLabel: { control: 'text' },
    activeHref: { control: 'text' },
    showSearch: { control: 'boolean' },
    showCta: { control: 'boolean' },
    showSystemTheme: { control: 'boolean' },
  },
  args: {
    logo: 'conciso.',
    logoSrc: LOGO_DEFAULT,
    logoDarkSrc: LOGO_DARK,
    logoAlt: 'Conciso',
    ctaLabel: 'Kontakt',
    activeHref: '#kontakt',
    showSearch: true,
    showCta: true,
    showSystemTheme: true,
  },
};
export default meta;

type Story = StoryObj<TopnavComponent>;

export const Interaktiv: Story = {
  parameters: {
    // Nutzt jetzt das Bild-Logo (Default) → Rendering weicht von der eingecheckten
    // Text-Logo-Baseline ab. visual.yml liegt noch nicht auf main (kein
    // workflow_dispatch) → nach dem Merge Baseline neu erzeugen + snapshot.skip
    // entfernen.
    snapshot: { skip: true },
  },
  // Submenü öffnet per Klick (aria-expanded) und schließt mit Escape.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: /Leistungen/ });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Der Kontakt-Button ist der einzige Outlined-Button der Navigation.
    const kontakt = c.getByRole('link', { name: 'Kontakt', current: false });
    await expect(kontakt).toHaveClass('btn-outlined');
    await expect(kontakt).not.toHaveClass('btn-filled');
    // Single Source of Truth: höchstens ein Eintrag ist aktiv (aria-current="page").
    await expect(canvasElement.querySelectorAll('[aria-current="page"]')).toHaveLength(1);

    // Fokus-Rückgabe (WCAG 2.4.3): Submenü per Tastatur öffnen, mit Tab hinein
    // fokussieren, Escape schließt UND gibt den Fokus an den Toggle zurück — die
    // CSS blendet .ep-nav-sub per display:none aus, sobald .is-open fehlt, das
    // fokussierte Element verschwindet sonst und der Fokus fiele ans <body>.
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    const subLink = c.getByRole('link', { name: 'Angewandte KI', hidden: true });
    await expect(subLink).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveFocus();
  },
};

export const Minimal: Story = {
  name: 'Ohne Suche & Kontakt',
  // Neue Story ohne eingecheckte Baseline (visual.yml noch nicht auf main → keine
  // Baseline-Erzeugung möglich); nach dem Merge Baseline erzeugen + skip entfernen.
  parameters: { snapshot: { skip: true } },
  args: { showSearch: false, showCta: false },
  // Suche und CTA sind optional abschaltbar; Lupe + Theme-Switcher bleiben trotzdem
  // rechtsbündig (siehe margin-left-Fix in der Komponente).
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.ep-nav-search')).toBeNull();
    await expect(canvasElement.querySelector('a.btn')).toBeNull();
  },
};

export const DoppelteLabels: Story = {
  name: 'Doppelte Labels',
  // Regressionstest: gleich beschriftete Haupt- und Untermenüpunkte sind zulässig
  // und dürfen das Rendern nicht abbrechen (NG0955 bei Tracking per Label).
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    links: [
      {
        label: 'Leistungen',
        sub: [
          { label: 'Übersicht', href: '#l' },
          { label: 'Beratung', href: '#b' },
        ],
      },
      {
        label: 'Wissen',
        sub: [
          { label: 'Übersicht', href: '#w' },
          { label: 'Übersicht', href: '#w2' },
        ],
      },
      { label: 'Wissen', href: '#wissen' },
    ],
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('nav.ep-nav-links > *')).toHaveLength(3);
    await expect(canvasElement.querySelectorAll('.ep-nav-sub a')).toHaveLength(4);
  },
};

/** Links im Test nicht navigieren lassen (Hash-Wechsel im Storybook-iframe vermeiden). */
const blockNavigation = (root: HTMLElement) =>
  root.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) e.preventDefault();
  });

export const TastaturImSubmenue: Story = {
  name: 'Tastatur im Submenü',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Pfeil runter öffnet ein geschlossenes Item und fokussiert den ersten Eintrag; Umlauf am Ende;
  // Pfeil hoch, Home und End nur bei geöffnetem Menü; genau ein Menü zugleich.
  play: async ({ canvasElement }) => {
    blockNavigation(canvasElement);
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Untermenü Leistungen' });
    const other = c.getByRole('button', { name: 'Untermenü Unternehmen' });
    const first = c.getByRole('link', { name: 'Angewandte KI', hidden: true });
    const second = c.getByRole('link', { name: 'Effektive Software', hidden: true });
    const last = c.getByRole('link', { name: 'Wirksame Organisationen', hidden: true });

    // Pfeil hoch auf geschlossenem Item tut nichts.
    toggle.focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Pfeil runter öffnet und fokussiert den ersten Eintrag.
    await userEvent.keyboard('{ArrowDown}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(second).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(last).toHaveFocus();
    // Umlauf am Ende.
    await userEvent.keyboard('{ArrowDown}');
    await expect(first).toHaveFocus();
    // Pfeil hoch vom ersten Eintrag springt zum letzten, dann rückwärts.
    await userEvent.keyboard('{ArrowUp}');
    await expect(last).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(second).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(last).toHaveFocus();

    // Genau ein Menü zugleich: das zweite Item per Pfeil runter öffnen schließt das erste.
    other.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(other).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(c.getByRole('link', { name: 'Über uns', hidden: true })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(other).toHaveAttribute('aria-expanded', 'false');
    await expect(other).toHaveFocus();
  },
};

export const HoverOeffnen: Story = {
  name: 'Öffnen per Hover',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Hover öffnet nach 100 ms und schließt nach 250 ms (nur pointer:fine); Klick bricht die Timer
  // ab; Escape schließt auch ein Hover-Menü, ohne dass der Fokus darin liegt.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Untermenü Leistungen' });
    const item = toggle.closest('.ep-nav-item') as HTMLElement;
    const other = c.getByRole('button', { name: 'Untermenü Unternehmen' });
    const otherItem = other.closest('.ep-nav-item') as HTMLElement;

    // Mit Verzögerung: direkt nach dem Hover noch zu, danach offen.
    await userEvent.hover(item);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
    // Verlassen schließt verzögert.
    await userEvent.unhover(item);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'false'), {
      timeout: 1500,
    });

    // Genau ein Menü zugleich.
    await userEvent.hover(item);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
    await userEvent.unhover(item);
    await userEvent.hover(otherItem);
    await waitFor(() => expect(other).toHaveAttribute('aria-expanded', 'true'));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Escape schließt das Hover-Menü, obwohl der Fokus nicht darin liegt.
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.keyboard('{Escape}');
    await expect(other).toHaveAttribute('aria-expanded', 'false');
    await userEvent.unhover(otherItem);

    // Klick bricht den Öffnen-Timer ab: erst hovern, dann klicken (öffnet), erneut klicken
    // (schließt). Ein übrig gebliebener Timer würde das Menü wieder aufziehen.
    await userEvent.hover(item);
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Timer feuern in Fälligkeitsreihenfolge: Der Sentinel (150 ms) ist nach einem übrig gebliebenen
    // Öffnen-Timer (100 ms) fällig, unabhängig von der Geschwindigkeit der CI.
    await new Promise((r) => setTimeout(r, 150));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.unhover(item);
  },
};

export const SucheLabelUndFokus: Story = {
  name: 'Suche: Label und Fokus',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Das Label des Toggles wechselt mit dem Zustand, beim Öffnen springt der Fokus ins Suchfeld,
  // Escape schließt und gibt den Fokus zurück.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Suche öffnen' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAccessibleName('Suche schließen');
    await expect(c.getByRole('searchbox', { name: 'Suchbegriff' })).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAccessibleName('Suche öffnen');
    await expect(toggle).toHaveFocus();

    // Erneuter Klick auf den Toggle schließt ebenfalls.
    await userEvent.click(toggle);
    await expect(toggle).toHaveAccessibleName('Suche schließen');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAccessibleName('Suche öffnen');
  },
};

export const HeraustabbenSchliesstSubmenue: Story = {
  name: 'Heraustabben schließt Submenü',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Tab aus dem Item heraus schließt das Submenü (kein Fokus-Rücksprung); Tab innerhalb des
  // Items (Caret zu Eintrag) schließt nicht.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Untermenü Leistungen' });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(c.getByRole('link', { name: 'Angewandte KI', hidden: true })).toHaveFocus();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await userEvent.tab();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).not.toHaveFocus();
    await expect(canvasElement.contains(document.activeElement)).toBe(true);
  },
};

export const HeraustabbenSchliesstSuche: Story = {
  name: 'Heraustabben schließt Suche',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Tab aus dem Popover heraus schließt die Suche; Tab innerhalb (Feld, Button) nicht.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Suche öffnen' });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(c.getByRole('button', { name: 'Suchen' })).toHaveFocus();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAccessibleName('Suche öffnen');
  },
};

export const MobilmenueLinkKlick: Story = {
  name: 'Mobilmenü: Link-Klick schließt',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    links: [
      {
        label: 'Leistungen',
        href: '#leistungen',
        sub: [{ label: 'Angewandte KI', href: '#ki' }],
      },
      { label: 'Beiträge', href: '#beitraege' },
    ],
  },
  // Jeder Link-Klick im geöffneten Mobilmenü schließt es und setzt aria-expanded zurück.
  play: async ({ canvasElement }) => {
    blockNavigation(canvasElement);
    const c = within(canvasElement);
    // Der Burger ist über dem Mobile-Breakpoint per display:none ausgeblendet und hat dann
    // keinen zugänglichen Namen; deshalb per Selektor greifen.
    const burger = canvasElement.querySelector('.ep-nav-burger') as HTMLElement;
    const header = canvasElement.querySelector('.ep-topnav') as HTMLElement;

    const links = [
      c.getByRole('link', { name: 'Beiträge' }), // Top-Level-Link ohne Submenü
      c.getByRole('link', { name: 'Leistungen' }), // Label-Link eines Items mit Submenü
    ];
    for (const link of links) {
      await userEvent.click(burger);
      await expect(header).toHaveClass('nav-open');
      await expect(burger).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(link);
      await expect(header).not.toHaveClass('nav-open');
      await expect(burger).toHaveAttribute('aria-expanded', 'false');
      await expect(burger).toHaveAttribute('aria-label', 'Menü öffnen');
    }
  },
};

export const LabelOhneZielSchliesstNichts: Story = {
  name: 'Label ohne Ziel schließt nichts',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Ein Platzhalter-Label (ohne href) navigiert nicht und lässt das offene Submenü stehen.
  play: async ({ canvasElement }) => {
    blockNavigation(canvasElement);
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Untermenü Leistungen' });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(c.getByRole('link', { name: 'Leistungen' }));
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  },
};

export const SucheBrichtHoverTimerAb: Story = {
  name: 'Suche bricht Hover-Timer ab',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Öffnen der Suche löscht einen laufenden Hover-Öffnen-Timer, sonst zöge er danach das
  // Submenü auf und schlösse die Suche.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', { name: 'Untermenü Leistungen' });
    const item = toggle.closest('.ep-nav-item') as HTMLElement;
    const search = c.getByRole('button', { name: 'Suche öffnen' });
    await userEvent.hover(item);
    await userEvent.click(search);
    await expect(search).toHaveAttribute('aria-expanded', 'true');
    // Sentinel (150 ms) ist nach einem übrig gebliebenen Öffnen-Timer (100 ms) fällig.
    await new Promise((r) => setTimeout(r, 150));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(search).toHaveAttribute('aria-expanded', 'true');
    await userEvent.unhover(item);
  },
};

export const IconStrichstaerke: Story = {
  name: 'Icon-Strichstärke',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Pinnt die Strichstärke der Chrome-Icons (Lucide, ADR-0016): bisher Heroicons-Outline mit
  // 1.5 (= --icon-stroke-md), Lucide-Default wäre 2. Die Komponente setzt CDS_ICON_STROKE
  // explizit; hier wird der WIRKSAME (berechnete) Wert geprüft, damit auch eine CSS-Regel,
  // die das Attribut überschreibt, auffiele. Dekorative Icons bleiben aria-hidden.
  // Caret: Lucide-Chevron mit absoluteStrokeWidth (1.5 px Bildschirmstrich bei 10 px Größe):
  // Lucide rechnet das Attribut auf 1.5 * 24 / 10 = 3.6 in der 24er-viewBox um.
  play: async ({ canvasElement }) => {
    const chrome = canvasElement.querySelectorAll<SVGElement>(
      '.ep-nav-burger svg, .ep-nav-icon-btn svg',
    );
    await expect(chrome.length).toBeGreaterThanOrEqual(3);
    for (const svg of Array.from(chrome)) {
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(parseFloat(getComputedStyle(svg).strokeWidth)).toBe(1.5);
    }

    const caret = canvasElement.querySelector('svg.ep-nav-item-caret') as SVGElement;
    await expect(caret).toHaveAttribute('aria-hidden', 'true');
    await expect(caret).toHaveAttribute('viewBox', '0 0 24 24');
    const stroke = parseFloat(getComputedStyle(caret).strokeWidth);
    await expect(stroke).toBeCloseTo(3.6, 5);
    await expect((stroke * 10) / 24).toBeCloseTo(1.5, 5);
  },
};
