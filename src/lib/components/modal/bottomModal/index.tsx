import React, { useState, useCallback } from 'react';

import { Props } from '..';
import styles from './style.module.scss';

import { XIcon } from '../../icon/icons';
import useOnClose from '../hooks/useOnClose';
import classNames from 'classnames';

export const BottomModal = ({
  title,
  isOpen,
  children,
  onClose,
  className = '',
  dismissible = true,
}: Props) => {
  const [containerXOffset, setContainerXOffset] = useState(0);
  const {
    isClosing,
    handleContainerClick,
    handleOnClose,
    handleOnOverlayClick,
  } = useOnClose(onClose, isOpen, dismissible);

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
      onClick={handleOnOverlayClick}
    >
      <div
        className={styles.wrapper}
        ref={containerRef}
        onClick={handleContainerClick}
        style={{ top: `${containerXOffset}px` }}
      >
        <div
          className={`${
            isClosing ? styles['container--close'] : styles.container
          } ${className}`}
        >
          <div
            className={classNames(styles.header, {
              'jc-between': !!title,
              'jc-end': !title,
            })}
          >
            <div className={`p-h4 ${styles.title}`}>{title}</div>
            {dismissible && (
              <button
                type="button"
                className={styles.close}
                onClick={handleOnClose}
              >
                <XIcon size={24} color={'grey-700'} />
              </button>
            )}
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};
