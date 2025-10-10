# Verificación de identidad

La **verificación de identidad** es un proceso que confirma que una persona es quien dice ser, garantizando así la autenticidad de las interacciones digitales. En la plataforma de Soyio, este proceso es esencial para ofrecer a las empresas y a sus usuarios un entorno seguro y confiable. La verificación de identidad puede realizarse a través de **validación** o **autenticación de identidad**.

## ¿Por qué lo llamamos "Disclosure"?

Llamamos a este módulo "Disclosure" (revelación) porque el usuario **consiente en revelar datos de su identidad** a tu empresa. Durante este proceso, el usuario:

- **Revela información personal verificada** como su nombre, RUT, fecha de nacimiento, etc.
- **Otorga consentimiento explícito** para el uso específico de estos datos
- **Autoriza la verificación** de su identidad mediante documentos oficiales

El término "disclosure" refleja la naturaleza voluntaria y transparente del proceso, donde el usuario tiene control total sobre qué información comparte y para qué propósitos.

## Validación de identidad

La validación de identidad se utiliza para asegurar que una persona es realmente quien dice ser, verificando la autenticidad de su identidad a través de un **validador de identidad**.

Este proceso incluye diversas etapas de comprobación:

- **Prueba de vida (Liveness Test)**: Detecta que el individuo está presente en el momento de la verificación, evitando el uso de imágenes o grabaciones.

- **Verificación de documento**: Inspeccionamos la autenticidad del documento de identidad mediante:
  - **Chequeo de adulteración**: Verificación de que el documento no ha sido alterado.
  - **Chequeo de validez del documento**: Confirmación de que el documento es válido y vigente.
  - **Comparación biométrica rostro-documento**: Verificamos la coincidencia entre el rostro de la persona y la foto en el documento.

## Autenticación de identidad

La autenticación de identidad se utiliza para confirmar la identidad de un usuario que ya ha sido previamente validado. Esto asegura que solo la persona autorizada acceda a los servicios, cumpliendo con un estándar de autenticación fuerte.

La autenticación puede realizarse mediante métodos biométricos (como reconocimiento facial) o mediante una llave de acceso segura (passkey) que valida que la persona que se presenta es efectivamente la que fue validada previamente.

## Determinación del método de verificación

El método de verificación se determina automáticamente según dos factores clave:

### 1. Estado del usuario en Soyio
- **Usuario nuevo**: Requiere validación completa de identidad
- **Usuario existente**: Puede usar métodos de autenticación rápida

### 2. Historial con la empresa
- **Primera interacción**: Requiere validación completa
- **Usuario verificado previamente**: Puede usar autenticación simplificada

:::tip[Pro Tip]
La autenticación simplificada es **más rápida y conveniente** para el usuario, **manteniendo el mismo nivel de seguridad**.
:::
