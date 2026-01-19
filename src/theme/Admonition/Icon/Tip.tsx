import { Icon } from '@iconify/react';
import lightbulbBold from '@iconify-icons/ph/lightbulb-bold';
import type { Props } from '@theme/Admonition/Icon/Tip';
import type { ReactNode } from 'react';

export default function AdmonitionIconTip({
  className,
  style,
  color,
  width,
  height,
}: Props): ReactNode {
  return (
    <Icon
      icon={lightbulbBold}
      className={className}
      style={style}
      color={color}
      width={width}
      height={height}
    />
  );
}
