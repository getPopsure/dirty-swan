import React, { useState, useCallback } from 'react';

import { Props } from '..';
import styles from './style.module.scss';

import { XIcon } from '../../icon/icons';
import useOnClose from '../hooks/useOnClose';
import classNames from 'classnames';
import { ModalFooter } from '../components/ModalFooter';

export const BottomModal = ({
  title,
  isOpen,
  children,
  onClose,
  className = '',
  dismissible = true,
  footer,
}: Props) => {
  const [containerXOffset, setContainerXOffset] = useState(0);
  const [footerHeight, setFooterHeight] = useState(80);
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
    <>
      <div
        className={isClosing ? styles.overlayClose : styles.overlay}
        onClick={handleOnOverlayClick}
      >
        <div
          className={styles.wrapper}
          ref={containerRef}
          onClick={handleContainerClick}
          style={{ top: `${containerXOffset}px` }}
        >
          <div
            className={classNames(
              styles.container,
              styles.appear,
              className, {
                [styles.appearClose]: isClosing, 
              }
            )}
            style={{ paddingBottom: footer ? footerHeight : 0 }}
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
                  <XIcon
                    size={24}
                    color={'grey-700'}
                    className={`${styles.closeIcon}`}
                  />
                </button>
              )}
            </div>
            <div className={footer ? '' : styles.content}>{children}</div>
          </div>
        </div>
      </div>

      {footer && (
        <ModalFooter
          className={classNames(
            styles.appear, {
              [styles.appearClose]: isClosing, 
            }
          )}
          fixed
          onHeightChange={setFooterHeight}
        >
          {footer?.(handleOnClose)}
        </ModalFooter>
      )}
    </>
  );
};
