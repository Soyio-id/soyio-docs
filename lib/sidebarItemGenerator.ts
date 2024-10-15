import clsx from 'clsx';
import { ApiDocItemGenerator } from 'docusaurus-plugin-openapi-docs/src/types';

/*
  Inspired by the original implementation at https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/blob/main/packages/docusaurus-plugin-openapi-docs/src/sidebars/index.ts#L44C7-L44C20.

  Can't import it because library does not expose it.
*/
export const sidebarItemGenerator: ApiDocItemGenerator = (
  item,
  { sidebarOptions: { customProps }, basePath },
) => {
  const sidebar_label = item.frontMatter.sidebar_label;
  const title = item.type === 'schema' ? `El objeto ${item.title}` : item.title;
  const id = item.type === 'schema' ? `schemas/${item.id}` : item.id;

  const className =
    item.type === 'api'
      ? clsx(
          {
            'menu__list-item--deprecated': item.api.deprecated,
            'api-method': !!item.api.method,
          },
          item.api.method,
        )
      : clsx(
          {
            'menu__list-item--deprecated': item.schema.deprecated,
          },
          'schema',
        );

  return {
    type: 'doc' as const,
    id: basePath === '' || undefined ? `${id}` : `${basePath}/${id}`,
    label: (sidebar_label as string) ?? title ?? id,
    customProps: customProps,
    className: className ? className : undefined,
  };
};
