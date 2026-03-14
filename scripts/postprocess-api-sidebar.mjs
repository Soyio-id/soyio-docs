import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const sidebarPath = new URL('../docs/api/resources/sidebar.ts', import.meta.url);
const resourcesDirPath = fileURLToPath(new URL('../docs/api/resources', import.meta.url));
const sidebarSource = readFileSync(sidebarPath, 'utf8');

const executableSource = sidebarSource
  .replace(/^import type .*?;\n/, '')
  .replace('const sidebar: SidebarsConfig =', 'const sidebar =')
  .replace('export default sidebar.apisidebar;', 'module.exports = sidebar;');

const context = { module: { exports: {} } };
vm.runInNewContext(executableSource, context);

const sidebar = context.module.exports;
const categoriesToNest = ['Users', 'Roles'];
const apiSidebar = sidebar.apisidebar;
const configurationCategory = apiSidebar.find((item) => item.type === 'category' && item.label === 'Configuration');

if (!configurationCategory) {
  throw new Error('Configuration category not found in generated sidebar');
}

const nestedCategories = apiSidebar.filter(
  (item) => item.type === 'category' && categoriesToNest.includes(item.label),
);

configurationCategory.items = configurationCategory.items.filter(
  (item) => !(item.type === 'category' && categoriesToNest.includes(item.label)),
);

sidebar.apisidebar = apiSidebar.filter(
  (item) => !(item.type === 'category' && categoriesToNest.includes(item.label)),
);

configurationCategory.items.push(...nestedCategories);

writeFileSync(
  sidebarPath,
  `import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";\n\nconst sidebar: SidebarsConfig = ${JSON.stringify(sidebar, null, 2)};\n\nexport default sidebar.apisidebar;\n`,
);

function walkFiles(directoryPath) {
  const entries = readdirSync(directoryPath);

  return entries.flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry);
    const entryStats = statSync(entryPath);

    if (entryStats.isDirectory()) {
      return walkFiles(entryPath);
    }

    return entryPath.endsWith('.mdx') ? [entryPath] : [];
  });
}

function formatPermissionList(permissions) {
  return permissions.map((permission) => `- \`${permission}\``).join('\n');
}

function buildPermissionsDetails(extensionJson) {
  const extension = JSON.parse(extensionJson);
  const sections = [];

  if (extension.dashboard_any_of?.length) {
    sections.push([
      '**Dashboard:** necesitas al menos uno de estos permisos.',
      formatPermissionList(extension.dashboard_any_of),
    ].join('\n'));
  }

  if (extension.api_any_of?.length) {
    sections.push([
      '**API Keys:** necesitas al menos uno de estos permisos.',
      formatPermissionList(extension.api_any_of),
    ].join('\n'));
  }

  if (sections.length === 0) {
    return null;
  }

  return [
    '<details>',
    '<summary><strong>Permisos requeridos</strong></summary>',
    '',
    sections.join('\n\n'),
    '',
    '</details>',
  ].join('\n');
}

function rewritePermissionsExtension(filePath) {
  const source = readFileSync(filePath, 'utf8');
  const rewritten = source.replace(/```\nx-permissions:\s*(\{.*?\})\n```/gs, (_match, extensionJson) => {
    const details = buildPermissionsDetails(extensionJson);
    return details ?? _match;
  });

  if (rewritten !== source) {
    writeFileSync(filePath, rewritten);
  }
}

for (const filePath of walkFiles(resourcesDirPath)) {
  rewritePermissionsExtension(filePath);
}
