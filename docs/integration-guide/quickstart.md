---
sidebar_position: 2
---

# Inicio Rápido

A continuación te resumimos el proceso de integración en una serie de pasos a seguir:

## 1. Crea y configura tu cuenta

1. Crea una cuenta en Soyio.id (En este momento nos avisas y la creamos nosotros 😇).
2. Obtén tu `api_token` para poder utilizar nuestra API.
3. Configura un Webhook (a.k.a. avísanos que URL te hacemos los `POST`) en tu cuenta para poder recibir los eventos de registro / autenticación

## 2. Monta nuestro SDK en tu sitio o App

Hoy contamos con dos librerías de front para que puedas instalar de manera sencilla:

- [`soyio-widget`](https://www.npmjs.com/package/@soyio/soyio-widget) (Web)
- [`soyio-rn-sdk`](https://www.npmjs.com/package/@soyio/soyio-rn-sdk) (Mobile/ React Native)

:::tip[Tip]
Sigue los pasos del `Readme` de cada uno de estos proyectos para instalar
:::

Estas librerías proveen tres funciones principales:

### Registro y validación de identidad

Para un onboarding (o posterior validación) se valida y registra la identidad de un usuario en nuestra plataforma. Puedes utilizar una referencia de tu BD en `userReference` , el cual será persistido desde nuestro lado para que luego puedas vincular tu usuario con nuestro `Identity` .

### Autenticación

Úsalo para autenticar a un usuario cuando necesites. Simplemente nos pasas su `identityId` asociado y nosotros hacemos el resto.

### Firma de documentos

Cuando necesitas que tu usuario firme un documento de manera segura y autenticada. Revisa nuestra [guía de firma de documentos](./signature).

## 3. Escucha los eventos

Tanto nuestras librerías front como nuestra API, emitirán eventos para que puedas tomar las acciones correspondientes tanto en tu sitio o App (ej: avanzar en el proceso, habilitar un acceso), como en tu backend (ej: lógica de negocio particular, actualizar registros)

:::info
Lee más acerca de esto en nuestra [sección de eventos](./events).
:::

## 4. Accede a la información de identidad mediante el API

Una vez que una identidad se valida y registra, puedes rescatar los datos del usuario mediante el siguiente endpoint:

`GET /api/v1/identities/:identityId`

### Acceso de los datos

Los datos que devuelva este endpoint **dependerá del consentimiento del usuario** al momento de registrar y validar su identidad.

## 5. Prueba y lanza tu integración

Una vez que hayas configurado todo, es importante probar la integración en el entorno sandbox antes de pasar a producción. Asegúrate de que los flujos de validación y autenticación funcionen como esperas y que los eventos se gestionen correctamente.

### Simular una validación fallida en proceso de registro

En el ambiente sandbox, en el proceso de registro, puedes agregar el campo `forceError`  con el valor `validation_error` a la hora de invocar nuestro widget. En este contexto, nuestro sistema simulará el flujo **como uno fallido**, y enviará los eventos acorde a esto.

### Pasa a producción

Una vez que estés listo, **avísanos para habilitar el acceso de tu cuenta a producción.**

:::warning[☝ Recuerda]
En producción debes apuntar a https://app.soyio.id. Si tu cuenta no tiene acceso aún, se responderá con un `403: Forbidden`
:::
