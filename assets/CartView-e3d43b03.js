import{_ as E,X as J,Z as M,Y as X,x as V,o as I,A as Y,a0 as Z,a1 as m,a2 as f,c as t,a4 as a,ad as G,aa as i,a8 as L,a5 as P,a6 as H,a7 as K,a9 as n,ac as p,J as k,T as O,U as Q,ak as C,a3 as w,V as W,aq as T,ae as ee,af as te}from"./index-56665f09.js";import{V as oe}from"./VContainer-3643fca0.js";import{a as q,V as r}from"./VRow-17d1423b.js";import{V as $}from"./VChip-c04ce96e.js";import{V as U}from"./VDivider-ed5f6064.js";import{V as se}from"./VForm-2981e2ee.js";import{V as ae}from"./VSelect-fe8ae793.js";import"./VList-82065880.js";const F=b=>(ee("data-v-c5b7c1eb"),b=b(),te(),b),le={style:{height:"100%"},class:"bg-back"},ce=F(()=>n("b",null,"購物車",-1)),ne={key:0,class:"text-center text-grey-darken-1"},re={key:0},de={class:"text-grey-darken-1"},ue={key:1},ie={class:"text-decoration-line-through"},pe=F(()=>n("p",{class:"text-secondary text-subtitle-2"},"商品已下架 或 暫時無庫存",-1)),me={class:"text-grey-darken-1"},_e={key:0,class:"text-secondary text-subtitle-2"},ke={class:"text-h5 font-weight-bold"},fe={__name:"CartView",setup(b){const{apiAuth:h}=G(),_=J(),d=M(),v=X(),u=V([]),B=o=>d.likes.includes(o),R=I(()=>u.value.reduce((o,s)=>o+s.quantity*s.product.price,0)),g=V(!1),A=["黑貓","7-11 交貨便","面交"],S=I(()=>u.value.length>0&&!u.value.some(o=>!o.product.sell)&&!u.value.some(o=>o.product.stock<=0)),x=async(o,s)=>{var l,e;if(!d.isLogin){v.push("/login");return}try{const{data:c}=await h.patch("/users/cart",{product:o,quantity:s});d.cart=c.result;const y=u.value.findIndex(j=>j.product._id===o);u.value[y].quantity+=s,u.value[y].quantity<=0&&u.value.splice(y,1),_({text:"修改成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"primary",location:"bottom"}})}catch(c){const y=((e=(l=c==null?void 0:c.response)==null?void 0:l.data)==null?void 0:e.message)||"發生錯誤，請稍後再試";_({text:y,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}},N=async o=>{var s,l;if(!d.isLogin){v.push("/login");return}try{await h.patch("/users/likes",{product:o});const e=d.likes.findIndex(c=>c===o);e>-1?d.likes.splice(e,1):d.likes.push(o),_({text:B(o)?"已加入收藏！":"已取消收藏！",showCloseButton:!1,snackbarProps:{timeout:1e3,color:"back",location:"center"}})}catch(e){console.log(e);const c=((l=(s=e==null?void 0:e.response)==null?void 0:s.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";_({text:c,showCloseButton:!1,snackbarProps:{timeout:1e3,color:"secondary",location:"center"}})}},z=V(!1),D=async()=>{var o,s;z.value=!0;try{await h.post("/orders",{}),d.cart=0,v.push("/orders"),_({text:"結帳成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}})}catch(l){const e=((s=(o=l==null?void 0:l.response)==null?void 0:o.data)==null?void 0:s.message)||"發生錯誤，請稍後再試";_({text:e,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}z.value=!1};return Y(async()=>{var o,s;try{const{data:l}=await h.get("/users/cart");u.value.push(...l.result)}catch(l){const e=((s=(o=l==null?void 0:l.response)==null?void 0:o.data)==null?void 0:s.message)||"發生錯誤，請稍後再試";_({text:e,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}}),(o,s)=>{const l=Z("RouterLink");return m(),f("div",le,[t(oe,null,{default:a(()=>[t(q,{class:"justify-center"},{default:a(()=>[t(r,{cols:"12",md:"10",class:"text-center mt-8"},{default:a(()=>[t($,{class:"vchip-space",variant:"outlined",size:"large",color:"primary","append-icon":"mdi-check-circle-outline"},{default:a(()=>[ce,i(" > 填寫運送資訊 > 購買完成 ")]),_:1}),t(U,{class:"mx-3 my-5"})]),_:1}),t(r,{cols:"12",md:"10"},{default:a(()=>[L(d).cart===0?(m(),f("p",ne,"----- 購物車沒有商品 -----")):P("",!0),(m(!0),f(H,null,K(u.value,e=>(m(),w(q,{key:e._id},{default:a(()=>[t(r,{cols:"6",lg:"3"},{default:a(()=>[t(l,{to:"/products/"+e.product._id},{default:a(()=>[t(W,{src:e.product.image,"aspect-ratio":"1"},null,8,["src"])]),_:2},1032,["to"])]),_:2},1024),t(r,{cols:"6",lg:"9",class:"d-flex flex-column flex-lg-row"},{default:a(()=>[t(r,{lg:"4"},{default:a(()=>[e.product.sell&&e.product.stock>0?(m(),f("div",re,[n("h3",null,p(e.product.name),1),n("p",de,"NT. "+p(e.product.price),1)])):(m(),f("div",ue,[n("h3",ie,p(e.product.name),1),pe,n("p",me,"NT. "+p(e.product.price),1)])),t($,{density:"comfortable",class:"mt-2",variant:"outlined",color:"primary"},{default:a(()=>[i(p(e.product.category),1)]),_:2},1024)]),_:2},1024),t(r,null,{default:a(()=>[n("p",{class:T(e.product.sell&&e.product.stock>0?[]:["text-grey"])},[i(" 數量： "),t(k,{icon:"mdi-minus",variant:"text",density:"compact",color:"primary",class:"mb-1",disabled:!e.product.sell||e.product.stock<=0,onClick:c=>x(e.product._id,-1)},null,8,["disabled","onClick"]),i(" "+p(e.quantity)+" ",1),t(k,{icon:"mdi-plus",variant:"text",density:"compact",color:"primary",class:"mb-1",disabled:!e.product.sell||e.product.stock<=0,onClick:c=>x(e.product._id,1)},null,8,["disabled","onClick"])],2),e.product.stock<=5&&e.product.stock>0?(m(),f("p",_e,"最後 "+p(e.product.stock)+" 組！",1)):P("",!0)]),_:2},1024),t(r,null,{default:a(()=>[n("p",{class:T(e.product.sell&&e.product.stock>0?[]:["text-grey"])},[i("小計：NT. "),n("b",null,p(e.product.price*e.quantity),1)],2)]),_:2},1024),t(r,{class:"d-flex",lg:"2"},{default:a(()=>[B(e.product._id)?(m(),w(k,{key:0,icon:"mdi-heart",size:"small",color:"secondary",variant:"outlined",class:"me-3",onClick:c=>N(e.product._id)},null,8,["onClick"])):(m(),w(k,{key:1,icon:"mdi-heart-outline",size:"small",color:"secondary",variant:"outlined",class:"me-3",onClick:c=>N(e.product._id)},null,8,["onClick"])),t(k,{icon:"mdi-delete",size:"small",color:"secondary",onClick:c=>x(e.product._id,e.quantity*-1)},null,8,["onClick"])]),_:2},1024)]),_:2},1024),t(U,{class:"mx-3 my-3"})]),_:2},1024))),128))]),_:1}),t(r,{cols:"12",md:"10",class:"text-end pe-10"},{default:a(()=>[n("p",null,[i("共 "),n("b",null,p(L(d).cart),1),i(" 件商品")]),n("p",null,[i("總計：NT. "),n("b",ke,p(R.value),1)])]),_:1}),t(r,{cols:"12",md:"10",class:"text-end pe-10"},{default:a(()=>[t(k,{color:"primary",size:"large",rounded:"","append-icon":"mdi-arrow-down-circle",disabled:!S.value,onClick:s[0]||(s[0]=e=>g.value=!g.value)},{default:a(()=>[i("填寫運送資訊")]),_:1},8,["disabled"])]),_:1}),t(r,{cols:"12",md:"10",class:"text-end mb-16 pe-10"},{default:a(()=>[O(t(se,null,{default:a(()=>[t(ae,{label:"運送方式",variant:"outlined",density:"compact",items:A}),t(C,{modelValue:o.name,"onUpdate:modelValue":s[1]||(s[1]=e=>o.name=e),label:"收件人姓名",variant:"outlined",density:"compact",class:"pb-3"},null,8,["modelValue"]),t(C,{modelValue:o.phone,"onUpdate:modelValue":s[2]||(s[2]=e=>o.phone=e),label:"收件人電話",variant:"outlined",density:"compact",class:"pb-3"},null,8,["modelValue"]),t(C,{modelValue:o.address,"onUpdate:modelValue":s[3]||(s[3]=e=>o.address=e),label:"收件地址",variant:"outlined",density:"compact",class:"pb-3"},null,8,["modelValue"]),t(k,{color:"primary",size:"large",rounded:"","append-icon":"mdi-arrow-right-circle",disabled:!S.value,onClick:D},{default:a(()=>[i("結帳")]),_:1},8,["disabled"])]),_:1},512),[[Q,g.value]])]),_:1})]),_:1})]),_:1})])}}},we=E(fe,[["__scopeId","data-v-c5b7c1eb"]]);export{we as default};