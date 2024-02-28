import{p as me,aA as pe,aB as ve,g as ge,D as Ve,aC as be,aD as fe,o as ye,u as ke,aE as xe,aF as X,c as l,G as Q,X as Ce,x as n,a0 as Y,a1 as Z,a2 as he,a4 as t,aG as ee,ad as we,J as V,aa as b,ak as $,aH as Pe,V as Be,a9 as ue,ac as G,a3 as Ue,a5 as _e,ag as ae,W as le,ai as te,a8 as s,an as oe,ab as se,aj as Ae,ah as Fe}from"./index-3d960f8b.js";import{c as Me,a as H,e as re,f as Se,u as De,d as P,V as Re}from"./index.esm-2a8e92ad.js";import{V as Ie}from"./VContainer-4fed0cc2.js";import{a as $e,V as K}from"./VRow-d23250f5.js";import{V as Te}from"./VDataTableServer-4645889b.js";import{m as qe,a as ne,V as Le}from"./VSelect-2c242a5e.js";import{V as je}from"./VTextarea-d65f5aef.js";import"./VDataTable-6bf0caa2.js";import"./VDivider-c82b0246.js";import"./VList-4c0b4c5b.js";import"./VChip-bb3a691d.js";const Ee=me({...pe(),...ve(qe(),["inline"])},"VCheckbox"),Ne=ge()({name:"VCheckbox",inheritAttrs:!1,props:Ee(),emits:{"update:modelValue":d=>!0,"update:focused":d=>!0},setup(d,f){let{attrs:v,slots:B}=f;const i=Ve(d,"modelValue"),{isFocused:y,focus:u,blur:U}=be(d),_=fe(),A=ye(()=>d.id||`checkbox-${_}`);return ke(()=>{const[T,F]=xe(v),q=X.filterProps(d),L=ne.filterProps(d);return l(X,Q({class:["v-checkbox",d.class]},T,q,{modelValue:i.value,"onUpdate:modelValue":g=>i.value=g,id:A.value,focused:y.value,style:d.style}),{...B,default:g=>{let{id:j,messagesId:m,isDisabled:k,isReadonly:x}=g;return l(ne,Q(L,{id:j.value,"aria-describedby":m.value,disabled:k.value,readonly:x.value},F,{modelValue:i.value,"onUpdate:modelValue":C=>i.value=C,onFocus:u,onBlur:U}),B)}})}),{}}}),ze={style:{height:"100%"},class:"bg-back"},Ge=ue("h2",{class:"text-center mt-10 text-primary"},"商品列表",-1),He={class:"text-grey-darken-3 font-weight-bold"},ta={__name:"ProductsView",setup(d){const{apiAuth:f}=we(),v=Ce(),B=n(null),i=n(!1),y=n(!1),u=n(""),U=["成蟲","幼蟲","標本","其他"],_=o=>{o?(u.value=o._id,m.value.value=o.name,k.value.value=o.price,x.value.value=o.stock,C.value.value=o.description,M.value.value=o.category,S.value.value=o.sell):u.value="",i.value=!0},A=()=>{i.value=!1,j(),B.value.deleteFileRecord()},T=o=>{u.value=o._id,m.value.value=o.name,y.value=!0},F=()=>{y.value=!1},q=Me({name:H().required("缺少商品名稱"),price:re().typeError("價格格式錯誤").required("缺少商品價格").min(0,"商品價格不能小於 0"),stock:re().typeError("數量格式錯誤").required("缺少商品數量").min(0,"商品數量不能小於 0"),description:H().required("缺少商品描述"),category:H().required("缺少商品分類").test("isCategory","商品分類錯誤",o=>U.includes(o)),sell:Se()}),{handleSubmit:L,isSubmitting:g,resetForm:j}=De({validationSchema:q,initialValues:{name:"",price:0,stock:0,description:"",category:"",sell:!1}}),m=P("name"),k=P("price"),x=P("stock"),C=P("description"),M=P("category"),S=P("sell"),h=n([]),J=n([]),de=async()=>{var o,a;try{await f.delete("/products/"+u.value),v({text:"刪除成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"back",location:"bottom"}}),F(),w()}catch(r){console.log(r);const c=((a=(o=r==null?void 0:r.response)==null?void 0:o.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";v({text:c,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}},ie=L(async o=>{var a,r,c;if(!((a=h.value[0])!=null&&a.error)&&!(u.value===""&&h.value.length===0))try{const e=new FormData;for(const p in o)e.append(p,o[p]);h.value.length>0&&e.append("image",h.value[0].file),u.value===""?await f.post("/products",e):await f.patch("/products/"+u.value,e),v({text:u.value===""?"新增成功":"編輯成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"back",location:"bottom"}}),A(),W()}catch(e){console.log(e);const p=((c=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:c.message)||"發生錯誤，請稍後再試";v({text:p,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}}),E=n(10),D=n([{key:"createdAt",order:"desc"}]),R=n(1),N=n([]),ce=[{title:"圖片",sortable:!1,key:"image",align:"center"},{title:"品名",sortable:!0,key:"name"},{title:"價格",sortable:!0,key:"price"},{title:"分類",sortable:!0,key:"category"},{title:"庫存",sortable:!0,key:"stock"},{title:"上架",sortable:!0,key:"sell"},{title:"編輯",sortable:!1,key:"edit",align:"center"},{title:"刪除",sortable:!1,key:"remove",align:"center"}],z=n(!0),O=n(0),I=n(""),w=async()=>{var o,a,r,c;z.value=!0;try{const{data:e}=await f.get("/products/all",{params:{page:R.value,itemsPerPage:E.value,sortBy:((o=D.value[0])==null?void 0:o.key)||"createdAt",sortOrder:((a=D.value[0])==null?void 0:a.order)==="asc"?1:-1,search:I.value}});N.value.splice(0,N.value.length,...e.result.data),O.value=e.result.total}catch(e){console.log(e);const p=((c=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:c.message)||"發生錯誤，請稍後再試";v({text:p,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}z.value=!1};w();const W=()=>{R.value=1,w()};return(o,a)=>{const r=Y("RouterLink"),c=Y("VueFileAgent");return Z(),he("div",ze,[l(Ie,null,{default:t(()=>[l($e,{class:"justify-center"},{default:t(()=>[l(K,{cols:"12",lg:"10"},{default:t(()=>[Ge]),_:1}),l(K,{cols:"12",lg:"10",class:"text-end"},{default:t(()=>[l(V,{"prepend-icon":"mdi-plus",color:"primary",rounded:"",onClick:a[0]||(a[0]=e=>_())},{default:t(()=>[b("新增商品")]),_:1})]),_:1}),l(K,{cols:"12",lg:"10"},{default:t(()=>[l(Te,{"items-per-page":E.value,"onUpdate:itemsPerPage":[a[2]||(a[2]=e=>E.value=e),w],"sort-by":D.value,"onUpdate:sortBy":[a[3]||(a[3]=e=>D.value=e),w],page:R.value,"onUpdate:page":[a[4]||(a[4]=e=>R.value=e),w],items:N.value,headers:ce,search:I.value,"items-length":O.value,loading:z.value,class:"py-5 px-10 bg-back"},{top:t(()=>[l($,{label:"搜尋","prepend-inner-icon":"mdi-magnify",modelValue:I.value,"onUpdate:modelValue":a[1]||(a[1]=e=>I.value=e),variant:"underlined",onKeydown:Pe(W,["enter"])},null,8,["modelValue"])]),"item.image":t(({item:e})=>[l(r,{to:"/products/"+e._id},{default:t(()=>[l(Be,{src:e.image,height:"100px",contain:""},null,8,["src"])]),_:2},1032,["to"])]),"item.name":t(({item:e})=>[l(r,{to:"/products/"+e._id,class:"text-decoration-none"},{default:t(()=>[ue("p",He,G(e.name),1)]),_:2},1032,["to"])]),"item.sell":t(({item:e})=>[e.sell?(Z(),Ue(le,{key:0,icon:"mdi-check",color:"primary"})):_e("",!0)]),"item.edit":t(({item:e})=>[l(V,{icon:"mdi-pencil",variant:"text",color:"primary",onClick:p=>_(e)},null,8,["onClick"])]),"item.remove":t(({item:e})=>[l(V,{icon:"mdi-delete",variant:"text",color:"secondary",onClick:p=>T(e)},null,8,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","search","items-length","loading"])]),_:1})]),_:1})]),_:1}),l(ee,{modelValue:y.value,"onUpdate:modelValue":a[5]||(a[5]=e=>y.value=e),width:"300px"},{default:t(()=>[l(ae,{rounded:"xl"},{default:t(()=>[l(le,{icon:"mdi-alert-circle",color:"secondary",size:"50",class:"ma-auto mt-5"}),l(te,null,{default:t(()=>[b("確定要刪除「"+G(s(m).value.value)+"」嗎？此動作無法復原！",1)]),_:1}),l(oe,null,{default:t(()=>[l(se),l(V,{color:"primary",rounded:"",onClick:F},{default:t(()=>[b("取消")]),_:1}),l(V,{color:"secondary",rounded:"",onClick:de},{default:t(()=>[b("確認刪除")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(ee,{modelValue:i.value,"onUpdate:modelValue":a[14]||(a[14]=e=>i.value=e),persistent:"",width:"500px"},{default:t(()=>[l(Re,{disabled:s(g),onSubmit:Ae(s(ie),["prevent"])},{default:t(()=>[l(ae,{rounded:"xl"},{default:t(()=>[l(Fe,{class:"text-center mt-3 pb-0"},{default:t(()=>[b(G(u.value===""?"新增商品":"編輯商品"),1)]),_:1}),l(te,null,{default:t(()=>[l($,{label:"商品名稱",variant:"outlined",density:"compact",class:"pb-3",modelValue:s(m).value.value,"onUpdate:modelValue":a[6]||(a[6]=e=>s(m).value.value=e),"error-messages":s(m).errorMessage.value},null,8,["modelValue","error-messages"]),l($,{label:"價格",variant:"outlined",density:"compact",type:"number",min:"0",class:"pb-3",modelValue:s(k).value.value,"onUpdate:modelValue":a[7]||(a[7]=e=>s(k).value.value=e),"error-messages":s(k).errorMessage.value},null,8,["modelValue","error-messages"]),l($,{label:"商品數量",variant:"outlined",density:"compact",type:"number",min:"0",class:"pb-3",modelValue:s(x).value.value,"onUpdate:modelValue":a[8]||(a[8]=e=>s(x).value.value=e),"error-messages":s(x).errorMessage.value},null,8,["modelValue","error-messages"]),l(Le,{label:"分類",variant:"outlined",density:"compact",items:U,modelValue:s(M).value.value,"onUpdate:modelValue":a[9]||(a[9]=e=>s(M).value.value=e),"error-messages":s(M).errorMessage.value},null,8,["modelValue","error-messages"]),l(Ne,{label:"上架",density:"compact",modelValue:s(S).value.value,"onUpdate:modelValue":a[10]||(a[10]=e=>s(S).value.value=e),"error-messages":s(S).errorMessage.value},null,8,["modelValue","error-messages"]),l(je,{label:"商品描述",variant:"outlined",density:"compact",modelValue:s(C).value.value,"onUpdate:modelValue":a[11]||(a[11]=e=>s(C).value.value=e),"error-messages":s(C).errorMessage.value},null,8,["modelValue","error-messages"]),l(c,{modelValue:h.value,"onUpdate:modelValue":a[12]||(a[12]=e=>h.value=e),rawModelValue:J.value,"onUpdate:rawModelValue":a[13]||(a[13]=e=>J.value=e),accept:"image/jpeg,image/png","max-size":"2MB","error-text":{type:"檔案格式不支援，只接受 .jpeg .png",size:"檔案超過 2MB 大小限制"},deletable:"","help-text":"選擇商品圖片或拖曳到這裡","max-files":1,ref_key:"fileAgent",ref:B},null,8,["modelValue","rawModelValue","error-text"])]),_:1}),l(oe,null,{default:t(()=>[l(se),l(V,{color:"secondary",rounded:"",disabled:s(g),onClick:A},{default:t(()=>[b("取消")]),_:1},8,["disabled"]),l(V,{color:"primary",rounded:"",type:"submit",loading:s(g)},{default:t(()=>[b("送出")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])])}}};export{ta as default};
