import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  disclosureSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/disclosure/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/quickstart',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/disclosure',
      label: 'Cómo funciona',
    },
  ],
};

export default sidebar.disclosureSidebar;
