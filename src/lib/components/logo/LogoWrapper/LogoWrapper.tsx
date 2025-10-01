import classNames from 'classnames';
import { HTMLProps, ReactNode } from 'react';
import styles from './styles.module.scss'

export interface LogoWrapperProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  width?: number;
  className?: string;
  isHorizontal?: boolean;
}

const LogoWrapper = ({
  children,
  width,
  className,
  isHorizontal,
  ...rest
}: LogoWrapperProps) => (
  <div
    className={classNames('d-inline-block wmx100', styles.wrapper, className)}
    {...rest}
  >
    <svg className='w100' width={width} viewBox={isHorizontal ? "0 0 408 96" : "0 0 128 128"} fill="none">
      {children}
    </svg>
  </div>
);

export { LogoWrapper };