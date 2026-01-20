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
  if (!relativePath.startsWith('docs/')) {
    return;
  }

  const markdownPath = relativePath
    .replace(/^docs\//, '')
    .replace(/\/index\.html$/, '.md')
    .replace(/\.html$/, '.md');

  const normalizedMarkdownPath = markdownPath.replace(/\\/g, '/');
  const outputPath = path.join(buildDir, normalizedMarkdownPath);
  const outputDir = path.dirname(outputPath);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, markdown);
  return;
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
      const llmDirectory = path.join(buildDir, 'llms');

      try {
        rmSync(llmDirectory, { recursive: true, force: true });
      } catch (error) {
        console.warn('Failed to remove llms directory', error);
      }

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
      });
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
