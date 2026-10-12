import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{i as t,t as n}from"./dist-2fJEWV6G.js";import{n as r,t as i}from"./footer-main.component-BLPabolo.js";var a,o,s,c;function init_footer_main_stories(){return(init_footer_main_stories=e((()=>{n(),r(),a={title:`Komponenten/Footer/Oberer Teil`,component:i,decorators:[t({imports:[i]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-2242`},layout:`fullscreen`,snapshot:{skip:!0},docs:{description:{component:"Oberer Footer-Teil (`.footer-main`) als generisches Spalten-Layout: beliebige Spalten werden projiziert (jedes Top-Level-Kind = eine Grid-Spalte). Spaltenanzahl/-breiten über `columns` (grid-template-columns); ohne Angabe gilt das 3-Spalten-Default. Adresse/Nav/Newsletter sind dadurch freie Kompositionen (siehe die kombinierte „Footer“-Story), keine erzwungene Struktur."}}},argTypes:{columns:{control:`text`}},args:{columns:void 0}},o={render:e=>({props:e,template:`
      <cds-footer-main [columns]="columns">
        <div>
          <h3 class="footer-htitle">Produkt</h3>
          <ul class="footer-nav-list">
            <li><a class="footer-link" href="#">Funktionen</a></li>
            <li><a class="footer-link" href="#">Preise</a></li>
            <li><a class="footer-link" href="#">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-htitle">Ressourcen</h3>
          <ul class="footer-nav-list">
            <li><a class="footer-link" href="#">Dokumentation</a></li>
            <li><a class="footer-link" href="#">Beiträge</a></li>
            <li><a class="footer-link" href="#">Status</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-htitle">Kontakt</h3>
          <address class="footer-address">
            <p>Pariser Bogen 7<br />44269 Dortmund</p>
            <p>E-Mail: <a class="footer-link" href="mailto:info@conciso.de">info&#64;conciso.de</a></p>
          </address>
        </div>
      </cds-footer-main>
    `})},s={name:`Vier Spalten (columns)`,render:()=>({template:`
      <cds-footer-main columns="repeat(4, 1fr)">
        @for (col of ['Produkt', 'Lösungen', 'Ressourcen', 'Unternehmen']; track col) {
          <div>
            <h3 class="footer-htitle">{{ col }}</h3>
            <ul class="footer-nav-list">
              <li><a class="footer-link" href="#">Link A</a></li>
              <li><a class="footer-link" href="#">Link B</a></li>
            </ul>
          </div>
        }
      </cds-footer-main>
    `})},c=[`Interaktiv`,`VierSpalten`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  // Drei projizierte Spalten im Default-Grid (1.2fr 1fr 1.3fr).
  render: args => ({
    props: args,
    template: \`
      <cds-footer-main [columns]="columns">
        <div>
          <h3 class="footer-htitle">Produkt</h3>
          <ul class="footer-nav-list">
            <li><a class="footer-link" href="#">Funktionen</a></li>
            <li><a class="footer-link" href="#">Preise</a></li>
            <li><a class="footer-link" href="#">Roadmap</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-htitle">Ressourcen</h3>
          <ul class="footer-nav-list">
            <li><a class="footer-link" href="#">Dokumentation</a></li>
            <li><a class="footer-link" href="#">Beiträge</a></li>
            <li><a class="footer-link" href="#">Status</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-htitle">Kontakt</h3>
          <address class="footer-address">
            <p>Pariser Bogen 7<br />44269 Dortmund</p>
            <p>E-Mail: <a class="footer-link" href="mailto:info@conciso.de">info&#64;conciso.de</a></p>
          </address>
        </div>
      </cds-footer-main>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Vier Spalten (columns)',
  // Beliebige Spaltenzahl/-breite über die columns-Eingabe.
  render: () => ({
    template: \`
      <cds-footer-main columns="repeat(4, 1fr)">
        @for (col of ['Produkt', 'Lösungen', 'Ressourcen', 'Unternehmen']; track col) {
          <div>
            <h3 class="footer-htitle">{{ col }}</h3>
            <ul class="footer-nav-list">
              <li><a class="footer-link" href="#">Link A</a></li>
              <li><a class="footer-link" href="#">Link B</a></li>
            </ul>
          </div>
        }
      </cds-footer-main>
    \`
  })
}`,...s.parameters?.docs?.source}}}})))()}init_footer_main_stories();export{o as Interaktiv,s as VierSpalten,c as __namedExportsOrder,a as default};