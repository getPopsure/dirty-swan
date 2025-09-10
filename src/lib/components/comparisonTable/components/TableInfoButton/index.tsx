import { InfoIcon } from '../../../icon';
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
    data-testid="ds-table-info-button"
    onClick={onClick}
    aria-label="View more information"
    title="View more information"
  >
    <InfoIcon size={20} />
  </button>
);

export default TableInfoButton;
