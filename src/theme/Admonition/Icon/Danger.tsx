import { Icon } from '@iconify/react';
import warningOctagonBold from '@iconify-icons/ph/warning-octagon-bold';
import type { Props } from '@theme/Admonition/Icon/Danger';
import type { ReactNode } from 'react';

export default function AdmonitionIconDanger({
  className,
  style,
  color,
  width,
  height,
}: Props): ReactNode {
  return (
    <Icon
      icon={warningOctagonBold}
      className={className}
      style={style}
      color={color}
      width={width}
      height={height}
    />
  );
}
