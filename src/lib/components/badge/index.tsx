import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

type Variant = 
  | 'white'
  | 'neutral'
  | 'neutralStrong'
  | 'information'
  | 'warning'
  | 'primary'
  | 'error'
  | 'success'
  | 'black'
  | 'secondary'
  | 'secondaryStrong';

export interface BadgeProps {
  className?: string;
  variant?: Variant;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  children: ReactNode;
  showDot?: boolean;
}

const Badge = ({
  className = '',
  size = 'medium',
  variant = 'information',
  children,
  showDot = false
}: BadgeProps) => (
  <div
    role="status" 
    className={classNames(
      className,
      'br8 d-inline-flex ai-center fw-bold p-p',
      styles.badge,
      styles[`badge--${size}`],
      styles[`badge--${variant}`],
      {
        'p-p--small': size === 'small' || size === 'xsmall',
      }
    )}
  >
    {showDot && (
      <span
        className={classNames(
          styles.badgeDot,
          styles[`badgeDot--${variant}`]
        )}
      />
    )}

    {children}
  </div>
);

export { Badge };
