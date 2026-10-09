import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,P as a,Tn as o,V as s,bn as c,k as l,q as u,z as d}from"./angular-platform-BGeCprOl.js";import{a as f}from"./lucide-angular-CTBwqO1y.js";import{n as p}from"./cds-icons-DtWH1HnJ.js";import{n as m,t as h}from"./cva-base.directive-CmqEZn86.js";var g,_;function init_field_base_directive(){return(init_field_base_directive=e((()=>{o(),n(),m(),g=0,_=class FieldBase extends h{label=i(``);helper=i(``);error=i(``);quietError=i(!1);required=i(!1);fieldId=i(`cds-field-${++g}`);value=l(``);disabled=l(!1);normalizeValue(e){return e??``}applyValue(e){this.value.set(e)}applyDisabled(e){this.disabled.set(e)}handleInput(e){let t=e.target.value;this.value.set(t),this.onChange(t)}handleBlur(){this.onTouched()}errorId=a(()=>`${this.fieldId()}-error`);static propDecorators={label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],helper:[{type:r,args:[{isSignal:!0,alias:`helper`,required:!1,transform:void 0}]}],error:[{type:r,args:[{isSignal:!0,alias:`error`,required:!1,transform:void 0}]}],quietError:[{type:r,args:[{isSignal:!0,alias:`quietError`,required:!1,transform:void 0}]}],required:[{type:r,args:[{isSignal:!0,alias:`required`,required:!1,transform:void 0}]}],fieldId:[{type:r,args:[{isSignal:!0,alias:`fieldId`,required:!1,transform:void 0}]}],value:[{type:r,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:u,args:[`valueChange`]}],disabled:[{type:r,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:u,args:[`disabledChange`]}]}},_=c([s()],_)})))()}var v;function init_field_shell_component(){return(init_field_shell_component=e((()=>{o(),n(),p(),v=class FieldShellComponent{label=i(``);required=i(!1);helper=i(``);error=i(``);fieldId=i(``);errorId=i(``);quietError=i(!1);static propDecorators={label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],required:[{type:r,args:[{isSignal:!0,alias:`required`,required:!1,transform:void 0}]}],helper:[{type:r,args:[{isSignal:!0,alias:`helper`,required:!1,transform:void 0}]}],error:[{type:r,args:[{isSignal:!0,alias:`error`,required:!1,transform:void 0}]}],fieldId:[{type:r,args:[{isSignal:!0,alias:`fieldId`,required:!1,transform:void 0}]}],errorId:[{type:r,args:[{isSignal:!0,alias:`errorId`,required:!1,transform:void 0}]}],quietError:[{type:r,args:[{isSignal:!0,alias:`quietError`,required:!1,transform:void 0}]}]}},v=c([t({selector:`cds-field-shell`,changeDetection:d.OnPush,imports:[f],template:`
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
          <svg lucideCircleAlert size="24" [strokeWidth]="1.25" style="flex-shrink:0"></svg>
          {{ error() }}
        </span>
      }
    </div>
  `})],v)})))()}export{init_field_base_directive as i,init_field_shell_component as n,_ as r,v as t};