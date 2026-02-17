import clsx from 'clsx';
import { memo, useEffect, useMemo, useState } from 'react';
import { NavbarSecondaryMenuFiller, ThemeClassNames } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import {
  hasApiResourceSections,
  isValidSidebarOrderMode,
  SIDEBAR_ORDER_EVENT_NAME,
  SIDEBAR_ORDER_STORAGE_KEY,
  SidebarItem,
  SidebarOrderMode,
  sortSidebarAlphabetically,
} from '../sidebarOrder';

type MobileSidebarProps = {
  sidebar: SidebarItem[];
  path: string;
};

function DocSidebarMobileSecondaryMenu({ sidebar, path }: MobileSidebarProps) {
  const mobileSidebar = useNavbarMobileSidebar();
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

  return (
    <>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={orderedSidebar}
          activePath={path}
          onItemClick={(item) => {
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
}

function DocSidebarMobile(props: MobileSidebarProps) {
  return <NavbarSecondaryMenuFiller component={DocSidebarMobileSecondaryMenu} props={props} />;
}

export default memo(DocSidebarMobile);
