import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,Nt as i,V as a,fn as o,k as s,q as c,sn as l}from"./angular-platform-CAY__VLP.js";import{a as u,d,l as f,o as p,r as m,u as h}from"./ng-icons-heroicons-outline-D63aMe8L.js";import{t as g}from"./cds-icons-De84Mmkh.js";import{a as _,i as v,n as y,o as b,r as x}from"./iframe-QDqT5_zd.js";var S;function init_cycle_button_component(){return(init_cycle_button_component=e((()=>{o(),s(),h(),g(),b(),S=class ThemeCycleComponent{showSystem=t(!0);svc=i(v);icon=r(()=>y[this.svc.mode()]);label=r(()=>x[this.svc.mode()]);next(){let e=_(this.showSystem()),t=e.indexOf(this.svc.mode());this.svc.set(e[(t+1)%e.length])}static propDecorators={showSystem:[{type:c,args:[{isSignal:!0,alias:`showSystem`,required:!1,transform:void 0}]}]}},S=l([n({selector:`cds-theme-cycle`,changeDetection:a.OnPush,imports:[f],viewProviders:[d({heroSun:p,heroMoon:u,heroComputerDesktop:m})],template:`
    <button
      class="ep-nav-icon-btn"
      type="button"
      [attr.aria-label]="'Farbthema: ' + label() + ', klicken zum Wechseln'"
      (click)="next()"
    >
      <ng-icon [name]="icon()" size="22px" aria-hidden="true" />
    </button>
  `})],S)})))()}export{init_cycle_button_component as n,S as t};