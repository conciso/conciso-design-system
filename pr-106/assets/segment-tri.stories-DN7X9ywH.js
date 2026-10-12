import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,It as i,Kt as a,M as o,N as s,O as c,P as l,Tn as u,b as d,bn as f,tt as p,x as m,y as h,z as g}from"./angular-platform-BGeCprOl.js";import{o as _}from"./lucide-angular-CTBwqO1y.js";import{n as v,t as y}from"./cds-icons-DtWH1HnJ.js";import{a as b,i as x,n as S,o as C,r as w,t as T}from"./theme-mode-q6Owarsw.js";var E;function init__virtual_angular_jit_style_inline_98d34d1d79dd1b2c(){return(init__virtual_angular_jit_style_inline_98d34d1d79dd1b2c=e((()=>{E=`
    .theme-bar {
      position: static;
      display: inline-flex;
    }
    .tbtn {
      display: inline-flex;
      align-items: center;
      gap: var(--s1);
    }
    /* Responsive: unter 640px Label ausblenden → Icon-only. Das aria-label bleibt. */
    @media (max-width: 640px) {
      .theme-bar.is-responsive .tbtn__label {
        display: none;
      }
    }
    /* Animiert: ein Thumb gleitet hinter den Buttons. */
    .theme-bar.is-animated {
      position: relative;
      inset: auto;
    }
    .theme-bar.is-animated .cds-thumb {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--r-full);
      /* wie .tbtn.active im Kern (--co-700): weißer Text darauf erfüllt WCAG AA;
         --co-500 wäre zu hell (nur ~2,3:1). */
      background: var(--co-700);
      transition:
        transform var(--m-fast),
        width var(--m-fast),
        height var(--m-fast);
      pointer-events: none;
      z-index: 0;
    }
    .theme-bar.is-animated .tbtn {
      position: relative;
      z-index: 1;
    }
    .theme-bar.is-animated .tbtn.active {
      background: transparent;
    }
  `})))()}var D;function init_segment_tri_component(){return(init_segment_tri_component=e((()=>{u(),init__virtual_angular_jit_style_inline_98d34d1d79dd1b2c(),n(),v(),b(),D=class ThemeSegmentComponent{iconStroke=y;showSystem=c(!0);svc=a(w);icon=T;label=S;order=l(()=>x(this.showSystem()));bar=o(`bar`);thumb=o(`thumb`);opts=s(`opt`);destroyRef=a(i);constructor(){m({earlyRead:()=>(this.svc.mode(),this.order(),this.measureThumb()),write:e=>this.applyThumb(e())}),p(()=>{let e=this.bar()?.nativeElement;if(!e)return;let t=new ResizeObserver(()=>this.applyThumb(this.measureThumb()));t.observe(e),this.destroyRef.onDestroy(()=>t.disconnect())})}measureThumb(){let e=this.thumb()?.nativeElement,t=this.bar()?.nativeElement,n=this.opts()[this.order().indexOf(this.svc.mode())]?.nativeElement;if(!e||!t||!n)return null;let r=t.getBoundingClientRect(),i=n.getBoundingClientRect(),a=getComputedStyle(t),o=parseFloat(a.borderLeftWidth)||0,s=parseFloat(a.borderTopWidth)||0;return{width:i.width,height:i.height,x:i.left-r.left-o,y:i.top-r.top-s}}applyThumb(e){let t=this.thumb()?.nativeElement;t&&e&&(t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.transform=`translate(${e.x}px, ${e.y}px)`)}static ctorParameters=()=>[];static propDecorators={showSystem:[{type:r,args:[{isSignal:!0,alias:`showSystem`,required:!1,transform:void 0}]}],bar:[{type:h,args:[`bar`,{isSignal:!0}]}],thumb:[{type:h,args:[`thumb`,{isSignal:!0}]}],opts:[{type:d,args:[`opt`,{isSignal:!0}]}]}},D=f([t({selector:`cds-theme-segment`,changeDetection:g.OnPush,imports:[_],template:`
    <div #bar class="theme-bar is-responsive is-animated" role="group" aria-label="Farbthema">
      <span #thumb class="cds-thumb" aria-hidden="true"></span>
      @for (m of order(); track m) {
        <button
          #opt
          class="tbtn"
          type="button"
          [class.active]="svc.mode() === m"
          [attr.aria-pressed]="svc.mode() === m"
          [attr.aria-label]="label[m]"
          (click)="svc.set(m)"
        >
          <svg [lucideIcon]="icon[m]" size="14" [strokeWidth]="iconStroke"></svg>
          <span class="tbtn__label">{{ label[m] }}</span>
        </button>
      }
    </div>
  `,styles:[E]})],D)})))()}var O,k,A,j,M,N,P,F,I;function init_segment_tri_stories(){return(init_segment_tri_stories=e((()=>{b(),init_segment_tri_component(),{within:O,userEvent:k,expect:A}=__STORYBOOK_MODULE_TEST__,j={title:`Komponenten/Theme-Umschalter/Segment`,component:D,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5266`},layout:`padded`,docs:{description:{component:"Theme-Umschalter als Segment-Leiste, als eigenständiges Element zum Hovern gedacht. Immer responsiv (unter 640px Icon-only) und immer animiert (Aktiv-Markierung gleitet als Thumb); beides fest. Einzige Option: `showSystem` (Hell/Dunkel/System vs. binär)."}}},argTypes:{showSystem:{control:`boolean`}},args:{showSystem:!0}},M={},N={name:`Binär (nur Hell/Dunkel)`,args:{showSystem:!1}},P={name:`Wechsel · Dunkel`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=O(e),n=C.mode();try{C.set(`light`);let e=t.getByRole(`button`,{name:`Hell`}),n=t.getByRole(`button`,{name:`Dunkel`});await A(e).toHaveAttribute(`aria-pressed`,`true`),await A(e).toHaveClass(`active`),await A(n).toHaveAttribute(`aria-pressed`,`false`),await k.click(n),await A(n).toHaveAttribute(`aria-pressed`,`true`),await A(n).toHaveClass(`active`),await A(e).toHaveAttribute(`aria-pressed`,`false`),await A(e).not.toHaveClass(`active`)}finally{C.set(n)}}},F={name:`Icon-Strichstärke`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelectorAll(`.tbtn svg`);await A(t.length).toBe(3);for(let e of Array.from(t))await A(e).toHaveAttribute(`aria-hidden`,`true`),await A(parseFloat(getComputedStyle(e).strokeWidth)).toBe(1.5)}},I=[`Interaktiv`,`Binaer`,`WechselDunkel`,`IconStrichstaerke`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Binär (nur Hell/Dunkel)',
  args: {
    showSystem: false
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Wechsel · Dunkel',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Klick auf „Dunkel“ verschiebt aria-pressed UND die Aktiv-Klasse (Thumb-Träger).
  // themeStore ist ein Modul-Singleton — den Ausgangswert am Ende zwingend zurücksetzen.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      const hell = c.getByRole('button', {
        name: 'Hell'
      });
      const dunkel = c.getByRole('button', {
        name: 'Dunkel'
      });
      await expect(hell).toHaveAttribute('aria-pressed', 'true');
      await expect(hell).toHaveClass('active');
      await expect(dunkel).toHaveAttribute('aria-pressed', 'false');
      await userEvent.click(dunkel);
      await expect(dunkel).toHaveAttribute('aria-pressed', 'true');
      await expect(dunkel).toHaveClass('active');
      await expect(hell).toHaveAttribute('aria-pressed', 'false');
      await expect(hell).not.toHaveClass('active');
    } finally {
      themeStore.set(original);
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Icon-Strichstärke',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Pinnt die Strichstärke der Chrome-Icons (Lucide, ADR-0016): bisher Heroicons-Outline mit
  // 1.5 (= --icon-stroke-md), Lucide-Default wäre 2. Die Komponente setzt CDS_ICON_STROKE
  // explizit; hier wird der WIRKSAME (berechnete) Wert geprüft, damit auch eine CSS-Regel,
  // die das Attribut überschreibt, auffiele. Dekorative Icons bleiben aria-hidden.
  play: async ({
    canvasElement
  }) => {
    const icons = canvasElement.querySelectorAll('.tbtn svg');
    await expect(icons.length).toBe(3);
    for (const svg of Array.from(icons)) {
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(parseFloat(getComputedStyle(svg).strokeWidth)).toBe(1.5);
    }
  }
}`,...F.parameters?.docs?.source}}}})))()}init_segment_tri_stories();export{N as Binaer,F as IconStrichstaerke,M as Interaktiv,P as WechselDunkel,I as __namedExportsOrder,j as default};