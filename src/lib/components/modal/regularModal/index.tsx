import React from 'react';

import { Props } from '..';
import useOnClose from '../hooks/useOnClose';

import styles from './style.module.scss';
import { XIcon } from '../../icon/icons';
import classNames from 'classnames';

export const RegularModal = ({
  title,
  isOpen,
  children,
  onClose,
  className = '',
  dismissible = true,
}: Props) => {
  const {
    isClosing,
    handleContainerClick,
    handleOnClose,
    handleOnOverlayClick,
  } = useOnClose(onClose, isOpen, dismissible);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className={isClosing ? styles['overlay--close'] : styles.overlay}
      onClick={handleOnOverlayClick}
    >
      <div
        className={`${
          isClosing ? styles['container--close'] : styles.container
        } ${className}`}
      >
        <div className={styles.body} onClick={handleContainerClick}>
          <div
            className={classNames(styles.header, {
              'jc-between': !!title,
              'jc-end': !title,
            })}
          >
            {title && <div className={`p-h2 ${styles.title}`}>{title}</div>}
            {dismissible && (
              <button
                type="button"
                className={styles.close}
                onClick={handleOnClose}
              >
                <XIcon
                  size={24}
                  color={'grey-700'}
                  className={`${styles.closeIcon}`}
                />
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
