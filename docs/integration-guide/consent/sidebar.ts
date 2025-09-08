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
      id: 'integration-guide/consent/concept',
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
      label: 'Prepara una plantilla de solicitud',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-status',
      label: 'Consulta los consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-commit',
      label: 'Registrar varios consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-revocation',
      label: 'Revocación de consentimientos',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/customization',
      label: 'Personaliza el estilo del widget',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/consent-api',
      label: 'Captura consentimientos vía API',
    },
    {
      type: 'doc',
      id: 'integration-guide/consent/common-problems',
      label: 'Solución de problemas comunes',
    },
  ],
};

export default sidebar.consentSidebar;