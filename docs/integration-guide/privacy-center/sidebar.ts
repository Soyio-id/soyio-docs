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
      id: 'integration-guide/privacy-center/functionalities',
      label: 'Funcionalidades y modos',
    },
    {
      type: 'doc',
      id: 'integration-guide/privacy-center/customization',
      label: 'Perzonaliza la apariencia',
    },
  ],
};

export default sidebar.privacyCenterSidebar;