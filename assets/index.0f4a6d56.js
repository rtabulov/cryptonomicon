import{d as e,o as t,c as r,a as s,t as n,b as o,u as i,e as l,r as a,f as c,g as d,h as u,i as m,w as p,S as f,F as h,j as g,k as v,l as y,m as w}from"./vendor.e07ea72e.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const x={class:"fixed opacity-80 text-center bg-purple-800 inset-0 z-50 flex flex-col items-center justify-center text-white"},_=s("h1",{class:"text-2xl mx-16 mb-4"}," Coin list fetch failed. Try reloading this page. ",-1),b={class:"text-base block"};var k=e({props:{message:{type:String,required:!0}},setup:e=>(o,i)=>(t(),r("div",x,[_,s("pre",b,n(e.message),1)]))});const z={"aria-hidden":"true"},E=["xlink:href"];var L=e({props:{prefix:{type:String,default:"icon"},name:{type:String,required:!0}},setup(e){const n=e,l=o((()=>`#${n.prefix}-${n.name}`));return(e,n)=>(t(),r("svg",z,[s("use",{"xlink:href":i(l),fill:"currentColor"},null,8,E)]))}});const S={},C={class:"fixed bg-purple-800 bg-opacity-75 inset-0 z-50 flex items-center justify-center"};S.render=function(e,s){const n=L;return t(),r("div",C,[l(n,{class:"animate-spin -ml-1 mr-3 h-15 w-15 text-white",name:"loader"})])};const M={key:0},P={class:"bg-gray-100"},V={class:"container px-3 mx-auto flex flex-col items-center py-4"},j={class:"bg-gray-100"},B={class:"container px-3 mx-auto flex flex-col items-center py-4"};var A=e({setup(e){const n=a(null);return c((e=>(n.value=e,!0))),(e,o)=>{const i=k,a=d("router-view"),c=S;return t(),r(h,null,[n.value?(t(),r("div",M,[s("div",P,[s("div",V,[l(i,{message:n.value.toString()},null,8,["message"])])])])):u("",!0),(t(),m(f,null,{default:p((()=>[s("div",j,[s("div",B,[l(a)])])])),fallback:p((()=>[l(c)])),_:1}))],64)}}});const H={},O=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/cryptonomicon/${e}`)in H)return;H[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":"modulepreload",t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e())):e()};var T=g({history:v("/cryptonomicon/"),routes:[{path:"/",component:()=>O((()=>import("./TickersPage.6cb4652b.js")),["assets/TickersPage.6cb4652b.js","assets/api.49e242ff.js","assets/vendor.e07ea72e.js"])},{path:"/compare",component:()=>O((()=>import("./ExchangeComparePage.0eff1227.js")),["assets/ExchangeComparePage.0eff1227.js","assets/api.49e242ff.js","assets/vendor.e07ea72e.js"])}]});if("undefined"!=typeof window){let e=function(){let e=document.body,t=document.getElementById("__svg__icons__dom__1631521705811__");t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.style.position="absolute",t.style.width="0",t.style.height="0",t.id="__svg__icons__dom__1631521705811__"),t.innerHTML='<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" id="icon-add"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.76 511.76" id="icon-close"><path d="M436.896 74.869c-99.84-99.819-262.208-99.819-362.048 0-99.797 99.819-99.797 262.229 0 362.048 49.92 49.899 115.477 74.837 181.035 74.837s131.093-24.939 181.013-74.837c99.819-99.818 99.819-262.229 0-362.048zm-75.435 256.448c8.341 8.341 8.341 21.824 0 30.165a21.275 21.275 0 0 1-15.083 6.251 21.277 21.277 0 0 1-15.083-6.251l-75.413-75.435-75.392 75.413a21.348 21.348 0 0 1-15.083 6.251 21.277 21.277 0 0 1-15.083-6.251c-8.341-8.341-8.341-21.845 0-30.165l75.392-75.413-75.413-75.413c-8.341-8.341-8.341-21.845 0-30.165 8.32-8.341 21.824-8.341 30.165 0l75.413 75.413 75.413-75.413c8.341-8.341 21.824-8.341 30.165 0 8.341 8.32 8.341 21.824 0 30.165l-75.413 75.413 75.415 75.435z" fill="#718096" data-original="#000000" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#718096" aria-hidden="true" id="icon-delete"><path fill-rule="evenodd" d="M9 2a1 1 0 0 0-.894.553L7.382 4H4a1 1 0 0 0 0 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a1 1 0 1 0 0-2h-3.382l-.724-1.447A1 1 0 0 0 11 2H9zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zm5-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z" clip-rule="evenodd" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="icon-loader"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" stroke-width="4" /><path fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></symbol>',e.insertBefore(t,e.firstChild)};"interactive"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}y(A).use(w()).use(T).mount("#app");export{L as _};
