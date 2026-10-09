import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{i as t,t as n}from"./dist-CMu91nUe.js";import{n as r,t as i}from"./avatar.component-u-QYXkLM.js";import{n as a,t as o}from"./avatar-stack.component-Cj9aQ9Rq.js";var s,c,l,u,d,f,p,m;function init_avatar_stories(){return(init_avatar_stories=e((()=>{n(),r(),a(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={title:`Seitenmuster/Wissensbeitrag/Avatar`,component:i,decorators:[t({imports:[i,o]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3753`},layout:`padded`,docs:{description:{component:'Initialen-/Foto-Kreis (`.article-avatar` + `-lg`/`-xl`, css/components.css:1520 bis 1536). Attributselektor `div[cdsAvatar]`: der Konsument schreibt `<div cdsAvatar name="…">`, `.article-avatar` sitzt damit direkt auf dem Host, ohne Wrapper-Element dazwischen, notwendig, damit die Geschwister-Kette `.article-avatar-stack .article-avatar + .article-avatar` (css/components.css:1540 bis 1541) im Stapel greift (siehe „Avatar-Stapel“), und weil derselbe Attributname zugleich als Projektions-Selektor in `cds-article-header` dient. Initialen kommen aus `name` (`computed()`), kein eigener Input. `cds-avatar-stack` bündelt mehrere `div[cdsAvatar]` mit Überlappung und optionalem „+N“-Indikator (`.article-avatar-more`) ab vier Personen.'}}}},l={name:`Avatar-Größen`,render:()=>({template:`
      <div style="display:flex;align-items:flex-end;gap:24px">
        <div cdsAvatar name="Lukas Brandt" area="ki"></div>
        <div cdsAvatar name="Maria Müller" area="es" size="lg"></div>
        <div cdsAvatar name="Sophie Klein" area="wo" size="xl"></div>
      </div>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`[cdsAvatar]`));await s(t).toHaveLength(3),await s(t[0]).toHaveTextContent(`LB`),await s(t[0]).not.toHaveClass(`article-avatar-lg`),await s(t[0]).not.toHaveClass(`article-avatar-xl`),await s(t[1]).toHaveTextContent(`MM`),await s(t[1]).toHaveClass(`article-avatar-lg`),await s(t[2]).toHaveTextContent(`SK`),await s(t[2]).toHaveClass(`article-avatar-xl`);let[n,r,i]=t.map(e=>e.getBoundingClientRect());await s(Math.round(n.width)).toBe(40),await s(Math.round(r.width)).toBe(64),await s(Math.round(i.width)).toBe(160)}},u={name:`Avatar ohne Bild`,render:()=>({template:`<div cdsAvatar name="Anna Rieth" area="es"></div>`}),play:async({canvasElement:e})=>{let t=e.querySelector(`[cdsAvatar]`);await s(t).toHaveTextContent(`AR`),await s(t.querySelector(`img`)).toBeNull(),await s(t).toHaveAttribute(`aria-hidden`,`true`)}},d=`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%3E%3Crect%20width='128'%20height='128'%20fill='%23C9AF8A'/%3E%3Ccircle%20cx='64'%20cy='50'%20r='24'%20fill='%236B4A34'/%3E%3Cellipse%20cx='64'%20cy='118'%20rx='40'%20ry='34'%20fill='%236B4A34'/%3E%3C/svg%3E`,f={name:`Avatar mit Bild`,render:()=>({template:`<div cdsAvatar name="Daniel Herzog" area="wo" [src]="src"></div>`,props:{src:d}}),play:async({canvasElement:e})=>{let t=e.querySelector(`[cdsAvatar]`),n=t.querySelector(`img`);await s(n).not.toBeNull(),await s(n).toHaveAttribute(`alt`,`Daniel Herzog`),await s(t).not.toHaveTextContent(`DH`)}},p={name:`Avatar-Stapel`,parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-741`}},render:()=>({template:`
      <cds-avatar-stack [more]="2">
        <div cdsAvatar name="Paul Meinhardt" area="es"></div>
        <div cdsAvatar name="Anna Rieth" area="es"></div>
        <div cdsAvatar name="Daniel Herzog" area="es"></div>
      </cds-avatar-stack>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`cds-avatar-stack`);await s(t).toHaveAttribute(`aria-hidden`,`true`);let n=Array.from(e.querySelectorAll(`.article-avatar`));await s(n).toHaveLength(3);let r=n.map(e=>e.getBoundingClientRect());await s(Math.round(r[1].left-r[0].left)).toBe(28),await s(Math.round(r[2].left-r[1].left)).toBe(28),await s(r[1].left).toBeLessThan(r[0].right),await s(r[2].left).toBeLessThan(r[1].right);let i=e.querySelector(`.article-avatar-more`);await s(i).toHaveTextContent(`+2`);let a=i.getBoundingClientRect();await s(Math.round(a.left-r[2].left)).toBe(28)}},m=[`AvatarGroessen`,`AvatarOhneBild`,`AvatarMitBild`,`AvatarStapel`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Avatar-Größen',
  render: () => ({
    template: \`
      <div style="display:flex;align-items:flex-end;gap:24px">
        <div cdsAvatar name="Lukas Brandt" area="ki"></div>
        <div cdsAvatar name="Maria Müller" area="es" size="lg"></div>
        <div cdsAvatar name="Sophie Klein" area="wo" size="xl"></div>
      </div>
    \`
  }),
  // Akzeptanzkriterium: Initialen stimmen mit name überein — für alle drei Größen einzeln
  // geprüft, dazu die tatsächlich gerenderte Breite je Stufe (40/64/160px, css/components.css:
  // 1521,1527,1531), gemessen statt angenommen.
  play: async ({
    canvasElement
  }) => {
    const avatars = Array.from(canvasElement.querySelectorAll('[cdsAvatar]')) as HTMLElement[];
    await expect(avatars).toHaveLength(3);
    await expect(avatars[0]).toHaveTextContent('LB');
    await expect(avatars[0]).not.toHaveClass('article-avatar-lg');
    await expect(avatars[0]).not.toHaveClass('article-avatar-xl');
    await expect(avatars[1]).toHaveTextContent('MM');
    await expect(avatars[1]).toHaveClass('article-avatar-lg');
    await expect(avatars[2]).toHaveTextContent('SK');
    await expect(avatars[2]).toHaveClass('article-avatar-xl');
    const [sm, lg, xl] = avatars.map(a => a.getBoundingClientRect());
    await expect(Math.round(sm.width)).toBe(40);
    await expect(Math.round(lg.width)).toBe(64);
    await expect(Math.round(xl.width)).toBe(160);
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Avatar ohne Bild',
  render: () => ({
    template: \`<div cdsAvatar name="Anna Rieth" area="es"></div>\`
  }),
  // Akzeptanzkriterium: Initialen stimmen mit name überein, kein <img> ohne src.
  play: async ({
    canvasElement
  }) => {
    const avatar = canvasElement.querySelector('[cdsAvatar]') as HTMLElement;
    await expect(avatar).toHaveTextContent('AR');
    await expect(avatar.querySelector('img')).toBeNull();
    await expect(avatar).toHaveAttribute('aria-hidden', 'true');
  }
}`,...u.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Avatar mit Bild',
  render: () => ({
    template: \`<div cdsAvatar name="Daniel Herzog" area="wo" [src]="src"></div>\`,
    props: {
      src: avatarPlaceholder
    }
  }),
  // src gesetzt → <img> ersetzt die Initialen, alt kommt aus name.
  play: async ({
    canvasElement
  }) => {
    const avatar = canvasElement.querySelector('[cdsAvatar]') as HTMLElement;
    const img = avatar.querySelector('img') as HTMLImageElement;
    await expect(img).not.toBeNull();
    await expect(img).toHaveAttribute('alt', 'Daniel Herzog');
    await expect(avatar).not.toHaveTextContent('DH');
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Avatar-Stapel',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-741'
    }
  },
  render: () => ({
    template: \`
      <cds-avatar-stack [more]="2">
        <div cdsAvatar name="Paul Meinhardt" area="es"></div>
        <div cdsAvatar name="Anna Rieth" area="es"></div>
        <div cdsAvatar name="Daniel Herzog" area="es"></div>
      </cds-avatar-stack>
    \`
  }),
  // Akzeptanzkriterium: der Avatar-Stapel überlappt. Selektor-Entscheidung ADR-0008: mit
  // div[cdsAvatar] (statt eines Element-Selektors, der .article-avatar auf ein inneres Element
  // legt) bleiben die drei Avatare direkte, adjazente DOM-Geschwister — Voraussetzung für den
  // CSS-Geschwister-Selektor .article-avatar-stack .article-avatar + .article-avatar
  // (css/components.css:1540). Gemessen an getBoundingClientRect() UND an der Screenshot-Baseline
  // dieser Story (visual-snapshots/…avatar-stapel.png), nicht an Computed Styles allein (ADR-0008,
  // Fall 2: getComputedStyle/getBoundingClientRect/axe haben dort geschlossen dasselbe Falsche
  // behauptet).
  play: async ({
    canvasElement
  }) => {
    const stack = canvasElement.querySelector('cds-avatar-stack') as HTMLElement;
    await expect(stack).toHaveAttribute('aria-hidden', 'true');
    const avatars = Array.from(canvasElement.querySelectorAll('.article-avatar')) as HTMLElement[];
    await expect(avatars).toHaveLength(3);
    const rects = avatars.map(a => a.getBoundingClientRect());

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
  }
}`,...p.parameters?.docs?.source}}}})))()}init_avatar_stories();export{l as AvatarGroessen,f as AvatarMitBild,u as AvatarOhneBild,p as AvatarStapel,m as __namedExportsOrder,c as default};