import { Icon } from '@iconify/react';
import type { IconifyIcon } from '@iconify/react';

import styles from './styles.module.css';

type IconLabelProps = {
  icon: IconifyIcon | string;
  label: string;
  /**
   * Optional CSS variable name (e.g. --ifm-color-primary) to colorize the icon.
   * We keep this inline style so docs can inject any theme token dynamically.
   */
  colorVar?: string;
  className?: string;
};

export default function IconLabel({ icon, label, colorVar, className }: IconLabelProps) {
  const wrapperClass = className ? `${styles.iconLabel} ${className}` : styles.iconLabel;

  return (
    <span className={wrapperClass}>
      <Icon
        icon={icon}
        width="20"
        height="20"
        aria-hidden="true"
        className={styles.icon}
        style={colorVar ? { color: `var(${colorVar})` } : undefined}
      />
      <span>{label}</span>
    </span>
  );
}
