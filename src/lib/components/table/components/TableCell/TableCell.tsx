import classNames from 'classnames';

import styles from './TableCell.module.scss';
import { BaseCell } from './BaseCell/BaseCell';
import { TableCellData } from '../../types';
import { CTACell } from './CTACell/CTACell';
import { ButtonCell } from './ButtonCell/ButtonCell';
import React from 'react';

type ExtraTableCellProps = {
  isHeader?: boolean;
  isFirstCellInRow?: boolean;
  isTopLeftCell?: boolean;
  isNavigation?: boolean;
};

export type TableCellProps = TableCellData & ExtraTableCellProps;

const TableCell = React.memo(
  ({
    isFirstCellInRow = false,
    isHeader = false,
    isNavigation = false,
    isTopLeftCell = false,
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
          [styles.fixedCell]: isFirstCellInRow,
          pl32: isFirstCellInRow,
        })}
      >
        {!cellProps.type && (
          <BaseCell
            {...cellProps}
            fontVariant={
              isTopLeftCell
                ? 'BIG_WITH_UNDERLINE'
                : cellProps.fontVariant ?? 'NORMAL'
            }
          />
        )}
        {cellProps.type === 'CTA' && <CTACell {...cellProps} />}
        {cellProps.type === 'BUTTON' && <ButtonCell {...cellProps} />}
      </Tag>
    );
  }
);

export { TableCell };
