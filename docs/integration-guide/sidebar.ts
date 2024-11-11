import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import conceptsSidebar from './concepts/sidebar';
import modulesSidebar from './modules/sidebar';

const sidebar: SidebarsConfig = {
  integrationSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/intro',
    },
    {
      type: 'doc',
      id: 'integration-guide/quickstart',
    },
    {
        type: 'category',
        label: 'Conceptos',
        items: conceptsSidebar,
        collapsed: false,
    },
    {
        type: 'category',
        label: 'Módulos',
        items: modulesSidebar,
        collapsed: false,
    },
    {
      type: 'doc',
      id: 'integration-guide/production',
    },
  ],
};

export default sidebar.integrationSidebar;
