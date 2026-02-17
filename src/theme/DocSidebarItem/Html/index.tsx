import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  isSidebarOrderToggleItem,
  useSidebarOrder,
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
  const [orderMode, setMode] = useSidebarOrder();

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
