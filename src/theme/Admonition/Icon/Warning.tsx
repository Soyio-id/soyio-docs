import { Icon } from '@iconify/react';
import warningBold from '@iconify-icons/ph/warning-bold';
import type { Props } from '@theme/Admonition/Icon/Warning';
import type { ReactNode } from 'react';

export default function AdmonitionIconWarning({
  className,
  style,
  color,
  width,
  height,
}: Props): ReactNode {
  return (
    <Icon
      icon={warningBold}
      className={className}
      style={style}
      color={color}
      width={width}
      height={height}
    />
  );
}
