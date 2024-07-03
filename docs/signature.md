---
sidebar_position: 3
---

# Firma de documentos

En esta guía de explicaremos acerca de nuestra funcionalidad de firma electrónica de documentos.

## Cómo funciona

TBD

## Pre Requisitos

- Tener una identidad creada en el sistema.
- Tener el SDK instalado en tu sitio o App.
- Tener un Webhook configurado en tu cuenta.

## Paso a paso

### 1. Crea una plantilla

Para empezar, crearemos una plantilla de documento. Para ello, haznos llegar un documento en formato `.docx` via Slack. De manera opcional puedes también **definir un color en formato hexadecimal** con el cual quieres que se desplieguen las variables reemplazadas en el documento firmado.

#### Variables

Nuestras plantillas soportan variables a través de handlebars siguiendo el siguiente formato:

`{{variable:type}}`

Donde `variable` es el **nombre de la variable** y `type` es el **tipo de variable**. Los tipos soportados son:

- `string`: Representa un texto en el documento. Si no declara un tipo de variable (Por ejemplo `{{variable}}`), la variable se parseará por defecto como un `string`.
- `number`: Representa un número o cifra en el documento. Al reemplazarse, se desplegará formateado como un número, por ejemplo 10000 se convertirá en `10.000`.
- `signature`: Representa una firma en el documento. Debe ubicarse en el lugar dónde irá la firma en el documento final.

:::warning[Ojo]
Se requiere al menos una variable de tipo `signature` en el documento para poder crear la plantilla.
:::

Una vez creada, te haremos llegar el id de la plantilla, por ejemplo: `st_m02aAsla_021UiN12s`.

### 2. Crea un intento en el back

Cuando requieras que el usuario firme un documento, deberás primero crear un intento de firma desde tu back-end. Para ello, deberás hacer un request a nuestro endpoint de intentos de firma:

`POST /api/v1/signature_attempts`

Donde el payload debiera contener el `identity_id` de tu usuario, el `template_id` de la plantilla y las variables necesarias para completar el documento. Por ejemplo:

```json title="Payload Ejemplo POST /api/v1/signature_attempts"
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
Si no incluyes alguna variable, o un valor inválido de acuerdo al tipo, arrojaremos un error.
:::

Al crearse el intento, obtendrás un `signature_attempt_id`, el cual utilizarás en el próximo paso.

### 3. Inicia el intento desde el front

Ahora, desde el front, debes iniciar el intento de firma con tu usuario. Para hacerlo, simplemente usa el `signature_attempt_id` obtenido desde la llamada de creación del intento de firma en el back para iniciar el intento de firma mediante el SDK.

:::tip[Tip]
Sigue las instrucciones del `Readme` del SDK correspondiente para iniciar el intento de firma.
- [SDK Web](https://www.npmjs.com/package/@soyio/soyio-widget)
- [SDK React Native](https://www.npmjs.com/package/@soyio/soyio-rn-sdk)
:::

### 4. Escucha los eventos

Una vez que el usuario completa el flujo:

- Se emitirá un evento `signature_attempt.successful` con el `signed_document_id` del documento firmado. Esto lo recibirás mediante un webhook. Por ejemplo:
```javascript
{
  id: "evt_...",
  name: "signature_attempt.successful",
  payload: {
    user_reference: "<user-reference>",
    signatre_attempt_id: "sa_...",
    identity_id: "id_...",
    signed_document_id: "sd_...",
  },
  created_at: "<created_at>"
}
```
- Se emitirá un evento en el front. Revisa el detalle en la documentación del SDK correspondiente.

### 5. Obtén el documento firmado

Utiliza el `signed_document_id` para obtener el documento firmado por tu usuario en nuestro endpoint de documentos firmados:

`GET /api/v1/signed_documents/:signed_document_id`
