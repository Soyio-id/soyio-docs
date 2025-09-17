import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  introductionSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/main/overview',
      label: 'Ecosistema Soyio',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/general-concepts',
      label: 'Conceptos generales',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/evidence-traceability',
      label: 'Evidencia y trazabilidad',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/taxonomy',
      label: 'Taxonomía Soyio',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/company-configuration',
      label: 'Configuración de compañía',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/sandbox',
      label: 'Modo prueba (sandbox)',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/production',
      label: 'Paso a producción',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/security-privacy',
      label: 'Seguridad y privacidad',
    },
    {
      type: 'doc',
      id: 'integration-guide/main/glossary',
      label: 'Glosario',
    },
  ],
};

export default sidebar.introductionSidebar;
