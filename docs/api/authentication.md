# Autenticación


Soyio utiliza [Token Based Authentication sobre HTTPS](https://es.wikipedia.org/wiki/Autenticaci%C3%B3n_basada_en_tokens) para la autenticación. Para tener acceso a nuestra API, accede a tu cuenta en nuestro dashboard y utiliza el token que se encuentra en la sección API. Los request no autenticados retornarán una respuesta HTTP 401. Las llamadas sobre HTTP simple también fallarán.

## Header de autenticación

Este tiene el siguiente formato:

`Authorization: <api_token>`

Donde `api_token` es el asociado a la cuenta del comercio.

Ejemplo:

```shell
Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCBjb21tZXJjZSIsImFwaV90b2tlbiI6dHJ1ZX0.AXt3ep_r23w9rSPTv-AnK42s2m-1O0okMYrYYDlRyXA
```

:::warning

Importante: Usa HTTPS para todos los requests. Requests hechos mediante HTTP retornarán respuestas HTTP 403. **¡Mantén tu API token en secreto!**

:::
