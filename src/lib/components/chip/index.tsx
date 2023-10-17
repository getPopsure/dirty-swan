import { Option } from '../../models/autoSuggestInput';
import { XIcon } from '../icon/icons';

import styles from './style.module.scss';

export default ({
  className,
  value,
  onRemove,
}: {
  value: Option;
  onRemove: (value: Option) => void;
  className?: string;
}) => (
  <div className={`p-p mr8 mb8 d-flex ${className} ${styles['chip']}`}>
    {value.leftIcon && (
      <img
        className={`mr8 ${styles['chip-image']}`}
        src={value.leftIcon}
        alt={value.value}
      />
    )}
    <div className="mr8">{value.value}</div>
    <div
      className={`c-pointer ${styles['chip-button-container']}`}
      onClick={() => onRemove(value)}
    >
      <XIcon color={'purple-300'} className={styles['chip-remove-button']} />
      {
        <XIcon
          color={'purple-500'}
          size={16}
          className={styles['chip-remove-button-highlighted']}
        />
      }
    </div>
  </div>
);
