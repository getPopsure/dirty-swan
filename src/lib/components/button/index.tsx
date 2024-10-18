import classNames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

type ButtonVariant =
  | 'filledColor'
  | 'filledGray'
  | 'filledWhite'
  | 'filledBlack'
  | 'textColor'
  | 'textWhite'
  | 'outlineWhite'
  | 'filledSuccess'
  | 'filledError';

const buttonTypeClassNameMap: { [K in ButtonVariant]: string } = {
  filledColor: 'p-btn--primary',
  filledGray: 'p-btn--secondary-grey',
  filledWhite: 'p-btn--secondary-white',
  filledBlack: 'p-btn--secondary-black',
  textColor: 'p-btn--secondary',
  textWhite: 'p-btn--secondary-inverted',
  outlineWhite: 'p-btn--outline-white',
  filledSuccess: 'p-btn--success',
  filledError: 'p-btn--danger',
};

type ButtonProps = {
  as?: React.ElementType
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  loading?: boolean;
  hideLabel?: boolean;
} & Omit<JSX.IntrinsicElements['button'], 'children'>;

const buttonDefaultAsType = 'button' as const;
type ButtonDefaultAsType = typeof buttonDefaultAsType;

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;
type IntrinsicElement<E> = E extends PolymorphicButton ? IntrinsicElement<E> : never;

interface PolymorphicButton {
  <As = ButtonDefaultAsType>(props:
  As extends React.ComponentType<infer P> ? Merge<P, ButtonProps & {
      as?: As;
  }> : As extends keyof JSX.IntrinsicElements ? Merge<JSX.IntrinsicElements[As], ButtonProps & {
      as?: As;
  }> : never): React.ReactElement | null;
}

const Button = React.forwardRef((
  {
    as: ButtonTag = buttonDefaultAsType,
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
) as PolymorphicButton;

export { Button };
export type { ButtonProps, ButtonVariant };
