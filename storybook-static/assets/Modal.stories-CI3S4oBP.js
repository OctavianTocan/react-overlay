import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as we}from"./index-BWu4c2F4.js";import{M as Ae}from"./ModalWrapper-BLA6eiMM.js";import{c as qe}from"./index-DOIGBiOF.js";import{M as v,C as Fe,a as Ve,I as Pe}from"./ModalHeader-Bt6WNlu-.js";import{M as D}from"./ModalDescription-BqZgFI1Q.js";import{c as Ye}from"./createLucideIcon-WkQoaPtN.js";import"./DismissButton-CBpyeAmX.js";import"./index-B8jaNLVP.js";import"./useBodyScrollLock-CuVZG8Bd.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=Ye("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),Ge={sm:"max-w-sm",md:"max-w-md",lg:"max-w-lg",xl:"max-w-xl",full:"max-w-[90vw]"};function w({open:t,onDismiss:a,isOpen:j,onClose:o,children:je,size:ve="md",className:Ce,overlayClassName:Te,padding:ze=!0,closeOnOverlayClick:Be=!0,closeOnEscape:Se=!0,testId:ke,showDismissButton:Oe=!0,dismissButtonProps:Ee,ariaLabelledBy:Le,ariaDescribedBy:We,ariaLabel:Ie}){const He=qe("bg-white rounded-2xl shadow-xl w-full",Ge[ve],ze&&"p-6",Ce);return e.jsx(Ae,{open:t,onDismiss:a,isOpen:j,onClose:o,contentClassName:He,overlayClassName:Te,closeOnOverlayClick:Be,closeOnEscape:Se,testId:ke,showDismissButton:Oe,dismissButtonProps:Ee,ariaLabelledBy:Le,ariaDescribedBy:We,ariaLabel:Ie,children:je})}w.__docgenInfo={description:`Modal Component

A high-level modal with sensible defaults. Uses ModalWrapper internally
for consistent behavior across the app.

@example Basic usage
\`\`\`tsx
<Modal open={isOpen} onDismiss={handleClose}>
  <div>Your content here</div>
</Modal>
\`\`\`

@example With size
\`\`\`tsx
<Modal open={isOpen} onDismiss={handleClose} size="lg">
  <div>Larger modal content</div>
</Modal>
\`\`\`

@example Without default padding
\`\`\`tsx
<Modal open={isOpen} onDismiss={handleClose} padding={false}>
  <div className="custom-padding">Custom padded content</div>
</Modal>
\`\`\``,methods:[],displayName:"Modal",props:{size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl" | "full"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'},{name:"literal",value:'"full"'}]},description:"Modal size preset. Default: 'md'",defaultValue:{value:"'md'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom class for the content container"},padding:{required:!1,tsType:{name:"boolean"},description:"Whether to add default padding. Default: true",defaultValue:{value:"true",computed:!1}},closeOnOverlayClick:{defaultValue:{value:"true",computed:!1},required:!1},closeOnEscape:{defaultValue:{value:"true",computed:!1},required:!1},showDismissButton:{defaultValue:{value:"true",computed:!1},required:!1}},composes:["Omit"]};const as={title:"Components/Modal",component:w,tags:["autodocs"],argTypes:{size:{control:"select",options:["sm","md","lg","xl","full"],description:"Modal size preset"},padding:{control:"boolean",description:"Whether to add default padding"},closeOnOverlayClick:{control:"boolean",description:"Whether clicking outside closes the modal"},closeOnEscape:{control:"boolean",description:"Whether Escape key closes the modal"},showDismissButton:{control:"boolean",description:"Whether to show the dismiss (X) button"},open:{control:"boolean",description:"Whether the modal is open"}},parameters:{layout:"centered"}};function s({children:t,...a}){const[j,o]=we.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>o(!0),className:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Open Modal"}),e.jsx(w,{open:j,onDismiss:()=>o(!1),...a,children:t})]})}const r={render:()=>e.jsxs(s,{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Modal Title"}),e.jsx("p",{className:"text-gray-600",children:"This is a basic modal with default settings. Click outside or press Escape to close."})]})},l={render:()=>e.jsxs(s,{size:"sm",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Small Modal"}),e.jsx("p",{className:"text-gray-600",children:"This modal uses the small size preset (max-w-sm)."})]})},n={render:()=>e.jsxs(s,{size:"md",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Medium Modal"}),e.jsx("p",{className:"text-gray-600",children:"This modal uses the medium size preset (max-w-md). This is the default size."})]})},i={render:()=>e.jsxs(s,{size:"lg",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Large Modal"}),e.jsx("p",{className:"text-gray-600",children:"This modal uses the large size preset (max-w-lg). Good for forms and detailed content."})]})},d={render:()=>e.jsxs(s,{size:"xl",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Extra Large Modal"}),e.jsx("p",{className:"text-gray-600",children:"This modal uses the extra large size preset (max-w-xl). Ideal for complex layouts."})]})},c={render:()=>e.jsxs(s,{size:"full",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Full Modal"}),e.jsx("p",{className:"text-gray-600",children:"This modal uses the full size preset (max-w-[90vw]). Takes up most of the viewport."})]})},m={render:()=>e.jsxs(s,{showDismissButton:!0,children:[e.jsx(v,{icon:e.jsx(Pe,{className:"w-4 h-4 text-white"}),title:"Information"}),e.jsx(D,{children:"This modal uses the ModalHeader component with an icon badge and title."})]})},u={render:()=>e.jsxs(s,{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Important Notice"}),e.jsx(D,{children:"This modal uses the ModalDescription component for styled description text. It provides consistent typography and spacing."})]})},p={render:()=>e.jsxs(s,{showDismissButton:!0,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"With Dismiss Button"}),e.jsx("p",{className:"text-gray-600",children:"This modal shows the built-in dismiss button in the top-right corner. The button uses the subtle variant by default."})]})},h={render:()=>e.jsxs(s,{showDismissButton:!0,dismissButtonProps:{variant:"default",size:20,"aria-label":"Close dialog"},children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Custom Dismiss Button"}),e.jsx("p",{className:"text-gray-600",children:"This modal uses custom dismiss button props: default variant (with border), larger size, and custom aria-label."})]})},x={render:()=>e.jsxs(s,{padding:!1,children:[e.jsx("div",{className:"p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl",children:e.jsx("h2",{className:"text-lg font-semibold",children:"Custom Header"})}),e.jsx("div",{className:"p-6",children:e.jsx("p",{className:"text-gray-600",children:"This modal has padding disabled, allowing for custom layouts like this full-width header."})})]})},g={render:()=>e.jsxs(s,{closeOnOverlayClick:!1,showDismissButton:!0,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Persistent Modal"}),e.jsx("p",{className:"text-gray-600",children:"This modal cannot be closed by clicking the overlay. You must use the dismiss button or press Escape."})]})},b={render:()=>e.jsxs(s,{closeOnEscape:!1,showDismissButton:!0,children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-2",children:"No Escape Close"}),e.jsx("p",{className:"text-gray-600",children:"This modal cannot be closed with the Escape key. Click outside or use the dismiss button."})]})},f={render:()=>e.jsxs(s,{ariaLabel:"Confirmation dialog",ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-description",children:[e.jsx("h2",{id:"modal-title",className:"text-lg font-semibold text-gray-900 mb-2",children:"Accessible Modal"}),e.jsx("p",{id:"modal-description",className:"text-gray-600",children:"This modal uses aria attributes for improved accessibility: ariaLabel, ariaLabelledBy, and ariaDescribedBy."})]})},y={render:()=>e.jsxs(s,{className:"bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200",overlayClassName:"bg-indigo-900/60",children:[e.jsx("h2",{className:"text-lg font-semibold text-indigo-900 mb-2",children:"Custom Styled Modal"}),e.jsx("p",{className:"text-indigo-700",children:"This modal uses custom className and overlayClassName for a unique look."})]})},N={render:()=>{const[t,a]=we.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>a(!0),className:"px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2",children:[e.jsx(_e,{className:"w-4 h-4"}),"Delete Item"]}),e.jsxs(w,{open:t,onDismiss:()=>a(!1),size:"sm",showDismissButton:!0,ariaLabelledBy:"delete-title",ariaDescribedBy:"delete-description",children:[e.jsx(v,{icon:e.jsx(Fe,{className:"w-4 h-4 text-white"}),title:"Confirm Delete",iconBadgeClassName:"bg-red-600"}),e.jsx(D,{className:"mb-4",children:e.jsx("span",{id:"delete-description",children:"Are you sure you want to delete this item? This action cannot be undone."})}),e.jsxs("div",{className:"flex gap-3 justify-end",children:[e.jsx("button",{onClick:()=>a(!1),className:"px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",children:"Cancel"}),e.jsx("button",{onClick:()=>{alert("Deleted!"),a(!1)},className:"px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors",children:"Delete"})]})]})]})}},M={render:()=>e.jsxs(s,{showDismissButton:!0,children:[e.jsx(v,{icon:e.jsx(Ve,{className:"w-4 h-4 text-white"}),title:"Success!",iconBadgeClassName:"bg-green-600"}),e.jsx(D,{children:"Your changes have been saved successfully."}),e.jsx("div",{className:"mt-4",children:e.jsx("button",{className:"w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors",children:"Continue"})})]})};var C,T,z;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <ModalDemo>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Modal Title</h2>
      <p className="text-gray-600">
        This is a basic modal with default settings. Click outside or press Escape to close.
      </p>
    </ModalDemo>
}`,...(z=(T=r.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var B,S,k;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <ModalDemo size="sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Small Modal</h2>
      <p className="text-gray-600">This modal uses the small size preset (max-w-sm).</p>
    </ModalDemo>
}`,...(k=(S=l.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var O,E,L;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <ModalDemo size="md">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Medium Modal</h2>
      <p className="text-gray-600">This modal uses the medium size preset (max-w-md). This is the default size.</p>
    </ModalDemo>
}`,...(L=(E=n.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var W,I,H;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <ModalDemo size="lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Large Modal</h2>
      <p className="text-gray-600">
        This modal uses the large size preset (max-w-lg). Good for forms and detailed content.
      </p>
    </ModalDemo>
}`,...(H=(I=i.parameters)==null?void 0:I.docs)==null?void 0:H.source}}};var A,q,F;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <ModalDemo size="xl">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Extra Large Modal</h2>
      <p className="text-gray-600">
        This modal uses the extra large size preset (max-w-xl). Ideal for complex layouts.
      </p>
    </ModalDemo>
}`,...(F=(q=d.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var V,P,Y;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <ModalDemo size="full">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Full Modal</h2>
      <p className="text-gray-600">
        This modal uses the full size preset (max-w-[90vw]). Takes up most of the viewport.
      </p>
    </ModalDemo>
}`,...(Y=(P=c.parameters)==null?void 0:P.docs)==null?void 0:Y.source}}};var _,G,R;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <ModalDemo showDismissButton>
      <ModalHeader icon={<Info className="w-4 h-4 text-white" />} title="Information" />
      <ModalDescription>This modal uses the ModalHeader component with an icon badge and title.</ModalDescription>
    </ModalDemo>
}`,...(R=(G=m.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};var U,X,J;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <ModalDemo>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h2>
      <ModalDescription>
        This modal uses the ModalDescription component for styled description text. It provides consistent typography
        and spacing.
      </ModalDescription>
    </ModalDemo>
}`,...(J=(X=u.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};var K,Q,Z;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <ModalDemo showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Dismiss Button</h2>
      <p className="text-gray-600">
        This modal shows the built-in dismiss button in the top-right corner. The button uses the subtle variant by
        default.
      </p>
    </ModalDemo>
}`,...(Z=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var $,ee,se;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <ModalDemo showDismissButton dismissButtonProps={{
    variant: "default",
    size: 20,
    "aria-label": "Close dialog"
  }}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Dismiss Button</h2>
      <p className="text-gray-600">
        This modal uses custom dismiss button props: default variant (with border), larger size, and custom aria-label.
      </p>
    </ModalDemo>
}`,...(se=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var ae,te,oe;x.parameters={...x.parameters,docs:{...(ae=x.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <ModalDemo padding={false}>
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
        <h2 className="text-lg font-semibold">Custom Header</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600">
          This modal has padding disabled, allowing for custom layouts like this full-width header.
        </p>
      </div>
    </ModalDemo>
}`,...(oe=(te=x.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var re,le,ne;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <ModalDemo closeOnOverlayClick={false} showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Persistent Modal</h2>
      <p className="text-gray-600">
        This modal cannot be closed by clicking the overlay. You must use the dismiss button or press Escape.
      </p>
    </ModalDemo>
}`,...(ne=(le=g.parameters)==null?void 0:le.docs)==null?void 0:ne.source}}};var ie,de,ce;b.parameters={...b.parameters,docs:{...(ie=b.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <ModalDemo closeOnEscape={false} showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">No Escape Close</h2>
      <p className="text-gray-600">
        This modal cannot be closed with the Escape key. Click outside or use the dismiss button.
      </p>
    </ModalDemo>
}`,...(ce=(de=b.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var me,ue,pe;f.parameters={...f.parameters,docs:{...(me=f.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <ModalDemo ariaLabel="Confirmation dialog" ariaLabelledBy="modal-title" ariaDescribedBy="modal-description">
      <h2 id="modal-title" className="text-lg font-semibold text-gray-900 mb-2">
        Accessible Modal
      </h2>
      <p id="modal-description" className="text-gray-600">
        This modal uses aria attributes for improved accessibility: ariaLabel, ariaLabelledBy, and ariaDescribedBy.
      </p>
    </ModalDemo>
}`,...(pe=(ue=f.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var he,xe,ge;y.parameters={...y.parameters,docs:{...(he=y.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <ModalDemo className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200" overlayClassName="bg-indigo-900/60">
      <h2 className="text-lg font-semibold text-indigo-900 mb-2">Custom Styled Modal</h2>
      <p className="text-indigo-700">This modal uses custom className and overlayClassName for a unique look.</p>
    </ModalDemo>
}`,...(ge=(xe=y.parameters)==null?void 0:xe.docs)==null?void 0:ge.source}}};var be,fe,ye;N.parameters={...N.parameters,docs:{...(be=N.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Delete Item
        </button>
        <Modal open={open} onDismiss={() => setOpen(false)} size="sm" showDismissButton ariaLabelledBy="delete-title" ariaDescribedBy="delete-description">
          <ModalHeader icon={<AlertCircle className="w-4 h-4 text-white" />} title="Confirm Delete" iconBadgeClassName="bg-red-600" />
          <ModalDescription className="mb-4">
            <span id="delete-description">
              Are you sure you want to delete this item? This action cannot be undone.
            </span>
          </ModalDescription>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => {
            alert("Deleted!");
            setOpen(false);
          }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </Modal>
      </>;
  }
}`,...(ye=(fe=N.parameters)==null?void 0:fe.docs)==null?void 0:ye.source}}};var Ne,Me,De;M.parameters={...M.parameters,docs:{...(Ne=M.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: () => <ModalDemo showDismissButton>
      <ModalHeader icon={<CheckCircle className="w-4 h-4 text-white" />} title="Success!" iconBadgeClassName="bg-green-600" />
      <ModalDescription>Your changes have been saved successfully.</ModalDescription>
      <div className="mt-4">
        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Continue
        </button>
      </div>
    </ModalDemo>
}`,...(De=(Me=M.parameters)==null?void 0:Me.docs)==null?void 0:De.source}}};const ts=["Default","SizeSmall","SizeMedium","SizeLarge","SizeExtraLarge","SizeFull","WithHeader","WithDescription","WithDismissButton","CustomDismissButton","NoPadding","NoCloseOnOverlay","NoCloseOnEscape","WithAccessibility","CustomStyling","FullExample","SuccessModal"];export{h as CustomDismissButton,y as CustomStyling,r as Default,N as FullExample,b as NoCloseOnEscape,g as NoCloseOnOverlay,x as NoPadding,d as SizeExtraLarge,c as SizeFull,i as SizeLarge,n as SizeMedium,l as SizeSmall,M as SuccessModal,f as WithAccessibility,u as WithDescription,p as WithDismissButton,m as WithHeader,ts as __namedExportsOrder,as as default};
