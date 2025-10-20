import { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icon';
import styles from './TableControls.module.scss';
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
  navigateTable,
}: TableControlsProps) => {
  return (
    <div
      aria-hidden
      className={classNames(
        'd-flex ai-stretch jc-between bg-white',
        styles.stickyHeader
      )}
      style={{ top: `${stickyHeaderTopOffset}px` }}
    >
      <div className='py24'>
        <Button
          className={classNames(
            { [styles.controlButtonHidden]: activeSection <= 1 },
            'br8',
            styles.controlButton
          )}
          disabled={activeSection <= 1}
          hideLabel
          leftIcon={<ChevronLeftIcon />}
          onClick={() => navigateTable()}
          type="button"
          variant="filledGray"
          data-testid="previous-section-button"
          style={{ height: '100%' }}
        >
          Previous section
        </Button>
      </div>

      {children}

      <div className='py24'>
        <Button
          className={classNames(
            { [styles.controlButtonHidden]: activeSection >= columnsLength - 1 },
            'br8',
            styles.controlButton
          )}
          disabled={activeSection >= columnsLength - 1}
          hideLabel
          leftIcon={<ChevronRightIcon />}
          onClick={() => navigateTable(true)}
          type="button"
          variant="filledGray"
          data-testid="next-section-button"
        >
          Next section
        </Button>
      </div>
    </div>
  );
};

export { TableControls };
