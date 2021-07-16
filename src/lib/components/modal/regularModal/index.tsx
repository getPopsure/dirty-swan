import React, { useEffect } from 'react';

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
}: Props) => {
  const { isClosing, handleContainerClick, handleOnClose } =
    useOnClose(onClose);

  useEffect(() => {
    const handleWheelEvent = (e: Event) => (isOpen ? e.preventDefault() : null);

    if (isOpen) {
      window.addEventListener('wheel', handleWheelEvent, { passive: false });
    } else {
      window.removeEventListener('wheel', handleWheelEvent);
    }

    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
    };
  }, [isOpen]);

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
          <button
            type="button"
            className={styles.close}
            onClick={handleOnClose}
          >
            <img src={imageClose} alt="Close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
