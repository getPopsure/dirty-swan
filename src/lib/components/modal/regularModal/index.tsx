import React, { useState, useEffect } from 'react';

import { Props } from '..';
import styles from './style.module.scss';

import imageClose from './img/close.svg';

export default ({ title, isOpen, children, onClose }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOnClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={isClosing ? styles['overlay--close'] : styles.overlay}>
      <div
        className={isClosing ? styles['container--close'] : styles.container}
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
