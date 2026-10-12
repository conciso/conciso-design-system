import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,Ft as n,H as r,Nt as i,V as a,W as o,Y as s,fn as c,j as l,k as u,kt as d,q as f,sn as p}from"./angular-platform-CAY__VLP.js";import{n as m,t as h}from"./logo.component-BURKZYT3.js";import{n as g,t as _}from"./dots-keyboard-Docf_pxz.js";var v,y;function init_logo_carousel_component(){return(init_logo_carousel_component=e((()=>{c(),u(),m(),_(),v=0,y=class LogoCarouselComponent{host=i(o);sets=t.required();label=t(`Kundenlogos`);interval=t(6e3);active=l(0);paused=n(!1);hovered=n(!1);focused=n(!1);reducedMotion=n(typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches);uid=++v;constructor(){d(e=>{let t=!this.reducedMotion()&&!this.paused()&&!this.hovered()&&!this.focused(),n=this.interval();if(!t||typeof window>`u`)return;let r=setInterval(()=>{this.active.set((this.active()+1)%this.sets().length)},n);e(()=>clearInterval(r))})}slideId(e){return`cds-logo-set-${this.uid}-${e+1}`}togglePause(){this.paused.set(!this.paused())}onDotClick(e){this.active.set(e),this.paused.set(!0)}onDotsKeydown(e){let t=g(this.sets().length,this.active(),e.key,{vertical:!0});t!==null&&(e.preventDefault(),this.active.set(t),this.paused.set(!0),this.host.nativeElement.querySelectorAll(`.logo-carousel-dot`)[t]?.focus())}onFocusOut(e){let t=e.relatedTarget;(!t||!this.host.nativeElement.contains(t))&&this.focused.set(!1)}static ctorParameters=()=>[];static propDecorators={sets:[{type:f,args:[{isSignal:!0,alias:`sets`,required:!0,transform:void 0}]}],label:[{type:f,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],interval:[{type:f,args:[{isSignal:!0,alias:`interval`,required:!1,transform:void 0}]}],active:[{type:f,args:[{isSignal:!0,alias:`active`,required:!1}]},{type:s,args:[`activeChange`]}]}},y=p([r({selector:`cds-logo-carousel`,changeDetection:a.OnPush,imports:[h],template:`
    <div
      class="logo-carousel"
      role="region"
      aria-roledescription="Logo-Karussell"
      [attr.aria-label]="label()"
      [class.paused]="paused()"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
      (focusin)="focused.set(true)"
      (focusout)="onFocusOut($event)"
    >
      <button
        class="logo-carousel-pause"
        type="button"
        [hidden]="reducedMotion()"
        [attr.aria-label]="paused() ? 'Logo-Animation fortsetzen' : 'Logo-Animation pausieren'"
        (click)="togglePause()"
      >
        <svg
          class="icon-pause"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="3" y="2" width="3" height="10" rx="1" />
          <rect x="8" y="2" width="3" height="10" rx="1" />
        </svg>
        <svg
          class="icon-play"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4 2.5v9l7-4.5z" />
        </svg>
      </button>

      <div class="logo-carousel-track">
        @for (set of sets(); track $index; let i = $index) {
          <div
            class="logo-carousel-slide"
            [id]="slideId(i)"
            role="group"
            aria-roledescription="Logo-Set"
            [attr.aria-label]="'Set ' + (i + 1) + ' von ' + sets().length"
            [attr.aria-hidden]="i !== active()"
          >
            @for (logo of set; track $index) {
              <cds-logo [label]="logo.label" [src]="logo.src" [alt]="logo.alt || ''" />
            }
          </div>
        }
      </div>

      <div class="logo-carousel-dots" role="tablist" aria-label="Logo-Set auswählen">
        @for (set of sets(); track $index; let i = $index) {
          <button
            class="logo-carousel-dot"
            type="button"
            role="tab"
            [attr.aria-selected]="i === active()"
            [attr.tabindex]="i === active() ? 0 : -1"
            [attr.aria-controls]="slideId(i)"
            [attr.aria-label]="'Set ' + (i + 1) + ' von ' + sets().length"
            (click)="onDotClick(i)"
            (keydown)="onDotsKeydown($event)"
          ></button>
        }
      </div>
    </div>
  `})],y)})))()}var b,x,S,C,w,T,E,D,O,k,A,j;function init_logo_carousel_stories(){return(init_logo_carousel_stories=e((()=>{init_logo_carousel_component(),{within:b,userEvent:x,expect:S}=__STORYBOOK_MODULE_TEST__,C={title:`Komponenten/Slider & Carousel/Logo-Carousel`,component:y,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1470`},layout:`padded`,docs:{description:{component:"Automatischer Wechsler für Kundenlogos: Sets von je fünf Logos wechseln per Crossfade und lassen sich über Dots gezielt ansteuern. Jede Kachel ist ein `cds-logo`, bevorzugt ein Bild (`src`), sonst der Text als Platzhalter/Fallback. Die Animation pausiert bei Hover und Tastatur-Fokus, zusätzlich über einen Pause-Button, und ruht bei reduzierter Bewegung. Barrierefrei nach WCAG 2.1 AA."}}},argTypes:{interval:{description:`Autoplay-Intervall in **Millisekunden** (Standard 6000 = 6 s).`,control:{type:`number`,min:1e3,step:500}}},args:{interval:6e3,active:0,sets:[[{label:`NORDWIND`},{label:`MERIDIAN`},{label:`AVERA`},{label:`KONTUR`},{label:`STELLA`}],[{label:`VOLTAIC`},{label:`HEXAGON`},{label:`LUMEN`},{label:`PRAXIS`},{label:`ORBIT`}],[{label:`CASCADE`},{label:`VERTEX`},{label:`NIMBUS`},{label:`FORGE`},{label:`ATLAS`}]]}},w={parameters:{snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=b(e).getByRole(`button`,{name:/Logo-Animation (pausieren|fortsetzen)/});await S(t).toHaveAttribute(`aria-label`,`Logo-Animation pausieren`),await S(t).not.toHaveAttribute(`aria-pressed`),await x.click(t),await S(t).toHaveAttribute(`aria-label`,`Logo-Animation fortsetzen`),await S(t).not.toHaveAttribute(`aria-pressed`),await x.click(t),await S(t).toHaveAttribute(`aria-label`,`Logo-Animation pausieren`),t.blur()}},T={name:`Tastatur (Dots)`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e).getAllByRole(`tab`);t[0].focus(),await S(t[0]).toHaveAttribute(`aria-selected`,`true`),await x.keyboard(`{ArrowRight}`),await S(t[1]).toHaveAttribute(`aria-selected`,`true`),await S(t[1]).toHaveFocus(),await x.keyboard(`{End}`),await S(t[t.length-1]).toHaveAttribute(`aria-selected`,`true`),await S(t[t.length-1]).toHaveFocus(),await x.keyboard(`{Home}`),await S(t[0]).toHaveAttribute(`aria-selected`,`true`),await S(t[0]).toHaveFocus()}},E={name:`Region mit Namen`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e).getByRole(`region`,{name:`Kundenlogos`});await S(t).toHaveAttribute(`aria-roledescription`,`Logo-Karussell`),await S(t).toHaveClass(`logo-carousel`)}},D={name:`Dot-Klick pausiert dauerhaft`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e),n=t.getAllByRole(`tab`),r=t.getByRole(`button`,{name:`Logo-Animation pausieren`});await x.click(n[1]),await S(n[1]).toHaveAttribute(`aria-selected`,`true`),await S(r).toHaveAttribute(`aria-label`,`Logo-Animation fortsetzen`),await S(e.querySelector(`.logo-carousel`)).toHaveClass(`paused`),await x.click(r),await S(r).toHaveAttribute(`aria-label`,`Logo-Animation pausieren`),await S(e.querySelector(`.logo-carousel`)).not.toHaveClass(`paused`),r.blur()}},O={name:`Tastatur pausiert, Auf/Ab wie Links/Rechts`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e),n=t.getAllByRole(`tab`),r=t.getByRole(`button`,{name:/Logo-Animation/});n[0].focus(),await S(r).toHaveAttribute(`aria-label`,`Logo-Animation pausieren`),await x.keyboard(`{ArrowDown}`),await S(n[1]).toHaveAttribute(`aria-selected`,`true`),await S(n[1]).toHaveFocus(),await S(r).toHaveAttribute(`aria-label`,`Logo-Animation fortsetzen`),await x.keyboard(`{ArrowUp}`),await S(n[0]).toHaveAttribute(`aria-selected`,`true`),await S(n[0]).toHaveFocus(),await x.keyboard(`{ArrowUp}`),await S(n[n.length-1]).toHaveAttribute(`aria-selected`,`true`),await x.click(r),await S(r).toHaveAttribute(`aria-label`,`Logo-Animation pausieren`),n[0].focus(),await x.keyboard(`{Home}`),await S(r).toHaveAttribute(`aria-label`,`Logo-Animation fortsetzen`)}},k={name:`Reduzierte Bewegung ohne Pause-Button`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},beforeEach:()=>{let e=window.matchMedia;return window.matchMedia=e=>({matches:e.includes(`prefers-reduced-motion`),media:e,onchange:null,addEventListener:()=>void 0,removeEventListener:()=>void 0,addListener:()=>void 0,removeListener:()=>void 0,dispatchEvent:()=>!1}),()=>{window.matchMedia=e}},play:async({canvasElement:e})=>{let t=e.querySelector(`.logo-carousel-pause`);await S(t).toHaveAttribute(`hidden`),await S(t).not.toBeVisible();let n=b(e).getAllByRole(`tab`);await x.click(n[1]),await S(n[1]).toHaveAttribute(`aria-selected`,`true`)}},A={parameters:{snapshot:{skip:!0}},args:{sets:[[{label:`Conciso`,src:`./conciso/brand/logo-conciso.svg`},{label:`Conciso`,src:`./conciso/brand/logo-conciso.svg`},{label:`NORDWIND`},{label:`Conciso`,src:`./conciso/brand/logo-conciso.svg`},{label:`MERIDIAN`}],[{label:`AVERA`},{label:`Conciso`,src:`./conciso/brand/logo-conciso.svg`},{label:`KONTUR`},{label:`Conciso`,src:`./conciso/brand/logo-conciso.svg`},{label:`STELLA`}]]}},j=[`Interaktiv`,`TastaturDots`,`RegionMitName`,`DotKlickPausiert`,`TastaturPausiertUndHoch`,`ReduzierteBewegung`,`MitBildern`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  // Kein Visual-Snapshot: Autoplay ist timer-getrieben (setInterval), der aktive
  // Frame hängt vom Screenshot-Timing ab → nicht deterministisch. Funktion + a11y
  // sind über den play-Test unten abgedeckt.
  parameters: {
    snapshot: {
      skip: true
    }
  },
  // Pause-Button stoppt das Autoplay und startet es wieder. Das Label wechselt zwischen
  // „Logo-Animation pausieren“ und „Logo-Animation fortsetzen“, \`aria-pressed\` fehlt
  // bewusst (sonst sagt der Screenreader den Zustand doppelt an).
  // Wichtig: am Ende wieder auf „pausieren“ (= läuft) und Fokus vom Carousel weg,
  // damit die Default-Story sichtbar autoplayt (Fokus/Hover pausieren sonst transient).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const pause = c.getByRole('button', {
      name: /Logo-Animation (pausieren|fortsetzen)/
    });
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    await expect(pause).not.toHaveAttribute('aria-pressed');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
    await expect(pause).not.toHaveAttribute('aria-pressed');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    // Fokus aus dem Carousel nehmen → Fokus-Pause endet, Autoplay läuft sichtbar.
    (pause as HTMLElement).blur();
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur (Dots)',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Dot-Leiste (role=tab in role=tablist): roving tabindex, ArrowRight mit Umlauf,
  // Home/End an die Enden, Fokus wandert mit (1:1 wie beim Carousel).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab');
    dots[0].focus();
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowRight}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[1]).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[dots.length - 1]).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Region mit Namen',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Der Wrapper ist eine benannte Region („Kundenlogos“) mit Typ-Hinweis „Logo-Karussell“.
  play: async ({
    canvasElement
  }) => {
    const region = within(canvasElement).getByRole('region', {
      name: 'Kundenlogos'
    });
    await expect(region).toHaveAttribute('aria-roledescription', 'Logo-Karussell');
    await expect(region).toHaveClass('logo-carousel');
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Dot-Klick pausiert dauerhaft',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Ein Klick auf einen Dot springt zum Set und pausiert dauerhaft: der Pause-Button
  // zeigt „fortsetzen“, das Karussell trägt \`.paused\`. Erst der Button startet neu.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab');
    const pause = c.getByRole('button', {
      name: 'Logo-Animation pausieren'
    });
    await userEvent.click(dots[1]);
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
    await expect(canvasElement.querySelector('.logo-carousel')).toHaveClass('paused');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    await expect(canvasElement.querySelector('.logo-carousel')).not.toHaveClass('paused');
    (pause as HTMLElement).blur();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur pausiert, Auf/Ab wie Links/Rechts',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // ↓ wirkt wie →, ↑ wie ←; jede Dot-Taste (auch Home/End) pausiert dauerhaft.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const dots = c.getAllByRole('tab');
    const pause = c.getByRole('button', {
      name: /Logo-Animation/
    });
    dots[0].focus();
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    await userEvent.keyboard('{ArrowDown}');
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[1]).toHaveFocus();
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
    await userEvent.keyboard('{ArrowUp}');
    await expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    await expect(dots[0]).toHaveFocus();

    // Umlauf rückwärts mit ↑ am ersten Dot.
    await userEvent.keyboard('{ArrowUp}');
    await expect(dots[dots.length - 1]).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation pausieren');
    dots[0].focus();
    await userEvent.keyboard('{Home}');
    await expect(pause).toHaveAttribute('aria-label', 'Logo-Animation fortsetzen');
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Reduzierte Bewegung ohne Pause-Button',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Bei \`prefers-reduced-motion: reduce\` läuft kein Timer, also gibt es nichts zu
  // pausieren: der Pause-Button ist versteckt, die Dots bleiben bedienbar.
  beforeEach: () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false
    })) as typeof window.matchMedia;
    return () => {
      window.matchMedia = original;
    };
  },
  play: async ({
    canvasElement
  }) => {
    const pause = canvasElement.querySelector<HTMLElement>('.logo-carousel-pause');
    await expect(pause).toHaveAttribute('hidden');
    await expect(pause).not.toBeVisible();
    const dots = within(canvasElement).getAllByRole('tab');
    await userEvent.click(dots[1]);
    await expect(dots[1]).toHaveAttribute('aria-selected', 'true');
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    snapshot: {
      skip: true
    }
  },
  args: {
    sets: [[{
      label: 'Conciso',
      src: './conciso/brand/logo-conciso.svg'
    }, {
      label: 'Conciso',
      src: './conciso/brand/logo-conciso.svg'
    }, {
      label: 'NORDWIND'
    }, {
      label: 'Conciso',
      src: './conciso/brand/logo-conciso.svg'
    }, {
      label: 'MERIDIAN'
    }], [{
      label: 'AVERA'
    }, {
      label: 'Conciso',
      src: './conciso/brand/logo-conciso.svg'
    }, {
      label: 'KONTUR'
    }, {
      label: 'Conciso',
      src: './conciso/brand/logo-conciso.svg'
    }, {
      label: 'STELLA'
    }]]
  }
}`,...A.parameters?.docs?.source},description:{story:"Reale Logos sind Bilder (`src`). Kacheln ohne Bild fallen auf den Text-`label`\nals Platzhalter zurück – so bleibt das Set auch bei fehlendem Asset vollständig.\n(Hier das Conciso-Logo als Stellvertreter; echte Anwendungen übergeben Kundenlogos.)",...A.parameters?.docs?.description}}}})))()}init_logo_carousel_stories();export{D as DotKlickPausiert,w as Interaktiv,A as MitBildern,k as ReduzierteBewegung,E as RegionMitName,T as TastaturDots,O as TastaturPausiertUndHoch,j as __namedExportsOrder,C as default};