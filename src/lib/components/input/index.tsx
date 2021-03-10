import React from 'react';

import styles from './style.module.scss';

// Something weird is going on with enterKeyHint that makes it a required field under certain circumstances. The & Omit<…> and & Pick<…> is a hacky way to go around that.
type InputProps = { hasError?: boolean } & Omit<
  JSX.IntrinsicElements['input'],
  'enterKeyHint'
> &
  Partial<Pick<JSX.IntrinsicElements['input'], 'enterKeyHint'>>;

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
