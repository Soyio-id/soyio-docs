import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  signatureSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/signature/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/signature/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/signature/quickstart',
      label: 'Inicio rápido',
    },
  ],
};

export default sidebar.signatureSidebar;
