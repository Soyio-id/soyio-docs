# Paso a producción

Cuando estés listo para comenzar a utilizar Soyio en un entorno productivo, sigue estos pasos para asegurar una transición segura y controlada.

:::warning[Importante]
En el ambiente de producción, todas las solicitudes y transacciones son reales y generan evidencias auditables.
:::

## Checklist de Preparación

Antes de desplegar tu entorno de producción, asegúrate de cumplir con el siguiente checklist:

- [ ] Haber probado exhaustivamente tu integración en el ambiente sandbox.
- [ ] Confirmar que todos los flujos funcionen correctamente.
- [ ] Contar con procedimientos de contingencia y monitoreo en caso de fallos.
- [ ] Definir la estructura organizacional de tu empresa (productos o filiales que agrupan tus flujos).
- [ ] Verificar que las plantillas de consentimiento estén correctamente asociadas a los productos o filiales.
- [ ] Revisar las opciones de personalización de la apariencia y de comportamiento (logo, colores, etc.).
- [ ] Configurar correctamente los dominios autorizados para embeber componentes de Soyio (whitelists).
- [ ] Revisar la rotación, permisos y fecha de expiración de tus API Keys.
- [ ] Definir los usuarios administrativos y los métodos de acceso seguros (SSO con Google/Microsoft, MFA con passkeys o contraseñas seguras).

:::tip[Tip]
Consulta la guía [Probar en Sandbox](./sandbox) para conocer los pasos recomendados antes de esta etapa.
:::

## URL base de producción

Para el ambiente productivo, utiliza la siguiente URL base:

```bash
https://app.soyio.id
```

## Consideraciones importantes

### API Keys de production

**Importante**: Las API keys son específicas para cada entorno. No puedes usar las mismas API keys de sandbox en production.

#### Creación de API Keys para production

1. **Crea API keys específicas para production**: Utiliza la API para crear nuevas API keys con el prefijo `ak_live_`
2. **Configura scopes apropiados**: Asegúrate de que las API keys tengan solo los permisos necesarios para tu aplicación
3. **Gestiona la expiración**: Las API keys de production expiran en 90 días por defecto. Planifica la rotación regular
4. **Almacena de forma segura**: Utiliza variables de entorno y sistemas de gestión de secretos para almacenar las API keys

#### Ejemplo de configuración:

```bash
# Ambiente sandbox
SOYIO_API_KEY=ak_sandbox_1B2M2Y8AsgTpgAmY7PhCfg
SOYIO_BASE_URL=https://sandbox.soyio.id

# Ambiente production
SOYIO_API_KEY=ak_live_2C3N3Z9BthUpgBnZ8QiDgh
SOYIO_BASE_URL=https://app.soyio.id
```

### Webhooks

Los webhooks configurados son compartidos entre ambientes. No necesitas realizar configuraciones adicionales una vez que migres a producción. Esto también aplica para los templates de Disclosure y Firma.

Sin embargo, asegúrate de que:

1. **Las URLs de webhook** estén configuradas para recibir notificaciones de ambos ambientes
2. **Tu aplicación pueda distinguir** entre webhooks de sandbox y production
3. **Los endpoints de webhook** estén preparados para manejar el tráfico de production

### Rotación de API Keys

Para mantener la seguridad en production:

- **Establece un calendario de rotación** (recomendado: cada 60-90 días)
- **Utiliza múltiples API keys** para diferentes servicios o aplicaciones
- **Implementa un proceso de rotación sin downtime** creando la nueva key antes de revocar la anterior

### Ambiente sandbox

Incluso después de migrar a producción, mantendrás acceso al ambiente sandbox. Esto te permitirá:
- Continuar realizando pruebas
- Implementar nuevas funcionalidades
- Probar cambios antes de aplicarlos en production

## Activación de cuenta en producción

Para habilitar tu cuenta en el ambiente de producción:

1. Verifica que cumplas con el checklist de preparación.
2. Contacta al equipo de [soporte de Soyio](mailto:soporte@soyio.id)
3. Solicita la activación de tu cuenta para el ambiente productivo

Nuestro equipo de soporte te guiará durante el proceso de activación y resolverá cualquier duda que puedas tener.

:::tip[Mejores Prácticas]
- Mantén las API keys de production separadas de las de sandbox
- Utiliza sistemas de gestión de secretos como AWS Secrets Manager, HashiCorp Vault, o Azure Key Vault
- Implementa monitoreo y alertas para detectar uso anómalo de API keys
- Documenta el proceso de rotación de keys para tu equipo
:::

¡Éxito!
