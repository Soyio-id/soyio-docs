import { Icon } from '@iconify/react';
import warningCircleBold from '@iconify-icons/ph/warning-circle-bold';
import type { Props } from '@theme/Admonition/Icon/Info';
import type { ReactNode } from 'react';

export default function AdmonitionIconInfo({
  className,
  style,
  color,
  width,
  height,
}: Props): ReactNode {
  return (
    <Icon
      icon={warningCircleBold}
      className={className}
      style={style}
      color={color}
      width={width}
      height={height}
    />
  );
}
