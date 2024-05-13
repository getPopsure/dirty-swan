import Info from '../../../icon/icons/Info';
import styles from './style.module.scss';

const TableInfoButton = ({
  onClick,
  className = '',
}: {
  onClick: () => void;
  className?: string;
}) => (
  <button
    className={`p-btn--secondary ${styles.button} ${className}`}
    type="button"
    onClick={onClick}
  >
    <Info size={20} />
  </button>
);

export default TableInfoButton;
