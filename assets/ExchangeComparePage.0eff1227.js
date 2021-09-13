import{b as e,u as r,s as a,c as n,d as t,e as s}from"./api.49e242ff.js";import{o as l,c as o,d as c,A as i,r as u,b,e as d,u as p,F as f,a as m,y as v,h,i as y,t as g}from"./vendor.e07ea72e.js";import"./index.0f4a6d56.js";const k={},x={class:"text-xl mb-6"};k.render=function(e,r){return l(),o("h2",x,"Compare data")};const j={class:"container px-3"},D=m("hr",{class:"w-full border-t border-gray-400 my-8"},null,-1),C={class:"mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 items-center"},w=m("hr",{class:"w-full border-t border-gray-600 my-8"},null,-1),B={class:"w-full"},E=m("thead",null,[m("tr",null,[m("th",null,"Name"),m("th",null,"Coinbase"),m("th",null,"Binance"),m("th",null,"Difference"),m("th",null,"Difference %")])],-1),O={class:"border-b border-purple-700 p-2"},S={class:"text-center border-b border-purple-700 p-2"},T={class:"text-center border-b border-purple-700 p-2"},U={key:0,class:"text-center border-b border-purple-700 p-2"},A={key:1,class:"text-center border-b border-purple-700 p-2"};var F=c({async setup(c){let x,F;const N=e();[x,F]=i((()=>N.loadCryptoObject())),x=await x,F();const P=u(["coinbase","binance"]),q=u({BTC:{}});r(q,"tickers-object");const z=b((()=>Object.entries(q.value).map((([e,{aggregate:r,error:a,binance:n,coinbase:t}])=>({name:e,error:a,price:t||n||r})))));function G({market:e,name:r,price:a,error:n,message:t}){if(q.value[r]||(q.value[r]={}),n)return console.log({error:n,message:t}),void(q.value[r].error=t);delete q.value[r].error,q.value[r][e]=a}function H(e){q.value[e]={},P.value.forEach((r=>{a(e,G,"USD",r)}))}function I(e){delete q.value[e.name],P.value.forEach((r=>{t(e.name,G,"USD",r),t(e.name,G,"BTC",r)}))}function J(e){return e?e>1?e.toFixed(2):e.toPrecision(3):"-"}return Object.keys(q.value).forEach((e=>{P.value.forEach((r=>{a(e,G,"USD",r)}))})),(e,r)=>{const a=n,t=s,c=k;return l(),o("div",j,[d(a,{onAddTicker:H}),p(z).length?(l(),o(f,{key:0},[D,m("dl",C,[(l(!0),o(f,null,v(p(z),(e=>(l(),y(t,{key:e.name,ticker:e,error:Boolean(e.error),onDelete:I},null,8,["ticker","error"])))),128))]),w,d(c),m("table",B,[E,m("tbody",null,[(l(!0),o(f,null,v(q.value,((e,r)=>(l(),o("tr",{key:r},[m("td",O,g(r),1),m("td",S,g(J(e.coinbase)),1),m("td",T,g(J(e.binance)),1),e.coinbase&&e.binance?(l(),o("td",U,g(J(e.coinbase-e.binance)),1)):h("",!0),e.coinbase&&e.binance?(l(),o("td",A,g(J((e.coinbase-e.binance)/e.coinbase))+"% ",1)):h("",!0)])))),128))])])],64)):h("",!0)])}}});export{F as default};
