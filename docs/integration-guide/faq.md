---
title: Preguntas frecuentes
description: Respuestas rápidas para equipos que integran Soyio
---

# Preguntas frecuentes para integradores

Esta sección está dirigida a equipos técnicos y de producto que integran Soyio en sus canales digitales.

:::info[¿Eres usuario de Soyio?]
Si eres una persona usando un servicio de Soyio en un flujo de una empresa, y no alguien integrando nuestros servicios, revisa las [preguntas frecuentes para usuarios](../user-guide/faq).
:::

## Sobre Soyio

### ¿Qué es Soyio?
Soyio es una plataforma SaaS de identidad digital y protección de datos que ayuda a las empresas a verificar identidades, autenticar usuarios, capturar consentimientos, gestionar derechos y firmar documentos con evidencia y trazabilidad.

### ¿Qué servicios ofrece Soyio?
Disponemos de seis módulos que puedes integrar vía API, SDK o widgets:
- **[Gestión de consentimientos](./consent/introduction)**: Captura y actualiza consentimientos de tus usuarios en múltiples canales digitales de manera auditable
- **[Gestión de derechos](./rights-management/introduction)**: Habilita y administra solicitudes de ejercicio de derechos de protección de datos (acceso, rectificación, supresión, etc.)
- **[Centro de privacidad](./privacy-center/introduction)**: Portal para que tus usuarios gestionen sus consentimientos y solicitudes de derechos de forma autónoma
- **[Verificación de identidad](./disclosure/introduction)**: Valida la autenticidad y vigencia del documento y la presencia real del usuario mediante biometría
- **[Autenticación](./authentication/introduction)**: Confirma identidades previamente verificadas mediante biometría o passkeys para proteger operaciones críticas
- **[Firma electrónica](./signature/introduction)**: Solicita y gestiona la firma de documentos con respaldo de evidencia digital y validez legal

## Módulos y alcance

### ¿Puedo integrar los módulos de Soyio por separado?
Sí. Cada módulo (verificación de identidad, autenticación, firma electrónica, gestión de consentimientos, gestión de derechos y centro de privacidad) puede integrarse de forma independiente y combinarse según el flujo que necesites.

### ¿Qué componentes ofrece Soyio para la integración?
- **API REST** para orquestar los procesos.
- **Webhooks** para recibir notificaciones de eventos.
- **Widgets/SDKs** para web y móvil cuando se requiere una UI embebida.

## Entornos y credenciales

### ¿Qué entornos existen?
- **Sandbox**: para pruebas y validaciones internas (ver la [guía de sandbox](./sandbox))
- **Producción**: para flujos en vivo. Asegúrate de migrar configuraciones y claves de forma separada.

### ¿Hay un entorno de pruebas?
Sí. Usa el entorno de **sandbox** para validar tus flujos sin impactar a usuarios reales. Revisa la [guía de sandbox](./sandbox) para credenciales, URLs y buenas prácticas.

### ¿Cómo obtengo credenciales?
Solicita credenciales a través de tu ejecutivo comercial. Las claves de sandbox y producción son distintas.

### ¿Cómo paso a producción?
Sigue los pasos descritos en la [guía de paso a producción](./production) para migrar configuraciones, llaves y webhooks con los controles requeridos.

### ¿Dónde configuro los webhooks?
Revisa la [guía de webhooks](../api/webhooks.md) para registrar las URLs por entorno y confirmar su recepción.

## Experiencia de usuario y cuentas

### ¿Qué es la Cuenta Soyio?
Perfil personal donde el usuario guarda su identidad verificada, registra un método de autenticación fuerte (passkey o biometría) y controla qué comercios pueden acceder a sus datos dentro de la Soyio Verified Network.

### ¿Cómo se crea una Cuenta Soyio?
Tras una verificación exitosa, el flujo ofrece crear la cuenta como paso opcional; si acepta, registra una passkey (con respaldo biométrico) y queda lista para autenticarse en el futuro.

### ¿Qué significa que una identidad sea reutilizable?
Que ya fue verificada antes y cumple las condiciones de confianza: correo coincide, la cuenta está activa (o hubo validación previa con ese comercio) y la autenticación fuerte se completó. En ese caso, evitamos repetir la captura de documentos y solo autenticamos al usuario.

:::tip
Revisa nuestra [guía de verificación de identidad](./disclosure/introduction) para más detalles sobre cómo funciona la reutilización.
:::

### ¿Qué pasa si el usuario no crea una cuenta Soyio?
Podrá completar el flujo solicitado y los datos quedarán únicamente bajo responsabilidad de la empresa que los solicitó, por lo que el usuario no podrá reutilizarlos en otros flujos. Si crea cuenta, podrá autenticarse o firmar en el futuro sin repetir la verificación.

### ¿Qué restricciones de navegador debo considerar?
Las passkeys no funcionan en Firefox y algunos navegadores móviles menos comunes. Prioriza Safari y Chrome en móvil, y comunica la restricción cuando ofrezcas autenticación con passkeys.

## Seguridad y cumplimiento

### ¿Cómo se manejan los datos biométricos?
Las fotos y videos de alta resolución capturados para verificación se procesan y no se almacenan. Si se conserva un vector biométrico cifrado para habilitar autenticación facial cuando el usuario lo autoriza y también imágenes de baja resolución para fines de auditoría.

### ¿Qué debo documentar para cumplimiento?
Mantén registro de: base legal o consentimiento utilizado, finalidades comunicadas, vigencia de los consentimientos, configuraciones de retención y URL de webhook. Usa los IDs de evidencia que entrega Soyio para auditar cada proceso.

### ¿Qué certificaciones o auditorías tiene Soyio?
Consulta nuestro [Trust Center](https://trust.soyio.id) para ver certificaciones, reportes de seguridad y controles vigentes.

## Operación y soporte

### ¿Cómo monitoreo errores en mis flujos?
Revisa los eventos de webhook y los logs del dashboard. Si un error es recurrente (por ejemplo, fallas de liveness o OCR), valida la calidad de captura, la compatibilidad de documentos y la estabilidad de la red.

### ¿Dónde puedo ver el estado del servicio?
Monitorea la disponibilidad en nuestro [status page](https://soyio.instatus.com/).

### ¿Dónde reporto incidentes o solicito ayuda?
Escríbenos a [soporte@soyio.id](mailto:soporte@soyio.id) con los IDs de transacción, entorno, timestamps y pasos para reproducir. Para funcionalidades nuevas, coordina con tu ejecutivo de cuenta.
