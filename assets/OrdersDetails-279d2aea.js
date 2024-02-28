import{ap as k,Y as V,X as b,x as w,A as N,a1 as m,a2 as v,c as e,a4 as a,ad as A,J as T,a8 as B,aa as l,ac as d,a6 as C,a7 as F,a9 as u,a3 as D,V as q}from"./index-3d960f8b.js";import{V as R}from"./VContainer-4fed0cc2.js";import{a as y,V as t}from"./VRow-d23250f5.js";import{V as c}from"./VChip-bb3a691d.js";import{V as n}from"./VDivider-c82b0246.js";const S={style:{height:"100%"},class:"bg-back"},L=u("h2",{class:"text-center mt-6 text-primary"},"訂單明細",-1),j={class:"text-grey-darken-1"},P={__name:"OrdersDetails",setup(z){const{apiAuth:x}=A(),g=k(),f=V(),h=b(),s=w({_id:"",createdAt:"",cart:[],delivery:"",address:"",name:"",phone:"",note:"",paid:!1,shipped:!1,done:!1,price:0,deliveryFee:0});return N(async()=>{var i,o;try{const{data:r}=await x.get("/orders/"+g.params.id);s.value._id=r.result._id,s.value.createdAt=r.result.createdAt,s.value.cart=r.result.cart,s.value.delivery=r.result.delivery,s.value.address=r.result.address,s.value.name=r.result.name,s.value.phone=r.result.phone,s.value.note=r.result.note,s.value.paid=r.result.paid,s.value.shipped=r.result.shipped,s.value.done=r.result.done,s.value.price=r.result.cart.reduce((p,_)=>p+_.quantity*_.product.price,0),r.result.delivery==="黑貓"?s.value.deliveryFee=110:r.result.delivery==="7-11 交貨便"&&(s.value.deliveryFee=70)}catch(r){const p=((o=(i=r==null?void 0:r.response)==null?void 0:i.data)==null?void 0:o.message)||"發生錯誤，請稍後再試";h({text:p,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}}),f.push("/shop")}}),(i,o)=>(m(),v("div",S,[e(R,null,{default:a(()=>[e(y,{class:"justify-center pt-10"},{default:a(()=>[e(t,{cols:"12"},{default:a(()=>[L]),_:1}),e(t,{cols:"12"},{default:a(()=>[e(T,{class:"text-start",variant:"outlined",color:"primary",rounded:"",onClick:o[0]||(o[0]=r=>B(f).go(-1))},{default:a(()=>[l("返回")]),_:1})]),_:1}),e(t,{cols:"12"},{default:a(()=>[e(c,{class:"text-primary text-subtitle-1 font-weight-bold",variant:"text","prepend-icon":"mdi-information"},{default:a(()=>[l("訂單資訊")]),_:1}),e(n,{class:"my-2"})]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("訂單編號：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value._id),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("訂購日期：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(new Date(s.value.createdAt).toLocaleString("zh-TW",{hour6:!1,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("商品金額：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(" NT. "+d(s.value.price),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("運費：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l("NT. "+d(s.value.deliveryFee),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("總金額：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l("NT. "+d(s.value.price+s.value.deliveryFee),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("付款狀態：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.paid?"已付款":"未付款"),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("出貨狀態：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.shipped?"已出貨":"未出貨"),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("完成訂單：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.done?"已完成":"未完成"),1)]),_:1}),e(t,{cols:"12"},{default:a(()=>[e(c,{class:"text-primary text-subtitle-1 font-weight-bold mt-5",variant:"text","prepend-icon":"mdi-mail"},{default:a(()=>[l("收件資訊")]),_:1}),e(n,{class:"my-2"})]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("收件人姓名：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.name),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("收件人電話：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.phone),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("運送方式：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.delivery),1)]),_:1}),e(t,{cols:"6",md:"2",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("收件地址：")]),_:1}),e(t,{cols:"6",md:"4"},{default:a(()=>[l(d(s.value.address),1)]),_:1}),e(t,{cols:"6",md:"4",class:"text-grey-darken-1 ps-5"},{default:a(()=>[l("訂單備註：")]),_:1}),e(t,{cols:"6",md:"8"},{default:a(()=>[l(d(s.value.note),1)]),_:1}),e(t,{cols:"12"},{default:a(()=>[e(c,{class:"text-primary text-subtitle-1 font-weight-bold mt-5",variant:"text","prepend-icon":"mdi-list-box"},{default:a(()=>[l("訂單商品")]),_:1}),e(n,{class:"my-2"})]),_:1}),e(t,null,{default:a(()=>[(m(!0),v(C,null,F(s.value.cart,r=>(m(),D(y,{key:r._id},{default:a(()=>[e(t,{cols:"6",lg:"3"},{default:a(()=>[e(q,{src:r.product.image,"aspect-ratio":"1"},null,8,["src"])]),_:2},1024),e(t,{cols:"6",lg:"9",class:"d-flex flex-column flex-lg-row"},{default:a(()=>[e(t,{lg:"4"},{default:a(()=>[u("div",null,[u("h3",null,d(r.product.name),1),u("p",j,"NT. "+d(r.product.price),1)]),e(c,{density:"comfortable",class:"mt-2",variant:"outlined",color:"primary"},{default:a(()=>[l(d(r.product.category),1)]),_:2},1024)]),_:2},1024),e(t,{lg:"4"},{default:a(()=>[u("p",null,"數量："+d(r.quantity),1)]),_:2},1024),e(t,{lg:"4"},{default:a(()=>[u("p",null,[l("小計：NT. "),u("b",null,d(r.product.price*r.quantity),1)])]),_:2},1024)]),_:2},1024),e(n,{class:"mx-3 my-3"})]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]))}};export{P as default};
