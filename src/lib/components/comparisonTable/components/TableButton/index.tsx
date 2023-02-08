import styles from './style.module.scss';

interface Props {
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
    {children}
  </button>
);

export default TableButton;
