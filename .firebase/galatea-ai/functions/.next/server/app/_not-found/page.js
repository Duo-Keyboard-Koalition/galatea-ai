(()=>{var e={};e.id=492,e.ids=[492],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14985:e=>{"use strict";e.exports=require("dns")},16150:(e,t,r)=>{"use strict";r.d(t,{AuthProvider:()=>o});var s=r(12907);(0,s.registerClientReference)(function(){throw Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\components\\AuthContext.tsx","useAuth");let o=(0,s.registerClientReference)(function(){throw Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\components\\AuthContext.tsx","AuthProvider");(0,s.registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\darcy\\\\source\\\\repos\\\\Galatea-AI\\\\components\\\\AuthContext.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\components\\AuthContext.tsx","default")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19771:e=>{"use strict";e.exports=require("process")},21638:(e,t,r)=>{Promise.resolve().then(r.bind(r,16150))},21820:e=>{"use strict";e.exports=require("os")},23119:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,86346,23)),Promise.resolve().then(r.t.bind(r,27924,23)),Promise.resolve().then(r.t.bind(r,35656,23)),Promise.resolve().then(r.t.bind(r,40099,23)),Promise.resolve().then(r.t.bind(r,38243,23)),Promise.resolve().then(r.t.bind(r,28827,23)),Promise.resolve().then(r.t.bind(r,62763,23)),Promise.resolve().then(r.t.bind(r,97173,23))},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34631:e=>{"use strict";e.exports=require("tls")},39790:(e,t,r)=>{Promise.resolve().then(r.bind(r,90096))},55511:e=>{"use strict";e.exports=require("crypto")},58014:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>a});var s=r(37413);r(82704);var o=r(61421),n=r.n(o),i=r(16150);let a={title:"Galatea.AI - Your Perfect AI partner",description:"Experience companionship and emotional support with personalized AI partner",icons:{icon:"/favicon.png"}};function u({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{className:n().className,children:(0,s.jsx)(i.AuthProvider,{children:(0,s.jsx)("main",{className:"min-h-screen",children:e})})})})}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},69975:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,16444,23)),Promise.resolve().then(r.t.bind(r,16042,23)),Promise.resolve().then(r.t.bind(r,88170,23)),Promise.resolve().then(r.t.bind(r,49477,23)),Promise.resolve().then(r.t.bind(r,29345,23)),Promise.resolve().then(r.t.bind(r,12089,23)),Promise.resolve().then(r.t.bind(r,46577,23)),Promise.resolve().then(r.t.bind(r,31307,23))},73496:e=>{"use strict";e.exports=require("http2")},74075:e=>{"use strict";e.exports=require("zlib")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},82704:()=>{},90096:(e,t,r)=>{"use strict";r.d(t,{AuthProvider:()=>d,h:()=>l});var s=r(60687),o=r(43210),n=r(48075),i=r(16189),a=r(91399);let u=(0,o.createContext)({user:null,loading:!0,error:null,isAuthenticated:!1,signOut:async()=>{}}),l=()=>(0,o.useContext)(u),d=({children:e})=>{let[t,r]=(0,o.useState)(null),[l,d]=(0,o.useState)(!0),[c,p]=(0,o.useState)(null),h=(0,i.useRouter)(),m=(0,n.xI)(a.Ay),v=async()=>{try{console.log("Signing out from AuthContext..."),await (0,n.CI)(m),r(null),h.push("/")}catch(e){console.error("Error signing out:",e),p(Error("Failed to sign out"))}};return(0,o.useEffect)(()=>{console.log("Setting up auth state listener");let e=(0,n.hg)(m,e=>{console.log("Auth state changed:",e?`Logged in as ${e.displayName||e.email}`:"Not logged in"),e?r(e):(console.log("No user detected, clearing user state"),r(null)),d(!1)},e=>{console.error("Auth state error:",e),p(e),d(!1)});return()=>e()},[m,h]),(0,s.jsx)(u.Provider,{value:{user:t,loading:l,error:c,isAuthenticated:!!t,signOut:v},children:e})}},91399:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>o});var s=r(67989);r(75535),r(70146),r(10178);let o=(0,s.Wp)({apiKey:"AIzaSyBlw_fzjEs-NbOabJkHEpGbfBdDEt7RVvI",authDomain:"galatea-ai.firebaseapp.com",projectId:"galatea-ai",storageBucket:"galatea-ai.firebasestorage.app",messagingSenderId:"727737899444",appId:"1:727737899444:web:16152c4885a96302af7ae1",measurementId:"G-6ZQT56XSCV"})},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96442:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>l});var s=r(65239),o=r(48088),n=r(88170),i=r.n(n),a=r(30893),u={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>a[e]);r.d(t,u);let l={children:["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,58014)),"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"]}]}.children,d=[],c={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[447,557],()=>r(96442));module.exports=s})();