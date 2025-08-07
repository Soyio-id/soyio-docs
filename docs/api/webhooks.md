# Webhooks

Los [Webhooks](https://es.wikipedia.org/wiki/Webhook) son callbacks que notifican cuando ocurren [eventos en tu cuenta](./resources/schemas/event.schema.mdx).

Por ejemplo: Cuando se completa una validación de identidad, un Webhook te permite recibir una notificación para que puedas tomar una acción, como enviar un email de bienvenida al usuario.

Los Webhooks son útiles en dos situaciones:

- Cuando se genera un evento que no es un resultado directo de una llamada a la API. Como por ejemplo el cobro de una suscripción.
- Cuando existen servicios o funcionalidades que necesitan saber la respuesta a una llamada, pero éstos no la realizan directamente. Como por ejemplo un servicio de CRM que necesita actualizar el registro de un usuario cuando se genera una autenticación.

Cuando un evento ocurre, Soyio crea un [objeto de evento](./resources/schemas/event.schema.mdx). Este objeto contiene toda la información relevante de lo ocurrido. Soyio luego envía el objeto de evento a través de una llamada `HTTP POST` a una URL que tú definas para ese propósito. Para mayor información sobre cómo crear un webhook, puedes dirigirte a este [link](./resources/create-webhook.api.mdx) de nuestra referencia de la api.

Algunos casos de uso son:

- Actualizar la membresía de un cliente en tu base de datos cuando el pago de una suscripción es exitoso.
- Enviar un email a un cliente cuando el pago de su suscripción falla.
- Registrar una entrada en contabilidad cuando se realiza una transacción.

## Suscripción a eventos

Los eventos están relacionados con el ciclo de vida de los recursos en Soyio. Cada recurso tiene eventos específicos que notifican cuando ocurren cambios importantes en su estado. Por ejemplo, para un agreement, existen eventos que notifican cuando se crea o actualiza. Esto te permite seguir el estado de tus recursos a lo largo del tiempo.

Para recibir notificaciones de webhooks, debes suscribirte a los tipos de eventos que te interesan. Al crear un webhook, puedes elegir:

* Suscribirte a todos los eventos disponibles usando el wildcard `*`.
* Seleccionar categorías específicas de eventos (por ejemplo, todos los eventos de agreement usando `agreement.*`).
* Elegir eventos individuales (por ejemplo, solo `agreement.created`).

Puedes consultar la lista completa de eventos disponibles para cada recurso en la especificación de nuestra API. Cada evento está identificado con la etiqueta `EVENT`, ubicada debajo de los endpoints correspondientes a cada recurso.

### Mejores prácticas

Para optimizar el uso de webhooks en tu aplicación:

- Puedes crear más de un webhook.
- Cada webhook puede configurarse de manera independiente para escuchar uno o varios eventos.
- Utiliza el wildcard `*` para suscribirte a todos los eventos de un recurso específico. Por ejemplo, `disclosure_request.*` te suscribe a todos los eventos de disclosure_request.
- Suscríbete solo a los eventos que tu aplicación necesita procesar para reducir el tráfico y simplificar el manejo de eventos.

## Recibiendo una notificación webhook

Crear un endpoint para recibir webhooks, no es distinto a crear cualquier otra página en tu sitio. Basta con crear una nueva ruta con la URL deseada.

Los datos del webhook son enviado en formato JSON en el body o cuerpo de la llamada POST. Todos los detalles del evento están incluidos y pueden ser usados directamente (luego de parsear el JSON).

## Respondiendo a un webhook

Para acusar recibo del webhook, tu endpoint debe retornar un estado HTTP en el rango **2XX** (como `200`, `201`, `204`, etc.). Cualquier otra información retornada en la cabecera o cuerpo de la llamada será ignorada.

### Re-intentos

Si tu endpoint responde con un código de estado fuera del rango 2XX, Soyio continuará intentando enviar el evento utilizando la siguiente estrategia de reintentos:

**Primeros reintentos:** 3 reintentos inmediatos con intervalos de 10 segundos entre cada uno.

**Reintentos posteriores:** Si los primeros 3 reintentos fallan, se programan reintentos adicionales con los siguientes intervalos:

| Reintento | Intervalo de espera |
|-----------|-------------------|
| 4° | 2 minutos |
| 5° | 5 minutos |
| 6° | 10 minutos |
| 7° | 15 minutos |
| 8° | 30 minutos |
| 9° | 1 hora |
| 10° | 2 horas |
| 11° | 4 horas |
| 12° | 8 horas |

**Total:** 15 reintentos durante aproximadamente **15.5 horas**.

Después de este periodo, los webhooks no podrán volver a enviarse, pero puedes consultar la lista de eventos para reconciliar la información por eventos faltantes.

:::note
Los tiempos mostrados son aproximados. El sistema de colas agrega una pequeña variación aleatoria (jitter) a cada intervalo para distribuir la carga y evitar picos de tráfico concentrados.
:::

### Alertas

Soyio envía alertas automáticas para notificarte sobre problemas en la entrega de webhooks:

- **Alerta inicial de fallo:** Se envía tras 5 fallos consecutivos en la entrega a tu endpoint. Esta alerta te permite identificar y resolver problemas tempranamente.
- **Alerta de fallo continuo:** Se envía cuando se han agotado todos los reintentos y el webhook no pudo ser entregado exitosamente. Esta alerta confirma que hemos dejado de intentar entregar ese evento específico.

Estas alertas serán enviadas al correo especificado en la [configuración](./resources/schemas/configuration), bajo el nombre de `alert_notification_email`.

Te recomendamos configurar monitoreo en tu endpoint para detectar problemas antes de que lleguen estas alertas automáticas.

## Verificación de seguridad (opcional)

Todos los webhooks de Soyio incluyen una firma digital. **La verificación de esta firma es opcional, pero fuertemente recomendada** para una integración segura. Esta te permite verificar que la solicitud realmente proviene de nuestros servidores y que el contenido no ha sido modificado en tránsito.


### Headers de seguridad

Cada webhook incluye los siguientes headers adicionales:

| Header | Descripción |
|--------|-------------|
| `X-Hub-Signature-256` | Firma HMAC-SHA256 del payload usando tu clave secreta |
| `X-Hub-Timestamp` | Timestamp Unix de cuando se envió el webhook |
| `X-Hub-Delivery` | ID único de la entrega para debugging |

### Obtener tu clave secreta

Cada webhook tiene una clave secreta única (`secret_key`) que se genera al momento de crear el webhook y puedes consultarla en cualquier momento en nuestro endpoint de [webhooks](./resources/get-webhook).

:::warning
Guarda tu clave secreta de forma segura y nunca la expongas en tu código cliente o logs. Usa variables de entorno para almacenarla.
:::

### Verificar la firma

Para verificar que un webhook proviene de Soyio:

1. Extrae la firma del header `X-Hub-Signature-256`
2. Calcula la firma esperada usando tu clave secreta y el payload raw
3. Compara ambas firmas de forma segura


#### Ejemplo en Node.js

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(req, res, next) {
  const payload = JSON.stringify(req.body);
  const signature = req.headers['x-hub-signature-256'];

  // Calcular firma esperada
  const expectedSignature = `sha256=${crypto
    .createHmac('sha256', process.env.SOYIO_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex')}`;

  // Comparación timing-safe
  if (!crypto.timingSafeEqual(
    Buffer.from(signature), 
    Buffer.from(expectedSignature)
  )) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  next();
}

// Usar como middleware
app.post('/webhook', verifyWebhookSignature, (req, res) => {
  // Procesar webhook de forma segura
  handleEvent(req.body);
  res.status(200).json({ status: 'success' });
});
```

## Buenas prácticas
- Antes de ir a producción, **prueba que tu webhook esta funcionando de manera adecuada**.
- **Verifica siempre la firma del webhook** para asegurar que proviene de Soyio y no ha sido modificado.
- Si tu endpoint para webhooks ejecuta lógica compleja o realiza llamadas HTTP, es posible que se produzca un timeout antes de que Soyio pueda ser notificado de la recepción. Por esta razón, es mejor **acusar recibo inmediatamente del webhook retornando un código HTTP 200 y luego realizar el resto de las tareas**.
- Los endpoints de webhook pueden ocasionalmente **recibir los mismos eventos más de una vez**. Aconsejamos considerar estos casos para evitar la duplicación de los eventos, lo que puede provocar resultados inesperados.
- Por razones de seguridad, se aconseja siempre verificar que la información proporcionada en el evento realmente existe y el evento ocurrió. Para ello simplemente basta con enviar un request a nuestra API a la ruta correspondiente del evento para corroborar que el recurso señalado se modificó. Este chequeo sirve para verificar que la información viene desde Soyio, evitando que potenciales atacantes envíen webhooks con información falsa.

## Herramientas

Estas herramientas pueden ser útiles para probar webhooks:

- [Webhook.site](https://webhook.site): Genera una URL aleatoria y te permite inspeccionar las llamadas POST enviadas a esa URL.
- [ngrok](https://ngrok.com/): Configura un túnel desde un endpoint accesible desde internet a tu máquina local, permitiendo procesar webhooks localmente.
