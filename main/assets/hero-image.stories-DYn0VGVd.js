import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{n,t as r}from"./hero-image.component-pITPhncG.js";import{n as i,t as a}from"./platzhalter-Djsxs5M2.js";var o=t({AlsSprungziel:()=>g,BeitragsHero:()=>m,Bildausschnitt:()=>h,Interaktiv:()=>f,OhneCaption:()=>p,__namedExportsOrder:()=>_,default:()=>d}),s,c,l,u,d,f,p,m,h,g,_;function init_hero_image_stories(){return(init_hero_image_stories=e((()=>{n(),a(),{within:s,expect:c}=__STORYBOOK_MODULE_TEST__,l=i(`Bildfläche · 21:9`,1600,686),u=`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='720'%20height='1080'%3E%3Crect%20width='720'%20height='360'%20fill='%23F4B183'/%3E%3Crect%20y='360'%20width='720'%20height='360'%20fill='%239DC3E6'/%3E%3Crect%20y='720'%20width='720'%20height='360'%20fill='%23A9D18E'/%3E%3Ctext%20x='360'%20y='180'%20font-family='sans-serif'%20font-size='48'%20fill='%23543310'%20text-anchor='middle'%20dominant-baseline='middle'%3EKopf%3C/text%3E%3Ctext%20x='360'%20y='540'%20font-family='sans-serif'%20font-size='48'%20fill='%231B3A57'%20text-anchor='middle'%20dominant-baseline='middle'%3EMitte%3C/text%3E%3Ctext%20x='360'%20y='900'%20font-family='sans-serif'%20font-size='48'%20fill='%23274B1E'%20text-anchor='middle'%20dominant-baseline='middle'%3EFu%C3%9F%3C/text%3E%3C/svg%3E`,d={title:`Komponenten/Hero/Hero-Bild`,component:r,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3978`},layout:`fullscreen`,docs:{description:{component:"Vollbreites, randloses `<figure>` im 21:9-Format (`.hero-image`) mit optionaler Caption als Gradient-Overlay aus Eyebrow, Titel und Text. Bleiben alle drei Textteile leer, entfällt das `<figcaption>` vollständig statt leer zu rendern (Variante „Hero ohne Caption“ eines Beitrags-Heros). Der Bildausschnitt (`objectPosition`) landet als Inline-Style direkt am `<img>`, weil er eine Eigenschaft des konkreten Bildes ist, nicht der Seite."}}},argTypes:{headingLevel:{control:`inline-radio`,options:[1,2]}},args:{src:l,alt:`Conciso-Team geht gemeinsam über ein sonniges Industriegelände`,eyebrow:`Seit 2016 · Dortmund`,heading:`Klare Köpfe. Ruhige Energie.`,text:`KI, Software und Organisationsentwicklung aus Dortmund.`,headingLevel:1,eager:!0,objectPosition:``}},f={render:e=>({props:e,template:`
      <cds-hero-image
        [src]="src"
        [alt]="alt"
        [eyebrow]="eyebrow"
        [heading]="heading"
        [text]="text"
        [headingLevel]="headingLevel"
        [eager]="eager"
        [objectPosition]="objectPosition"
      ></cds-hero-image>
    `}),play:async({canvasElement:e})=>{let t=s(e);await c(t.getByRole(`img`,{name:`Conciso-Team geht gemeinsam über ein sonniges Industriegelände`})).toBeInTheDocument(),await c(t.getByRole(`heading`,{level:1,name:`Klare Köpfe. Ruhige Energie.`})).toBeInTheDocument()}},p={name:`Ohne Caption`,parameters:{controls:{disable:!0}},args:{eyebrow:``,heading:``,text:``},render:e=>({props:e,template:`<cds-hero-image [src]="src" [alt]="alt"></cds-hero-image>`}),play:async({canvasElement:e})=>{let t=s(e);await c(e.querySelector(`figcaption`)).toBeNull(),await c(t.getByRole(`img`,{name:`Conciso-Team geht gemeinsam über ein sonniges Industriegelände`})).toBeInTheDocument()}},m={name:`Beitrags-Hero (h2)`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <h1 style="font:var(--ty-headline-md);margin:0 0 var(--s4)">Warum 60 % der KI-Piloten nie in Produktion gehen</h1>
      <cds-hero-image
        src="${l}"
        alt="Whiteboard mit handgezeichneter Matrix der Achsen AI Value und AI Readiness"
        eyebrow="8 min Lesezeit"
        heading="Readiness statt Begeisterung"
        text="Was 200 KI-Implementierungen über den Weg in die Produktion zeigen."
        [headingLevel]="2"
      ></cds-hero-image>
    `}),play:async({canvasElement:e})=>{let t=s(e);await c(t.getByRole(`heading`,{level:1})).toBeInTheDocument(),await c(t.getByRole(`heading`,{level:2,name:`Readiness statt Begeisterung`})).toBeInTheDocument()}},h={parameters:{controls:{disable:!0}},render:()=>({template:`
      <p style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--tx-muted);margin:var(--s4) var(--s6) var(--s1)">Ohne objectPosition (Default: center center)</p>
      <cds-hero-image
        src="${u}"
        alt="Testbild mit drei Banden Kopf, Mitte, Fuß, ohne gesetzten Bildausschnitt"
      ></cds-hero-image>
      <p style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--tx-muted);margin:var(--s6) var(--s6) var(--s1)">Mit objectPosition="center 10%"</p>
      <cds-hero-image
        src="${u}"
        alt="Dasselbe Testbild mit Bildausschnitt auf die obere Bande"
        objectPosition="center 10%"
      ></cds-hero-image>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`.hero-image-media img`);await c(t).toHaveLength(2),await c(t[0].style.objectPosition).toBe(``),await c(t[1].style.objectPosition).toBe(`center 10%`)}},g={name:`Als Sprungziel`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({template:`
      <a href="#hauptinhalt">Zum Inhalt springen</a>
      <cds-hero-image
        id="hauptinhalt"
        tabindex="-1"
        src="${l}"
        alt="Conciso-Team geht gemeinsam über ein sonniges Industriegelände"
      ></cds-hero-image>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`#hauptinhalt`),n=t.querySelector(`figure`);await c(getComputedStyle(t).display).toBe(`block`),t.focus(),await c(document.activeElement).toBe(t);let r=t.getBoundingClientRect(),i=n.getBoundingClientRect();await c(r.height).toBeGreaterThan(0),await c(r.top).toBe(i.top),await c(r.height).toBe(i.height)}},_=[`Interaktiv`,`OhneCaption`,`BeitragsHero`,`Bildausschnitt`,`AlsSprungziel`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <cds-hero-image
        [src]="src"
        [alt]="alt"
        [eyebrow]="eyebrow"
        [heading]="heading"
        [text]="text"
        [headingLevel]="headingLevel"
        [eager]="eager"
        [objectPosition]="objectPosition"
      ></cds-hero-image>
    \`
  }),
  // Zwei Entscheidungen gepinnt: alt landet als zugänglicher Name am <img> (nicht
  // nur als Attribut irgendwo im Markup), und der Caption-Titel rendert bei
  // Default-headingLevel als echtes <h1>.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.getByRole('img', {
      name: 'Conciso-Team geht gemeinsam über ein sonniges Industriegelände'
    })).toBeInTheDocument();
    await expect(c.getByRole('heading', {
      level: 1,
      name: 'Klare Köpfe. Ruhige Energie.'
    })).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Caption',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    eyebrow: '',
    heading: '',
    text: ''
  },
  render: args => ({
    props: args,
    template: \`<cds-hero-image [src]="src" [alt]="alt"></cds-hero-image>\`
  }),
  // Entscheidung 1 gepinnt: ohne Eyebrow/Titel/Text entsteht kein <figcaption> —
  // das Bild rendert trotzdem vollständig, mit seinem alt-Text als zugänglichem Namen.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement.querySelector('figcaption')).toBeNull();
    await expect(c.getByRole('img', {
      name: 'Conciso-Team geht gemeinsam über ein sonniges Industriegelände'
    })).toBeInTheDocument();
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Beitrags-Hero (h2)',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Beitrags-Heros sitzen unter einem Article-Header, der bereits ein eigenes
  // <h1> trägt (.article-title) — hier als externes <h1> nachgestellt, damit die
  // Story dieselbe Ausgangslage wie im Wissensbeitrag zeigt.
  render: () => ({
    template: \`
      <h1 style="font:var(--ty-headline-md);margin:0 0 var(--s4)">Warum 60 % der KI-Piloten nie in Produktion gehen</h1>
      <cds-hero-image
        src="\${heroPlaceholder}"
        alt="Whiteboard mit handgezeichneter Matrix der Achsen AI Value und AI Readiness"
        eyebrow="8 min Lesezeit"
        heading="Readiness statt Begeisterung"
        text="Was 200 KI-Implementierungen über den Weg in die Produktion zeigen."
        [headingLevel]="2"
      ></cds-hero-image>
    \`
  }),
  // Entscheidung 2 gepinnt: unter einem eigenen <h1> rendert der Caption-Titel als
  // <h2>, es entsteht keine zweite Top-Überschrift auf derselben Seite.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.getByRole('heading', {
      level: 1
    })).toBeInTheDocument();
    await expect(c.getByRole('heading', {
      level: 2,
      name: 'Readiness statt Begeisterung'
    })).toBeInTheDocument();
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  // Zwei Instanzen desselben hochformatigen Platzhalters direkt untereinander:
  // links/oben ohne objectPosition (Browser-Default \`center center\`, beschneidet
  // hier auf die mittlere Bande), darunter mit \`center 10%\` (beschneidet auf die
  // obere Bande). Der Unterschied ist damit im selben Screenshot sichtbar, nicht
  // nur im DOM behauptet.
  render: () => ({
    template: \`
      <p style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--tx-muted);margin:var(--s4) var(--s6) var(--s1)">Ohne objectPosition (Default: center center)</p>
      <cds-hero-image
        src="\${portraitPlaceholder}"
        alt="Testbild mit drei Banden Kopf, Mitte, Fuß, ohne gesetzten Bildausschnitt"
      ></cds-hero-image>
      <p style="font:var(--ty-label-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--tx-muted);margin:var(--s6) var(--s6) var(--s1)">Mit objectPosition="center 10%"</p>
      <cds-hero-image
        src="\${portraitPlaceholder}"
        alt="Dasselbe Testbild mit Bildausschnitt auf die obere Bande"
        objectPosition="center 10%"
      ></cds-hero-image>
    \`
  }),
  // Entscheidung 3 gepinnt: object-position landet als Inline-Style direkt am
  // <img>, nicht als Klasse — die CSS-Schicht hat dafür keinen Modifier. Beide
  // Bilder bekommen den erwarteten (unterschiedlichen) Style-Wert; welche Bande
  // dadurch sichtbar wird, zeigt der Screenshot.
  play: async ({
    canvasElement
  }) => {
    const images = canvasElement.querySelectorAll<HTMLImageElement>('.hero-image-media img');
    await expect(images).toHaveLength(2);
    await expect(images[0].style.objectPosition).toBe('');
    await expect(images[1].style.objectPosition).toBe('center 10%');
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Als Sprungziel',
  // Kein eigener Screenshot: Die Story sieht aus wie „Ohne Caption“, geprüft wird
  // hier nur die Box des Hosts.
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  render: () => ({
    template: \`
      <a href="#hauptinhalt">Zum Inhalt springen</a>
      <cds-hero-image
        id="hauptinhalt"
        tabindex="-1"
        src="\${heroPlaceholder}"
        alt="Conciso-Team geht gemeinsam über ein sonniges Industriegelände"
      ></cds-hero-image>
    \`
  }),
  // Entscheidung 4 gepinnt: id und tabindex sitzen am Host, und der Host ist ein
  // Block mit derselben Box wie das gerenderte <figure>. Als Inline-Element hätte
  // er keine eigene Box, Fokus und Scroll-Position des Skip-Links liefen ins Leere.
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector<HTMLElement>('#hauptinhalt')!;
    const figure = host.querySelector('figure')!;
    await expect(getComputedStyle(host).display).toBe('block');
    host.focus();
    await expect(document.activeElement).toBe(host);
    const hostBox = host.getBoundingClientRect();
    const figureBox = figure.getBoundingClientRect();
    await expect(hostBox.height).toBeGreaterThan(0);
    await expect(hostBox.top).toBe(figureBox.top);
    await expect(hostBox.height).toBe(figureBox.height);
  }
}`,...g.parameters?.docs?.source}}}})))()}export{init_hero_image_stories as n,o as t};