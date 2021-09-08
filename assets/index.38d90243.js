import{d as e,o as t,c as r,a,t as n,b as s,u as l,e as o,r as i,f as c,g as u,h as d,w as m,i as p,F as v,j as f,k as g,l as y,m as h,n as b,p as x,q as w,s as k,v as C,x as S,y as E,z as O,A as T,B as _,C as N,S as B,D as M,E as A}from"./vendor.68a85ec5.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const L={class:"fixed opacity-80 text-center bg-purple-800 inset-0 z-50 flex flex-col items-center justify-center text-white"},P=a("h1",{class:"text-2xl mx-16 mb-4"}," Coin list fetch failed. Try reloading this page. ",-1),j={class:"text-base block"};var I=e({props:{message:{type:String,required:!0}},setup:e=>(s,l)=>(t(),r("div",L,[P,a("pre",j,n(e.message),1)]))});const $={"aria-hidden":"true"},z=["xlink:href"];var D=e({props:{prefix:{type:String,default:"icon"},name:{type:String,required:!0}},setup(e){const n=e,o=s((()=>`#${n.prefix}-${n.name}`));return(e,n)=>(t(),r("svg",$,[a("use",{"xlink:href":l(o),fill:"currentColor"},null,8,z)]))}});const G={},U={class:"fixed bg-purple-800 bg-opacity-75 inset-0 z-50 flex items-center justify-center"};G.render=function(e,a){const n=D;return t(),r("div",U,[o(n,{class:"animate-spin -ml-1 mr-3 h-15 w-15 text-white",name:"loader"})])};const V=["value"];var R=e({props:{modelValue:{type:String,required:!1}},emits:["update:modelValue"],setup(e,{emit:a}){const n=e=>{a("update:modelValue",e.target.value)};return(a,s)=>(t(),r("input",{class:"block relative shadow-md w-60 pr-10 p-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md",value:e.modelValue,onInput:n},null,40,V))}});const q={},F={type:"button",class:"inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"};q.render=function(e,a){return t(),r("button",F,[i(e.$slots,"default")])};const W=c("global",{state:()=>({cryptoObject:{},BTCvalue:0}),actions:{async loadCryptoObject(){const e=await u.get("https://min-api.cryptocompare.com/data/all/coinlist?summary=true",{timeout:5e3});return this.cryptoObject=e.data.Data,this.cryptoObject}}}),H={class:"flex"},J={class:"max-w-xs"},Y=a("label",{for:"wallet",class:"block text-sm font-medium text-gray-700"},"Тикер",-1),K={class:"mt-1 relative rounded-md shadow-md"},X={key:0,class:"flex bg-white shadow-md p-1 rounded-md flex-wrap"},Q=["onClick"],Z={key:1,class:"text-sm text-red-600"},ee=h(" Добавить ");var te=e({props:{checkTicker:{type:Function,default:()=>!0}},emits:["addTicker"],setup(e,{emit:i}){const c=e,{cryptoObject:u}=W(),h=d("");m(h,(e=>{h.value=e.toUpperCase()}));const b=s((()=>{return e=h.value,Object.keys(u).filter((t=>t.includes(e)||u[t].FullName.toUpperCase().includes(e))).slice(0,4);var e})),x=s((()=>c.checkTicker&&c.checkTicker(h.value)));function w(){0!==h.value.length&&(i("addTicker",h.value),h.value="")}return(e,s)=>{const i=R,c=D,u=q;return t(),r("section",null,[a("div",H,[a("div",J,[Y,a("div",K,[o(i,{id:"wallet",modelValue:h.value,"onUpdate:modelValue":s[0]||(s[0]=e=>h.value=e),type:"text",name:"wallet",placeholder:"Например DOGE",onKeydown:p(w,["enter"])},null,8,["modelValue","onKeydown"])]),h.value.length>0&&l(b)?(t(),r("div",X,[(t(!0),r(v,null,f(l(b),(e=>(t(),r("span",{key:e,class:"inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer",onClick:t=>function(e){h.value=e,w()}(e)},n(e),9,Q)))),128))])):g("",!0),l(x)?(t(),r("div",Z," Такой тикер уже добавлен ")):g("",!0)])]),o(u,{class:"mt-4",onClick:w},{default:y((()=>[o(c,{class:"-ml-0.5 mr-2 h-6 w-6",name:"add"}),ee])),_:1})])}}});const re=a("label",null,"Поиск",-1);var ae=e({emits:["change"],setup(e,{emit:a}){const n=d("");return m(n,(e=>{n.value=e.toUpperCase(),a("change",n.value)})),(e,a)=>{const s=R;return t(),r(v,null,[re,o(s,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=e=>n.value=e),type:"text",class:"mt-2",placeholder:"например DOGE"},null,8,["modelValue"])],64)}}});const ne={class:"space-x-4 my-4"},se=h(" Назад "),le=h(" Вперед ");var oe=e({props:{showPrev:{type:Boolean,required:!0},showNext:{type:Boolean,required:!0}},emits:["prev","next"],setup:(e,{emit:a})=>(n,s)=>{const l=q;return t(),r("div",ne,[e.showPrev?(t(),b(l,{key:0,onClick:s[0]||(s[0]=e=>a("prev"))},{default:y((()=>[se])),_:1})):g("",!0),e.showNext?(t(),b(l,{key:1,onClick:s[1]||(s[1]=e=>n.$emit("next"))},{default:y((()=>[le])),_:1})):g("",!0)])}});const ie={class:"px-4 py-5 sm:p-6 text-center"},ce={class:"text-sm font-medium text-gray-500 truncate"},ue={class:"mt-1 text-3xl font-semibold text-gray-900"},de=a("div",{class:"w-full border-t border-gray-200"},null,-1),me=h(" Удалить ");var pe=e({props:{selected:{type:Boolean,required:!1,default:!1},error:{type:Boolean,required:!1,default:!1},ticker:{type:null,required:!0}},emits:["delete"],setup(e){const i=e,c=s((()=>0===i.ticker.price?"-":i.ticker.price<1?i.ticker.price.toPrecision(3):i.ticker.price.toFixed(2)));return(s,i)=>{const u=D;return t(),r("div",{class:w(["bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-shadow ring-purple-800",{"ring-4":e.selected,"bg-red-100":e.error}])},[a("div",ie,[a("dt",ce,n(e.ticker.name)+" - USD ",1),a("dd",ue,n(l(c)),1)]),de,a("button",{class:"w-full flex items-center justify-center font-medium bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-50 transition-all focus:outline-none",onClick:i[0]||(i[0]=x((t=>s.$emit("delete",e.ticker)),["stop"]))},[o(u,{class:"h-5 w-5",name:"delete"}),me])],2)}}});const ve={class:"relative"},fe={class:"text-lg leading-6 font-medium text-gray-900 my-8"};var ge=e({props:{graph:{type:Array,default:()=>[]},graphbarWidth:{type:Number,default:35},heading:{type:String,default:"Graph"}},emits:["close"],setup(e,{emit:i}){const c=e,u=d(null),{normalizedGraph:p}=function(e,t,r=35){const a=d(256);k(e)&&m(e,(t=>{t.length>256&&(e.value=t.slice(-256))}),{deep:!0});const n=s((()=>l(e).slice(-l(a)))),o=s((()=>Math.max(...n.value))),i=s((()=>Math.min(...n.value))),c=s((()=>i.value===o.value?new Array(n.value.length).fill(50):n.value.map((e=>function(e,t,r){return 5+95*(e-t)/(r-t)}(e,i.value,o.value))))),u=C.exports.throttle((()=>{t.value&&k(a)&&(a.value=Math.ceil(t.value.clientWidth/l(r)))}),300);return S((()=>{u(),window.addEventListener("resize",u)})),E((()=>{window.removeEventListener("resize",u)})),{items:e,slicedItems:n,normalizedGraph:c}}(O(c,"graph"),u,c.graphbarWidth);return(s,c)=>{const d=D;return t(),r("section",ve,[a("h3",fe,n(e.heading),1),a("button",{type:"button",class:"absolute top-0 right-0",onClick:c[0]||(c[0]=e=>i("close"))},[o(d,{name:"close",class:"w-7 h-7"})]),a("div",{ref:(e,t)=>{t.graphElement=e,u.value=e},class:"flex items-end border-gray-600 border-b border-l h-64"},[(t(!0),r(v,null,f(l(p),((a,n)=>(t(),r("div",{key:n,style:T({height:`${a}%`,width:`${e.graphbarWidth}px`}),class:"bg-purple-800 border"},null,4)))),128))],512)])}}});function ye(e){const t=localStorage.getItem(l(e));return t?JSON.parse(t):null}const he=[{name:"BTC",price:0},{name:"ETH",price:0},{name:"DOGE",price:0},{name:"XPR",price:0},{name:"ADA",price:0},{name:"USDT",price:0},{name:"LINK",price:0},{name:"UNI",price:0},{name:"DOT",price:0}];function be(){const e=d(he);!function(e,t){const r=ye(t);r&&(e.value=r),m(d(t),(()=>{const r=ye(t);r&&(e.value=r)})),m(e,(e=>{localStorage.setItem(l(t),JSON.stringify(e))}),{deep:!0})}(e,"cryptonomicon-list");const{filter:t,filteredItems:r}=function(e,t,r){const a=d(t);return{filteredItems:s((()=>l(e).filter(r))),filter:a}}(e,"",(e=>e.name.includes(t.value.toUpperCase()))),{page:a,paginatedItems:n,hasNextPage:o}=function(e,t,r=0){const a=d(r),n=s((()=>(a.value-r)*l(t))),o=s((()=>n.value+l(t))),i=s((()=>l(e).length>o.value)),c=s((()=>!i.value)),u=s((()=>a.value!==r)),p=s((()=>Math.ceil(l(e).length/l(t)))),v=s((()=>p.value-1)),f=s((()=>l(e).slice(n.value,o.value)));return m(f,(e=>{0==e.length&&a.value>r&&(a.value=v.value)})),{paginatedItems:f,page:a,startIndex:n,endIndex:o,isLastPage:c,isFirstPage:u,hasNextPage:i}}(r,6,1);function i(t){return e.value.find((e=>e.name===t))}return m(t,(()=>{a.value=1})),{tickers:e,filteredTickers:r,filter:t,page:a,hasNextPage:o,tickerExists:function(e){return Boolean(i(e))},paginatedTickers:n,getTicker:i}}let xe;const we=new Map,ke=new WebSocket("wss://streamer.cryptocompare.com/v2?api_key=95bdf7e8c4ef1827e5f4b13d319b2ac9b409aa62feedc30f0f6553924d6ab246"),Ce="subscribe",Se="unsubscribe",Ee="update",Oe=new SharedWorker("/worker.js");function Te(e,t,r="USD"){const a=we.get(e)||[];we.set(e,[...a,t]),Ne({action:"SubAdd",subs:[`5~CCCAGG~${e}~${r}`]}),Oe.port.postMessage({type:"subscribe",fsym:e,tsym:r})}function _e(e,t){if(!t&&"BTC"!==e)return Ne({action:"SubRemove",subs:[`5~CCCAGG~${e}~USD`]}),Ne({action:"SubRemove",subs:[`5~CCCAGG~${e}~BTC`]}),we.delete(e),Oe.port.postMessage({type:"unsubscribe",fsym:e,tsym:"USD"}),void Oe.port.postMessage({type:"unsubscribe",fsym:e,tsym:"BTC"});const r=we.get(e)||[];we.set(e,r.filter((e=>e!==t)))}function Ne(e){const t=ke.send.bind(ke,JSON.stringify(e));ke.readyState!==WebSocket.OPEN?ke.addEventListener("open",t):t()}Oe.port.start(),ke.addEventListener("message",(e=>{const t=JSON.parse(e.data);"20"!==t.TYPE?"429"===t.TYPE&&Oe.port.addEventListener("message",(({data:{data:e,type:r}})=>{if(r===Ee){const{fsym:r,price:a,tsym:n}=e;(we.get(r)||[]).forEach((e=>e({name:r,price:a,tsym:n,error:!1,message:t})))}})):Oe.port.addEventListener("message",(({data:{type:e,fsym:t,tsym:r}})=>{e!==Ce?e===Se&&Ne({action:"SubRemove",subs:[`5~CCCAGG~${t}~${r}`]}):Ne({action:"SubAdd",subs:[`5~CCCAGG~${t}~${r}`]})}))})),ke.addEventListener("message",(e=>{const t=JSON.parse(e.data),{TYPE:r,MESSAGE:a,INFO:n}=t;if("500"===r&&"INVALID_SUB"===a){const e=t.PARAMETER.split("~")[2],r=function(e){return e.split("~")[3]}(t.PARAMETER);if("USD"===r){const t=we.get(e)||[];return we.delete(e),void t.forEach((t=>Te(e,(({name:e,error:a,price:n,message:s})=>{t({name:e,error:a,price:xe*n,message:s,tsym:r})}),"BTC")))}const a=we.get(e);return a?void a.forEach((t=>t({name:e,error:!0,message:n,tsym:r,price:NaN}))):void _e(e)}if("5"===r){const{FROMSYMBOL:e,PRICE:r,TOSYMBOL:a}=t;if(r){Oe.port.postMessage({type:"update",data:{fsym:e,price:r,tsym:a}});(we.get(e)||[]).forEach((n=>n({name:e,price:r,tsym:a,error:!1,message:t})))}}})),Te("BTC",(({price:e})=>xe=e));const Be={class:"container px-3"},Me=a("hr",{class:"w-full border-t border-gray-400 my-8"},null,-1),Ae=a("hr",{class:"w-full border-t border-gray-400 my-8"},null,-1),Le={class:"mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 items-center"},Pe=a("hr",{class:"w-full border-t border-gray-600 my-4"},null,-1);var je=e({async setup(e){let n,s;const i=W();[n,s]=_((()=>i.loadCryptoObject())),n=await n,s();const{cryptoObject:c}=i,{tickers:u,filter:p,paginatedTickers:y,page:h,hasNextPage:x,tickerExists:w,getTicker:k}=be(),C=d(null),S=d({});var E;m(S,(e=>{Object.keys(e).forEach((e=>{const{length:t}=S.value[e];t>128&&S.value[e].splice(0,t-128)}))}),{deep:!0}),E={filter:p,page:h},Object.entries(E).forEach((([e,t])=>{m(t,(t=>{const r=new URLSearchParams(window.location.search);r.set(l(e),t.toString()),window.history.pushState(null,window.document.title,`${window.location.pathname}?${r.toString()}`)}),{immediate:!0})}));let{filter:O,page:T}=Object.fromEntries(new URLSearchParams(window.location.search).entries());function N({name:e,price:t,error:r,message:a}){const n=k(e);if(n){if(r)return console.log({error:r,message:a}),void(n.error=a);n.price=t,S.value[n.name]||(S.value[n.name]=[]),S.value[n.name].push(t)}}function B(e){if(!function(e){return Object.keys(c).includes(e)}(e)||k(e))return;const t={name:e,price:0};u.value=[...u.value,t],p.value="",Te(t.name,N)}function M(e){var t;u.value=u.value.filter((t=>t.name!==e.name)),e.name===(null==(t=C.value)?void 0:t.name)&&(C.value=null),S.value[e.name]&&delete S.value[e.name],_e(e.name,N)}function A(e){C.value=e}function L(e){return p.value=e}return T&&(h.value=+T),O&&(p.value=O),u.value.forEach((e=>{Te(e.name,N)})),u.value.length>0&&A(u.value[0]),(e,n)=>{const s=te,i=ae,c=oe,d=pe,m=ge;return t(),r("div",Be,[o(s,{"check-ticker":l(w),onAddTicker:B},null,8,["check-ticker"]),l(u).length?(t(),r(v,{key:0},[Me,o(i,{onChange:L}),o(c,{class:"space-x-4 my-4","show-prev":l(h)>1,"show-next":l(x),onPrev:n[0]||(n[0]=e=>h.value-=1),onNext:n[1]||(n[1]=e=>h.value+=1)},null,8,["show-prev","show-next"]),Ae,a("dl",Le,[(t(!0),r(v,null,f(l(y),(e=>{var r;return t(),b(d,{key:e.name,ticker:e,selected:(null==(r=C.value)?void 0:r.name)===e.name,error:Boolean(e.error),onClick:t=>A(e),onDelete:M},null,8,["ticker","selected","error","onClick"])})),128))]),Pe],64)):g("",!0),C.value?(t(),b(m,{key:1,graph:S.value[C.value.name],heading:`${C.value.name} - USD`,onCloseClick:n[2]||(n[2]=e=>C.value=null)},null,8,["graph","heading"])):g("",!0)])}}});const Ie={key:0},$e={class:"bg-gray-100"},ze={class:"container px-3 mx-auto flex flex-col items-center py-4"},De={class:"bg-gray-100"},Ge={class:"container px-3 mx-auto flex flex-col items-center py-4"};var Ue=e({setup(e){const n=d(null);return N((e=>(n.value=e,!0))),(e,s)=>{const l=I,i=G;return t(),r(v,null,[n.value?(t(),r("div",Ie,[a("div",$e,[a("div",ze,[o(l,{message:n.value.toString()},null,8,["message"])])])])):g("",!0),(t(),b(B,null,{default:y((()=>[a("div",De,[a("div",Ge,[o(je)])])])),fallback:y((()=>[o(i)])),_:1}))],64)}}});if("undefined"!=typeof window){let e=function(){let e=document.body,t=document.getElementById("__svg__icons__dom__1631092880243__");t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.style.position="absolute",t.style.width="0",t.style.height="0",t.id="__svg__icons__dom__1631092880243__"),t.innerHTML='<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" id="icon-add"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.76 511.76" id="icon-close"><path d="M436.896 74.869c-99.84-99.819-262.208-99.819-362.048 0-99.797 99.819-99.797 262.229 0 362.048 49.92 49.899 115.477 74.837 181.035 74.837s131.093-24.939 181.013-74.837c99.819-99.818 99.819-262.229 0-362.048zm-75.435 256.448c8.341 8.341 8.341 21.824 0 30.165a21.275 21.275 0 0 1-15.083 6.251 21.277 21.277 0 0 1-15.083-6.251l-75.413-75.435-75.392 75.413a21.348 21.348 0 0 1-15.083 6.251 21.277 21.277 0 0 1-15.083-6.251c-8.341-8.341-8.341-21.845 0-30.165l75.392-75.413-75.413-75.413c-8.341-8.341-8.341-21.845 0-30.165 8.32-8.341 21.824-8.341 30.165 0l75.413 75.413 75.413-75.413c8.341-8.341 21.824-8.341 30.165 0 8.341 8.32 8.341 21.824 0 30.165l-75.413 75.413 75.415 75.435z" fill="#718096" data-original="#000000" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#718096" aria-hidden="true" id="icon-delete"><path fill-rule="evenodd" d="M9 2a1 1 0 0 0-.894.553L7.382 4H4a1 1 0 0 0 0 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a1 1 0 1 0 0-2h-3.382l-.724-1.447A1 1 0 0 0 11 2H9zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zm5-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z" clip-rule="evenodd" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="icon-loader"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" stroke-width="4" /><path fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></symbol>',e.insertBefore(t,e.firstChild)};"interactive"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}M(Ue).use(A()).mount("#app");
