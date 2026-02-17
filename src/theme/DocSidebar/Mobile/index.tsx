import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { NavbarSecondaryMenuFiller, ThemeClassNames } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import {
  hasApiResourceSections,
  SidebarItem,
  sortSidebarAlphabetically,
  useSidebarOrder,
} from '../sidebarOrder';

type MobileSidebarProps = {
  sidebar: SidebarItem[];
  path: string;
};

function DocSidebarMobileSecondaryMenu({ sidebar, path }: MobileSidebarProps) {
  const mobileSidebar = useNavbarMobileSidebar();
  const hasResourceSections = hasApiResourceSections(sidebar);
  const [orderMode] = useSidebarOrder(hasResourceSections);

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
