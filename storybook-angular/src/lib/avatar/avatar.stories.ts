import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { AvatarComponent, AvatarStackComponent } from '@conciso/design-system-angular';

const meta: Meta<AvatarComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Avatar',
  component: AvatarComponent,
  decorators: [moduleMetadata({ imports: [AvatarComponent, AvatarStackComponent] })],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Initialen-/Foto-Kreis (`.article-avatar` + `-lg`/`-xl`, css/components.css:1520–1536). ' +
          'Attributselektor `div[cdsAvatar]`: der Konsument schreibt `<div cdsAvatar name="…">`, ' +
          '`.article-avatar` sitzt damit direkt auf dem Host, ohne Wrapper-Element dazwischen — ' +
          'notwendig, damit die Geschwister-Kette `.article-avatar-stack .article-avatar + ' +
          '.article-avatar` (css/components.css:1540–1541) im Stapel greift (siehe „Avatar-Stapel“), ' +
          'und weil derselbe Attributname zugleich als Projektions-Selektor in `cds-article-header` ' +
          'dient. Initialen kommen aus `name` (`computed()`), kein eigener Input. `cds-avatar-stack` ' +
          'bündelt mehrere `div[cdsAvatar]` mit Überlappung und optionalem „+N“-Indikator ' +
          '(`.article-avatar-more`) ab vier Personen.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<AvatarComponent>;

export const AvatarGroessen: Story = {
  name: 'Avatar-Größen',
  render: () => ({
    template: `
      <div style="display:flex;align-items:flex-end;gap:24px">
        <div cdsAvatar name="Lukas Brandt" area="ki"></div>
        <div cdsAvatar name="Maria Müller" area="es" size="lg"></div>
        <div cdsAvatar name="Sophie Klein" area="wo" size="xl"></div>
      </div>
    `,
  }),
  // Akzeptanzkriterium: Initialen stimmen mit name überein — für alle drei Größen einzeln
  // geprüft, dazu die tatsächlich gerenderte Breite je Stufe (40/64/160px, css/components.css:
  // 1521,1527,1531), gemessen statt angenommen.
  play: async ({ canvasElement }) => {
    const avatars = Array.from(canvasElement.querySelectorAll('[cdsAvatar]')) as HTMLElement[];
    await expect(avatars).toHaveLength(3);

    await expect(avatars[0]).toHaveTextContent('LB');
    await expect(avatars[0]).not.toHaveClass('article-avatar-lg');
    await expect(avatars[0]).not.toHaveClass('article-avatar-xl');

    await expect(avatars[1]).toHaveTextContent('MM');
    await expect(avatars[1]).toHaveClass('article-avatar-lg');

    await expect(avatars[2]).toHaveTextContent('SK');
    await expect(avatars[2]).toHaveClass('article-avatar-xl');

    const [sm, lg, xl] = avatars.map((a) => a.getBoundingClientRect());
    await expect(Math.round(sm.width)).toBe(40);
    await expect(Math.round(lg.width)).toBe(64);
    await expect(Math.round(xl.width)).toBe(160);
  },
};

export const AvatarOhneBild: Story = {
  name: 'Avatar ohne Bild',
  render: () => ({
    template: `<div cdsAvatar name="Anna Rieth" area="es"></div>`,
  }),
  // Akzeptanzkriterium: Initialen stimmen mit name überein, kein <img> ohne src.
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[cdsAvatar]') as HTMLElement;
    await expect(avatar).toHaveTextContent('AR');
    await expect(avatar.querySelector('img')).toBeNull();
    await expect(avatar).toHaveAttribute('aria-hidden', 'true');
  },
};

// Portrait-Platzhalter als Inline-SVG-Data-URI, kein externes Netzwerkbild: storybook-angular
// mountet nur assets/brand als Static-Dir (siehe stoerer.stories.ts, dieselbe Begründung), und
// ein Bild von einem externen Host lädt im sandboxed Testlauf ohnehin nicht zuverlässig — beim
// ersten Anlauf mit einer externen Test-URL blieb im Screenshot nur die leere data-area-Füllfarbe
// sichtbar, ohne dass die Play-Funktion (die nur das <img>-Element und sein alt prüft, nicht das
// geladene Bild) das bemerkt hätte. Abstrakte Silhouette, kein echtes Porträt (CONTRIBUTING §6/§9:
// keine erfundene Personendarstellung).
const avatarPlaceholder =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%3E%3Crect%20width='128'%20height='128'%20fill='%23C9AF8A'/%3E%3Ccircle%20cx='64'%20cy='50'%20r='24'%20fill='%236B4A34'/%3E%3Cellipse%20cx='64'%20cy='118'%20rx='40'%20ry='34'%20fill='%236B4A34'/%3E%3C/svg%3E";

export const AvatarMitBild: Story = {
  name: 'Avatar mit Bild',
  render: () => ({
    template: `<div cdsAvatar name="Daniel Herzog" area="wo" [src]="src"></div>`,
    props: { src: avatarPlaceholder },
  }),
  // src gesetzt → <img> ersetzt die Initialen, alt kommt aus name (Ticket-Vorgabe).
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[cdsAvatar]') as HTMLElement;
    const img = avatar.querySelector('img') as HTMLImageElement;
    await expect(img).not.toBeNull();
    await expect(img).toHaveAttribute('alt', 'Daniel Herzog');
    await expect(avatar).not.toHaveTextContent('DH');
  },
};

export const AvatarStapel: Story = {
  name: 'Avatar-Stapel',
  render: () => ({
    template: `
      <cds-avatar-stack [more]="2">
        <div cdsAvatar name="Paul Meinhardt" area="es"></div>
        <div cdsAvatar name="Anna Rieth" area="es"></div>
        <div cdsAvatar name="Daniel Herzog" area="es"></div>
      </cds-avatar-stack>
    `,
  }),
  // Akzeptanzkriterium: der Avatar-Stapel überlappt. Selektor-Entscheidung ADR-0008: mit
  // div[cdsAvatar] (statt eines Element-Selektors, der .article-avatar auf ein inneres Element
  // legt) bleiben die drei Avatare direkte, adjazente DOM-Geschwister — Voraussetzung für den
  // CSS-Geschwister-Selektor .article-avatar-stack .article-avatar + .article-avatar
  // (css/components.css:1540). Gemessen an getBoundingClientRect() UND an der Screenshot-Baseline
  // dieser Story (visual-snapshots/…avatar-stapel.png), nicht an Computed Styles allein (ADR-0008,
  // Fall 2: getComputedStyle/getBoundingClientRect/axe haben dort geschlossen dasselbe Falsche
  // behauptet).
  play: async ({ canvasElement }) => {
    const stack = canvasElement.querySelector('cds-avatar-stack') as HTMLElement;
    await expect(stack).toHaveAttribute('aria-hidden', 'true');

    const avatars = Array.from(canvasElement.querySelectorAll('.article-avatar')) as HTMLElement[];
    await expect(avatars).toHaveLength(3);
    const rects = avatars.map((a) => a.getBoundingClientRect());

    // 40px Kachelbreite, margin-left:-12px ab dem zweiten Avatar (css/components.css:1541) →
    // Abstand der linken Kanten = 40 - 12 = 28px. Ohne Überlappung wären es 40px.
    await expect(Math.round(rects[1].left - rects[0].left)).toBe(28);
    await expect(Math.round(rects[2].left - rects[1].left)).toBe(28);
    // Überlappung explizit als Flächenüberdeckung: die linke Kante des nächsten Avatars liegt
    // VOR der rechten Kante des vorherigen (28px < 40px Breite).
    await expect(rects[1].left).toBeLessThan(rects[0].right);
    await expect(rects[2].left).toBeLessThan(rects[1].right);

    const more = canvasElement.querySelector('.article-avatar-more') as HTMLElement;
    await expect(more).toHaveTextContent('+2');
    const moreRect = more.getBoundingClientRect();
    await expect(Math.round(moreRect.left - rects[2].left)).toBe(28);
  },
};
