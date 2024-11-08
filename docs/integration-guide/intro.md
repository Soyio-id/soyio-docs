# Introducción

¿Así que quieres integrar Soyio? Estás en el **lugar correcto**. A continuación te contamos en esta documentación sobre lo necesario para poder integrarte a nuestra plataforma.

## Lo que necesitas

- Ganas
- Talento (no tanto la verdad)
- Paciencia (esperemos que no)

## Autenticación

Soyio utiliza [Token Based Authentication](https://web.archive.org/web/20220629183322/https://www.w3.org/2001/sw/Europe/events/foaf-galway/papers/fp/token_based_authentication/) sobre HTTPS para la autenticación. Los request no autenticados retornarán una respuesta HTTP 401. Las llamadas sobre HTTP simple también fallarán.

### **Header de autenticación**

Este tiene el siguiente formato:

`Authorization: <api_token>`

Donde `api_token` es el asociado a tu cuenta.

## Ambientes

Para facilitar la integración, contamos las siguientes URLs:

- `sandbox.soyio.id`: Corresponde al ambiente de **Sandbox**. Todo lo que hagas acá está asilado de producción y las validaciones son mocks.
- `app.soyio.id`: Corresponde al ambiente de **Producción.**


:::info[Pro Tip]

Podrás acceder a ambas URLs con el mismo `api_token`

:::
