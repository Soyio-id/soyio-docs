# Webhooks

Los [Webhooks](https://es.wikipedia.org/wiki/Webhook) son callbacks que notifican cuando ocurren [eventos en tu cuenta](./resources/schemas/event.schema.mdx).

Por ejemplo: Cuando se completa una validación de identidad, un Webhook te permite recibir una notificación para que puedas tomar una acción, como enviar un email de bienvenida al usuario.

Los Webhooks son útiles en dos situaciones:

- Cuando se genera un evento que no es un resultado directo de una llamada a la API. Como por ejemplo el cobro de una suscripción.
- Cuando existen servicios o funcionalidades que necesitan saber la respuesta a una llamada, pero éstos no la realizan directamente. Como por ejemplo un servicio de CRM que necesita actualizar el registro de un usuario cuando se genera una autenticación.

Cuando un evento ocurre, Soyio crea un [objeto de evento](./resources/schemas/event.schema.mdx). Este objeto contiene toda la información relevante de lo ocurrido. Soyio luego envía el objeto de evento a través de una llamada `HTTP POST` a una URL que tú definas para ese propósito. Puedes registrar la URL [aquí](https://dashboard.soyio.com/settings/webhooks) y ver la lista completa de eventos [aquí](./resources/schemas/event.schema.mdx).

Algunos casos de uso son:

- Actualizar la membresía de un cliente en tu base de datos cuando el pago de una suscripción es exitoso.
- Enviar un email a un cliente cuando el pago de su suscripción falla.
- Registrar una entrada en contabilidad cuando se realiza una transacción.

## Recibiendo una notificación webhook

Crear un endpoint para recibir webhooks, no es distinto a crear cualquier otra página en tu sitio. Basta con crear una nueva ruta con la URL deseada.

Los datos del webhook son enviado en formato JSON en el body o cuerpo de la llamada POST. Todos los detalles del evento están incluidos y pueden ser usados directamente (luego de parsear el JSON).

## Respondiendo a un webhook

Para acusar recibo del webhook, tu endpoint debe retornar un estado `HTTP 200`. Cualquier otra información retornada en la cabecera o cuerpo de la llamada será ignorada.

:::info
Cualquier respuesta que no sea código 200, incluyendo códigos en el rango 3xx, indicará a Soyio que no se recibió el webhook.
:::

:::warning
Soyio no garantiza el orden de entrega de los eventos, por lo que tu endpoint debe ser capaz de manejar eventos que lleguen desordenados.
:::

### Re-intentos

Si tu endpoint responde con un código de estado fuera del rango 2XX, Soyio continuará intentando enviar el evento por hasta 48 horas, utilizando una estrategia de retroceso exponencial. Luego de este periodo, los webhooks no podrán volver a enviarse, pero se puede consultar la lista de eventos para reconciliar la información por eventos faltantes.

:::warning
Si la entrega falla consistentemente por varias días, te notificaremos y posiblemente deshabilitaremos las entregas al endpoint.
:::

## Buenas prácticas
- Antes de ir a producción, **prueba que tu webhook esta funcionando de manera adecuada**.
- Si tu endpoint para webhooks ejecuta lógica compleja o realiza llamadas HTTP, es posible que se produzca un timeout antes de que Soyio pueda ser notificado de la recepción. Por esta razón, es mejor **acusar recibo inmediatamente del webhook retornando un código HTTP 200 y luego realizar el resto de las tareas**.
- Los endpoints de webhook pueden ocasionalmente **recibir los mismos eventos más de una vez**. Aconsejamos considerar estos casos para evitar la duplicación de los eventos, lo que puede provocar resultados inesperados.
- Por razones de seguridad, se aconseja siempre verificar que la información proporcionada en el evento realmente existe y el evento ocurrió. Para ello simplemente basta con enviar un request a nuestra API a la ruta correspondiente del evento para corroborar que el recurso señalado se modificó. Este chequeo sirve para verificar que la información viene desde Soyio, evitando que potenciales atacantes envíen webhooks con información falsa.

## Herramientas

Estas herramientas pueden ser útiles para probar webhooks:

- [Webhook.site](https://webhook.site): Genera una URL aleatoria y te permite inspeccionar las llamadas POST enviadas a esa URL.
- [ngrok](https://ngrok.com/): Configura un túnel desde un endpoint accesible desde internet a tu máquina local, permitiendo procesar webhooks localmente.


---

En este momento, los eventos que enviamos por Webhooks tienen la siguiente estructura:

### 1. Para intentos de validación (*validation attempts*):

  * Validación exitosa:

```javascript
{
  id: "evt_...",
  name: "validation_attempt.successful",
  payload: {
    user_reference: "<user-reference>",
    validation_attempt_id: "va_...",
    identity_id: "id_..."
  },
  created_at: "<created_at>"
}
```

  * Validación fallida:

```javascript
{
  id: "evt_...",
  name: "validation_attempt.failed",
  payload: {
    user_reference: "<user-reference>",
    validation_attempt_id: "va_...",
    error_reason: "passive_liveness_verification_not_passed",
    errors_array: [
      {
        code: "auth-XXX",
        type: "facial",
        message: "passive_liveness_verification_not_passed",
        detail: "La verificación de vivacidad pasiva no fue exitosa."
      },
      ...
    ]
  },
  created_at: "<created_at>"
}
```

### 2. Para intentos de autenticación (*auth attempts*):

  * Autenticación exitosa:

```javascript
{
  id: "evt_...",
  name: "auth_attempt.successful",
  payload: {
    user_reference: "<user-reference>",
    auth_attempt_id: "aa_...",
    identity_id: "id_..."
  },
  created_at: "<created_at>"
}
```

  * Autenticación fallida:

```javascript
{
  id: "evt_...",
  name: "auth_attempt.failed",
  payload: {
    user_reference: "<user-reference>",
    auth_attempt_id: "aa_...",
    error_reason: "passive_liveness_verification_not_passed",
    errors_array: [
      {
        code: "auth-XXX",
        type: "facial",
        message: "passive_liveness_verification_not_passed",
        detail: "La verificación de vivacidad pasiva no fue exitosa."
      },
      ...
    ]
  },
  created_at: "<created_at>"
}
```

## Tipos de errores:

Los tipos de errores que pueden aparecer en el campo de `error_reason` son los siguientes:

1. `unknown`
2. `facial_validation_error`
3. `document_validation_error`
4. `expiration_error`
5. `enrollment`
6. `age_above_threshold`
7. `blurry_image`
8. `data_not_match_with_government_database`
9. `document_has_expired`
10. `document_not_recognized`
11. `document_unregistered`
12. `front_document_not_found`
13. `government_database_unavailable`
14. `identity_belongs_to_dead_person`
15. `invalid_or_corrupted_image_file`
16. `missing_date_of_birth`
17. `missing_document_number`
18. `missing_expiration_date`
19. `missing_gender`
20. `missing_mrz`
21. `missing_names`
22. `missing_text`
23. `ocr_no_text_detected`
24. `underage`
25. `fraudster_face_match_in_client_collection`
26. `liveness_verification_not_passed`
27. `no_face_detected`
28. `passive_liveness_verification_not_passed`
29. `photo_of_photo`
30. `similarity_threshold_not_passed`
31. `camera_permission_error`
32. `damaged_document`
33. `date_of_birth_does_not_match_with_photo`
34. `document_is_a_photo_of_photo`
35. `document_is_a_photocopy`
36. `face_not_clear`
37. `face_not_detected`
38. `image_validation_not_passed`
39. `incomplete_document`
40. `invalid_format`
41. `invalid_issue_date`
42. `missing_issue_date`
43. `missing_nationality`
44. `possible_fraud`
45. `reverse_document_not_found`
46. `validations_failed`
