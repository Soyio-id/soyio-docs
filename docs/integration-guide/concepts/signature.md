
# Firma de Documentos

En esta sección te explicaremos cómo funciona la solución de firma de Soyio, cómo asegura la identidad del firmante y la integridad del documento, y su validez legal, para que evalúes si se adapta a tus necesidades.

## ¿Qué es una Firma Electrónica Simple?

Como probablemente ya sepas, existen diferentes tipos de firma electrónica. En Chile, la Ley N°19.799 sobre documentos electrónicos, firma electrónica y servicios de certificación de dicha firma (LFE), establece dos tipos de firma: Firma Electrónica Simple (FES) y Firma Electrónica Avanzada (FEA). La Firma Electrónica Simple consiste en: «cualquier clase de sonido, símbolo o proceso electrónico que permita al receptor de un documento electrónico identificar, al menos formalmente, a su autor».

Por lo tanto, un mecanismo electrónico que permita incorporar la firma en un documento electrónico e identifique formalmente al usuario cumple con los requisitos de la ley para ser considerado una firma electrónica simple.

## ¿Cómo aseguramos la autenticidad del firmante?

Aunque la ley no específica métodos específicos para identificar al autor de la firma, Soyio utiliza autenticación fuerte (SCA) para confirmar la identidad del firmante, lo que fortalece la seguridad del proceso y eleva su valor probatorio.

Para que un usuario pueda firmar usando Soyio deberá completar previamente un proceso de [Disclosure](../modules/disclosure.md). Al hacerlo creará una identidad verificada en el sistema, podrá crear una llave de acceso (passkey) y además registraremos su consentimiento. Una vez creada su cuenta podrá iniciar un proceso de firma.

Al iniciar el proceso de firma, al usuario se le presentará el documento listo para firmar, el que podrá previsualizar o descargar. Cuando el usuario esté seguro de firmar y haga click en el botón "Firmar con Soyio", deberá confirmar esta acción usando su llave de acceso almacenada en su dispositivo (passkey) o usando autenticación facial. Esté método garantiza que solo el usuario autorizado pueda firmar el documento en su nombre, asegurando que la firma sea auténtica y realizada por quien corresponde.

## ¿Cómo aseguramos la integridad del documento firmado?

Para mantener la integridad del documento y evitar modificaciones después de la firma, Soyio utiliza una firma criptográfica con un sello de tiempo. Esta firma criptográfica aplica un algoritmo de llave pública que genera una huella digital única e inalterable del documento en el momento exacto de la firma. Así, cualquier intento de cambiar el documento después de la firma invalidaría la firma criptográfica, proporcionando una garantía de integridad.

## Documento de evidencia electrónica

A cada documento firmado se adjunta un registro temporal que documenta todas las pruebas electrónicas del proceso de firma. Este documento incluye el nombre y correo del firmante, fecha y hora, ubicación geográfica, dirección IP y las acciones realizadas. Esta evidencia puede presentarse ante un tribunal en caso de impugnación o en un proceso de auditoría, ofreciendo un alto nivel de fiabilidad.

Además, se añaden marcas visuales a cada página del documento, incluyendo un timbre con el nombre verificado del usuario y un identificador único del documento. Estas marcas refuerzan la transparencia y facilitan la validación visual del documento.

### Ejemplo de evidencia electrónica
<img src="/img/audit_trail.png" alt="audit trail" width="70%"/>

## ¿Cuándo puedo utilizar la firma electrónica de Soyio?

La firma electrónica de Soyio es válida legalmente para celebrar toda clase de actos y contratos, especialmente contratos entre privados.

Al ser una Firma Electrónica Simple (FES) existen excepciones que se detallan a continuación:

1. No puede utilizarse FES cuando la ley exige expresamente el uso de Firma Electrónica Avanzada (FEA), por ejemplo:

    i. Los instrumentos públicos en formato electrónico deben llevar la FEA del funcionario que los emite.

    ii. El mandato judicial otorgado en documento electrónico debe ser suscrito con la FEA del mandante.

    iii. Los formularios para la constitución, modificación, disolución o anotaciones de empresas del Registro de Empresas y Sociedad deben ser suscritos con la FEA de los constituyentes, socios o accionistas; o con la FEA del notario que autoriza el acto si es que estos no contaran con su propia FEA.

2. No puede utilizarse firma electrónica (FES o FEA) cuando la LFE u otras leyes impiden el uso de firma electrónica:

    i. Cuando la ley exige una solemnidad que no sea susceptible de cumplirse mediante documento electrónico

    ii. Cuando la ley requiere la concurrencia personal de alguna de las partes

    iii. En actos y contratos relativos al derecho de familia
