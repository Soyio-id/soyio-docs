import { spawn } from 'node:child_process';
import path from 'node:path';
import {
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import { JSDOM } from 'jsdom';
import { htmlToMarkdown } from '../../src/lib/htmlToMarkdown';

type LlmSectionKey = 'integration' | 'api' | 'user';

type LlmDocEntry = {
  title: string;
  description: string;
  docRoute: string;
  markdownRoute: string;
  markdownUrl: string;
  section: LlmSectionKey;
  group: string;
};

type LlmSectionMetadata = {
  title: string;
  description: string;
  introRoute: string;
};

const LLM_SECTION_ORDER: LlmSectionKey[] = ['integration', 'api', 'user'];

const LLM_SECTION_METADATA: Record<LlmSectionKey, LlmSectionMetadata> = {
  integration: {
    title: 'Guia de Integracion',
    description:
      'Tutoriales y conceptos para implementar Soyio en productos y flujos de negocio.',
    introRoute: '/docs/integration-guide/intro',
  },
  api: {
    title: 'Referencia de API',
    description:
      'Documentacion tecnica de endpoints, eventos, recursos y esquemas de la API de Soyio.',
    introRoute: '/docs/api/intro',
  },
  user: {
    title: 'Guia de Usuario',
    description:
      'Ayuda para usuarios finales: uso de funcionalidades, passkeys y troubleshooting.',
    introRoute: '/docs/user-guide/intro',
  },
};

const LLM_GROUP_ORDER: Record<LlmSectionKey, string[]> = {
  integration: [
    'Fundamentos y puesta en marcha',
    'Consentimiento',
    'Gestion de derechos',
    'Centro de privacidad',
    'Verificacion de identidad',
    'Autenticacion',
    'Firma electronica',
    'REDEC',
    'Otros',
  ],
  api: ['Fundamentos de API', 'Recursos de API', 'Esquemas', 'Otros'],
  user: ['General', 'Guias especificas', 'Otros'],
};

function normalizeBaseUrl(baseUrl: string) {
  const withLeadingSlash = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;
  const withoutTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
  return withoutTrailingSlash || '';
}

function withBaseUrl(route: string, baseUrl: string) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  return `${normalizedBaseUrl}${route}`;
}

function buildAbsoluteUrl(siteUrl: string, route: string, baseUrl: string) {
  const routeWithBase = withBaseUrl(route, baseUrl);
  return new URL(routeWithBase, `${siteUrl}/`).toString();
}

function toDocRoute(relativeHtmlPath: string) {
  return `/${relativeHtmlPath
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '')}`;
}

function toMarkdownRoute(docRoute: string) {
  if (docRoute === '/docs') {
    return '/docs/index.md';
  }

  return docRoute.endsWith('.md') ? docRoute : `${docRoute}.md`;
}

function toMarkdownRelativePath(relativeHtmlPath: string) {
  if (!relativeHtmlPath.startsWith('docs/')) {
    return null;
  }

  const markdownPath = relativeHtmlPath
    .replace(/\/index\.html$/, '.md')
    .replace(/\.html$/, '.md');

  return markdownPath === 'docs.md' ? 'docs/index.md' : markdownPath;
}

function inferTitleFromRoute(docRoute: string) {
  const lastSegment = docRoute.split('/').filter(Boolean).at(-1) || 'documento';
  return lastSegment
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function extractTitleFromMarkdown(markdown: string, fallbackTitle: string) {
  const headingMatch = markdown.match(/^#\s+(.+)$/m);
  return headingMatch?.[1]?.trim() || fallbackTitle;
}

function extractDescriptionFromMarkdown(markdown: string) {
  const lines = markdown.split('\n');
  const descriptionLines: string[] = [];
  let insideCodeBlock = false;

  for (const rawLine of lines) {
    const trimmedLine = rawLine.trim();

    if (trimmedLine.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock;
      continue;
    }

    if (insideCodeBlock) {
      continue;
    }

    if (descriptionLines.length > 0 && trimmedLine.length === 0) {
      break;
    }

    if (
      trimmedLine.length === 0 ||
      trimmedLine.startsWith('#') ||
      trimmedLine.startsWith(':::') ||
      trimmedLine.startsWith('import ') ||
      trimmedLine.startsWith('export ') ||
      trimmedLine.startsWith('|') ||
      /^\*\*(info|note|tip|warning|danger)\*\*/i.test(trimmedLine) ||
      /^[-*]\s/.test(trimmedLine)
    ) {
      continue;
    }

    const normalizedLine = trimmedLine.replace(/^>\s?/, '');
    if (normalizedLine.length === 0) {
      continue;
    }

    descriptionLines.push(normalizedLine);
  }

  const rawDescription = descriptionLines.join(' ');
  const withoutImages = rawDescription.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
  const withoutLinks = withoutImages.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const withoutInlineCode = withoutLinks.replace(/`([^`]+)`/g, '$1');
  const normalizedDescription = withoutInlineCode
    .replace(/\s+/g, ' ')
    .replace(/^!+/, '')
    .trim();

  if (normalizedDescription.length === 0) {
    return 'Documentacion de Soyio.';
  }

  return normalizedDescription.length > 200
    ? `${normalizedDescription.slice(0, 197)}...`
    : normalizedDescription;
}

function resolveSection(docRoute: string): LlmSectionKey | null {
  if (docRoute.startsWith('/docs/integration-guide/')) {
    return 'integration';
  }

  if (docRoute.startsWith('/docs/api/')) {
    return 'api';
  }

  if (docRoute.startsWith('/docs/user-guide/')) {
    return 'user';
  }

  return null;
}

function resolveGroup(section: LlmSectionKey, docRoute: string) {
  if (section === 'integration') {
    if (docRoute.startsWith('/docs/integration-guide/consent/')) {
      return 'Consentimiento';
    }
    if (docRoute.startsWith('/docs/integration-guide/rights-management/')) {
      return 'Gestion de derechos';
    }
    if (docRoute.startsWith('/docs/integration-guide/privacy-center/')) {
      return 'Centro de privacidad';
    }
    if (docRoute.startsWith('/docs/integration-guide/disclosure/')) {
      return 'Verificacion de identidad';
    }
    if (docRoute.startsWith('/docs/integration-guide/authentication/')) {
      return 'Autenticacion';
    }
    if (docRoute.startsWith('/docs/integration-guide/signature/')) {
      return 'Firma electronica';
    }
    if (docRoute.startsWith('/docs/integration-guide/redec/')) {
      return 'REDEC';
    }
    if (docRoute.startsWith('/docs/integration-guide/')) {
      return 'Fundamentos y puesta en marcha';
    }
    return 'Otros';
  }

  if (section === 'api') {
    if (docRoute.startsWith('/docs/api/resources/schemas/')) {
      return 'Esquemas';
    }
    if (docRoute.startsWith('/docs/api/resources/')) {
      return 'Recursos de API';
    }
    if (docRoute.startsWith('/docs/api/')) {
      return 'Fundamentos de API';
    }
    return 'Otros';
  }

  if (docRoute.startsWith('/docs/user-guide/specific-guides')) {
    return 'Guias especificas';
  }
  if (docRoute.startsWith('/docs/user-guide/')) {
    return 'General';
  }
  return 'Otros';
}

function writeLlmIndexFile(
  buildDir: string,
  entries: LlmDocEntry[],
  siteUrl: string,
  baseUrl: string,
) {
  const lines: string[] = [
    '# Soyio Docs',
    '',
    '> Documentacion de la infraestructura de la privacidad digital',
    '',
    'Este archivo organiza la documentacion para LLMs siguiendo las secciones principales de la navegacion del sitio.',
    '',
    '## Secciones principales',
    '',
  ];

  const sectionEntries = new Map<LlmSectionKey, LlmDocEntry[]>(
    LLM_SECTION_ORDER.map((sectionKey) => [sectionKey, []]),
  );

  entries.forEach((entry) => {
    sectionEntries.get(entry.section)?.push(entry);
  });

  LLM_SECTION_ORDER.forEach((sectionKey) => {
    const metadata = LLM_SECTION_METADATA[sectionKey];
    const docs = sectionEntries.get(sectionKey) || [];
    const introMarkdownRoute = toMarkdownRoute(metadata.introRoute);
    const introUrl = buildAbsoluteUrl(siteUrl, introMarkdownRoute, baseUrl);

    lines.push(
      `- [${metadata.title}](${introUrl}): ${metadata.description} (${docs.length} paginas).`,
    );
  });

  lines.push('');

  LLM_SECTION_ORDER.forEach((sectionKey) => {
    const metadata = LLM_SECTION_METADATA[sectionKey];
    const docs = (sectionEntries.get(sectionKey) || [])
      .slice()
      .sort((a, b) => a.docRoute.localeCompare(b.docRoute, 'es'));

    if (docs.length === 0) {
      return;
    }

    lines.push(`## ${metadata.title}`);
    lines.push('');

    const docsByGroup = new Map<string, LlmDocEntry[]>();
    docs.forEach((doc) => {
      if (!docsByGroup.has(doc.group)) {
        docsByGroup.set(doc.group, []);
      }
      docsByGroup.get(doc.group)?.push(doc);
    });

    const knownGroupOrder = LLM_GROUP_ORDER[sectionKey];
    const discoveredGroups = Array.from(docsByGroup.keys()).filter(
      (group) => !knownGroupOrder.includes(group),
    );
    const groupOrder = [
      ...knownGroupOrder,
      ...discoveredGroups.sort((a, b) => a.localeCompare(b, 'es')),
    ];

    groupOrder.forEach((group) => {
      const groupDocs = docsByGroup.get(group);
      if (!groupDocs || groupDocs.length === 0) {
        return;
      }

      lines.push(`### ${group}`);
      lines.push('');

      groupDocs
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title, 'es'))
        .forEach((doc) => {
          lines.push(
            `- [${doc.title}](${doc.markdownUrl}): ${doc.description}`,
          );
        });

      lines.push('');
    });
  });

  writeFileSync(
    path.join(buildDir, 'llms.txt'),
    `${lines.join('\n').trimEnd()}\n`,
  );
}

function removeSidebarLabelFromFile(path: string) {
  console.log(`Removing 'sidebar_label' from ${path}`);
  const content = readFileSync(path, 'utf-8');
  const replacedContent = content.replace(/sidebar_label:\s?["\w]+\n/m, '');
  writeFileSync(path, replacedContent);
}

function addDefaultCollapsibleOpenToFile(path: string) {
  console.log(`Adding 'defaultCollapsibleOpen' to ${path}`);
  const content = readFileSync(path, 'utf-8');
  const replacedContent = content.replace(
    /<Schema/m,
    '<Schema\n\tdefaultCollapsibleOpen={true}',
  );
  writeFileSync(path, replacedContent);
}

function purgeIndexFile(dir?: string) {
  if (!dir) return;

  rmSync(`${dir}/soyio-api.info.mdx`);
  const content = readFileSync(`${dir}/sidebar.ts`, 'utf-8');
  const replacedContent = content.replace(
    `
    {
      type: "doc",
      id: "api/resources/soyio-api",
    },`,
    '',
  );
  writeFileSync(`${dir}/sidebar.ts`, replacedContent);
}

function getHtmlFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getHtmlFiles(entryPath);
    }
    return entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

function getDocContentFromHtml(html: string) {
  const match = html.match(/<article[\s\S]*?<\/article>/i);
  if (!match) {
    return null;
  }

  const articleHtml = match[0];
  const dom = new JSDOM(articleHtml);
  const article = dom.window.document.querySelector('article');
  if (!article) {
    return null;
  }

  return {
    element:
      article.querySelector('.markdown') ||
      article.querySelector('.theme-api-markdown'),
    origin: dom.window.location.origin || 'https://docs.soyio.id',
    document: dom.window.document,
  };
}

function writeMarkdownOutput(
  buildDir: string,
  htmlPath: string,
  markdown: string,
) {
  const relativePath = path.relative(buildDir, htmlPath).replace(/\\/g, '/');
  const markdownPath = toMarkdownRelativePath(relativePath);
  if (!markdownPath) {
    return;
  }

  const normalizedMarkdownPath = markdownPath.replace(/\\/g, '/');
  const outputPath = path.join(buildDir, normalizedMarkdownPath);
  const outputDir = path.dirname(outputPath);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, markdown);
}

function createLlmDocEntry(
  buildDir: string,
  htmlPath: string,
  markdown: string,
  siteUrl: string,
  baseUrl: string,
): LlmDocEntry | null {
  const relativePath = path.relative(buildDir, htmlPath).replace(/\\/g, '/');
  if (!relativePath.startsWith('docs/')) {
    return null;
  }

  const docRoute = toDocRoute(relativePath);
  const markdownRoute = toMarkdownRoute(docRoute);
  const section = resolveSection(docRoute);
  if (!section) {
    return null;
  }

  const group = resolveGroup(section, docRoute);
  const fallbackTitle = inferTitleFromRoute(docRoute);
  const title = extractTitleFromMarkdown(markdown, fallbackTitle);
  const description = extractDescriptionFromMarkdown(markdown);
  const markdownUrl = buildAbsoluteUrl(siteUrl, markdownRoute, baseUrl);

  return {
    title,
    description,
    docRoute,
    markdownRoute,
    markdownUrl,
    section,
    group,
  };
}

async function spawnProcess(command: string, args: string[]) {
  const alias = [command, ...args].join(' ');
  console.log(`Executing '${alias}'`);
  const process = spawn(command, args);
  process.stdout.setEncoding('utf-8');
  process.stderr.setEncoding('utf-8');

  return new Promise((resolve, reject) => {
    process.stdout.on('data', (message) => console.log(message));
    process.stderr.on('data', (error) => console.error(error));
    process.on('close', (code) => {
      console.log(`child process '${alias}' exited with code ${code}`);
      if (code === 0) resolve(code);
      else reject(code);
    });
  });
}

export default async function soyioDocsPlugin(
  context: LoadContext,
): Promise<Plugin<unknown>> {
  const openApiPlugin = context.siteConfig.plugins.find((plugin) => {
    if (!plugin) return false;
    if (typeof plugin !== 'object') return false;
    const [pluginName] = plugin;

    return pluginName === 'docusaurus-plugin-openapi-docs';
  });

  if (!openApiPlugin)
    throw new Error(
      'docusaurus-plugin-openapi-docs not found in config, needed for soyio docs plugin',
    );

  const [, openApiConfig] = openApiPlugin as [string, PluginOptions];

  return {
    name: 'soyio-openapi-docs',
    postBuild() {
      const buildDir = context.outDir;
      const llmEntriesByRoute = new Map<string, LlmDocEntry>();

      const htmlFiles = getHtmlFiles(path.join(buildDir, 'docs'));
      htmlFiles.forEach((filePath) => {
        const html = readFileSync(filePath, 'utf-8');
        const docData = getDocContentFromHtml(html);
        if (!docData?.element) {
          return;
        }

        const markdown = htmlToMarkdown(
          docData.element as HTMLElement,
          context.siteConfig.url,
        );
        writeMarkdownOutput(buildDir, filePath, markdown);

        const llmEntry = createLlmDocEntry(
          buildDir,
          filePath,
          markdown,
          context.siteConfig.url,
          context.siteConfig.baseUrl,
        );

        if (llmEntry) {
          llmEntriesByRoute.set(llmEntry.markdownRoute, llmEntry);
        }
      });

      writeLlmIndexFile(
        buildDir,
        Array.from(llmEntriesByRoute.values()),
        context.siteConfig.url,
        context.siteConfig.baseUrl,
      );
    },
    extendCli(cli) {
      cli
        .command('regenerate-api-docs')
        .description(
          'regenerate docs using openapi plugin + some custom tweaks',
        )
        .action(async () => {
          const apis = openApiConfig.config as {
            [key: string]: OpenApiPlugin.Options;
          };
          const { outputDir } = apis.soyio;

          await spawnProcess('npm', [
            'run',
            'docusaurus',
            'clean-api-docs',
            'all',
          ]);

          await spawnProcess('npm', [
            'run',
            'docusaurus',
            'gen-api-docs',
            'all',
          ]);

          const dir = `${outputDir}/schemas/`;
          const items = readdirSync(dir);
          const paths = items.map((item) => `./${dir}/${item}`);

          paths.forEach((path) => {
            removeSidebarLabelFromFile(path);
            addDefaultCollapsibleOpenToFile(path);
          });

          purgeIndexFile(outputDir);
        });
    },
  };
}
