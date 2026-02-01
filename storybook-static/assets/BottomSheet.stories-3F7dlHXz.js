import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as n}from"./index-BWu4c2F4.js";import{r as an}from"./index-B8jaNLVP.js";import{u as rn}from"./useBodyScrollLock-CuVZG8Bd.js";const on={smooth:200},S={sm:8,md:16,lg:24},He={xl2:24},_={surface:{card:"#FFFFFF"},text:{primary:"#1A1A2E"},border:{subtle:"#E5E5E5"},neutral:{gray300:"#D1D5DB"}},C=on.smooth,ln=80,Le=32,cn=.25;function z(a,s,o){return Math.min(Math.max(a,s),o)}function Y(a,s){return s.length===0?a:s.reduce((o,m)=>Math.abs(m-a)<Math.abs(o-a)?m:o)}function dn(a,s,o){if(o.length===0)return a;const m=[...o].sort((i,p)=>i-p);if(s<0){for(let i=m.length-1;i>=0;i--)if(m[i]<a-5)return m[i];return m[0]}for(let i=0;i<m.length;i++)if(m[i]>a+5)return m[i];return m[m.length-1]}function mn({open:a,onDismiss:s,onClose:o,children:m,snapPoints:i,defaultSnap:p,header:g,footer:L,title:w,sibling:Ft,blocking:P=!0,scrollLocking:qt=!0,expandOnContentDrag:Ne=!1,skipInitialTransition:ve=!1,maxHeight:_t,initialFocusRef:B,className:zt,style:Yt,onSpringStart:x,onSpringEnd:f,onSpringCancel:pn,testId:Ut,testID:Vt,sheetRef:Zt}){const pe=Ut??Vt,[j,Se]=n.useState(!1),[Gt,Kt]=n.useState(typeof window<"u"?window.innerHeight:800),[Xt,je]=n.useState(0),[Jt,we]=n.useState(0),[un,k]=n.useState(!1),[Te,ue]=n.useState(null),N=n.useRef(0),he=n.useRef(null),T=n.useRef(!1),ge=n.useRef(0),xe=n.useRef(0),Ce=n.useRef(0),be=n.useRef(!1),D=n.useRef(null),Qt=n.useRef(null),ke=n.useRef(null),v=n.useRef(null),b=_t??Gt*.9,l=n.useMemo(()=>{const t={headerHeight:0,footerHeight:0,height:N.current||b*.85,minHeight:200,maxHeight:b};if(!i)return[b*.4,b*.85];if(typeof i=="function"){const r=i(t);return(Array.isArray(r)?r:[r]).map(d=>z(d,100,b)).sort((d,u)=>d-u)}return i.map(r=>z(r,100,b)).sort((r,c)=>r-c)},[i,b]),De=n.useMemo(()=>{if(l.length===0)return b*.85;const t={headerHeight:0,footerHeight:0,height:l[l.length-1],minHeight:l[0],maxHeight:l[l.length-1],snapPoints:l,lastSnap:he.current};return typeof p=="function"?Y(p(t),l):typeof p=="number"?Y(p,l):l[l.length-1]},[p,l,b]),Oe=n.useCallback(()=>{(s==null?void 0:s())??(o==null||o())},[s,o]),A=n.useCallback(t=>{N.current=t,D.current&&(D.current.style.transition="none"),ue(null),je(t)},[]),E=n.useCallback((t,r=C)=>{N.current=t,ue(r),je(t),requestAnimationFrame(()=>{D.current&&(D.current.style.transition=`height ${r}ms cubic-bezier(0.4, 0.0, 0.2, 1)`)})},[]),fe=n.useCallback(t=>{we(t)},[]),M=n.useCallback((t,r=C)=>{we(t)},[]),W=n.useCallback((t,r="custom")=>{const c=z(t,l[0]??100,l[l.length-1]??b);he.current=N.current,N.current=c,x==null||x({type:"SNAP",source:r}),k(!0);const d=Math.max(200,Math.abs(c-N.current)*.5);E(c,d),v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{k(!1),f==null||f({type:"SNAP",source:r})},d)},[l,b,x,f,E]),Re=n.useCallback(()=>{const t=De;if(N.current=t,ve){A(t),fe(1),f==null||f({type:"OPEN"});return}x==null||x({type:"OPEN"}),A(0),fe(0),requestAnimationFrame(()=>{k(!0);const r=Math.max(300,t*.3);E(t,r),M(1,C),v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{k(!1),f==null||f({type:"OPEN"}),P&&B!==!1&&(B!=null&&B.current)&&B.current.focus()},Math.max(r,C))})},[De,ve,x,f,P,B,A,fe,E,M]),O=n.useCallback((t="custom")=>{x==null||x({type:"CLOSE",source:t}),k(!0),E(0,C),M(0,C),v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{k(!1),f==null||f({type:"CLOSE",source:t}),Se(!1),Oe()},C)},[x,f,Oe,E,M]);n.useImperativeHandle(Zt,()=>({snapTo:(t,r)=>{const c={headerHeight:0,footerHeight:0,height:N.current,minHeight:l[0]??100,maxHeight:l[l.length-1]??b,snapPoints:l,lastSnap:he.current},d=typeof t=="function"?t(c):t;W(Y(d,l),"custom")},get height(){return N.current}}),[l,b,W]);const I=n.useCallback(t=>{T.current=!0,ge.current=t,xe.current=N.current,Ce.current=Date.now(),k(!1),D.current&&(D.current.style.transition="none"),ue(null)},[]),$=n.useCallback(t=>{if(!T.current)return;const r=ge.current-t,c=z(xe.current+r,50,b+50);A(c)},[b,A]),F=n.useCallback(t=>{if(!T.current)return;T.current=!1;const r=ge.current-t,c=Date.now()-Ce.current,d=c>0?r/c:0,u=N.current,R=l[0]??100;if(xe.current-u>ln&&u<R+50||d<-.4&&u<R+100){O("dragging");return}let ye;Math.abs(d)>cn?ye=dn(u,d,l):ye=Y(u,l),W(ye,"dragging")},[l,O,W]);n.useEffect(()=>{if(!j)return;const t=d=>{const u=d.touches[0];if(!u)return;const R=d.target;(R.closest("[data-bottom-sheet-handle]")||R.closest("[data-bottom-sheet-drag-zone]")||Ne&&R.closest("[data-bottom-sheet-content]"))&&I(u.clientY)},r=d=>{if(!T.current)return;const u=d.touches[0];u&&(d.preventDefault(),$(u.clientY))},c=d=>{if(!T.current)return;const u=d.changedTouches[0];u&&F(u.clientY)};return window.addEventListener("touchstart",t,{passive:!0}),window.addEventListener("touchmove",r,{passive:!1}),window.addEventListener("touchend",c),()=>{window.removeEventListener("touchstart",t),window.removeEventListener("touchmove",r),window.removeEventListener("touchend",c)}},[j,Ne,I,$,F]);const en=n.useCallback(t=>{I(t.clientY),t.target.setPointerCapture(t.pointerId)},[I]),tn=n.useCallback(t=>{T.current&&$(t.clientY)},[$]),nn=n.useCallback(t=>{T.current&&F(t.clientY)},[F]),q=n.useRef(!1);n.useEffect(()=>{a&&!be.current&&(Se(!0),q.current=!1),!a&&be.current&&(q.current=!1),be.current=a},[a]),n.useEffect(()=>{if(j&&a&&!q.current){q.current=!0;const t=setTimeout(Re,16);return()=>clearTimeout(t)}!a&&j&&O("custom")},[j,a,Re,O]),n.useEffect(()=>{if(!j||!P)return;const t=r=>{r.key==="Escape"&&O("custom")};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[j,P,O]);const Be=n.useRef(typeof window<"u"?window.innerHeight:800);if(n.useEffect(()=>{const t=()=>{const r=window.innerHeight,c=document.activeElement,d=c instanceof HTMLInputElement||c instanceof HTMLTextAreaElement||(c==null?void 0:c.getAttribute("contenteditable"))==="true",u=Math.abs(r-Be.current);d&&u>100||(Be.current=r,Kt(r),x==null||x({type:"RESIZE",source:"window"}))};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[x]),rn(j&&qt),n.useEffect(()=>()=>{ke.current&&cancelAnimationFrame(ke.current),v.current&&clearTimeout(v.current)},[]),!j)return null;const Ee=g??(w?e.jsx("div",{style:y.legacyHeader,children:e.jsx("h2",{style:y.title,children:w})}):null),sn={...y.overlay,position:"fixed",...Yt};return e.jsxs("div",{style:sn,className:zt,"data-testid":pe,children:[Ft,e.jsx("div",{ref:Qt,style:{...y.backdrop,opacity:Jt,transition:`opacity ${C}ms ease-out`},children:e.jsx("button",{type:"button",style:y.backdropButton,onClick:()=>O("custom"),"aria-label":w?`Close ${w}`:"Close bottom sheet","data-testid":pe?`${pe}-backdrop`:void 0})}),e.jsxs("div",{ref:D,style:{...y.sheet,height:`${Xt}px`,maxHeight:`${b}px`,transition:Te!==null?`height ${Te}ms cubic-bezier(0.4, 0.0, 0.2, 1)`:"none"},children:[e.jsx("div",{style:y.handleZone,"data-bottom-sheet-drag-zone":!0,children:e.jsx("div",{style:y.handleArea,"data-bottom-sheet-handle":!0,role:"button","aria-label":w?`Drag handle for ${w}`:"Drag handle",onPointerDown:en,onPointerMove:tn,onPointerUp:nn,children:e.jsx("div",{style:y.handle})})}),Ee&&e.jsx("div",{style:y.headerContainer,children:Ee}),e.jsx("div",{style:y.scrollView,"data-bottom-sheet-content":!0,"data-ro-scroll":!0,children:e.jsx("div",{style:y.scrollContent,children:m})}),L&&e.jsx("div",{style:y.footerContainer,children:L}),!L&&e.jsx("div",{style:y.safeAreaSpacer})]})]})}const H=n.forwardRef(function(s,o){return typeof document>"u"?null:an.createPortal(e.jsx(mn,{...s,sheetRef:o}),document.body)}),y={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",justifyContent:"flex-end",zIndex:1e3,pointerEvents:"auto"},backdrop:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.4)",pointerEvents:"auto",zIndex:1},backdropButton:{position:"absolute",top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",border:"none",background:"transparent",cursor:"default",padding:0},sheet:{backgroundColor:_.surface.card,borderTopLeftRadius:`${He.xl2}px`,borderTopRightRadius:`${He.xl2}px`,overflow:"hidden",boxShadow:"0 -4px 12px rgba(0, 0, 0, 0.15)",display:"flex",flexDirection:"column",width:"100%",pointerEvents:"auto",position:"absolute",bottom:0,left:0,right:0,zIndex:2},handleZone:{height:`${Le}px`,display:"flex",justifyContent:"center",alignItems:"center",flexShrink:0},handleArea:{width:"100%",height:`${Le}px`,display:"flex",justifyContent:"center",alignItems:"center",cursor:"grab",flexShrink:0},handle:{width:"36px",height:"4px",borderRadius:"2px",backgroundColor:_.neutral.gray300},headerContainer:{flexShrink:0,paddingLeft:`${S.lg}px`,paddingRight:`${S.lg}px`},legacyHeader:{paddingBottom:`${S.sm}px`},title:{fontSize:"18px",fontWeight:600,color:_.text.primary,margin:0},scrollView:{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"},scrollContent:{paddingLeft:`${S.lg}px`,paddingRight:`${S.lg}px`,paddingBottom:`${S.md}px`},footerContainer:{flexShrink:0,paddingLeft:`${S.lg}px`,paddingRight:`${S.lg}px`,paddingTop:`${S.sm}px`,paddingBottom:`calc(${S.sm}px + env(safe-area-inset-bottom, 0px))`,borderTopWidth:"1px",borderTopStyle:"solid",borderTopColor:_.border.subtle},safeAreaSpacer:{paddingBottom:`${S.md}px`}};H.__docgenInfo={description:"",methods:[],displayName:"BottomSheet",props:{open:{required:!0,tsType:{name:"boolean"},description:"Whether the sheet is open"},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when the sheet is dismissed (backdrop tap, swipe, escape key)"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"@deprecated Use onDismiss instead. Callback when the sheet is closed."},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content to render inside the sheet"},snapPoints:{required:!1,tsType:{name:"union",raw:"SnapPointsFunction | number[]",elements:[{name:"signature",type:"function",raw:"(measurements: SnapPointMeasurements) => number | number[]",signature:{arguments:[{type:{name:"SnapPointMeasurements"},name:"measurements"}],return:{name:"union",raw:"number | number[]",elements:[{name:"number"},{name:"Array",elements:[{name:"number"}],raw:"number[]"}]}}},{name:"Array",elements:[{name:"number"}],raw:"number[]"}]},description:"Snap points function or array. Defaults to minHeight."},defaultSnap:{required:!1,tsType:{name:"union",raw:"number | DefaultSnapFunction",elements:[{name:"number"},{name:"signature",type:"function",raw:"(state: SnapPointState) => number",signature:{arguments:[{type:{name:"SnapPointState"},name:"state"}],return:{name:"number"}}}]},description:"Initial snap point when opening. Defaults to first snap point."},header:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Sticky header content"},footer:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Sticky footer content"},title:{required:!1,tsType:{name:"string"},description:"@deprecated Use header prop instead. Optional title displayed at the top of the sheet"},sibling:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content rendered as sibling to backdrop, outside the overlay"},blocking:{required:!1,tsType:{name:"boolean"},description:"Whether to trap focus and manage aria-hidden. Default: true"},scrollLocking:{required:!1,tsType:{name:"boolean"},description:"Whether to lock body scroll when open. Default: true"},expandOnContentDrag:{required:!1,tsType:{name:"boolean"},description:"Allow expanding by dragging the content area. Default: false"},skipInitialTransition:{required:!1,tsType:{name:"boolean"},description:"Skip the initial spring animation when opening. Default: false"},maxHeight:{required:!1,tsType:{name:"number"},description:"Maximum height constraint"},initialFocusRef:{required:!1,tsType:{name:"union",raw:"React.RefObject<HTMLElement> | false",elements:[{name:"ReactRefObject",raw:"React.RefObject<HTMLElement>",elements:[{name:"HTMLElement"}]},{name:"literal",value:"false"}]},description:"Ref for initial focus. Pass false to disable auto-focus."},className:{required:!1,tsType:{name:"string"},description:"CSS class name applied to the root element"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Inline styles applied to the root element"},onSpringStart:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: SpringEvent) => void | Promise<void>",signature:{arguments:[{type:{name:"SpringEvent"},name:"event"}],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}}},description:"Called when spring animation starts"},onSpringEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: SpringEvent) => void",signature:{arguments:[{type:{name:"SpringEvent"},name:"event"}],return:{name:"void"}}},description:"Called when spring animation ends"},onSpringCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: SpringEvent) => void",signature:{arguments:[{type:{name:"SpringEvent"},name:"event"}],return:{name:"void"}}},description:"Called when spring animation is cancelled"},testId:{required:!1,tsType:{name:"string"},description:"Test ID for testing"},testID:{required:!1,tsType:{name:"string"},description:"@deprecated Use testId instead"}}};const Nn={title:"Components/BottomSheet",component:H,tags:["autodocs"],argTypes:{open:{control:"boolean",description:"Whether the sheet is open"},blocking:{control:"boolean",description:"Whether to trap focus and manage aria-hidden"},scrollLocking:{control:"boolean",description:"Whether to lock body scroll when open"},expandOnContentDrag:{control:"boolean",description:"Allow expanding by dragging the content area"},skipInitialTransition:{control:"boolean",description:"Skip the initial spring animation when opening"},maxHeight:{control:{type:"range",min:200,max:800,step:50},description:"Maximum height constraint"}},parameters:{layout:"fullscreen"}};function h({children:a,buttonText:s="Open Bottom Sheet",...o}){const[m,i]=n.useState(!1);return e.jsxs("div",{className:"flex items-center justify-center min-h-screen bg-gray-100",children:[e.jsx("button",{onClick:()=>i(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:s}),e.jsx(H,{open:m,onDismiss:()=>i(!1),...o,children:a})]})}const U={render:()=>e.jsxs(h,{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Bottom Sheet"}),e.jsx("p",{className:"text-gray-600",children:"This is a basic bottom sheet. Drag the handle to expand or collapse, or swipe down to dismiss."})]})},V={render:()=>e.jsx(h,{header:e.jsxs("div",{className:"pb-4 border-b border-gray-200",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Sheet Header"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Sticky header content"})]}),children:e.jsx("div",{className:"space-y-4 pt-4",children:Array.from({length:5}).map((a,s)=>e.jsxs("p",{className:"text-gray-600",children:["Content paragraph ",s+1,". Lorem ipsum dolor sit amet, consectetur adipiscing elit."]},s))})})},Z={render:()=>e.jsxs(h,{footer:e.jsxs("div",{className:"flex gap-3 pt-4",children:[e.jsx("button",{className:"flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors",children:"Cancel"}),e.jsx("button",{className:"flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Confirm"})]}),children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"With Footer"}),e.jsx("p",{className:"text-gray-600",children:"This bottom sheet has a sticky footer with action buttons."})]})},G={render:()=>e.jsx(h,{header:e.jsx("div",{className:"pb-4 border-b border-gray-200",children:e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Complete Layout"})}),footer:e.jsxs("div",{className:"flex gap-3 pt-4",children:[e.jsx("button",{className:"flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg",children:"Cancel"}),e.jsx("button",{className:"flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg",children:"Save"})]}),children:e.jsx("div",{className:"space-y-4 pt-4",children:Array.from({length:8}).map((a,s)=>e.jsxs("p",{className:"text-gray-600",children:["Scrollable content paragraph ",s+1,". Lorem ipsum dolor sit amet."]},s))})})},K={render:()=>e.jsxs(h,{snapPoints:[200,400,600],buttonText:"Open (Snap: 200, 400, 600)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Snap Points"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"This sheet has three snap points: 200px, 400px, and 600px. Drag to feel the snapping behavior."}),e.jsxs("div",{className:"space-y-2 text-sm text-gray-500",children:[e.jsx("p",{children:"• Collapsed: 200px"}),e.jsx("p",{children:"• Medium: 400px"}),e.jsx("p",{children:"• Expanded: 600px"})]})]})},X={render:()=>e.jsxs(h,{snapPoints:({maxHeight:a})=>[a*.3,a*.6,a*.9],buttonText:"Open (Dynamic Snap Points)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Dynamic Snap Points"}),e.jsx("p",{className:"text-gray-600",children:"Snap points are calculated as percentages of maxHeight (30%, 60%, 90%). These adapt to different screen sizes."})]})},J={render:()=>e.jsxs(h,{snapPoints:[200,400,600],defaultSnap:400,buttonText:"Open at 400px",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Default Snap Point"}),e.jsx("p",{className:"text-gray-600",children:"This sheet opens at the middle snap point (400px) instead of the default behavior."})]})},Q={render:()=>e.jsxs(h,{expandOnContentDrag:!0,buttonText:"Open (Drag Content to Expand)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Expand on Content Drag"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"With expandOnContentDrag enabled, you can drag anywhere in the content area to expand or collapse the sheet, not just the handle."}),e.jsx("div",{className:"space-y-4",children:Array.from({length:5}).map((a,s)=>e.jsx("div",{className:"p-4 bg-gray-100 rounded-lg",children:e.jsxs("p",{className:"text-gray-700",children:["Draggable content item ",s+1]})},s))})]})},ee={render:()=>e.jsxs(h,{blocking:!1,buttonText:"Open (Non-blocking)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Non-blocking Sheet"}),e.jsx("p",{className:"text-gray-600",children:"With blocking=false, focus is not trapped and aria-hidden is not managed. The page behind remains interactive."})]})},te={render:()=>e.jsxs(h,{scrollLocking:!1,buttonText:"Open (No Scroll Lock)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"No Scroll Lock"}),e.jsx("p",{className:"text-gray-600",children:"With scrollLocking=false, the body can still be scrolled while the sheet is open. Try scrolling the page behind."})]})},ne={render:()=>e.jsxs(h,{skipInitialTransition:!0,buttonText:"Open (No Animation)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Skip Initial Transition"}),e.jsx("p",{className:"text-gray-600",children:"With skipInitialTransition=true, the sheet appears instantly without the opening animation."})]})},se={render:()=>e.jsxs(h,{maxHeight:400,buttonText:"Open (Max Height: 400px)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Max Height"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"This sheet has a maxHeight of 400px. It cannot expand beyond this limit."}),e.jsx("div",{className:"space-y-4",children:Array.from({length:10}).map((a,s)=>e.jsxs("p",{className:"text-gray-600",children:["Content paragraph ",s+1," - scroll to see more"]},s))})]})},ae={render:()=>{const[a,s]=n.useState(!1);return e.jsxs("div",{className:"flex items-center justify-center min-h-screen bg-gray-100",children:[e.jsx("button",{onClick:()=>s(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Open with FAB"}),e.jsxs(H,{open:a,onDismiss:()=>s(!1),sibling:e.jsx("button",{onClick:()=>alert("FAB clicked!"),className:"fixed bottom-24 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center text-2xl z-[1001]",children:"+"}),children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"With Sibling Content"}),e.jsx("p",{className:"text-gray-600",children:"The sibling prop renders content outside the sheet but inside the overlay. Notice the floating action button (FAB) that stays visible."})]})]})}},re={render:()=>{const[a,s]=n.useState(!1),o=n.useRef(null),m=()=>{var g;return(g=o.current)==null?void 0:g.snapTo(200)},i=()=>{var g;return(g=o.current)==null?void 0:g.snapTo(400)},p=()=>{var g;return(g=o.current)==null?void 0:g.snapTo(600)};return e.jsxs("div",{className:"flex items-center justify-center min-h-screen bg-gray-100",children:[e.jsx("button",{onClick:()=>s(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Open with Ref Control"}),e.jsxs(H,{ref:o,open:a,onDismiss:()=>s(!1),snapPoints:[200,400,600],children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Programmatic Control"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"Use the ref to programmatically control the sheet's snap position."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:m,className:"px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm",children:"Snap to 200"}),e.jsx("button",{onClick:i,className:"px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm",children:"Snap to 400"}),e.jsx("button",{onClick:p,className:"px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm",children:"Snap to 600"})]})]})]})}},oe={render:()=>{const[a,s]=n.useState(!1),[o,m]=n.useState([]),i=(p,g)=>{const L=new Date().toLocaleTimeString();m(w=>[...w.slice(-4),`${L} - ${p}: ${g.type}${g.source?` (${g.source})`:""}`])};return e.jsxs("div",{className:"flex items-center justify-center min-h-screen bg-gray-100",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("button",{onClick:()=>s(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4",children:"Open with Callbacks"}),e.jsxs("div",{className:"bg-white rounded-lg p-4 shadow-md max-w-xs",children:[e.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Event Log"}),e.jsx("div",{className:"text-xs text-left space-y-1 font-mono",children:o.length===0?e.jsx("p",{className:"text-gray-400",children:"No events yet"}):o.map((p,g)=>e.jsx("p",{className:"text-gray-600",children:p},g))})]})]}),e.jsxs(H,{open:a,onDismiss:()=>s(!1),onSpringStart:p=>i("onSpringStart",p),onSpringEnd:p=>i("onSpringEnd",p),onSpringCancel:p=>i("onSpringCancel",p),children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Spring Callbacks"}),e.jsx("p",{className:"text-gray-600",children:"Drag the sheet to see spring events logged. Events include OPEN, CLOSE, SNAP, and RESIZE with their sources."})]})]})}},ie={render:()=>e.jsxs(h,{buttonText:"Open (Long Content)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Long Scrollable Content"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"This demonstrates the custom scrollbar styling. Scroll down to see more content."}),e.jsx("div",{className:"space-y-4",children:Array.from({length:20}).map((a,s)=>e.jsxs("div",{className:"p-4 bg-gray-50 rounded-lg",children:[e.jsxs("h3",{className:"font-medium text-gray-900",children:["Item ",s+1]}),e.jsx("p",{className:"text-sm text-gray-600",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."})]},s))})]})},le={render:()=>e.jsxs(h,{className:"bg-gradient-to-b from-purple-500/20 to-transparent",style:{backdropFilter:"blur(4px)"},buttonText:"Open (Custom Styled)",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Styling"}),e.jsx("p",{className:"text-gray-600",children:"This sheet uses custom className and style props to add a gradient overlay and blur effect."})]})},ce={render:()=>{const a=[{icon:"📷",label:"Take Photo"},{icon:"🖼️",label:"Choose from Gallery"},{icon:"📁",label:"Browse Files"},{icon:"📎",label:"Attach Document"},{icon:"🔗",label:"Share Link"}];return e.jsx(h,{snapPoints:[300],defaultSnap:300,buttonText:"Open Action Sheet",children:e.jsx("div",{className:"space-y-1",children:a.map((s,o)=>e.jsxs("button",{className:"w-full flex items-center gap-4 p-4 hover:bg-gray-100 rounded-lg transition-colors text-left",onClick:()=>alert(`Selected: ${s.label}`),children:[e.jsx("span",{className:"text-2xl",children:s.icon}),e.jsx("span",{className:"text-gray-900",children:s.label})]},o))})})}},de={render:()=>e.jsx(h,{header:e.jsx("div",{className:"pb-4 border-b border-gray-200",children:e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Add New Item"})}),footer:e.jsxs("div",{className:"flex gap-3 pt-4",children:[e.jsx("button",{className:"flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg",children:"Cancel"}),e.jsx("button",{className:"flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg",children:"Add Item"})]}),snapPoints:[400,500],defaultSnap:500,buttonText:"Open Form Sheet",children:e.jsxs("div",{className:"space-y-4 pt-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Title"}),e.jsx("input",{type:"text",className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",placeholder:"Enter title"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Description"}),e.jsx("textarea",{className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none",rows:3,placeholder:"Enter description"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Category"}),e.jsxs("select",{className:"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",children:[e.jsx("option",{children:"Select category"}),e.jsx("option",{children:"Work"}),e.jsx("option",{children:"Personal"}),e.jsx("option",{children:"Other"})]})]})]})})},me={render:()=>e.jsxs(h,{testId:"custom-bottom-sheet",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"With Test ID"}),e.jsx("p",{className:"text-gray-600",children:'This sheet has testId="custom-bottom-sheet" for testing. Inspect the DOM to see the data-testid attribute.'})]})};var Ae,Ie,Pe;U.parameters={...U.parameters,docs:{...(Ae=U.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Bottom Sheet</h2>
      <p className="text-gray-600">
        This is a basic bottom sheet. Drag the handle to expand or collapse, or swipe down to dismiss.
      </p>
    </BottomSheetDemo>
}`,...(Pe=(Ie=U.parameters)==null?void 0:Ie.docs)==null?void 0:Pe.source}}};var Me,We,$e;V.parameters={...V.parameters,docs:{...(Me=V.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo header={<div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sheet Header</h2>
          <p className="text-sm text-gray-500">Sticky header content</p>
        </div>}>
      <div className="space-y-4 pt-4">
        {Array.from({
        length: 5
      }).map((_, i) => <p key={i} className="text-gray-600">
            Content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>)}
      </div>
    </BottomSheetDemo>
}`,...($e=(We=V.parameters)==null?void 0:We.docs)==null?void 0:$e.source}}};var Fe,qe,_e;Z.parameters={...Z.parameters,docs:{...(Fe=Z.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo footer={<div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Confirm
          </button>
        </div>}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Footer</h2>
      <p className="text-gray-600">This bottom sheet has a sticky footer with action buttons.</p>
    </BottomSheetDemo>
}`,...(_e=(qe=Z.parameters)==null?void 0:qe.docs)==null?void 0:_e.source}}};var ze,Ye,Ue;G.parameters={...G.parameters,docs:{...(ze=G.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo header={<div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Complete Layout</h2>
        </div>} footer={<div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </div>}>
      <div className="space-y-4 pt-4">
        {Array.from({
        length: 8
      }).map((_, i) => <p key={i} className="text-gray-600">
            Scrollable content paragraph {i + 1}. Lorem ipsum dolor sit amet.
          </p>)}
      </div>
    </BottomSheetDemo>
}`,...(Ue=(Ye=G.parameters)==null?void 0:Ye.docs)==null?void 0:Ue.source}}};var Ve,Ze,Ge;K.parameters={...K.parameters,docs:{...(Ve=K.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo snapPoints={[200, 400, 600]} buttonText="Open (Snap: 200, 400, 600)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Snap Points</h2>
      <p className="text-gray-600 mb-4">
        This sheet has three snap points: 200px, 400px, and 600px. Drag to feel the snapping behavior.
      </p>
      <div className="space-y-2 text-sm text-gray-500">
        <p>• Collapsed: 200px</p>
        <p>• Medium: 400px</p>
        <p>• Expanded: 600px</p>
      </div>
    </BottomSheetDemo>
}`,...(Ge=(Ze=K.parameters)==null?void 0:Ze.docs)==null?void 0:Ge.source}}};var Ke,Xe,Je;X.parameters={...X.parameters,docs:{...(Ke=X.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo snapPoints={({
    maxHeight
  }) => [maxHeight * 0.3, maxHeight * 0.6, maxHeight * 0.9]} buttonText="Open (Dynamic Snap Points)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Dynamic Snap Points</h2>
      <p className="text-gray-600">
        Snap points are calculated as percentages of maxHeight (30%, 60%, 90%). These adapt to different screen sizes.
      </p>
    </BottomSheetDemo>
}`,...(Je=(Xe=X.parameters)==null?void 0:Xe.docs)==null?void 0:Je.source}}};var Qe,et,tt;J.parameters={...J.parameters,docs:{...(Qe=J.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo snapPoints={[200, 400, 600]} defaultSnap={400} buttonText="Open at 400px">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Default Snap Point</h2>
      <p className="text-gray-600">
        This sheet opens at the middle snap point (400px) instead of the default behavior.
      </p>
    </BottomSheetDemo>
}`,...(tt=(et=J.parameters)==null?void 0:et.docs)==null?void 0:tt.source}}};var nt,st,at;Q.parameters={...Q.parameters,docs:{...(nt=Q.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo expandOnContentDrag buttonText="Open (Drag Content to Expand)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Expand on Content Drag</h2>
      <p className="text-gray-600 mb-4">
        With expandOnContentDrag enabled, you can drag anywhere in the content area to expand or collapse the sheet, not
        just the handle.
      </p>
      <div className="space-y-4">
        {Array.from({
        length: 5
      }).map((_, i) => <div key={i} className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">Draggable content item {i + 1}</p>
          </div>)}
      </div>
    </BottomSheetDemo>
}`,...(at=(st=Q.parameters)==null?void 0:st.docs)==null?void 0:at.source}}};var rt,ot,it;ee.parameters={...ee.parameters,docs:{...(rt=ee.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo blocking={false} buttonText="Open (Non-blocking)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Non-blocking Sheet</h2>
      <p className="text-gray-600">
        With blocking=false, focus is not trapped and aria-hidden is not managed. The page behind remains interactive.
      </p>
    </BottomSheetDemo>
}`,...(it=(ot=ee.parameters)==null?void 0:ot.docs)==null?void 0:it.source}}};var lt,ct,dt;te.parameters={...te.parameters,docs:{...(lt=te.parameters)==null?void 0:lt.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo scrollLocking={false} buttonText="Open (No Scroll Lock)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">No Scroll Lock</h2>
      <p className="text-gray-600">
        With scrollLocking=false, the body can still be scrolled while the sheet is open. Try scrolling the page behind.
      </p>
    </BottomSheetDemo>
}`,...(dt=(ct=te.parameters)==null?void 0:ct.docs)==null?void 0:dt.source}}};var mt,pt,ut;ne.parameters={...ne.parameters,docs:{...(mt=ne.parameters)==null?void 0:mt.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo skipInitialTransition buttonText="Open (No Animation)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Skip Initial Transition</h2>
      <p className="text-gray-600">
        With skipInitialTransition=true, the sheet appears instantly without the opening animation.
      </p>
    </BottomSheetDemo>
}`,...(ut=(pt=ne.parameters)==null?void 0:pt.docs)==null?void 0:ut.source}}};var ht,gt,xt;se.parameters={...se.parameters,docs:{...(ht=se.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo maxHeight={400} buttonText="Open (Max Height: 400px)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Max Height</h2>
      <p className="text-gray-600 mb-4">This sheet has a maxHeight of 400px. It cannot expand beyond this limit.</p>
      <div className="space-y-4">
        {Array.from({
        length: 10
      }).map((_, i) => <p key={i} className="text-gray-600">
            Content paragraph {i + 1} - scroll to see more
          </p>)}
      </div>
    </BottomSheetDemo>
}`,...(xt=(gt=se.parameters)==null?void 0:gt.docs)==null?void 0:xt.source}}};var bt,ft,yt;ae.parameters={...ae.parameters,docs:{...(bt=ae.parameters)==null?void 0:bt.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Open with FAB
        </button>
        <BottomSheet open={open} onDismiss={() => setOpen(false)} sibling={<button onClick={() => alert("FAB clicked!")} className="fixed bottom-24 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center text-2xl z-[1001]">
              +
            </button>}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">With Sibling Content</h2>
          <p className="text-gray-600">
            The sibling prop renders content outside the sheet but inside the overlay. Notice the floating action button
            (FAB) that stays visible.
          </p>
        </BottomSheet>
      </div>;
  }
}`,...(yt=(ft=ae.parameters)==null?void 0:ft.docs)==null?void 0:yt.source}}};var Nt,vt,St;re.parameters={...re.parameters,docs:{...(Nt=re.parameters)==null?void 0:Nt.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const sheetRef = useRef<BottomSheetRef>(null);
    const snapToMin = () => sheetRef.current?.snapTo(200);
    const snapToMid = () => sheetRef.current?.snapTo(400);
    const snapToMax = () => sheetRef.current?.snapTo(600);
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Open with Ref Control
        </button>
        <BottomSheet ref={sheetRef} open={open} onDismiss={() => setOpen(false)} snapPoints={[200, 400, 600]}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Programmatic Control</h2>
          <p className="text-gray-600 mb-4">Use the ref to programmatically control the sheet's snap position.</p>
          <div className="flex gap-2">
            <button onClick={snapToMin} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              Snap to 200
            </button>
            <button onClick={snapToMid} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              Snap to 400
            </button>
            <button onClick={snapToMax} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              Snap to 600
            </button>
          </div>
        </BottomSheet>
      </div>;
  }
}`,...(St=(vt=re.parameters)==null?void 0:vt.docs)==null?void 0:St.source}}};var jt,wt,Tt;oe.parameters={...oe.parameters,docs:{...(jt=oe.parameters)==null?void 0:jt.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState<string[]>([]);
    const logEvent = (name: string, event: SpringEvent) => {
      const timestamp = new Date().toLocaleTimeString();
      setEvents(prev => [...prev.slice(-4), \`\${timestamp} - \${name}: \${event.type}\${event.source ? \` (\${event.source})\` : ""}\`]);
    };
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4">
            Open with Callbacks
          </button>
          <div className="bg-white rounded-lg p-4 shadow-md max-w-xs">
            <h3 className="font-semibold text-gray-900 mb-2">Event Log</h3>
            <div className="text-xs text-left space-y-1 font-mono">
              {events.length === 0 ? <p className="text-gray-400">No events yet</p> : events.map((event, i) => <p key={i} className="text-gray-600">
                    {event}
                  </p>)}
            </div>
          </div>
        </div>
        <BottomSheet open={open} onDismiss={() => setOpen(false)} onSpringStart={e => logEvent("onSpringStart", e)} onSpringEnd={e => logEvent("onSpringEnd", e)} onSpringCancel={e => logEvent("onSpringCancel", e)}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Spring Callbacks</h2>
          <p className="text-gray-600">
            Drag the sheet to see spring events logged. Events include OPEN, CLOSE, SNAP, and RESIZE with their sources.
          </p>
        </BottomSheet>
      </div>;
  }
}`,...(Tt=(wt=oe.parameters)==null?void 0:wt.docs)==null?void 0:Tt.source}}};var Ct,kt,Dt;ie.parameters={...ie.parameters,docs:{...(Ct=ie.parameters)==null?void 0:Ct.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo buttonText="Open (Long Content)">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Long Scrollable Content</h2>
      <p className="text-gray-600 mb-4">
        This demonstrates the custom scrollbar styling. Scroll down to see more content.
      </p>
      <div className="space-y-4">
        {Array.from({
        length: 20
      }).map((_, i) => <div key={i} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Item {i + 1}</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>)}
      </div>
    </BottomSheetDemo>
}`,...(Dt=(kt=ie.parameters)==null?void 0:kt.docs)==null?void 0:Dt.source}}};var Ot,Rt,Bt;le.parameters={...le.parameters,docs:{...(Ot=le.parameters)==null?void 0:Ot.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo className="bg-gradient-to-b from-purple-500/20 to-transparent" style={{
    backdropFilter: "blur(4px)"
  }} buttonText="Open (Custom Styled)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Styling</h2>
      <p className="text-gray-600">
        This sheet uses custom className and style props to add a gradient overlay and blur effect.
      </p>
    </BottomSheetDemo>
}`,...(Bt=(Rt=le.parameters)==null?void 0:Rt.docs)==null?void 0:Bt.source}}};var Et,Ht,Lt;ce.parameters={...ce.parameters,docs:{...(Et=ce.parameters)==null?void 0:Et.docs,source:{originalSource:`{
  render: () => {
    const items = [{
      icon: "📷",
      label: "Take Photo"
    }, {
      icon: "🖼️",
      label: "Choose from Gallery"
    }, {
      icon: "📁",
      label: "Browse Files"
    }, {
      icon: "📎",
      label: "Attach Document"
    }, {
      icon: "🔗",
      label: "Share Link"
    }];
    return <BottomSheetDemo snapPoints={[300]} defaultSnap={300} buttonText="Open Action Sheet">
        <div className="space-y-1">
          {items.map((item, i) => <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 rounded-lg transition-colors text-left" onClick={() => alert(\`Selected: \${item.label}\`)}>
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-900">{item.label}</span>
            </button>)}
        </div>
      </BottomSheetDemo>;
  }
}`,...(Lt=(Ht=ce.parameters)==null?void 0:Ht.docs)==null?void 0:Lt.source}}};var At,It,Pt;de.parameters={...de.parameters,docs:{...(At=de.parameters)==null?void 0:At.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo header={<div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add New Item</h2>
        </div>} footer={<div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Add Item</button>
        </div>} snapPoints={[400, 500]} defaultSnap={500} buttonText="Open Form Sheet">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Enter title" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" rows={3} placeholder="Enter description" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
            <option>Select category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Other</option>
          </select>
        </div>
      </div>
    </BottomSheetDemo>
}`,...(Pt=(It=de.parameters)==null?void 0:It.docs)==null?void 0:Pt.source}}};var Mt,Wt,$t;me.parameters={...me.parameters,docs:{...(Mt=me.parameters)==null?void 0:Mt.docs,source:{originalSource:`{
  render: () => <BottomSheetDemo testId="custom-bottom-sheet">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Test ID</h2>
      <p className="text-gray-600">
        This sheet has testId="custom-bottom-sheet" for testing. Inspect the DOM to see the data-testid attribute.
      </p>
    </BottomSheetDemo>
}`,...($t=(Wt=me.parameters)==null?void 0:Wt.docs)==null?void 0:$t.source}}};const vn=["Default","WithHeader","WithFooter","WithHeaderAndFooter","CustomSnapPoints","DynamicSnapPoints","DefaultSnapPoint","ExpandOnDrag","NonBlocking","NoScrollLock","SkipAnimation","CustomMaxHeight","WithSibling","WithRef","SpringCallbacks","LongScrollableContent","CustomStyling","ListSheet","FormSheet","WithTestId"];export{se as CustomMaxHeight,K as CustomSnapPoints,le as CustomStyling,U as Default,J as DefaultSnapPoint,X as DynamicSnapPoints,Q as ExpandOnDrag,de as FormSheet,ce as ListSheet,ie as LongScrollableContent,te as NoScrollLock,ee as NonBlocking,ne as SkipAnimation,oe as SpringCallbacks,Z as WithFooter,V as WithHeader,G as WithHeaderAndFooter,re as WithRef,ae as WithSibling,me as WithTestId,vn as __namedExportsOrder,Nn as default};
