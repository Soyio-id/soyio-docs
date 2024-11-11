
# Verificación de Identidad

La **verificación de identidad** es un proceso que confirma que una persona es quien dice ser, garantizando así la autenticidad de las interacciones digitales. En la plataforma de Soyio, este proceso es esencial para ofrecer a las empresas y a sus usuarios un entorno seguro y confiable. La verificación de identidad puede realizarse a través de **validación** o **autenticación de identidad**.

:::tip[Pro Tip]
Integra el módulo [Revelación de datos y consentimiento (Disclosure)](../products/disclosure.mdx) para verificar la identidad de tus usuarios. Este módulo **incluye la verificación de identidad** y la documentación del [consentimiento](./consent.md), lo que garantiza que todos los datos personales se manejen de acuerdo con las normativas vigentes.
:::

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

## ¿Cómo se define el método de verificación de identidad utilizado?

Soyio actúa como intermediario entre el usuario y la empresa, adaptando el método de verificación según la relación del usuario con Soyio y con la empresa con la que interactúa. Dos factores principales determinan el método de verificación:

1. **Existencia de una cuenta de usuario en Soyio:** Si el usuario ha creado una cuenta en Soyio puede usar métodos de autenticación en interacciones con empresas que utilizan los productos de Soyio.

2. **Estado de la validación de identidad en la empresa:** Si el usuario ya validó su identidad utilizando Soyio en la empresa con la que está interactuando, es posible utilizar una autenticación en lugar de realizar nuevamente la validación completa.

### Cuándo se usa la validación de identidad

Se utiliza la validación de identidad cuando es la primera vez que el usuario interactúa con productos de Soyio o si, a pesar de haber realizado una validación de identidad previamente, optó por no crear una cuenta en Soyio.

### Cuándo se usa la autenticación de identidad

Se utiliza la autenticación de identidad cuando el usuario ya ha completado exitosamente una validación de identidad con la empresa utilizando Soyio o cuando ha optado por crear una cuenta en Soyio. Este método permite una verificación rápida y segura para confirmar que la persona es quien dice ser, sin necesidad de realizar una validación completa cada vez.