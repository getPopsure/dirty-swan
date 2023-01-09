import React from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import styles from './style.module.scss';

// Something weird is going on with enterKeyHint that makes it a required field under certain circumstances. The & Omit<…> and & Pick<…> is a hacky way to go around that.
export type InputProps = {
  error?: string;
  prefix?: string;
  label?: string;
  id?: string;
} & Omit<JSX.IntrinsicElements['input'], 'enterKeyHint'> &
  Partial<Pick<JSX.IntrinsicElements['input'], 'enterKeyHint'>>;

export default React.forwardRef(
  (
    {
      className,
      placeholder,
      label,
      id,
      prefix,
      error,
      disabled,
      ...props
    }: InputProps,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => {
    const uniqueId = id ?? `${label?.toLowerCase()}-${uuidv4()}`;
    return (
      <div className={`${styles.container} ${className ?? ''}`}>
        {label && (
          <label
            htmlFor={uniqueId}
            className={classnames('p-p', styles.label, {
              [styles['label--with-error']]: error,
            })}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <input
            id={uniqueId}
            data-testid="ds-input-input"
            type="text"
            ref={ref}
            className={classnames(
              error ? 'p-input--error' : 'p-input',
              !label && placeholder && placeholder.length > 0
                ? styles.input
                : styles['input--no-placeholder'],
              { [styles['input--with-prefix']]: prefix }
            )}
            placeholder={label ? placeholder : ' '}
            disabled={disabled}
            {...props}
          />
          {prefix && (
            <span
              className={classnames(
                styles.prefix,
                { [styles['prefix--with-error']]: error },
                { [styles['prefix--disabled']]: disabled }
              )}
            >
              {prefix}
            </span>
          )}
          {!label && (
            <label
              htmlFor={uniqueId}
              className={classnames(
                styles.placeholder,
                { [styles['placeholder--with-prefix']]: prefix },
                { [styles['placeholder--with-error']]: error }
              )}
            >
              {placeholder}
            </label>
          )}
        </div>
        {error && (
          <p className={`p-p--small tc-red-500 w100 ${styles.error}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
