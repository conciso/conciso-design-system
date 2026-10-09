import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{A as n,H as r,I as i,Nt as a,V as o,W as s,Y as c,fn as l,j as u,k as d,q as f,sn as p}from"./angular-platform-CAY__VLP.js";import{n as m,t as h}from"./dots-keyboard-Docf_pxz.js";import{r as g,t as _}from"./dist-Cwu2f28i.js";import{n as v,t as y}from"./platzhalter-Djsxs5M2.js";var b,x;function init_carousel_component(){return(init_carousel_component=e((()=>{l(),d(),h(),b=0,x=class CarouselComponent{host=a(s);instance=++b;slides=n.required();active=u(0);label=n(`Bildstrecke`);hero=n(!1);wrapClasses=i(()=>this.hero()?`img-slider img-slider-hero`:`img-slider`);prev(){this.active.set((this.active()-1+this.slides().length)%this.slides().length)}next(){this.active.set((this.active()+1)%this.slides().length)}slideId(e){return`cds-carousel-${this.instance}-slide-${e}`}onSliderKeydown(e){if(e.key!==`ArrowLeft`&&e.key!==`ArrowRight`)return;let t=m(this.slides().length,this.active(),e.key);t!==null&&(e.preventDefault(),this.active.set(t),e.target.classList.contains(`img-dot`)&&this.focusDot(t))}onDotsKeydown(e){if(e.key!==`Home`&&e.key!==`End`)return;let t=m(this.slides().length,this.active(),e.key);t!==null&&(e.preventDefault(),this.active.set(t),this.focusDot(t))}focusDot(e){this.host.nativeElement.querySelectorAll(`.img-dot`)[e]?.focus()}placeholder=`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='800'%20height='450'%3E%3Crect%20width='800'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='400'%20y='225'%20font-family='sans-serif'%20font-size='24'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EBild%3C/text%3E%3C/svg%3E`;static propDecorators={slides:[{type:f,args:[{isSignal:!0,alias:`slides`,required:!0,transform:void 0}]}],active:[{type:f,args:[{isSignal:!0,alias:`active`,required:!1}]},{type:c,args:[`activeChange`]}],label:[{type:f,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],hero:[{type:f,args:[{isSignal:!0,alias:`hero`,required:!1,transform:void 0}]}]}},x=p([r({selector:`cds-carousel`,changeDetection:o.OnPush,template:`
    <div
      [class]="wrapClasses()"
      role="region"
      aria-roledescription="Bildschirmpräsentation"
      [attr.aria-label]="label()"
      (keydown)="onSliderKeydown($event)"
    >
      <div class="img-slider-track">
        @for (slide of slides(); track $index; let i = $index) {
          <div
            class="img-slide"
            role="group"
            aria-roledescription="Folie"
            [id]="slideId(i)"
            [attr.aria-label]="'Folie ' + (i + 1) + ' von ' + slides().length"
            [attr.aria-hidden]="i !== active()"
            [class.active]="i === active()"
          >
            <div class="img-slide-media">
              <img [src]="slide.image || placeholder" [alt]="slide.title" />
            </div>
            <div class="img-slide-caption">
              <p class="img-slide-caption-title">{{ slide.title }}</p>
              <p class="img-slide-caption-text">{{ slide.text }}</p>
            </div>
          </div>
        }
      </div>

      <button
        class="img-slider-btn img-slider-prev"
        type="button"
        aria-label="Vorherige Folie"
        (click)="prev()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
        </svg>
      </button>
      <button
        class="img-slider-btn img-slider-next"
        type="button"
        aria-label="Nächste Folie"
        (click)="next()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div class="img-slider-dots" role="tablist" aria-label="Folien-Navigation">
        @for (slide of slides(); track $index; let i = $index) {
          <button
            class="img-dot"
            type="button"
            role="tab"
            [class.active]="i === active()"
            [attr.aria-selected]="i === active()"
            [attr.tabindex]="i === active() ? 0 : -1"
            [attr.aria-controls]="slideId(i)"
            [attr.aria-label]="'Folie ' + (i + 1) + ' von ' + slides().length"
            (click)="active.set(i)"
            (keydown)="onDotsKeydown($event)"
          ></button>
        }
      </div>
    </div>
  `})],x)})))()}var S=t({DoppelteTitel:()=>M,Hero:()=>k,Interaktiv:()=>O,PfeiltastenAmSlider:()=>j,TastaturDots:()=>A,__namedExportsOrder:()=>N,default:()=>D}),C,w,T,E,D,O,k,A,j,M,N;function init_carousel_stories(){return(init_carousel_stories=e((()=>{_(),init_carousel_component(),y(),{within:C,userEvent:w,expect:T}=__STORYBOOK_MODULE_TEST__,E=v(`Bildfläche · 16:9`,800,450,24),D={title:`Komponenten/Slider & Carousel/Carousel`,component:x,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1851`},layout:`padded`,docs:{description:{component:"Bild-Carousel zur Integration in Seiteninhalt: mehrere Bilder wechseln per Crossfade, gesteuert über Vor-/Zurück-Buttons und Dots, mit optionaler Bildunterschrift. Neben der eingebetteten Standardvariante gibt es eine großformatige Hero-Variante für den Seitenkopf. Kein Autoplay, der Wechsel erfolgt nur per Nutzeraktion; der Überblendübergang wird bei `prefers-reduced-motion` abgeschaltet. Barrierefrei nach WCAG 2.1 AA."}}},argTypes:{hero:{control:`boolean`}},args:{active:0,hero:!1,slides:[{title:`Strategie-Workshop`,text:`Gemeinsam Ziele schärfen und Prioritäten setzen.`,image:E},{title:`Team-Enablement`,text:`Wissen teilen, Verantwortung verteilen, Wirkung erhöhen.`,image:E},{title:`Go-Live`,text:`Vom Prototyp zur produktiven Lösung, messbar und stabil.`,image:E}]}},O={play:async({canvasElement:e})=>{let t=C(e),n=t.getAllByRole(`tab`,{name:/^Folie /}),r=e.querySelectorAll(`.img-slide`);await T(n[0]).toHaveAttribute(`aria-selected`,`true`),await T(r[0]).toHaveAttribute(`aria-hidden`,`false`),await T(r[1]).toHaveAttribute(`aria-hidden`,`true`),await w.click(t.getByRole(`button`,{name:`Nächste Folie`})),await T(n[1]).toHaveAttribute(`aria-selected`,`true`),await T(n[0]).toHaveAttribute(`aria-selected`,`false`),await T(r[1]).toHaveAttribute(`aria-hidden`,`false`),await T(r[0]).toHaveAttribute(`aria-hidden`,`true`)}},k={args:{hero:!0}},A={name:`Tastatur (Dots)`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=C(e).getAllByRole(`tab`,{name:/^Folie /});t[0].focus(),await T(t[0]).toHaveAttribute(`aria-selected`,`true`),await w.keyboard(`{ArrowRight}`),await T(t[1]).toHaveAttribute(`aria-selected`,`true`),await T(t[1]).toHaveFocus(),await w.keyboard(`{ArrowRight}{ArrowRight}`),await T(t[0]).toHaveAttribute(`aria-selected`,`true`),await T(t[0]).toHaveFocus(),await w.keyboard(`{ArrowLeft}`),await T(t[t.length-1]).toHaveAttribute(`aria-selected`,`true`),await T(t[t.length-1]).toHaveFocus(),await w.keyboard(`{Home}`),await T(t[0]).toHaveAttribute(`aria-selected`,`true`),await T(t[0]).toHaveFocus(),await w.keyboard(`{End}`),await T(t[t.length-1]).toHaveAttribute(`aria-selected`,`true`),await T(t[t.length-1]).toHaveFocus()}},j={name:`Pfeiltasten am gesamten Slider`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},decorators:[g({imports:[x]})],render:e=>({props:e,template:`
      <cds-carousel [slides]="slides" label="Projekte"></cds-carousel>
      <cds-carousel [slides]="slides" label="Referenzen"></cds-carousel>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`.img-slider`));await T(t).toHaveLength(2),await T(t[0]).toHaveAttribute(`aria-label`,`Projekte`),await T(t[1]).toHaveAttribute(`aria-label`,`Referenzen`);let n=C(t[0]),r=n.getAllByRole(`tab`,{name:/^Folie /}),i=n.getByRole(`button`,{name:`Vorherige Folie`}),a=n.getByRole(`button`,{name:`Nächste Folie`});await T(n.queryByRole(`button`,{name:/Slide/})).toBeNull(),a.focus(),await w.keyboard(`{ArrowRight}`),await T(r[1]).toHaveAttribute(`aria-selected`,`true`),await T(a).toHaveFocus(),i.focus(),await w.keyboard(`{ArrowLeft}{ArrowLeft}`),await T(r[r.length-1]).toHaveAttribute(`aria-selected`,`true`),await T(i).toHaveFocus(),r[r.length-1].focus(),await w.keyboard(`{ArrowRight}`),await T(r[0]).toHaveAttribute(`aria-selected`,`true`),await T(r[0]).toHaveFocus();let o=Array.from(e.querySelectorAll(`.img-slide`)).map(e=>e.id);await T(new Set(o).size).toBe(o.length);for(let e of t){let t=Array.from(e.querySelectorAll(`.img-slide`)).map(e=>e.id),n=Array.from(e.querySelectorAll(`.img-dot`));await T(n).toHaveLength(t.length);for(let[e,r]of n.entries())await T(r).toHaveAttribute(`aria-controls`,t[e])}}},M={name:`Doppelte Titel`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{slides:[{title:`Workshop`,text:`Erster Termin.`},{title:`Workshop`,text:`Zweiter Termin.`}]},play:async({canvasElement:e})=>{await T(e.querySelectorAll(`.img-slide`)).toHaveLength(2),await T(e.querySelectorAll(`.img-dot`)).toHaveLength(2)}},N=[`Interaktiv`,`Hero`,`TastaturDots`,`PfeiltastenAmSlider`,`DoppelteTitel`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  // Weiterblättern: „Nächste“ wählt den zweiten Dot (role="tab" + aria-selected).
  // Zusätzlich: inaktive Slides tragen aria-hidden, sonst läse ein Screenreader
  // Titel/Text aller Folien vor (siehe slider-verwendung.mdx).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab', {
      name: /^Folie /
    });
    // Bewusst über die Klasse statt über die Rolle: \`aria-hidden="true"\` nimmt ein
    // Element aus dem Accessibility-Baum, damit verliert es Rolle UND berechenbaren
    // Namen. \`getAllByRole('group', { name: …, hidden: true })\` findet die inaktiven
    // Folien deshalb nicht — der Namensfilter läuft ins Leere. Geprüft wird hier
    // ohnehin das Attribut selbst, nicht die Auffindbarkeit (gleiches Vorgehen wie
    // in topnav.stories.ts für \`[aria-current]\`).
    const slides = canvasElement.querySelectorAll('.img-slide');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    await expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
    await userEvent.click(c.getByRole('button', {
      name: 'Nächste Folie'
    }));
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'false');
    await expect(slides[1]).toHaveAttribute('aria-hidden', 'false');
    await expect(slides[0]).toHaveAttribute('aria-hidden', 'true');
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    hero: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur (Dots)',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Dot-Leiste (role=tab in role=tablist): roving tabindex, ArrowRight/-Left mit
  // Umlauf in beide Richtungen, Home/End an die Enden, Fokus wandert mit (identische
  // Logik wie LogoCarousel, ../shared/dots-keyboard.ts).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab', {
      name: /^Folie /
    });
    dots[0].focus();
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[1]).toHaveFocus();

    // Umlauf vorwärts: ArrowRight am letzten Dot springt zum ersten.
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    // Umlauf rückwärts: ArrowLeft am ersten Dot springt zum letzten.
    await userEvent.keyboard('{ArrowLeft}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[dots.length - 1]).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[dots.length - 1]).toHaveFocus();
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Pfeiltasten am gesamten Slider',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  decorators: [moduleMetadata({
    imports: [CarouselComponent]
  })],
  // Zwei Instanzen, damit die Eindeutigkeit der Folien-IDs über Instanzen hinweg geprüft wird.
  render: args => ({
    props: args,
    template: \`
      <cds-carousel [slides]="slides" label="Projekte"></cds-carousel>
      <cds-carousel [slides]="slides" label="Referenzen"></cds-carousel>
    \`
  }),
  // ← und → wirken nicht nur auf den Dots, sondern auf dem gesamten Slider (hier mit
  // Fokus auf den Buttons), mit Umlauf; die Buttons tragen „Folie“ statt „Slide“.
  play: async ({
    canvasElement
  }) => {
    const roots = Array.from(canvasElement.querySelectorAll<HTMLElement>('.img-slider'));
    await expect(roots).toHaveLength(2);
    // Zwei Bildstrecken auf einer Seite brauchen unterscheidbare Namen (axe: landmark-unique).
    await expect(roots[0]).toHaveAttribute('aria-label', 'Projekte');
    await expect(roots[1]).toHaveAttribute('aria-label', 'Referenzen');
    const c = within(roots[0]);
    const dots = c.getAllByRole('tab', {
      name: /^Folie /
    });
    const prev = c.getByRole('button', {
      name: 'Vorherige Folie'
    });
    const next = c.getByRole('button', {
      name: 'Nächste Folie'
    });
    await expect(c.queryByRole('button', {
      name: /Slide/
    })).toBeNull();
    next.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(next).toHaveFocus();
    prev.focus();
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(prev).toHaveFocus();

    // Auf den Dots wandert der Fokus weiterhin mit.
    dots[dots.length - 1].focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    // Folien-IDs sind über beide Instanzen eindeutig, jeder Dot verweist auf seine eigene Folie.
    const allIds = Array.from(canvasElement.querySelectorAll('.img-slide')).map(el => el.id);
    await expect(new Set(allIds).size).toBe(allIds.length);
    for (const root of roots) {
      const ids = Array.from(root.querySelectorAll('.img-slide')).map(el => el.id);
      const rootDots = Array.from(root.querySelectorAll('.img-dot'));
      await expect(rootDots).toHaveLength(ids.length);
      for (const [i, dot] of rootDots.entries()) {
        await expect(dot).toHaveAttribute('aria-controls', ids[i]);
      }
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Doppelte Titel',
  // Regressionstest: gleich betitelte Slides sind zulässig und dürfen das Rendern
  // nicht abbrechen (NG0955 bei Tracking per Titel), weder bei Slides noch Dots.
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    slides: [{
      title: 'Workshop',
      text: 'Erster Termin.'
    }, {
      title: 'Workshop',
      text: 'Zweiter Termin.'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelectorAll('.img-slide')).toHaveLength(2);
    await expect(canvasElement.querySelectorAll('.img-dot')).toHaveLength(2);
  }
}`,...M.parameters?.docs?.source}}}})))()}export{init_carousel_stories as n,S as t};