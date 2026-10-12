import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,Ft as i,G as a,H as o,It as s,Kt as c,O as l,Tn as u,_ as d,bn as f,d as p,qt as m,z as h}from"./angular-platform-BGeCprOl.js";import{d as g,n as _,p as v,s as y}from"./lucide-angular-CTBwqO1y.js";import{n as b,t as x}from"./cds-icons-DtWH1HnJ.js";import{n as S,t as C}from"./cycle-button.component-Blm3sNTb.js";var w,T,E;function init_topnav_component(){return(init_topnav_component=e((()=>{u(),p(),r(),b(),S(),T=0,E=class TopnavComponent{static{w=this}iconStroke=x;host=c(o);document=c(i);cdr=c(d);static HOVER_OPEN_MS=100;static HOVER_CLOSE_MS=250;openTimer;closeTimer;constructor(){c(s).onDestroy(()=>this.clearHoverTimers())}uid=++T;searchId=`cds-topnav-search-${this.uid}`;navId=`cds-topnav-nav-${this.uid}`;searchPopId=`cds-topnav-search-pop-${this.uid}`;logo=l(`conciso.`);logoSrc=l();logoDarkSrc=l();logoAlt=l(``);ctaLabel=l(`Kontakt`);showSearch=l(!0);showCta=l(!0);showSystemTheme=l(!0);activeHref=l();links=l([{label:`Leistungen`,sub:[{label:`Angewandte KI`,href:`#ki`},{label:`Effektive Software`,href:`#software`},{label:`Wirksame Organisationen`,href:`#organisationen`}]},{label:`Unternehmen`,sub:[{label:`Über uns`,href:`#ueber-uns`},{label:`Team`,href:`#team`},{label:`Jobs`,href:`#jobs`}]},{label:`Beiträge`,href:`#beitraege`},{label:`Kontakt`,href:`#kontakt`}]);openIndex=m(-1);searchOpen=m(!1);navOpen=m(!1);subId(e){return`cds-topnav-sub-${this.uid}-${e}`}toggleSub(e){this.clearHoverTimers(),this.openIndex.set(this.openIndex()===e?-1:e),this.searchOpen.set(!1)}toggleSearch(){this.clearHoverTimers();let e=!this.searchOpen();this.searchOpen.set(e),this.openIndex.set(-1),e&&(this.cdr.detectChanges(),this.host.nativeElement.querySelector(`.ep-nav-search-input`)?.focus())}onLabelClick(e,t){if(!t.href){e.preventDefault();return}this.closeAll()}onItemEnter(e){this.hoverCapable()&&(this.clearHoverTimers(),this.openTimer=setTimeout(()=>{this.openIndex.set(e),this.searchOpen.set(!1),this.cdr.markForCheck()},w.HOVER_OPEN_MS))}onItemLeave(e){this.hoverCapable()&&(this.clearHoverTimers(),this.closeTimer=setTimeout(()=>{this.openIndex()===e&&this.openIndex.set(-1),this.cdr.markForCheck()},w.HOVER_CLOSE_MS))}onFocusOut(e){let t=e.target,n=e.relatedTarget,r=t?.closest(`.ep-nav-has-sub`);if(r&&!r.contains(n)){let e=Number(r.dataset.subIndex);this.openIndex()===e&&(this.clearHoverTimers(),this.openIndex.set(-1))}let i=t?.closest(`.ep-nav-search`);i&&!i.contains(n)&&this.searchOpen()&&this.searchOpen.set(!1)}onKeydown(e){let t=e.target?.closest(`.ep-nav-has-sub`);t&&this.host.nativeElement.contains(t)&&this.onItemKeydown(e,Number(t.dataset.subIndex))}onItemKeydown(e,t){let n=this.openIndex()===t,r=e.key;if(r===`ArrowDown`){e.preventDefault(),n||(this.clearHoverTimers(),this.openIndex.set(t),this.searchOpen.set(!1),this.cdr.detectChanges());let r=this.subLinks(t),i=r.indexOf(this.document.activeElement);(i===-1||i===r.length-1?r[0]:r[i+1])?.focus()}else if(n&&r===`ArrowUp`){e.preventDefault();let n=this.subLinks(t),r=n.indexOf(this.document.activeElement);(r<=0?n[n.length-1]:n[r-1])?.focus()}else if(n&&(r===`Home`||r===`End`)){e.preventDefault();let n=this.subLinks(t);(r===`Home`?n[0]:n[n.length-1])?.focus()}}subLinks(e){let t=this.host.nativeElement.querySelector(`#${this.subId(e)}`);return t?Array.from(t.querySelectorAll(`a`)):[]}hoverCapable(){return!!this.document.defaultView?.matchMedia?.(`(hover:hover) and (pointer:fine)`).matches}clearHoverTimers(){clearTimeout(this.openTimer),clearTimeout(this.closeTimer)}toggleNav(){this.clearHoverTimers(),this.navOpen.set(!this.navOpen()),this.openIndex.set(-1),this.searchOpen.set(!1)}closeAll(){this.clearHoverTimers(),this.openIndex.set(-1),this.searchOpen.set(!1),this.navOpen.set(!1)}onDocumentClick(e){this.host.nativeElement.contains(e.target)||this.closeAll()}onEscape(){this.closeWithFocusReturn()}closeWithFocusReturn(){let e=this.document.activeElement,t=null,n=this.openIndex();if(n>=0){let r=this.host.nativeElement.querySelector(`[aria-controls="${this.subId(n)}"]`);r&&e&&r.closest(`.ep-nav-item`)?.contains(e)&&(t=r)}else if(this.searchOpen()){let n=this.host.nativeElement.querySelector(`.ep-nav-search-pop`);n&&e&&n.contains(e)&&(t=this.host.nativeElement.querySelector(`.ep-nav-search-toggle`))}if(!t&&this.navOpen()){let n=this.host.nativeElement.querySelector(`#${this.navId}`);n&&e&&n.contains(e)&&(t=this.host.nativeElement.querySelector(`.ep-nav-burger`))}this.closeAll(),t?.focus()}static ctorParameters=()=>[];static propDecorators={logo:[{type:a,args:[{isSignal:!0,alias:`logo`,required:!1,transform:void 0}]}],logoSrc:[{type:a,args:[{isSignal:!0,alias:`logoSrc`,required:!1,transform:void 0}]}],logoDarkSrc:[{type:a,args:[{isSignal:!0,alias:`logoDarkSrc`,required:!1,transform:void 0}]}],logoAlt:[{type:a,args:[{isSignal:!0,alias:`logoAlt`,required:!1,transform:void 0}]}],ctaLabel:[{type:a,args:[{isSignal:!0,alias:`ctaLabel`,required:!1,transform:void 0}]}],showSearch:[{type:a,args:[{isSignal:!0,alias:`showSearch`,required:!1,transform:void 0}]}],showCta:[{type:a,args:[{isSignal:!0,alias:`showCta`,required:!1,transform:void 0}]}],showSystemTheme:[{type:a,args:[{isSignal:!0,alias:`showSystemTheme`,required:!1,transform:void 0}]}],activeHref:[{type:a,args:[{isSignal:!0,alias:`activeHref`,required:!1,transform:void 0}]}],links:[{type:a,args:[{isSignal:!0,alias:`links`,required:!1,transform:void 0}]}]}},E=w=f([n({selector:`cds-topnav`,changeDetection:h.OnPush,imports:[C,_,y,g,v],host:{"(document:click)":`onDocumentClick($event)`,"(document:keydown.escape)":`onEscape()`,"(keydown)":`onKeydown($event)`,"(focusout)":`onFocusOut($event)`},template:`
    <header class="ep-topnav" [class.nav-open]="navOpen()">
      <a class="ep-logo" href="#" (click)="$event.preventDefault()">
        @if (logoSrc()) {
          <!-- Größe (24px) + Theme-Swap kommen aus der portablen css/components.css
               (.ep-logo img, .logo-themed-default/-light via [data-theme]). -->
          <img
            [class.logo-themed-default]="!!logoDarkSrc()"
            [src]="logoSrc()"
            [alt]="logoAlt() || logo()"
          />
          @if (logoDarkSrc()) {
            <img class="logo-themed-light" [src]="logoDarkSrc()" [alt]="logoAlt() || logo()" />
          }
        } @else {
          {{ logo() }}
        }
      </a>

      <nav class="ep-nav-links" [id]="navId" aria-label="Hauptnavigation">
        @for (item of links(); track $index; let i = $index) {
          @if (item.sub?.length) {
            <div
              class="ep-nav-item ep-nav-has-sub"
              [class.is-open]="openIndex() === i"
              [attr.data-sub-index]="i"
              (mouseenter)="onItemEnter(i)"
              (mouseleave)="onItemLeave(i)"
            >
              <!-- Label = eigener Link (führt z. B. auf eine Übersichtsseite), NICHT der Toggle.
                   Der Caret ist ein separater Button daneben. Ohne href bleibt es ein
                   Platzhalter-Link (#, kein Sprung). -->
              <a
                class="ep-nav-btn"
                [href]="item.href || '#'"
                [attr.aria-current]="item.href && item.href === activeHref() ? 'page' : null"
                (click)="onLabelClick($event, item)"
              >
                {{ item.label }}
              </a>
              <button
                class="ep-nav-item-toggle"
                type="button"
                [attr.aria-label]="'Untermenü ' + item.label"
                [attr.aria-expanded]="openIndex() === i"
                [attr.aria-controls]="subId(i)"
                (click)="toggleSub(i)"
              >
                <!-- Caret: absolute Strichstärke, hält 1,5 px Bildschirmstrich auch bei 10 px Größe. -->
                <svg
                  lucideChevronDown
                  class="ep-nav-item-caret"
                  [size]="10"
                  [strokeWidth]="iconStroke"
                  [absoluteStrokeWidth]="true"
                ></svg>
              </button>
              <div class="ep-nav-sub" [id]="subId(i)">
                @for (s of item.sub; track $index) {
                  <a
                    class="ep-nav-sub-btn"
                    [href]="s.href"
                    [attr.aria-current]="s.href === activeHref() ? 'page' : null"
                    (click)="closeAll()"
                  >
                    {{ s.label }}
                  </a>
                }
              </div>
            </div>
          } @else {
            <a
              class="ep-nav-btn"
              [href]="item.href || '#'"
              [attr.aria-current]="item.href && item.href === activeHref() ? 'page' : null"
              (click)="closeAll()"
            >
              {{ item.label }}
            </a>
          }
        }
      </nav>

      <div class="ep-nav-actions">
        @if (showSearch()) {
          <div class="ep-nav-search" [class.is-open]="searchOpen()">
            <button
              class="ep-nav-icon-btn ep-nav-search-toggle"
              type="button"
              [attr.aria-label]="searchOpen() ? 'Suche schließen' : 'Suche öffnen'"
              [attr.aria-expanded]="searchOpen()"
              [attr.aria-controls]="searchPopId"
              (click)="toggleSearch()"
            >
              <svg lucideSearch size="22" [strokeWidth]="iconStroke"></svg>
            </button>
            <div class="ep-nav-search-pop" [id]="searchPopId">
              <form class="ep-nav-search-form" role="search" (submit)="$event.preventDefault()">
                <label class="sr-only" [attr.for]="searchId">Suchbegriff</label>
                <input
                  class="ep-nav-search-input"
                  [id]="searchId"
                  type="search"
                  placeholder="Wonach suchst Du?"
                  autocomplete="off"
                />
                <button class="btn btn-filled btn-sm btn-co" type="submit">Suchen</button>
              </form>
            </div>
          </div>
        }

        <cds-theme-cycle [showSystem]="showSystemTheme()" />
      </div>

      <!-- Hamburger: nur unter dem Mobile-Breakpoint sichtbar (CSS .ep-nav-burger), schaltet
           .nav-open am Header → .ep-nav-links klappt auf. Icons via .icon-menu/.icon-close. -->
      <button
        class="ep-nav-burger"
        type="button"
        [attr.aria-label]="navOpen() ? 'Menü schließen' : 'Menü öffnen'"
        [attr.aria-expanded]="navOpen()"
        [attr.aria-controls]="navId"
        (click)="toggleNav()"
      >
        <svg lucideMenu class="icon-menu" size="24" [strokeWidth]="iconStroke"></svg>
        <svg lucideX class="icon-close" size="24" [strokeWidth]="iconStroke"></svg>
      </button>

      @if (showCta()) {
        <a class="btn btn-outlined btn-sm btn-co" href="#" (click)="$event.preventDefault()">{{
          ctaLabel()
        }}</a>
      }
    </header>
  `})],E)})))()}var D=t({DoppelteLabels:()=>F,HeraustabbenSchliesstSubmenue:()=>z,HeraustabbenSchliesstSuche:()=>B,HoverOeffnen:()=>L,IconStrichstaerke:()=>W,Interaktiv:()=>N,LabelOhneZielSchliesstNichts:()=>H,Minimal:()=>P,MobilmenueLinkKlick:()=>V,SucheBrichtHoverTimerAb:()=>U,SucheLabelUndFokus:()=>R,TastaturImSubmenue:()=>I,__namedExportsOrder:()=>G,default:()=>M}),O,k,A,j,M,N,P,F,blockNavigation,I,L,R,z,B,V,H,U,W,G;function init_topnav_stories(){return(init_topnav_stories=e((()=>{init_topnav_component(),{within:O,userEvent:k,expect:A,waitFor:j}=__STORYBOOK_MODULE_TEST__,M={title:`Komponenten/Navigation/Topnav`,component:E,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1061`},layout:`fullscreen`,docs:{description:{component:"Hauptnavigation der Customer-Pages: Logo (Text ODER Bild/SVG mit Theme-Swap) und Top-Level-Links mit aufklappbaren Submenüs links, rechts optional Suche, der Theme-Cycle-Button und ein optionaler Kontakt-Button als Call-to-Action. Der aktive Eintrag (genau einer, via `activeHref`) wird über einen dezenten Unterstrich und Bereichsfarbe markiert. Barrierefrei nach WCAG 2.1 AA."}}},argTypes:{logo:{control:`text`},logoSrc:{control:`text`},logoDarkSrc:{control:`text`},logoAlt:{control:`text`},ctaLabel:{control:`text`},activeHref:{control:`text`},showSearch:{control:`boolean`},showCta:{control:`boolean`},showSystemTheme:{control:`boolean`}},args:{logo:`conciso.`,logoSrc:`./conciso/brand/logo-conciso.svg`,logoDarkSrc:`./conciso/brand/logo-conciso-light.svg`,logoAlt:`Conciso`,ctaLabel:`Kontakt`,activeHref:`#kontakt`,showSearch:!0,showCta:!0,showSystemTheme:!0}},N={parameters:{snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=O(e),n=t.getByRole(`button`,{name:/Leistungen/});await A(n).toHaveAttribute(`aria-expanded`,`false`),await k.click(n),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.keyboard(`{Escape}`),await A(n).toHaveAttribute(`aria-expanded`,`false`);let r=t.getByRole(`link`,{name:`Kontakt`,current:!1});await A(r).toHaveClass(`btn-outlined`),await A(r).not.toHaveClass(`btn-filled`),await A(e.querySelectorAll(`[aria-current="page"]`)).toHaveLength(1),n.focus(),await k.keyboard(`{Enter}`),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.tab();let i=t.getByRole(`link`,{name:`Angewandte KI`,hidden:!0});await A(i).toHaveFocus(),await k.keyboard(`{Escape}`),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(n).toHaveFocus()}},P={name:`Ohne Suche & Kontakt`,parameters:{snapshot:{skip:!0}},args:{showSearch:!1,showCta:!1},play:async({canvasElement:e})=>{await A(e.querySelector(`.ep-nav-search`)).toBeNull(),await A(e.querySelector(`a.btn`)).toBeNull()}},F={name:`Doppelte Labels`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{links:[{label:`Leistungen`,sub:[{label:`Übersicht`,href:`#l`},{label:`Beratung`,href:`#b`}]},{label:`Wissen`,sub:[{label:`Übersicht`,href:`#w`},{label:`Übersicht`,href:`#w2`}]},{label:`Wissen`,href:`#wissen`}]},play:async({canvasElement:e})=>{await A(e.querySelectorAll(`nav.ep-nav-links > *`)).toHaveLength(3),await A(e.querySelectorAll(`.ep-nav-sub a`)).toHaveLength(4)}},blockNavigation=e=>e.addEventListener(`click`,e=>{e.target.closest(`a`)&&e.preventDefault()}),I={name:`Tastatur im Submenü`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{blockNavigation(e);let t=O(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`}),r=t.getByRole(`button`,{name:`Untermenü Unternehmen`}),i=t.getByRole(`link`,{name:`Angewandte KI`,hidden:!0}),a=t.getByRole(`link`,{name:`Effektive Software`,hidden:!0}),o=t.getByRole(`link`,{name:`Wirksame Organisationen`,hidden:!0});n.focus(),await k.keyboard(`{ArrowUp}`),await A(n).toHaveAttribute(`aria-expanded`,`false`),await k.keyboard(`{ArrowDown}`),await A(n).toHaveAttribute(`aria-expanded`,`true`),await A(i).toHaveFocus(),await k.keyboard(`{ArrowDown}`),await A(a).toHaveFocus(),await k.keyboard(`{ArrowDown}`),await A(o).toHaveFocus(),await k.keyboard(`{ArrowDown}`),await A(i).toHaveFocus(),await k.keyboard(`{ArrowUp}`),await A(o).toHaveFocus(),await k.keyboard(`{ArrowUp}`),await A(a).toHaveFocus(),await k.keyboard(`{Home}`),await A(i).toHaveFocus(),await k.keyboard(`{End}`),await A(o).toHaveFocus(),r.focus(),await k.keyboard(`{ArrowDown}`),await A(r).toHaveAttribute(`aria-expanded`,`true`),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(t.getByRole(`link`,{name:`Über uns`,hidden:!0})).toHaveFocus(),await k.keyboard(`{Escape}`),await A(r).toHaveAttribute(`aria-expanded`,`false`),await A(r).toHaveFocus()}},L={name:`Öffnen per Hover`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=O(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`}),r=n.closest(`.ep-nav-item`),i=t.getByRole(`button`,{name:`Untermenü Unternehmen`}),a=i.closest(`.ep-nav-item`);await k.hover(r),await j(()=>A(n).toHaveAttribute(`aria-expanded`,`true`)),await k.unhover(r),await j(()=>A(n).toHaveAttribute(`aria-expanded`,`false`),{timeout:1500}),await k.hover(r),await j(()=>A(n).toHaveAttribute(`aria-expanded`,`true`)),await k.unhover(r),await k.hover(a),await j(()=>A(i).toHaveAttribute(`aria-expanded`,`true`)),await A(n).toHaveAttribute(`aria-expanded`,`false`),document.activeElement?.blur(),await k.keyboard(`{Escape}`),await A(i).toHaveAttribute(`aria-expanded`,`false`),await k.unhover(a),await k.hover(r),await k.click(n),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.click(n),await A(n).toHaveAttribute(`aria-expanded`,`false`),await new Promise(e=>setTimeout(e,150)),await A(n).toHaveAttribute(`aria-expanded`,`false`),await k.unhover(r)}},R={name:`Suche: Label und Fokus`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=O(e),n=t.getByRole(`button`,{name:`Suche öffnen`});await A(n).toHaveAttribute(`aria-expanded`,`false`),await k.click(n),await A(n).toHaveAttribute(`aria-expanded`,`true`),await A(n).toHaveAccessibleName(`Suche schließen`),await A(t.getByRole(`searchbox`,{name:`Suchbegriff`})).toHaveFocus(),await k.keyboard(`{Escape}`),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(n).toHaveAccessibleName(`Suche öffnen`),await A(n).toHaveFocus(),await k.click(n),await A(n).toHaveAccessibleName(`Suche schließen`),await k.click(n),await A(n).toHaveAccessibleName(`Suche öffnen`)}},z={name:`Heraustabben schließt Submenü`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=O(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`});n.focus(),await k.keyboard(`{Enter}`),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.tab(),await A(t.getByRole(`link`,{name:`Angewandte KI`,hidden:!0})).toHaveFocus(),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.tab(),await k.tab(),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.tab(),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(n).not.toHaveFocus(),await A(e.contains(document.activeElement)).toBe(!0)}},B={name:`Heraustabben schließt Suche`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=O(e),n=t.getByRole(`button`,{name:`Suche öffnen`});await k.click(n),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.tab(),await A(t.getByRole(`button`,{name:`Suchen`})).toHaveFocus(),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.tab(),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(n).toHaveAccessibleName(`Suche öffnen`)}},V={name:`Mobilmenü: Link-Klick schließt`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{links:[{label:`Leistungen`,href:`#leistungen`,sub:[{label:`Angewandte KI`,href:`#ki`}]},{label:`Beiträge`,href:`#beitraege`}]},play:async({canvasElement:e})=>{blockNavigation(e);let t=O(e),n=e.querySelector(`.ep-nav-burger`),r=e.querySelector(`.ep-topnav`),i=[t.getByRole(`link`,{name:`Beiträge`}),t.getByRole(`link`,{name:`Leistungen`})];for(let e of i)await k.click(n),await A(r).toHaveClass(`nav-open`),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.click(e),await A(r).not.toHaveClass(`nav-open`),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(n).toHaveAttribute(`aria-label`,`Menü öffnen`)}},H={name:`Label ohne Ziel schließt nichts`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{blockNavigation(e);let t=O(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`});await k.click(n),await A(n).toHaveAttribute(`aria-expanded`,`true`),await k.click(t.getByRole(`link`,{name:`Leistungen`})),await A(n).toHaveAttribute(`aria-expanded`,`true`)}},U={name:`Suche bricht Hover-Timer ab`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=O(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`}),r=n.closest(`.ep-nav-item`),i=t.getByRole(`button`,{name:`Suche öffnen`});await k.hover(r),await k.click(i),await A(i).toHaveAttribute(`aria-expanded`,`true`),await new Promise(e=>setTimeout(e,150)),await A(n).toHaveAttribute(`aria-expanded`,`false`),await A(i).toHaveAttribute(`aria-expanded`,`true`),await k.unhover(r)}},W={name:`Icon-Strichstärke`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelectorAll(`.ep-nav-burger svg, .ep-nav-icon-btn svg`);await A(t.length).toBeGreaterThanOrEqual(3);for(let e of Array.from(t))await A(e).toHaveAttribute(`aria-hidden`,`true`),await A(parseFloat(getComputedStyle(e).strokeWidth)).toBe(1.5);let n=e.querySelector(`svg.ep-nav-item-caret`);await A(n).toHaveAttribute(`aria-hidden`,`true`),await A(n).toHaveAttribute(`viewBox`,`0 0 24 24`);let r=parseFloat(getComputedStyle(n).strokeWidth);await A(r).toBeCloseTo(3.6,5),await A(r*10/24).toBeCloseTo(1.5,5)}},G=[`Interaktiv`,`Minimal`,`DoppelteLabels`,`TastaturImSubmenue`,`HoverOeffnen`,`SucheLabelUndFokus`,`HeraustabbenSchliesstSubmenue`,`HeraustabbenSchliesstSuche`,`MobilmenueLinkKlick`,`LabelOhneZielSchliesstNichts`,`SucheBrichtHoverTimerAb`,`IconStrichstaerke`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    // Nutzt jetzt das Bild-Logo (Default) → Rendering weicht von der eingecheckten
    // Text-Logo-Baseline ab. visual.yml liegt noch nicht auf main (kein
    // workflow_dispatch) → nach dem Merge Baseline neu erzeugen + snapshot.skip
    // entfernen.
    snapshot: {
      skip: true
    }
  },
  // Submenü öffnet per Klick (aria-expanded) und schließt mit Escape.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: /Leistungen/
    });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Der Kontakt-Button ist der einzige Outlined-Button der Navigation.
    const kontakt = c.getByRole('link', {
      name: 'Kontakt',
      current: false
    });
    await expect(kontakt).toHaveClass('btn-outlined');
    await expect(kontakt).not.toHaveClass('btn-filled');
    // Single Source of Truth: höchstens ein Eintrag ist aktiv (aria-current="page").
    await expect(canvasElement.querySelectorAll('[aria-current="page"]')).toHaveLength(1);

    // Fokus-Rückgabe (WCAG 2.4.3): Submenü per Tastatur öffnen, mit Tab hinein
    // fokussieren, Escape schließt UND gibt den Fokus an den Toggle zurück — die
    // CSS blendet .ep-nav-sub per display:none aus, sobald .is-open fehlt, das
    // fokussierte Element verschwindet sonst und der Fokus fiele ans <body>.
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    const subLink = c.getByRole('link', {
      name: 'Angewandte KI',
      hidden: true
    });
    await expect(subLink).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveFocus();
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Suche & Kontakt',
  // Neue Story ohne eingecheckte Baseline (visual.yml noch nicht auf main → keine
  // Baseline-Erzeugung möglich); nach dem Merge Baseline erzeugen + skip entfernen.
  parameters: {
    snapshot: {
      skip: true
    }
  },
  args: {
    showSearch: false,
    showCta: false
  },
  // Suche und CTA sind optional abschaltbar; Lupe + Theme-Switcher bleiben trotzdem
  // rechtsbündig (siehe margin-left-Fix in der Komponente).
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector('.ep-nav-search')).toBeNull();
    await expect(canvasElement.querySelector('a.btn')).toBeNull();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Doppelte Labels',
  // Regressionstest: gleich beschriftete Haupt- und Untermenüpunkte sind zulässig
  // und dürfen das Rendern nicht abbrechen (NG0955 bei Tracking per Label).
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    links: [{
      label: 'Leistungen',
      sub: [{
        label: 'Übersicht',
        href: '#l'
      }, {
        label: 'Beratung',
        href: '#b'
      }]
    }, {
      label: 'Wissen',
      sub: [{
        label: 'Übersicht',
        href: '#w'
      }, {
        label: 'Übersicht',
        href: '#w2'
      }]
    }, {
      label: 'Wissen',
      href: '#wissen'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelectorAll('nav.ep-nav-links > *')).toHaveLength(3);
    await expect(canvasElement.querySelectorAll('.ep-nav-sub a')).toHaveLength(4);
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur im Submenü',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Pfeil runter öffnet ein geschlossenes Item und fokussiert den ersten Eintrag; Umlauf am Ende;
  // Pfeil hoch, Home und End nur bei geöffnetem Menü; genau ein Menü zugleich.
  play: async ({
    canvasElement
  }) => {
    blockNavigation(canvasElement);
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Untermenü Leistungen'
    });
    const other = c.getByRole('button', {
      name: 'Untermenü Unternehmen'
    });
    const first = c.getByRole('link', {
      name: 'Angewandte KI',
      hidden: true
    });
    const second = c.getByRole('link', {
      name: 'Effektive Software',
      hidden: true
    });
    const last = c.getByRole('link', {
      name: 'Wirksame Organisationen',
      hidden: true
    });

    // Pfeil hoch auf geschlossenem Item tut nichts.
    toggle.focus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Pfeil runter öffnet und fokussiert den ersten Eintrag.
    await userEvent.keyboard('{ArrowDown}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(second).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(last).toHaveFocus();
    // Umlauf am Ende.
    await userEvent.keyboard('{ArrowDown}');
    await expect(first).toHaveFocus();
    // Pfeil hoch vom ersten Eintrag springt zum letzten, dann rückwärts.
    await userEvent.keyboard('{ArrowUp}');
    await expect(last).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(second).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(last).toHaveFocus();

    // Genau ein Menü zugleich: das zweite Item per Pfeil runter öffnen schließt das erste.
    other.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(other).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(c.getByRole('link', {
      name: 'Über uns',
      hidden: true
    })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(other).toHaveAttribute('aria-expanded', 'false');
    await expect(other).toHaveFocus();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Öffnen per Hover',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Hover öffnet nach 100 ms und schließt nach 250 ms (nur pointer:fine); Klick bricht die Timer
  // ab; Escape schließt auch ein Hover-Menü, ohne dass der Fokus darin liegt.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Untermenü Leistungen'
    });
    const item = toggle.closest('.ep-nav-item') as HTMLElement;
    const other = c.getByRole('button', {
      name: 'Untermenü Unternehmen'
    });
    const otherItem = other.closest('.ep-nav-item') as HTMLElement;

    // Mit Verzögerung: direkt nach dem Hover noch zu, danach offen.
    await userEvent.hover(item);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
    // Verlassen schließt verzögert.
    await userEvent.unhover(item);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'false'), {
      timeout: 1500
    });

    // Genau ein Menü zugleich.
    await userEvent.hover(item);
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
    await userEvent.unhover(item);
    await userEvent.hover(otherItem);
    await waitFor(() => expect(other).toHaveAttribute('aria-expanded', 'true'));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Escape schließt das Hover-Menü, obwohl der Fokus nicht darin liegt.
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.keyboard('{Escape}');
    await expect(other).toHaveAttribute('aria-expanded', 'false');
    await userEvent.unhover(otherItem);

    // Klick bricht den Öffnen-Timer ab: erst hovern, dann klicken (öffnet), erneut klicken
    // (schließt). Ein übrig gebliebener Timer würde das Menü wieder aufziehen.
    await userEvent.hover(item);
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Timer feuern in Fälligkeitsreihenfolge: Der Sentinel (150 ms) ist nach einem übrig gebliebenen
    // Öffnen-Timer (100 ms) fällig, unabhängig von der Geschwindigkeit der CI.
    await new Promise(r => setTimeout(r, 150));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.unhover(item);
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Suche: Label und Fokus',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Das Label des Toggles wechselt mit dem Zustand, beim Öffnen springt der Fokus ins Suchfeld,
  // Escape schließt und gibt den Fokus zurück.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Suche öffnen'
    });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAccessibleName('Suche schließen');
    await expect(c.getByRole('searchbox', {
      name: 'Suchbegriff'
    })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAccessibleName('Suche öffnen');
    await expect(toggle).toHaveFocus();

    // Erneuter Klick auf den Toggle schließt ebenfalls.
    await userEvent.click(toggle);
    await expect(toggle).toHaveAccessibleName('Suche schließen');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAccessibleName('Suche öffnen');
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Heraustabben schließt Submenü',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Tab aus dem Item heraus schließt das Submenü (kein Fokus-Rücksprung); Tab innerhalb des
  // Items (Caret zu Eintrag) schließt nicht.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Untermenü Leistungen'
    });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(c.getByRole('link', {
      name: 'Angewandte KI',
      hidden: true
    })).toHaveFocus();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await userEvent.tab();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).not.toHaveFocus();
    await expect(canvasElement.contains(document.activeElement)).toBe(true);
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Heraustabben schließt Suche',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Tab aus dem Popover heraus schließt die Suche; Tab innerhalb (Feld, Button) nicht.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Suche öffnen'
    });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(c.getByRole('button', {
      name: 'Suchen'
    })).toHaveFocus();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.tab();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAccessibleName('Suche öffnen');
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Mobilmenü: Link-Klick schließt',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    links: [{
      label: 'Leistungen',
      href: '#leistungen',
      sub: [{
        label: 'Angewandte KI',
        href: '#ki'
      }]
    }, {
      label: 'Beiträge',
      href: '#beitraege'
    }]
  },
  // Jeder Link-Klick im geöffneten Mobilmenü schließt es und setzt aria-expanded zurück.
  play: async ({
    canvasElement
  }) => {
    blockNavigation(canvasElement);
    const c = within(canvasElement);
    // Der Burger ist über dem Mobile-Breakpoint per display:none ausgeblendet und hat dann
    // keinen zugänglichen Namen; deshalb per Selektor greifen.
    const burger = canvasElement.querySelector('.ep-nav-burger') as HTMLElement;
    const header = canvasElement.querySelector('.ep-topnav') as HTMLElement;
    const links = [c.getByRole('link', {
      name: 'Beiträge'
    }),
    // Top-Level-Link ohne Submenü
    c.getByRole('link', {
      name: 'Leistungen'
    }) // Label-Link eines Items mit Submenü
    ];
    for (const link of links) {
      await userEvent.click(burger);
      await expect(header).toHaveClass('nav-open');
      await expect(burger).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(link);
      await expect(header).not.toHaveClass('nav-open');
      await expect(burger).toHaveAttribute('aria-expanded', 'false');
      await expect(burger).toHaveAttribute('aria-label', 'Menü öffnen');
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Label ohne Ziel schließt nichts',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Ein Platzhalter-Label (ohne href) navigiert nicht und lässt das offene Submenü stehen.
  play: async ({
    canvasElement
  }) => {
    blockNavigation(canvasElement);
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Untermenü Leistungen'
    });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(c.getByRole('link', {
      name: 'Leistungen'
    }));
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Suche bricht Hover-Timer ab',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Öffnen der Suche löscht einen laufenden Hover-Öffnen-Timer, sonst zöge er danach das
  // Submenü auf und schlösse die Suche.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const toggle = c.getByRole('button', {
      name: 'Untermenü Leistungen'
    });
    const item = toggle.closest('.ep-nav-item') as HTMLElement;
    const search = c.getByRole('button', {
      name: 'Suche öffnen'
    });
    await userEvent.hover(item);
    await userEvent.click(search);
    await expect(search).toHaveAttribute('aria-expanded', 'true');
    // Sentinel (150 ms) ist nach einem übrig gebliebenen Öffnen-Timer (100 ms) fällig.
    await new Promise(r => setTimeout(r, 150));
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(search).toHaveAttribute('aria-expanded', 'true');
    await userEvent.unhover(item);
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Icon-Strichstärke',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Pinnt die Strichstärke der Chrome-Icons (Lucide, ADR-0016): bisher Heroicons-Outline mit
  // 1.5 (= --icon-stroke-md), Lucide-Default wäre 2. Die Komponente setzt CDS_ICON_STROKE
  // explizit; hier wird der WIRKSAME (berechnete) Wert geprüft, damit auch eine CSS-Regel,
  // die das Attribut überschreibt, auffiele. Dekorative Icons bleiben aria-hidden.
  // Caret: Lucide-Chevron mit absoluteStrokeWidth (1.5 px Bildschirmstrich bei 10 px Größe):
  // Lucide rechnet das Attribut auf 1.5 * 24 / 10 = 3.6 in der 24er-viewBox um.
  play: async ({
    canvasElement
  }) => {
    const chrome = canvasElement.querySelectorAll<SVGElement>('.ep-nav-burger svg, .ep-nav-icon-btn svg');
    await expect(chrome.length).toBeGreaterThanOrEqual(3);
    for (const svg of Array.from(chrome)) {
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      await expect(parseFloat(getComputedStyle(svg).strokeWidth)).toBe(1.5);
    }
    const caret = canvasElement.querySelector('svg.ep-nav-item-caret') as SVGElement;
    await expect(caret).toHaveAttribute('aria-hidden', 'true');
    await expect(caret).toHaveAttribute('viewBox', '0 0 24 24');
    const stroke = parseFloat(getComputedStyle(caret).strokeWidth);
    await expect(stroke).toBeCloseTo(3.6, 5);
    await expect(stroke * 10 / 24).toBeCloseTo(1.5, 5);
  }
}`,...W.parameters?.docs?.source}}}})))()}export{D as n,init_topnav_stories as t};