import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import consentSidebar from './consent/sidebar';
import privacyCenterSidebar from './privacy-center/sidebar';
import introductionSidebar from './main/sidebar';
import disclosureSidebar from './disclosure/sidebar';
import signatureSidebar from './signature/sidebar';
import authenticationSidebar from './authentication/sidebar';
import ratSidebar from './rat/sidebar';

const sidebar: SidebarsConfig = {
  integrationSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/intro',
    },
    {
      type: 'category',
      label: 'General',
      items: introductionSidebar,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Consentimiento',
      items: consentSidebar,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Centro de privacidad',
      items: privacyCenterSidebar,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'RAT AI',
      items: ratSidebar,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Verificación de identidad',
      items: disclosureSidebar,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Autenticación',
      items: authenticationSidebar,
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Firma electrónica',
      items: signatureSidebar,
      collapsed: true,
    },
  ],
};

export default sidebar.integrationSidebar;
