import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,N as i,V as a,Y as o,fn as s,k as c,q as l,sn as u}from"./angular-platform-CAY__VLP.js";var d;function init_button_component(){return(init_button_component=e((()=>{s(),c(),d=class ButtonComponent{label=t(`Button`);variant=t(`filled`);area=t(`co`);tone=t(`def`);size=t(`md`);full=t(!1);disabled=t(!1);type=t(`button`);clicked=i();classes=r(()=>{let e=this.variant()===`filled-on-band`,t=this.tone()===`err`?`err`:this.area(),n=[`btn`,`btn-${e?`filled`:this.variant()}`,`btn-${t}`];return this.size()===`sm`&&n.push(`btn-sm`),this.size()===`lg`&&n.push(`btn-lg`),this.full()&&n.push(`btn-full`),e&&n.push(`btn-on-band`),n.join(` `)});static propDecorators={label:[{type:l,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],variant:[{type:l,args:[{isSignal:!0,alias:`variant`,required:!1,transform:void 0}]}],area:[{type:l,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],tone:[{type:l,args:[{isSignal:!0,alias:`tone`,required:!1,transform:void 0}]}],size:[{type:l,args:[{isSignal:!0,alias:`size`,required:!1,transform:void 0}]}],full:[{type:l,args:[{isSignal:!0,alias:`full`,required:!1,transform:void 0}]}],disabled:[{type:l,args:[{isSignal:!0,alias:`disabled`,required:!1,transform:void 0}]}],type:[{type:l,args:[{isSignal:!0,alias:`type`,required:!1,transform:void 0}]}],clicked:[{type:o,args:[`clicked`]}]}},d=u([n({selector:`cds-button`,changeDetection:a.OnPush,host:{"[style.display]":`full() ? 'block' : null`},template:`
    <button
      [class]="classes()"
      [disabled]="disabled()"
      [attr.type]="type()"
      (click)="clicked.emit($event)"
    >
      {{ label() }}
    </button>
  `})],d)})))()}export{init_button_component as n,d as t};