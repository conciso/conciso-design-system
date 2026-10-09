import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_logo_component(){return(init_logo_component=e((()=>{a(),n(),c=class LogoComponent{label=i.required();src=i();alt=i(``);static propDecorators={label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],src:[{type:r,args:[{isSignal:!0,alias:`src`,required:!1,transform:void 0}]}],alt:[{type:r,args:[{isSignal:!0,alias:`alt`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-logo`,changeDetection:s.OnPush,host:{class:`logo-tile`},template:`
    @if (src()) {
      <img [src]="src()" [alt]="alt() || label()" />
    } @else {
      <span class="logo-placeholder">{{ label() }}</span>
    }
  `})],c)})))()}export{init_logo_component as n,c as t};