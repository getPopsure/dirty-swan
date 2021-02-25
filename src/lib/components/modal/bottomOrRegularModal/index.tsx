import React from 'react';
import { Props, RegularModal } from '..';

import BottomModal from '../bottomModal';

import styles from './style.module.scss';

export default (props: Props) => {
  return (
    <>
      <div className={styles.mobile}>
        <BottomModal {...props} />
      </div>
      <div className={styles.desktop}>
        <RegularModal {...props} />
      </div>
    </>
  );
};
