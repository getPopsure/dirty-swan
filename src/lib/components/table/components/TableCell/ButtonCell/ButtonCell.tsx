import classNames from 'classnames';

import styles from './ButtonCell.module.scss';
import { CircleSelectedIcon, CircleUnselectedIcon } from '../../../../icon';
import { ReactNode } from 'react';

export type ButtonCellProps = {
  buttonCaption: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  price?: ReactNode;
  className?: string;
  dataTestId?: string;
  dataCy?: string;
};

export const ButtonCell = ({
  isSelected,
  onClick,
  buttonCaption,
  price,
  disabled,
  className,
  dataCy,
  dataTestId,
}: ButtonCellProps) => {
  return (
    <div
      className={classNames(
        "w100 d-flex fd-column ai-start jc-center gap8",
        className,
      )}
      data-cy={dataCy}
      data-testid={dataTestId}
    >
      <button
        className={classNames('w100 wmx5', styles.buttonCell, {
          [styles.selected]: isSelected,
          [styles.disabled]: disabled,
        })}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="d-flex fd-column ai-start">
          <span className="p-p fw-bold">{buttonCaption}</span>
          {price && <span className="p-p">{price}</span>}
        </div>
        {!disabled && (isSelected ? (
          <CircleSelectedIcon size={16} />
        ) : (
          <CircleUnselectedIcon size={16} />
        ))}
      </button>
    </div>
  );
};
