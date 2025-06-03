import React, { useState } from 'react';
import classnames from 'classnames';
import generateId from '../../util/generateId';

import styles from './style.module.scss';

// Something weird is going on with enterKeyHint that makes it a required field under certain circumstances. The & Omit<…> and & Pick<…> is a hacky way to go around that.
export type InputProps = Omit<JSX.IntrinsicElements['input'], 'enterKeyHint'> &
  Partial<Pick<JSX.IntrinsicElements['input'], 'enterKeyHint'>> & {
    error?: string | boolean;
    prefix?: string;
    label?: string;
    id?: string;
    hideLabel?: boolean;
    labelInsideInput?: boolean;
  };

export const Input = React.forwardRef(
  (
    {
      className,
      placeholder,
      label,
      id,
      prefix,
      error,
      disabled,
      hideLabel = false,
      labelInsideInput = false,
      ...props
    }: InputProps,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [uniqueId] = useState(id ?? generateId());

    return (
      <div className={`${styles.container} ${className ?? ''}`}>
        {label && !labelInsideInput && (
          <label
            htmlFor={uniqueId}
            className={classnames('p-p', styles.label, {
              [styles['label--with-error']]: error,
              'sr-only': hideLabel,
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
              (!label || labelInsideInput) &&
                placeholder &&
                placeholder.length > 0
                ? styles.input
                : styles['input--no-placeholder'],
              {
                [styles['input--with-prefix']]: prefix,
                [styles['input--with-inside-label']]: labelInsideInput,
              }
            )}
            placeholder={label || labelInsideInput ? placeholder : ' '}
            disabled={disabled}
            aria-invalid={!!error}
            aria-errormessage={error ? `${uniqueId}-error` : undefined}
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
          {(!label || labelInsideInput) && (
            <label
              htmlFor={uniqueId}
              className={classnames(
                styles.placeholder,
                { [styles['placeholder--with-prefix']]: prefix },
                { [styles['placeholder--with-error']]: error }
              )}
            >
              {labelInsideInput ? label : placeholder}
            </label>
          )}
        </div>
        {error && (
          <p
            id={`${uniqueId}-error`}
            className={`p-p--small tc-red-500 w100 ${styles.error}`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
