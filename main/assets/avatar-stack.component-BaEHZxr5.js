import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_avatar_stack_component(){return(init_avatar_stack_component=e((()=>{i(),a(),c=class AvatarStackComponent{more=t(0);static propDecorators={more:[{type:o,args:[{isSignal:!0,alias:`more`,required:!1,transform:void 0}]}]}},c=s([n({selector:`cds-avatar-stack`,changeDetection:r.OnPush,host:{class:`article-avatar-stack`,"aria-hidden":`true`},template:`
    <ng-content></ng-content>
    @if (more() > 0) {
      <div class="article-avatar-more">+{{ more() }}</div>
    }
  `})],c)})))()}export{init_avatar_stack_component as n,c as t};