import React, { useState, useCallback } from 'react';

import { Props } from '..';
import styles from './style.module.scss';

import imageClose from './img/close.svg';

export default ({ title, isOpen, children, onClose }: Props) => {
  const [containerXOffset, setContainerXOffset] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleOnClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className={isClosing ? styles['overlay--close'] : styles.overlay}>
      <div
        className={isClosing ? styles['container--close'] : styles.container}
        ref={containerRef}
        style={{ top: `${containerXOffset}px` }}
      >
        <div className={styles.header}>
          <div className={`p-h4 ${styles.title}`}>{title}</div>
          <button
            type="button"
            className={styles.close}
            onClick={handleOnClose}
          >
            <img src={imageClose} alt="Close" />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
