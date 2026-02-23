import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import resourcesSidebar from './resources/sidebar';

type SidebarArray = Extract<SidebarsConfig[string], unknown[]>;
type SidebarItem = SidebarArray[number];

type SidebarCategoryItem = {
  type: 'category';
  label: string;
  items: SidebarItem[];
};

type SidebarSection = {
  title: string;
  categoryLabels: string[];
};

const RESOURCE_SECTIONS: SidebarSection[] = [
  {
    title: 'Configuración',
    categoryLabels: [
      'Configuration',
      'Company',
      'Branches',
      'Products',
    ],
  },
  {
    title: 'IDENTIDAD',
    categoryLabels: [
      'Entities',
      'Identities',
      'Disclosure templates',
      'Disclosure requests',
      'Auth requests',
      'Validation attempts',
      'Auth attempts',
      'Signature attempts',
      'Signed documents',
      'Government check requests',
    ],
  },
  {
    title: 'CONSENTIMIENTO Y PRIVACIDAD',
    categoryLabels: [
      'Agreements',
      'Consent templates',
      'Consent actions',
      'Consent commits',
      'Consent revocations',
      'Data subject requests',
      'Privacy documents',
      'Privacy center',
    ],
  },
  {
    title: 'Integraciones',
    categoryLabels: [
      'API Keys',
      'Webhooks',
      'Events',
    ],
  },
  {
    title: 'Cumplimiento',
    categoryLabels: [
      'REDEC',
      'Reports',
    ],
  },
];

function isSidebarCategoryItem(item: SidebarItem): item is SidebarCategoryItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'category' &&
    'label' in item &&
    typeof item.label === 'string' &&
    'items' in item &&
    Array.isArray(item.items)
  );
}

function createSectionLabel(title: string, isFirstSection: boolean): SidebarItem {
  const marginTop = isFirstSection ? '0.45rem' : '1.25rem';

  return {
    type: 'html',
    value: `<div data-api-resource-section="true" style="margin-top: ${marginTop}; margin-bottom: 0.25rem;"><span style="font-size: 0.8rem; color: var(--ifm-color-gray-600); padding-left: 12px; text-transform: uppercase; letter-spacing: 0.05em;">${title}</span></div>`,
    defaultStyle: false,
  };
}

function groupResourceItems(items: SidebarItem[]): SidebarItem[] {
  const categoryItems = items.filter(isSidebarCategoryItem);
  const categoryByLabel = new Map(
    categoryItems.map((categoryItem) => [categoryItem.label, categoryItem]),
  );
  const grouped: SidebarItem[] = [];
  const usedLabels = new Set<string>();

  RESOURCE_SECTIONS.forEach((section) => {
    const sectionItems = section.categoryLabels
      .map((categoryLabel) => categoryByLabel.get(categoryLabel))
      .filter((categoryItem): categoryItem is SidebarCategoryItem => !!categoryItem);

    if (sectionItems.length === 0) {
      return;
    }

    grouped.push(createSectionLabel(section.title, grouped.length === 0));
    grouped.push(...sectionItems);
    sectionItems.forEach((item) => usedLabels.add(item.label));
  });

  const unmappedCategoryItems = categoryItems.filter(
    (categoryItem) => !usedLabels.has(categoryItem.label),
  );

  if (unmappedCategoryItems.length > 0) {
    grouped.push(createSectionLabel('OTROS', grouped.length === 0));
    grouped.push(...unmappedCategoryItems);
  }

  const nonCategoryItems = items.filter((item) => !isSidebarCategoryItem(item));
  return [...nonCategoryItems, ...grouped];
}

const groupedResourcesSidebar = groupResourceItems(
  Array.isArray(resourcesSidebar) ? resourcesSidebar : [],
);

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: 'doc',
      id: 'api/intro',
    },
    {
      type: 'html',
      value: '<div style="margin: 1.125rem 0;"></div>',
    },
    {
      type: 'doc',
      id: 'api/authentication',
    },
    {
      type: 'doc',
      id: 'api/sandbox-mode',
    },
    {
      type: 'doc',
      id: 'api/pagination-and-filters',
    },
    {
      type: 'doc',
      id: 'api/webhooks',
    },
    {
      type: 'doc',
      id: 'api/errors',
    },
    {
      type: 'html',
      value: '<div style="margin: 1.125rem 0;"></div>',
    },
    {
      type: 'html',
      value: '<div data-api-sidebar-order-toggle="true"></div>',
      defaultStyle: false,
    },
    ...groupedResourcesSidebar,
  ],
};

export default sidebar.apisidebar;
