import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_avatar_stack_component(){return(init_avatar_stack_component=e((()=>{a(),n(),c=class AvatarStackComponent{more=i(0);static propDecorators={more:[{type:r,args:[{isSignal:!0,alias:`more`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-avatar-stack`,changeDetection:s.OnPush,host:{class:`article-avatar-stack`,"aria-hidden":`true`},template:`
    <ng-content></ng-content>
    @if (more() > 0) {
      <div class="article-avatar-more">+{{ more() }}</div>
    }
  `})],c)})))()}export{init_avatar_stack_component as n,c as t};