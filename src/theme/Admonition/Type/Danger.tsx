import { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Admonition/Type/Danger';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconDanger from '@theme/Admonition/Icon/Danger';

const infimaClassName = 'alert alert--danger';

const defaultProps = {
  icon: <IconDanger />,
};

export default function AdmonitionTypeDanger(props: Props): ReactNode {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}
    >
      {props.children}
    </AdmonitionLayout>
  );
}
