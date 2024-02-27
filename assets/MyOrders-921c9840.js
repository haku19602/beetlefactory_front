import{_ as w,X as A,x as i,A as C,a0 as S,a1 as B,a2 as I,c as o,a4 as t,ad as L,aa as n,ac as d,aq as y,J as M,a9 as v,ae as N,af as O}from"./index-46534e73.js";import{V as T}from"./VContainer-1f50b779.js";import{V as q}from"./VRow-7f699dc8.js";import{V as f}from"./VCol-38d4cc39.js";import{V as D,a as P}from"./VDataTable-0a90d6d9.js";import{V as h}from"./VChip-f1f9398b.js";import"./VSelect-6646c273.js";import"./VList-3fd21111.js";import"./VDivider-c0c2ae3b.js";const R=c=>(N("data-v-74f1f0b2"),c=c(),O(),c),U={style:{height:"100%"},class:"bg-back"},z=R(()=>v("h2",{class:"text-center mt-5 text-primary"},"我的訂單",-1)),E={class:"text-center pt-2"},J={__name:"MyOrders",setup(c){const{apiAuth:b}=L(),g=A(),u=i([]),V=i([{key:"createdAt",order:"desc"}]),l=i(1),k=[{title:"訂單編號",sortable:!1,key:"_id"},{title:"訂購日期",sortable:!0,key:"createdAt"},{title:"訂單金額",sortable:!0,key:"price",align:"center",value:r=>{const a=r.cart.reduce((s,e)=>s+e.quantity*e.product.price,0);return r.delivery==="黑貓"?a+110:r.delivery==="7-11 交貨便"?a+70:a}},{title:"付款狀態",sortable:!0,key:"paid",align:"center"},{title:"出貨狀態",sortable:!0,key:"shipped",align:"center"},{title:"完成訂單",sortable:!0,key:"done",align:"center"}],p=i(!0),m=i(0);return C(async()=>{var r,a;p.value=!0;try{const{data:s}=await b.get("/orders");m.value=s.result.length;const e=s.result.slice((l.value-1)*5,l.value*5);u.value.push(...e)}catch(s){const e=((a=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:a.message)||"發生錯誤，請稍後再試";g({text:e,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"secondary",location:"bottom"}})}p.value=!1}),(r,a)=>{const s=S("RouterLink");return B(),I("div",U,[o(T,null,{default:t(()=>[o(q,null,{default:t(()=>[o(f,null,{default:t(()=>[z]),_:1}),o(f,{cols:"12"},{default:t(()=>[o(D,{items:u.value,headers:k,"items-per-page":5,"sort-by":V.value,page:l.value,"onUpdate:page":[a[1]||(a[1]=e=>l.value=e),r.tableLoadItems],"items-length":m.value,loading:p.value,class:"bg-back"},{"item._id":t(({item:e})=>[o(s,{to:"/orders/"+e._id,class:"text-primary"},{default:t(()=>[n(d(e._id),1)]),_:2},1032,["to"])]),"item.createdAt":t(({item:e})=>[n(d(new Date(e.createdAt).toLocaleString("zh-TW",{hour12:!1,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})),1)]),"item.price":t(({item:e})=>[n(" NT. "+d(e.cart.reduce((x,_)=>x+_.quantity*_.product.price,0)+(e.delivery==="黑貓"?110:e.delivery==="7-11 交貨便"?70:0)),1)]),"item.paid":t(({item:e})=>[o(h,{"append-icon":e.paid?"mdi-check":"mdi-close",variant:"text",class:y(e.paid?["text-primary"]:["text-secondary"])},{default:t(()=>[n(d(e.paid?"已付款":"未付款"),1)]),_:2},1032,["append-icon","class"])]),"item.shipped":t(({item:e})=>[o(h,{"append-icon":e.shipped?"mdi-check":"mdi-close",variant:"text",class:y(e.shipped?["text-primary"]:["text-secondary"])},{default:t(()=>[n(d(e.shipped?"已出貨":"未出貨"),1)]),_:2},1032,["append-icon","class"])]),"item.done":t(({item:e})=>[o(M,{color:"primary",variant:"flat",rounded:"",disabled:e.done||!e.paid},{default:t(()=>[n(d(e.done?"訂單已完成":"完成訂單"),1)]),_:2},1032,["disabled"])]),bottom:t(()=>[v("div",E,[o(P,{modelValue:l.value,"onUpdate:modelValue":a[0]||(a[0]=e=>l.value=e),length:2},null,8,["modelValue"])])]),_:2},1032,["items","sort-by","page","items-length","loading","onUpdate:page"])]),_:1})]),_:1})]),_:1})])}}},Z=w(J,[["__scopeId","data-v-74f1f0b2"]]);export{Z as default};
