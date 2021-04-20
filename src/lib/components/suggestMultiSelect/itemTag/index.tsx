import { useState } from 'react';

import styles from './style.module.scss';
import removeButtonIcon from '../icons/remove-button.svg';
import removeButtonHighlightedIcon from '../icons/remove-button-highlighted.svg';

interface Option {
  value: string;
  img?: string;
}

export default ({ value, onClick }: { value: Option; onClick: () => void }) => {
  const [hoveredRemoveButton, setHoveredRemoveButton] = useState(false);

  return (
    <div className={`p-p mr8 mb8 d-flex ${styles['item-card']}`}>
      {value.img && (
        <img
          className={`mr8 ${styles['item-card-image']}`}
          src={value.img}
          alt={value.value}
        />
      )}
      <div className="mr8">{value.value}</div>
      <div
        onMouseEnter={() => setHoveredRemoveButton(true)}
        onMouseLeave={() => setHoveredRemoveButton(false)}
        className={`c-pointer ${styles['item-card-remove-button']}`}
        onClick={onClick}
      >
        <img
          src={
            hoveredRemoveButton === true
              ? removeButtonHighlightedIcon
              : removeButtonIcon
          }
          alt="removal x button"
        />
      </div>
    </div>
  );
};
