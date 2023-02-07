import TableButton from '../TableButton';
import styles from './style.module.scss';

interface TableRowHeaderProps {
  label: string;
  icon?: string;
  subtitle?: string;
  onClickInfo?: () => void;
}

const TableRowHeader = ({ icon, label, subtitle, onClickInfo }: TableRowHeaderProps) => (
  <div className="d-flex">
    {icon && <span className={`mr8 ${styles.icon}`}>{icon}</span>}
    <div>
      <p className="p-p d-inline">
        {!onClickInfo ? (
          <span>{label}</span>
        ) : (
          <TableButton className="mr8" onClick={onClickInfo}>
            {label}
          </TableButton>
        )}
      </p>
      {subtitle && <p className="p-p--small tc-grey-500">{subtitle}</p>}
    </div>
  </div>
);

export type { TableRowHeaderProps };
export default TableRowHeader;
