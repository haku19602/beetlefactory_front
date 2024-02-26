import{p as le,g as te,u as oe,c as e,G as j,aA as de,aB as ce,K as q,aD as me,o as pe,D as ve,aE as ge,aF as K,a6 as fe,aR as Ve,X as be,x as u,a0 as ye,a1 as E,a2 as ke,a4 as t,aG as H,ad as xe,ak as N,aH as Ce,ar as he,V as Pe,a3 as we,a5 as Ie,J as P,ag as J,W,ai as X,aa as V,ac as Re,a8 as n,an as Q,ab as Y,aj as Se,ah as _e,a9 as se}from"./index-7fe67b54.js";import{c as Ae,a as Z,e as Be,u as Ue,d as O,V as Fe}from"./index.esm-cf7a063d.js";import{V as De}from"./VContainer-5a48f817.js";import{V as Me}from"./VRow-4336aeea.js";import{V as ee}from"./VCol-f74ed9fd.js";import{V as $e}from"./VDataTableServer-3198f609.js";import{b as Ge,c as re,d as Te,e as Ne}from"./VSelect-429a9236.js";import"./VDataTable-d00e0996.js";import"./VDivider-35d85a57.js";import"./VList-4c1275af.js";import"./VChip-63b82233.js";const Oe=le({...Ge({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),ae=te()({name:"VRadio",props:Oe(),setup(r,p){let{slots:c}=p;return oe(()=>e(re,j(r,{class:["v-radio",r.class],style:r.style,type:"radio"}),c)),{}}});const je=le({height:{type:[Number,String],default:"auto"},...de(),...ce(Te(),["multiple"]),trueIcon:{type:q,default:"$radioOn"},falseIcon:{type:q,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),ze=te()({name:"VRadioGroup",inheritAttrs:!1,props:je(),emits:{"update:modelValue":r=>!0},setup(r,p){let{attrs:c,slots:v}=p;const b=me(),g=pe(()=>r.id||`radio-group-${b}`),d=ve(r,"modelValue");return oe(()=>{const[U,R]=ge(c),F=K.filterProps(r),S=re.filterProps(r),w=v.label?v.label({label:r.label,props:{for:g.value}}):r.label;return e(K,j({class:["v-radio-group",r.class],style:r.style},U,F,{modelValue:d.value,"onUpdate:modelValue":I=>d.value=I,id:g.value}),{...v,default:I=>{let{id:f,messagesId:D,isDisabled:m,isReadonly:y}=I;return e(fe,null,[w&&e(Ve,{id:f.value},{default:()=>[w]}),e(Ne,j(S,{id:f.value,"aria-describedby":D.value,defaultsTarget:"VRadio",trueIcon:r.trueIcon,falseIcon:r.falseIcon,type:r.type,disabled:m.value,readonly:y.value,"aria-labelledby":w?f.value:void 0,multiple:!1},R,{modelValue:d.value,"onUpdate:modelValue":k=>d.value=k}),v)])}})}),{}}}),Le={style:{height:"100%"},class:"bg-back"},qe=se("h2",{class:"text-center mt-5 text-primary"},"會員列表",-1),Ke=se("br",null,null,-1),ta={__name:"MembersView",setup(r){const{apiAuth:p}=xe(),c=be(),v=u(null),b=u(!1),g=u(!1),d=u(""),U=o=>{o?(d.value=o._id,m.value.value=o.account,y.value.value=o.email,k.value.value=o.role):d.value="",b.value=!0},R=()=>{b.value=!1,D(),v.value.deleteFileRecord()},F=o=>{d.value=o._id,m.value.value=o.account,g.value=!0},S=()=>{g.value=!1},w=Ae({account:Z().required("缺少使用者帳號").min(4,"帳號名稱最少 4 字").max(20,"帳號名稱最多 20 字"),email:Z().required("缺少使用者信箱"),role:Be().required("缺少使用者角色")}),{handleSubmit:I,isSubmitting:f,resetForm:D}=Ue({validationSchema:w,initialValues:{account:"",email:0,role:0}}),m=O("account"),y=O("email"),k=O("role"),x=u([]),z=u([]),ne=async()=>{var o,l;try{await p.delete("/users/"+d.value),c({text:"刪除成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"back",location:"bottom"}}),S(),C()}catch(i){console.log(i);const a=((l=(o=i==null?void 0:i.response)==null?void 0:o.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";c({text:a,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}},ue=I(async o=>{var l,i,a;if(!((l=x.value[0])!=null&&l.error)&&!(d.value===""&&x.value.length===0))try{const s=new FormData;for(const h in o)s.append(h,o[h]);x.value.length>0&&s.append("image",x.value[0].file),await p.patch("/users/"+d.value,s),c({text:"編輯成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"back",location:"bottom"}}),R(),T()}catch(s){console.log(s);const h=((a=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";c({text:h,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}}),M=u(10),_=u([{key:"createdAt",order:"desc"}]),A=u(1),$=u([]),ie=[{title:"大頭貼",align:"center",sortable:!1,key:"avatar"},{title:"帳號",align:"center",sortable:!0,key:"account"},{title:"信箱",align:"center",sortable:!0,key:"email"},{title:"管理員",align:"center",sortable:!0,key:"role"},{title:"編輯",align:"center",sortable:!1,key:"edit"},{title:"刪除",align:"center",sortable:!1,key:"remove"}],G=u(!0),L=u(0),B=u(""),C=async()=>{var o,l,i,a;G.value=!0;try{const{data:s}=await p.get("/users/all",{params:{page:A.value,itemsPerPage:M.value,sortBy:((o=_.value[0])==null?void 0:o.key)||"createdAt",sortOrder:((l=_.value[0])==null?void 0:l.order)==="asc"?1:-1,search:B.value}});$.value.splice(0,$.value.length,...s.result.data),L.value=s.result.total}catch(s){console.log(s);const h=((a=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";c({text:h,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}G.value=!1};C();const T=()=>{A.value=1,C()};return(o,l)=>{const i=ye("VueFileAgent");return E(),ke("div",Le,[e(De,null,{default:t(()=>[e(Me,{class:"justify-center"},{default:t(()=>[e(ee,{cols:"12",lg:"10"},{default:t(()=>[qe]),_:1}),e(ee,{cols:"12",lg:"10"},{default:t(()=>[e($e,{"items-per-page":M.value,"onUpdate:itemsPerPage":[l[1]||(l[1]=a=>M.value=a),C],"sort-by":_.value,"onUpdate:sortBy":[l[2]||(l[2]=a=>_.value=a),C],page:A.value,"onUpdate:page":[l[3]||(l[3]=a=>A.value=a),C],items:$.value,headers:ie,loading:G.value,"items-length":L.value,search:B.value,class:"py-5 px-10 bg-back"},{top:t(()=>[e(N,{label:"搜尋","append-inner-icon":"mdi-magnify",modelValue:B.value,"onUpdate:modelValue":l[0]||(l[0]=a=>B.value=a),variant:"underlined","onClick:appendInner":T,onKeydown:Ce(T,["enter"])},null,8,["modelValue"])]),"item.avatar":t(({item:a})=>[e(he,{size:"30"},{default:t(()=>[e(Pe,{src:a.avatar,contain:""},null,8,["src"])]),_:2},1024)]),"item.role":t(({item:a})=>[a.role===1?(E(),we(W,{key:0,icon:"mdi-check",color:"primary"})):Ie("",!0)]),"item.edit":t(({item:a})=>[e(P,{icon:"mdi-pencil",variant:"text",color:"primary",onClick:s=>U(a)},null,8,["onClick"])]),"item.remove":t(({item:a})=>[e(P,{icon:"mdi-delete",variant:"text",color:"secondary",onClick:s=>F(a)},null,8,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"])]),_:1})]),_:1})]),_:1}),e(H,{modelValue:g.value,"onUpdate:modelValue":l[4]||(l[4]=a=>g.value=a),width:"300px"},{default:t(()=>[e(J,{rounded:"xl"},{default:t(()=>[e(W,{icon:"mdi-alert-circle",color:"secondary",size:"50",class:"ma-auto mt-5"}),e(X,null,{default:t(()=>[V("確定要刪除「"+Re(n(m).value.value)+"」嗎？ ",1),Ke,V(" 此動作無法復原！")]),_:1}),e(Q,null,{default:t(()=>[e(Y),e(P,{color:"primary",rounded:"",onClick:S},{default:t(()=>[V("取消")]),_:1}),e(P,{color:"secondary",rounded:"",onClick:ne},{default:t(()=>[V("確認刪除")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(H,{modelValue:b.value,"onUpdate:modelValue":l[10]||(l[10]=a=>b.value=a),persistent:"",width:"500px"},{default:t(()=>[e(Fe,{disabled:n(f),onSubmit:Se(n(ue),["prevent"])},{default:t(()=>[e(J,{rounded:"xl"},{default:t(()=>[e(_e,{class:"text-center mt-3 pb-0"},{default:t(()=>[V("編輯使用者")]),_:1}),e(X,null,{default:t(()=>[e(N,{label:"帳號",variant:"outlined",density:"compact",class:"pb-3",minlength:"4",maxlength:"20",counter:"",modelValue:n(m).value.value,"onUpdate:modelValue":l[5]||(l[5]=a=>n(m).value.value=a),"error-messages":n(m).errorMessage.value},null,8,["modelValue","error-messages"]),e(N,{label:"信箱",variant:"outlined",density:"compact",type:"email",min:"0",class:"pb-3",modelValue:n(y).value.value,"onUpdate:modelValue":l[6]||(l[6]=a=>n(y).value.value=a),"error-messages":n(y).errorMessage.value},null,8,["modelValue","error-messages"]),e(ze,{modelValue:n(k).value.value,"onUpdate:modelValue":l[7]||(l[7]=a=>n(k).value.value=a),"error-messages":n(k).errorMessage.value,inline:""},{default:t(()=>[e(ae,{label:"一般會員",value:0}),e(ae,{label:"管理員",value:1})]),_:1},8,["modelValue","error-messages"]),e(i,{modelValue:x.value,"onUpdate:modelValue":l[8]||(l[8]=a=>x.value=a),rawModelValue:z.value,"onUpdate:rawModelValue":l[9]||(l[9]=a=>z.value=a),accept:"image/jpeg,image/png","max-size":"2MB","error-text":{type:"檔案格式不支援，只接受 .jpeg .png",size:"檔案超過 2MB 大小限制"},deletable:"","help-text":"選擇大頭貼圖片或拖曳到這裡","max-files":1,ref_key:"fileAgent",ref:v},null,8,["modelValue","rawModelValue","error-text"])]),_:1}),e(Q,null,{default:t(()=>[e(Y),e(P,{color:"secondary",rounded:"",disabled:n(f),onClick:R},{default:t(()=>[V("取消")]),_:1},8,["disabled"]),e(P,{color:"primary",rounded:"",type:"submit",loading:n(f)},{default:t(()=>[V("送出")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])])}}};export{ta as default};