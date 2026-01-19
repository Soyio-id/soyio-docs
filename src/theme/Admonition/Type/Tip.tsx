import { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconTip from '@theme/Admonition/Icon/Tip';

const infimaClassName = 'alert alert--success';

const defaultProps = {
  icon: <IconTip />,
};

export default function AdmonitionTypeTip(props: Props): ReactNode {
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
