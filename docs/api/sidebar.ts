import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: 'doc',
      id: 'api/soyio-api',
    },
    {
      type: 'category',
      label: 'Identities',
      items: [
        {
          type: 'doc',
          id: 'api/index-identities',
          label: 'Obtener todas las identidades',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/get-identity',
          label: 'Obtener una identidad específica',
          className: 'api-method get',
        },
      ],
    },
    {
      type: 'category',
      label: 'Validation attempts',
      items: [
        {
          type: 'doc',
          id: 'api/index-validation-attempts',
          label: 'Obtener todos los intentos de validación',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/get-validation-attempt',
          label: 'Obtener un flujo de validación específico',
          className: 'api-method get',
        },
      ],
    },
    {
      type: 'category',
      label: 'Auth attempts',
      items: [
        {
          type: 'doc',
          id: 'api/index-auth-attempts',
          label: 'Obtener todos los intentos de autenticación',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/get-auth-attempt',
          label: 'Obtener un intento de autenticación específico',
          className: 'api-method get',
        },
      ],
    },
    {
      type: 'category',
      label: 'Signature attempts',
      items: [
        {
          type: 'doc',
          id: 'api/create-signature-attempt',
          label: 'Crear un intento de firma',
          className: 'api-method post',
        },
        {
          type: 'doc',
          id: 'api/index-signature-attempts',
          label: 'Obtener todos los intentos de firma',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/get-signature-attempt',
          label: 'Obtener un intento de firma específico',
          className: 'api-method get',
        },
      ],
    },
    {
      type: 'category',
      label: 'Events',
      items: [
        {
          type: 'doc',
          id: 'api/index-events',
          label: 'Obtener todos los eventos',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/get-event',
          label: 'Obtener un evento específico',
          className: 'api-method get',
        },
      ],
    },
    {
      type: 'category',
      label: 'Signed documents',
      items: [
        {
          type: 'doc',
          id: 'api/index-signed-documents',
          label: 'Obtener todos los documentos firmados.',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/get-signed-document',
          label: 'Obtener un documento firmado.',
          className: 'api-method get',
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
