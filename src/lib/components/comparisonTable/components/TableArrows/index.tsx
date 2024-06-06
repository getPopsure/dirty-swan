import React from 'react';
import classNames from 'classnames';

import ArrowIcon from './Arrow';
import styles from './style.module.scss';

export type ArrowValues = 'prev' | 'next';

interface TableArrowsProps {
  onClick: (value: ArrowValues) => void;
  active: { left: boolean; right: boolean };
}

const TableArrows = (props: TableArrowsProps) => {
  const { active, onClick } = props;
  const handleButtonClick = (value: ArrowValues) => () => onClick(value);

  return (
    <div className={styles.container}>
      <button
        onClick={handleButtonClick('prev')}
        className={classNames(
          `p-btn--secondary d-flex`,
          styles.prev,
          styles.arrow,
          {
            [styles.active]: active.left,
          }
        )}
        disabled={!active.left}
      >
        <ArrowIcon />
      </button>
      <button
        onClick={handleButtonClick('next')}
        className={classNames(
          `p-btn--secondary d-flex`,
          styles.next,
          styles.arrow,
          {
            [styles.active]: active.right,
          }
        )}
        disabled={!active.right}
      >
        <ArrowIcon />
      </button>
    </div>
  );
};

export default TableArrows;
