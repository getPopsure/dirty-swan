import classNames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import styles from './style.module.scss';

type ButtonVariant =
  | 'filledColor'
  | 'filledGray'
  | 'filledWhite'
  | 'textColor'
  | 'textWhite'
  | 'outlineWhite'
  | 'filledSuccess'
  | 'filledError';

const buttonTypeClassNameMap: { [K in ButtonVariant]: string } = {
  filledColor: 'p-btn--primary',
  filledGray: 'p-btn--secondary-grey',
  filledWhite: 'p-btn--secondary-white',
  textColor: 'p-btn--secondary',
  textWhite: 'p-btn--secondary-inverted',
  outlineWhite: 'p-btn--outline-white',
  filledSuccess: 'p-btn--success',
  filledError: 'p-btn--danger',
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  loading?: boolean;
  hideLabel?: boolean;
} & Omit<JSX.IntrinsicElements['button'], 'children'>;

const Button = React.forwardRef((
  {
    className,
    loading = false,
    children,
    variant = 'filledColor',
    leftIcon,
    rightIcon,
    hideLabel,
    ...props
  }: ButtonProps,
  ref?: React.ForwardedRef<HTMLButtonElement>
) => (
    <button
      ref={ref}
      className={classNames(
        buttonTypeClassNameMap[variant], 
        className, {
          'p-btn--loading': loading,
          'p-btn--icon-only': hideLabel,
        })}
      data-testid="button"
      {...props}
    >
      {leftIcon || rightIcon ? (
        <div className="d-flex jc-center ai-center">
          {leftIcon && (
            <span
              className={classNames('d-inline-flex', {
                'mr8': !hideLabel
              })}
            >
              {React.cloneElement(leftIcon, { 
                size: 20, 
                noMargin: true
              })}
            </span>
          )}
          
          <div className={classNames({
              'sr-only': hideLabel
            })}
          >
            {children}
          </div>

          {rightIcon && (
            <span
              className={classNames('d-inline-flex', {
                'ml8': !hideLabel
              })}
            >
              {React.cloneElement(rightIcon, { 
                size: 20, 
                noMargin: true
              })}
            </span>
          )}
        </div>
      ) : children}
    </button>
  )
);

export { Button };
export type { ButtonProps, ButtonVariant };
