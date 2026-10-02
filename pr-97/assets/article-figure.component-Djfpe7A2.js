import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_article_figure_component(){return(init_article_figure_component=e((()=>{i(),a(),c=class ArticleFigureComponent{src=t.required();alt=t.required();caption=t(``);static propDecorators={src:[{type:o,args:[{isSignal:!0,alias:`src`,required:!0,transform:void 0}]}],alt:[{type:o,args:[{isSignal:!0,alias:`alt`,required:!0,transform:void 0}]}],caption:[{type:o,args:[{isSignal:!0,alias:`caption`,required:!1,transform:void 0}]}]}},c=s([n({selector:`cds-article-figure`,changeDetection:r.OnPush,template:`
    <figure class="article-figure">
      <img [src]="src()" [alt]="alt()" loading="lazy" />
      @if (caption()) {
        <figcaption class="article-figcaption">{{ caption() }}</figcaption>
      }
    </figure>
  `})],c)})))()}export{init_article_figure_component as n,c as t};