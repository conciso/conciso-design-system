import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,At as n,Ft as r,H as i,Nt as a,P as o,V as s,W as c,Y as l,fn as u,j as d,k as f,q as p,sn as m,x as h}from"./angular-platform-CAY__VLP.js";import{i as g,n as _}from"./forms-CAzAEGKf.js";import{d as v,l as y,n as b,u as x}from"./ng-icons-heroicons-outline-D63aMe8L.js";import{r as S,t as C}from"./cds-icons-De84Mmkh.js";import{n as w,t as T}from"./disposable-timeout--2m_dMi6.js";var E,D,O;function init_select_component(){return(init_select_component=e((()=>{u(),f(),g(),x(),C(),w(),E=0,D=600,O=class SelectComponent{host=a(c);trigger=o(`trigger`);menu=o(`menu`);label=t(`Bereich`);options=t([]);value=d(void 0);area=t();placeholder=t(`Bitte wählen…`);disabled=d(!1);name=t();open=r(!1);activeIndex=r(-1);onChange=()=>{};onTouched=()=>{};writeValue(e){this.value.set(e??void 0)}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled.set(e)}instance=++E;ids={label:`cds-select-${this.instance}-label`,value:`cds-select-${this.instance}-value`,menu:`cds-select-${this.instance}-menu`,option:e=>`cds-select-${this.instance}-opt-${e}`};typeBuffer=``;menuFocusTimer=T();scrollTimer=T();typeaheadTimer=T();selectedOption(){return this.options().find(e=>e.value===this.value())}toggle(){this.open()?this.close():this.openMenu()}openMenu(){if(this.disabled())return;let e=this.options().findIndex(e=>e.value===this.value());this.activeIndex.set(e>=0?e:0),this.open.set(!0),this.menuFocusTimer.schedule(()=>this.menu()?.nativeElement.focus())}close(e=!0){this.open.set(!1),this.activeIndex.set(-1),e&&this.trigger()?.nativeElement.focus()}select(e){let t=this.options()[e];t&&(this.value.set(t.value),this.onChange(t.value),this.onTouched(),this.close())}markTouched(){this.onTouched()}onFocusOut(e){let t=e.relatedTarget;(!t||!this.host.nativeElement.contains(t))&&this.markTouched()}onTriggerKeydown(e){if(this.open())return;let t=e.key;(t===`ArrowDown`||t===`ArrowUp`||t===`Enter`||t===` `)&&(e.preventDefault(),this.openMenu())}onMenuKeydown(e){let t=e.key;switch(t){case`ArrowDown`:e.preventDefault(),this.move(1);break;case`ArrowUp`:e.preventDefault(),this.move(-1);break;case`Home`:e.preventDefault(),this.setActive(0);break;case`End`:e.preventDefault(),this.setActive(this.options().length-1);break;case`Enter`:case` `:e.preventDefault(),this.activeIndex()>=0&&this.select(this.activeIndex());break;case`Escape`:e.preventDefault(),this.close();break;case`Tab`:this.close(!1);break;default:t.length===1&&/\S/.test(t)&&this.typeahead(t)}}move(e){let t=this.options().length;if(!t)return;let n=Math.min(t-1,Math.max(0,this.activeIndex()+e));this.setActive(n)}setActive(e){this.activeIndex.set(e),this.scrollTimer.schedule(()=>{this.host.nativeElement.querySelector(`#${CSS.escape(this.ids.option(e))}`)?.scrollIntoView({block:`nearest`})})}typeahead(e){this.typeBuffer+=e.toLowerCase(),this.typeaheadTimer.schedule(()=>this.typeBuffer=``,D);let t=this.options().findIndex(e=>e.label.toLowerCase().startsWith(this.typeBuffer));t>=0&&this.setActive(t)}onDocPointerDown(e){this.open()&&!this.host.nativeElement.contains(e.target)&&this.close(!1)}static propDecorators={trigger:[{type:h,args:[`trigger`,{isSignal:!0}]}],menu:[{type:h,args:[`menu`,{isSignal:!0}]}],label:[{type:p,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],options:[{type:p,args:[{isSignal:!0,alias:`options`,required:!1,transform:void 0}]}],value:[{type:p,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:l,args:[`valueChange`]}],area:[{type:p,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],placeholder:[{type:p,args:[{isSignal:!0,alias:`placeholder`,required:!1,transform:void 0}]}],disabled:[{type:p,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:l,args:[`disabledChange`]}],name:[{type:p,args:[{isSignal:!0,alias:`name`,required:!1,transform:void 0}]}]}},O=m([i({selector:`cds-select`,changeDetection:s.OnPush,imports:[y],viewProviders:[v({heroChevronDown:b,uiCheck:S})],providers:[{provide:_,useExisting:n(()=>O),multi:!0}],host:{"(focusout)":`onFocusOut($event)`,"(document:pointerdown)":`onDocPointerDown($event)`},template:`
    <div
      class="ep-select"
      [class.is-open]="open()"
      [class.is-disabled]="disabled()"
      [attr.data-area]="area() || null"
    >
      <span class="ep-select-label" [id]="ids.label">{{ label() }}</span>
      <button
        #trigger
        type="button"
        class="ep-select-trigger"
        [class.is-placeholder]="!selectedOption()"
        [disabled]="disabled()"
        aria-haspopup="listbox"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="ids.menu"
        [attr.aria-labelledby]="ids.label + ' ' + ids.value"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
      >
        <span class="ep-select-value" [id]="ids.value" [attr.data-placeholder]="placeholder()">{{
          selectedOption()?.label ?? placeholder()
        }}</span>
        <ng-icon class="ep-select-caret" name="heroChevronDown" size="24px" aria-hidden="true" />
      </button>
      <ul
        #menu
        class="ep-select-menu"
        role="listbox"
        [id]="ids.menu"
        [attr.aria-labelledby]="ids.label"
        tabindex="-1"
        [attr.aria-activedescendant]="
          open() && activeIndex() >= 0 ? ids.option(activeIndex()) : null
        "
        (keydown)="onMenuKeydown($event)"
      >
        @for (opt of options(); track opt.value; let i = $index) {
          <!-- Listbox-Muster: Optionen sind bewusst NICHT einzeln fokussierbar; die
               Tastatur läuft über den Trigger (aria-activedescendant). Klick ist reine
               Maus-Bequemlichkeit — daher die a11y-Regeln hier gezielt deaktiviert. -->
          <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
          <li
            class="ep-select-option"
            role="option"
            [id]="ids.option(i)"
            [attr.data-value]="opt.value"
            [class.is-active]="i === activeIndex()"
            [attr.aria-selected]="opt.value === value()"
            (click)="select(i)"
            (mouseenter)="activeIndex.set(i)"
          >
            <ng-icon class="ep-select-check" name="uiCheck" size="20px" aria-hidden="true" />
            {{ opt.label }}
          </li>
        }
      </ul>
      @if (name()) {
        <input type="hidden" [name]="name()" [value]="value() ?? ''" />
      }
    </div>
  `})],O)})))()}export{init_select_component as n,O as t};