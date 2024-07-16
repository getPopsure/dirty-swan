import classNames from 'classnames';

import styles from './style.module.scss';

export interface TableColumnProps {
  children?: React.ReactNode;
  isColumn?: boolean;
  isFixed?: boolean;
  isHeader?: boolean;
  cellProps?: React.HTMLProps<HTMLTableCellElement>;
} 

const TableColumn = ({
  children,
  isColumn,
  isFixed,
  isHeader,
  cellProps = {},
}: TableColumnProps) => {
  const Tag = isHeader ? 'th' : 'td';

  return (
    <Tag
      scope={isColumn ? 'col' : 'row'}
      className={classNames(
        'bg-white py24 px8',
        styles.th,
        {
          [styles.thCol]: isColumn,
          [styles.fixedCell]: isFixed,
          'pl32': isFixed,
        }
      )}
      {...cellProps}
    >
      {children}
    </Tag>
    );
};

export { TableColumn };

