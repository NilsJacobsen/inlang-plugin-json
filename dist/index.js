var v=Object.create;var w=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,B=Object.prototype.hasOwnProperty;var L=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var _=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of C(t))!B.call(e,n)&&n!==r&&w(e,n,{get:()=>t[n],enumerable:!(s=T(t,n))||s.enumerable});return e};var J=(e,t,r)=>(r=e!=null?v(M(e)):{},_(t||!e||!e.__esModule?w(r,"default",{value:e,enumerable:!0}):r,e));var S=L((Z,O)=>{O.exports=m;m.flatten=m;m.unflatten=P;function x(e){return e&&e.constructor&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}function $(e){return e}function m(e,t){t=t||{};let r=t.delimiter||".",s=t.maxDepth,n=t.transformKey||$,o={};function c(u,p,y){y=y||1,Object.keys(u).forEach(function(a){let i=u[a],f=t.safe&&Array.isArray(i),l=Object.prototype.toString.call(i),g=x(i),h=l==="[object Object]"||l==="[object Array]",d=p?p+r+n(a):n(a);if(!f&&!g&&h&&Object.keys(i).length&&(!t.maxDepth||y<s))return c(i,d,y+1);o[d]=i})}return c(e),o}function P(e,t){t=t||{};let r=t.delimiter||".",s=t.overwrite||!1,n=t.transformKey||$,o={};if(x(e)||Object.prototype.toString.call(e)!=="[object Object]")return e;function u(a){let i=Number(a);return isNaN(i)||a.indexOf(".")!==-1||t.object?a:i}function p(a,i,f){return Object.keys(f).reduce(function(l,g){return l[a+r+g]=f[g],l},i)}function y(a){let i=Object.prototype.toString.call(a),f=i==="[object Array]",l=i==="[object Object]";if(a){if(f)return!a.length;if(l)return!Object.keys(a).length}else return!0}return e=Object.keys(e).reduce(function(a,i){let f=Object.prototype.toString.call(e[i]);return!(f==="[object Object]"||f==="[object Array]")||y(e[i])?(a[i]=e[i],a):p(i,a,m(e[i],t))},{}),Object.keys(e).forEach(function(a){let i=a.split(r).map(n),f=u(i.shift()),l=u(i[0]),g=o;for(;l!==void 0;){if(f==="__proto__")return;let h=Object.prototype.toString.call(g[f]),d=h==="[object Object]"||h==="[object Array]";if(!s&&!d&&typeof g[f]<"u")return;(s&&!d||!s&&g[f]==null)&&(g[f]=typeof l=="number"&&!t.object?[]:{}),g=g[f],i.length>0&&(f=u(i.shift()),l=u(i[0]))}g[f]=P(e[a],t)}),o}});function b(e){return t=>r=>e({settings:t,env:r})}var j=J(S(),1);var I=K;function K(e,t,r){var s,n;if(Array.isArray(t)&&(s=t.slice(0)),typeof t=="string"&&(s=t.split(".")),typeof t=="symbol"&&(s=[t]),!Array.isArray(s))throw new Error("props arg must be an array, a string or a symbol");if(n=s.pop(),!n)return!1;R(n);for(var o;o=s.shift();)if(R(o),typeof e[o]>"u"&&(e[o]={}),e=e[o],!e||typeof e!="object")return!1;return e[n]=r,!0}function R(e){if(e=="__proto__"||e=="constructor"||e=="prototype")throw new Error("setting of prototype values not supported")}var N=b(({settings:e,env:t})=>({id:"samuelstroschein.inlangPluginJson",async config(){return{languages:await F({$fs:t.$fs,settings:e}),readResources:async r=>W({...r,$fs:t.$fs,settings:e}),writeResources:async r=>k({...r,$fs:t.$fs,settings:e})}}}));async function F(e){let[t,r]=e.settings.pathPattern.split("{language}");if(r.startsWith("/")){let n=[],o=await e.$fs.readdir(t);for(let c of o)if(!c.toString().includes("."))for(let u of await e.$fs.readdir(`${t}${c}`))typeof u=="string"&&u.endsWith(".json")&&!n.some(p=>p===c.toString())&&n.push(c.toString());return n}else{let n=await e.$fs.readdir(t),o=[];for(let c of n)typeof c=="string"&&c.endsWith(".json")&&o.push(c.replace(".json",""));return o}}async function W(e){let t=[];for(let r of e.config.languages){let s=e.settings.pathPattern.replace("{language}",r);try{let n=JSON.parse(await e.$fs.readFile(s,{encoding:"utf-8"})),o=(0,j.default)(n);t.push(A(o,r))}catch{let n={};for(let o of await e.$fs.readdir(`${s.replace("/*.json","")}`)){let c={};c[o.toString().replace(".json","")]=JSON.parse(await e.$fs.readFile(`${s.replace("/*.json","")}/${o}`,{encoding:"utf-8"}));let u=(0,j.default)(c);n={...n,...u}}t.push(A(n,r))}}return t}async function k(e){for(let t of e.resources){let[,r]=e.settings.pathPattern.split("{language}"),s=r.startsWith("/"),n=e.settings.pathPattern.replace("{language}",t.languageTag.name);if(s){let o=D(t.body);for(let c of o.prefixes){let u={type:t.type,languageTag:t.languageTag,body:o.messages[c]};await e.$fs.writeFile(n.replace("*",c),E(u))}}else await e.$fs.writeFile(n,E(t))}}function D(e){let t=[...new Set(e.map(s=>s.id.name.split(".")[0]))],r={prefixes:t,messages:{}};return t.forEach(s=>{r.messages[s]=e.filter(n=>n.id.name.startsWith(s)),r.messages[s].forEach(n=>{n.id.name=n.id.name.replace(`${s}.`,"")})}),r}function A(e,t){return{type:"Resource",languageTag:{type:"LanguageTag",name:t},body:Object.entries(e).map(([r,s])=>z(r,s))}}function z(e,t){return{type:"Message",id:{type:"Identifier",name:e},pattern:{type:"Pattern",elements:[{type:"Text",value:t}]}}}function E(e){let t={};return e.body.forEach(r=>{let[s,n]=q(r);I(t,s,n)}),JSON.stringify(t,null,2)}function q(e){return[e.id.name,e.pattern.elements[0].value]}export{N as default};
/*! Bundled license information:

@inlang/core/dist/plugin/pluginBuildConfig.js:
  (*! DON'T TOP-LEVEL IMPORT ESBUILD PLUGINS. USE DYNAMIC IMPORTS. *)
  (*! See https://github.com/inlang/inlang/issues/486 *)
*/
