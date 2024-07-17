import classNames from 'classnames';

import styles from './TableContent.module.scss';
import { TableCell, TableCellProps } from '../TableCell/TableCell';
import { ReactNode, useCallback } from 'react';
import { ModalData, ModalFunction, TableCellRowData } from '../../types';

export interface TableContentProps {
  className?: string;
  tableCellRows: TableCellRowData[];
  hideHeader?: boolean;
  openModal?: ModalFunction;
  title: string;
  width?: number | string;
}

const TableContent = ({
  className,
  tableCellRows,
  hideHeader,
  openModal,
  title,
  width,
}: TableContentProps) => {
  const headerRow = tableCellRows?.[0];

  const getColumnContentByKey = useCallback(
    (key: number) => tableCellRows?.[0]?.[key]?.content || '',
    [tableCellRows]
  );

  const handleOpenModal = ({
    cellIndex,
    body,
    title,
  }: ModalData & {
    cellIndex: number;
  }) =>
    openModal?.({
      body,
      title: title || getColumnContentByKey(cellIndex),
    });

  return (
    <table
      className={classNames(className, 'w100', styles.table)}
      width={width}
    >
      <caption className="sr-only">{title}</caption>

      {headerRow && (
        <thead className={hideHeader ? 'sr-only' : ''}>
          <tr>
            {headerRow.map((tableCellProps, cellIndex) => {
              const isFirstCellInRow = cellIndex === 0;
              return (
                <TableCell
                  key={cellIndex}
                  isHeader
                  isFirstCellInRow={isFirstCellInRow}
                  isTopLeftCell={isFirstCellInRow}
                  align={isFirstCellInRow ? 'left' : 'center'}
                  openModal={(body) =>
                    handleOpenModal({
                      cellIndex,
                      body,
                      title: tableCellProps?.content,
                    })
                  }
                  {...tableCellProps}
                />
              );
            })}
          </tr>
        </thead>
      )}

      <tbody>
        {tableCellRows.map((row, rowIndex) => {
          const isSingleCell = row.length === 1;

          return (
            rowIndex > 0 && (
              <tr key={rowIndex} className={styles.tr}>
                {row.map((tableCellProps, cellIndex) => {
                  const key = `${rowIndex}-${cellIndex}`;
                  const isFirstCellInRow = cellIndex === 0;

                  const onCelInfoClick = (body: ReactNode) =>
                    handleOpenModal({
                      cellIndex,
                      body,
                      title: isFirstCellInRow
                        ? tableCellProps.content
                        : undefined,
                    });

                  return (
                    <TableCell
                      align={
                        isFirstCellInRow && !isSingleCell ? 'left' : 'center'
                      }
                      isFirstCellInRow={isFirstCellInRow}
                      openModal={onCelInfoClick}
                      key={key}
                      {...tableCellProps}
                    />
                  );
                })}
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};

export type { TableCellProps };

export { TableContent };
