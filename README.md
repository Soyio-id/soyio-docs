# Soyio Docs

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

### Local Development

```
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### OpenAPI plugin

We use `docusaurus-plugin-openapi-docs` to autogenerate our API reference files.

Some customizations are made, so we made our own plugin to bypass some non-customizable stuff from the openapi plugin.

In order to regenerate the API docs given new changes in the API spec, you should run:

```bash
pnpm regenerate-api-docs
```

This should:

1. Clean all previous generated files
2. Regenerate all the files given the latest OpenAPI spec uploaded in our AWS S3 buckets
3. Make some minor customizations not available through the official plugin

We highly discourage editing these files manually, because every regeneration will delete those changes.

### Linting and code style

The codebase uses `prettier` as code style enforcer. Please install it within your corresponding code editor.

We also use `eslint` as linter. Just run `pnpm lint` to check if any offenses were commited.
