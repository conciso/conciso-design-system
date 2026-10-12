import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{H as n,V as r,fn as i,k as a,sn as o}from"./angular-platform-CAY__VLP.js";import{n as s,t as c}from"./footer-main.component-BLPabolo.js";import{n as l,t as u}from"./footer-bottom.component-BtvAOtiF.js";import{r as d,t as f}from"./dist-Cwu2f28i.js";var p;function init_footer_component(){return(init_footer_component=e((()=>{i(),a(),p=class FooterComponent{},p=o([n({selector:`cds-footer`,changeDetection:r.OnPush,template:`
    <footer class="footer" aria-label="Seitenfuß">
      <ng-content></ng-content>
    </footer>
  `})],p)})))()}var m=t({AppFooter:()=>_,WebsiteFooter:()=>g,__namedExportsOrder:()=>v,default:()=>h}),h,g,_,v;function init_footer_stories(){return(init_footer_stories=e((()=>{f(),l(),init_footer_component(),s(),h={title:`Komponenten/Footer/Komplett`,component:p,decorators:[d({imports:[p,c,u]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-2244`},layout:`fullscreen`,snapshot:{skip:!0},docs:{description:{component:"`<footer>`-Landmark, das die zwei Bänder projiziert. „Website-Footer“ zeigt die volle Marketing-Zusammensetzung (Adresse/Nav/Newsletter im generischen `cds-footer-main` + `cds-footer-bottom`); „App-Footer“ den schlanken Fall für (interne) SPAs: nur der untere Streifen mit Copyright + Rechtslinks."}}}},g={name:`Website-Footer`,render:()=>({template:`
      <cds-footer>
        <cds-footer-main>
          <div>
            <div class="footer-brand">Conciso GmbH</div>
            <address class="footer-address">
              <p>Pariser Bogen 7<br />44269 Dortmund</p>
              <p>
                Tel.: <a class="footer-link" href="tel:+492312261750">+49 231 226175-0</a><br />
                E-Mail: <a class="footer-link" href="mailto:info@conciso.de">info&#64;conciso.de</a>
              </p>
            </address>
          </div>
          <div>
            <h3 class="footer-htitle">Wichtige Inhalte</h3>
            <ul class="footer-nav-list">
              <li><a class="footer-link" href="#">Angewandte KI</a></li>
              <li><a class="footer-link" href="#">Effektive Software</a></li>
              <li><a class="footer-link" href="#">Wirksame Organisationen</a></li>
              <li><a class="footer-link" href="#">Beiträge</a></li>
              <li><a class="footer-link" href="#">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-htitle">Contentletter abonnieren</h3>
            <p class="footer-newsletter-desc">Alle drei Monate neue Beiträge direkt ins Postfach.</p>
            <form class="footer-newsletter-form" aria-label="Contentletter abonnieren">
              <label class="footer-field">
                <span class="footer-field-label">Deine E-Mail <span class="req" aria-hidden="true">*</span></span>
                <input type="email" placeholder="name@unternehmen.de" aria-required="true" autocomplete="email" required />
              </label>
              <label class="footer-newsletter-consent">
                <input type="checkbox" required />
                <span>Einverstanden mit den <a class="body-link" href="#">Datenschutzhinweisen</a></span>
              </label>
              <button type="submit" class="btn btn-filled btn-co">Abonnieren</button>
            </form>
          </div>
        </cds-footer-main>
        <cds-footer-bottom></cds-footer-bottom>
      </cds-footer>
    `})},_={name:`App-Footer (schlank)`,render:()=>({props:{legal:[{label:`Datenschutz`,href:`#`},{label:`Impressum`,href:`#`}],support:{label:`Support`,href:`#`}},template:`
      <cds-footer>
        <cds-footer-bottom
          copyright="© 2026 Conciso GmbH"
          version="Version 1.4.2"
          [support]="support"
          [legalLinks]="legal"
          [socialLinks]="[]"
        ></cds-footer-bottom>
      </cds-footer>
    `})},v=[`WebsiteFooter`,`AppFooter`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Website-Footer',
  // Vollständige Marketing-Zusammensetzung als Beispiel: drei projizierte Spalten
  // (Adresse, wichtige Inhalte, Contentletter) im oberen Band + der Bottom-Streifen.
  render: () => ({
    template: \`
      <cds-footer>
        <cds-footer-main>
          <div>
            <div class="footer-brand">Conciso GmbH</div>
            <address class="footer-address">
              <p>Pariser Bogen 7<br />44269 Dortmund</p>
              <p>
                Tel.: <a class="footer-link" href="tel:+492312261750">+49 231 226175-0</a><br />
                E-Mail: <a class="footer-link" href="mailto:info@conciso.de">info&#64;conciso.de</a>
              </p>
            </address>
          </div>
          <div>
            <h3 class="footer-htitle">Wichtige Inhalte</h3>
            <ul class="footer-nav-list">
              <li><a class="footer-link" href="#">Angewandte KI</a></li>
              <li><a class="footer-link" href="#">Effektive Software</a></li>
              <li><a class="footer-link" href="#">Wirksame Organisationen</a></li>
              <li><a class="footer-link" href="#">Beiträge</a></li>
              <li><a class="footer-link" href="#">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer-htitle">Contentletter abonnieren</h3>
            <p class="footer-newsletter-desc">Alle drei Monate neue Beiträge direkt ins Postfach.</p>
            <form class="footer-newsletter-form" aria-label="Contentletter abonnieren">
              <label class="footer-field">
                <span class="footer-field-label">Deine E-Mail <span class="req" aria-hidden="true">*</span></span>
                <input type="email" placeholder="name@unternehmen.de" aria-required="true" autocomplete="email" required />
              </label>
              <label class="footer-newsletter-consent">
                <input type="checkbox" required />
                <span>Einverstanden mit den <a class="body-link" href="#">Datenschutzhinweisen</a></span>
              </label>
              <button type="submit" class="btn btn-filled btn-co">Abonnieren</button>
            </form>
          </div>
        </cds-footer-main>
        <cds-footer-bottom></cds-footer-bottom>
      </cds-footer>
    \`
  })
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'App-Footer (schlank)',
  // Für (interne) SPAs: nur der untere Streifen — Copyright + Rechtslinks, keine
  // Social-Profile. Kein oberes Marketing-Band.
  render: () => ({
    props: {
      legal: [{
        label: 'Datenschutz',
        href: '#'
      }, {
        label: 'Impressum',
        href: '#'
      }],
      support: {
        label: 'Support',
        href: '#'
      }
    },
    template: \`
      <cds-footer>
        <cds-footer-bottom
          copyright="© 2026 Conciso GmbH"
          version="Version 1.4.2"
          [support]="support"
          [legalLinks]="legal"
          [socialLinks]="[]"
        ></cds-footer-bottom>
      </cds-footer>
    \`
  })
}`,..._.parameters?.docs?.source}}}})))()}export{init_footer_stories as n,m as t};