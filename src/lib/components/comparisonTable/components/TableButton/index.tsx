import { ReactNode } from 'react';
import styles from './style.module.scss';

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
  <button
    className={`${styles.button} ${className}`}
    data-testid="ds-table-button"
    onClick={onClick}
  >
    <span>
      {children}
    </span>
  </button>
);

export default TableButton;
