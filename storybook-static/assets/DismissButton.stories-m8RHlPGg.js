import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{D as t}from"./DismissButton-CBpyeAmX.js";import"./index-BWu4c2F4.js";import"./index-B8jaNLVP.js";import"./index-DOIGBiOF.js";import"./createLucideIcon-WkQoaPtN.js";const de={title:"Components/DismissButton",component:t,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","subtle"],description:"Visual variant: default has border, subtle is borderless"},size:{control:{type:"range",min:12,max:32,step:2},description:"Icon size in pixels"},position:{control:"text",description:"Positioning classes for the button"},disabled:{control:"boolean",description:"Whether the button is disabled"},avoidOverflowClipping:{control:"boolean",description:"When true, renders in a portal to avoid being clipped by parent overflow"},"aria-label":{control:"text",description:"Accessible label for screen readers"}},parameters:{layout:"centered"}};function a({containerStyle:s,...te}){return e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-8 min-w-[200px] min-h-[120px]",style:s,children:[e.jsx(t,{...te}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Content area"})]})}const i={args:{onClick:()=>alert("Dismissed!"),variant:"default"},render:s=>e.jsx(a,{...s})},r={args:{onClick:()=>alert("Dismissed!"),variant:"subtle"},render:s=>e.jsx(a,{...s})},l={render:()=>e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Default (with border)"}),e.jsx("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-24",children:e.jsx(t,{onClick:()=>{},variant:"default",avoidOverflowClipping:!1})})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Subtle (borderless)"}),e.jsx("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-24",children:e.jsx(t,{onClick:()=>{},variant:"subtle",avoidOverflowClipping:!1,position:"absolute top-2 right-2 z-10"})})]})]})},n={render:()=>e.jsx("div",{className:"flex gap-8",children:[12,16,18,24,28].map(s=>e.jsxs("div",{className:"text-center",children:[e.jsxs("p",{className:"text-sm text-gray-600 mb-2",children:[s,"px"]}),e.jsx("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-32 h-20",children:e.jsx(t,{onClick:()=>{},size:s,avoidOverflowClipping:!1})})]},s))})},o={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Top Right (default)"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-32",children:[e.jsx(t,{onClick:()=>{},position:"absolute -top-2 -right-2 z-10",avoidOverflowClipping:!1}),e.jsx("p",{className:"text-gray-400 text-xs",children:"Content"})]})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Top Left"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-32",children:[e.jsx(t,{onClick:()=>{},position:"absolute -top-2 -left-2 z-10",avoidOverflowClipping:!1}),e.jsx("p",{className:"text-gray-400 text-xs",children:"Content"})]})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Inside Top Right"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-32",children:[e.jsx(t,{onClick:()=>{},position:"absolute top-2 right-2 z-10",variant:"subtle",avoidOverflowClipping:!1}),e.jsx("p",{className:"text-gray-400 text-xs",children:"Content"})]})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Inside Top Left"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-32",children:[e.jsx(t,{onClick:()=>{},position:"absolute top-2 left-2 z-10",variant:"subtle",avoidOverflowClipping:!1}),e.jsx("p",{className:"text-gray-400 text-xs",children:"Content"})]})]})]})},d={args:{onClick:()=>alert("This won't fire"),disabled:!0},render:s=>e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Disabled (default)"}),e.jsx("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-24",children:e.jsx(t,{...s,variant:"default",avoidOverflowClipping:!1})})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Disabled (subtle)"}),e.jsx("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-24",children:e.jsx(t,{...s,variant:"subtle",avoidOverflowClipping:!1,position:"absolute top-2 right-2 z-10"})})]})]})},c={render:()=>e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:"avoidOverflowClipping=true (default) - Button renders in portal"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-64 h-32",style:{overflow:"hidden"},children:[e.jsx(t,{onClick:()=>{},avoidOverflowClipping:!0,position:"absolute -top-2 -right-2 z-10"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"Container has overflow: hidden but button is still visible"})]})]})},p={render:()=>e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:"avoidOverflowClipping=false - Button can be clipped"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-64 h-32",style:{overflow:"hidden"},children:[e.jsx(t,{onClick:()=>{},avoidOverflowClipping:!1,position:"absolute -top-2 -right-2 z-10"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"Container has overflow: hidden - button is clipped!"})]})]})},m={render:()=>e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"With Portal (default)"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-24",style:{overflow:"hidden"},children:[e.jsx(t,{onClick:()=>{},avoidOverflowClipping:!0,position:"absolute -top-2 -right-2 z-10"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"overflow: hidden"})]})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Without Portal"}),e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-48 h-24",style:{overflow:"hidden"},children:[e.jsx(t,{onClick:()=>{},avoidOverflowClipping:!1,position:"absolute -top-2 -right-2 z-10"}),e.jsx("p",{className:"text-gray-400 text-xs",children:"overflow: hidden"})]})]})]})},v={args:{onClick:()=>{},testId:"custom-dismiss-button",avoidOverflowClipping:!1},render:s=>e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:'Inspect element to see data-testid="custom-dismiss-button"'}),e.jsx(a,{...s})]})},g={args:{onClick:()=>{},"aria-label":"Close notification panel",avoidOverflowClipping:!1},render:s=>e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:'Custom aria-label for screen readers: "Close notification panel"'}),e.jsx(a,{...s})]})},x={args:{onClick:()=>{},className:"bg-purple-100 text-purple-600 hover:bg-purple-200",avoidOverflowClipping:!1},render:s=>e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-4",children:"Custom colors via className"}),e.jsx(a,{...s})]})},u={args:{onClick:()=>alert("Button clicked!"),variant:"default",size:18,disabled:!1,avoidOverflowClipping:!1,"aria-label":"Dismiss"},render:s=>e.jsx(a,{...s})};var h,b,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    onClick: () => alert("Dismissed!"),
    variant: "default"
  },
  render: args => <ButtonDemo {...args} />
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var w,N,C;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    onClick: () => alert("Dismissed!"),
    variant: "subtle"
  },
  render: args => <ButtonDemo {...args} />
}`,...(C=(N=r.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var j,y,O;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Default (with border)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton onClick={() => {}} variant="default" avoidOverflowClipping={false} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Subtle (borderless)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton onClick={() => {}} variant="subtle" avoidOverflowClipping={false} position="absolute top-2 right-2 z-10" />
        </div>
      </div>
    </div>
}`,...(O=(y=l.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var k,D,z;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8">
      {[12, 16, 18, 24, 28].map(size => <div key={size} className="text-center">
          <p className="text-sm text-gray-600 mb-2">{size}px</p>
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-32 h-20">
            <DismissButton onClick={() => {}} size={size} avoidOverflowClipping={false} />
          </div>
        </div>)}
    </div>
}`,...(z=(D=n.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var B,S,I;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Top Right (default)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton onClick={() => {}} position="absolute -top-2 -right-2 z-10" avoidOverflowClipping={false} />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Top Left</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton onClick={() => {}} position="absolute -top-2 -left-2 z-10" avoidOverflowClipping={false} />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Inside Top Right</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton onClick={() => {}} position="absolute top-2 right-2 z-10" variant="subtle" avoidOverflowClipping={false} />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Inside Top Left</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton onClick={() => {}} position="absolute top-2 left-2 z-10" variant="subtle" avoidOverflowClipping={false} />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
    </div>
}`,...(I=(S=o.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var P,T,W;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    onClick: () => alert("This won't fire"),
    disabled: true
  },
  render: args => <div className="flex gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Disabled (default)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton {...args} variant="default" avoidOverflowClipping={false} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Disabled (subtle)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton {...args} variant="subtle" avoidOverflowClipping={false} position="absolute top-2 right-2 z-10" />
        </div>
      </div>
    </div>
}`,...(W=(T=d.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var L,R,A;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">avoidOverflowClipping=true (default) - Button renders in portal</p>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-64 h-32" style={{
      overflow: "hidden"
    }}>
        <DismissButton onClick={() => {}} avoidOverflowClipping={true} position="absolute -top-2 -right-2 z-10" />
        <p className="text-gray-400 text-xs">Container has overflow: hidden but button is still visible</p>
      </div>
    </div>
}`,...(A=(R=c.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var V,E,_;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">avoidOverflowClipping=false - Button can be clipped</p>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-64 h-32" style={{
      overflow: "hidden"
    }}>
        <DismissButton onClick={() => {}} avoidOverflowClipping={false} position="absolute -top-2 -right-2 z-10" />
        <p className="text-gray-400 text-xs">Container has overflow: hidden - button is clipped!</p>
      </div>
    </div>
}`,...(_=(E=p.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var q,F,G;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">With Portal (default)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24" style={{
        overflow: "hidden"
      }}>
          <DismissButton onClick={() => {}} avoidOverflowClipping={true} position="absolute -top-2 -right-2 z-10" />
          <p className="text-gray-400 text-xs">overflow: hidden</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Without Portal</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24" style={{
        overflow: "hidden"
      }}>
          <DismissButton onClick={() => {}} avoidOverflowClipping={false} position="absolute -top-2 -right-2 z-10" />
          <p className="text-gray-400 text-xs">overflow: hidden</p>
        </div>
      </div>
    </div>
}`,...(G=(F=m.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var H,J,K;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    onClick: () => {},
    testId: "custom-dismiss-button",
    avoidOverflowClipping: false
  },
  render: args => <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">Inspect element to see data-testid="custom-dismiss-button"</p>
      <ButtonDemo {...args} />
    </div>
}`,...(K=(J=v.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var M,Q,U;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    onClick: () => {},
    "aria-label": "Close notification panel",
    avoidOverflowClipping: false
  },
  render: args => <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">Custom aria-label for screen readers: "Close notification panel"</p>
      <ButtonDemo {...args} />
    </div>
}`,...(U=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    onClick: () => {},
    className: "bg-purple-100 text-purple-600 hover:bg-purple-200",
    avoidOverflowClipping: false
  },
  render: args => <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">Custom colors via className</p>
      <ButtonDemo {...args} />
    </div>
}`,...(Z=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,se;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    onClick: () => alert("Button clicked!"),
    variant: "default",
    size: 18,
    disabled: false,
    avoidOverflowClipping: false,
    "aria-label": "Dismiss"
  },
  render: args => <ButtonDemo {...args} />
}`,...(se=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};const ce=["Default","Subtle","VariantComparison","CustomSize","CustomPosition","Disabled","WithPortal","WithoutPortal","PortalComparison","WithTestId","CustomAriaLabel","CustomClassName","Interactive"];export{g as CustomAriaLabel,x as CustomClassName,o as CustomPosition,n as CustomSize,i as Default,d as Disabled,u as Interactive,m as PortalComparison,r as Subtle,l as VariantComparison,c as WithPortal,v as WithTestId,p as WithoutPortal,ce as __namedExportsOrder,de as default};
