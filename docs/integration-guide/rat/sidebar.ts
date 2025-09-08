import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  ratSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/rat/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/rat/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/rat/quickstart',
      label: 'Inicio rápido',
    },
  ],
};

export default sidebar.ratSidebar;
