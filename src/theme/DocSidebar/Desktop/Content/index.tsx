import { useEffect, useMemo, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarDesktopContent from '@theme-original/DocSidebar/Desktop/Content';
import {
  hasApiResourceSections,
  isValidSidebarOrderMode,
  SIDEBAR_ORDER_EVENT_NAME,
  SIDEBAR_ORDER_STORAGE_KEY,
  SidebarItem,
  SidebarOrderMode,
  sortSidebarAlphabetically,
} from '../../sidebarOrder';

type DocSidebarDesktopContentProps = {
  path: string;
  sidebar: SidebarItem[];
  className?: string;
};

export default function ApiSidebarDesktopContent(
  props: DocSidebarDesktopContentProps,
) {
  const { sidebar } = props;
  const browser = useIsBrowser();
  const hasResourceSections = hasApiResourceSections(sidebar);
  const [orderMode, setOrderMode] = useState<SidebarOrderMode>('categorized');

  useEffect(() => {
    if (!browser || !hasResourceSections) {
      return;
    }

    const persistedMode = window.localStorage.getItem(SIDEBAR_ORDER_STORAGE_KEY);

    if (isValidSidebarOrderMode(persistedMode)) {
      setOrderMode(persistedMode);
    }
  }, [browser, hasResourceSections]);

  useEffect(() => {
    if (!browser || !hasResourceSections) {
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
  }, [browser, hasResourceSections]);

  const orderedSidebar = useMemo(() => {
    if (!hasResourceSections || orderMode === 'categorized') {
      return sidebar;
    }

    return sortSidebarAlphabetically(sidebar);
  }, [orderMode, hasResourceSections, sidebar]);

  return <DocSidebarDesktopContent {...props} sidebar={orderedSidebar} />;
}
