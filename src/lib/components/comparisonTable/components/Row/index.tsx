import React from 'react';
import { Cell } from '../../index';

import styles from './style.module.scss';

interface RowProps<T> {
  cell: Cell<T>;
  data: Array<T>;
  isRowHeader?: boolean;
  rowId: string;
  mobileWidth?: number;
  desktopWidth?: number;
}

const Row = <T extends { id: number }>(props: RowProps<T>) => {
  const { cell, data, isRowHeader, rowId, mobileWidth, desktopWidth } = props;

  const widthStyle = {
    ...(mobileWidth ? { '--mobileRowWidth': `${mobileWidth}px` } : {}),
    ...(desktopWidth ? { '--desktopRowWidth': `${desktopWidth}px` } : {}),
  } as React.CSSProperties;

  return (
    <div
      key={rowId}
      className={`
        d-flex
        w-100
        ${isRowHeader ? styles.header : ''}
      `}
    >
      <h4
        className={`
          wmx4
          ${styles.cell}
          ${styles.sticky}
          ${isRowHeader ? `p-h2 p--serif ${styles.title}` : ''}
          ${typeof cell.key === 'undefined' ? styles.addon : ''}
        `}
        style={widthStyle}
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
              className={`ta-center ${styles.cell}`}
              key={`${rowId}-${item.id}`}
              style={widthStyle}
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
