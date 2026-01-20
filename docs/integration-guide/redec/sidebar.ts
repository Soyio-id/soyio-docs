import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  redecSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/redec/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/quickstart',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/data-subject-requests',
      label: 'Solicitudes de ejercicio de derecho',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/consent-registration',
      label: 'Registra consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/receipts',
      label: 'Recibos PDF',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/rdc30',
      label: 'Genera reportes RDC30',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/rdc40',
      label: 'Genera reportes RDC40',
    },
    {
      type: 'doc',
      id: 'integration-guide/redec/configuration',
      label: 'Configuración',
    },
  ],
};

export default sidebar.redecSidebar;
