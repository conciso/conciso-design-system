import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,P as a,Tn as o,bn as s,z as c}from"./angular-platform-BGeCprOl.js";import{n as l,t as u}from"./_virtual_angular_jit_style_inline_20c71c1acac87d0e-D4If-lgz.js";var d;function init_hero_image_component(){return(init_hero_image_component=e((()=>{o(),l(),n(),d=class HeroImageComponent{src=i.required();alt=i.required();eyebrow=i(``);heading=i(``);text=i(``);headingLevel=i(1);eager=i(!0);objectPosition=i(``);hasCaption=a(()=>!!(this.eyebrow()||this.heading()||this.text()));static propDecorators={src:[{type:r,args:[{isSignal:!0,alias:`src`,required:!0,transform:void 0}]}],alt:[{type:r,args:[{isSignal:!0,alias:`alt`,required:!0,transform:void 0}]}],eyebrow:[{type:r,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],heading:[{type:r,args:[{isSignal:!0,alias:`heading`,required:!1,transform:void 0}]}],text:[{type:r,args:[{isSignal:!0,alias:`text`,required:!1,transform:void 0}]}],headingLevel:[{type:r,args:[{isSignal:!0,alias:`headingLevel`,required:!1,transform:void 0}]}],eager:[{type:r,args:[{isSignal:!0,alias:`eager`,required:!1,transform:void 0}]}],objectPosition:[{type:r,args:[{isSignal:!0,alias:`objectPosition`,required:!1,transform:void 0}]}]}},d=s([t({selector:`cds-hero-image`,changeDetection:c.OnPush,template:`
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