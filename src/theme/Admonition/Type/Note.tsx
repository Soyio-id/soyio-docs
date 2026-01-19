import { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Admonition/Type/Note';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconNote from '@theme/Admonition/Icon/Note';

const infimaClassName = 'alert alert--secondary';

const defaultProps = {
  icon: <IconNote />,
};

export default function AdmonitionTypeNote(props: Props): ReactNode {
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
