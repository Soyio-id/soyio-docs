---
sidebar_position: 2
---

# Signature

En esta guía te explicaremos nuestra funcionalidad de firma electrónica de documentos.

## Cómo funciona

Con nuestra funcionalidad de firma podrás generar documentos automáticamente a partir de una plantilla e integrar el proceso de firma en tu aplicación.

Cuando tus usuarios firmen los documentos, Soyio garantizará la integridad del documento agregando una capa extra de seguridad basada en autenticación biométrica y una firma criptográfica con sello de tiempo en el documento. Nuestra firma es válida legalmente para documentos que requieren Firma Electrónica Simple.

Sigue el paso a paso para crear la plantilla del proceso de firma e integrarla en tu aplicación.

### Qué es autenticación biométrica

Para iniciar un proceso de firma de documentos, el usuario previamente deberá haber validado su identidad en Soyio. Durante ese proceso de validación confirmamos que el usuario es quien dice ser. Al finalizar la validación, el usuario podrá crear una llave de acceso biométrica que queda almacenada en su dispositivo (passkey) y que le permitirá identificarse y autenticarse en otros servicios ofrecidos por Soyio, entre ellos, el servicio de firma digital.

Al iniciar el proceso de firma, al usuario se le presentará el documento listo para firmar, el que podrá previsualizar o descargar.

Cuando el usuario esté seguro de firmar y haga click en el botón "Firmar con Soyio", deberá confirmar esta acción usando su llave de acceso biométrica almacenada en su dispositivo (passkey) o usando la autenticación facial. Mediante este acto, podemos asegurar que quien está firmando el documento es quien dice ser.

### Qué es una firma criptográfica

Cuando el usuario firma, se agregarán algunas marcas visuales en el documento. Las marcas visuales son un timbre con el nombre del usuario, una marca con el id del documento en todas las hojas y un registro temporal con todos los pasos del proceso de firma.

Sin embargo, lo más importante, es que se generará una firma criptográfica sobre el documento. La firma criptográfica usa un algoritmo de llave pública para mantener la integridad de los datos. Esta firma incluye la hora exacta en que el documento fue firmado y evita que documento pueda ser modificado posteriormente. Por lo tanto, cualquier persona podrá comprobar que la firma se realizó mediante el servicio que ofrece Soyio y que el documento no ha sido modificado después de ser firmado.

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
    signature_attempt_id: "sa_...",
    identity_id: "id_...",
    signed_document_ids: ["sd_1...", ..., "sd_n..."],
  },
  created_at: "<created_at>"
}
```

- Se emitirá un evento en el front. Revisa el detalle en la documentación del SDK correspondiente.

### 5. Obtén el documento firmado

Utiliza el `signed_document_id` para obtener el documento firmado por tu usuario en nuestro endpoint de documentos firmados:

`GET /api/v1/signed_documents/:signed_document_id`
