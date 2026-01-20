import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

function createTurndownService(elementClass?: typeof Element) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
  });

  turndownService.use(gfm);
  turndownService.addRule('admonition', {
    filter: (node) => {
      if (!elementClass) {
        return false;
      }
      return (
        node instanceof elementClass && node.classList.contains('admonition')
      );
    },
    replacement: (_content, node) => {
      const element = node as Element;
      const titleElement = element.querySelector(
        '.admonition-heading, .admonition-title',
      );
      const contentElement =
        element.querySelector('.admonition-content') ?? element;
      const titleText = titleElement?.textContent?.trim();
      const admonitionType = Array.from(element.classList).find(
        (className) =>
          className.startsWith('admonition-') && className !== 'admonition',
      );
      const fallbackLabel = admonitionType
        ? admonitionType.replace('admonition-', '').replace(/-/g, ' ')
        : 'Note';
      const label = titleText || fallbackLabel;
      const innerMarkdown = turndownService
        .turndown(contentElement as HTMLElement)
        .trim();
      const formattedBody = innerMarkdown
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');

      return `\n> **${label}**\n${formattedBody}\n`;
    },
  });
  turndownService.remove(['script', 'style', 'noscript']);

  return turndownService;
}

type OpenApiSchemaRow = {
  field: string;
  type: string;
  required: string;
  description: string;
  example: string;
};

type OpenApiParamRow = {
  name: string;
  type: string;
  required: string;
  details: string;
};

function getDirectSchemaChildren(element: HTMLElement) {
  return Array.from(
    element.querySelectorAll('.openapi-schema__list-item'),
  ).filter(
    (child) =>
      child.parentElement?.closest('.openapi-schema__list-item') === element,
  ) as HTMLElement[];
}

function extractDirectText(
  item: HTMLElement,
  selector: string,
  parentClass: string,
) {
  const matches = Array.from(item.querySelectorAll(selector));
  const directMatch = matches.find(
    (node) => node.closest(`.${parentClass}`) === item,
  );

  return directMatch?.textContent?.trim() ?? '';
}

function extractSchemaRow(
  item: HTMLElement,
  prefix: string | null,
): OpenApiSchemaRow {
  const name =
    item.querySelector('.openapi-schema__property')?.textContent?.trim() ?? '';
  const type =
    item.querySelector('.openapi-schema__name')?.textContent?.trim() ?? '';
  const required = item.querySelector('.openapi-schema__required')
    ? 'required'
    : 'optional';
  const description = extractDirectText(
    item,
    'p, li',
    'openapi-schema__list-item',
  );
  const example = item.querySelector('code')?.textContent?.trim() ?? '';
  const field = prefix && name ? `${prefix}.${name}` : name || prefix || '';

  return { field, type, required, description, example };
}

function collectSchemaRows(
  item: HTMLElement,
  prefix: string | null,
): OpenApiSchemaRow[] {
  const row = extractSchemaRow(item, prefix);
  const nextPrefix = row.field || prefix;
  const children = getDirectSchemaChildren(item);
  const childRows = children.flatMap((child) =>
    collectSchemaRows(child, nextPrefix),
  );

  return [row, ...childRows];
}

function createSchemaTable(rows: OpenApiSchemaRow[], doc: Document) {
  const table = doc.createElement('table');
  const headerRow = doc.createElement('tr');
  ['Field', 'Type', 'Required', 'Description', 'Example'].forEach((text) => {
    const cell = doc.createElement('th');
    cell.textContent = text;
    headerRow.appendChild(cell);
  });

  const thead = doc.createElement('thead');
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = doc.createElement('tbody');
  rows.forEach((rowData) => {
    const row = doc.createElement('tr');
    [
      rowData.field,
      rowData.type,
      rowData.required,
      rowData.description,
      rowData.example,
    ].forEach((text) => {
      const cell = doc.createElement('td');
      cell.textContent = text;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

function extractParamRow(item: HTMLElement): OpenApiParamRow {
  const name =
    item.querySelector('.openapi-schema__property')?.textContent?.trim() ?? '';
  const type =
    item.querySelector('.openapi-schema__type')?.textContent?.trim() ?? '';
  const required = item.querySelector('.openapi-schema__required')
    ? 'required'
    : 'optional';
  const details = Array.from(item.querySelectorAll('p, li'))
    .filter((node) => node.closest('.openapi-params__list-item') === item)
    .map((node) => node.textContent?.trim())
    .filter(Boolean)
    .join(' ');

  return { name, type, required, details };
}

function createParamsTable(rows: OpenApiParamRow[], doc: Document) {
  const table = doc.createElement('table');
  const headerRow = doc.createElement('tr');
  ['Parameter', 'Type', 'Required', 'Details'].forEach((text) => {
    const cell = doc.createElement('th');
    cell.textContent = text;
    headerRow.appendChild(cell);
  });

  const thead = doc.createElement('thead');
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = doc.createElement('tbody');
  rows.forEach((rowData) => {
    const row = doc.createElement('tr');
    [rowData.name, rowData.type, rowData.required, rowData.details].forEach(
      (text) => {
        const cell = doc.createElement('td');
        cell.textContent = text;
        row.appendChild(cell);
      },
    );
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

function normalizeOpenApiSchemaTables(root: HTMLElement) {
  const schemaItems = Array.from(
    root.querySelectorAll('.openapi-schema__list-item'),
  ) as HTMLElement[];
  const parents = new Set<HTMLElement>();
  const doc = root.ownerDocument;

  schemaItems.forEach((item) => {
    const parent = item.parentElement;
    if (parent && !parent.classList.contains('openapi-schema__list-item')) {
      parents.add(parent);
    }
  });

  parents.forEach((parent) => {
    const directItems = Array.from(parent.children).filter((child) =>
      (child as HTMLElement).classList?.contains('openapi-schema__list-item'),
    ) as HTMLElement[];

    if (directItems.length === 0) {
      return;
    }

    const rows = directItems.flatMap((item) => collectSchemaRows(item, null));
    parent.replaceChildren(createSchemaTable(rows, doc));
  });
}

function normalizeOpenApiParamsTables(root: HTMLElement) {
  const paramItems = Array.from(
    root.querySelectorAll('.openapi-params__list-item'),
  ) as HTMLElement[];
  const doc = root.ownerDocument;

  if (paramItems.length === 0) {
    return;
  }

  const listContainer = paramItems[0].parentElement;
  if (!listContainer) {
    return;
  }

  const rows = paramItems.map((item) => extractParamRow(item));
  listContainer.replaceChildren(createParamsTable(rows, doc));
}

function getSequenceDiagramMermaid(container: HTMLElement) {
  const actorsData = container.dataset.sequenceActors;
  const actionsData = container.dataset.sequenceActions;

  if (!actorsData || !actionsData) {
    return null;
  }

  try {
    const actors = JSON.parse(actorsData) as Array<{
      id: string;
      label: string;
    }>;
    const actions = JSON.parse(actionsData) as Array<{
      from: string;
      to: string;
      label: string;
      isDashed?: boolean;
    }>;

    if (actors.length === 0 || actions.length === 0) {
      return null;
    }

    const actorLines = actors.map(
      (actor) => `participant ${actor.id} as ${actor.label}`,
    );
    const actionLines = actions.map((action) => {
      const arrow = action.isDashed ? '-->>' : '->>';
      return `${action.from}${arrow}${action.to}: ${action.label}`;
    });

    return ['sequenceDiagram', ...actorLines, ...actionLines].join('\n');
  } catch (error) {
    console.warn('Failed to parse sequence diagram data', error);
    return null;
  }
}

function normalizeSequenceDiagrams(root: HTMLElement) {
  const diagrams = Array.from(
    root.querySelectorAll('[data-sequence-diagram="true"]'),
  ) as HTMLElement[];
  const doc = root.ownerDocument;

  diagrams.forEach((diagram) => {
    const mermaid = getSequenceDiagramMermaid(diagram);
    if (!mermaid) {
      diagram.remove();
      return;
    }

    const pre = doc.createElement('pre');
    const code = doc.createElement('code');
    code.className = 'language-mermaid';
    code.textContent = mermaid;
    pre.appendChild(code);
    diagram.replaceWith(pre);
  });
}

function normalizeTabs(root: HTMLElement) {
  const tabsContainers = Array.from(
    root.querySelectorAll('.tabs-container'),
  ) as HTMLElement[];
  const doc = root.ownerDocument;

  tabsContainers.forEach((container) => {
    const tabItems = Array.from(
      container.querySelectorAll('[role="tabpanel"]'),
    ) as HTMLElement[];

    if (tabItems.length === 0) {
      return;
    }

    const wrapper = doc.createElement('div');
    const tabLabels = Array.from(
      container.querySelectorAll('[role="tablist"] [role="tab"]'),
    ) as HTMLElement[];
    const labels = tabLabels.map((tab) => tab.textContent?.trim() ?? '');

    tabItems.forEach((tabItem, index) => {
      const label = labels[index] || `Tab ${index + 1}`;
      const heading = doc.createElement('p');
      const bold = doc.createElement('strong');
      bold.textContent = label;
      heading.appendChild(bold);
      wrapper.appendChild(heading);

      if (tabItem.hasAttribute('hidden')) {
        tabItem.removeAttribute('hidden');
      }

      Array.from(tabItem.childNodes).forEach((child) => {
        wrapper.appendChild(child.cloneNode(true));
      });
    });

    container.replaceWith(wrapper);
  });
}

function normalizeOpenApiMethodEndpoints(root: HTMLElement) {
  const methodBlocks = Array.from(
    root.querySelectorAll('.openapi__method-endpoint'),
  ) as HTMLElement[];
  const doc = root.ownerDocument;

  methodBlocks.forEach((block) => {
    const method = block.querySelector('.badge')?.textContent?.trim() ?? '';
    const path =
      block
        .querySelector('.openapi__method-endpoint-path')
        ?.textContent?.trim() ?? '';

    const wrapper = doc.createElement('p');
    if (method) {
      const strong = doc.createElement('strong');
      strong.textContent = method;
      wrapper.appendChild(strong);
      if (path) {
        wrapper.appendChild(doc.createTextNode(` ${path}`));
      }
    } else {
      wrapper.textContent = path;
    }

    block.replaceWith(wrapper);
  });

  root.querySelectorAll('.openapi__divider').forEach((node) => node.remove());
}

function removeOpenApiExplorerBlocks(root: HTMLElement) {
  const selectors = [
    '.openapi-right-panel__container',
    '.openapi-explorer__request-form',
    '.openapi-explorer__response-container',
    '.openapi-explorer__code-block',
    '.openapi-explorer__playground-container',
    '.openapi-explorer__floating-btn',
  ];

  selectors.forEach((selector) => {
    root.querySelectorAll(selector).forEach((node) => node.remove());
  });
}

function absolutizeRelativeLinks(markdown: string, origin: string) {
  return markdown.replace(/\]\((\/?[^)]+)\)/g, (match, link) => {
    if (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#') ||
      link.startsWith('mailto:')
    ) {
      return match;
    }

    const normalizedOrigin = origin.endsWith('/')
      ? origin.slice(0, -1)
      : origin;
    const normalizedLink = link.startsWith('/') ? link : `/${link}`;
    return `](${normalizedOrigin}${normalizedLink})`;
  });
}

function stripHeadingAnchors(markdown: string) {
  // eslint-disable-next-line no-irregular-whitespace
  return markdown.replace(/\s*\[\s*​?\s*\]\(#.*?\)/g, '');
}

function unescapeMarkdownArtifacts(markdown: string) {
  const lines = markdown.split('\n');
  let insideFence = false;

  const updatedLines = lines.map((line) => {
    if (line.trim().startsWith('```')) {
      insideFence = !insideFence;
      return line;
    }

    if (insideFence) {
      return line;
    }

    const isTableRow = /^\s*\|/.test(line);
    const isMethodLine =
      /^\*\*(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS|WEBHOOK)\*\*/i.test(line);

    if (!isTableRow && !isMethodLine) {
      return line;
    }

    return line
      .replace(/\\_/g, '_')
      .replace(/\\\[/g, '[')
      .replace(/\\\]/g, ']');
  });

  return updatedLines.join('\n');
}

export function htmlToMarkdown(element: HTMLElement, origin: string) {
  const clone = element.cloneNode(true) as HTMLElement;
  normalizeOpenApiSchemaTables(clone);
  normalizeOpenApiParamsTables(clone);
  normalizeOpenApiMethodEndpoints(clone);
  normalizeSequenceDiagrams(clone);
  normalizeTabs(clone);
  removeOpenApiExplorerBlocks(clone);

  const elementClass = clone.ownerDocument.defaultView?.Element;
  const markdown = createTurndownService(elementClass).turndown(clone);
  const absoluteLinks = absolutizeRelativeLinks(markdown, origin);
  const withoutAnchors = stripHeadingAnchors(absoluteLinks);
  return unescapeMarkdownArtifacts(withoutAnchors);
}
