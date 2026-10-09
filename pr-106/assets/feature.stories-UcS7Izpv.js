import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_feature_component(){return(init_feature_component=e((()=>{a(),n(),c=class FeatureComponent{title=i.required();text=i.required();area=i();ctaLabel=i(``);ctaHref=i(``);ctaAriaLabel=i(``);static propDecorators={title:[{type:r,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],text:[{type:r,args:[{isSignal:!0,alias:`text`,required:!0,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],ctaLabel:[{type:r,args:[{isSignal:!0,alias:`ctaLabel`,required:!1,transform:void 0}]}],ctaHref:[{type:r,args:[{isSignal:!0,alias:`ctaHref`,required:!1,transform:void 0}]}],ctaAriaLabel:[{type:r,args:[{isSignal:!0,alias:`ctaAriaLabel`,required:!1,transform:void 0}]}]}},c=o([t({selector:`div[cdsFeature]`,changeDetection:s.OnPush,host:{class:`ep-feature`,"[attr.title]":`null`},template:`
    <span class="ep-feature-icon" [attr.data-area]="area() || null" aria-hidden="true">
      <ng-content select="[cdsIcon]"></ng-content>
    </span>
    <div class="ep-feature-body">
      <h3 class="ep-feature-title">{{ title() }}</h3>
      <p class="ep-feature-text">{{ text() }}</p>
      @if (ctaLabel()) {
        @if (ctaHref()) {
          <a
            class="card-cta-link"
            [attr.data-area]="area() || null"
            [href]="ctaHref()"
            [attr.aria-label]="ctaAriaLabel() || null"
          >
            {{ ctaLabel() }} <span aria-hidden="true">→</span>
          </a>
        } @else {
          <span class="card-cta-link" [attr.data-area]="area() || null">
            {{ ctaLabel() }} <span aria-hidden="true">→</span>
          </span>
        }
      }
    </div>
  `})],c)})))()}var l,u,d,f,p,m,h,g,_,v,y,b,x,S;function init_feature_stories(){return(init_feature_stories=e((()=>{init_feature_component(),{within:l,expect:u}=__STORYBOOK_MODULE_TEST__,d=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg>`,f=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>`,p=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>`,m=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>`,h=`<svg cdsIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 2v3" /><path d="M16 2v3" /><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>`,g={title:`Komponenten/Cards & Teaser/Feature-Liste`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3235`},layout:`padded`,docs:{description:{component:'Offene Feature-Zeile ohne Box und ohne Schatten: Icon-Kachel links, Titel und Text rechts (`.ep-feature`, css/components.css:1363 bis 1379), die auf den Beispielseiten meist als Drei- oder Vierspalter im `.layout-grid` auftritt. Attributselektor `[cdsFeature]` statt eigenem Element: der Konsument schreibt `<div cdsFeature class="col-4">`, `.ep-feature` sitzt damit selbst auf dem Grid-Kind (siehe „Dreispalter“). Das Icon kommt als projizierter Inhalt (`<ng-content select="[cdsIcon]">`): `.ep-feature-icon` ist ein Container und reicht Größe UND Farbe per Nachfahren-Selektor durch, das projizierte `<svg>` braucht deshalb weder eine eigene Größenklasse noch einen eigenen Bereichston (`stroke="currentColor"` genügt, siehe „Interaktiv“). Der optionale CTA (`.card-cta-link`, direktes Kind von `.ep-feature-body`) ist ein echter `<a>` mit `href`; OHNE `ctaHref` ein `<span>` mit identischer Optik, nie ein `<a>` ohne `href` (siehe „Mit CTA“ und „Ohne Href“). `ctaAriaLabel` überschreibt bei Bedarf den zugänglichen Namen, wenn derselbe sichtbare CTA-Text mehrfach auf einer Seite steht (siehe „Mit CTA“).'}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]}},args:{title:`Höchste Sicherheit`,text:`Hosting im eigenen Rechenzentrum oder zertifiziert in Deutschland.`,ctaLabel:``,ctaHref:``,ctaAriaLabel:``}},_={render:e=>({props:e,template:`
      <div cdsFeature [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel" [ctaHref]="ctaHref" [ctaAriaLabel]="ctaAriaLabel">
        ${f}
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`.ep-feature`);await u(t).toHaveLength(1);let n=t[0];await u(n.tagName).toBe(`DIV`),await u(n.querySelector(`.ep-feature`)).toBeNull(),await u(e.querySelector(`.card-cta-link`)).toBeNull();let r=e.querySelector(`.ep-feature-icon`),i=r.querySelector(`svg`);await u(i).not.toHaveAttribute(`class`);let a=i?.getBoundingClientRect();await u(a?.width).toBe(26),await u(a?.height).toBe(26);let o=getComputedStyle(r).color,s=getComputedStyle(i).color;await u(s).toBe(o),await u(r).not.toHaveAttribute(`data-area`)}},v={parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[c]},template:`
      <div class="layout-grid">
        <div cdsFeature class="col-4" title="Sinnvolle Projekte" text="Kurzer Text." area="co">
          ${p}
        </div>
        <div cdsFeature class="col-4" title="Ein Team auf Augenhöhe" text="Ein deutlich längerer Anreißertext, der über mehrere Zeilen umbricht und die Feature-Zeile dadurch von Natur aus höher macht als ihre Nachbarn." area="co">
          ${m}
        </div>
        <div cdsFeature class="col-4" title="Raum, um zu wachsen" text="Mittellanger Text zur Kontrolle der dritten Spalte." area="co">
          ${d}
        </div>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`.layout-grid`),n=Array.from(t?.children??[]);await u(n).toHaveLength(3);for(let e of n)await u(e).not.toHaveAttribute(`title`);await u(n.every(e=>e.classList.contains(`ep-feature`))).toBe(!0),await u(n.every(e=>e.tagName===`DIV`)).toBe(!0);let r=n.map(e=>e.getBoundingClientRect().height);await u(r[1]).toBe(r[0]),await u(r[2]).toBe(r[0]);let i=n.map(e=>e.getBoundingClientRect().bottom);await u(i[1]).toBe(i[0]),await u(i[2]).toBe(i[0])}},y={name:`Mit CTA`,args:{title:`KI Kickstart Workshops`,text:`In kompakten Workshops von der ersten Idee zum konkreten KI-Anwendungsfall, mit einem klaren nächsten Schritt.`,area:`ki`,ctaLabel:`Zur Landingpage`,ctaHref:`#sec-examples`,ctaAriaLabel:`Zur Landingpage: KI Kickstart Workshops`},render:e=>({props:e,template:`
      <div cdsFeature [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel" [ctaHref]="ctaHref" [ctaAriaLabel]="ctaAriaLabel">
        ${h}
      </div>
    `}),play:async({canvasElement:e})=>{let t=l(e),n=e.querySelector(`.ep-feature-body`),r=n.children[n.children.length-1];await u(r.tagName).toBe(`A`),await u(r).toHaveClass(`card-cta-link`),await u(r.parentElement).toBe(n),await u(r).toHaveAttribute(`href`,`#sec-examples`),await u(r).toHaveAttribute(`data-area`,`ki`),await u(r).toHaveAttribute(`aria-label`,`Zur Landingpage: KI Kickstart Workshops`);let i=t.getByRole(`link`,{name:`Zur Landingpage: KI Kickstart Workshops`});await u(i).toBe(r),await u(r.querySelector(`[aria-hidden="true"]`)).toHaveTextContent(`→`)}},b={name:`Ohne Href`,args:{title:`Neue Kooperationen`,text:`Weitere Partnerschaften sind in Vorbereitung.`,area:`wo`,ctaLabel:`Landingpage folgt`,ctaHref:``},render:e=>({props:e,template:`
      <div cdsFeature [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel" [ctaHref]="ctaHref">
        ${h}
      </div>
    `}),play:async({canvasElement:e})=>{let t=l(e),n=e.querySelector(`.ep-feature-body`),r=n.children[n.children.length-1];await u(r.tagName).toBe(`SPAN`),await u(r).toHaveClass(`card-cta-link`),await u(r.parentElement).toBe(n),await u(r).not.toHaveAttribute(`href`),await u(r).toHaveTextContent(`Landingpage folgt`),await u(r.querySelector(`[aria-hidden="true"]`)).toHaveTextContent(`→`),await u(t.queryAllByRole(`link`)).toHaveLength(0)}},x={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[c]},template:`
      <div class="layout-grid">
        <div cdsFeature class="col-6" title="Marke mit Haltung" text="Klare Kommunikation, die vertraut und bewegt." area="co">
          ${p}
        </div>
        <div cdsFeature class="col-6" title="KI mit Wirkung" text="Liefert, wenn die Demo vorbei ist." area="ki">
          ${d}
        </div>
        <div cdsFeature class="col-6" title="Präzise Systeme" text="Lebt, wenn der Hype vorbei ist." area="es">
          ${f}
        </div>
        <div cdsFeature class="col-6" title="Wandel, der trägt" text="Bleibt, wenn wir gehen." area="wo">
          ${m}
        </div>
      </div>
    `})},S=[`Interaktiv`,`Dreispalter`,`MitCta`,`OhneHref`,`ProBereich`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <div cdsFeature [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel" [ctaHref]="ctaHref" [ctaAriaLabel]="ctaAriaLabel">
        \${iconLock}
      </div>
    \`
  }),
  // .ep-feature sitzt auf dem Host-Element (ein <div>), kein inneres Wrapper-<div>
  // darunter (Akzeptanzkriterium 1). Ohne CTA (Default '') rendert kein .card-cta-link.
  play: async ({
    canvasElement
  }) => {
    const features = canvasElement.querySelectorAll('.ep-feature');
    await expect(features).toHaveLength(1);
    const feature = features[0] as HTMLElement;
    await expect(feature.tagName).toBe('DIV');
    await expect(feature.querySelector('.ep-feature')).toBeNull();
    await expect(canvasElement.querySelector('.card-cta-link')).toBeNull();

    // Icon-Kontrakt: Größe kommt aus dem Nachfahren-Selektor .ep-feature-icon svg
    // (26×26), keine eigene Klasse am projizierten SVG.
    const icon = canvasElement.querySelector('.ep-feature-icon') as HTMLElement;
    const svg = icon.querySelector('svg');
    await expect(svg).not.toHaveAttribute('class');
    const svgRect = svg?.getBoundingClientRect();
    await expect(svgRect?.width).toBe(26);
    await expect(svgRect?.height).toBe(26);

    // Icon-Kontrakt, zweiter Teil (anders als cds-icon-card): .ep-feature-icon setzt
    // zusätzlich \`color\`, das projizierte <svg stroke="currentColor"> erbt sie ohne
    // eigenes Zutun. Ohne gesetztes \`area\` ist das der neutrale Ton (--tx-secondary).
    const iconColor = getComputedStyle(icon).color;
    const svgColor = getComputedStyle(svg as SVGElement).color;
    await expect(svgColor).toBe(iconColor);

    // Kein data-area ohne gesetzten Input.
    await expect(icon).not.toHaveAttribute('data-area');
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  // Kein cdsFeature-Raster: .layout-grid ist reine CSS-Utility ohne eigene
  // Komponente. Konsumenten schreiben
  // <div class="layout-grid"> von Hand, die Spaltenklasse col-4 sitzt direkt am
  // cdsFeature-Host.
  // Absichtlich UNTERSCHIEDLICH lange Texte: der Regressionsschutz für die
  // Grundsatzentscheidung "Attributselektor, damit .ep-feature selbst das
  // Grid-Kind ist" (ADR-0008). Mit gleich langen Texten wäre die Baseline auch
  // mit einem gebrochenen Höhenausgleich grün.
  render: () => ({
    moduleMetadata: {
      imports: [FeatureComponent]
    },
    template: \`
      <div class="layout-grid">
        <div cdsFeature class="col-4" title="Sinnvolle Projekte" text="Kurzer Text." area="co">
          \${iconShieldCheck}
        </div>
        <div cdsFeature class="col-4" title="Ein Team auf Augenhöhe" text="Ein deutlich längerer Anreißertext, der über mehrere Zeilen umbricht und die Feature-Zeile dadurch von Natur aus höher macht als ihre Nachbarn." area="co">
          \${iconUsers}
        </div>
        <div cdsFeature class="col-4" title="Raum, um zu wachsen" text="Mittellanger Text zur Kontrolle der dritten Spalte." area="co">
          \${iconSparkles}
        </div>
      </div>
    \`
  }),
  // Direkte Grid-Kinder: .layout-grid hat ausschließlich .ep-feature-Elemente als
  // Kinder (hier <div>, weil cdsFeature ein Attributselektor auf div ist), kein
  // Wrapper-Element dazwischen. Regressionsschutz: trotz stark unterschiedlicher
  // Textlänge bekommen alle drei Zeilen dieselbe Höhe (Grid-Default
  // align-items:stretch trifft direkt auf .ep-feature) und liegen auf derselben
  // Unterkante. Gemessen im laufenden Vitest-Browser (Chromium, Standard-Viewport,
  // Play-Funktion): alle drei Zeilen 128px hoch, alle drei Unterkanten bei y=128 —
  // der lange Text in der zweiten Spalte zieht das ganze Grid-Row auf seine Höhe,
  // die kürzeren Nachbarn strecken sich exakt mit, statt auf Inhaltshöhe stehen zu
  // bleiben.
  play: async ({
    canvasElement
  }) => {
    const grid = canvasElement.querySelector('.layout-grid');
    const features = Array.from(grid?.children ?? []) as HTMLElement[];
    await expect(features).toHaveLength(3);
    for (const feature of features) await expect(feature).not.toHaveAttribute('title');
    await expect(features.every(el => el.classList.contains('ep-feature'))).toBe(true);
    await expect(features.every(el => el.tagName === 'DIV')).toBe(true);
    const heights = features.map(el => el.getBoundingClientRect().height);
    await expect(heights[1]).toBe(heights[0]);
    await expect(heights[2]).toBe(heights[0]);
    const bottoms = features.map(el => el.getBoundingClientRect().bottom);
    await expect(bottoms[1]).toBe(bottoms[0]);
    await expect(bottoms[2]).toBe(bottoms[0]);
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Mit CTA',
  args: {
    title: 'KI Kickstart Workshops',
    text: 'In kompakten Workshops von der ersten Idee zum konkreten KI-Anwendungsfall, mit einem klaren nächsten Schritt.',
    area: 'ki',
    ctaLabel: 'Zur Landingpage',
    ctaHref: '#sec-examples',
    ctaAriaLabel: 'Zur Landingpage: KI Kickstart Workshops'
  },
  render: args => ({
    props: args,
    template: \`
      <div cdsFeature [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel" [ctaHref]="ctaHref" [ctaAriaLabel]="ctaAriaLabel">
        \${iconCalendar}
      </div>
    \`
  }),
  // Akzeptanzkriterium 2: .card-cta-link ist direktes Kind von .ep-feature-body
  // (Angulars @if/@else fügt kein Wrapper-Element ein). Echter <a>, kein <span> —
  // der Host ist ein <div>, kein umschließender Link wie bei cds-link-card.
  // ctaAriaLabel im exakten Wortlaut: Der
  // sichtbare Text „Zur Landingpage“ wiederholt sich zehnmal auf den
  // Beispielseiten, der aria-label disambiguiert im Format \`<Text>: <Ziel>\`
  // (siehe Klassendoku, ausgezählt: 11 von 12 .card-cta-link-<a>s im Mockup
  // tragen einen solchen aria-label — die Regel, nicht die Ausnahme).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const body = canvasElement.querySelector('.ep-feature-body') as HTMLElement;
    const cta = body.children[body.children.length - 1] as HTMLElement;
    await expect(cta.tagName).toBe('A');
    await expect(cta).toHaveClass('card-cta-link');
    await expect(cta.parentElement).toBe(body);
    await expect(cta).toHaveAttribute('href', '#sec-examples');
    await expect(cta).toHaveAttribute('data-area', 'ki');
    await expect(cta).toHaveAttribute('aria-label', 'Zur Landingpage: KI Kickstart Workshops');

    // Der zugängliche Name kommt jetzt aus ctaAriaLabel, nicht mehr aus dem
    // sichtbaren ctaLabel-Text — genau das Mockup-Muster.
    const link = c.getByRole('link', {
      name: 'Zur Landingpage: KI Kickstart Workshops'
    });
    await expect(link).toBe(cta);
    await expect(cta.querySelector('[aria-hidden="true"]')).toHaveTextContent('→');
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Href',
  args: {
    title: 'Neue Kooperationen',
    text: 'Weitere Partnerschaften sind in Vorbereitung.',
    area: 'wo',
    ctaLabel: 'Landingpage folgt',
    ctaHref: ''
  },
  render: args => ({
    props: args,
    template: \`
      <div cdsFeature [title]="title" [text]="text" [area]="area" [ctaLabel]="ctaLabel" [ctaHref]="ctaHref">
        \${iconCalendar}
      </div>
    \`
  }),
  // Regressionsschutz für die in feature.component.ts dokumentierte Entscheidung:
  // gesetztes ctaLabel OHNE ctaHref rendert einen <span class="card-cta-link">
  // (identische Optik, gleicher Pfeil), NIE ein <a> ohne href — genau das Muster
  // „Landingpage folgt“, das einzige card-cta-link ohne href, und ebenfalls ein
  // <span>, kein <a>.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const body = canvasElement.querySelector('.ep-feature-body') as HTMLElement;
    const cta = body.children[body.children.length - 1] as HTMLElement;
    await expect(cta.tagName).toBe('SPAN');
    await expect(cta).toHaveClass('card-cta-link');
    await expect(cta.parentElement).toBe(body);
    await expect(cta).not.toHaveAttribute('href');
    await expect(cta).toHaveTextContent('Landingpage folgt');
    await expect(cta.querySelector('[aria-hidden="true"]')).toHaveTextContent('→');

    // Keine Link-Rolle im Accessibility-Baum.
    await expect(c.queryAllByRole('link')).toHaveLength(0);
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [FeatureComponent]
    },
    template: \`
      <div class="layout-grid">
        <div cdsFeature class="col-6" title="Marke mit Haltung" text="Klare Kommunikation, die vertraut und bewegt." area="co">
          \${iconShieldCheck}
        </div>
        <div cdsFeature class="col-6" title="KI mit Wirkung" text="Liefert, wenn die Demo vorbei ist." area="ki">
          \${iconSparkles}
        </div>
        <div cdsFeature class="col-6" title="Präzise Systeme" text="Lebt, wenn der Hype vorbei ist." area="es">
          \${iconLock}
        </div>
        <div cdsFeature class="col-6" title="Wandel, der trägt" text="Bleibt, wenn wir gehen." area="wo">
          \${iconUsers}
        </div>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}}})))()}init_feature_stories();export{v as Dreispalter,_ as Interaktiv,y as MitCta,b as OhneHref,x as ProBereich,S as __namedExportsOrder,g as default};