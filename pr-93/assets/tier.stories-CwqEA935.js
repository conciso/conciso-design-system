import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";import{a as c,o as l}from"./theme-mode-Bj97f4cM.js";var u;function init_tier_component(){return(init_tier_component=e((()=>{i(),a(),u=class TierComponent{label=t.required();area=t();static propDecorators={label:[{type:o,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],area:[{type:o,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},u=s([n({selector:`cds-tier`,changeDetection:r.OnPush,host:{class:`ep-tier`},template:`
    <span class="ep-tier-label" [attr.data-area]="area() || null">{{ label() }}</span>
    <span class="ep-tier-rule" aria-hidden="true"></span>
  `})],u)})))()}function resolveColor(e,t){let n=document.createElement(`span`);n.style.color=`var(${t})`,e.appendChild(n);let r=getComputedStyle(n).color;return n.remove(),r}var d,f,p,m,h,g,_;function init_tier_stories(){return(init_tier_stories=e((()=>{init_tier_component(),c(),{expect:d}=__STORYBOOK_MODULE_TEST__,f={title:`Komponenten/Cards & Teaser/Tier-Trenner`,component:u,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3383`},layout:`padded`,docs:{description:{component:'Stufen-Trenner aus Label und Haarlinie (`.ep-tier`, css/components.css:1381 bis 1384), der eine Offene Feature-Liste in Pakete gliedert, z. B. „In jedem Paket enthalten“ vor „Zusätzlich mit Pro“. Element-Selektor `cds-tier` (ADR-0008-Standardfall, siehe Klassendoku): keines der 4 Mockup-Vorkommen sitzt in einem Grid/Flex, das seine Kinder streckt, keines trägt eine `col-*`-Klasse, das Tag variiert nicht. `area` nimmt alle vier Markenbereiche (`co`, `ki`, `es`, `wo`) und tönt das Label in der Bereichsfarbe, theme-fähig; ohne `area` bleibt es neutral. `.ep-tier-rule` ist rein dekorativ und trägt `aria-hidden="true"`.'}}},args:{label:`In jedem Paket enthalten`}},p={render:e=>({props:e,template:`<cds-tier [label]="label" [area]="area"></cds-tier>`}),play:async({canvasElement:e})=>{let t=e.querySelector(`cds-tier`);await d(t).toHaveClass(`ep-tier`);let n=e.querySelector(`.ep-tier-label`);await d(n).toHaveTextContent(`In jedem Paket enthalten`),await d(n).not.toHaveAttribute(`data-area`);let r=e.querySelector(`.ep-tier-rule`);await d(r).toHaveAttribute(`aria-hidden`,`true`)}},m={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[u]},template:`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-tier label="In jedem Paket enthalten"></cds-tier>
        <cds-tier label="Zusätzlich mit Pro" area="ki"></cds-tier>
      </div>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`.ep-tier-label`));await d(t).toHaveLength(2);let[n,r]=t;await d(n).not.toHaveAttribute(`data-area`),await d(r).toHaveAttribute(`data-area`,`ki`);let i=getComputedStyle(n).color,a=getComputedStyle(r).color;await d(a).not.toBe(i)}},h=[`co`,`ki`,`es`,`wo`],g={name:`Alle Bereiche`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[u]},template:`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-tier label="Neutral"></cds-tier>
        <cds-tier label="Corporate" area="co"></cds-tier>
        <cds-tier label="AI.Applied" area="ki"></cds-tier>
        <cds-tier label="Effektive Software" area="es"></cds-tier>
        <cds-tier label="Wirksame Organisationen" area="wo"></cds-tier>
      </div>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`.ep-tier-label`));await d(t).toHaveLength(5);let[n,...r]=t;await d(n).not.toHaveAttribute(`data-area`);let i=l.mode();try{for(let e of[`light`,`dark`]){l.set(e);let t=new Set;for(let[e,i]of r.entries()){let r=h[e];await d(i).toHaveAttribute(`data-area`,r);let a=getComputedStyle(i).color;r!==`ki`&&await d(a).toBe(resolveColor(i,`--${r}-ink`)),await d(a).not.toBe(getComputedStyle(n).color),t.add(a)}await d(t.size).toBe(4)}}finally{l.set(i)}}},_=[`Interaktiv`,`ProBereich`,`AlleBereiche`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`<cds-tier [label]="label" [area]="area"></cds-tier>\`
  }),
  // .ep-tier sitzt direkt auf dem Host (Element-Selektor, kein inneres Wrapper-Div,
  // siehe Klassendoku). Ungesetztes area (Default) schreibt kein data-area.
  play: async ({
    canvasElement
  }) => {
    const tier = canvasElement.querySelector('cds-tier') as HTMLElement;
    await expect(tier).toHaveClass('ep-tier');
    const label = canvasElement.querySelector('.ep-tier-label') as HTMLElement;
    await expect(label).toHaveTextContent('In jedem Paket enthalten');
    await expect(label).not.toHaveAttribute('data-area');
    const rule = canvasElement.querySelector('.ep-tier-rule');
    await expect(rule).toHaveAttribute('aria-hidden', 'true');
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Ein neutraler Trenner vor den Kern-Funktionen, ein ki-getönter vor den
  // Pro-Funktionen: der getönte Trenner unterscheidet sich sichtbar vom neutralen.
  render: () => ({
    moduleMetadata: {
      imports: [TierComponent]
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-tier label="In jedem Paket enthalten"></cds-tier>
        <cds-tier label="Zusätzlich mit Pro" area="ki"></cds-tier>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const labels = Array.from(canvasElement.querySelectorAll('.ep-tier-label')) as HTMLElement[];
    await expect(labels).toHaveLength(2);
    const [core, pro] = labels;
    await expect(core).not.toHaveAttribute('data-area');
    await expect(pro).toHaveAttribute('data-area', 'ki');
    const coreColor = getComputedStyle(core).color;
    const proColor = getComputedStyle(pro).color;
    await expect(proColor).not.toBe(coreColor);
  }
}`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Alle Bereiche',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Das Stufen-Label ist area-aware: jeder Bereich schreibt data-area und tönt das Label
  // in seiner Bereichsfarbe, in Hell und Dunkel. Ohne area bleibt es neutral.
  render: () => ({
    moduleMetadata: {
      imports: [TierComponent]
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <cds-tier label="Neutral"></cds-tier>
        <cds-tier label="Corporate" area="co"></cds-tier>
        <cds-tier label="AI.Applied" area="ki"></cds-tier>
        <cds-tier label="Effektive Software" area="es"></cds-tier>
        <cds-tier label="Wirksame Organisationen" area="wo"></cds-tier>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const labels = Array.from(canvasElement.querySelectorAll('.ep-tier-label')) as HTMLElement[];
    await expect(labels).toHaveLength(5);
    const [neutral, ...tinted] = labels;
    await expect(neutral).not.toHaveAttribute('data-area');
    const previousMode = themeStore.mode();
    try {
      for (const theme of ['light', 'dark'] as const) {
        themeStore.set(theme);
        const colors = new Set<string>();
        for (const [i, label] of tinted.entries()) {
          const area = AREAS[i];
          await expect(label).toHaveAttribute('data-area', area);
          const color = getComputedStyle(label).color;
          // Bereichsfarbe = der themeabhängige Akzenttext-Ton des Bereichs, nicht neutral.
          if (area !== 'ki') {
            await expect(color).toBe(resolveColor(label, \`--\${area}-ink\`));
          }
          await expect(color).not.toBe(getComputedStyle(neutral).color);
          colors.add(color);
        }
        await expect(colors.size).toBe(4);
      }
    } finally {
      themeStore.set(previousMode);
    }
  }
}`,...g.parameters?.docs?.source}}}})))()}init_tier_stories();export{g as AlleBereiche,p as Interaktiv,m as ProBereich,_ as __namedExportsOrder,f as default};