import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  rightsManagementSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/rights-management/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/rights-management/quickstart',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'integration-guide/rights-management/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/rights-management/requests-intake',
      label: 'Recibe solicitudes de derecho',
    },
    {
      type: 'doc',
      id: 'integration-guide/rights-management/requests-management',
      label: 'Responde a las solicitudes de derecho',
    },
    {
      type: 'doc',
      id: 'integration-guide/rights-management/requests-validation',
      label: 'Validación de la identidad',
    },
    {
      type: 'doc',
      id: 'integration-guide/rights-management/notifications',
      label: 'Configura las notificaciones',
    },
  ],
};

export default sidebar.rightsManagementSidebar;
