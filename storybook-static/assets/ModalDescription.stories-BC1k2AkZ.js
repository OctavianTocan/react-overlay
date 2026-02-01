import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{M as s}from"./ModalDescription-BqZgFI1Q.js";import"./index-DOIGBiOF.js";const H={title:"Components/ModalDescription",component:s,tags:["autodocs"],argTypes:{className:{control:"text",description:"Optional className overrides"},children:{control:"text",description:"Description content"}},parameters:{layout:"centered"},decorators:[R=>e.jsx("div",{className:"bg-white p-6 rounded-lg shadow-lg max-w-md w-full",children:e.jsx(R,{})})]},r={args:{children:"This is a description text that provides additional context for the modal content."}},a={render:()=>e.jsxs(s,{children:[e.jsx("span",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("span",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})},n={args:{children:"This description has custom styling applied via className.",className:"text-blue-600 text-base font-medium italic"}},i={render:()=>e.jsxs(s,{children:["By continuing, you agree to our"," ",e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Terms of Service"})," ","and"," ",e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Privacy Policy"}),"."]})},t={render:()=>e.jsxs(s,{children:[e.jsx("strong",{children:"Important:"})," This action cannot be undone. Please make sure you have backed up your data before proceeding."]})},o={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{children:"Your account has been created successfully."}),e.jsx(s,{className:"text-green-600",children:"You can now access all features of the application."})]})},c={render:()=>e.jsxs(s,{className:"space-y-2",children:[e.jsx("span",{children:"Before you proceed, please ensure:"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsx("li",{children:"All required fields are filled"}),e.jsx("li",{children:"Your email address is verified"}),e.jsx("li",{children:"You have read the documentation"})]})]})},l={args:{children:"Something went wrong. Please try again or contact support if the issue persists.",className:"text-red-600"}},d={args:{children:"Your changes have been saved successfully!",className:"text-green-600"}},u={args:{children:"This feature is currently in beta and may not work as expected.",className:"text-amber-600"}};var p,m,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: "This is a description text that provides additional context for the modal content."
  }
}`,...(h=(m=r.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var g,x,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <ModalDescription>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </span>
      <br />
      <br />
      <span>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </span>
    </ModalDescription>
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var y,b,v;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: "This description has custom styling applied via className.",
    className: "text-blue-600 text-base font-medium italic"
  }
}`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var D,N,j;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <ModalDescription>
      By continuing, you agree to our{" "}
      <a href="#" className="text-blue-600 hover:underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="#" className="text-blue-600 hover:underline">
        Privacy Policy
      </a>
      .
    </ModalDescription>
}`,...(j=(N=i.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var S,M,T;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <ModalDescription>
      <strong>Important:</strong> This action cannot be undone. Please make sure you have backed up your data before
      proceeding.
    </ModalDescription>
}`,...(T=(M=t.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var q,w,Y;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">
      <ModalDescription>Your account has been created successfully.</ModalDescription>
      <ModalDescription className="text-green-600">
        You can now access all features of the application.
      </ModalDescription>
    </div>
}`,...(Y=(w=o.parameters)==null?void 0:w.docs)==null?void 0:Y.source}}};var k,E,L;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ModalDescription className="space-y-2">
      <span>Before you proceed, please ensure:</span>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>All required fields are filled</li>
        <li>Your email address is verified</li>
        <li>You have read the documentation</li>
      </ul>
    </ModalDescription>
}`,...(L=(E=c.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var P,W,B;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: "Something went wrong. Please try again or contact support if the issue persists.",
    className: "text-red-600"
  }
}`,...(B=(W=l.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var C,A,I;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: "Your changes have been saved successfully!",
    className: "text-green-600"
  }
}`,...(I=(A=d.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var O,U,_;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    children: "This feature is currently in beta and may not work as expected.",
    className: "text-amber-600"
  }
}`,...(_=(U=u.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};const J=["Default","LongText","CustomStyle","WithLinks","WithEmphasis","MultipleDescriptions","WithList","ErrorDescription","SuccessDescription","WarningDescription"];export{n as CustomStyle,r as Default,l as ErrorDescription,a as LongText,o as MultipleDescriptions,d as SuccessDescription,u as WarningDescription,t as WithEmphasis,i as WithLinks,c as WithList,J as __namedExportsOrder,H as default};
