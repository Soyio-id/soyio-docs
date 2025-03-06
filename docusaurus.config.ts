import { themes as prismThemes } from 'prism-react-renderer';
import { Config } from '@docusaurus/types';
import * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import { sidebarItemGenerator } from './lib/sidebarItemGenerator';
import type * as FathomAnalyticsPlugin from 'docusaurus-plugin-fathom';

const config: Config = {
  markdown: {
    mermaid: true,
  },
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
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    },
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
            // specPath: 'api/soyioapi.yaml',
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
    'docusaurus-plugin-fathom',
    async function intercom() {
      return {
        name: 'intercom',
        injectHtmlTags: () => {
          return {
            headTags: [
              {
                tagName: 'link',
                attributes: {
                  rel: 'preconnect',
                  href: 'https://widget.intercom.io',
                },
              },
              {
                tagName: 'script',
                innerHTML: `window.intercomSettings={app_id:'t56kvykx'};(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/t56kvykx';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`,
              },
            ],
          };
        },
      };
    },
  ],
  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: 'img/socialcarddocs.png',
    navbar: {
      title: 'Soyio Docs',
      logo: {
        alt: 'Soyio Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
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
          to: '/docs/user-guide/intro',
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
              to: '/docs/integration-guide/intro',
            },
            {
              label: 'Referencia de la API',
              to: '/docs/api/intro',
            },
            {
              label: 'Guía de usuario',
              to: '/docs/user-guide/intro',
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
      copyright: `Copyright © ${new Date().getFullYear()} Soyio US LLC.`,
    },
    languageTabs: [
      { language: 'ruby' },
      { language: 'nodejs' },
      { language: 'python' },
      { language: 'curl' },
      { language: 'csharp' },
      { language: 'java', variant: 'unirest' },
      { language: 'php' },
      { language: 'go', highlight: 'go' },
      { language: 'powershell' },
    ],
    prism: {
      theme: prismThemes.nightOwlLight,
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
    algolia: {
      appId: 'CZDZ5E8BZZ',
      apiKey: '5232edcb1c7751b28bdaab7c1b9cda53',
      indexName: 'soyio',
      searchPagePath: 'search',
      contextualSearch: false,
      insights: true,
    },
    fathomAnalytics: {
      siteId: 'FGFGWGHJ',
    } satisfies FathomAnalyticsPlugin.Options,
  } satisfies Preset.ThemeConfig,
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: false,
      mdxCrossCompilerCache: true,
    },
  },
  themes: ['docusaurus-theme-openapi-docs', '@docusaurus/theme-mermaid'],
};

export default config;
