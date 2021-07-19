import classNames from 'classnames';

import StarIcon from './StarIcon';
import ZapIcon from './ZapIcon';

import styles from './style.module.scss';

type RatingTypes = 'star' | 'zap';

interface TableRatingProps {
  type: RatingTypes;
  rating: number;
}

const getRatingIcon = (type: RatingTypes) => {
  const iconDictionary = {
    zap: ZapIcon,
    star: StarIcon,
  };

  return iconDictionary[type] || iconDictionary['star'];
};

const VALID_VALUES = [1, 2, 3];

const TableRating = (props: TableRatingProps) => {
  const { rating, type } = props;
  const SelectedIcon = getRatingIcon(type);

  return (
    <div>
      {VALID_VALUES.map((value) => (
        <SelectedIcon
          key={value}
          className={classNames(
            styles.icon,
            value <= rating ? styles.filled : styles.empty
          )}
        />
      ))}
    </div>
  );
};

export default TableRating;
