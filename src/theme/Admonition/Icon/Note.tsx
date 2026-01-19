import { Icon } from '@iconify/react';
import infoBold from '@iconify-icons/ph/info-bold';
import type { Props } from '@theme/Admonition/Icon/Note';
import type { ReactNode } from 'react';

export default function AdmonitionIconNote({
  className,
  style,
  color,
  width,
  height,
}: Props): ReactNode {
  return (
    <Icon
      icon={infoBold}
      className={className}
      style={style}
      color={color}
      width={width}
      height={height}
    />
  );
}
