import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

function removeSidebarLabelFromFile(path: string) {
  console.log(`Removing 'sidebar_label' from ${path}`);
  const content = readFileSync(path, 'utf-8');
  const replacedContent = content.replace(/sidebar_label:\s?["\w]+\n/m, '');
  writeFileSync(path, replacedContent);
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

          paths.forEach((path) => removeSidebarLabelFromFile(path));
        });
    },
  };
}
