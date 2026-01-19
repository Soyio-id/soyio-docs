import { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Admonition/Type/Warning';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconWarning from '@theme/Admonition/Icon/Warning';

const infimaClassName = 'alert alert--warning';

const defaultProps = {
  icon: <IconWarning />,
};

export default function AdmonitionTypeWarning(props: Props): ReactNode {
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
