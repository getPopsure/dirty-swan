import classNames from 'classnames';
import styles from './style.module.scss';
import TableInfoButton from '../TableInfoButton';

interface TableRowHeaderProps {
  label: string;
  icon?: string;
  subtitle?: string;
  onClickInfo?: () => void;
}

const TableRowHeader = ({
  icon,
  label,
  subtitle,
  onClickInfo,
}: TableRowHeaderProps) => (
  <div className="d-flex">
    {icon && <span className={`mr8 ${styles.icon}`}>{icon}</span>}
    <div>
      <p className="p-p d-inline">
        <span
          className={classNames({
            mr8: onClickInfo,
          })}
        >
          {label}
        </span>
        {onClickInfo && <TableInfoButton onClick={onClickInfo} />}
      </p>
      {subtitle && <p className="p-p--small tc-neutral-600">{subtitle}</p>}
    </div>
  </div>
);

export type { TableRowHeaderProps };
export default TableRowHeader;
