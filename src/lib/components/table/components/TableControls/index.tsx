import { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icon';
import styles from './style.module.scss';
import { Button } from '../../../button';
import classNames from 'classnames';

export interface TableControlsProps {
  activeSection: number;
  children: ReactNode;
  columnsLength: number;
  stickyHeaderTopOffset: number;
  navigateTable: (next?: boolean) => void;
}

const TableControls = ({
  activeSection,
  children,
  columnsLength,
  stickyHeaderTopOffset,
  navigateTable
}: TableControlsProps) => {
  return (
    <div
      aria-hidden
      className={classNames(
        'd-flex ai-center jc-between bg-white px8',
        styles.stickyHeader
      )}
      style={{ top: `${stickyHeaderTopOffset}px` }}
    >
      <Button
        className={(styles.controlButton)}
        disabled={activeSection <= 1}
        hideLabel
        leftIcon={<ChevronLeftIcon />}
        onClick={() => navigateTable()}
        type="button"
        variant='filledGray'
        data-testid="previous-section-button"
      >
        Previous section
      </Button>

      {children}

      <Button
        className={styles.controlButton}
        disabled={activeSection >= columnsLength - 1}
        hideLabel
        leftIcon={<ChevronRightIcon />}
        onClick={() => navigateTable(true)}
        type="button"
        variant='filledGray'
        data-testid="next-section-button"
      >
        Next section
      </Button>
    </div>
  );
};

export { TableControls };
  