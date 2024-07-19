import classNames from 'classnames';

import styles from './TableSection.module.scss';
import { TableCell, TableCellProps } from '../TableCell/TableCell';
import React, { ReactNode, useCallback } from 'react';
import { ModalData, ModalFunction, TableCellRowData } from '../../types';
import { Alignment } from '../TableCell/BaseCell/BaseCell';

export interface TableSectionProps {
  className?: string;
  tableCellRows: TableCellRowData[];
  hideHeader?: boolean;
  openModal?: ModalFunction;
  title: string;
  width?: number | string;
}

const TableSection = ({
  className,
  tableCellRows,
  hideHeader,
  openModal,
  title,
  width,
}: TableSectionProps) => {
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

              const isBaseCell = !tableCellProps.type;

              let openModal;
              let align: Alignment = 'left';

              if (isBaseCell) {
                openModal = (body: ReactNode) =>
                  handleOpenModal({
                    cellIndex,
                    body,
                    title: tableCellProps?.content,
                  });
                align = isFirstCellInRow ? 'left' : 'center';
              }

              return (
                <TableCell
                  key={cellIndex}
                  isHeader
                  isFirstCellInRow={isFirstCellInRow}
                  isTopLeftCell={isFirstCellInRow}
                  {...tableCellProps}
                  {...(isBaseCell
                    ? {
                        openModal,
                        align,
                      }
                    : {})}
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

                  let openModal;
                  let align: Alignment = 'left';

                  const isBaseCell = !tableCellProps.type;

                  if (isBaseCell) {
                    openModal = onCelInfoClick;
                    align = isFirstCellInRow ? 'left' : 'center';
                  }

                  return (
                    <TableCell
                      {...(isBaseCell
                        ? {
                            openModal,
                            align,
                          }
                        : {})}
                      isFirstCellInRow={isFirstCellInRow}
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

export { TableSection };
