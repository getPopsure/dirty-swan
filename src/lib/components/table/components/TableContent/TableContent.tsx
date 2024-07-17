import classNames from 'classnames';

import styles from './TableContent.module.scss';
import { TableCell, TableCellProps } from '../TableCell/TableCell';
import { ReactNode, useCallback } from 'react';

export interface TableContentProps {
  className?: string;
  data: TableCellProps[][];
  hideHeader?: boolean;
  openModal?: (title: ReactNode, body: ReactNode) => void;
  title: string;
  width?: number | string;
}

const TableContent = ({
  className,
  data,
  hideHeader,
  openModal,
  title,
  width,
}: TableContentProps) => {
  const headerRow = data?.[0];

  const getColumnContentByKey = useCallback(
    (key: number) => data?.[0]?.[key]?.content || '',
    [data]
  );

  const handleOpenModal = (
    cellIndex: number,
    modalContent: ReactNode,
    title?: ReactNode
  ) => openModal?.(title || getColumnContentByKey(cellIndex), modalContent);

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
                  openModal={(modalContent) =>
                    handleOpenModal(0, modalContent, tableCellProps?.content)
                  }
                  {...tableCellProps}
                />
              );
            })}
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((row, rowIndex) => {
          const isSingleCell = row.length === 1;

          return (
            rowIndex > 0 && (
              <tr key={rowIndex} className={styles.tr}>
                {row.map((tableCellProps, cellIndex) => {
                  const key = `${rowIndex}-${cellIndex}`;
                  const isFirstCellInRow = cellIndex === 0;

                  const onCelInfoClick = (info: ReactNode) =>
                    handleOpenModal(
                      cellIndex,
                      info,
                      isFirstCellInRow ? tableCellProps.content : undefined
                    );

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
