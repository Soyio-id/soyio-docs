import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  consentSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/consent/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/quickstart',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-templates',
      label: 'Crea plantillas de consentimiento',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-capture',
      label: 'Captura de consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-query',
      label: 'Consulta de consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-management',
      label: 'Gestión de consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-api',
      label: 'Integración sin SDK',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/customization',
      label: 'Apariencia y comportamiento',
    },
  ],
};

export default sidebar.consentSidebar;