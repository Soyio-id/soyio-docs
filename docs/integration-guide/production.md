# Paso a Producción

Cuando estés listo para comenzar a utilizar Soyio en un ambiente productivo, deberás seguir estos pasos importantes.

:::warning[Importante]
En el ambiente de producción, todas las solicitudes y transacciones **serán reales**.
:::


## Preparación

Asegúrate de:

- Haber probado exhaustivamente tu integración en el ambiente sandbox
- Tener todos los flujos validados y funcionando correctamente
- Contar con los procedimientos de contingencia necesarios

## URL Base de Producción

Para el ambiente productivo, deberás utilizar la siguiente URL base:

```bash
https://app.soyio.id
```

## Consideraciones Importantes

### API Token

El `api_token` que utilizas en sandbox seguirá siendo válido en producción. Solo necesitas actualizar la URL base en tu implementación para comenzar a operar en el ambiente productivo. Te recomendamos utilizar una variable de entorno asociada a tu ambiente para evitar errores de configuración.

### Webhooks

Los webhooks configurados son transferibles entre ambientes. No necesitas realizar configuraciones adicionales una vez que migres a producción. Esto también aplica para los templates de Disclosure y Firma.

### Ambiente Sandbox

Incluso después de migrar a producción, mantendrás acceso al ambiente sandbox. Esto te permitirá:
- Continuar realizando pruebas
- Implementar nuevas funcionalidades

## Activación de Cuenta en Producción

Para habilitar tu cuenta en el ambiente de producción:

1. Asegúrate de haber completado todas las pruebas necesarias
2. Contacta al equipo de [soporte de Soyio](mailto:soporte@soyio.id)
3. Solicita la activación de tu cuenta para el ambiente productivo

Nuestro equipo de soporte te guiará durante el proceso de activación y resolverá cualquier duda que puedas tener.

¡Éxito!
