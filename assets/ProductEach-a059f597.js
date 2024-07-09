import{_ as N,af as E,L,K as $,N as F,r as M,c as R,o as j,Q as d,R as U,h as o,T as c,ab as A,a3 as D,a0 as z,Z as n,a2 as v,$ as p,Y as i,a9 as K,aa as O,S as _,V as m,U as V,a4 as Q,a5 as Y}from"./index-3a588185.js";import{c as Z,e as G,u as H,d as J,V as W}from"./index.esm-622322aa.js";import{V as X}from"./VContainer-33bd5d8e.js";import{a as ee,V as w}from"./VRow-6e84e012.js";import{V as te}from"./VChip-defd9100.js";import{V as ae}from"./VDivider-023c7d63.js";const C=h=>(Q("data-v-d63cbf1d"),h=h(),Y(),h),se={style:{height:"100%"},class:"bg-back"},oe={class:"d-flex justify-space-between text-primary"},ce={class:"text-end"},le=C(()=>n("h4",{class:"text-primary"},"商品描述",-1)),re={style:{"white-space":"pre"}},ie=C(()=>n("h1",{class:"text-back text-h2 font-weight-black mb-5"},"已下架",-1)),ne={__name:"ProductEach",setup(h){const S=E(),y=L(),{api:B,apiAuth:k}=D(),u=$(),r=F(),t=M({_id:"",name:"",price:0,description:"",image:"",sell:!0,category:"",stock:0,stockText:""}),x=R(()=>r.likes.includes(t.value._id)),P=Z({quantity:G().typeError("數量格式錯誤").required("缺少數量").min(1,"數量最小為 1")}),{isSubmitting:b,handleSubmit:q}=H({validationSchema:P,initialValues:{quantity:1}}),f=J("quantity"),T=q(async l=>{var a,e;if(!r.isLogin){y.push("/login");return}try{const{data:s}=await k.patch("/users/cart",{product:t.value._id,quantity:l.quantity});r.cart=s.result,u({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:1e3,color:"back",location:"center"}})}catch(s){const I=((e=(a=s==null?void 0:s.response)==null?void 0:a.data)==null?void 0:e.message)||"發生錯誤，請稍後再試";u({text:I,showCloseButton:!1,snackbarProps:{timeout:1e3,color:"secondary",location:"center"}})}}),g=async()=>{var l,a;if(!r.isLogin){y.push("/login");return}try{await k.patch("/users/likes",{product:t.value._id});const e=r.likes.findIndex(s=>s===t.value._id);e>-1?r.likes.splice(e,1):r.likes.push(t.value._id),u({text:x.value?"已加入收藏！":"已取消收藏！",showCloseButton:!1,snackbarProps:{timeout:1e3,color:"back",location:"center"}})}catch(e){console.log(e);const s=((a=(l=e==null?void 0:e.response)==null?void 0:l.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";u({text:s,showCloseButton:!1,snackbarProps:{timeout:1e3,color:"secondary",location:"center"}})}};return j(async()=>{var l,a;try{const{data:e}=await B.get("/products/"+S.params.id);t.value._id=e.result._id,t.value.name=e.result.name,t.value.price=e.result.price,t.value.description=e.result.description,t.value.image=e.result.image,t.value.sell=e.result.sell,t.value.category=e.result.category,t.value.stock=e.result.stock,e.result.stock<=5&&e.result.stock>0&&(t.value.stockText=`最後 ${e.result.stock} 組！`),document.title=`甲蟲工廠 | ${t.value.name}`}catch(e){const s=((a=(l=e==null?void 0:e.response)==null?void 0:l.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";u({text:s,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}}),y.push("/shop")}}),(l,a)=>(d(),U("div",se,[o(X,{class:"pt-12"},{default:c(()=>[o(ee,{class:"justify-center"},{default:c(()=>[o(w,{cols:"10",lg:"5"},{default:c(()=>[o(z,{src:t.value.image,rounded:"xl","max-width":"500px",class:"mx-auto"},null,8,["src"])]),_:1}),o(w,{cols:"12",md:"10",lg:"5",class:"pt-16 px-10"},{default:c(()=>[n("h2",null,v(t.value.name),1),n("h3",oe,[p(" NT. "+v(t.value.price),1),o(te,{variant:"outlined",color:"primary"},{default:c(()=>[p(v(t.value.category),1)]),_:1})]),o(W,{disabled:i(b),onSubmit:K(i(T),["prevent"]),class:"d-flex mt-5"},{default:c(()=>[o(O,{type:"number",placeholder:"數量",min:"0",max:t.value.stock,color:"primary",variant:"outlined",density:"comfortable",disabled:t.value.stock===0,modelValue:i(f).value.value,"onUpdate:modelValue":a[0]||(a[0]=e=>i(f).value.value=e),modelModifiers:{number:!0},"error-messages":i(f).errorMessage.value,hint:t.value.stockText,"persistent-hint":"",class:"hint-color"},null,8,["max","disabled","modelValue","error-messages","hint"]),t.value.stock>0?(d(),_(m,{key:0,type:"submit","prepend-icon":"mdi-cart",color:"primary",width:"50%",height:"48px",class:"ms-3",loading:i(b)},{default:c(()=>[p("加入購物車")]),_:1},8,["loading"])):V("",!0),t.value.stock===0?(d(),_(m,{key:1,"prepend-icon":"mdi-cart",color:"grey-darken-1",width:"50%",height:"48px",class:"ms-3",disabled:t.value.stock===0},{default:c(()=>[p("已售完")]),_:1},8,["disabled"])):V("",!0)]),_:1},8,["disabled","onSubmit"]),n("div",ce,[x.value?(d(),_(m,{key:0,icon:"mdi-heart",color:"secondary",variant:"text",density:"comfortable",onClick:g,class:"text-center"})):(d(),_(m,{key:1,icon:"mdi-heart-outline",color:"secondary",variant:"text",density:"comfortable",onClick:g,class:"text-center"}))]),le,o(ae,{class:"my-2"}),n("p",re,v(t.value.description),1)]),_:1})]),_:1})]),_:1}),o(A,{"model-value":!t.value.sell,persistent:"",class:"align-center justify-center text-center",opacity:"0.5"},{default:c(()=>[ie,o(m,{to:"/",color:"primary",size:"x-large",elevation:"15",rounded:""},{default:c(()=>[p("回首頁")]),_:1})]),_:1},8,["model-value"])]))}},_e=N(ne,[["__scopeId","data-v-d63cbf1d"]]);export{_e as default};