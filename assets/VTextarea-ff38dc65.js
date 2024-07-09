import{p,aE as ee,aL as te,g as ae,aM as ne,u as le,aG as oe,c as y,r as v,s as ue,j as ie,o as re,w as x,b as se,f as ce,aI as de,aJ as A,aN as fe,h as l,aO as ve,i as k,W as S,G as _,aP as xe,aQ as me,aR as ge,aS as he,ae as b,aT as we,au as Ve,a as ye}from"./index-3a588185.js";const Fe=p({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...ee(),...te()},"VTextarea"),Ce=ae()({name:"VTextarea",directives:{Intersect:ne},inheritAttrs:!1,props:Fe(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,E){let{attrs:F,emit:M,slots:i}=E;const o=le(e,"modelValue"),{isFocused:f,focus:D,blur:U}=oe(e),O=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),$=y(()=>{if(F.maxlength)return F.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function j(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const N=v(),m=v(),T=ue(""),g=v(),J=y(()=>e.persistentPlaceholder||f.value||e.active);function P(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||D()}function L(t){P(),M("click:control",t)}function Q(t){M("mousedown:control",t)}function W(t){t.stopPropagation(),P(),b(()=>{o.value="",we(e["onClick:clear"],t)})}function q(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];b(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(+e.rows),C=y(()=>["plain","underlined"].includes(e.variant));ie(()=>{e.autoGrow||(h.value=+e.rows)});function d(){e.autoGrow&&b(()=>{if(!c.value||!m.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(m.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),I=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),R=parseFloat(e.maxRows)*w+a||1/0,s=ye(u??0,I,R);h.value=Math.floor((s-a)/w),T.value=Ve(s)})}re(d),x(o,d),x(()=>e.rows,d),x(()=>e.maxRows,d),x(()=>e.density,d);let r;return x(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),se(()=>{r==null||r.disconnect()}),ce(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=de(F),{modelValue:w,...I}=A.filterProps(e),R=fe(e);return l(A,k({ref:N,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":C.value},e.class],style:e.style},a,I,{centerAffix:h.value===1&&!C.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:B,isDirty:G,isReadonly:K,isValid:X}=s;return l(ve,k({ref:m,style:{"--v-textarea-control-height":T.value},onClick:L,onMousedown:Q,"onClick:clear":W,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},R,{id:V.value,active:J.value||G.value,centerAffix:h.value===1&&!C.value,dirty:G.value||e.dirty,disabled:B.value,focused:f.value,error:X.value===!1}),{...i,default:Y=>{let{props:{class:H,...z}}=Y;return l(S,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),_(l("textarea",k({ref:g,class:H,value:o.value,onInput:q,autofocus:e.autofocus,readonly:K.value,disabled:B.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:P,onBlur:U},z,u),null),[[xe("intersect"),{handler:j},null,{once:!0}]]),e.autoGrow&&_(l("textarea",{class:[H,"v-textarea__sizer"],id:`${z.id}-sizer`,"onUpdate:modelValue":Z=>o.value=Z,ref:c,readonly:!0,"aria-hidden":"true"},null),[[me,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(S,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(S,null,[l("span",null,null),l(ge,{active:e.persistentCounter||f.value,value:O.value,max:$.value},i.counter)])])}:void 0})}),he({},N,m,g)}});export{Ce as V};