import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import consentSidebar from './consent/sidebar';
import rightsManagementSidebar from './rights-management/sidebar';
import privacyCenterSidebar from './privacy-center/sidebar';
import disclosureSidebar from './disclosure/sidebar';
import signatureSidebar from './signature/sidebar';
import authenticationSidebar from './authentication/sidebar';

const sidebar: SidebarsConfig = {
  integrationSidebar: [
    {
      type: 'doc',
      id: 'integration-guide/intro',
    },
    {
      type: 'html',
      value: '<div style="margin: 1.125rem 0;"></div>',
    },
    {
      type: 'doc',
      id: 'integration-guide/general-concepts',
      label: 'Conceptos generales',
    },
    {
      type: 'doc',
      id: 'integration-guide/evidence-traceability',
      label: 'Evidencia y trazabilidad',
    },
    {
      type: 'doc',
      id: 'integration-guide/security-privacy',
      label: 'Seguridad y privacidad',
    },
    {
      type: 'doc',
      id: 'integration-guide/taxonomy',
      label: 'Taxonomía',
    },
    {
      type: 'doc',
      id: 'integration-guide/glossary',
      label: 'Glosario',
    },
    {
      type: 'html',
      value: '<div style="margin: 1.125rem 0;"></div>',
    },
    {
      type: 'doc',
      id: 'integration-guide/company-configuration',
      label: 'Configuración',
    },
    {
      type: 'doc',
      id: 'integration-guide/sandbox',
      label: 'Pruebas en sandbox',
    },
    {
      type: 'doc',
      id: 'integration-guide/production',
      label: 'Paso a producción',
    },
    {
      type: 'html',
      value: '<div style="margin-top: 1.25rem; margin-bottom: 0.25rem;"><span style="font-size: 0.8rem; color: var(--ifm-color-gray-600); padding-left: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Módulos y funcionalidades</span></div>',
    },
    {
      type: 'category',
      label: 'Consentimiento',
      items: consentSidebar,
      collapsed: true,
      link: {type: 'doc', id: 'integration-guide/consent/introduction'},
    },
    {
      type: 'category',
      label: 'Gestión de derechos',
      items: rightsManagementSidebar,
      collapsed: true,
      link: {type: 'doc', id: 'integration-guide/rights-management/introduction'},
    },
    {
      type: 'category',
      label: 'Centro de privacidad',
      items: privacyCenterSidebar,
      collapsed: true,
      link: {type: 'doc', id: 'integration-guide/privacy-center/introduction'},
    },
    {
      type: 'category',
      label: 'Verificación de identidad',
      items: disclosureSidebar,
      collapsed: true,
      link: {type: 'doc', id: 'integration-guide/disclosure/introduction'},
    },
    {
      type: 'category',
      label: 'Autenticación',
      items: authenticationSidebar,
      collapsed: true,
      link: {type: 'doc', id: 'integration-guide/authentication/introduction'},
    },
    {
      type: 'category',
      label: 'Firma electrónica',
      items: signatureSidebar,
      collapsed: true,
      link: {type: 'doc', id: 'integration-guide/signature/introduction'},
    },
    {
      type: 'html',
      value: '<div style="margin: 3rem 0;"></div>',
    },
  ],
};

export default sidebar.integrationSidebar;
