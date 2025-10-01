import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

type Variant = 
 | 'warning'
 | 'error'
 | 'success'
 | 'information'
 | 'neutral'
 | 'neutral200'
 | 'neutral300'
 | 'primary'
 | 'primary900';

export interface BadgeProps {
  className?: string;
  variant?: Variant;
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

const getVariantClassNames = (variant: Variant) => ({
  information: 'bg-blue-100',
  neutral: 'bg-white',
  neutral200: 'bg-neutral-100',
  neutral300: 'bg-neutral-300',
  warning: 'bg-yellow-200',
  error: 'bg-red-100',
  success: 'bg-green-100',
  primary: 'bg-purple-300',
  primary900: 'bg-purple-900 tc-white',
}[variant])

const Badge = ({
  className = '',
  size = 'medium',
  variant = 'information',
  children,
}: BadgeProps) => (
  <div
    role="status" 
    className={classNames(
      className, 
      'px16 br8 d-inline-block ai-center fw-bold p-p', 
      { 'p-p--small': size === 'small' },
      styles[`badge--${size}`],
      getVariantClassNames(variant)
    )}
  >
    {children}
  </div>
);

export { Badge };
