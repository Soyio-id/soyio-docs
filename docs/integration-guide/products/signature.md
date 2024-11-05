---
sidebar_position: 3
---

# Firma de documentos (Signature)

Integra el proceso de firma en tu aplicación generando documentos listos para ser firmados automáticamente a partir de una plantilla.

## ¿Cómo funciona?

Al iniciar el proceso de firma, al usuario se le presentará el documento listo para firmar, el que podrá previsualizar o descargar. Cuando el usuario esté seguro de firmar y haga click en el botón "Firmar con Soyio", deberá confirmar esta acción usando su llave de acceso almacenada en su dispositivo (passkey) o usando autenticación facial.

Revisa [la documentación conceptual sobre firma electrónica](../concepts/signature.md) para profundizar en las características de este producto y sus aplicaciones.

## Pre requisitos

1. El usuario debe tener una [identidad creada en el sistema](./disclosure.md).
2. Tener el [SDK](../quickstart.md) instalado en tu sitio o aplicación.
3. Tener un [Webhook](../../api/webhooks.md) configurado en tu cuenta.

## Paso a paso

### 1. Crea una plantilla de documento

Crea un documento en formato `.docx` definiendo las variables que serán reemplazadas posteriormente. Este documento se utilizará como base en los procesos de firma. Cuando esté listo envíanos la plantilla vía Slack y te haremos llegar el id de la plantilla (`template_id`) que utilizarás en el próximo paso, por ejemplo: `st_m02aAsla_021UiN12s`.

#### Variables

Define las variables utilizando *handlevars* en la plantilla siguiendo el siguiente formato:

`{{variable:type}}` o `{{variable}}`

Donde `variable` es el **nombre de la variable** y `type` es opcional y corresponde al **tipo de variable**. Los tipos soportados son:

- `string`: Representa un texto en el documento. Opción por defecto en caso de no especificar `type`.
- `number`: Representa un número o cifra en el documento. Al reemplazarse, se desplegará formateado como un número, por ejemplo 10000 se convertirá en `10.000`.
- `signature`: Representa una firma en el documento. Debe ubicarse en el lugar dónde irá la firma en el documento final.

:::warning[Importante]
Se requiere al menos una variable de tipo `signature` en el documento para poder crear la plantilla.
:::

### 2. Crea un intento de firma

Cuando requieras que un usuario firme un documento, realiza un `POST` *request* desde tu back-end al *endpoint* de intentos de firma de Soyio para crear un intento de firma. Al crearse el intento, obtendrás un `signature_attempt_id`, el cual utilizarás en el próximo paso.

#### Endpoint
`POST /api/v1/signature_attempts`

#### Payload

Especifica en el *payload* del *request* el `identity_id` de tu usuario, el `template_id` de la plantilla y los valores de las variables necesarias para completar el documento. Por ejemplo:

```javascript title="Payload Ejemplo POST /api/v1/signature_attempts"
{
  "identity_id": "id_...",
  "template_id": "st_...",
  "variables": [
    {
      "key": "name",
      "value": "John"
    },
    {
      "key": "lastName",
      "value": "Doe"
    }
  ]
}
```

:::warning[Ojo]
Si no incluyes alguna variable, o envías un valor inválido de acuerdo al tipo, arrojaremos un error.
:::

### 3. Inicia el proceso de firma

Inicia el intento de firma con tu usuario desde el front-end de tu aplicación. Utiliza el SDK de Soyio y el `signature_attempt_id` obtenido en el paso anterior al crear el intento de firma.

:::tip[Tip]
Sigue las instrucciones del `Readme` del SDK correspondiente para iniciar el intento de firma.

- [SDK Web](https://www.npmjs.com/package/@soyio/soyio-widget)
- [SDK React Native](https://www.npmjs.com/package/@soyio/soyio-rn-sdk)
:::

### 4. Escucha los eventos

Cuando el usuario complete el flujo se emitirá:

- Un evento en el front-end de tu aplicación. Revisa el detalle en la documentación del SDK correspondiente.

- Un evento `signature_attempt.successful` con el `signed_document_id` del documento firmado. Esto lo recibirás mediante el webhook configurado en tu cuenta. Por ejemplo:

```javascript
{
  id: "evt_...",
  name: "signature_attempt.successful",
  payload: {
    user_reference: "<user-reference>",
    signature_attempt_id: "sa_...",
    identity_id: "id_...",
    signed_document_ids: ["sd_1...", ..., "sd_n..."],
  },
  created_at: "<created_at>"
}
```

### 5. Obtén el documento firmado

Utiliza el `signed_document_id` para obtener el documento firmado por tu usuario desde el endpoint de documentos firmados:

`GET /api/v1/signed_documents/:signed_document_id`