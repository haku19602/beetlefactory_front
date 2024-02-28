import{af as k,L as V,K as b,r as w,o as N,Q as m,R as v,h as e,T as t,a3 as T,V as A,Y as B,$ as l,a2 as d,W as C,X as F,Z as o,S as D,a0 as R}from"./index-b20e0ee4.js";import{V as S}from"./VContainer-39409a50.js";import{a as y,V as a}from"./VRow-297c7f6d.js";import{V as c}from"./VChip-05ae3126.js";import{V as n}from"./VDivider-b710a258.js";const q={style:{height:"100%"},class:"bg-back"},L=o("h2",{class:"text-center mt-6 text-primary"},"訂單明細",-1),W={class:"text-grey-darken-1"},M={__name:"OrdersDetails",setup($){const{apiAuth:x}=T(),g=k(),f=V(),h=b(),s=w({_id:"",createdAt:"",cart:[],delivery:"",address:"",name:"",phone:"",note:"",paid:!1,shipped:!1,done:!1,price:0,deliveryFee:0});return N(async()=>{var i,u;try{const{data:r}=await x.get("/orders/"+g.params.id);s.value._id=r.result._id,s.value.createdAt=r.result.createdAt,s.value.cart=r.result.cart,s.value.delivery=r.result.delivery,s.value.address=r.result.address,s.value.name=r.result.name,s.value.phone=r.result.phone,s.value.note=r.result.note,s.value.paid=r.result.paid,s.value.shipped=r.result.shipped,s.value.done=r.result.done,s.value.price=r.result.cart.reduce((p,_)=>p+_.quantity*_.product.price,0),r.result.delivery==="黑貓"?s.value.deliveryFee=110:r.result.delivery==="7-11 交貨便"&&(s.value.deliveryFee=70)}catch(r){const p=((u=(i=r==null?void 0:r.response)==null?void 0:i.data)==null?void 0:u.message)||"發生錯誤，請稍後再試";h({text:p,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}}),f.push("/shop")}}),(i,u)=>(m(),v("div",q,[e(S,null,{default:t(()=>[e(y,{class:"justify-center pt-10"},{default:t(()=>[e(a,{cols:"12"},{default:t(()=>[L]),_:1}),e(a,{cols:"12"},{default:t(()=>[e(A,{class:"text-start",variant:"outlined",color:"primary",rounded:"",onClick:u[0]||(u[0]=r=>B(f).go(-1))},{default:t(()=>[l("返回")]),_:1})]),_:1}),e(a,{cols:"12"},{default:t(()=>[e(c,{class:"text-primary text-subtitle-1 font-weight-bold",variant:"text","prepend-icon":"mdi-information"},{default:t(()=>[l("訂單資訊")]),_:1}),e(n,{class:"my-2"})]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("訂單編號：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value._id),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("訂購日期：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(new Date(s.value.createdAt).toLocaleString("zh-TW",{hour6:!1,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("商品金額：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(" NT. "+d(s.value.price),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("運費：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l("NT. "+d(s.value.deliveryFee),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("總金額：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l("NT. "+d(s.value.price+s.value.deliveryFee),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("付款狀態：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.paid?"已付款":"未付款"),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("出貨狀態：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.shipped?"已出貨":"未出貨"),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("完成訂單：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.done?"已完成":"未完成"),1)]),_:1}),e(a,{cols:"12"},{default:t(()=>[e(c,{class:"text-primary text-subtitle-1 font-weight-bold mt-5",variant:"text","prepend-icon":"mdi-mail"},{default:t(()=>[l("收件資訊")]),_:1}),e(n,{class:"my-2"})]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("收件人姓名：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.name),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("收件人電話：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.phone),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("運送方式：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.delivery),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("收件地址：")]),_:1}),e(a,{cols:"6",md:"4"},{default:t(()=>[l(d(s.value.address),1)]),_:1}),e(a,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:t(()=>[l("訂單備註：")]),_:1}),e(a,{cols:"6",md:"10"},{default:t(()=>[l(d(s.value.note),1)]),_:1}),e(a,{cols:"12"},{default:t(()=>[e(c,{class:"text-primary text-subtitle-1 font-weight-bold mt-5",variant:"text","prepend-icon":"mdi-list-box"},{default:t(()=>[l("訂單商品")]),_:1}),e(n,{class:"my-2"})]),_:1}),e(a,null,{default:t(()=>[(m(!0),v(C,null,F(s.value.cart,r=>(m(),D(y,{key:r._id},{default:t(()=>[e(a,{cols:"6",lg:"3"},{default:t(()=>[e(R,{src:r.product.image,"aspect-ratio":"1"},null,8,["src"])]),_:2},1024),e(a,{cols:"6",lg:"9",class:"d-flex flex-column flex-lg-row"},{default:t(()=>[e(a,{lg:"4"},{default:t(()=>[o("div",null,[o("h3",null,d(r.product.name),1),o("p",W,"NT. "+d(r.product.price),1)]),e(c,{density:"comfortable",class:"mt-2",variant:"outlined",color:"primary"},{default:t(()=>[l(d(r.product.category),1)]),_:2},1024)]),_:2},1024),e(a,{lg:"4"},{default:t(()=>[o("p",null,"數量："+d(r.quantity),1)]),_:2},1024),e(a,{lg:"4"},{default:t(()=>[o("p",null,[l("小計：NT. "),o("b",null,d(r.product.price*r.quantity),1)])]),_:2},1024)]),_:2},1024),e(n,{class:"mx-3 my-3"})]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]))}};export{M as default};
