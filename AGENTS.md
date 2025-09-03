# Project Overview

This project is a documentation website built with [Docusaurus](https://docusaurus.io/). It provides comprehensive documentation for the Soyio API, including an API reference, integration guides, and user guides.

The website is structured into three main sections:

*   **API Reference:** This section is automatically generated from an OpenAPI specification file using the `docusaurus-plugin-openapi-docs` plugin. It provides detailed information about all available API endpoints, including request and response formats.
*   **Integration Guides:** This section provides step-by-step instructions on how to integrate with the Soyio API. It covers topics such as authentication, sandbox mode, and webhooks.
*   **User Guides:** This section contains guides for end-users, explaining how to use various features of the Soyio platform.

The project also includes a custom Docusaurus plugin that extends the CLI with a `regenerate-api-docs` command. This command automates the process of cleaning, regenerating, and customizing the API documentation.

# Building and Running

**Installation:**

```bash
npm install
```

**Local Development:**

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

**Build:**

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

**Regenerate API Docs:**

To regenerate the API docs after changes to the OpenAPI spec, run:

```bash
npm run docusaurus regenerate-api-docs
```

# Development Conventions

*   **Linting:** The project uses ESLint for linting. Run `npm run lint` to check for any linting errors.
*   **Code Style:** The project uses Prettier for code formatting. It is recommended to install the Prettier extension for your code editor to automatically format code on save.
*   **Testing:** The project uses Playwright for end-to-end testing. Run `npm run test:e2e` to run the tests.

## Estructura de la Documentación
Para mantener el orden y facilitar la navegación, nuestra documentación se divide en tres grandes áreas. Al crear un nuevo documento, ubícalo en la sección que mejor corresponda a su propósito y audiencia.

### Referencia de la API
- **Propósito:** Dirigida a desarrolladores que necesitan detalles técnicos sobre cada endpoint.
- **Contenido:** Documentación autogenerada desde OpenAPI, guías de autenticación, errores, webhooks, etc.
- **Ubicación:** `docs/api/`
- **Nota:** Los archivos en `docs/api/resources/` son autogenerados. No los edites directamente.

### Guía de Integración
- **Propósito:** Dirigida a desarrolladores que están construyendo una integración con Soyio.
- **Contenido:** Tutoriales (Quickstart), explicaciones de conceptos clave y guías de módulos.
- **Ubicación:** `docs/integration-guide/`

### Guía de Usuario
- **Propósito:** Dirigida a usuarios finales de la plataforma (no necesariamente técnicos).
- **Contenido:** Guías de uso de la interfaz, preguntas frecuentes (FAQ) y explicaciones funcionales.
- **Ubicación:** `docs/user-guide/`

# Content Style Guide

For guidelines on writing documentation, including tone, voice, and usage of Docusaurus components, refer to the [Content Style Guide](./STYLE_GUIDE.md).
