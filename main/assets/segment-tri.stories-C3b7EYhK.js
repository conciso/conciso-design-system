import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,C as n,F as r,H as i,I as a,Nt as o,P as s,S as c,St as l,V as u,fn as d,k as f,nt as p,q as m,sn as h,x as g}from"./angular-platform-CAY__VLP.js";import{a as _,d as v,l as y,o as b,r as x,u as S}from"./ng-icons-heroicons-outline-D63aMe8L.js";import{a as C,i as w,n as T,o as E,r as D,t as O}from"./theme-mode-Bj97f4cM.js";import{t as k}from"./cds-icons-De84Mmkh.js";var A;function init__virtual_angular_jit_style_inline_98d34d1d79dd1b2c(){return(init__virtual_angular_jit_style_inline_98d34d1d79dd1b2c=e((()=>{A=`
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
  `})))()}var j;function init_segment_tri_component(){return(init_segment_tri_component=e((()=>{d(),init__virtual_angular_jit_style_inline_98d34d1d79dd1b2c(),f(),S(),k(),C(),j=class ThemeSegmentComponent{showSystem=t(!0);svc=o(D);icon=O;label=T;order=a(()=>w(this.showSystem()));bar=s(`bar`);thumb=s(`thumb`);opts=r(`opt`);destroyRef=o(l);constructor(){n({earlyRead:()=>(this.svc.mode(),this.order(),this.measureThumb()),write:e=>this.applyThumb(e())}),p(()=>{let e=this.bar()?.nativeElement;if(!e)return;let t=new ResizeObserver(()=>this.applyThumb(this.measureThumb()));t.observe(e),this.destroyRef.onDestroy(()=>t.disconnect())})}measureThumb(){let e=this.thumb()?.nativeElement,t=this.bar()?.nativeElement,n=this.opts()[this.order().indexOf(this.svc.mode())]?.nativeElement;if(!e||!t||!n)return null;let r=t.getBoundingClientRect(),i=n.getBoundingClientRect(),a=getComputedStyle(t),o=parseFloat(a.borderLeftWidth)||0,s=parseFloat(a.borderTopWidth)||0;return{width:i.width,height:i.height,x:i.left-r.left-o,y:i.top-r.top-s}}applyThumb(e){let t=this.thumb()?.nativeElement;t&&e&&(t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.transform=`translate(${e.x}px, ${e.y}px)`)}static ctorParameters=()=>[];static propDecorators={showSystem:[{type:m,args:[{isSignal:!0,alias:`showSystem`,required:!1,transform:void 0}]}],bar:[{type:g,args:[`bar`,{isSignal:!0}]}],thumb:[{type:g,args:[`thumb`,{isSignal:!0}]}],opts:[{type:c,args:[`opt`,{isSignal:!0}]}]}},j=h([i({selector:`cds-theme-segment`,changeDetection:u.OnPush,imports:[y],viewProviders:[v({heroSun:b,heroMoon:_,heroComputerDesktop:x})],template:`
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
          <ng-icon [name]="icon[m]" size="14px" aria-hidden="true" />
          <span class="tbtn__label">{{ label[m] }}</span>
        </button>
      }
    </div>
  `,styles:[A]})],j)})))()}var M,N,P,F,I,L,R,z;function init_segment_tri_stories(){return(init_segment_tri_stories=e((()=>{C(),init_segment_tri_component(),{within:M,userEvent:N,expect:P}=__STORYBOOK_MODULE_TEST__,F={title:`Komponenten/Theme-Umschalter/Segment`,component:j,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5266`},layout:`padded`,docs:{description:{component:"Theme-Umschalter als Segment-Leiste, als eigenständiges Element zum Hovern gedacht. Immer responsiv (unter 640px Icon-only) und immer animiert (Aktiv-Markierung gleitet als Thumb); beides fest. Einzige Option: `showSystem` (Hell/Dunkel/System vs. binär)."}}},argTypes:{showSystem:{control:`boolean`}},args:{showSystem:!0}},I={},L={name:`Binär (nur Hell/Dunkel)`,args:{showSystem:!1}},R={name:`Wechsel · Dunkel`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=M(e),n=E.mode();try{E.set(`light`);let e=t.getByRole(`button`,{name:`Hell`}),n=t.getByRole(`button`,{name:`Dunkel`});await P(e).toHaveAttribute(`aria-pressed`,`true`),await P(e).toHaveClass(`active`),await P(n).toHaveAttribute(`aria-pressed`,`false`),await N.click(n),await P(n).toHaveAttribute(`aria-pressed`,`true`),await P(n).toHaveClass(`active`),await P(e).toHaveAttribute(`aria-pressed`,`false`),await P(e).not.toHaveClass(`active`)}finally{E.set(n)}}},z=[`Interaktiv`,`Binaer`,`WechselDunkel`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Binär (nur Hell/Dunkel)',
  args: {
    showSystem: false
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}}})))()}init_segment_tri_stories();export{L as Binaer,I as Interaktiv,R as WechselDunkel,z as __namedExportsOrder,F as default};