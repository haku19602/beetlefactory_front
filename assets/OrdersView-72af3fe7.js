import{p as Z,aC as X,g as ee,u as N,aS as ae,aE as te,r as d,c as M,aF as le,f as se,aG as oe,aH as q,h as a,i as E,W as re,ar as ne,aT as ie,J as K,aU as ue,aV as de,K as ce,P as me,Q as ve,R as pe,T as t,ah as fe,a3 as ge,ai as ye,a0 as be,$ as p,a2 as k,V as U,Y as u,a9 as he,a6 as Ve,a7 as ke,a8 as _e,ad as Ce,a1 as we,Z as Se}from"./index-5c103a3f.js";import{c as xe,f as O,u as Pe,d as W,V as Ae}from"./index.esm-a3ca4ea2.js";import{V as j}from"./VContainer-95b6aa67.js";import{a as G,V as D}from"./VRow-c1778a5a.js";import{V as Be}from"./VDataTable-51c6d4d6.js";import{V as Ie}from"./VChip-ca8043fe.js";import{b as Te,c as H}from"./VSelect-9b3f2fc5.js";import"./VDivider-8b51d44a.js";import"./VList-1bd5f902.js";const Ue=Z({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...X(),...Te()},"VSwitch"),J=ee()({name:"VSwitch",inheritAttrs:!1,props:Ue(),emits:{"update:focused":s=>!0,"update:modelValue":s=>!0,"update:indeterminate":s=>!0},setup(s,B){let{attrs:S,slots:n}=B;const c=N(s,"indeterminate"),f=N(s,"modelValue"),{loaderClasses:I}=ae(s),{isFocused:F,focus:L,blur:x}=te(s),m=d(),g=M(()=>typeof s.loading=="string"&&s.loading!==""?s.loading:s.color),$=le(),P=M(()=>s.id||`switch-${$}`);function A(){c.value&&(c.value=!1)}function _(v){var C,y;v.stopPropagation(),v.preventDefault(),(y=(C=m.value)==null?void 0:C.input)==null||y.click()}return se(()=>{const[v,C]=oe(S),y=q.filterProps(s),T=H.filterProps(s);return a(q,E({class:["v-switch",{"v-switch--inset":s.inset},{"v-switch--indeterminate":c.value},I.value,s.class]},v,y,{modelValue:f.value,"onUpdate:modelValue":w=>f.value=w,id:P.value,focused:F.value,style:s.style}),{...n,default:w=>{let{id:V,messagesId:z,isDisabled:o,isReadonly:l,isValid:i}=w;const e={model:f,isValid:i};return a(H,E({ref:m},T,{modelValue:f.value,"onUpdate:modelValue":[r=>f.value=r,A],id:V.value,"aria-describedby":z.value,type:"checkbox","aria-checked":c.value?"mixed":void 0,disabled:o.value,readonly:l.value,onFocus:L,onBlur:x},C),{...n,default:r=>{let{backgroundColorClasses:b,backgroundColorStyles:h}=r;return a("div",{class:["v-switch__track",...b.value],style:h.value,onClick:_},[n["track-true"]&&a("div",{key:"prepend",class:"v-switch__track-true"},[n["track-true"](e)]),n["track-false"]&&a("div",{key:"append",class:"v-switch__track-false"},[n["track-false"](e)])])},input:r=>{let{inputNode:b,icon:h,backgroundColorClasses:Q,backgroundColorStyles:Y}=r;return a(re,null,[b,a("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":h||s.loading},s.inset?void 0:Q.value],style:s.inset?void 0:Y.value},[n.thumb?a(ne,{defaults:{VIcon:{icon:h,size:"x-small"}}},{default:()=>[n.thumb({...e,icon:h})]}):a(ie,null,{default:()=>[s.loading?a(ue,{name:"v-switch",active:!0,color:i.value===!1?void 0:g.value},{default:R=>n.loader?n.loader(R):a(de,{active:R.isActive,color:R.color,indeterminate:!0,size:"16",width:"2"},null)}):h&&a(K,{key:String(h),icon:h,size:"x-small"},null)]})])])}})}})}),{}}}),De={style:{height:"100%"},class:"bg-back"},Fe=Se("h2",{class:"text-center mt-10 text-primary"},"訂單列表",-1),We={__name:"OrdersView",setup(s){const{apiAuth:B}=ge(),S=ce(),n=d(""),c=d(!1),f=o=>{n.value=o._id,m.value.value=o.paid,g.value.value=o.shipped,c.value=!0},I=()=>{c.value=!1},F=xe({paid:O(),shipped:O()}),{handleSubmit:L,isSubmitting:x}=Pe({validationSchema:F,initialValues:{paid:!1,shipped:!1}}),m=W("paid"),g=W("shipped"),$=L(async()=>{var o,l;try{await B.patch("/orders/"+n.value,{paid:m.value.value,shipped:g.value.value}),S({text:"訂單狀態已更改",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"primary",location:"bottom"}})}catch(i){const e=((l=(o=i==null?void 0:i.response)==null?void 0:o.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";S({text:e,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}I(),z()}),P=d([]),A=d(10),_=d([{key:"createdAt",order:"desc"}]),v=d(1),C=[{title:"訂購人",sortable:!1,key:"user.avatar"},{title:"",sortable:!0,key:"user.account"},{title:"訂單編號",sortable:!1,key:"_id"},{title:"訂購日期",sortable:!0,key:"createdAt"},{title:"金額",sortable:!0,key:"price",align:"center",value:o=>{const l=o.cart.reduce((i,e)=>i+e.quantity*e.product.price,0);return o.delivery==="黑貓"?l+110:o.delivery==="7-11 交貨便"?l+70:l}},{title:"付款狀態",sortable:!0,key:"paid",align:"center"},{title:"出貨狀態",sortable:!0,key:"shipped",align:"center"},{title:"完成訂單",sortable:!0,key:"done",align:"center"}],y=d(!0),T=d(0),w=d(""),V=async()=>{var o,l,i,e;y.value=!0;try{const{data:r}=await B.get("/orders/all",{params:{page:v.value,itemsPerPage:A.value,sortBy:((o=_.value[0])==null?void 0:o.key)||"createdAt",sortOrder:((l=_.value[0])==null?void 0:l.order)==="asc"?1:-1,search:w.value}});P.value.splice(0,P.value.length,...r.result.data),T.value=r.result.total}catch(r){const b=((e=(i=r==null?void 0:r.response)==null?void 0:i.data)==null?void 0:e.message)||"發生錯誤，請稍後再試";S({text:b,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}y.value=!1};V();const z=()=>{v.value=1,V()};return(o,l)=>{const i=me("RouterLink");return ve(),pe("div",De,[a(j,null,{default:t(()=>[a(G,{class:"justify-center"},{default:t(()=>[a(D,{cols:"12",lg:"11"},{default:t(()=>[Fe]),_:1}),a(D,{cols:"12",lg:"11"},{default:t(()=>[a(Be,{items:P.value,headers:C,"items-per-page":A.value,"onUpdate:itemsPerPage":[l[0]||(l[0]=e=>A.value=e),V],"sort-by":_.value,"onUpdate:sortBy":[l[1]||(l[1]=e=>_.value=e),V],page:v.value,"onUpdate:page":[l[2]||(l[2]=e=>v.value=e),V],search:w.value,"items-length":T.value,loading:y.value,class:"py-5 px-10 bg-back"},{"item.user.avatar":t(({item:e})=>[a(ye,{size:"35"},{default:t(()=>[a(be,{src:e.user.avatar,contain:""},null,8,["src"])]),_:2},1024)]),"item._id":t(({item:e})=>[a(i,{to:"/orders/"+e._id,class:"text-primary"},{default:t(()=>[p(k(e._id),1)]),_:2},1032,["to"])]),"item.createdAt":t(({item:e})=>[p(k(new Date(e.createdAt).toLocaleString("zh-TW",{hour12:!1,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})),1)]),"item.price":t(({item:e})=>[p(" NT. "+k(e.cart.reduce((r,b)=>r+b.quantity*b.product.price,0)+(e.delivery==="黑貓"?110:e.delivery==="7-11 交貨便"?70:0)),1)]),"item.paid":t(({item:e})=>[a(U,{variant:"outlined",rounded:"",density:"comfortable",class:"px-0",color:e.paid?["primary"]:["secondary"],onClick:r=>f(e)},{default:t(()=>[p(k(e.paid?"已付款":"未付款"),1)]),_:2},1032,["color","onClick"])]),"item.shipped":t(({item:e})=>[a(U,{variant:"outlined",rounded:"",density:"comfortable",class:"px-0",color:e.shipped?["primary"]:["secondary"],onClick:r=>f(e)},{default:t(()=>[p(k(e.shipped?"已出貨":"未出貨"),1)]),_:2},1032,["color","onClick"])]),"item.done":t(({item:e})=>[a(Ie,{color:"primary",variant:"text"},{default:t(()=>[p(k(e.done?"已完成":"未完成"),1)]),_:2},1024)]),_:2},1032,["items","items-per-page","sort-by","page","search","items-length","loading"])]),_:1})]),_:1})]),_:1}),a(fe,{modelValue:c.value,"onUpdate:modelValue":l[5]||(l[5]=e=>c.value=e),width:"500px"},{default:t(()=>[a(Ae,{disabled:u(x),onSubmit:he(u($),["prevent"])},{default:t(()=>[a(Ve,{rounded:"xl"},{default:t(()=>[a(K,{icon:"mdi-update",color:"primary",size:"60",class:"ma-auto mt-8 mb-3"}),a(ke,{class:"text-center"},{default:t(()=>[p("更新 "+k(n.value)+" 訂單狀態",1)]),_:1}),a(_e,null,{default:t(()=>[a(j,null,{default:t(()=>[a(G,null,{default:t(()=>[a(D,{cols:"6"},{default:t(()=>[a(J,{label:u(m).value.value?"已付款":"未付款",color:"primary",inset:"",class:"ps-5",modelValue:u(m).value.value,"onUpdate:modelValue":l[3]||(l[3]=e=>u(m).value.value=e),"error-messages":u(m).errorMessage.value},null,8,["label","modelValue","error-messages"])]),_:1}),a(D,{cols:"6"},{default:t(()=>[a(J,{label:u(g).value.value?"已出貨":"未出貨",color:"primary",inset:"",modelValue:u(g).value.value,"onUpdate:modelValue":l[4]||(l[4]=e=>u(g).value.value=e),"error-messages":u(g).errorMessage.value},null,8,["label","modelValue","error-messages"])]),_:1})]),_:1})]),_:1})]),_:1}),a(Ce,null,{default:t(()=>[a(we),a(U,{color:"secondary",rounded:"",onClick:I,disabled:u(x)},{default:t(()=>[p("取消")]),_:1},8,["disabled"]),a(U,{color:"primary",rounded:"",type:"submit",loading:u(x)},{default:t(()=>[p("更改訂單狀態")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])])}}};export{We as default};