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
      id: 'api/pagination',
    },
    {
      type: 'doc',
      id: 'api/errors',
    },
    {
      type: 'doc',
      id: 'api/webhooks',
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
