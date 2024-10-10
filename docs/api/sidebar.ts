import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import resourcesSidebar from './resources/sidebar';

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: 'category',
      label: 'Recursos',
      items: resourcesSidebar,
      collapsed: false,
    },
  ],
};

export default sidebar.apisidebar;
