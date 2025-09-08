import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  privacyCenterSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/privacy-center/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/privacy-center/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/privacy-center/quickstart',
      label: 'Inicio rápido',
    },
  ],
};

export default sidebar.privacyCenterSidebar;