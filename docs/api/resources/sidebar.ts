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
        {
          type: "doc",
          id: "api/resources/disclosure-request-granted",
          label: "Granted",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/disclosure-request-timed-out",
          label: "Timed out",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/disclosure-request-failed",
          label: "Failed",
          className: "api-method event",
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
        {
          type: "doc",
          id: "api/resources/auth-request-successful",
          label: "Successful",
          className: "api-method event",
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
          id: "api/resources/schemas/consentaction",
          label: "El objeto ConsentAction",
          className: "schema",
        },
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
          id: "api/resources/schemas/consentcommit",
          label: "El objeto ConsentCommit",
          className: "schema",
        },
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
          id: "api/resources/create-privacy-document",
          label: "Crea un privacy document",
          className: "api-method post",
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
        {
          type: "doc",
          id: "api/resources/validation-attempt-failed",
          label: "Failed",
          className: "api-method event",
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
        {
          type: "doc",
          id: "api/resources/auth-attempt-successful",
          label: "Successful",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/auth-attempt-failed",
          label: "Failed",
          className: "api-method event",
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
        {
          type: "doc",
          id: "api/resources/signature-attempt-successful",
          label: "Successful",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/signature-attempt-failed",
          label: "Failed",
          className: "api-method event",
        },
      ],
    },
    {
      type: "category",
      label: "Data subject requests",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/datasubjectrequest",
          label: "El objeto DataSubjectRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/create-data-subject-request",
          label: "Crea un data subject request.\n",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/index-data-subject-requests",
          label: "Obtener todos los data subject requests",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-data-subject-request",
          label: "Obtener un data subject request específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-created",
          label: "Created",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-updated",
          label: "Updated",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-validating",
          label: "Validating",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-processing",
          label: "Processing",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-completed",
          label: "Completed",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-rejected",
          label: "Rejected",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/data-subject-request-data-missmatch",
          label: "Data missmatch",
          className: "api-method event",
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
        {
          type: "doc",
          id: "api/resources/broadcast-event",
          label: "Reenviar un evento a los webhooks suscritos",
          className: "api-method post",
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
          id: "api/resources/schemas/agreement",
          label: "El objeto Agreement",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/schemas/evidence",
          label: "El objeto Evidence",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/schemas/datause",
          label: "El objeto DataUse",
          className: "schema",
        },
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
          id: "api/resources/download-agreement-evidence",
          label: "Descargar el archivo de una evidencia específica",
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
        {
          type: "doc",
          id: "api/resources/agreement-created",
          label: "Created",
          className: "api-method event",
        },
        {
          type: "doc",
          id: "api/resources/agreement-updated",
          label: "Updated",
          className: "api-method event",
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/webhook",
          label: "El objeto Webhook",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-webhooks",
          label: "Obtener todos los webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/create-webhook",
          label: "Crear un webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/get-webhook",
          label: "Obtener un webhook específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/update-webhook",
          label: "Actualizar un webhook",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/resources/delete-webhook",
          label: "Eliminar un webhook",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/resources/index-webhook-transactions",
          label: "Obtener todas las transacciones de un webhook específico",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/get-webhook-transaction",
          label: "Obtener una transacción específica de un webhook",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Products",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/product",
          label: "El objeto Product",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/index-products",
          label: "Obtener todos los productos",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/create-product",
          label: "Crear un producto",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/resources/get-product",
          label: "Obtener un producto específico",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Entities",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/entity",
          label: "El objeto Entity",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/schemas/compliancestatus",
          label: "El objeto ComplianceStatus",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/get-entity-agreement-compliance-statuses",
          label: "Obtener los estados de cumplimiento de la entidad",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Company",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/configuration",
          label: "El objeto Configuration",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/resources/get-company-config",
          label: "Obtener la configuración de la empresa",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/resources/update-company-config",
          label: "Actualizar la configuración de la empresa",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Privacy center",
      items: [
        {
          type: "doc",
          id: "api/resources/get-privacy-center-session-token",
          label: "Obtener un token de sesión para el centro de privacidad",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "WebhooksTransactions",
      items: [
        {
          type: "doc",
          id: "api/resources/schemas/webhooktransaction",
          label: "El objeto WebhookTransaction",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
