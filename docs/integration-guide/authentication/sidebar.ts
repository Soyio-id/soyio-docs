import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  authenticationSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/authentication/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/authentication/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/authentication/quickstart',
      label: 'Inicio rápido',
    },
  ],
};

export default sidebar.authenticationSidebar;