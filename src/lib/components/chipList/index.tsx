import { Option } from '../../models/suggestMultiSelect';
import Chip from './chip';
import styles from './style.module.scss';

export default ({
  values,
  onRemove,
  className,
}: {
  values: Option[];
  onRemove: (value: Option) => void;
  className?: string;
}) => (
  <div className={`${styles['item-card-container']} ${className}`}>
    {values.map((value) => (
      <Chip value={value} onRemove={() => onRemove(value)} />
    ))}
  </div>
);
