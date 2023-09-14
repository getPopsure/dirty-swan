import classNames from 'classnames';
import { Color, Size } from '../../../models/styles';

import styles from './styles.module.scss';
import { ReactNode } from 'react';

export type IconWrapperProps = {
  children?: ReactNode;
  size?: Size;
  color?: Color;
  className?: string;
};

const IconWrapper = ({
  children,
  size = 16,
  color,
  className,
}: IconWrapperProps) => (
  <span
    className={classNames('d-inline-block', styles.wrapper, className ?? '', {
      [`tc-${color}`]: !!color,
    })}
    style={{
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