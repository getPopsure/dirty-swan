import classNames from 'classnames';

import styles from './TableSection.module.scss';
import { TableCell, TableCellProps } from '../TableCell/TableCell';
import {
  CellReplacements,
  isBaseCell,
  ModalFunction,
  TableCellData,
  TableCellRowData,
} from '../../types';

export interface TableSectionProps {
  className?: string;
  tableCellRows: TableCellRowData[];
  hideHeader?: boolean;
  openModal?: ModalFunction;
  title: string;
  width?: number | string;
  cellReplacements?: CellReplacements;
}

const TableSection = ({
  className,
  tableCellRows,
  hideHeader,
  openModal,
  title,
  width,
  cellReplacements,
}: TableSectionProps) => {
  const headerRow = tableCellRows?.[0];

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
                <TableCell
                  key={cellIndex}
                  isHeader
                  isFirstCellInRow={isFirstCellInRow}
                  isTopLeftCell={isFirstCellInRow}
                  {...cellProps}
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
                {row.map((tableCellData, cellIndex) => {
                  const key = `${rowIndex}-${cellIndex}`;
                  const isFirstCellInRow = cellIndex === 0;

                  const titleFromRow = getModalTitleFromRowHeader(row);
                  const titleFromColumnOrRow =
                    getModalTitleFromColumnHeader(cellIndex) ||
                    getModalTitleFromRowHeader(row);

                  const cellReplacementData =
                    (tableCellData.cellId &&
                      cellReplacements?.[tableCellData.cellId]) ||
                    {};

                  const cellProps = {
                    ...tableCellData,
                    ...cellReplacementData,
                    ...{
                      openModal,
                      modalTitle: isFirstCellInRow
                        ? titleFromRow
                        : titleFromColumnOrRow,
                      align: isFirstCellInRow ? 'left' : 'center',
                    },
                  } as TableCellData;

                  return (
                    <TableCell
                      isFirstCellInRow={isFirstCellInRow}
                      key={key}
                      {...cellProps}
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
