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
      id: 'integration-guide/consent/key-concepts',
      label: 'Conceptos clave',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/quickstart',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-templates',
      label: 'Crea plantillas de consentimiento',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-capture',
      label: 'Captura de consentimiento',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-query',
      label: 'Consulta los consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-revocation',
      label: 'Revocación de consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-api',
      label: 'Integración vía API',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/customization',
      label: 'Personaliza el estilo del widget',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/common-problems',
      label: 'Solución de problemas comunes',
    },
  ],
};

export default sidebar.consentSidebar;