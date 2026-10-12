import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_article_figure_component(){return(init_article_figure_component=e((()=>{a(),n(),c=class ArticleFigureComponent{src=i.required();alt=i.required();caption=i(``);static propDecorators={src:[{type:r,args:[{isSignal:!0,alias:`src`,required:!0,transform:void 0}]}],alt:[{type:r,args:[{isSignal:!0,alias:`alt`,required:!0,transform:void 0}]}],caption:[{type:r,args:[{isSignal:!0,alias:`caption`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-article-figure`,changeDetection:s.OnPush,template:`
    <figure class="article-figure">
      <img [src]="src()" [alt]="alt()" loading="lazy" />
      @if (caption()) {
        <figcaption class="article-figcaption">{{ caption() }}</figcaption>
      }
    </figure>
  `})],c)})))()}export{init_article_figure_component as n,c as t};