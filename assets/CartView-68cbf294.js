import{_ as Z,K as J,N as O,L as ee,r as A,c as X,o as te,P as oe,Q as p,R as _,h as t,T as o,a3 as ae,$ as u,Y as l,U as k,W as se,X as le,Z as n,a2 as m,V as y,G as re,H as ne,a9 as ce,aa as P,S as z,a0 as de,ag as j,a4 as ue,a5 as ie}from"./index-312f7d63.js";import{c as pe,a as b,u as me,d as x,V as ve}from"./index.esm-d9d440bf.js";import{V as _e}from"./VContainer-e8ed2d20.js";import{a as I,V as r}from"./VRow-94dabaa4.js";import{V as E}from"./VChip-89c88da9.js";import{V as G}from"./VDivider-c96db2c3.js";import{V as he}from"./VSelect-4ee353f1.js";import{V as ye}from"./VTextarea-f852b33d.js";import"./VList-d38cedfd.js";const V=C=>(ue("data-v-3a126464"),C=C(),ie(),C),fe={style:{height:"100%"},class:"bg-back"},ge={key:0,class:"text-center text-grey-darken-1"},ke={key:0},be={class:"text-grey-darken-1"},xe={key:1},Ve={class:"text-decoration-line-through"},Ce=V(()=>n("p",{class:"text-secondary text-subtitle-2"},"商品已下架 或 暫時無庫存",-1)),we={class:"text-grey-darken-1"},Se={key:0,class:"text-secondary text-subtitle-2"},Ne={class:"text-h5 font-weight-bold"},Te=V(()=>n("p",{class:"text-body-2 text-grey-darken-1"},"(運費另計)",-1)),Be={class:"text-h5 font-weight-bold"},qe={key:0},$e=V(()=>n("b",{class:"text-h6 font-weight-bold"},"110",-1)),Le={key:1},Pe=V(()=>n("b",{class:"text-h6 font-weight-bold"},"70",-1)),ze={key:2},Ie=V(()=>n("b",{class:"text-h6 font-weight-bold"},"0",-1)),Me={__name:"CartView",setup(C){const{apiAuth:w}=ae(),h=J(),i=O(),S=ee(),v=A([]),M=a=>i.likes.includes(a),U=X(()=>v.value.reduce((a,s)=>a+s.quantity*s.product.price,0)),q=A(!1),F=["黑貓","7-11 交貨便","面交"],H=X(()=>v.value.length>0&&!v.value.some(a=>!a.product.sell)&&!v.value.some(a=>a.product.stock<=0)),$=async(a,s)=>{var c,e;if(!i.isLogin){S.push("/login");return}try{const{data:d}=await w.patch("/users/cart",{product:a,quantity:s});i.cart=d.result;const g=v.value.findIndex(Y=>Y.product._id===a);v.value[g].quantity+=s,v.value[g].quantity<=0&&v.value.splice(g,1),h({text:"修改成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"primary",location:"bottom"}})}catch(d){const g=((e=(c=d==null?void 0:d.response)==null?void 0:c.data)==null?void 0:e.message)||"發生錯誤，請稍後再試";h({text:g,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}},R=async a=>{var s,c;if(!i.isLogin){S.push("/login");return}try{await w.patch("/users/likes",{product:a});const e=i.likes.findIndex(d=>d===a);e>-1?i.likes.splice(e,1):i.likes.push(a),h({text:M(a)?"已加入收藏！":"已取消收藏！",showCloseButton:!1,snackbarProps:{timeout:1e3,color:"back",location:"center"}})}catch(e){console.log(e);const d=((c=(s=e==null?void 0:e.response)==null?void 0:s.data)==null?void 0:c.message)||"發生錯誤，請稍後再試";h({text:d,showCloseButton:!1,snackbarProps:{timeout:1e3,color:"secondary",location:"center"}})}},K=pe({name:b().required("收件人姓名 必填"),phone:b().required("收件人電話 必填").min(10,"手機號碼格式錯誤").max(10,"手機號碼格式錯誤"),delivery:b().required("運送方式 必填").test("isCategory","運送方式錯誤",a=>F.includes(a)),address:b().required("收件地址 必填"),note:b()}),{handleSubmit:Q,isSubmitting:D}=me({validationSchema:K,initialValues:{name:"",phone:"",delivery:"",address:"",note:""}}),N=x("name"),T=x("phone"),f=x("delivery"),B=x("address"),L=x("note");N.value.value=i.name,T.value.value=i.phone,B.value.value=i.address;const W=Q(async a=>{var s,c;try{await w.post("/orders",{name:a.name,phone:a.phone,delivery:a.delivery,address:a.address,note:a.note}),i.cart=0,S.push("/myorders"),h({text:"訂單送出成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"back",location:"bottom"}})}catch(e){const d=((c=(s=e==null?void 0:e.response)==null?void 0:s.data)==null?void 0:c.message)||"發生錯誤，請稍後再試";h({text:d,showCloseButton:!1,snackbarProps:{timeout:3e3,color:"secondary",location:"bottom"}}),setTimeout(()=>{S.go(0)},3e3)}});return te(async()=>{var a,s;try{const{data:c}=await w.get("/users/cart");v.value.push(...c.result)}catch(c){const e=((s=(a=c==null?void 0:c.response)==null?void 0:a.data)==null?void 0:s.message)||"發生錯誤，請稍後再試";h({text:e,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}}),(a,s)=>{const c=oe("RouterLink");return p(),_("div",fe,[t(_e,null,{default:o(()=>[t(I,{class:"justify-center"},{default:o(()=>[t(r,{cols:"12",md:"11",class:"text-center mt-8"},{default:o(()=>[t(E,{class:"vchip-space text-body-2 text-md-body-1",variant:"outlined",size:"large",color:"primary","append-icon":"mdi-check-circle-outline"},{default:o(()=>[u("購物車 > 填寫運送資訊 > 送出訂單 > 付款")]),_:1}),t(G,{class:"mx-3 my-5"})]),_:1}),t(r,{cols:"12",md:"11"},{default:o(()=>[l(i).cart===0?(p(),_("p",ge,"----- 購物車沒有商品 -----")):k("",!0),(p(!0),_(se,null,le(v.value,e=>(p(),z(I,{key:e._id},{default:o(()=>[t(r,{cols:"6",lg:"3"},{default:o(()=>[t(c,{to:"/products/"+e.product._id},{default:o(()=>[t(de,{src:e.product.image,"aspect-ratio":"1"},null,8,["src"])]),_:2},1032,["to"])]),_:2},1024),t(r,{cols:"6",lg:"9",class:"d-flex flex-column flex-lg-row"},{default:o(()=>[t(r,{lg:"4"},{default:o(()=>[e.product.sell&&e.product.stock>0?(p(),_("div",ke,[n("h3",null,m(e.product.name),1),n("p",be,"NT. "+m(e.product.price),1)])):(p(),_("div",xe,[n("h3",Ve,m(e.product.name),1),Ce,n("p",we,"NT. "+m(e.product.price),1)])),t(E,{density:"comfortable",class:"mt-2",variant:"outlined",color:"primary"},{default:o(()=>[u(m(e.product.category),1)]),_:2},1024)]),_:2},1024),t(r,null,{default:o(()=>[n("p",{class:j(e.product.sell&&e.product.stock>0?[]:["text-grey"])},[u(" 數量： "),t(y,{icon:"mdi-minus",variant:"text",density:"compact",color:"primary",class:"mb-1",disabled:!e.product.sell||e.product.stock<=0,onClick:d=>$(e.product._id,-1)},null,8,["disabled","onClick"]),u(" "+m(e.quantity)+" ",1),t(y,{icon:"mdi-plus",variant:"text",density:"compact",color:"primary",class:"mb-1",disabled:!e.product.sell||e.product.stock<=0,onClick:d=>$(e.product._id,1)},null,8,["disabled","onClick"])],2),e.product.stock<=5&&e.product.stock>0?(p(),_("p",Se,"最後 "+m(e.product.stock)+" 組！",1)):k("",!0)]),_:2},1024),t(r,null,{default:o(()=>[n("p",{class:j(e.product.sell&&e.product.stock>0?[]:["text-grey"])},[u("小計：NT. "),n("b",null,m(e.product.price*e.quantity),1)],2)]),_:2},1024),t(r,{class:"d-flex",lg:"2"},{default:o(()=>[M(e.product._id)?(p(),z(y,{key:0,icon:"mdi-heart",size:"small",color:"secondary",variant:"outlined",class:"me-3",onClick:d=>R(e.product._id)},null,8,["onClick"])):(p(),z(y,{key:1,icon:"mdi-heart-outline",size:"small",color:"secondary",variant:"outlined",class:"me-3",onClick:d=>R(e.product._id)},null,8,["onClick"])),t(y,{icon:"mdi-delete",size:"small",color:"secondary",onClick:d=>$(e.product._id,e.quantity*-1)},null,8,["onClick"])]),_:2},1024)]),_:2},1024),t(G,{class:"mx-3 my-3"})]),_:2},1024))),128))]),_:1}),t(r,{cols:"12",md:"11",class:"text-end pe-10"},{default:o(()=>[n("p",null,[u("共 "),n("b",null,m(l(i).cart),1),u(" 件商品")]),n("p",null,[u("總計：NT. "),n("b",Ne,m(U.value),1)]),Te]),_:1}),t(r,{cols:"12",md:"11",class:"text-end pe-10 mb-5"},{default:o(()=>[t(y,{color:"primary",size:"large",rounded:"","append-icon":"mdi-arrow-down-circle",onClick:s[0]||(s[0]=e=>q.value=!q.value)},{default:o(()=>[u("填寫運送資訊")]),_:1})]),_:1}),t(r,{cols:"12",md:"11",class:"text-end mb-16 pe-10"},{default:o(()=>[re(t(ve,{disabled:l(D),onSubmit:ce(l(W),["prevent"])},{default:o(()=>[t(I,null,{default:o(()=>[t(r,{cols:"12",md:"4"},{default:o(()=>[t(P,{"prepend-icon":"mdi-account-box-outline",label:"收件人姓名",placeholder:"王X明",hint:"請填寫真實姓名以利收件",variant:"outlined",density:"compact",modelValue:l(N).value.value,"onUpdate:modelValue":s[1]||(s[1]=e=>l(N).value.value=e),"error-messages":l(N).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(r,{cols:"12",md:"4"},{default:o(()=>[t(P,{"prepend-icon":"mdi-phone-outline",label:"收件人電話",placeholder:"0912345678",variant:"outlined",density:"compact",modelValue:l(T).value.value,"onUpdate:modelValue":s[2]||(s[2]=e=>l(T).value.value=e),"error-messages":l(T).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(r,{cols:"12",md:"4"},{default:o(()=>[t(he,{"prepend-icon":"mdi-package-variant-closed-check",label:"運送方式",variant:"outlined",density:"compact",items:F,modelValue:l(f).value.value,"onUpdate:modelValue":s[3]||(s[3]=e=>l(f).value.value=e),"error-messages":l(f).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(r,{cols:"12",md:"12"},{default:o(()=>[t(P,{"prepend-icon":"mdi-map-marker-outline",label:"收件地址",placeholder:"請填寫宅配地址 或 7-11 門市，面交請填寫「面交」",variant:"outlined",density:"compact",modelValue:l(B).value.value,"onUpdate:modelValue":s[4]||(s[4]=e=>l(B).value.value=e),"error-messages":l(B).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(r,{cols:"12"},{default:o(()=>[t(ye,{"prepend-icon":"mdi-text",label:"訂單備註",variant:"outlined",density:"compact",clearable:"","auto-grow":"",modelValue:l(L).value.value,"onUpdate:modelValue":s[5]||(s[5]=e=>l(L).value.value=e),"error-messages":l(L).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),t(r,{cols:"12"},{default:o(()=>[n("p",null,[u("總計：NT. "),n("b",Be,m(U.value),1)]),l(f).value.value==="黑貓"?(p(),_("p",qe,[u("運費：NT. "),$e])):k("",!0),l(f).value.value==="7-11 交貨便"?(p(),_("p",Le,[u("運費：NT. "),Pe])):k("",!0),l(f).value.value==="面交"?(p(),_("p",ze,[u("運費：NT. "),Ie])):k("",!0)]),_:1}),t(r,{cols:"12"},{default:o(()=>[t(y,{type:"submit",color:"primary",size:"large",rounded:"","append-icon":"mdi-arrow-right-circle",disabled:!H.value,loading:l(D)},{default:o(()=>[u("送出訂單")]),_:1},8,["disabled","loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"]),[[ne,q.value]])]),_:1})]),_:1})]),_:1})])}}},He=Z(Me,[["__scopeId","data-v-3a126464"]]);export{He as default};
