import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{A as n,Ft as r,H as i,Nt as a,St as o,V as s,W as c,d as l,fn as u,k as d,q as f,sn as p,v as m,xt as h}from"./angular-platform-CAY__VLP.js";import{d as g,i as _,l as v,s as y,t as b,u as x}from"./ng-icons-heroicons-outline-D63aMe8L.js";import{n as S,t as C}from"./cds-icons-De84Mmkh.js";import{n as w,t as T}from"./cycle-button.component-DCslOX6m.js";var E;function init__virtual_angular_jit_style_inline_acd894da11dc2998(){return(init__virtual_angular_jit_style_inline_acd894da11dc2998=e((()=>{E=`
    .ep-nav-item-caret {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `})))()}var D,O,k;function init_topnav_component(){return(init_topnav_component=e((()=>{u(),init__virtual_angular_jit_style_inline_acd894da11dc2998(),l(),d(),x(),C(),w(),O=0,k=class TopnavComponent{static{D=this}host=a(c);document=a(h);cdr=a(m);static HOVER_OPEN_MS=100;static HOVER_CLOSE_MS=250;openTimer;closeTimer;constructor(){a(o).onDestroy(()=>this.clearHoverTimers())}uid=++O;searchId=`cds-topnav-search-${this.uid}`;navId=`cds-topnav-nav-${this.uid}`;searchPopId=`cds-topnav-search-pop-${this.uid}`;logo=n(`conciso.`);logoSrc=n();logoDarkSrc=n();logoAlt=n(``);ctaLabel=n(`Kontakt`);showSearch=n(!0);showCta=n(!0);showSystemTheme=n(!0);activeHref=n();links=n([{label:`Leistungen`,sub:[{label:`Angewandte KI`,href:`#ki`},{label:`Effektive Software`,href:`#software`},{label:`Wirksame Organisationen`,href:`#organisationen`}]},{label:`Unternehmen`,sub:[{label:`Über uns`,href:`#ueber-uns`},{label:`Team`,href:`#team`},{label:`Jobs`,href:`#jobs`}]},{label:`Beiträge`,href:`#beitraege`},{label:`Kontakt`,href:`#kontakt`}]);openIndex=r(-1);searchOpen=r(!1);navOpen=r(!1);subId(e){return`cds-topnav-sub-${this.uid}-${e}`}toggleSub(e){this.clearHoverTimers(),this.openIndex.set(this.openIndex()===e?-1:e),this.searchOpen.set(!1)}toggleSearch(){this.clearHoverTimers();let e=!this.searchOpen();this.searchOpen.set(e),this.openIndex.set(-1),e&&(this.cdr.detectChanges(),this.host.nativeElement.querySelector(`.ep-nav-search-input`)?.focus())}onLabelClick(e,t){if(!t.href){e.preventDefault();return}this.closeAll()}onItemEnter(e){this.hoverCapable()&&(this.clearHoverTimers(),this.openTimer=setTimeout(()=>{this.openIndex.set(e),this.searchOpen.set(!1),this.cdr.markForCheck()},D.HOVER_OPEN_MS))}onItemLeave(e){this.hoverCapable()&&(this.clearHoverTimers(),this.closeTimer=setTimeout(()=>{this.openIndex()===e&&this.openIndex.set(-1),this.cdr.markForCheck()},D.HOVER_CLOSE_MS))}onFocusOut(e){let t=e.target,n=e.relatedTarget,r=t?.closest(`.ep-nav-has-sub`);if(r&&!r.contains(n)){let e=Number(r.dataset.subIndex);this.openIndex()===e&&(this.clearHoverTimers(),this.openIndex.set(-1))}let i=t?.closest(`.ep-nav-search`);i&&!i.contains(n)&&this.searchOpen()&&this.searchOpen.set(!1)}onKeydown(e){let t=e.target?.closest(`.ep-nav-has-sub`);t&&this.host.nativeElement.contains(t)&&this.onItemKeydown(e,Number(t.dataset.subIndex))}onItemKeydown(e,t){let n=this.openIndex()===t,r=e.key;if(r===`ArrowDown`){e.preventDefault(),n||(this.clearHoverTimers(),this.openIndex.set(t),this.searchOpen.set(!1),this.cdr.detectChanges());let r=this.subLinks(t),i=r.indexOf(this.document.activeElement);(i===-1||i===r.length-1?r[0]:r[i+1])?.focus()}else if(n&&r===`ArrowUp`){e.preventDefault();let n=this.subLinks(t),r=n.indexOf(this.document.activeElement);(r<=0?n[n.length-1]:n[r-1])?.focus()}else if(n&&(r===`Home`||r===`End`)){e.preventDefault();let n=this.subLinks(t);(r===`Home`?n[0]:n[n.length-1])?.focus()}}subLinks(e){let t=this.host.nativeElement.querySelector(`#${this.subId(e)}`);return t?Array.from(t.querySelectorAll(`a`)):[]}hoverCapable(){return!!this.document.defaultView?.matchMedia?.(`(hover:hover) and (pointer:fine)`).matches}clearHoverTimers(){clearTimeout(this.openTimer),clearTimeout(this.closeTimer)}toggleNav(){this.clearHoverTimers(),this.navOpen.set(!this.navOpen()),this.openIndex.set(-1),this.searchOpen.set(!1)}closeAll(){this.clearHoverTimers(),this.openIndex.set(-1),this.searchOpen.set(!1),this.navOpen.set(!1)}onDocumentClick(e){this.host.nativeElement.contains(e.target)||this.closeAll()}onEscape(){this.closeWithFocusReturn()}closeWithFocusReturn(){let e=this.document.activeElement,t=null,n=this.openIndex();if(n>=0){let r=this.host.nativeElement.querySelector(`[aria-controls="${this.subId(n)}"]`);r&&e&&r.closest(`.ep-nav-item`)?.contains(e)&&(t=r)}else if(this.searchOpen()){let n=this.host.nativeElement.querySelector(`.ep-nav-search-pop`);n&&e&&n.contains(e)&&(t=this.host.nativeElement.querySelector(`.ep-nav-search-toggle`))}if(!t&&this.navOpen()){let n=this.host.nativeElement.querySelector(`#${this.navId}`);n&&e&&n.contains(e)&&(t=this.host.nativeElement.querySelector(`.ep-nav-burger`))}this.closeAll(),t?.focus()}static ctorParameters=()=>[];static propDecorators={logo:[{type:f,args:[{isSignal:!0,alias:`logo`,required:!1,transform:void 0}]}],logoSrc:[{type:f,args:[{isSignal:!0,alias:`logoSrc`,required:!1,transform:void 0}]}],logoDarkSrc:[{type:f,args:[{isSignal:!0,alias:`logoDarkSrc`,required:!1,transform:void 0}]}],logoAlt:[{type:f,args:[{isSignal:!0,alias:`logoAlt`,required:!1,transform:void 0}]}],ctaLabel:[{type:f,args:[{isSignal:!0,alias:`ctaLabel`,required:!1,transform:void 0}]}],showSearch:[{type:f,args:[{isSignal:!0,alias:`showSearch`,required:!1,transform:void 0}]}],showCta:[{type:f,args:[{isSignal:!0,alias:`showCta`,required:!1,transform:void 0}]}],showSystemTheme:[{type:f,args:[{isSignal:!0,alias:`showSystemTheme`,required:!1,transform:void 0}]}],activeHref:[{type:f,args:[{isSignal:!0,alias:`activeHref`,required:!1,transform:void 0}]}],links:[{type:f,args:[{isSignal:!0,alias:`links`,required:!1,transform:void 0}]}]}},k=D=p([i({selector:`cds-topnav`,changeDetection:s.OnPush,imports:[T,v],viewProviders:[g({heroBars3:b,heroMagnifyingGlass:_,heroXMark:y,uiCaretDown:S})],host:{"(document:click)":`onDocumentClick($event)`,"(document:keydown.escape)":`onEscape()`,"(keydown)":`onKeydown($event)`,"(focusout)":`onFocusOut($event)`},template:`
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
                <ng-icon
                  class="ep-nav-item-caret"
                  name="uiCaretDown"
                  size="10px"
                  aria-hidden="true"
                />
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
              <ng-icon name="heroMagnifyingGlass" size="22px" aria-hidden="true" />
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
        <ng-icon class="icon-menu" name="heroBars3" size="24px" aria-hidden="true" />
        <ng-icon class="icon-close" name="heroXMark" size="24px" aria-hidden="true" />
      </button>

      @if (showCta()) {
        <a class="btn btn-outlined btn-sm btn-co" href="#" (click)="$event.preventDefault()">{{
          ctaLabel()
        }}</a>
      }
    </header>
  `,styles:[E]})],k)})))()}var A=t({DoppelteLabels:()=>R,HeraustabbenSchliesstSubmenue:()=>H,HeraustabbenSchliesstSuche:()=>U,HoverOeffnen:()=>B,Interaktiv:()=>I,LabelOhneZielSchliesstNichts:()=>G,Minimal:()=>L,MobilmenueLinkKlick:()=>W,SucheBrichtHoverTimerAb:()=>K,SucheLabelUndFokus:()=>V,TastaturImSubmenue:()=>z,__namedExportsOrder:()=>q,default:()=>F}),j,M,N,P,F,I,L,R,blockNavigation,z,B,V,H,U,W,G,K,q;function init_topnav_stories(){return(init_topnav_stories=e((()=>{init_topnav_component(),{within:j,userEvent:M,expect:N,waitFor:P}=__STORYBOOK_MODULE_TEST__,F={title:`Komponenten/Navigation/Topnav`,component:k,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1061`},layout:`fullscreen`,docs:{description:{component:"Hauptnavigation der Customer-Pages: Logo (Text ODER Bild/SVG mit Theme-Swap) und Top-Level-Links mit aufklappbaren Submenüs links, rechts optional Suche, der Theme-Cycle-Button und ein optionaler Kontakt-Button als Call-to-Action. Der aktive Eintrag (genau einer, via `activeHref`) wird über einen dezenten Unterstrich und Bereichsfarbe markiert. Barrierefrei nach WCAG 2.1 AA."}}},argTypes:{logo:{control:`text`},logoSrc:{control:`text`},logoDarkSrc:{control:`text`},logoAlt:{control:`text`},ctaLabel:{control:`text`},activeHref:{control:`text`},showSearch:{control:`boolean`},showCta:{control:`boolean`},showSystemTheme:{control:`boolean`}},args:{logo:`conciso.`,logoSrc:`./conciso/brand/logo-conciso.svg`,logoDarkSrc:`./conciso/brand/logo-conciso-light.svg`,logoAlt:`Conciso`,ctaLabel:`Kontakt`,activeHref:`#kontakt`,showSearch:!0,showCta:!0,showSystemTheme:!0}},I={parameters:{snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`button`,{name:/Leistungen/});await N(n).toHaveAttribute(`aria-expanded`,`false`),await M.click(n),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.keyboard(`{Escape}`),await N(n).toHaveAttribute(`aria-expanded`,`false`);let r=t.getByRole(`link`,{name:`Kontakt`,current:!1});await N(r).toHaveClass(`btn-outlined`),await N(r).not.toHaveClass(`btn-filled`),await N(e.querySelectorAll(`[aria-current="page"]`)).toHaveLength(1),n.focus(),await M.keyboard(`{Enter}`),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.tab();let i=t.getByRole(`link`,{name:`Angewandte KI`,hidden:!0});await N(i).toHaveFocus(),await M.keyboard(`{Escape}`),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(n).toHaveFocus()}},L={name:`Ohne Suche & Kontakt`,parameters:{snapshot:{skip:!0}},args:{showSearch:!1,showCta:!1},play:async({canvasElement:e})=>{await N(e.querySelector(`.ep-nav-search`)).toBeNull(),await N(e.querySelector(`a.btn`)).toBeNull()}},R={name:`Doppelte Labels`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{links:[{label:`Leistungen`,sub:[{label:`Übersicht`,href:`#l`},{label:`Beratung`,href:`#b`}]},{label:`Wissen`,sub:[{label:`Übersicht`,href:`#w`},{label:`Übersicht`,href:`#w2`}]},{label:`Wissen`,href:`#wissen`}]},play:async({canvasElement:e})=>{await N(e.querySelectorAll(`nav.ep-nav-links > *`)).toHaveLength(3),await N(e.querySelectorAll(`.ep-nav-sub a`)).toHaveLength(4)}},blockNavigation=e=>e.addEventListener(`click`,e=>{e.target.closest(`a`)&&e.preventDefault()}),z={name:`Tastatur im Submenü`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{blockNavigation(e);let t=j(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`}),r=t.getByRole(`button`,{name:`Untermenü Unternehmen`}),i=t.getByRole(`link`,{name:`Angewandte KI`,hidden:!0}),a=t.getByRole(`link`,{name:`Effektive Software`,hidden:!0}),o=t.getByRole(`link`,{name:`Wirksame Organisationen`,hidden:!0});n.focus(),await M.keyboard(`{ArrowUp}`),await N(n).toHaveAttribute(`aria-expanded`,`false`),await M.keyboard(`{ArrowDown}`),await N(n).toHaveAttribute(`aria-expanded`,`true`),await N(i).toHaveFocus(),await M.keyboard(`{ArrowDown}`),await N(a).toHaveFocus(),await M.keyboard(`{ArrowDown}`),await N(o).toHaveFocus(),await M.keyboard(`{ArrowDown}`),await N(i).toHaveFocus(),await M.keyboard(`{ArrowUp}`),await N(o).toHaveFocus(),await M.keyboard(`{ArrowUp}`),await N(a).toHaveFocus(),await M.keyboard(`{Home}`),await N(i).toHaveFocus(),await M.keyboard(`{End}`),await N(o).toHaveFocus(),r.focus(),await M.keyboard(`{ArrowDown}`),await N(r).toHaveAttribute(`aria-expanded`,`true`),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(t.getByRole(`link`,{name:`Über uns`,hidden:!0})).toHaveFocus(),await M.keyboard(`{Escape}`),await N(r).toHaveAttribute(`aria-expanded`,`false`),await N(r).toHaveFocus()}},B={name:`Öffnen per Hover`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`}),r=n.closest(`.ep-nav-item`),i=t.getByRole(`button`,{name:`Untermenü Unternehmen`}),a=i.closest(`.ep-nav-item`);await M.hover(r),await P(()=>N(n).toHaveAttribute(`aria-expanded`,`true`)),await M.unhover(r),await P(()=>N(n).toHaveAttribute(`aria-expanded`,`false`),{timeout:1500}),await M.hover(r),await P(()=>N(n).toHaveAttribute(`aria-expanded`,`true`)),await M.unhover(r),await M.hover(a),await P(()=>N(i).toHaveAttribute(`aria-expanded`,`true`)),await N(n).toHaveAttribute(`aria-expanded`,`false`),document.activeElement?.blur(),await M.keyboard(`{Escape}`),await N(i).toHaveAttribute(`aria-expanded`,`false`),await M.unhover(a),await M.hover(r),await M.click(n),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.click(n),await N(n).toHaveAttribute(`aria-expanded`,`false`),await new Promise(e=>setTimeout(e,150)),await N(n).toHaveAttribute(`aria-expanded`,`false`),await M.unhover(r)}},V={name:`Suche: Label und Fokus`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`button`,{name:`Suche öffnen`});await N(n).toHaveAttribute(`aria-expanded`,`false`),await M.click(n),await N(n).toHaveAttribute(`aria-expanded`,`true`),await N(n).toHaveAccessibleName(`Suche schließen`),await N(t.getByRole(`searchbox`,{name:`Suchbegriff`})).toHaveFocus(),await M.keyboard(`{Escape}`),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(n).toHaveAccessibleName(`Suche öffnen`),await N(n).toHaveFocus(),await M.click(n),await N(n).toHaveAccessibleName(`Suche schließen`),await M.click(n),await N(n).toHaveAccessibleName(`Suche öffnen`)}},H={name:`Heraustabben schließt Submenü`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`});n.focus(),await M.keyboard(`{Enter}`),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.tab(),await N(t.getByRole(`link`,{name:`Angewandte KI`,hidden:!0})).toHaveFocus(),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.tab(),await M.tab(),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.tab(),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(n).not.toHaveFocus(),await N(e.contains(document.activeElement)).toBe(!0)}},U={name:`Heraustabben schließt Suche`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`button`,{name:`Suche öffnen`});await M.click(n),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.tab(),await N(t.getByRole(`button`,{name:`Suchen`})).toHaveFocus(),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.tab(),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(n).toHaveAccessibleName(`Suche öffnen`)}},W={name:`Mobilmenü: Link-Klick schließt`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{links:[{label:`Leistungen`,href:`#leistungen`,sub:[{label:`Angewandte KI`,href:`#ki`}]},{label:`Beiträge`,href:`#beitraege`}]},play:async({canvasElement:e})=>{blockNavigation(e);let t=j(e),n=e.querySelector(`.ep-nav-burger`),r=e.querySelector(`.ep-topnav`),i=[t.getByRole(`link`,{name:`Beiträge`}),t.getByRole(`link`,{name:`Leistungen`})];for(let e of i)await M.click(n),await N(r).toHaveClass(`nav-open`),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.click(e),await N(r).not.toHaveClass(`nav-open`),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(n).toHaveAttribute(`aria-label`,`Menü öffnen`)}},G={name:`Label ohne Ziel schließt nichts`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{blockNavigation(e);let t=j(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`});await M.click(n),await N(n).toHaveAttribute(`aria-expanded`,`true`),await M.click(t.getByRole(`link`,{name:`Leistungen`})),await N(n).toHaveAttribute(`aria-expanded`,`true`)}},K={name:`Suche bricht Hover-Timer ab`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=j(e),n=t.getByRole(`button`,{name:`Untermenü Leistungen`}),r=n.closest(`.ep-nav-item`),i=t.getByRole(`button`,{name:`Suche öffnen`});await M.hover(r),await M.click(i),await N(i).toHaveAttribute(`aria-expanded`,`true`),await new Promise(e=>setTimeout(e,150)),await N(n).toHaveAttribute(`aria-expanded`,`false`),await N(i).toHaveAttribute(`aria-expanded`,`true`),await M.unhover(r)}},q=[`Interaktiv`,`Minimal`,`DoppelteLabels`,`TastaturImSubmenue`,`HoverOeffnen`,`SucheLabelUndFokus`,`HeraustabbenSchliesstSubmenue`,`HeraustabbenSchliesstSuche`,`MobilmenueLinkKlick`,`LabelOhneZielSchliesstNichts`,`SucheBrichtHoverTimerAb`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}}})))()}export{A as n,init_topnav_stories as t};