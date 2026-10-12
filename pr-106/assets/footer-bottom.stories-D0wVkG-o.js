import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{n as t,t as n}from"./footer-bottom.component-BYf9Xnl3.js";var r,i,a,o,s,c,l,u,d;function init_footer_bottom_stories(){return(init_footer_bottom_stories=e((()=>{t(),{within:r,expect:i}=__STORYBOOK_MODULE_TEST__,a=`M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`,o={title:`Komponenten/Footer/Unterer Teil`,component:n,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-2243`},layout:`fullscreen`,docs:{description:{component:"Unterer Footer-Teil (`.footer-btm`): dunkler Streifen mit Copyright, Rechts-Links und Social-Profilen. Social-Links über `socialLinks`, verifizierte Built-in-Icons (linkedin, youtube) via `platform`, beliebige weitere via eigenem `iconPath`. Wird in `<cds-footer>` unter den oberen Teil projiziert."}}},argTypes:{copyright:{control:`text`},version:{control:`text`}},args:{copyright:`© 2026 Conciso GmbH · Dortmund`,legalLinks:[{label:`Datenschutz`,href:`#`},{label:`Impressum`,href:`#`}],socialLinks:[{platform:`linkedin`,href:`#`},{platform:`youtube`,href:`#`}]}},s={},c={name:`Mit Version & Support`,args:{copyright:`© 2026 Conciso GmbH`,version:`Version 1.4.2`,support:{label:`Support`,href:`#`},socialLinks:[]}},l={name:`Eigene Social-Links`,args:{socialLinks:[{platform:`linkedin`,href:`https://www.linkedin.com/company/conciso`},{label:`GitHub`,href:`https://github.com/conciso`,iconPath:a}]}},u={name:`Doppelte Labels`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{legalLinks:[{label:`Datenschutz`,href:`#datenschutz-website`},{label:`Datenschutz`,href:`#datenschutz-bewerbung`}]},play:async({canvasElement:e})=>{await i(r(e).getAllByRole(`link`,{name:`Datenschutz`})).toHaveLength(2)}},d=[`Interaktiv`,`MitVersionSupport`,`EigeneSocialLinks`,`DoppelteLabels`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Mit Version & Support',
  // Für App-Footer: Versionsangabe hinter dem Copyright + Support-Link, ohne Social.
  // Deckt zugleich den &nbsp;·&nbsp;-Trenner vor der Version ab (prettier-ignore im
  // Template, weil beide &nbsp; direkt an der @if-Interpolation hängen).
  args: {
    copyright: '© 2026 Conciso GmbH',
    version: 'Version 1.4.2',
    support: {
      label: 'Support',
      href: '#'
    },
    socialLinks: []
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Eigene Social-Links',
  // Built-in (linkedin) + eigenes Icon per iconPath (GitHub) — plus gesetzte hrefs.
  args: {
    socialLinks: [{
      platform: 'linkedin',
      href: 'https://www.linkedin.com/company/conciso'
    }, {
      label: 'GitHub',
      href: 'https://github.com/conciso',
      iconPath: GITHUB_ICON
    }]
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Doppelte Labels',
  // Regressionstest: gleich beschriftete Links sind zulässig und dürfen das Rendern
  // nicht abbrechen (NG0955 bei Tracking per Label).
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    legalLinks: [{
      label: 'Datenschutz',
      href: '#datenschutz-website'
    }, {
      label: 'Datenschutz',
      href: '#datenschutz-bewerbung'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getAllByRole('link', {
      name: 'Datenschutz'
    })).toHaveLength(2);
  }
}`,...u.parameters?.docs?.source}}}})))()}init_footer_bottom_stories();export{u as DoppelteLabels,l as EigeneSocialLinks,s as Interaktiv,c as MitVersionSupport,d as __namedExportsOrder,o as default};