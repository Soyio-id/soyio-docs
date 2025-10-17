import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  disclosureSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/disclosure/introduction',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/quickstart',
      label: 'Inicio rápido',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/templates',
      label: 'Crea plantillas',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/validate-identity',
      label: 'Valida una identidad obteniendo datos',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/account-and-id-reuse',
      label: 'Cuenta Soyio y reutilización de identidad',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/configuration',
      label: 'Configuración',
    },
  ],
};

export default sidebar.disclosureSidebar;
