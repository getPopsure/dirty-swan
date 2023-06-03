import styles from './style.module.scss';
import removeButtonIcon from './icons/remove-button.svg';
import removeButtonHighlightedIcon from './icons/remove-button-highlighted.svg';
import { Option } from '../../models/autoSuggestInput';

// TODO: update props to value, icon, action
export const Chip = ({
  value,
  onRemove,
}: {
  value: Option;
  onRemove?: (value: Option) => void;
}) => (
  <div className={`p-p mr8 mb8 d-flex ${styles['chip']}`}>
    {value.leftIcon && (
      <img
        className={`mr8 ${styles['chip-image']}`}
        src={value.leftIcon}
        alt={value.value}
      />
    )}
    <div className="mr8">{value.value}</div>
    {onRemove && (
      <div
        className={`c-pointer ${styles['chip-button-container']}`}
        onClick={() => onRemove(value)}
      >
        <img
          className={styles['chip-remove-button-highlighted']}
          src={removeButtonHighlightedIcon}
          alt="removal x button highlighted"
        />
        <img
          className={styles['chip-remove-button']}
          src={removeButtonIcon}
          alt="removal x button"
        />
      </div>
    )}
  </div>
);
