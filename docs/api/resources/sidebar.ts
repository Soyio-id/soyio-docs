import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Disclosure requests",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/disclosurerequest",
          label: "El objeto DisclosureRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-disclosure-requests",
          label: "Obtener todos los disclosure requests",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/create-disclosure-request",
          label: "Crear un disclosure request",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/get-disclosure-request",
          label: "Obtener un disclosure request específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Auth requests",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/authrequest",
          label: "El objeto AuthRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/create-auth-request",
          label: "Crear un request de autenticación",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/index-auth-requests",
          label: "Obtener todos los auth requests",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-auth-request",
          label: "Obtener un auth request específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Consent templates",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/consenttemplate",
          label: "El objeto ConsentTemplate",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/schemas/datarequirement",
          label: "El objeto DataRequirement",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-consent-templates",
          label: "Obtener todos los templates de consentimiento",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/create-consent-template",
          label: "Crear un template de consentimiento",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/get-consent-template",
          label: "Obtener un template de consentimiento",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/update-consent-template",
          label: "Actualizar un template de consentimiento",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Consent actions",
      items: [
        {
          type: "doc",
          id: "api/resources/create-consent-action",
          label: "Crear un consent action",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/index-consent-actions",
          label: "Listar consent actions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/show-consent-action",
          label: "Obtener un consent action",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Consent commits",
      items: [
        {
          type: "doc",
          id: "api/resources/index-consent-commits",
          label: "Listar commits de consentimiento",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/create-consent-commit",
          label: "Crear un commit de consentimiento",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/show-consent-commit",
          label: "Obtener un commit de consentimiento",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Privacy documents",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/privacydocument",
          label: "El objeto PrivacyDocument",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-privacy-documents",
          label: "Obtener todos los documentos de privacidad",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-privacy-document",
          label: "Obtener un documento de privacidad específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Identities",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/identity",
          label: "El objeto Identity",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-identities",
          label: "Obtener todas las identidades",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-identity",
          label: "Obtener una identidad específica",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Validation attempts",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/validationattempt",
          label: "El objeto ValidationAttempt",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-validation-attempts",
          label: "Obtener todos los intentos de validación",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-validation-attempt",
          label: "Obtener un flujo de validación específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Auth attempts",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/authattempt",
          label: "El objeto AuthAttempt",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-auth-attempts",
          label: "Obtener todos los intentos de autenticación",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-auth-attempt",
          label: "Obtener un intento de autenticación específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Signature attempts",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/signatureattempt",
          label: "El objeto SignatureAttempt",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/create-signature-attempt",
          label: "Crear un intento de firma",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/index-signature-attempts",
          label: "Obtener todos los intentos de firma",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-signature-attempt",
          label: "Obtener un intento de firma específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Events",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/event",
          label: "El objeto Event",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-events",
          label: "Obtener todos los eventos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-event",
          label: "Obtener un evento específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Signed documents",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/signeddocument",
          label: "El objeto SignedDocument",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-signed-documents",
          label: "Obtener todos los documentos firmados.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-signed-document",
          label: "Obtener un documento firmado.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Agreements",
      items: [
        {
          type: "doc",
          id: "api/resources/index-agreements",
          label: "Obtener todos los acuerdos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-agreement",
          label: "Obtener un acuerdo específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-agreement-evidences",
          label: "Obtener todas las evidencias de un acuerdo",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-agreement-evidence",
          label: "Obtener una evidencia específica de un acuerdo",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-agreement-versions",
          label: "Obtener todas las versiones de un acuerdo",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-agreement-version",
          label: "Obtener una versión específica de un acuerdo",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-agreement-version-evidence",
          label: "Obtener la evidencia de una versión específica",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Disclosure templates",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/datarequirement",
          label: "El objeto DataRequirement",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
