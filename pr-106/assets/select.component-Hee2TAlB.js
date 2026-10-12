import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,H as i,Kt as a,M as o,O as s,Tn as c,Ut as l,bn as u,k as d,q as f,qt as p,y as m,z as h}from"./angular-platform-BGeCprOl.js";import{i as g,n as _}from"./forms-CsHRYVN2.js";import{n as v,t as y}from"./lucide-angular-CTBwqO1y.js";import{n as b,t as x}from"./cds-icons-DtWH1HnJ.js";import{n as S,t as C}from"./disposable-timeout-Bvwm2BYj.js";var w,T,E;function init_select_component(){return(init_select_component=e((()=>{c(),n(),g(),b(),S(),w=0,T=600,E=class SelectComponent{iconStroke=x;host=a(i);trigger=o(`trigger`);menu=o(`menu`);label=s(`Bereich`);options=s([]);value=d(void 0);area=s();placeholder=s(`Bitte wählen…`);disabled=d(!1);name=s();open=p(!1);activeIndex=p(-1);onChange=()=>{};onTouched=()=>{};writeValue(e){this.value.set(e??void 0)}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled.set(e)}instance=++w;ids={label:`cds-select-${this.instance}-label`,value:`cds-select-${this.instance}-value`,menu:`cds-select-${this.instance}-menu`,option:e=>`cds-select-${this.instance}-opt-${e}`};typeBuffer=``;menuFocusTimer=C();scrollTimer=C();typeaheadTimer=C();selectedOption(){return this.options().find(e=>e.value===this.value())}toggle(){this.open()?this.close():this.openMenu()}openMenu(){if(this.disabled())return;let e=this.options().findIndex(e=>e.value===this.value());this.activeIndex.set(e>=0?e:0),this.open.set(!0),this.menuFocusTimer.schedule(()=>this.menu()?.nativeElement.focus())}close(e=!0){this.open.set(!1),this.activeIndex.set(-1),e&&this.trigger()?.nativeElement.focus()}select(e){let t=this.options()[e];t&&(this.value.set(t.value),this.onChange(t.value),this.onTouched(),this.close())}markTouched(){this.onTouched()}onFocusOut(e){let t=e.relatedTarget;(!t||!this.host.nativeElement.contains(t))&&this.markTouched()}onTriggerKeydown(e){if(this.open())return;let t=e.key;(t===`ArrowDown`||t===`ArrowUp`||t===`Enter`||t===` `)&&(e.preventDefault(),this.openMenu())}onMenuKeydown(e){let t=e.key;switch(t){case`ArrowDown`:e.preventDefault(),this.move(1);break;case`ArrowUp`:e.preventDefault(),this.move(-1);break;case`Home`:e.preventDefault(),this.setActive(0);break;case`End`:e.preventDefault(),this.setActive(this.options().length-1);break;case`Enter`:case` `:e.preventDefault(),this.activeIndex()>=0&&this.select(this.activeIndex());break;case`Escape`:e.preventDefault(),this.close();break;case`Tab`:this.close(!1);break;default:t.length===1&&/\S/.test(t)&&this.typeahead(t)}}move(e){let t=this.options().length;if(!t)return;let n=Math.min(t-1,Math.max(0,this.activeIndex()+e));this.setActive(n)}setActive(e){this.activeIndex.set(e),this.scrollTimer.schedule(()=>{this.host.nativeElement.querySelector(`#${CSS.escape(this.ids.option(e))}`)?.scrollIntoView({block:`nearest`})})}typeahead(e){this.typeBuffer+=e.toLowerCase(),this.typeaheadTimer.schedule(()=>this.typeBuffer=``,T);let t=this.options().findIndex(e=>e.label.toLowerCase().startsWith(this.typeBuffer));t>=0&&this.setActive(t)}onDocPointerDown(e){this.open()&&!this.host.nativeElement.contains(e.target)&&this.close(!1)}static propDecorators={trigger:[{type:m,args:[`trigger`,{isSignal:!0}]}],menu:[{type:m,args:[`menu`,{isSignal:!0}]}],label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],options:[{type:r,args:[{isSignal:!0,alias:`options`,required:!1,transform:void 0}]}],value:[{type:r,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:f,args:[`valueChange`]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],placeholder:[{type:r,args:[{isSignal:!0,alias:`placeholder`,required:!1,transform:void 0}]}],disabled:[{type:r,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:f,args:[`disabledChange`]}],name:[{type:r,args:[{isSignal:!0,alias:`name`,required:!1,transform:void 0}]}]}},E=u([t({selector:`cds-select`,changeDetection:h.OnPush,imports:[y,v],providers:[{provide:_,useExisting:l(()=>E),multi:!0}],host:{"(focusout)":`onFocusOut($event)`,"(document:pointerdown)":`onDocPointerDown($event)`},template:`
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
        <svg lucideChevronDown class="ep-select-caret" size="24" [strokeWidth]="iconStroke"></svg>
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
            <!-- Haken: 3,2 in der 24er-Basis bei 20 px ≙ ≈ 2,67 px Bildschirmstrich (Gewicht des bisherigen Glyphs). -->
            <svg lucideCheck class="ep-select-check" [size]="20" [strokeWidth]="3.2"></svg>
            {{ opt.label }}
          </li>
        }
      </ul>
      @if (name()) {
        <input type="hidden" [name]="name()" [value]="value() ?? ''" />
      }
    </div>
  `})],E)})))()}export{init_select_component as n,E as t};