import { useCallback, useEffect, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

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

export function useSidebarOrder(
  enabled = true,
): [SidebarOrderMode, (nextMode: SidebarOrderMode) => void] {
  const browser = useIsBrowser();
  const [orderMode, setOrderMode] = useState<SidebarOrderMode>('categorized');

  useEffect(() => {
    if (!browser || !enabled) {
      return;
    }

    const persistedMode = window.localStorage.getItem(SIDEBAR_ORDER_STORAGE_KEY);

    if (isValidSidebarOrderMode(persistedMode)) {
      setOrderMode(persistedMode);
    }
  }, [browser, enabled]);

  useEffect(() => {
    if (!browser || !enabled) {
      return;
    }

    const onOrderModeChanged = (event: Event) => {
      const nextMode = (event as CustomEvent<SidebarOrderMode>).detail;

      if (isValidSidebarOrderMode(nextMode)) {
        setOrderMode(nextMode);
      }
    };

    const onStorageChanged = (event: StorageEvent) => {
      if (event.key !== SIDEBAR_ORDER_STORAGE_KEY) {
        return;
      }

      if (isValidSidebarOrderMode(event.newValue)) {
        setOrderMode(event.newValue);
      }
    };

    window.addEventListener(SIDEBAR_ORDER_EVENT_NAME, onOrderModeChanged as EventListener);
    window.addEventListener('storage', onStorageChanged);

    return () => {
      window.removeEventListener(
        SIDEBAR_ORDER_EVENT_NAME,
        onOrderModeChanged as EventListener,
      );
      window.removeEventListener('storage', onStorageChanged);
    };
  }, [browser, enabled]);

  const setSidebarOrderMode = useCallback(
    (nextMode: SidebarOrderMode) => {
      setOrderMode(nextMode);

      if (!browser || !enabled) {
        return;
      }

      window.localStorage.setItem(SIDEBAR_ORDER_STORAGE_KEY, nextMode);
      window.dispatchEvent(
        new CustomEvent<SidebarOrderMode>(SIDEBAR_ORDER_EVENT_NAME, {
          detail: nextMode,
        }),
      );
    },
    [browser, enabled],
  );

  return [orderMode, setSidebarOrderMode];
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
