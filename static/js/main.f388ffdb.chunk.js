(this["webpackJsonpgame-bau-cua"]=this["webpackJsonpgame-bau-cua"]||[]).push([[0],[,,,,,function(e,t,n){e.exports={root:"styles_root__kr_2d",item:"styles_item__1j-O8",content:"styles_content__3Lgnn",matched:"styles_matched__1ICbi",pulse:"styles_pulse__Hi-_I","corner-section":"styles_corner-section__orbAR",reset:"styles_reset__A3Ld4","bet-value":"styles_bet-value__2pSyQ",betted:"styles_betted__3Bm6Q"}},function(e,t,n){e.exports={root:"styles_root__Bag0b",item:"styles_item__29bPs",content:"styles_content__1qV1g","play-button":"styles_play-button__2w0PU"}},,,function(e,t,n){e.exports={root:"styles_root__2RVCt"}},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(8),s=n.n(r),i=(n(14),n(9)),o=n.n(i),l=n(0),u=function(e){var t=e.onClick;return Object(l.jsx)("button",{title:"New game",className:o.a.root,onClick:t,children:Object(l.jsx)("img",{width:24,height:"auto",src:"/images/sync.svg",alt:"new-game-icon"})})},b=Object(c.memo)(u);b.displayName="NewGameButton";var d=b,j=n(3),O=n(4),f=(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_CRYPTO_KEY,Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_CRYPTO_SECRET,["deer","calabash","rooster","fish","crab","shrimp"]),m=f.reduce((function(e,t){return Object(O.a)(Object(O.a)({},e),{},Object(j.a)({},t,"/images/".concat(t,".svg")))}),{}),_=n(6),h=n.n(_),p=function(e){var t=e.items,n=e.disabled,c=e.onStart;return Object(l.jsxs)("div",{className:h.a.root,children:[t.map((function(e,t){return Object(l.jsx)("div",{className:h.a.item,children:Object(l.jsx)("div",{className:h.a.content,children:Object(l.jsx)("img",{width:64,height:"auto",src:m[e],alt:"rolled-".concat(e)})})},"".concat(e,"-").concat(t))})),Object(l.jsx)("button",{type:"button",className:h.a["play-button"],disabled:n,onClick:c,children:Object(l.jsx)("img",{width:64,height:"auto",src:"/images/dice.svg",alt:"play-icon"})})]})},v=Object(c.memo)(p);v.displayName="DicePlate";var g=v,S=n(2),y=function(e,t){return Math.floor(function(e,t){return Math.random()*(t-e)+e}(e,t))},x=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},C=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var c=t.map((function(e){return"string"===typeof e?e:Array.isArray(e)?e.flat():"object"===typeof e?Object.entries(e).map((function(e){var t=Object(S.a)(e,2),n=t[0];return t[1]?n:""})):""}));return c.flat().filter(Boolean).join(" ")},w=n(5),T=n.n(w),N=function(e){var t=e.betValues,n=e.rolledDices,a=e.needToShowResult,r=e.handleBet,s=e.handleResetBet,i=Object(c.useCallback)((function(e){return t[e]>0}),[t]);return Object(l.jsx)("div",{className:T.a.root,children:Object.entries(m).map((function(e){var c,o=Object(S.a)(e,2),u=o[0],b=o[1],d=i(u);return Object(l.jsx)("div",{className:T.a.item,onClick:r(u),children:Object(l.jsxs)("div",{className:C(T.a.content,(c={},Object(j.a)(c,T.a.matched,a&&n.includes(u)),Object(j.a)(c,T.a.betted,d),c)),children:[Object(l.jsx)("img",{width:108,height:"auto",src:b,alt:u}),d&&Object(l.jsxs)(l.Fragment,{children:[!a&&Object(l.jsx)("div",{className:T.a["corner-section"],children:Object(l.jsx)("span",{className:T.a.reset,onClick:s(u),children:"\u2715"})}),Object(l.jsx)("div",{className:T.a["bet-value"],children:Object(l.jsx)("span",{children:t[u]})})]})]})},u)}))})},R=Object(c.memo)(N);R.displayName="DiceGrid";var E=R,P=function(){return new Array(3).fill(void 0).map((function(){return y(0,f.length)})).map((function(e){return f[e]}))},B=function(){return f.reduce((function(e,t){return Object(O.a)(Object(O.a)({},e),{},Object(j.a)({},t,0))}),{})},A=function(){return y(20,100)},k=function(){var e=Object(c.useState)(P),t=Object(S.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(B),s=Object(S.a)(r,2),i=s[0],o=s[1],l=Object(c.useState)(!1),u=Object(S.a)(l,2),b=u[0],d=u[1],m=Object(c.useState)(!1),_=Object(S.a)(m,2),h=_[0],p=_[1],v=Object(c.useState)(),g=Object(S.a)(v,2),y=g[0],x=g[1],C=Object(c.useState)(),w=Object(S.a)(C,2),T=w[0],N=w[1],R=Object(c.useState)(A),E=Object(S.a)(R,2),k=E[0],D=E[1],F=Object(c.useCallback)((function(e){return function(){if(!b){var t=f.filter((function(e){return i[e]>0})),n=t.reduce((function(e,t){return e+i[t]}),0);h&&o(B),n<k?t.length<3||t.includes(e)?(p(!1),o((function(t){return Object(O.a)(Object(O.a)({},t),{},Object(j.a)({},e,t[e]+1))}))):alert("You can bet up to 3 items!"):alert("Please adjust your betted amount!")}}}),[k,i,h,b]),H=Object(c.useCallback)((function(e){return function(t){t.stopPropagation(),b||o((function(t){return Object(O.a)(Object(O.a)({},t),{},Object(j.a)({},e,0))}))}}),[b]),I=Object(c.useCallback)((function(e){return function(){window.clearInterval(e),d(!1),p(!0)}}),[]),L=Object(c.useCallback)((function(e){e.stopPropagation();var t=f.filter((function(e){return i[e]>0})),n=t.reduce((function(e,t){return e+i[t]}),0);if(t.length)if(n<=k){var c=window.setInterval((function(){a(P)}),100);p(!1),d(!0),x(c),N(window.setTimeout(I(c),3e3))}else alert("Please adjust your betted amount!");else alert("Please bet at least one item!")}),[k,i,I]),K=Object(c.useCallback)((function(){D(A),p(!1),o(B)}),[]);return Object(c.useEffect)((function(){return function(){y&&T&&b&&(I(y)(),window.clearTimeout(T))}}),[I,y,T,b]),Object(c.useEffect)((function(){if(!b&&h){var e=f.filter((function(e){return i[e]>0})).reduce((function(e,t){return n.includes(t)?e+n.filter((function(e){return e===t})).length*i[t]:e-i[t]}),0);D((function(t){return t+e}))}}),[b,i,n,h]),{names:n,rolling:b,needToShowResult:h,betState:i,amount:k,handleRoll:L,handleBet:F,handleResetBet:H,startNewSession:K}};n(16);var D=function(){var e=k(),t=e.amount,n=e.betState,c=e.names,a=e.needToShowResult,r=e.rolling,s=e.handleBet,i=e.handleResetBet,o=e.handleRoll,u=e.startNewSession;return Object(l.jsxs)("div",{"data-testid":"App",className:"App",children:[Object(l.jsx)("div",{className:"side-section left-side",children:"Happy new year 2021"}),Object(l.jsx)("div",{className:"side-section right-side",children:"Happy new year 2021"}),Object(l.jsxs)("div",{className:"amount-section",children:[Object(l.jsxs)("span",{children:["$",x(t)]}),Object(l.jsx)(d,{onClick:u})]}),Object(l.jsx)(g,{disabled:r,items:c,onStart:o}),Object(l.jsx)(E,{betValues:n,rolledDices:c,handleBet:s,handleResetBet:i,needToShowResult:a})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(D,{})}),document.getElementById("root")),F()}],[[17,1,2]]]);
//# sourceMappingURL=main.f388ffdb.chunk.js.map