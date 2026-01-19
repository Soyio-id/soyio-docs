import { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Admonition/Type/Info';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconInfo from '@theme/Admonition/Icon/Info';

const infimaClassName = 'alert alert--info';

const defaultProps = {
  icon: <IconInfo />,
};

export default function AdmonitionTypeInfo(props: Props): ReactNode {
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
