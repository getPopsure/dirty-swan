import classNames from 'classnames';

import styles from './TableSection.module.scss';
import { TableCell } from '../TableCell/TableCell';
import {
  CellReplacements,
  isBaseCell,
  ModalFunction,
  TableCellData,
  TableCellRowData,
} from '../../types';
import { useCallback } from 'react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

export interface TableSectionProps {
  className?: string;
  tableCellRows: TableCellRowData[];
  hideColumns?: number[];
  hideHeader?: boolean;
  openModal?: ModalFunction;
  title: string;
  width?: number | string;
  cellReplacements?: CellReplacements;
  imageComponent?: (args: any) => JSX.Element;
}

const TableSection = ({
  className,
  tableCellRows,
  hideColumns = [],
  hideHeader,
  openModal,
  title,
  width,
  cellReplacements,
  imageComponent,
}: TableSectionProps) => {
  const headerRow = tableCellRows?.[0];
  const isBelowDesktop = useMediaQuery('BELOW_DESKTOP');

  const getModalTitleFromColumnHeader = (cellIndex: number) => {
    const firstCellInColumn = tableCellRows?.[0]?.[cellIndex];
    let titleFromColumn;

    switch (firstCellInColumn.type) {
      case 'BUTTON':
        titleFromColumn = firstCellInColumn.buttonCaption;
        break;
      case 'CTA':
        titleFromColumn = firstCellInColumn.title;
        break;
      case undefined:
        titleFromColumn = firstCellInColumn.text || '';
        break;
    }

    return titleFromColumn;
  };

  const getModalTitleFromRowHeader = (currentRow: TableCellRowData) => {
    const firstCellInRow = currentRow?.[0];
    const titleFromRow =
      (isBaseCell(firstCellInRow) && firstCellInRow.text) || '';

    return titleFromRow;
  };

  const isVisibleColumn = useCallback(
    (cellIndex: number) => !hideColumns.includes(cellIndex),
    [hideColumns]
  );

  return (
    <table
      className={classNames(className, 'w100', styles.table)}
      width={width}
    >
      <caption className="sr-only">{title}</caption>

      {headerRow && (
        <thead className={hideHeader ? 'sr-only' : ''}>
          <tr>
            {headerRow.map((tableCellData, cellIndex) => {
              const isFirstCellInRow = cellIndex === 0;
              const cellReplacementData =
                (tableCellData.cellId &&
                  cellReplacements?.[tableCellData.cellId]) ||
                {};

              const cellProps = {
                ...tableCellData,
                ...cellReplacementData,
                ...{
                  openModal,
                  modalTitle:
                    (isBaseCell(tableCellData) && tableCellData.text) ||
                    getModalTitleFromColumnHeader(cellIndex),
                  align: isFirstCellInRow ? 'left' : 'center',
                },
              } as TableCellData;

              return (
                isVisibleColumn(cellIndex) && (
                  <TableCell
                    key={cellIndex}
                    isBelowDesktop={isBelowDesktop}
                    isHeader
                    isFirstCellInRow={isFirstCellInRow}
                    isTopLeftCell={isFirstCellInRow}
                    {...cellProps}
                    imageComponent={imageComponent}
                  />
                )
              );
            })}
          </tr>
        </thead>
      )}

      <tbody>
        {tableCellRows.map(
          (row, rowIndex) =>
            rowIndex > 0 && (
              <tr key={rowIndex} className={styles.tr}>
                {row.map((tableCellData, cellIndex) => {
                  const key = `${rowIndex}-${cellIndex}`;
                  const isFirstCellInRow = cellIndex === 0;
                  const titleFromRow = getModalTitleFromRowHeader(row);

                  const cellReplacementData =
                    (tableCellData.cellId &&
                      cellReplacements?.[tableCellData.cellId]) ||
                    {};

                  const cellProps = {
                    ...tableCellData,
                    ...cellReplacementData,
                    ...{
                      openModal,
                      modalTitle: tableCellData?.modalTitle || titleFromRow,
                      align: isFirstCellInRow ? 'left' : 'center',
                    },
                  } as TableCellData;

                  return (
                    !hideColumns.includes(cellIndex) && (
                      <TableCell
                        isBelowDesktop={isBelowDesktop}
                        isFirstCellInRow={isFirstCellInRow}
                        key={key}
                        {...cellProps}
                        imageComponent={imageComponent}
                      />
                    )
                  );
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export { TableSection };
