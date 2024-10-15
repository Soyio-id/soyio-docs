import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'fs';

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

export default async function soyioDocsPlugin(context) {
  const [, openApiConfig] = context.siteConfig.plugins.find((plugin) => {
    if (typeof plugin !== 'object') return false;
    const [pluginName] = plugin;

    return pluginName === 'docusaurus-plugin-openapi-docs';
  });

  return {
    name: 'soyio-openapi-docs',
    extendCli(cli) {
      cli
        .command('regenerate-docs')
        .description(
          'regenerate docs using openapi plugin + some custom tweaks',
        )
        .action(async () => {
          const { outputDir } = openApiConfig.config.soyio;

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
