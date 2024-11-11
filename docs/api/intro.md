# Introducción

Bienvenido a la API de Soyio. A través de ella, podrás acceder a los distintos endpoints que te permitirán operar y obtener información de los recursos de la plataforma.

El API esta organizado alrededor de [REST](https://es.wikipedia.org/wiki/REST). Nuestra API posee URLs predecibles y orientadas a recursos, y utiliza códigos de respuesta HTTP para indicar el resultado de la llamada. Todas las respuestas de la API retornan objetos JSON, incluyendo los errores, sin embargo, nuestros SDK convertirán las respuestas a objetos específicos de cada lenguaje.

Utilizamos características incluidas en el protocolo HTTP, como autenticación y verbos, los cuales son soportados por la gran mayoría de los clientes HTTP. Soportamos [CORS](https://es.wikipedia.org/wiki/Cross-Origin_Resource_Sharing), lo cual permite interactuar de manera segura con nuestra API desde una aplicación web desde el lado del cliente.

:::tip
**¿Recién empezando?** Te recomendamos revisar nuestra [guía de inicio rápido](../integration-guide/quickstart.md).
:::
