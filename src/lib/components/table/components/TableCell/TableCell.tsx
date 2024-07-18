import classNames from 'classnames';

import styles from './TableCell.module.scss';
import { BaseCell, BaseCellProps } from './BaseCell/BaseCell';

type PositionalTableCellProps = {
  isHeader?: boolean;
  isFirstCellInRow?: boolean;
  isTopLeftCell?: boolean;
  isNavigation?: boolean;
};

export type TableCellProps = BaseCellProps & PositionalTableCellProps;

const TableCell = ({
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
      <BaseCell
        {...cellProps}
        contentFontVariant={isTopLeftCell ? 'BIG_WITH_UNDERLINE' : 'NORMAL'}
      />
    </Tag>
  );
};

export { TableCell };
