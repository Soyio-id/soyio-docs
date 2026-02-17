import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  isSidebarOrderToggleItem,
  isValidSidebarOrderMode,
  SIDEBAR_ORDER_EVENT_NAME,
  SIDEBAR_ORDER_STORAGE_KEY,
  SidebarOrderMode,
} from '../../DocSidebar/sidebarOrder';

type SidebarHtmlItem = {
  type: 'html';
  value: string;
  defaultStyle?: boolean;
  className?: string;
};

type SidebarHtmlItemProps = {
  item: SidebarHtmlItem;
  level: number;
  index: number;
};

function SidebarOrderToggle() {
  const browser = useIsBrowser();
  const [orderMode, setOrderMode] = useState<SidebarOrderMode>('categorized');

  useEffect(() => {
    if (!browser) {
      return;
    }

    const persistedMode = window.localStorage.getItem(SIDEBAR_ORDER_STORAGE_KEY);

    if (isValidSidebarOrderMode(persistedMode)) {
      setOrderMode(persistedMode);
    }
  }, [browser]);

  useEffect(() => {
    if (!browser) {
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
  }, [browser]);

  const setMode = (nextMode: SidebarOrderMode) => {
    setOrderMode(nextMode);

    if (!browser) {
      return;
    }

    window.localStorage.setItem(SIDEBAR_ORDER_STORAGE_KEY, nextMode);
    window.dispatchEvent(
      new CustomEvent<SidebarOrderMode>(SIDEBAR_ORDER_EVENT_NAME, {
        detail: nextMode,
      }),
    );
  };

  return (
    <div className="api-sidebar-order-toggle" role="group" aria-label="API sidebar order">
      <button
        type="button"
        className={clsx(
          'api-sidebar-order-toggle__button',
          orderMode === 'categorized' && 'is-active',
        )}
        onClick={() => setMode('categorized')}>
        Categorias
      </button>
      <button
        type="button"
        className={clsx(
          'api-sidebar-order-toggle__button',
          orderMode === 'alphabetical' && 'is-active',
        )}
        onClick={() => setMode('alphabetical')}>
        A-Z
      </button>
    </div>
  );
}

export default function DocSidebarItemHtml({
  item,
  level,
  index,
}: SidebarHtmlItemProps) {
  const { value, defaultStyle, className } = item;

  const htmlItemClassName = clsx(
    ThemeClassNames.docs.docSidebarItemLink,
    ThemeClassNames.docs.docSidebarItemLinkLevel(level),
    defaultStyle && 'menu__list-item',
    className,
  );

  if (!isSidebarOrderToggleItem(item)) {
    return (
      <li
        className={htmlItemClassName}
        key={index}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <li className={htmlItemClassName} key={index}>
      <SidebarOrderToggle />
    </li>
  );
}
