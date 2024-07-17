import classNames from 'classnames';

import styles from './TableContent.module.scss';
import { TableCell, TableCellProps } from '../TableCell/TableCell';
import { ReactNode, useCallback } from 'react';
import { TableColumn } from '../TableColumn/TableColumn';

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

  const getColumnTextByKey = useCallback(
    (key: number) => data?.[0]?.[key]?.text || '',
    [data]
  );

  const handleOpenModal = (
    cellIndex: number,
    modalBody: ReactNode,
    title?: ReactNode
  ) => openModal?.(title || getColumnTextByKey(cellIndex), modalBody);

  return (
    <table
      className={classNames(className, 'w100', styles.table)}
      width={width}
    >
      <caption className="sr-only">{title}</caption>

      {headerRow && (
        <thead className={hideHeader ? 'sr-only' : ''}>
          <tr>
            {headerRow.map(({ cellProps, ...cell }, cellIndex) => {
              const isFirstColumn = cellIndex === 0;

              return (
                <TableColumn
                  key={cellIndex}
                  cellProps={cellProps}
                  isColumn
                  isFixed={isFirstColumn}
                  isHeader
                >
                  {isFirstColumn ? (
                    <div
                      aria-hidden
                      className={classNames(
                        'tc-grey-800 p-h2 p--serif',
                        styles.title
                      )}
                    >
                      {cell?.text}
                    </div>
                  ) : (
                    <TableCell
                      {...cell}
                      openModal={(info) => handleOpenModal(0, info, cell?.text)}
                    />
                  )}
                </TableColumn>
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
                {row.map(({ cellProps, ...cell }, cellIndex) => {
                  const isFirstCol = cellIndex === 0;
                  const key = `${rowIndex}-${cellIndex}`;
                  const isHeader = isFirstCol && !isSingleCell;

                  const onCelInfoClick = (info: ReactNode) =>
                    handleOpenModal(
                      cellIndex,
                      info,
                      isFirstCol ? cell.text : undefined
                    );

                  return (
                    <TableColumn
                      key={key}
                      cellProps={cellProps}
                      isFixed={isHeader}
                      isHeader={isHeader}
                    >
                      <TableCell
                        align={isFirstCol && !isSingleCell ? 'left' : 'center'}
                        openModal={onCelInfoClick}
                        {...cell}
                      />
                    </TableColumn>
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
