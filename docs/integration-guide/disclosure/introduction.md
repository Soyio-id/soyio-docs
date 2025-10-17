# Verificación de identidad

La **verificación de identidad** es un proceso que confirma que una persona es quien dice ser, garantizando así la autenticidad de las interacciones digitales. En la plataforma de Soyio, este proceso es esencial para ofrecer a las empresas y a sus usuarios un entorno seguro y confiable. La verificación de identidad se realiza a través de **validación** o **autenticación de identidad**.

## ¿Por qué lo llamamos "Disclosure"?

Llamamos a este módulo "Disclosure" (revelación) porque el usuario **consiente en revelar datos de su identidad** a tu empresa. Durante este proceso, el usuario:

- **Revela información personal verificada** como su nombre, RUT, fecha de nacimiento, etc.
- **Otorga consentimiento explícito** para el uso específico de estos datos
- **Autoriza la verificación** de su identidad mediante documentos oficiales

El término "disclosure" refleja la naturaleza voluntaria y transparente del proceso, donde el usuario tiene control total sobre qué información comparte y para qué propósitos.

## Validación de identidad

La validación de identidad se utiliza para asegurar que una persona es realmente quien dice ser, verificando la autenticidad de su identidad a través de un **validador de identidad**.

Para configurar qué datos solicitar a tus usuarios, necesitas crear una [plantilla de disclosure](./templates) que defina los datos requeridos y sus finalidades.

Este proceso incluye diversas etapas de comprobación:

- **Prueba de vida (Liveness Test)**: Detecta que el individuo está presente en el momento de la verificación, evitando el uso de imágenes o grabaciones.

- **Verificación de documento**: Inspeccionamos la autenticidad del documento de identidad mediante:
  - **Chequeo de adulteración**: Verificación de que el documento no ha sido alterado.
  - **Chequeo de validez del documento**: Confirmación de que el documento es válido y vigente.
  - **Comparación biométrica rostro-documento**: Verificamos la coincidencia entre el rostro de la persona y la foto en el documento.

## Reutilización de identidad

Una vez completada la validación, Soyio permite a los usuarios reutilizar su identidad verificada de dos formas diferentes:

### Con cuenta Soyio
El usuario puede crear una **Cuenta Soyio** opcional que le permite reutilizar su identidad verificada con **cualquier comercio** de la red Soyio.

### Sin cuenta Soyio
Los usuarios sin Cuenta Soyio pueden reutilizar su identidad verificada, pero solo con el **mismo comercio** donde previamente validaron su identidad.

:::tip[Cómo funciona la reutilización]
El sistema determina automáticamente si el usuario puede reutilizar su identidad verificada basándose en:
- **Estado del usuario**: Si tiene cuenta Soyio activa
- **Historial con la empresa**: Si previamente validó con ese comercio
- **Coincidencia de datos**: Si el email coincide con una identidad existente

Cuando se cumplen las condiciones, el usuario ve la opción "Usar mis datos validados" y puede saltar la validación completa.

Para conocer más sobre la cuenta Soyio y la reutilización en detalle, [nuestra guía al respecto](./account-and-id-reuse.mdx).
:::
