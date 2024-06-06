import { ReactNode } from 'react';
import styles from './style.module.scss';
import TableInfoButton from '../TableInfoButton';

interface Props {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const TableButton: React.FC<Props> = ({
  children,
  onClick,
  className = '',
}) => (
  <div className={styles.wrapper}>
    {children}
    <TableInfoButton
      className={`${styles.infoButton} ${className}`}
      data-testid="ds-table-button"
      onClick={onClick}
    />
  </div>
);

export default TableButton;
