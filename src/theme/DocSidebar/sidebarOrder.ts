export type SidebarOrderMode = 'categorized' | 'alphabetical';

export type SidebarItem = {
  type: string;
  label?: string;
  value?: string;
  href?: string;
};

export const SIDEBAR_ORDER_STORAGE_KEY = 'soyio.docs.apiSidebarOrderMode';
export const SIDEBAR_ORDER_EVENT_NAME = 'soyio:apiSidebarOrderModeChange';

const RESOURCE_SECTION_MARKER = 'data-api-resource-section="true"';
const ORDER_TOGGLE_MARKER = 'data-api-sidebar-order-toggle="true"';

export function isValidSidebarOrderMode(
  mode: string | null,
): mode is SidebarOrderMode {
  return mode === 'categorized' || mode === 'alphabetical';
}

export function isApiReferenceSidebar(path: string) {
  return /(^|\/)docs\/api(\/|$)/.test(path);
}

function isResourceSectionLabel(item: SidebarItem) {
  return (
    item.type === 'html' &&
    typeof item.value === 'string' &&
    item.value.includes(RESOURCE_SECTION_MARKER)
  );
}

export function isSidebarOrderToggleItem(item: SidebarItem) {
  return (
    item.type === 'html' &&
    typeof item.value === 'string' &&
    item.value.includes(ORDER_TOGGLE_MARKER)
  );
}

export function hasApiResourceSections(sidebar: SidebarItem[]) {
  return sidebar.some(isResourceSectionLabel);
}

function isTopLevelCategory(item: SidebarItem) {
  return item.type === 'category' && typeof item.label === 'string';
}

export function sortSidebarAlphabetically(sidebar: SidebarItem[]) {
  const firstResourceSectionIndex = sidebar.findIndex(isResourceSectionLabel);

  if (firstResourceSectionIndex === -1) {
    return sidebar;
  }

  const staticItems = sidebar.slice(0, firstResourceSectionIndex);
  const resourceItems = sidebar.slice(firstResourceSectionIndex);

  const categoryItems = resourceItems
    .filter(isTopLevelCategory)
    .sort((left, right) =>
      (left.label ?? '').localeCompare(right.label ?? '', 'es', {
        sensitivity: 'base',
      }),
    );

  return [...staticItems, ...categoryItems];
}
