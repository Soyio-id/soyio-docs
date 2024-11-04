import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import resourcesSidebar from './resources/sidebar';

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: 'doc',
      id: 'api/intro',
    },
    {
      type: 'doc',
      id: 'api/authentication',
    },

    {
      type: 'doc',
      id: 'api/pagination-and-filters',
    },
    {
      type: 'doc',
      id: 'api/sandbox-mode',
    },
    {
      type: 'doc',
      id: 'api/webhooks',
    },
    {
      type: 'doc',
      id: 'api/errors',
    },
    {
      type: 'category',
      label: 'Recursos',
      items: resourcesSidebar,
      collapsed: false,
    },
  ],
};

export default sidebar.apisidebar;
