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
