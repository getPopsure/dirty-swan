import classNames from 'classnames';

import styles from './ButtonCell.module.scss';
import { Button } from '../../../../button';
import { ReactNode } from 'react';

export type ButtonCellProps = {
  buttonCaption: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  price?: ReactNode;
};

export const ButtonCell = ({
  isSelected,
  onClick,
  buttonCaption,
  price,
  disabled,
}: ButtonCellProps) => {
  return (
    <div className="w100 d-flex fd-column ai-center jc-center gap8">
      <Button
        className={classNames('w100 wmx5 d-flex fd-column', styles.buttonCell, {
          [styles.selected]: isSelected,
          [styles.withoutPrice]: !price,
          [styles.withPrice]: !!price,
        })}
        variant="filledWhite"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonCaption}
        {price && <span className="p-p tc-purple-500">{price}</span>}
      </Button>
    </div>
  );
};
