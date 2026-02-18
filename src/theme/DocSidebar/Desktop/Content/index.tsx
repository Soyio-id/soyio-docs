import { useMemo } from 'react';
import DocSidebarDesktopContent from '@theme-original/DocSidebar/Desktop/Content';
import {
  hasApiResourceSections,
  SidebarItem,
  sortSidebarAlphabetically,
  useSidebarOrder,
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
  const hasResourceSections = hasApiResourceSections(sidebar);
  const [orderMode] = useSidebarOrder(hasResourceSections);

  const orderedSidebar = useMemo(() => {
    if (!hasResourceSections || orderMode === 'categorized') {
      return sidebar;
    }

    return sortSidebarAlphabetically(sidebar);
  }, [orderMode, hasResourceSections, sidebar]);

  return <DocSidebarDesktopContent {...props} sidebar={orderedSidebar} />;
}
