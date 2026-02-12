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
      id: 'integration-guide/disclosure/embedded-disclosure',
      label: 'Flujo embebido (iframe)',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/how-it-works',
      label: 'Cómo funciona',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/validation-levels',
      label: 'Niveles de validación',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/disclosure_templates',
      label: 'Crea plantillas',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/validate-identity',
      label: 'Valida una identidad obteniendo datos',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/disclosure-error-handling',
      label: 'Manejo de errores',
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
    {
      type: 'doc',
      id: 'integration-guide/disclosure/nfc-validation',
      label: 'Validación NFC',
    },
    {
      type: 'doc',
      id: 'integration-guide/disclosure/device-compatibility',
      label: 'Compatibilidad de dispositivos',
    },
  ],
};

export default sidebar.disclosureSidebar;
