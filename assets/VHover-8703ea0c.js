import{p as u,ah as t,g as d,u as i,ai as p}from"./index-724c5dd8.js";const m=u({disabled:Boolean,modelValue:{type:Boolean,default:void 0},...t()},"VHover"),V=d()({name:"VHover",props:m(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const l=i(e,"modelValue"),{runOpenDelay:n,runCloseDelay:r}=p(e,o=>!e.disabled&&(l.value=o));return()=>{var o;return(o=a.default)==null?void 0:o.call(a,{isHovering:l.value,props:{onMouseenter:n,onMouseleave:r}})}}});export{V};
