import classNames from 'classnames';
import React, { ReactElement, ElementType, ComponentProps, ReactNode } from 'react';

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

const buttonDefaultAs = 'button' as const
type ButtonDefaultAsType = typeof buttonDefaultAs;

type ButtonOwnProps<E> = {
  as?: E; 
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  loading?: boolean;
  hideLabel?: boolean;
} & Omit<JSX.IntrinsicElements['button'], 'children'>;

export type ButtonProps<E extends ElementType = ButtonDefaultAsType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps<E>>;

const Button = React.forwardRef(<E extends ElementType = ButtonDefaultAsType>(
  {
    as,
    className,
    loading = false,
    children,
    variant = 'filledColor',
    leftIcon,
    rightIcon,
    hideLabel,
    ...props
  }: ButtonProps<E>,
  ref?: React.ForwardedRef<E>
) => {
  const ButtonTag = as || 'button';

  return (
    <ButtonTag
      ref={ref}
      className={classNames(
        buttonTypeClassNameMap[variant], 
        className, {
          'p-btn--loading': loading,
          'tc-transparent': loading,
          'p-btn--icon-only': hideLabel,
        })}
      data-testid="button"
      {...props}
    >
      {!loading && (leftIcon || rightIcon) ? (
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
    </ButtonTag>
  )
});

export { Button };
export type { ButtonVariant };
