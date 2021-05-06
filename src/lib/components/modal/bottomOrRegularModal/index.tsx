import React, { useEffect, useRef, useState } from 'react';

import { Props, RegularModal } from '..';
import BottomModal from '../bottomModal';

import styles from './style.module.scss';

export default ({ isOpen, ...props }: Props) => {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [visibleSize, setVisibleSize] = useState<'desktop' | 'mobile'>(
    'desktop'
  );

  const handleResize = () => {
    setVisibleSize(
      mobileRef.current !== null &&
        window.getComputedStyle(mobileRef.current).display !== 'none'
        ? 'mobile'
        : 'desktop'
    );
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.mobile} ref={mobileRef}>
        {visibleSize === 'mobile' && <BottomModal {...props} isOpen={isOpen} />}
      </div>
      {visibleSize === 'desktop' && (
        <div className={styles.desktop}>
          <RegularModal {...props} isOpen={isOpen} />
        </div>
      )}
    </>
  );
};
