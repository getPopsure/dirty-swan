import React from 'react';

import styles from './styles.module.scss';

type ButtonType = 'primary' | 'secondary';

interface Icon {
  src: string;
  alt: string;
}

type InputProps = {
  buttonTitle: string;
  buttonType?: ButtonType;
  leftIcon?: Icon;
  loading?: boolean;
} & Omit<JSX.IntrinsicElements['button'], 'children'>;

export default React.forwardRef(
  ({
    className,
    loading = false,
    buttonTitle,
    buttonType = 'primary',
    leftIcon,
    type,
    ...props
  }: InputProps) => {
    const buttonClassName =
      buttonType === 'primary' ? 'p-btn--primary' : 'p-btn--secondary';
    const loadingClassName = loading ? 'p-btn--loading' : '';
    return (
      <button
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
