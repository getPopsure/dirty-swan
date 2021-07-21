import React from 'react';

import { Props } from '..';
import useOnClose from '../hooks/useOnClose';

import styles from './style.module.scss';

import imageClose from './img/close.svg';

export default ({
  title,
  isOpen,
  children,
  onClose,
  className = '',
  dismissible = true,
}: Props) => {
  const { isClosing, handleContainerClick, handleOnClose } = useOnClose(
    onClose,
    isOpen,
    dismissible
  );

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className={isClosing ? styles['overlay--close'] : styles.overlay}
      onClick={handleOnClose}
    >
      <div
        className={`${
          isClosing ? styles['container--close'] : styles.container
        } ${className}`}
        onClick={handleContainerClick}
      >
        <div className={styles.header}>
          <div className={`p-h2 ${styles.title}`}>{title}</div>
          {dismissible && (
            <button
              type="button"
              className={styles.close}
              onClick={handleOnClose}
            >
              <img src={imageClose} alt="Close" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
