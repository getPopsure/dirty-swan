import React from 'react';

import styles from './styles.module.scss';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'secondaryGrey'
  | 'outline'
  | 'outlineGrey';

const buttonTypeClassNameMap: { [K in ButtonType]: string } = {
  primary: 'p-btn--primary',
  secondary: 'p-btn--secondary',
  secondaryGrey: 'p-btn--secondary-grey',
  outline: 'p-btn--outline',
  outlineGrey: 'p-btn--outline-grey',
};

interface Icon {
  src: string;
  alt: string;
}

type ButtonProps = {
  buttonTitle: string;
  buttonType?: ButtonType;
  leftIcon?: Icon;
  loading?: boolean;
} & Omit<JSX.IntrinsicElements['button'], 'children'>;

export default React.forwardRef(
  (
    {
      className,
      loading = false,
      buttonTitle,
      buttonType = 'primary',
      leftIcon,
      ...props
    }: ButtonProps,
    ref?: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const buttonClassName = buttonTypeClassNameMap[buttonType];
    const loadingClassName = loading ? 'p-btn--loading' : '';
    return (
      <button
        ref={ref}
        className={`${buttonClassName} ${loadingClassName} ${className ?? ''}`}
        {...props}
      >
        {leftIcon ? (
          <div className={styles['content-container']}>
            <img
              width="20px"
              height="20px"
              className="mr8"
              src={leftIcon.src}
              alt={leftIcon.alt}
            />
            <div>{buttonTitle}</div>
          </div>
        ) : (
          <>{buttonTitle}</>
        )}
      </button>
    );
  }
);
