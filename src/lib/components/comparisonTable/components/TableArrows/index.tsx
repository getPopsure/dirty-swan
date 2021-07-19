import React from 'react';
import classNames from 'classnames';

import ArrowIcon from './Arrow';
import { ActiveTableArrows } from '../../hooks/useActiveTableArrows';

import styles from './style.module.scss';

export type ArrowValues = 'prev' | 'next';

interface TableArrowsProps {
  onClick: (value: ArrowValues) => void;
  active: ActiveTableArrows;
}

const TableArrows = (props: TableArrowsProps) => {
  const { active, onClick } = props;
  const handleButtonClick = (value: ArrowValues) => () => onClick(value);

  return (
    <div className={`mt24 ${styles.container}`}>
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
      >
        <ArrowIcon />
      </button>
    </div>
  );
};

export default TableArrows;
