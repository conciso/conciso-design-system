try{
(()=>{var Pr=__STORYBOOK_API__,{ActiveTabs:zr,Consumer:Dr,ManagerContext:qr,Provider:Fr,RequestResponseError:Tr,Tag:Rr,addons:Z,combineParameters:Or,controlOrMetaKey:Ur,controlOrMetaSymbol:Er,eventMatchesShortcut:Zr,eventToShortcut:Gr,experimental_MockUniversalStore:Wr,experimental_UniversalStore:Ir,experimental_getStatusStore:Xr,experimental_getTestProviderStore:Nr,experimental_requestResponse:_r,experimental_useStatusStore:Kr,experimental_useTestProviderStore:Jr,experimental_useUniversalStore:Qr,getService:Yr,internal_checklistStore:$r,internal_fullStatusStore:t0,internal_fullTestProviderStore:e0,internal_universalChecklistStore:o0,internal_universalStatusStore:r0,internal_universalTestProviderStore:a0,isMacLike:s0,isShortcutTaken:l0,keyToSymbol:i0,merge:d0,mockChannel:n0,optionOrAltSymbol:h0,registerService:c0,shortcutMatchesShortcut:p0,shortcutToAriaKeyshortcuts:u0,shortcutToHumanString:w0,types:g0,useAddonState:v0,useArgTypes:x0,useArgs:f0,useChannel:k0,useGlobalTypes:m0,useGlobals:M0,useParameter:C0,useServiceCommand:B0,useServiceQuery:j0,useSharedState:y0,useStoryPrepared:A0,useStorybookApi:H0,useStorybookState:V0}=__STORYBOOK_API__;var z0=__REACT__,{Children:D0,Component:q0,Fragment:F0,Profiler:T0,PureComponent:R0,StrictMode:O0,Suspense:U0,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:E0,act:Z0,cloneElement:G0,createContext:W0,createElement:i,createFactory:I0,createRef:X0,forwardRef:N0,isValidElement:_0,lazy:K0,memo:J0,startTransition:Q0,unstable_act:Y0,useCallback:$0,useContext:t1,useDebugValue:e1,useDeferredValue:o1,useEffect:r1,useId:a1,useImperativeHandle:s1,useInsertionEffect:l1,useLayoutEffect:i1,useMemo:d1,useReducer:n1,useRef:h1,useState:c1,useSyncExternalStore:p1,useTransition:u1,version:w1}=__REACT__;var k1=__STORYBOOK_THEMING__,{CacheProvider:m1,ClassNames:M1,Global:C1,ThemeProvider:B1,background:j1,color:y1,convert:A1,create:g,createCache:H1,createGlobal:V1,createReset:S1,css:L1,darken:b1,ensure:P1,getPreferredColorScheme:z1,ignoreSsrWarning:D1,isPropValid:q1,jsx:F1,keyframes:T1,lighten:R1,srOnlyStyles:O1,srOnlyUnsetStyles:U1,styled:E1,themes:Z1,tokens:G1,typography:W1,useTheme:I1,withTheme:X1}=__STORYBOOK_THEMING__;var G={fontBase:"'Montserrat','Segoe UI',system-ui,-apple-system,sans-serif",fontCode:"'Courier New', monospace",brandTitle:"Conciso Design System",brandUrl:"https://github.com/conciso/conciso-design-system",brandTarget:"_self",appBorderRadius:8,inputBorderRadius:4},W=g({base:"light",...G,colorPrimary:"#00BEBE",colorSecondary:"#007575",appBg:"#F5F7F7",appContentBg:"#FFFFFF",appPreviewBg:"#FFFFFF",appHoverBg:"#E8EDED",appBorderColor:"#E8EDED",textColor:"#333E48",textInverseColor:"#FFFFFF",textMutedColor:"#5A7171",barBg:"#FFFFFF",barTextColor:"#4A6565",barSelectedColor:"#007575",barHoverColor:"#009E9E",buttonBg:"#F5F7F7",buttonBorder:"#C9D3D3",booleanBg:"#E8EDED",booleanSelectedBg:"#FFFFFF",inputBg:"#FFFFFF",inputBorder:"#C9D3D3",inputTextColor:"#333E48",brandImage:"./conciso/brand/logo-conciso.svg"}),I=g({base:"dark",...G,colorPrimary:"#00BEBE",colorSecondary:"#80DEDE",appBg:"#151A1F",appContentBg:"#28323D",appPreviewBg:"#151A1F",appHoverBg:"#2E3B46",appBorderColor:"#6F7A89",textColor:"#DDE9E9",textInverseColor:"#151A1F",textMutedColor:"#93B6B6",barBg:"#28323D",barTextColor:"#A6C6C6",barSelectedColor:"#80DEDE",barHoverColor:"#B3ECEC",buttonBg:"#28323D",buttonBorder:"#6F7A89",booleanBg:"#1E262E",booleanSelectedBg:"#28323D",inputBg:"#1E262E",inputBorder:"#6F7A89",inputTextColor:"#DDE9E9",brandImage:"./conciso/brand/logo-conciso-light.svg"});var v=`
<svg
  class="lucide lucide-app-window"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="2" y="4" width="20" height="16" rx="2" />
  <path d="M10 4v4" />
  <path d="M2 8h20" />
  <path d="M6 4v4" />
</svg>
`;var x=`
<svg
  class="lucide lucide-book-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v16" />
  <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
</svg>
`;var f=`
<svg
  class="lucide lucide-box"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
  <path d="m3.3 7 8.7 5 8.7-5" />
  <path d="M12 22V12" />
</svg>
`;var k=`
<svg
  class="lucide lucide-boxes"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
  <path d="m7 16.5-4.74-2.85" />
  <path d="m7 16.5 5-3" />
  <path d="M7 16.5v5.17" />
  <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
  <path d="m17 16.5-5-3" />
  <path d="m17 16.5 4.74-2.85" />
  <path d="M17 16.5v5.17" />
  <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
  <path d="M12 8 7.26 5.15" />
  <path d="m12 8 4.74-2.85" />
  <path d="M12 13.5V8" />
</svg>
`;var d=`
<svg
  class="lucide lucide-calendar-days"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v3" />
  <path d="M16 2v3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M3 9h18" />
  <path d="M8 13h.01" />
  <path d="M12 13h.01" />
  <path d="M16 13h.01" />
  <path d="M8 17h.01" />
  <path d="M12 17h.01" />
  <path d="M16 17h.01" />
</svg>
`;var m=`
<svg
  class="lucide lucide-chevrons-up-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m7 15 5 5 5-5" />
  <path d="m7 9 5-5 5 5" />
</svg>
`;var M=`
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`;var C=`
<svg
  class="lucide lucide-download"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`;var n=`
<svg
  class="lucide lucide-face-slightly-smiling"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 10V9" />
  <path d="M16.472 15a6 6 0 01-8.943 0" />
  <path d="M9 10V9" />
  <circle cx="12" cy="12" r="10" />
</svg>
`;var B=`
<svg
  class="lucide lucide-file-text"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M10 9H8" />
  <path d="M16 13H8" />
  <path d="M16 17H8" />
</svg>
`;var j=`
<svg
  class="lucide lucide-flag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
</svg>
`;var y=`
<svg
  class="lucide lucide-graduation-cap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
  <path d="M22 10v6" />
  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
</svg>
`;var s=`
<svg
  class="lucide lucide-grid-3x3"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M3 9h18" />
  <path d="M3 15h18" />
  <path d="M9 3v18" />
  <path d="M15 3v18" />
</svg>
`;var A=`
<svg
  class="lucide lucide-image"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <circle cx="9" cy="9" r="2" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
</svg>
`;var H=`
<svg
  class="lucide lucide-languages"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 8 6 6" />
  <path d="m4 14 6-6 2-3" />
  <path d="M2 5h12" />
  <path d="M7 2h1" />
  <path d="m22 22-5-10-5 10" />
  <path d="M14 18h6" />
</svg>
`;var h=`
<svg
  class="lucide lucide-layers"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
</svg>
`;var V=`
<svg
  class="lucide lucide-layout-grid"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="7" height="7" x="3" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="14" rx="1" />
  <rect width="7" height="7" x="3" y="14" rx="1" />
</svg>
`;var S=`
<svg
  class="lucide lucide-menu"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 5h16" />
  <path d="M4 12h16" />
  <path d="M4 19h16" />
</svg>
`;var L=`
<svg
  class="lucide lucide-message-circle-more"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  <path d="M8 12h.01" />
  <path d="M12 12h.01" />
  <path d="M16 12h.01" />
</svg>
`;var b=`
<svg
  class="lucide lucide-messages-square"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
</svg>
`;var P=`
<svg
  class="lucide lucide-monitor"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="14" x="2" y="3" rx="2" />
  <line x1="8" x2="16" y1="21" y2="21" />
  <line x1="12" x2="12" y1="17" y2="21" />
</svg>
`;var z=`
<svg
  class="lucide lucide-mouse-pointer-click"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 4.1 12 6" />
  <path d="m5.1 8-2.9-.8" />
  <path d="m6 12-1.9 2" />
  <path d="M7.2 2.2 8 5.1" />
  <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
</svg>
`;var c=`
<svg
  class="lucide lucide-newspaper"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 18h-5" />
  <path d="M18 14h-8" />
  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
  <rect width="8" height="4" x="10" y="6" rx="1" />
</svg>
`;var D=`
<svg
  class="lucide lucide-scan"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
</svg>
`;var q=`
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`;var F=`
<svg
  class="lucide lucide-smartphone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
  <path d="M12 18h.01" />
</svg>
`;var p=`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`;var u=`
<svg
  class="lucide lucide-square-code"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m10 9-3 3 3 3" />
  <path d="m14 15 3-3-3-3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
</svg>
`;var a=`
<svg
  class="lucide lucide-square-pen"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
</svg>
`;var T=`
<svg
  class="lucide lucide-sun"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>
`;var R=`
<svg
  class="lucide lucide-swatch-book"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" />
  <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" />
  <path d="M 7 17h.01" />
  <path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8" />
</svg>
`;var O=`
<svg
  class="lucide lucide-table"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v18" />
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M3 9h18" />
  <path d="M3 15h18" />
</svg>
`;var w=`
<svg
  class="lucide lucide-tag"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
`;var l=`
<svg
  class="lucide lucide-text-align-start"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H3" />
  <path d="M15 12H3" />
  <path d="M17 19H3" />
</svg>
`;var U=`
<svg
  class="lucide lucide-wrench"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
</svg>
`;var Mr=window.matchMedia?.("(prefers-color-scheme: dark)").matches??!1,Cr={"marke-markenrad--\xFCbersicht":p,"marke-brand-areas":V,"marke-logo":j,"marke-bildsprache--\xFCbersicht":A,"grundlagen-einrichtung--\xFCbersicht":U,"grundlagen-farben":R,"grundlagen-typografie":H,"grundlagen-spacing-grid--\xFCbersicht":s,"grundlagen-responsive--\xFCbersicht":F,"grundlagen-elevation--\xFCbersicht":f,"grundlagen-design-tokens--\xFCbersicht":k,"grundlagen-icons--\xFCbersicht":n,"grundlagen-barrierefreiheit--\xFCbersicht":q,"komponenten-buttons":z,"komponenten-chips-badges-pills":w,"komponenten-inputs-forms":a,"komponenten-dropdowns":m,"komponenten-buchungsformular":d,"komponenten-feedback":L,"komponenten-cards-teaser":h,"komponenten-call-to-action":C,"komponenten-tabelle":O,"komponenten-zitate-testimonials":b,"komponenten-code-block":u,"komponenten-slider-carousel":M,"komponenten-sektion":D,"komponenten-navigation":S,"komponenten-hero":P,"komponenten-footer":l,"komponenten-theme-umschalter":T,"seitenmuster-wissensbeitrag":B,"seitenmuster-beitrags\xFCbersicht--\xFCbersicht":c,"seitenmuster-veranstaltung--\xFCbersicht":d,"seitenmuster-veranstaltungs\xFCbersicht--\xFCbersicht":c,"seitenmuster-seminar-\xB7-training--\xFCbersicht":y,"seitenmuster-angebots-detailseite--\xFCbersicht":w,"beispielseiten-\xFCbersicht--\xFCbersicht":v,"referenzen-quellen--\xFCbersicht":x},$=16,Br=1;function jr(r){return r.slice(r.indexOf(">")+1,r.lastIndexOf("</svg>"))}function yr(r){return i("svg",{viewBox:"0 0 24 24",width:$,height:$,"aria-hidden":"true",focusable:"false",style:{flexShrink:0},fill:"none",stroke:"currentColor",strokeWidth:Br,strokeLinecap:"round",strokeLinejoin:"round",dangerouslySetInnerHTML:{__html:jr(r)}})}Z.setConfig({theme:Mr?I:W,sidebar:{collapsedRoots:["seitenmuster","beispielseiten","referenzen"],renderLabel:r=>{if(r.type==="root")return r.name;let E=Cr[r.id];if(!E)return r.name;let tt=yr(E);return i("span",{style:{display:"inline-flex",alignItems:"center",gap:6,minWidth:0,textIndent:0}},tt,i("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},r.name))}}});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
