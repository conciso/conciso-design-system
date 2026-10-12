import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,Kt as i,O as a,P as o,Tn as s,bn as c,z as l}from"./angular-platform-BGeCprOl.js";import{o as u}from"./lucide-angular-CTBwqO1y.js";import{n as d,t as f}from"./cds-icons-DtWH1HnJ.js";import{a as p,i as m,n as h,r as g,t as _}from"./theme-mode-q6Owarsw.js";var v;function init_cycle_button_component(){return(init_cycle_button_component=e((()=>{s(),n(),d(),p(),v=class ThemeCycleComponent{iconStroke=f;showSystem=a(!0);svc=i(g);icon=o(()=>_[this.svc.mode()]);label=o(()=>h[this.svc.mode()]);next(){let e=m(this.showSystem()),t=e.indexOf(this.svc.mode());this.svc.set(e[(t+1)%e.length])}static propDecorators={showSystem:[{type:r,args:[{isSignal:!0,alias:`showSystem`,required:!1,transform:void 0}]}]}},v=c([t({selector:`cds-theme-cycle`,changeDetection:l.OnPush,imports:[u],template:`
    <button
      class="ep-nav-icon-btn"
      type="button"
      [attr.aria-label]="'Farbthema: ' + label() + ', klicken zum Wechseln'"
      (click)="next()"
    >
      <svg [lucideIcon]="icon()" size="22" [strokeWidth]="iconStroke"></svg>
    </button>
  `})],v)})))()}export{init_cycle_button_component as n,v as t};