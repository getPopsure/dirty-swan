import { Option } from '../../models/autoSuggestInput';
import { XIcon } from '../icon/icons';

import styles from './style.module.scss';

export interface ChipProps {
  value: Option;
  onRemove: (value: Option) => void;
  className?: string;
}

export default ({
  className,
  value,
  onRemove,
}: ChipProps) => (
  <div className={`p-p mr8 mb8 d-flex ${className} ${styles['chip']}`}>
    {value.leftIcon && (
      <img
        className={`mr8 ${styles['chip-image']}`}
        src={value.leftIcon}
        alt={value.value}
      />
    )}
    <div className="mr8">{value.value}</div>
    <button
      className={`c-pointer ${styles['chip-button-container']}`}
      type="button"
      onClick={() => onRemove(value)}
    >
      <XIcon className={styles['chip-remove-button']} />
    </button>
  </div>
);
