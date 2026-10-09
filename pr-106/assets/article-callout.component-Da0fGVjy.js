import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,P as a,Tn as o,bn as s,z as c}from"./angular-platform-BGeCprOl.js";var l,u;function init_article_callout_component(){return(init_article_callout_component=e((()=>{o(),n(),l=0,u=class ArticleCalloutComponent{instanceId=`cds-article-callout-${l++}`;eyebrow=i(``);area=i(`co`);eyebrowId=a(()=>this.eyebrow()?`${this.instanceId}-eyebrow`:null);static propDecorators={eyebrow:[{type:r,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},u=s([t({selector:`cds-article-callout`,changeDetection:c.OnPush,template:`
    <aside
      class="article-callout"
      [attr.data-area]="area() || null"
      [attr.aria-labelledby]="eyebrowId()"
    >
      @if (eyebrow(); as eyebrowText) {
        <p class="article-callout-eyebrow" [id]="eyebrowId()">{{ eyebrowText }}</p>
      }
      <ng-content></ng-content>
    </aside>
  `})],u)})))()}export{init_article_callout_component as n,u as t};