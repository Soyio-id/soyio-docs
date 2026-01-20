import { type ReactNode } from 'react';
import clsx from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/DocItem/Content';
import LLMActionsDropdown from '../../../components/LLMActionsDropdown';

import styles from './styles.module.css';

type DocTitle = {
  title: string | null;
  shouldHideContentTitle: boolean;
};

function useDocTitle(): DocTitle {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const openApiFrontMatter = frontMatter as typeof frontMatter & {
    api?: unknown;
    schema?: unknown;
  };
  const isOpenApiDoc = Boolean(
    openApiFrontMatter.api || openApiFrontMatter.schema,
  );

  if (frontMatter.hide_title && !isOpenApiDoc) {
    return {
      title: null,
      shouldHideContentTitle: false,
    };
  }

  const resolvedTitle =
    contentTitle ?? frontMatter.title ?? metadata.title ?? null;

  return {
    title: resolvedTitle,
    shouldHideContentTitle: Boolean(resolvedTitle),
  };
}

export default function DocItemContent({ children }: Props): ReactNode {
  const { title, shouldHideContentTitle } = useDocTitle();
  return (
    <div
      className={clsx(
        'theme-doc-markdown',
        shouldHideContentTitle && styles.hideContentTitle,
      )}
    >
      {title && (
        <header className={styles.titleRow}>
          <Heading
            as="h1"
            className={styles.title}
          >
            {title}
          </Heading>
          <LLMActionsDropdown />
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
