import classNames from 'classnames';

import styles from './TableCell.module.scss';
import { BaseCell } from './BaseCell/BaseCell';
import { TableCellData } from '../../types';
import { CTACell } from './CTACell/CTACell';
import { CardCell } from './CardCell/CardCell';
import { ButtonCell } from './ButtonCell/ButtonCell';
import React from 'react';

type ExtraTableCellProps = {
  isHeader?: boolean;
  isFirstCellInRow?: boolean;
  isTopLeftCell?: boolean;
  isNavigation?: boolean;
  imageComponent?: (args: any) => JSX.Element;
  isBelowDesktop?: boolean;
};

export type TableCellProps = TableCellData & ExtraTableCellProps;

const TableCell = React.memo(
  ({
    isFirstCellInRow = false,
    isHeader = false,
    isNavigation = false,
    isTopLeftCell = false,
    colSpan = 0,
    isBelowDesktop,
    ...cellProps
  }: TableCellProps) => {
    // prettier-ignore
    const Tag = isNavigation
    ? 'div'
    : isHeader || isFirstCellInRow ? 'th' : 'td';

    // prettier-ignore
    const thScope = isHeader
    ? 'col'
    : isFirstCellInRow ? 'row' : undefined;

    const scope = {
      scope: thScope,
    };

    return (
      <Tag
        {...scope}
        className={classNames('bg-white py24 px8', styles.th, {
          'ta-left': isFirstCellInRow,
          [styles.thNavigation]: isNavigation,
          [styles.fixedCell]: isFirstCellInRow && colSpan < 1 ,
          [styles.fixedCard]: cellProps.type === 'CARD',
          pl16: isFirstCellInRow,
        })}
        colSpan={isBelowDesktop && cellProps.type === 'CARD' ? 2 : colSpan}
      >
        {!cellProps.type && (
          <BaseCell
            {...cellProps}
            fontVariant={
              isTopLeftCell
                ? 'TITLE'
                : cellProps.fontVariant ?? 'NORMAL'
            }
          />
        )}
        {cellProps.type === 'CTA' && <CTACell {...cellProps} />}
        {cellProps.type === 'BUTTON' && <ButtonCell {...cellProps} />}
        {cellProps.type === 'CARD' && <CardCell {...cellProps} />}
      </Tag>
    );
  }
);

export { TableCell };
