import{u as g,a as w,r as V,c as a,b as o,o as r,d as p,e,f as n,w as s,t as c,g as x,F as S,h as $,i as D}from"./index-317c077e.js";const F=e("h2",null,"Interested? Reach out now!",-1),E={__name:"CoachDetail",props:["id"],setup(_){const i=_,h=g(),m=w(),t=V(null);t.value=m.coaches.find(d=>d.id===i.id);const v=a(()=>`${t.value.firstName} ${t.value.lastName}`),B=a(()=>t.value.areas),f=a(()=>t.value.hourlyRate),C=a(()=>t.value.description),k=a(()=>h.resolve({name:"contact",params:{id:i.id}}).path);return(d,L)=>{const l=o("BaseCard"),y=o("BaseButton"),N=o("RouterView"),R=o("BaseBadge");return r(),p("div",null,[e("section",null,[n(l,null,{default:s(()=>[e("h2",null,c(v.value),1),e("h3",null,"$"+c(f.value)+"/hour",1)]),_:1})]),e("section",null,[n(l,null,{default:s(()=>[e("header",null,[F,n(y,{link:"",to:k.value},{default:s(()=>[x("Contact")]),_:1},8,["to"])]),n(N)]),_:1})]),e("section",null,[n(l,null,{default:s(()=>[(r(!0),p(S,null,$(B.value,u=>(r(),D(R,{key:u,type:u,title:u},null,8,["type","title"]))),128)),e("p",null,c(C.value),1)]),_:1})])])}}};export{E as default};
