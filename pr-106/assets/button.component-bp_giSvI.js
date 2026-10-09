import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,P as a,Tn as o,bn as s,j as c,q as l,z as u}from"./angular-platform-BGeCprOl.js";var d;function init_button_component(){return(init_button_component=e((()=>{o(),n(),d=class ButtonComponent{label=i(`Button`);variant=i(`filled`);area=i(`co`);tone=i(`def`);size=i(`md`);full=i(!1);disabled=i(!1);type=i(`button`);clicked=c();classes=a(()=>{let e=this.variant()===`filled-on-band`,t=this.tone()===`err`?`err`:this.area(),n=[`btn`,`btn-${e?`filled`:this.variant()}`,`btn-${t}`];return this.size()===`sm`&&n.push(`btn-sm`),this.size()===`lg`&&n.push(`btn-lg`),this.full()&&n.push(`btn-full`),e&&n.push(`btn-on-band`),n.join(` `)});static propDecorators={label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],variant:[{type:r,args:[{isSignal:!0,alias:`variant`,required:!1,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],tone:[{type:r,args:[{isSignal:!0,alias:`tone`,required:!1,transform:void 0}]}],size:[{type:r,args:[{isSignal:!0,alias:`size`,required:!1,transform:void 0}]}],full:[{type:r,args:[{isSignal:!0,alias:`full`,required:!1,transform:void 0}]}],disabled:[{type:r,args:[{isSignal:!0,alias:`disabled`,required:!1,transform:void 0}]}],type:[{type:r,args:[{isSignal:!0,alias:`type`,required:!1,transform:void 0}]}],clicked:[{type:l,args:[`clicked`]}]}},d=s([t({selector:`cds-button`,changeDetection:u.OnPush,host:{"[style.display]":`full() ? 'block' : null`},template:`
    <button
      [class]="classes()"
      [disabled]="disabled()"
      [attr.type]="type()"
      (click)="clicked.emit($event)"
    >
      {{ label() }}
    </button>
  `})],d)})))()}export{init_button_component as n,d as t};