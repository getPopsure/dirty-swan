import React from 'react';

import type { Cell } from '../../index';
import styles from './style.module.scss';
import classNames from 'classnames';

interface RowProps<T> {
  cell: Cell<T>;
  data: Array<T>;
  isRowHeader?: boolean;
  rowId: string;
  cellClassName?: string;
}

const Row = <T extends { id: number }>(props: RowProps<T>) => {
  const { cell, data, isRowHeader, rowId, cellClassName } = props;

  return (
    <div
      key={rowId}
      className={classNames('d-flex w-100', {
        [styles.header]: isRowHeader,
      })}
    >
      <h4
        className={classNames(
          styles.cell,
          styles.sticky,
          {
            [`p-h2 p--serif ${styles.title}`]: isRowHeader,
            [styles.addon]: typeof cell.key === 'undefined',
          },
          cellClassName
        )}
      >
        {cell.label}
      </h4>

      {Array.isArray(data) &&
        data.map((item) => {
          /**
           * Do not render a cell if
           * the data source object doesn't have the current key
           */
          if (typeof cell.key === 'undefined') return null;
          if (typeof item[cell.key] === 'undefined') return null;

          return (
            <div
              className={classNames('ta-center', styles.cell, cellClassName)}
              key={`${rowId}-${item.id}`}
            >
              {
                /**
                 * Return a function if `render` option is present
                 * else print the current data source value
                 */
                typeof cell.render === 'function'
                  ? cell.render(item[cell.key], item)
                  : `${item[cell.key]}`
              }
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(Row) as typeof Row;
