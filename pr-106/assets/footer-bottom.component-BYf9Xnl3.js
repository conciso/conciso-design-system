import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_footer_bottom_component(){return(init_footer_bottom_component=e((()=>{a(),n(),c=class FooterBottomComponent{copyright=i(`© 2026 Conciso GmbH · Dortmund`);version=i();support=i();legalLinks=i([{label:`Datenschutz`,href:`#`},{label:`Impressum`,href:`#`}]);socialLinks=i([{platform:`linkedin`,href:`#`},{platform:`youtube`,href:`#`}]);socialIcons={linkedin:{label:`LinkedIn`,d:`M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.96-1.8-2.96s-2.08 1.4-2.08 2.86V21h-4z`},youtube:{label:`YouTube`,d:`M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12zM9.75 15.02V8.98L15 12z`}};socialPath(e){return e.iconPath??(e.platform?this.socialIcons[e.platform].d:``)}socialLabel(e){return e.label??(e.platform?this.socialIcons[e.platform].label:``)}static propDecorators={copyright:[{type:r,args:[{isSignal:!0,alias:`copyright`,required:!1,transform:void 0}]}],version:[{type:r,args:[{isSignal:!0,alias:`version`,required:!1,transform:void 0}]}],support:[{type:r,args:[{isSignal:!0,alias:`support`,required:!1,transform:void 0}]}],legalLinks:[{type:r,args:[{isSignal:!0,alias:`legalLinks`,required:!1,transform:void 0}]}],socialLinks:[{type:r,args:[{isSignal:!0,alias:`socialLinks`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-footer-bottom`,changeDetection:s.OnPush,host:{class:`footer-btm`},template:`
    <!-- prettier-ignore -->
    <span
      >{{ copyright() }}@if (version()) {<span aria-hidden="true">&nbsp;·&nbsp;</span>{{ version() }}}</span
    >
    <nav aria-label="Rechtliche Hinweise" style="display:flex;gap:var(--s4);flex-wrap:wrap">
      @for (link of legalLinks(); track $index) {
        <a class="footer-btm-link" [href]="link.href">{{ link.label }}</a>
      }
    </nav>
    @if (support(); as sup) {
      <a class="footer-btm-link" [href]="sup.href">{{ sup.label }}</a>
    }
    @if (socialLinks().length) {
      <!-- Glyphen explizit weiß (fill="#fff") wie die -light-Logo-Assets der Doku:
           currentColor würde die Link-/n-300-Farbe erben (LinkedIn erschiene blau). -->
      <nav class="footer-social" aria-label="Soziale Netzwerke">
        @for (s of socialLinks(); track $index) {
          <a
            [href]="s.href"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="socialLabel(s) + ' (öffnet in neuem Tab)'"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path [attr.d]="socialPath(s)" />
            </svg>
          </a>
        }
      </nav>
    }
  `})],c)})))()}export{init_footer_bottom_component as n,c as t};