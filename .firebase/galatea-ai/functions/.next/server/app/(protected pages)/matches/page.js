(()=>{var e={};e.id=786,e.ids=[786],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14985:e=>{"use strict";e.exports=require("dns")},16939:(e,t,s)=>{Promise.resolve().then(s.bind(s,33793))},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19771:e=>{"use strict";e.exports=require("process")},21820:e=>{"use strict";e.exports=require("os")},24612:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=s(65239),a=s(48088),o=s(88170),i=s.n(o),n=s(30893),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let d={children:["",{children:["(protected pages)",{children:["matches",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,33793)),"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\app\\(protected pages)\\matches\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,12140)),"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\app\\(protected pages)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,58014)),"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,46055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["C:\\Users\\darcy\\source\\repos\\Galatea-AI\\app\\(protected pages)\\matches\\page.tsx"],p={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/(protected pages)/matches/page",pathname:"/matches",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},25583:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var r=s(60687);s(43210);var a=s(16189),o=s(90096),i=s(24934),n=s(55192),l=s(30474),d=s(51402);function c(){let e=(0,a.useRouter)(),{user:t,loading:s}=(0,o.h)(),{matches:l,loading:c,fetchMatches:u}=(0,d.A0)();return s||c?(0,r.jsx)("div",{className:"h-full w-full flex items-center justify-center",children:(0,r.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"}),(0,r.jsx)("div",{className:"text-2xl text-earth-800",children:"Loading matches..."})]})}):(0,r.jsxs)("div",{className:"h-full w-full p-6 overflow-y-auto",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold text-earth-800 mb-6",children:"My Matches"}),0===l.length?(0,r.jsxs)(n.Zp,{className:"p-8 text-center",children:[(0,r.jsx)("div",{className:"text-5xl mb-4",children:"\uD83D\uDC94"}),(0,r.jsx)("h2",{className:"text-2xl font-bold text-earth-800 mb-2",children:"No Matches Yet"}),(0,r.jsx)("p",{className:"text-earth-600 mb-6",children:"Keep swiping to find your perfect match!"}),(0,r.jsx)(i.$,{className:"bg-rose-500 hover:bg-rose-600 text-white",onClick:()=>e.push("/swipe"),children:"Discover Matches"})]}):(0,r.jsx)("div",{className:"grid gap-4 md:grid-cols-2 lg:grid-cols-3",children:l.map(t=>(0,r.jsx)(p,{match:t,onOpenConversation:t=>{d.Ay.markAsRead(t),e.push(`/messages/${t}`)}},t.id))})]})}let p=({match:e,onOpenConversation:t})=>(0,r.jsxs)(n.Zp,{className:"overflow-hidden hover:shadow-lg transition-shadow",children:[(0,r.jsx)("div",{className:"relative h-48 bg-gray-100",children:(0,r.jsx)(l.default,{src:e.profile.images[0],alt:e.profile.name,fill:!0,style:{objectFit:"cover"}})}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[(0,r.jsxs)("h3",{className:"text-xl font-bold text-earth-800",children:[e.profile.name,", ",e.profile.age]}),e.lastMessage&&!e.lastMessage.read&&(0,r.jsx)("span",{className:"bg-rose-500 rounded-full w-3 h-3"})]}),e.profile.location&&(0,r.jsx)("p",{className:"text-sm text-earth-600 mb-2",children:e.profile.location}),e.lastMessage&&(0,r.jsxs)("div",{className:"border-t border-gray-100 pt-2 mt-2",children:[(0,r.jsx)("p",{className:"text-sm text-earth-700 font-medium truncate",children:e.lastMessage.text}),(0,r.jsx)("p",{className:"text-xs text-earth-500",children:e.lastMessage.timestamp})]}),(0,r.jsx)(i.$,{className:"w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white",onClick:()=>t(e.id),children:"Message"})]})]},e.id)},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33793:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\darcy\\\\source\\\\repos\\\\Galatea-AI\\\\app\\\\(protected pages)\\\\matches\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\darcy\\source\\repos\\Galatea-AI\\app\\(protected pages)\\matches\\page.tsx","default")},33873:e=>{"use strict";e.exports=require("path")},34631:e=>{"use strict";e.exports=require("tls")},55511:e=>{"use strict";e.exports=require("crypto")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},73496:e=>{"use strict";e.exports=require("http2")},74075:e=>{"use strict";e.exports=require("zlib")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},91645:e=>{"use strict";e.exports=require("net")},92963:(e,t,s)=>{Promise.resolve().then(s.bind(s,25583))},94735:e=>{"use strict";e.exports=require("events")}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[447,557,321,814,474,77],()=>s(24612));module.exports=r})();