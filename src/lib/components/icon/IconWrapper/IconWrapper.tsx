import classNames from 'classnames';
import { Color, Size } from '../../../models/styles';

import styles from './styles.module.scss';
import { ReactNode } from 'react';

export type IconWrapperProps = {
  children?: ReactNode;
  size?: Size;
  color?: Color;
  className?: string;
  noMargin?: boolean;
};

const IconWrapper = ({
  children,
  size = 16,
  color,
  className,
  noMargin,
}: IconWrapperProps) => (
  <span
    className={classNames('d-inline-block', className ?? '', {
      [`tc-${color}`]: !!color,
      [styles.wrapper]: !noMargin
    })}
    style={{
      minWidth: `${size}px`,
      width: `${size}px`,
      height: `${size}px`
    }}
  >
    <svg className='w100' viewBox="0 0 24 24" fill="none">
      {children}
    </svg>
  </span>
);

export { IconWrapper };