---
sidebar_position: 3
---

# Eventos

En este momento, los eventos que enviamos por Webhooks son los siguientes:

- `validation_flow.successful` : El flujo de validación de identidad fue exitoso y se creó un `Identity`. En el payload tendrá un `identityId` correspondiente a la identidad creada y un `userReference` en el caso de haber sido definido al inicio del flujo.
- `validation_flow.failed` : El flujo de validación de identidad falló. Esto no crea una identidad.
- `identity.authenticated`: La autenticación de la identidad fue exitosa.
