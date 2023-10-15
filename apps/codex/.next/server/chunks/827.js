exports.id=827,exports.ids=[827],exports.modules={5853:(e,t,o)=>{"use strict";o.d(t,{Z:()=>r});let r={src:"/_next/static/media/logo.dba0c346.png",height:40,width:198,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAAQ0lEQVR4nGPsTvz3mZmFYVLhLIbGb18YJDm5GRgZGBj+Q/E/xgmZ/778/8cwoWAGQ+OPbwwq7JwMf4ESP4CYA4i/AgAMixYu2iidXwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:2}},7312:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{$:()=>Footer});var a=o(997),i=o(9851),n=o(3452),s=o(4115),l=e([s,i,n]);[s,i,n]=l.then?(await l)():l;let Footer=()=>a.jsx("footer",{children:(0,a.jsxs)(i.k,{w:"1200px",h:"30px",m:"0 auto",fontWeight:"400",justifyContent:"space-between",children:[a.jsx(n.x,{as:"p",fontWeight:"600",fontSize:"14px",children:"\xa9 2023 CodexField Labs"}),(0,a.jsxs)(c,{children:[a.jsx("a",{target:"_blank",href:"https://twitter.com/CodexField",children:"Twitter"}),a.jsx("a",{target:"_blank",href:"https://t.me/CodexField",children:"Telegram"}),a.jsx("a",{target:"_blank",href:"https://github.com/codexfield",children:"Github"}),a.jsx("a",{target:"_blank",href:"https://docs.codexfield.com",children:"Docs"})]})]})}),c=(0,s.default)(n.x)`
  a {
    margin-left: 40px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
`;r()}catch(e){r(e)}})},1339:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var a=o(997),i=o(3452),n=o(5700),s=o(9851),l=o(4115),c=o(5853),d=o(6689),h=o(8998),p=o(6741),x=o(8393),g=o.n(x),m=e([l,h,i,n,s]);[l,h,i,n,s]=m.then?(await m)():m;let __WEBPACK_DEFAULT_EXPORT__=()=>{let[e,t]=(0,d.useState)(!1),{address:o,isConnecting:r,isConnected:s}=(0,h.useAccount)(),{disconnect:l}=(0,h.useDisconnect)();(0,d.useCallback)(()=>{t(e=>!e)},[]),(0,d.useRef)(null);let{switchNetwork:x}=(0,h.useSwitchNetwork)(),{chain:m}=(0,h.useNetwork)(),E=(0,p.useRouter)();return(0,a.jsxs)(u,{justifyContent:"space-between",alignItems:"center",padding:"0px 24px 0",height:80,left:"0",right:"0",children:[a.jsx(f,{gap:42,alignItems:"center",children:a.jsx(i.x,{children:a.jsx("img",{height:"40",onClick:()=>{E.push("/")},src:c.Z.src,alt:"codex logo"})})}),a.jsx(b,{alignItems:"center",justifyContent:"center",gap:18,children:(0,a.jsxs)(a.Fragment,{children:[a.jsx(g(),{href:"/explore",children:a.jsx(n.x,{fontWeight:"900",fontSize:"16",mr:"45",children:"Explore"})}),a.jsx(g(),{href:"/dashboard",children:a.jsx(n.x,{fontWeight:"900",fontSize:"16",mr:"35",children:"Dashboard"})})]})})]})},u=(0,l.default)(s.k)`
  position: fixed;
  z-index: 100;
  font-size: 15px;
  background-color: rgba(0,0,0,0.25);
  /* border-bottom: 1px #2f3034 solid; */
`,f=(0,l.default)(s.k)`
  img {
    /* width: 268px; */
    height: 40px;
    cursor: pointer;
  }
`;l.default.div`
  position: relative;
`,l.default.div`
  position: absolute;
  top: calc(100% - 4px);
  right: 0;
  margin-top: 4px;
  border-radius: 12px;
  width: 300px;
  height: 330px;
  background: ${e=>e.theme.colors.bg?.middle};
  box-shadow: ${e=>e.theme.shadows.normal};
  z-index: 11;
`,l.default.div`
  padding: 12px;
  margin-top: 46px;
`,(0,l.default)(s.k)`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
`,l.default.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: ${e=>e.theme.colors.bg.bottom};
  }
`,(0,l.default)(s.k)`
  align-items: center;
  gap: 10px;
`,(0,l.default)(s.k)`
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border: 1px solid ${e=>e.theme.colors.readable.border};
`,(0,l.default)(s.k)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 62px;
  right: 50%;
  transform: translateX(50%);
  background: ${e=>e.theme.colors.bg.middle};
  width: 68px;
  height: 68px;
  border-radius: 50%;
`,l.default.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: ${e=>e.theme.colors.bg.bottom};
  }
`;let b=(0,l.default)(s.k)``;(0,l.default)(s.k)`
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 158px;
  height: 44px;
  font-family: Space Grotesk;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 200px;
  border: 1px solid ${e=>e.theme.colors.readable.border};
  &:hover {
    background: ${e=>e.theme.colors.read?.normal};
  }
`,r()}catch(e){r(e)}})},8852:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{A:()=>Layout});var a=o(997),i=o(4115),n=o(1339),s=o(9851),l=o(7312),c=o(968),d=o.n(c),h=e([i,n,l,s]);[i,n,l,s]=h.then?(await h)():h;let Layout=({children:e})=>(0,a.jsxs)(p,{flexDirection:"column",justifyContent:"space-between",children:[(0,a.jsxs)(d(),{children:[a.jsx("title",{children:"CodexField"}),a.jsx("meta",{property:"og:title",content:"CodeX"},"title"),a.jsx("link",{rel:"shortcut icon",href:"/favicon.png"}),a.jsx("link",{rel:"icon",color:"#000000",href:"/favicon.png"})]}),a.jsx(n.Z,{}),a.jsx(x,{children:e}),a.jsx(l.$,{})]}),p=(0,i.default)(s.k)`
  background-color: #000000;
  min-height: 100vh;
`,x=i.default.main`
  margin-top: 80px;
`;r()}catch(e){r(e)}})},4657:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{v:()=>p});var a=o(8998),i=o(7697),n=o(5350),s=o(8577),l=e([a,i,n,s]);[a,i,n,s]=l.then?(await l)():l;let{chains:c,publicClient:d,webSocketPublicClient:h}=(0,a.configureChains)([i.mainnet],[(0,s.publicProvider)()]),p=(0,a.createConfig)({autoConnect:!0,connectors:[new n.MetaMaskConnector({chains:c})],publicClient:d,webSocketPublicClient:h});r()}catch(e){r(e)}})},4827:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.r(t),o.d(t,{default:()=>App});var a=o(997),i=o(4657),n=o(8461);o(2722),o(4853);var s=o(8998),l=o(8852),c=o(1629),d=e([i,s,l,c,n]);function App({Component:e,pageProps:t}){return a.jsx(s.WagmiConfig,{config:i.v,children:a.jsx(n.f,{theme:c.r,children:a.jsx(l.A,{children:a.jsx(e,{...t})})})})}[i,s,l,c,n]=d.then?(await d)():d,r()}catch(e){r(e)}})},9938:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{_:()=>e});var a=o(7238);let e={colors:{readable:{normal:"#E6E8EA",secondary:"#76808F",disabled:"#5E6673",border:"#2E323A",white:"#FFFFFF",top:{secondary:"#929AA5"}},bg:{bottom:"#14151A",middle:"#1E2026",walletTab:"#F7F7F7",codebox:"#262D37",top:{normal:"#2B2F36",active:"#2E323A"}},scene:{primary:{normal:"#E1A325",active:"#f39d53",opacity:(0,a.m)("#B845FF",.1),semiOpacity:(0,a.m)("#E1A325",.15)},success:{normal:"#02C076",active:"#48FFB8",opacity:(0,a.m)("#2ED191",.1),progressBar:"#02C076"},danger:{normal:"#D9304E",active:"#FF898F",opacity:(0,a.m)("#FC6E75",.1)},warning:{normal:"#EB9E09",active:"#FFCE58",opacity:(0,a.m)("#F5B631",.1)}}},shadows:{normal:"0px 4px 24px rgba(0, 0, 0, 0.08)"}};r()}catch(e){r(e)}})},3936:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{O:()=>s});var a=o(9938),i=o(4206),n=e([a,i]);[a,i]=n.then?(await n)():n;let s={colors:{light:{...i.R.colors},dark:{...a._.colors}},shadows:{light:{...i.R.shadows},dark:{...a._.shadows}}};r()}catch(e){r(e)}})},4206:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{R:()=>e});var a=o(7238);let e={colors:{readable:{normal:"#1E2026",secondary:"#76808F",disabled:"#AEB4BC",border:"#E6E8EA",white:"#FFFFFF",top:{secondary:"#474D57"}},bg:{bottom:"#F5F5F5",walletTab:"#F7F7F7",middle:"#000000",codebox:"#F0FEFE",top:{normal:"#F5F5F5",active:"#E6E8EA"}},scene:{primary:{normal:"#F0B90B",active:"#58CED2",opacity:(0,a.m)("#58CED2",.1),semiOpacity:(0,a.m)("#58CED2",.15)},success:{normal:"#29CA0E",active:"#30EE11",opacity:(0,a.m)("#30EE11",.1)},danger:{normal:"#CA300E",active:"#EE3911",opacity:(0,a.m)("#EE3911",.1)},warning:{normal:"#CAA20E",active:"#EEBE11",opacity:(0,a.m)("#EEBE11",.1)},orange:{normal:"#EE7C11"}}},shadows:{normal:"0px 4px 24px rgba(0, 0, 0, 0.04)"}};r()}catch(e){r(e)}})},1629:(e,t,o)=>{"use strict";o.a(e,async(e,r)=>{try{o.d(t,{r:()=>n});var a=o(3936),i=e([a]);a=(i.then?(await i)():i)[0];let n={config:{useSystemColorMode:!1,initialColorMode:"dark",storageKey:"marketplace-color-mode"},...a.O,styles:{global:{body:{bg:"bg.bottom",color:"readable.normal",lineHeight:"normal",WebkitTapHighlightColor:"transparent"}}},fonts:{body:"Source Code Pro",heading:"Source Code Pro",mono:"Source Code Pro, monospace"},fontWeights:{hairline:100,thin:200,light:300,normal:400,medium:500,semibold:600,bold:700,extrabold:800,black:900}};r()}catch(e){r(e)}})},2722:()=>{}};