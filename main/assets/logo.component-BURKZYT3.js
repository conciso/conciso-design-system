import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_logo_component(){return(init_logo_component=e((()=>{i(),a(),c=class LogoComponent{label=t.required();src=t();alt=t(``);static propDecorators={label:[{type:o,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],src:[{type:o,args:[{isSignal:!0,alias:`src`,required:!1,transform:void 0}]}],alt:[{type:o,args:[{isSignal:!0,alias:`alt`,required:!1,transform:void 0}]}]}},c=s([n({selector:`cds-logo`,changeDetection:r.OnPush,host:{class:`logo-tile`},template:`
    @if (src()) {
      <img [src]="src()" [alt]="alt() || label()" />
    } @else {
      <span class="logo-placeholder">{{ label() }}</span>
    }
  `})],c)})))()}export{init_logo_component as n,c as t};