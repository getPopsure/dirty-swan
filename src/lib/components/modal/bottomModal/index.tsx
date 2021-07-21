import React, { useState, useCallback } from 'react';

import { Props } from '..';
import styles from './style.module.scss';

import imageClose from './img/close.svg';
import useOnClose from '../hooks/useOnClose';

export default ({
  title,
  isOpen,
  children,
  onClose,
  className = '',
  dismissible = true,
}: Props) => {
  const [containerXOffset, setContainerXOffset] = useState(0);
  const { isClosing, handleContainerClick, handleOnClose } = useOnClose(
    onClose,
    isOpen,
    dismissible
  );

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainerXOffset(
        Math.max(
          window.innerHeight * 0.1,
          window.innerHeight - node.getBoundingClientRect().height
        )
      );
    }
  }, []);

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
        ref={containerRef}
        style={{ top: `${containerXOffset}px` }}
        onClick={handleContainerClick}
      >
        <div className={styles.header}>
          <div className={`p-h4 ${styles.title}`}>{title}</div>
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
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
