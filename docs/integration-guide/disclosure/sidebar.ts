import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  disclosureSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/disclosure/verification',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/disclosure',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/quickstart',
      label: 'Inicio rápido',
    },
  ],
};

export default sidebar.disclosureSidebar;
