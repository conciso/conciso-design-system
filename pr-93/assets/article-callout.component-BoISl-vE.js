import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,V as i,fn as a,k as o,q as s,sn as c}from"./angular-platform-CAY__VLP.js";var l,u;function init_article_callout_component(){return(init_article_callout_component=e((()=>{a(),o(),l=0,u=class ArticleCalloutComponent{instanceId=`cds-article-callout-${l++}`;eyebrow=t(``);area=t(`co`);eyebrowId=r(()=>this.eyebrow()?`${this.instanceId}-eyebrow`:null);static propDecorators={eyebrow:[{type:s,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],area:[{type:s,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},u=c([n({selector:`cds-article-callout`,changeDetection:i.OnPush,template:`
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