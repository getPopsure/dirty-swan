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
  <span
    className={`${styles.button} ${className}`}
    data-testid="ds-table-button"
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    {children}
  </span>
);

export default TableButton;
