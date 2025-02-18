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

## Suscripción a eventos

Los eventos están relacionados con el ciclo de vida de los recursos en Soyio. Por ejemplo, para un `disclosure_request`, existen eventos que notifican cuando se completa, falla o expira. Esto te permite seguir el estado de tus recursos a lo largo del tiempo.

Para recibir notificaciones de webhooks, debes suscribirte a los tipos de eventos que te interesan. Al crear un webhook, puedes elegir:

- Suscribirte a todos los eventos disponibles
- Seleccionar categorías específicas de eventos (por ejemplo, todos los eventos de `disclosure_request`)
- Elegir eventos individuales (por ejemplo, solo `disclosure_request.granted`)

Los eventos disponibles son:

- `*`: Todos los eventos
- `disclosure_request.granted`
- `disclosure_request.timed_out`
- `disclosure_request.fail`
- `validation_attempt.successful`
- `validation_attempt.failed`
- `auth_attempt.failed`
- `auth_attempt.successful`
- `signature_attempt.successful`
- `signature_attempt.failed`
- `auth_request.successful`

Una vez suscrito, recibirás notificaciones solo de los eventos seleccionados. Puedes modificar tus suscripciones en cualquier momento desde el [dashboard](https://dashboard.soyio.com/settings/webhooks).

:::tip
Te recomendamos suscribirte solo a los eventos que tu aplicación necesita procesar. Esto reduce el tráfico innecesario y simplifica el manejo de eventos en tu sistema.
:::

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
