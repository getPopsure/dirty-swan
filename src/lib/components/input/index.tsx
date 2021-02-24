import React from 'react';

import styles from './style.module.scss';

type InputProps = { hasError?: boolean } & JSX.IntrinsicElements['input'];

export default React.forwardRef(
  (
    { className, placeholder, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <div className={`${styles.container} ${className ?? ''}`}>
      <input
        type="text"
        ref={ref}
        className={`${props.hasError ? 'p-input--error' : 'p-input'} ${
          placeholder && placeholder?.length > 0
            ? styles.input
            : styles['input--no-placeholder']
        }`}
        placeholder=" "
        {...props}
      />
      <span className={styles.placeholder}>{placeholder}</span>
    </div>
  )
);
