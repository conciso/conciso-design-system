import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,H as i,Kt as a,O as o,Tn as s,bn as c,z as l}from"./angular-platform-BGeCprOl.js";var u;function init_icon_card_component(){return(init_icon_card_component=e((()=>{s(),n(),u=class IconCardComponent{elementRef=a(i);title=o.required();text=o.required();eyebrow=o(``);area=o();ctaLabel=o(``);isLink(){let e=this.elementRef.nativeElement;return e.tagName===`A`&&e.hasAttribute(`href`)}static propDecorators={title:[{type:r,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],text:[{type:r,args:[{isSignal:!0,alias:`text`,required:!0,transform:void 0}]}],eyebrow:[{type:r,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],ctaLabel:[{type:r,args:[{isSignal:!0,alias:`ctaLabel`,required:!1,transform:void 0}]}]}},u=c([t({selector:`a[cdsIconCard], div[cdsIconCard]`,changeDetection:l.OnPush,host:{class:`ep-card`,"[class.ep-card-link]":`isLink()`,"[attr.data-area]":`area() || null`,"[attr.title]":`null`},template:`
    <div class="ep-card-icon" [attr.data-area]="area() || null">
      <ng-content select="[cdsIcon]"></ng-content>
    </div>
    @if (eyebrow()) {
      <p class="ep-card-eyebrow" [attr.data-area]="area() || null">{{ eyebrow() }}</p>
    }
    <h3 class="ep-card-title">{{ title() }}</h3>
    <p class="ep-card-text">{{ text() }}</p>
    @if (ctaLabel()) {
      <div class="ep-card-cta">{{ ctaLabel() }} <span aria-hidden="true">→</span></div>
    }
  `})],u)})))()}var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;function init_icon_card_stories(){return(init_icon_card_stories=e((()=>{init_icon_card_component(),{within:d,userEvent:f,expect:p}=__STORYBOOK_MODULE_TEST__,m=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--co-700)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>`,h=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--ki-800)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /><path d="m16 9-5.5 5.5L8 12" /></svg>`,g=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--es-700)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>`,_=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="var(--wo-700)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 2v3" /><path d="M16 2v3" /><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M8 13h.01" /><path d="M12 13h.01" /><path d="M16 13h.01" /><path d="M8 17h.01" /><path d="M12 17h.01" /><path d="M16 17h.01" /></svg>`,v={title:`Komponenten/Cards & Teaser/Icon-Karte`,component:u,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3132`},layout:`padded`,docs:{description:{component:'Kompakte Teaser-Kachel mit farbiger Icon-Fläche, Eyebrow, Titel, Text und optionaler Pfeil-CTA-Zeile (`.ep-card`, css/components.css:1298 bis 1340), die auf den Beispielseiten Bereichs- und Angebots-Einstiege trägt. Attributselektor `[cdsIconCard]` statt eigenem Element: `<a cdsIconCard href="…">` (ganze Fläche klickbar, `.ep-card-link` wird vom Host-Tag abgeleitet) oder `<div cdsIconCard>` (statisch, ruht flach mit Rahmen), der Konsument schreibt das Tag, kein Wrapper-Element schiebt sich zwischen Grid und Karte. Das Icon kommt als projizierter Inhalt (`<ng-content select="[cdsIcon]">`): `.ep-card-icon` ist ein Container und reicht Maße/Stroke per Nachfahren-Selektor durch, das projizierte `<svg>` braucht deshalb KEINE eigene Größenklasse. **Kein `cdsIconCards`-Raster:** `.ep-cards` ist ein reines `display:grid` ohne Struktur oder Verhalten (dieselbe Begründung wie beim Verzicht auf einen `layout-grid`-Wrapper), Konsumenten schreiben deshalb `<div class="ep-cards">` von Hand, siehe „Im Raster“.'}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]}},args:{eyebrow:`Effektive Software`,title:`Schlanke Systeme`,text:`Weniger Code, klarere Architektur, schnellere Lieferung.`,area:`es`,ctaLabel:`Mehr erfahren`}},y={render:e=>({props:e,template:`
      <div cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${g}
      </div>
    `}),play:async({canvasElement:e})=>{let t=d(e);await p(t.queryAllByRole(`link`)).toHaveLength(0);let n=e.querySelector(`.ep-card`);await p(n?.tagName).toBe(`DIV`),await p(n).not.toHaveClass(`ep-card-link`),await p(n).toHaveAttribute(`data-area`,`es`);let r=e.querySelector(`.ep-card-icon`);await p(r).toHaveAttribute(`data-area`,`es`);let i=e.querySelector(`.ep-card-eyebrow`);await p(i).toHaveAttribute(`data-area`,`es`);let a=e.querySelector(`.ep-card-cta`);await p(a).not.toHaveAttribute(`data-area`),await p(a?.querySelector(`[aria-hidden="true"]`)).toHaveTextContent(`→`);let o=e.querySelector(`.ep-card-icon svg`);await p(o).not.toHaveAttribute(`class`);let s=o?.getBoundingClientRect();await p(s?.width).toBe(32),await p(s?.height).toBe(32)}},b={name:`Als Link`,render:e=>({props:e,template:`
      <a cdsIconCard href="#leistungen-es" [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${g}
      </a>
    `}),play:async({canvasElement:e})=>{let t=d(e).getAllByRole(`link`);await p(t).toHaveLength(1);let n=t[0];await p(n.tagName).toBe(`A`),await p(n).toHaveClass(`ep-card`,`ep-card-link`),await p(n).toHaveAttribute(`href`,`#leistungen-es`),await f.tab(),await p(n).toHaveFocus();let r=!1;n.addEventListener(`click`,e=>{r=!0,e.preventDefault()}),await f.keyboard(`{Enter}`),await p(r).toBe(!0)}},x={name:`Anker ohne Href`,parameters:{controls:{disable:!0}},render:e=>({props:e,template:`
      <a cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${g}
      </a>
    `}),play:async({canvasElement:e})=>{let t=d(e);await p(t.queryAllByRole(`link`)).toHaveLength(0);let n=e.querySelector(`.ep-card`);await p(n.tagName).toBe(`A`),await p(n).not.toHaveAttribute(`href`),await p(n).not.toHaveClass(`ep-card-link`)}},S={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[u]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
        <a cdsIconCard href="#leistungen-co" area="co" eyebrow="Corporate" title="Marke mit Haltung"
          text="Klare Kommunikation, die vertraut und bewegt." ctaLabel="Entdecken">
          ${m}
        </a>
        <a cdsIconCard href="#leistungen-ki" area="ki" eyebrow="Angewandte KI" title="KI mit Wirkung"
          text="Liefert, wenn die Demo vorbei ist." ctaLabel="Entdecken">
          ${h}
        </a>
        <a cdsIconCard href="#leistungen-es" area="es" eyebrow="Effektive Software" title="Präzise Systeme"
          text="Lebt, wenn der Hype vorbei ist." ctaLabel="Ansehen">
          ${g}
        </a>
        <a cdsIconCard href="#leistungen-wo" area="wo" eyebrow="Wirksame Organisationen" title="Wandel, der trägt"
          text="Bleibt, wenn wir gehen." ctaLabel="Kennenlernen">
          ${_}
        </a>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`[cdsIconCard]`);await p(t).toHaveLength(4);for(let e of t)await p(e).not.toHaveAttribute(`title`)}},C={name:`Im Raster`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[u]},template:`
      <div class="ep-cards">
        <a cdsIconCard href="#leistungen-ki" area="ki" eyebrow="Angewandte KI" title="KI mit Wirkung"
          text="Kurzer Text." ctaLabel="Entdecken">
          ${h}
        </a>
        <a cdsIconCard href="#leistungen-es" area="es" eyebrow="Effektive Software" title="Präzise Systeme"
          text="Ein deutlich längerer Anreißertext, der über mehrere Zeilen umbricht und die Karte dadurch von Natur aus höher macht als ihre Nachbarn." ctaLabel="Ansehen">
          ${g}
        </a>
        <a cdsIconCard href="#leistungen-wo" area="wo" eyebrow="Wirksame Organisationen" title="Wandel, der trägt"
          text="Mittellanger Text zur Kontrolle." ctaLabel="Kennenlernen">
          ${_}
        </a>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`.ep-cards`),n=Array.from(t?.children??[]);await p(n).toHaveLength(3),await p(n.every(e=>e.classList.contains(`ep-card`))).toBe(!0);let r=n.map(e=>e.getBoundingClientRect().height);await p(r[1]).toBe(r[0]),await p(r[2]).toBe(r[0]);let i=n.map(e=>e.querySelector(`.ep-card-cta`)?.getBoundingClientRect().bottom);await p(i[1]).toBe(i[0]),await p(i[2]).toBe(i[0])}},w={name:`Ohne CTA`,args:{ctaLabel:``},render:e=>({props:e,template:`
      <div cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        ${g}
      </div>
    `}),play:async({canvasElement:e})=>{await p(e.querySelector(`.ep-card-cta`)).toBeNull(),await p(e.querySelector(`.ep-card-title`)).toHaveTextContent(`Schlanke Systeme`)}},T=[`Interaktiv`,`AlsLink`,`AnkerOhneHref`,`ProBereich`,`ImRaster`,`OhneCta`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <div cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        \${iconDocumentText}
      </div>
    \`
  }),
  // Tag <div> statt <a>: kein Link-Verhalten, keine Rolle \`link\` im Canvas.
  // data-area sitzt auf allen drei dafür vorgesehenen Elementen (Karte, Icon-Kachel,
  // Eyebrow) — NICHT auf der CTA-Zeile, deren Farbe über den Nachfahren-Selektor
  // .ep-card[data-area] .ep-card-cta kommt (siehe Klassendoku). Zusätzlich der
  // Icon-Kontrakt aus Entscheidung 2: das projizierte SVG braucht keine eigene
  // Klasse, die Größe (32×32) kommt allein aus dem Container .ep-card-icon.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('link')).toHaveLength(0);
    const card = canvasElement.querySelector('.ep-card');
    await expect(card?.tagName).toBe('DIV');
    await expect(card).not.toHaveClass('ep-card-link');
    await expect(card).toHaveAttribute('data-area', 'es');
    const icon = canvasElement.querySelector('.ep-card-icon');
    await expect(icon).toHaveAttribute('data-area', 'es');
    const eyebrow = canvasElement.querySelector('.ep-card-eyebrow');
    await expect(eyebrow).toHaveAttribute('data-area', 'es');
    // Gegenprobe: die CTA-Zeile trägt selbst kein data-area.
    const cta = canvasElement.querySelector('.ep-card-cta');
    await expect(cta).not.toHaveAttribute('data-area');
    await expect(cta?.querySelector('[aria-hidden="true"]')).toHaveTextContent('→');

    // Icon-Kontrakt: das projizierte <svg> trägt keine eigene Größenklasse, die
    // 32×32-Größe kommt aus dem Nachfahren-Selektor .ep-card-icon svg.
    const svg = canvasElement.querySelector('.ep-card-icon svg');
    await expect(svg).not.toHaveAttribute('class');
    const svgRect = svg?.getBoundingClientRect();
    await expect(svgRect?.width).toBe(32);
    await expect(svgRect?.height).toBe(32);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Als Link',
  render: args => ({
    props: args,
    template: \`
      <a cdsIconCard href="#leistungen-es" [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        \${iconDocumentText}
      </a>
    \`
  }),
  // Tag <a> statt <div>: .ep-card-link wird vom Host-Tag abgeleitet (kein Input
  // mehr), die ganze Fläche ist ein <a>, per Tastatur erreichbar, Enter aktiviert
  // es wie jeden nativen Link (abgefangen über preventDefault(), sonst verließe die
  // echte Navigation die Storybook-Seite, siehe dieselbe Begründung in
  // link-card.stories.ts). href ist ein natives Attribut, kein Angular-Input.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(1);
    const card = links[0];
    await expect(card.tagName).toBe('A');
    await expect(card).toHaveClass('ep-card', 'ep-card-link');
    await expect(card).toHaveAttribute('href', '#leistungen-es');
    await userEvent.tab();
    await expect(card).toHaveFocus();
    let activated = false;
    card.addEventListener('click', event => {
      activated = true;
      event.preventDefault();
    });
    await userEvent.keyboard('{Enter}');
    await expect(activated).toBe(true);
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Anker ohne Href',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => ({
    props: args,
    template: \`
      <a cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        \${iconDocumentText}
      </a>
    \`
  }),
  // Regressionsschutz für Auftrag 1 der Grundsatzentscheidung: .ep-card-link hängt
  // an „ist <a> UND hat href“, nicht am Tag allein. Ein <a cdsIconCard> ohne href
  // ist weder fokussierbar noch hat es eine Link-Rolle — es darf deshalb auch nicht
  // aussehen wie ein Link (kein Schatten, kein Hover). Ohne diese Prüfung würde die
  // Karte durch das bloße Tag <a> das .ep-card-link-Aussehen bekommen, obwohl sie
  // nicht bedienbar ist.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('link')).toHaveLength(0);
    const card = canvasElement.querySelector('.ep-card') as HTMLElement;
    await expect(card.tagName).toBe('A');
    await expect(card).not.toHaveAttribute('href');
    await expect(card).not.toHaveClass('ep-card-link');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [IconCardComponent]
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
        <a cdsIconCard href="#leistungen-co" area="co" eyebrow="Corporate" title="Marke mit Haltung"
          text="Klare Kommunikation, die vertraut und bewegt." ctaLabel="Entdecken">
          \${iconBriefcase}
        </a>
        <a cdsIconCard href="#leistungen-ki" area="ki" eyebrow="Angewandte KI" title="KI mit Wirkung"
          text="Liefert, wenn die Demo vorbei ist." ctaLabel="Entdecken">
          \${iconCheckCircle}
        </a>
        <a cdsIconCard href="#leistungen-es" area="es" eyebrow="Effektive Software" title="Präzise Systeme"
          text="Lebt, wenn der Hype vorbei ist." ctaLabel="Ansehen">
          \${iconDocumentText}
        </a>
        <a cdsIconCard href="#leistungen-wo" area="wo" eyebrow="Wirksame Organisationen" title="Wandel, der trägt"
          text="Bleibt, wenn wir gehen." ctaLabel="Kennenlernen">
          \${iconCalendarDays}
        </a>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const hosts = canvasElement.querySelectorAll('[cdsIconCard]');
    await expect(hosts).toHaveLength(4);
    for (const host of hosts) await expect(host).not.toHaveAttribute('title');
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Im Raster',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Kein cdsIconCards-Raster (siehe Entscheidung 3 in icon-card.component.ts): das
  // Raster ist ein reines <div class="ep-cards"> aus der CSS-Schicht, keine eigene
  // Komponente. Absichtlich UNTERSCHIEDLICH lange Texte (wie link-card.stories.ts,
  // Story „Im Raster“) statt der kurzen, ähnlich langen Mockup-Texte: das ist jetzt
  // der Regressionsschutz für die Grundsatzentscheidung "Attributselektor, damit
  // .ep-card selbst das Grid-Kind ist". Mit der früheren Element-Selektor-Fassung
  // (<cds-icon-card> als eigenes Host-Element um ein inneres .ep-card) ergab exakt
  // dieser Aufbau ungleiche Kartenhöhen (174px/270px gemessen); mit dem
  // Attributselektor ist .ep-card selbst der Grid-Kind, align-items:stretch greift
  // direkt, und die Play-Funktion unten pinnt gleiche Höhen + auf einer Linie
  // liegende CTA-Unterkanten.
  render: () => ({
    moduleMetadata: {
      imports: [IconCardComponent]
    },
    template: \`
      <div class="ep-cards">
        <a cdsIconCard href="#leistungen-ki" area="ki" eyebrow="Angewandte KI" title="KI mit Wirkung"
          text="Kurzer Text." ctaLabel="Entdecken">
          \${iconCheckCircle}
        </a>
        <a cdsIconCard href="#leistungen-es" area="es" eyebrow="Effektive Software" title="Präzise Systeme"
          text="Ein deutlich längerer Anreißertext, der über mehrere Zeilen umbricht und die Karte dadurch von Natur aus höher macht als ihre Nachbarn." ctaLabel="Ansehen">
          \${iconDocumentText}
        </a>
        <a cdsIconCard href="#leistungen-wo" area="wo" eyebrow="Wirksame Organisationen" title="Wandel, der trägt"
          text="Mittellanger Text zur Kontrolle." ctaLabel="Kennenlernen">
          \${iconCalendarDays}
        </a>
      </div>
    \`
  }),
  // Direkte Grid-Kinder: .ep-cards hat ausschließlich .ep-card-Elemente als Kinder
  // (hier <a>, da alle drei Karten Links sind), kein Wrapper-Element dazwischen.
  // Regressionsschutz für die Grundsatzentscheidung: trotz stark unterschiedlicher
  // Textlänge bekommen alle drei Karten dieselbe Höhe (align-items:stretch trifft
  // direkt auf .ep-card) und die CTA-Zeilen liegen auf derselben Unterkante.
  play: async ({
    canvasElement
  }) => {
    const grid = canvasElement.querySelector('.ep-cards');
    const cards = Array.from(grid?.children ?? []) as HTMLElement[];
    await expect(cards).toHaveLength(3);
    await expect(cards.every(el => el.classList.contains('ep-card'))).toBe(true);
    const heights = cards.map(el => el.getBoundingClientRect().height);
    await expect(heights[1]).toBe(heights[0]);
    await expect(heights[2]).toBe(heights[0]);
    const ctaBottoms = cards.map(el => el.querySelector('.ep-card-cta')?.getBoundingClientRect().bottom);
    await expect(ctaBottoms[1]).toBe(ctaBottoms[0]);
    await expect(ctaBottoms[2]).toBe(ctaBottoms[0]);
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Ohne CTA',
  args: {
    ctaLabel: ''
  },
  render: args => ({
    props: args,
    template: \`
      <div cdsIconCard [eyebrow]="eyebrow" [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel">
        \${iconDocumentText}
      </div>
    \`
  }),
  // Leeres ctaLabel (Default '') rendert keine .ep-card-cta-Zeile, statt leer zu
  // rendern — dieselbe Konvention wie bei cds-link-card/cds-hero-image/cds-section.
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector('.ep-card-cta')).toBeNull();
    await expect(canvasElement.querySelector('.ep-card-title')).toHaveTextContent('Schlanke Systeme');
  }
}`,...w.parameters?.docs?.source}}}})))()}init_icon_card_stories();export{b as AlsLink,x as AnkerOhneHref,C as ImRaster,y as Interaktiv,w as OhneCta,S as ProBereich,T as __namedExportsOrder,v as default};