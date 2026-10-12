import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,V as i,fn as a,k as o,q as s,sn as c}from"./angular-platform-CAY__VLP.js";import{n as l,t as u}from"./_virtual_angular_jit_style_inline_20c71c1acac87d0e-D4If-lgz.js";var d;function init_hero_image_component(){return(init_hero_image_component=e((()=>{a(),l(),o(),d=class HeroImageComponent{src=t.required();alt=t.required();eyebrow=t(``);heading=t(``);text=t(``);headingLevel=t(1);eager=t(!0);objectPosition=t(``);hasCaption=r(()=>!!(this.eyebrow()||this.heading()||this.text()));static propDecorators={src:[{type:s,args:[{isSignal:!0,alias:`src`,required:!0,transform:void 0}]}],alt:[{type:s,args:[{isSignal:!0,alias:`alt`,required:!0,transform:void 0}]}],eyebrow:[{type:s,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],heading:[{type:s,args:[{isSignal:!0,alias:`heading`,required:!1,transform:void 0}]}],text:[{type:s,args:[{isSignal:!0,alias:`text`,required:!1,transform:void 0}]}],headingLevel:[{type:s,args:[{isSignal:!0,alias:`headingLevel`,required:!1,transform:void 0}]}],eager:[{type:s,args:[{isSignal:!0,alias:`eager`,required:!1,transform:void 0}]}],objectPosition:[{type:s,args:[{isSignal:!0,alias:`objectPosition`,required:!1,transform:void 0}]}]}},d=c([n({selector:`cds-hero-image`,changeDetection:i.OnPush,template:`
    <figure class="hero-image">
      <div class="hero-image-media">
        <img
          [src]="src()"
          [alt]="alt()"
          [attr.loading]="eager() ? 'eager' : 'lazy'"
          [style.object-position]="objectPosition() || null"
        />
      </div>
      @if (hasCaption()) {
        <figcaption class="hero-image-caption">
          @if (eyebrow()) {
            <p class="hero-image-caption-eyebrow">{{ eyebrow() }}</p>
          }
          @if (heading()) {
            @if (headingLevel() === 2) {
              <h2 class="hero-image-caption-title">{{ heading() }}</h2>
            } @else {
              <h1 class="hero-image-caption-title">{{ heading() }}</h1>
            }
          }
          @if (text()) {
            <p class="hero-image-caption-text">{{ text() }}</p>
          }
        </figcaption>
      }
    </figure>
  `,styles:[u]})],d)})))()}export{init_hero_image_component as n,d as t};