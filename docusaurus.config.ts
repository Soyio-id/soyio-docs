import { themes as prismThemes } from 'prism-react-renderer';
import { Config } from '@docusaurus/types';
import * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import { sidebarItemGenerator } from './lib/sidebarItemGenerator';

const config: Config = {
  title: 'Soyio Docs',
  tagline: 'Documentación de la infraestructura de la privacidad digital',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.soyio.id',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'soyio-id', // Usually your GitHub org/user name.
  projectName: 'soyio-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem', // Derived from docusaurus-theme-openapi
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api', // plugin id
        docsPluginId: 'classic', // configured for preset-classic
        config: {
          soyio: {
            specPath: 'https://soyio-docs.s3.amazonaws.com/soyio-open-api.yaml',
            outputDir: 'docs/api/resources',
            sidebarOptions: {
              groupPathsBy: 'tag',
              sidebarGenerators: {
                createDocItem: sidebarItemGenerator,
              },
            },
          } as OpenApiPlugin.Options,
        },
      },
    ],
    './lib/soyioDocs/index.ts',
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/socialcarddocs.png',
    navbar: {
      title: 'Soyio Docs',
      logo: {
        alt: 'Soyio Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          sidebarId: 'integrationSidebar',
          position: 'left',
          label: 'Guías de integración',
          to: '/docs/integration-guide/intro',
        },
        {
          label: 'Referencia de la API',
          to: '/docs/api/intro',
          position: 'left',
        },
        {
          label: 'Guías de usuario',
          to: '/docs/user-guide/troubleshooting',
          sidebarId: 'userGuideSidebar',
          position: 'left',
        },
        {
          href: 'https://github.com/soyio-id/soyio-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Guía de integración',
              to: '/docs/intro',
            },
            {
              label: 'Referencia de la API',
              to: '/api/',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'Más',
          items: [
            {
              label: 'Página principal',
              href: 'https://soyio.id',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/soyio-id/soyio-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Soyio SpA.`,
    },
    languageTabs: [
      { language: 'ruby' },
      { language: 'nodejs' },
      { language: 'python' },
      { language: 'curl' },
      { language: 'csharp' },
      { language: 'java', variant: 'unirest' },
      { language: 'php' },
      { language: 'go', higlight: 'go' },
      { language: 'powershell' },
    ],
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'ruby',
        'csharp',
        'go',
        'java',
        'php',
        'json',
        'bash',
        'powershell',
      ],
    },
  } satisfies Preset.ThemeConfig,
  themes: ['docusaurus-theme-openapi-docs'], // export theme components
};

export default config;
