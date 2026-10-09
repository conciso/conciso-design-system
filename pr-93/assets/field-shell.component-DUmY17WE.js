import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,U as i,V as a,Y as o,fn as s,j as c,k as l,q as u,sn as d}from"./angular-platform-CAY__VLP.js";import{n as f,t as p}from"./cva-base.directive-PVycmkzM.js";var m,h;function init_field_base_directive(){return(init_field_base_directive=e((()=>{s(),l(),f(),m=0,h=class FieldBase extends p{label=t(``);helper=t(``);error=t(``);quietError=t(!1);required=t(!1);fieldId=t(`cds-field-${++m}`);value=c(``);disabled=c(!1);normalizeValue(e){return e??``}applyValue(e){this.value.set(e)}applyDisabled(e){this.disabled.set(e)}handleInput(e){let t=e.target.value;this.value.set(t),this.onChange(t)}handleBlur(){this.onTouched()}errorId=r(()=>`${this.fieldId()}-error`);static propDecorators={label:[{type:u,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],helper:[{type:u,args:[{isSignal:!0,alias:`helper`,required:!1,transform:void 0}]}],error:[{type:u,args:[{isSignal:!0,alias:`error`,required:!1,transform:void 0}]}],quietError:[{type:u,args:[{isSignal:!0,alias:`quietError`,required:!1,transform:void 0}]}],required:[{type:u,args:[{isSignal:!0,alias:`required`,required:!1,transform:void 0}]}],fieldId:[{type:u,args:[{isSignal:!0,alias:`fieldId`,required:!1,transform:void 0}]}],value:[{type:u,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:o,args:[`valueChange`]}],disabled:[{type:u,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:o,args:[`disabledChange`]}]}},h=d([i()],h)})))()}var g;function init_field_shell_component(){return(init_field_shell_component=e((()=>{s(),l(),g=class FieldShellComponent{label=t(``);required=t(!1);helper=t(``);error=t(``);fieldId=t(``);errorId=t(``);quietError=t(!1);static propDecorators={label:[{type:u,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],required:[{type:u,args:[{isSignal:!0,alias:`required`,required:!1,transform:void 0}]}],helper:[{type:u,args:[{isSignal:!0,alias:`helper`,required:!1,transform:void 0}]}],error:[{type:u,args:[{isSignal:!0,alias:`error`,required:!1,transform:void 0}]}],fieldId:[{type:u,args:[{isSignal:!0,alias:`fieldId`,required:!1,transform:void 0}]}],errorId:[{type:u,args:[{isSignal:!0,alias:`errorId`,required:!1,transform:void 0}]}],quietError:[{type:u,args:[{isSignal:!0,alias:`quietError`,required:!1,transform:void 0}]}]}},g=d([n({selector:`cds-field-shell`,changeDetection:a.OnPush,template:`
    <div class="field" [class.has-error]="!!error()">
      <label [attr.for]="fieldId()">
        {{ label() }}
        @if (required()) {
          <span class="req" aria-hidden="true">*</span>
        }
      </label>

      <ng-content></ng-content>

      @if (helper() && !error()) {
        <span class="helper">{{ helper() }}</span>
      }
      @if (error()) {
        <span class="error-msg" [id]="errorId()" [attr.role]="quietError() ? null : 'alert'">
          <!-- Exclamation-Circle-Icon. Noch inline: Das Icon liegt nicht im Register
               (@conciso/design-system/icons); die externe Icon-Lib folgt
               auf feat/theme-switch, dann hier ersetzen. -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            aria-hidden="true"
            style="flex-shrink:0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          {{ error() }}
        </span>
      }
    </div>
  `})],g)})))()}export{init_field_base_directive as i,init_field_shell_component as n,h as r,g as t};