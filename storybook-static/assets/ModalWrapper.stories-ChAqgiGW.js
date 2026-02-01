import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as H}from"./index-BWu4c2F4.js";import{M as X}from"./ModalWrapper-BLA6eiMM.js";import"./index-DOIGBiOF.js";import"./DismissButton-CBpyeAmX.js";import"./index-B8jaNLVP.js";import"./createLucideIcon-WkQoaPtN.js";import"./useBodyScrollLock-CuVZG8Bd.js";const ae={title:"Components/ModalWrapper",component:X,tags:["autodocs"],argTypes:{closeOnOverlayClick:{control:"boolean",description:"Whether clicking outside closes the modal"},closeOnEscape:{control:"boolean",description:"Whether Escape key closes the modal"},showDismissButton:{control:"boolean",description:"Whether to show the dismiss (X) button"},scrollable:{control:"boolean",description:"Whether to apply scrollbar styling to content"},testId:{control:"text",description:"Test ID for the overlay"}},parameters:{layout:"centered"}};function s({children:u,...a}){const[G,h]=H.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>h(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Open Modal"}),e.jsx(X,{open:G,onDismiss:()=>h(!1),...a,children:u})]})}const t={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"ModalWrapper Basic"}),e.jsx("p",{className:"text-gray-600",children:"ModalWrapper is the low-level component that handles overlay, animations, and keyboard events. You must provide your own content styling."})]})},o={render:()=>e.jsxs(s,{contentClassName:"bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-white",children:[e.jsx("h2",{className:"text-xl font-bold mb-3",children:"Custom Content Class"}),e.jsx("p",{className:"text-purple-100",children:"The contentClassName prop allows you to fully customize the modal container styling. This example uses a gradient background and custom border radius."})]})},r={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",overlayClassName:"bg-blue-900/80",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Overlay"}),e.jsx("p",{className:"text-gray-600",children:"The overlayClassName prop lets you customize the backdrop. This example uses a blue-tinted overlay instead of the default black."})]})},l={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full max-h-[400px] overflow-y-auto",scrollable:!0,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Scrollable Content"}),e.jsx("div",{className:"space-y-4",children:Array.from({length:10}).map((u,a)=>e.jsxs("p",{className:"text-gray-600",children:["Paragraph ",a+1,": Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]},a))})]})},n={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",scrollable:!1,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Non-Scrollable"}),e.jsx("p",{className:"text-gray-600",children:"When scrollable is false, the data-ro-scroll attribute is not added, so custom scrollbar styling won't be applied."})]})},d={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",testId:"custom-modal-overlay",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Test ID"}),e.jsx("p",{className:"text-gray-600",children:'This modal uses testId="custom-modal-overlay" for testing purposes. Inspect the DOM to see the data-testid attribute.'})]})},i={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",showDismissButton:!0,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"With Dismiss Button"}),e.jsx("p",{className:"text-gray-600",children:"ModalWrapper can also show a dismiss button. Unlike Modal, you need to explicitly enable it with showDismissButton."})]})},m={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",showDismissButton:!0,dismissButtonProps:{variant:"default",position:"absolute top-4 right-4 z-10",size:16},children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Dismiss Button"}),e.jsx("p",{className:"text-gray-600",children:"You can customize the dismiss button with dismissButtonProps. This example uses the default variant and custom positioning."})]})},c={render:()=>e.jsxs(s,{contentClassName:"bg-white rounded-2xl shadow-xl p-6 max-w-md w-full",ariaLabel:"Example dialog",ariaLabelledBy:"wrapper-title",ariaDescribedBy:"wrapper-desc",children:[e.jsx("h2",{id:"wrapper-title",className:"text-lg font-semibold text-gray-900 mb-2",children:"Accessible Modal Wrapper"}),e.jsx("p",{id:"wrapper-desc",className:"text-gray-600",children:"ModalWrapper supports all ARIA attributes: ariaLabel, ariaLabelledBy, and ariaDescribedBy for proper screen reader support."})]})},p={render:()=>e.jsxs(s,{contentClassName:"bg-gray-900 rounded-none shadow-2xl p-8 max-w-xl w-full border-4 border-yellow-400",overlayClassName:"bg-black/90",showDismissButton:!0,dismissButtonProps:{variant:"subtle",className:"text-yellow-400 hover:text-yellow-300"},children:[e.jsx("h2",{className:"text-2xl font-bold text-yellow-400 mb-4",children:"Fully Customized"}),e.jsx("p",{className:"text-gray-300",children:"ModalWrapper is designed to be the building block for custom modal implementations. You have full control over every aspect of the appearance."}),e.jsxs("div",{className:"mt-6 flex gap-4",children:[e.jsx("button",{className:"px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-300 transition-colors",children:"Primary Action"}),e.jsx("button",{className:"px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded hover:bg-yellow-400/10 transition-colors",children:"Secondary"})]})]})};var x,b,g;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">ModalWrapper Basic</h2>
      <p className="text-gray-600">
        ModalWrapper is the low-level component that handles overlay, animations, and keyboard events. You must provide
        your own content styling.
      </p>
    </ModalWrapperDemo>
}`,...(g=(b=t.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var y,w,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-white">
      <h2 className="text-xl font-bold mb-3">Custom Content Class</h2>
      <p className="text-purple-100">
        The contentClassName prop allows you to fully customize the modal container styling. This example uses a
        gradient background and custom border radius.
      </p>
    </ModalWrapperDemo>
}`,...(f=(w=o.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var N,C,v;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" overlayClassName="bg-blue-900/80">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Overlay</h2>
      <p className="text-gray-600">
        The overlayClassName prop lets you customize the backdrop. This example uses a blue-tinted overlay instead of
        the default black.
      </p>
    </ModalWrapperDemo>
}`,...(v=(C=r.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var W,D,M;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full max-h-[400px] overflow-y-auto" scrollable>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Scrollable Content</h2>
      <div className="space-y-4">
        {Array.from({
        length: 10
      }).map((_, i) => <p key={i} className="text-gray-600">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>)}
      </div>
    </ModalWrapperDemo>
}`,...(M=(D=l.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var j,B,S;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" scrollable={false}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Non-Scrollable</h2>
      <p className="text-gray-600">
        When scrollable is false, the data-ro-scroll attribute is not added, so custom scrollbar styling won't be
        applied.
      </p>
    </ModalWrapperDemo>
}`,...(S=(B=n.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var k,T,z;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" testId="custom-modal-overlay">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Test ID</h2>
      <p className="text-gray-600">
        This modal uses testId="custom-modal-overlay" for testing purposes. Inspect the DOM to see the data-testid
        attribute.
      </p>
    </ModalWrapperDemo>
}`,...(z=(T=d.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var I,A,O;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Dismiss Button</h2>
      <p className="text-gray-600">
        ModalWrapper can also show a dismiss button. Unlike Modal, you need to explicitly enable it with
        showDismissButton.
      </p>
    </ModalWrapperDemo>
}`,...(O=(A=i.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var L,P,E;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" showDismissButton dismissButtonProps={{
    variant: "default",
    position: "absolute top-4 right-4 z-10",
    size: 16
  }}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Dismiss Button</h2>
      <p className="text-gray-600">
        You can customize the dismiss button with dismissButtonProps. This example uses the default variant and custom
        positioning.
      </p>
    </ModalWrapperDemo>
}`,...(E=(P=m.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var Y,F,_;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" ariaLabel="Example dialog" ariaLabelledBy="wrapper-title" ariaDescribedBy="wrapper-desc">
      <h2 id="wrapper-title" className="text-lg font-semibold text-gray-900 mb-2">
        Accessible Modal Wrapper
      </h2>
      <p id="wrapper-desc" className="text-gray-600">
        ModalWrapper supports all ARIA attributes: ariaLabel, ariaLabelledBy, and ariaDescribedBy for proper screen
        reader support.
      </p>
    </ModalWrapperDemo>
}`,...(_=(F=c.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var R,q,U;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <ModalWrapperDemo contentClassName="bg-gray-900 rounded-none shadow-2xl p-8 max-w-xl w-full border-4 border-yellow-400" overlayClassName="bg-black/90" showDismissButton dismissButtonProps={{
    variant: "subtle",
    className: "text-yellow-400 hover:text-yellow-300"
  }}>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Fully Customized</h2>
      <p className="text-gray-300">
        ModalWrapper is designed to be the building block for custom modal implementations. You have full control over
        every aspect of the appearance.
      </p>
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-300 transition-colors">
          Primary Action
        </button>
        <button className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded hover:bg-yellow-400/10 transition-colors">
          Secondary
        </button>
      </div>
    </ModalWrapperDemo>
}`,...(U=(q=p.parameters)==null?void 0:q.docs)==null?void 0:U.source}}};const te=["Default","WithContentClass","WithOverlayClass","Scrollable","NotScrollable","CustomTestId","WithDismissButton","CustomDismissButton","WithAccessibility","FullyCustomized"];export{m as CustomDismissButton,d as CustomTestId,t as Default,p as FullyCustomized,n as NotScrollable,l as Scrollable,c as WithAccessibility,o as WithContentClass,i as WithDismissButton,r as WithOverlayClass,te as __namedExportsOrder,ae as default};
