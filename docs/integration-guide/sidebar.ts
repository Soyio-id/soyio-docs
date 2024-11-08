import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import conceptsSidebar from './concepts/sidebar';
import productsSidebar from './products/sidebar';

const sidebar: SidebarsConfig = {
  integrationsidebar: [
    {
      type: 'doc',
      id: 'integration-guide/intro',
    },
    {
      type: 'doc',
      id: 'integration-guide/quickstart',
    },
    {
      type: 'doc',
      id: 'integration-guide/sandbox-mode',
    },
    {
      type: 'doc',
      id: 'integration-guide/production',
    },
    {
        type: 'category',
        label: 'Conceptos',
        items: conceptsSidebar,
        collapsed: false,
    },
    {
        type: 'category',
        label: 'Productos',
        items: productsSidebar,
        collapsed: false,
    },
  ],
};

export default sidebar.integrationsidebar;