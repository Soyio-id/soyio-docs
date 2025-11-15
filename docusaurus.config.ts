import dotenv from 'dotenv';
import { themes as prismThemes } from 'prism-react-renderer';
import { Config } from '@docusaurus/types';
import * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import { sidebarItemGenerator } from './lib/sidebarItemGenerator';
import type * as FathomAnalyticsPlugin from 'docusaurus-plugin-fathom';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });
const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID ?? '';
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID ?? '';
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY ?? '';
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME ?? '';
const FATHOM_SITE_ID = process.env.FATHOM_SITE_ID ?? '';
const INTERCOM_LAUNCHER_SELECTOR = '#soyio-intercom-launcher';
const intercomSnippet = INTERCOM_APP_ID
  ? `window.intercomSettings={app_id:'${INTERCOM_APP_ID}',hide_default_launcher:true,custom_launcher_selector:'${INTERCOM_LAUNCHER_SELECTOR}',disabled:true};(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${INTERCOM_APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`
  : null;

const algoliaConfig =
  ALGOLIA_APP_ID && ALGOLIA_API_KEY && ALGOLIA_INDEX_NAME
    ? {
        appId: ALGOLIA_APP_ID,
        apiKey: ALGOLIA_API_KEY,
        indexName: ALGOLIA_INDEX_NAME,
        searchPagePath: 'search',
        contextualSearch: false,
        insights: true,
      }
    : undefined;

const fathomAnalyticsConfig: FathomAnalyticsPlugin.Options | undefined =
  FATHOM_SITE_ID
    ? {
        siteId: FATHOM_SITE_ID,
      }
    : undefined;

const config: Config = {
  customFields: {
    intercomAppId: INTERCOM_APP_ID,
  },
  markdown: {
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'warn'},
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
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
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
    ...(FATHOM_SITE_ID ? ['docusaurus-plugin-fathom'] : []),
    'docusaurus-plugin-image-zoom',
    async function intercom() {
      return {
        name: 'intercom',
        injectHtmlTags: () => {
          if (process.env.NODE_ENV !== 'production' || !intercomSnippet) return {};

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
                innerHTML: intercomSnippet,
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
        // hideable: true,
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
          label: 'Solicita una cuenta',
          href: 'https://soyio.typeform.com/formularioweb',
          position: 'right',
        }
      ],
    },
    footer: {
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
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/soyio/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Soyio-id',
            },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: 'Página principal',
              href: 'https://soyio.id',
            },
            {
              label: 'Trust Center',
              href: 'https://trust.soyio.id',
            },
            {
              label: 'Status page',
              href: 'https://soyio.instatus.com/',
            }
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Soyio US LLC.`,
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
    ...(algoliaConfig
      ? {
          algolia: algoliaConfig,
        }
      : {}),
    ...(fathomAnalyticsConfig
      ? {
          fathomAnalytics: fathomAnalyticsConfig,
        }
      : {}),
    zoom: {
      selector: '.markdown > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: '#0B0C0D'
      },
      config: {
        margin: 48,
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    },
  } satisfies Preset.ThemeConfig,
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },
  themes: ['docusaurus-theme-openapi-docs', '@docusaurus/theme-mermaid'],
};

export default config;
