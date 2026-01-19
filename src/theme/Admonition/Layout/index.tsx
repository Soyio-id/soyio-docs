import { type ReactNode } from 'react';
import clsx from 'clsx';

import type { Props } from '@theme/Admonition/Layout';

import styles from './styles.module.css';

function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & { children: ReactNode }) {
  return (
    <div
      className={clsx(
        'admonition',
        'alert',
        `admonition-${type}`,
        styles.admonition,
        className,
      )}
    >
      {children}
    </div>
  );
}

function AdmonitionHeading({ title }: Pick<Props, 'title'>) {
  if (!title) {
    return null;
  }

  return <div className={styles.admonitionHeading}>{title}</div>;
}

function AdmonitionContent({ children }: Pick<Props, 'children'>) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const { type, icon, title, children, className } = props;
  const hasTitle = Boolean(title);
  return (
    <AdmonitionContainer
      type={type}
      className={className}
    >
      <div
        className={clsx(
          styles.admonitionLayout,
          hasTitle
            ? styles.admonitionLayoutWithTitle
            : styles.admonitionLayoutWithoutTitle,
        )}
      >
        {icon ? <div className={styles.admonitionIcon}>{icon}</div> : null}
        <div className={styles.admonitionBody}>
          <AdmonitionHeading title={title} />
          <AdmonitionContent>{children}</AdmonitionContent>
        </div>
      </div>
    </AdmonitionContainer>
  );
}
